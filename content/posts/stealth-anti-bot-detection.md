+++
date = 2026-03-12T12:00:00+08:00
lastmod = 2026-03-12T17:20:00+08:00
draft = false
title = '深入理解浏览器反机器人检测原理'
tags = ['Go', '浏览器自动化', '反爬虫', 'rod']
categories = ['技术分析']
+++

## 背景

在 Web 自动化测试和数据采集场景中，浏览器自动化工具（如 Puppeteer、Playwright、Selenium）常被目标网站检测识别。网站通过一系列 JavaScript 指纹技术判断访问者是否为真实用户。

[go-rod/stealth](https://github.com/go-rod/stealth) 是一个 Go 语言库，为 [rod](https://github.com/go-rod/rod) 浏览器自动化框架提供反检测能力。本文深入分析其工作原理。

## 网站如何检测自动化工具

### 1. Navigator 属性检测

浏览器暴露 `navigator` 对象，包含大量设备信息：

```javascript
// 自动化工具的典型特征
navigator.webdriver === true  // Selenium/WebDriver 标记
navigator.plugins.length === 0 // 无插件
navigator.languages.length === 0 // 无语言设置
```

真实浏览器的 `navigator.webdriver` 为 `undefined`，而自动化工具返回 `true`。

### 2. Chrome DevTools Protocol 检测

Chrome 通过 CDP (Chrome DevTools Protocol) 控制浏览器。网站可以检测：

```javascript
// 检测 CDP Runtime 是否被启用
const e = new Error();
if (e.stack.includes('puppeteer_evaluation_script')) {
  // 检测到自动化
}
```

### 3. WebGL 指纹

WebGL 渲染器信息可用于识别：

```javascript
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
// SwiftShader = Headless Chrome 的软件渲染器
```

### 4. iframe 内容检测

```javascript
// 自动化工具注入的脚本会留下痕迹
const iframe = document.createElement('iframe');
iframe.srcdoc = '<script>console.log(navigator.webdriver)</script>';
// 检测 iframe 中的属性
```

## Stealth 的反检测策略

### 核心架构

```
┌──────────────────────────────────────────┐
│              用户代码                     │
│                 ↓                         │
│   stealth.Page(browser) → *rod.Page      │
│                 ↓                         │
│   rod.Browser.Page() + EvalOnNewDocument │
│                 ↓                         │
│   stealth.JS (嵌入的 JavaScript)         │
│   - Chrome 对象伪装                       │
│   - WebDriver 属性隐藏                    │
│   - WebGL 指纹伪装                        │
└──────────────────────────────────────────┘
```

### MustPage 工作流程

`MustPage` 是 `Page` 的包装，遵循 Go 的 `Must` 前缀约定：

```go
// MustPage 创建无法被检测为机器人的页面
func MustPage(b *rod.Browser) *rod.Page {
    p, err := Page(b)
    if err != nil {
        panic(err)  // 失败时 panic
    }
    return p
}

// Page 创建页面并注入反检测脚本
func Page(b *rod.Browser) (*rod.Page, error) {
    // 1. 创建新的浏览器页面
    p, err := b.Page(proto.TargetCreateTarget{})
    if err != nil {
        return nil, err
    }

    // 2. 在每个新文档加载前注入 JS
    _, err = p.EvalOnNewDocument(JS)
    if err != nil {
        return nil, err
    }

    return p, nil
}
```

**完整调用链：**

```
MustPage(browser)
    │
    ├── Page(browser)
    │       │
    │       ├── b.Page(proto.TargetCreateTarget{})  ← 创建空白页面
    │       │       │
    │       │       └── CDP: Target.createTarget
    │       │
    │       └── p.EvalOnNewDocument(JS)  ← 注入反检测脚本
    │               │
    │               └── CDP: Page.addScriptToEvaluateOnNewDocument
    │
    └── 返回 *rod.Page
```

**时序图：**

```
用户代码          stealth.Page         rod.Browser         CDP
   │                  │                    │               │
   │──── Page() ─────>│                    │               │
   │                  │                    │               │
   │                  │── b.Page() ───────>│               │
   │                  │                    │── createTarget─>│
   │                  │                    │<── pageId ─────│
   │                  │<── *Page ──────────│               │
   │                  │                    │               │
   │                  │── EvalOnNewDocument ───────────────>│
   │                  │                    │               │
   │<── *Page ────────│                    │               │
   │                  │                    │               │
   │── Navigate() ────────────────────────────────────────>│
   │                                      │               │
   │                        [JS 在页面脚本前执行]          │
   │                                      │               │
```

### 关键技术：EvalOnNewDocument

stealth 的核心只有 34 行 Go 代码，关键在于 `EvalOnNewDocument`：

```go
func Page(b *rod.Browser) (*rod.Page, error) {
    p, err := b.Page(proto.TargetCreateTarget{})
    if err != nil {
        return nil, err
    }

    // 在每个新文档加载前注入 JS
    _, err = p.EvalOnNewDocument(JS)
    if err != nil {
        return nil, err
    }

    return p, nil
}
```

`EvalOnNewDocument` 是 CDP 的 `Page.addScriptToEvaluateOnNewDocument` 命令封装，确保注入的脚本在任何页面脚本执行前运行。

**执行时机对比：**

| 方法 | 执行时机 | 能否修改原生 API |
|------|----------|------------------|
| `page.Eval()` | 页面加载后 | ❌ 太晚，已被检测 |
| `page.EvalOnNewDocument()` | 页面加载前 | ✅ 优先执行 |

**工作原理：**

1. **注册阶段**：调用 `EvalOnNewDocument(JS)` 时，CDP 将脚本注册到浏览器
2. **触发时机**：每次导航到新页面或创建新 iframe 时自动执行
3. **执行顺序**：注入的脚本在页面的 `<script>` 标签之前执行

```
页面加载时间线：
─────────────────────────────────────────────────────────>
     │                    │                    │
     ▼                    ▼                    ▼
[EvalOnNewDocument]  [页面 <script>]      [检测脚本]
     │                    │                    │
     └── 修改原生 API ────┘                    │
                          │                    │
                          └── 检测脚本看到伪装后的 API ──>
```

### JavaScript 伪装模块

stealth 嵌入了 [stealth-evasions](https://github.com/nickyout/stealth-evasions) 的编译产物（约 185KB），包含多个伪装模块：

| 模块 | 功能 |
|------|------|
| `chrome.app` | 伪装 Chrome 应用 API |
| `chrome.csi` | 伪装 Chrome CSI 接口 |
| `chrome.loadTimes` | 伪装页面加载时间 |
| `chrome.runtime` | 伪装 Chrome Runtime API |
| `navigator.webdriver` | 隐藏 WebDriver 标记 |
| `navigator.plugins` | 伪造插件列表 |
| `navigator.languages` | 设置语言列表 |
| `webgl` | 伪装 WebGL 渲染器信息 |
| `iframe.contentWindow` | 修复 iframe 检测 |
| `media.codecs` | 伪造媒体编解码器支持 |
| `user-agent-override` | 处理 User-Agent 一致性 |

### WebDriver 属性隐藏示例

```javascript
// 原始检测点
Object.getOwnPropertyDescriptor(Navigator.prototype, 'webdriver')

// stealth 的伪装
Object.defineProperty(Navigator.prototype, 'webdriver', {
    get: () => undefined,
    configurable: true
});

// 同时处理 iframe 场景
const originalContentWindow = HTMLIFrameElement.prototype.contentWindow;
Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
    get: function() {
        const window = originalContentWindow.call(this);
        // 递归处理 iframe 内的 navigator.webdriver
        return window;
    }
});
```

### WebGL 指纹伪装示例

```javascript
// 检测点：SwiftShader 软件渲染器
const getParameter = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function(parameter) {
    // UNMASKED_VENDOR_WEBGL
    if (parameter === 37445) {
        return 'Google Inc. (NVIDIA)';
    }
    // UNMASKED_RENDERER_WEBGL
    if (parameter === 37446) {
        return 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1080 Direct3D11 vs_5_0 ps_5_0)';
    }
    return getParameter.call(this, parameter);
};
```

## 设计亮点

### 1. go:generate 自动化嵌入

```go
//go:generate go run ./generate
```

generate 脚本自动下载 stealth-evasions 并嵌入到 `assets.go`：

```
JS 库更新 → go generate → assets.go 更新 → 编译
```

### 2. 零运行时依赖

编译后 JS 代码嵌入二进制，无需外部文件，部署简单。

### 3. 惯用的 Go API

```go
// 遵循 Go 的 Must 前缀约定
page := stealth.MustPage(browser)  // 失败时 panic
page, err := stealth.Page(browser) // 返回 error
```

## 局限性与注意事项

1. **非银弹**：高级检测（如行为分析、TLS 指纹）无法通过 JS 伪装解决
2. **维护成本**：浏览器更新可能引入新的检测点
3. **合规风险**：某些网站明确禁止自动化访问

## 总结

stealth 通过在页面加载前注入伪装 JavaScript，解决了常见的自动化检测手段。其设计简洁，核心原理是利用 CDP 的 `addScriptToEvaluateOnNewDocument` 确保伪装代码优先执行。

理解反检测原理不仅有助于合法的自动化测试，也能帮助开发者设计更好的防御策略。

## 参考资料

- [stealth-evasions 源码](https://github.com/nickyout/stealth-evasions)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [rod 文档](https://github.com/go-rod/rod)