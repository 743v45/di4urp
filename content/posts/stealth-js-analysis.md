+++
date = 2026-03-12T17:35:00+08:00
draft = false
title = '【留档】Puppeteer Stealth 插件 JS 代码分析'
tags = ['Puppeteer', '反检测', '爬虫', 'JavaScript']
categories = ['代码分析']
+++

## 背景

在分析 [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) 项目时，发现其核心代码被打包成一段高度压缩的 JavaScript。本文是对该代码的详细解析。

> 版本：v2.7.3

## 代码结构概览

这段压缩 JS 采用立即执行函数 (IIFE) 结构：

```javascript
(({_utilsFns, _mainFunction, _args}) => {
  const utils = Object.fromEntries(
    Object.entries(_utilsFns).map(([key, value]) => [key, eval(value)])
  );
  utils.init();
  eval(_mainFunction)(utils, ..._args);
})(...)
```

**执行流程：**

1. 动态加载 `_utilsFns` 中的工具函数（通过 `eval` 执行字符串形式的代码）
2. 调用 `utils.init()` 初始化
3. 执行 `_mainFunction` 主函数，传入工具函数和参数

---

## 核心工具函数

### 1. stripProxyFromErrors

**作用：** 从错误堆栈中移除 Proxy 相关的调用栈，防止被检测。

```javascript
const stripProxyFromErrors = (handler = {}) => {
  const newHandler = { ...handler };

  // 拦截每个 trap
  traps.forEach(trap => {
    newHandler[trap] = function () {
      try {
        return handler[trap].apply(this, arguments);
      } catch (err) {
        // 清理错误堆栈中的 Proxy 痕迹
        err.stack = stripWithAnchor(err.stack) || stripWithBlacklist(err.stack);
        throw err;
      }
    };
  });

  return newHandler;
};
```

**检测对抗原理：**

当 Proxy 内部抛出错误时，堆栈会显示类似：

```
TypeError: xxx
    at Reflect.get (native)
    at Object.newHandler.<computed> [as get] (...)
    at realUserCode (...)
```

这段代码会自动移除前两行，只保留用户代码的堆栈。

---

### 2. patchToString

**作用：** 修改 `Function.prototype.toString`，让代理函数返回 `[native code]` 形式。

```javascript
const patchToString = (obj, str = '') => {
  const handler = {
    apply: function (target, ctx) {
      if (ctx === obj) {
        return str || utils.makeNativeString(obj.name);
      }
      return target.call(ctx);
    }
  };

  const toStringProxy = new Proxy(
    Function.prototype.toString,
    utils.stripProxyFromErrors(handler)
  );

  utils.replaceProperty(Function.prototype, 'toString', {
    value: toStringProxy
  });
};
```

**效果：**

```javascript
// 正常情况，Proxy 函数会被暴露：
someProxyFunction.toString()
// => "function () { [native code] }"  <-- 这是假的

// 但如果被检测：
someProxyFunction.toString() === Function.prototype.toString.call(someProxyFunction)
// => true，看起来像原生函数
```

---

### 3. makeNativeString

**作用：** 生成原生函数字符串。

```javascript
const makeNativeString = (name = '') => {
  // 基于缓存的 native toString 模板
  return utils.cache.nativeToStringStr.replace('toString', name || '');
};

// 结果示例：
// "function getAttribute() { [native code] }"
```

---

### 4. replaceProperty

**作用：** 安全地重写对象属性描述符。

```javascript
const replaceProperty = (obj, propName, descriptorOverrides = {}) => {
  return Object.defineProperty(obj, propName, {
    // 保留原有描述符
    ...(Object.getOwnPropertyDescriptor(obj, propName) || {}),
    // 应用覆盖
    ...descriptorOverrides
  });
};
```

---

### 5. replaceWithProxy / mockWithProxy

**作用：** 创建代理并替换原对象。

```javascript
const replaceWithProxy = (obj, propName, handler) => {
  const original = obj[propName];
  const proxy = new Proxy(original, utils.stripProxyFromErrors(handler));
  utils.replaceProperty(obj, propName, { value: proxy });
  return proxy;
};
```

---

## 被修改的浏览器 API

代码针对以下检测点进行伪装：

| 检测点 | 原始问题 | 修复方式 |
|--------|----------|----------|
| `navigator.webdriver` | Puppeteer 会将其设为 `true` | 重写为 `undefined` |
| `chrome.runtime` | 无 Chrome 扩展 API | 注入假的 `chrome` 对象 |
| `navigator.plugins` | 插件列表为空 | 伪造常见插件数组 |
| `navigator.languages` | 语言设置异常 | 确保返回合理数组 |
| `navigator.hardwareConcurrency` | CPU 核心数可疑 | 可配置伪装值 |
| `navigator.permissions` | 权限 API 行为异常 | 修复 `query()` 返回值 |
| `iframe.contentWindow` | 跨窗口检测不一致 | 统一代理处理 |
| `window.outerWidth/outerHeight` | 无头浏览器特征 | 修复窗口尺寸 |

---

## 工作原理总结

```
┌─────────────────────────────────────────────────────────────┐
│                    网站检测 Bot 的方式                        │
├─────────────────────────────────────────────────────────────┤
│  1. navigator.webdriver === true                            │
│  2. Function.toString 返回非原生代码                         │
│  3. 错误堆栈中出现 Proxy 相关调用                             │
│  4. 浏览器特征缺失 (plugins, chrome 等)                       │
│  5. Canvas/WebGL 指纹异常                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Stealth 插件的对策                          │
├─────────────────────────────────────────────────────────────┤
│  1. 重写属性，返回期望值                                      │
│  2. 代理 Function.prototype.toString                        │
│  3. 清理错误堆栈中的 Proxy 痕迹                               │
│  4. 注入伪造的浏览器特征                                      │
│  5. 统一各窗口的 API 行为                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 检测对抗示例

### 示例 1：webdriver 属性

```javascript
// 网站检测代码
if (navigator.webdriver) {
  console.log('检测到自动化脚本！');
}

// Stealth 修复后
Object.defineProperty(navigator, 'webdriver', {
  get: () => undefined
});

// 现在 navigator.webdriver === undefined
```

### 示例 2：toString 检测

```javascript
// 网站检测代码
const fn = navigator.getAttribute;
if (fn.toString().includes('[native code]')) {
  // 正常
} else {
  console.log('函数被篡改！');
}

// Stealth 修复后
// 即使 getAttribute 被 Proxy 包装，toString 仍返回：
// "function getAttribute() { [native code] }"
```

---

## 项目结构

这段压缩代码来自 [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)，其源码结构：

```
puppeteer-extra-plugin-stealth/
├── src/
│   └── index.js           # 入口，打包生成压缩代码
└── evasion/               # 各检测规避模块
    ├── chrome.app/
    ├── chrome.csi/
    ├── chrome.loadTimes/
    ├── chrome.runtime/
    ├── iframe.contentWindow/
    ├── media.codecs/
    ├── navigator.hardwareConcurrency/
    ├── navigator.languages/
    ├── navigator.permissions/
    ├── navigator.plugins/
    ├── navigator.webdriver/
    ├── user-agent-override/
    ├── utils.js           # 工具函数（本文分析的核心）
    └── ...
```

---

## 总结

这段压缩 JS 是 **puppeteer-extra-plugin-stealth** 的核心代码，通过以下技术手段隐藏浏览器自动化痕迹：

1. **Proxy 包装**：拦截浏览器原生 API 调用
2. **堆栈清洗**：自动移除错误堆栈中的 Proxy 痕迹
3. **toString 伪装**：让代理函数看起来像原生代码
4. **属性注入**：伪造缺失的浏览器特征

这些技术使得 Puppeteer/Playwright 脚本在网站眼中看起来像真实用户操作，常用于爬虫、自动化测试、数据采集等场景。

---

## 参考

- [puppeteer-extra-plugin-stealth GitHub](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)
- [Bot detection techniques](https://github.com/berstend/puppeteer-friendly-chrome)