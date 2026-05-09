+++
date = 2026-05-09T11:45:00+08:00
draft = false
title = 'XHS Bridge Extension 功能全解析：32 个浏览器自动化方法的设计与实现'
tags = ['Chrome Extension', '浏览器自动化', 'WebSocket', 'CDP', '小红书']
categories = ['技术实践']
+++

## 背景

[xiaohongshu-skills](https://github.com/anthropics/xiaohongshu-skills) 是一个小红书（XHS）自动化项目，采用双层架构：Python CLI 负责业务逻辑，Chrome Extension 负责浏览器操控。Extension 部分叫 **XHS Bridge**——运行在用户的真实浏览器中，通过 WebSocket 接收本地 Python CLI 的指令，在页面中执行操作。相比 Selenium/Playwright，这种方式直接复用用户已登录的浏览器会话，无需处理登录流程。

本文是对其 Extension 源码的分析，逐层拆解全部 32 个方法，讲清楚每个方法做了什么、为什么这么做。

## 整体架构

```
Python CLI (cli.py)
    │
    ▼ JSON-RPC over WebSocket (ws://localhost:9333)
Bridge Server (bridge_server.py)
    │
    ▼ WebSocket
XHS Bridge Extension (background.js)
    │
    ├── chrome.tabs API ──────→ 导航、截图
    ├── chrome.cookies API ──→ Cookie 读取
    ├── chrome.debugger API ─→ CDP 文件上传
    └── chrome.scripting ────→ MAIN world JS 注入
                                    │
                                    ▼
                            xiaohongshu.com 页面 DOM
```

三层分工明确：Python 侧负责业务逻辑（搜索笔记、发布内容等），Bridge Server 是通信中转，Extension 是纯粹的浏览器操控执行器——它不包含任何业务逻辑，只提供原子化的 DOM 操作原语。这是一个很干净的分层设计。

Extension 没有 popup 界面，没有 options 页面。所有控制都来自 WebSocket。

## Manifest 配置

Manifest V3，Service Worker 模式：

```json
{
  "permissions": ["tabs", "cookies", "scripting", "alarms", "debugger"],
  "host_permissions": [
    "https://www.xiaohongshu.com/*",
    "https://xiaohongshu.com/*",
    "https://creator.xiaohongshu.com/*",
    "ws://localhost/*"
  ]
}
```

每个权限都有明确用途：

| 权限 | 用途 |
|------|------|
| `tabs` | 查询、创建、更新 XHS 标签页 |
| `cookies` | 读取 xiaohongshu.com 的 Cookie（登录态检测） |
| `scripting` | 通过 `chrome.scripting.executeScript` 注入 JS 到 MAIN world |
| `alarms` | 每 24 秒触发一次，保持 Service Worker 存活 |
| `debugger` | 接入 Chrome DevTools Protocol，用于文件上传 |

## 通信协议

Extension 连接 `ws://localhost:9333`，握手时发送 `{ role: "extension" }` 标识自己。之后所有通信都是 JSON-RPC 风格：

```json
// 请求（Python → Extension）
{ "id": 1, "method": "click_element", "params": { "selector": ".like-btn" } }

// 响应（Extension → Python）
{ "id": 1, "result": null }

// 错误
{ "id": 1, "error": "元素不存在: .like-btn" }
```

WebSocket 断线后 3 秒自动重连。`chrome.alarms` 以 0.4 分钟为周期定期触发，检查连接状态——这是 Service Worker 保活的双重保险。

## 32 个方法总览

所有方法通过 `chrome.scripting.executeScript` 注入到页面的 **MAIN world** 执行——和页面 JS 共享全局作用域，可以访问 `window.__INITIAL_STATE__` 等 XHS 页面变量。

### 1. 导航（2 个方法）

| 方法 | 说明 |
|------|------|
| `navigate` | 在 XHS 标签页中打开 URL（没有则新建），等待加载完成（最长 60s） |
| `wait_for_load` | 阻塞等待当前标签页加载完成 |

`navigate` 的核心是 `waitForTabComplete()`——同时注册 `chrome.tabs.onUpdated` 监听器和 400ms 轮询。这种双保险设计值得注意：`onUpdated` 事件可能在注册监听器之前就已触发，轮询填补了这个窗口期。

### 2. 截图（1 个方法）

| 方法 | 说明 |
|------|------|
| `screenshot_element` | 截取可见视口为 base64 PNG（`captureVisibleTab`） |

名字里有 "element" 但实际截取整个视口——`captureVisibleTab` API 只支持视口级别截图。

### 3. Cookie（1 个方法）

| 方法 | 说明 |
|------|------|
| `get_cookies` | 获取指定域名的所有 Cookie（默认 `xiaohongshu.com`） |

Python 侧用这个方法检测登录态（检查关键 Cookie 是否存在）。

### 4. MAIN World JS 执行（8 个方法）

| 方法 | 说明 |
|------|------|
| `evaluate` | 执行任意 JS 表达式（`new Function()` 构造），返回表达式的值 |
| `has_element` | 判断 CSS 选择器是否匹配到元素，返回布尔值 |
| `get_elements_count` | 统计匹配选择器的元素数量 |
| `get_element_text` | 读取元素的 `textContent` |
| `get_element_attribute` | 读取元素的指定属性值 |
| `get_scroll_top` | 获取当前垂直滚动位置 |
| `get_viewport_height` | 获取视口高度 |
| `get_url` | 获取当前页面 URL |

`evaluate` 是最灵活的方法，Python 侧经常用它直接从页面状态提取数据，比如 `window.__INITIAL_STATE__?.user?.userId`。

### 5. DOM 等待（2 个方法）

| 方法 | 说明 |
|------|------|
| `wait_dom_stable` | 轮询 `innerHTML.length` 直到 DOM 不再变化（默认 10s 超时，500ms 间隔） |
| `wait_for_selector` | 轮询直到指定选择器的元素出现（默认 30s 超时，200ms 间隔） |

`wait_dom_stable` 是在 SPA 页面中判断"加载完成"的实用技巧——XHS 大量使用动态渲染，单纯等 `document.ready` 是不够的。几乎所有操作前都会先 `wait_for_selector` 确认目标元素已渲染。

### 6. 文件上传（2 条路径）

浏览器对 `<input type="file">` 有严格安全限制，JS 无法直接设置文件路径。Extension 提供了两条路径：

| 路径 | 实现方式 | 说明 |
|------|---------|------|
| CDP debugger（主路径） | `chrome.debugger` + `DOM.setFileInputFiles` | 接受本地文件路径，最干净的上传方式 |
| MAIN world（备用） | base64 DataTransfer + 拖拽模拟 | 不需要 `debugger` 权限，但需要 base64 传入 |

CDP 路径的流程：`DOM.getDocument` → `DOM.querySelector` → `DOM.setFileInputFiles` → `debugger.detach`。

这是整个 Extension 中**唯一使用 CDP 的地方**。Manifest 中的 `debugger` 权限就是为此而申请，用完立即 detach，最小化 debugger 的生命周期。

备用路径通过 `Object.defineProperty` 覆盖 `<input>` 的 `files` 属性触发 `change` 事件，再模拟 `dragenter` → `dragover` → `drop` 到最近的 `.upload` 容器。

### 7. DOM 交互（8 个方法）

| 方法 | 说明 |
|------|------|
| `click_element` | 滚动到可见 → focus → click |
| `input_text` | 设置 `<input>` 的 value 并触发 input + change 事件 |
| `input_content_editable` | 向 contenteditable 元素逐行插入文本，用 `insertParagraph` 换行 |
| `type_text` | 逐字符模拟打字（默认 50ms 延迟），contenteditable 用 `insertText`，普通 input 用键盘事件序列 |
| `remove_element` | 从 DOM 中移除元素 |
| `hover_element` | 在元素中心触发 mouseover + mousemove |
| `select_all_text` | 全选文本（`<input>` 用 `.select()`，contenteditable 用 `selectAll`） |
| `press_key` | 模拟按键，Enter/ArrowDown/Tab/Backspace 有特殊处理 |

几个值得注意的实现细节：

- `input_content_editable` 不用 `innerHTML` 直接设置，因为 XHS 编辑器监听的是 `execCommand` 产生的变更，直接改 `innerHTML` 不会触发状态同步
- `type_text` 逐字符打字是为了应对某些输入框的时序检测——值变化太快会被判定为自动化
- `press_key` 对 Enter 在 contenteditable 中执行 `insertParagraph`（真正的换行），ArrowDown 将光标移到末尾

### 8. 滚动（5 个方法）

| 方法 | 说明 |
|------|------|
| `scroll_by` | 相对滚动（x/y 偏移） |
| `scroll_to` | 绝对滚动到指定坐标 |
| `scroll_to_bottom` | 滚动到页面底部 |
| `scroll_element_into_view` | 平滑滚动到指定元素，`block: "center"` 置于视口中央 |
| `scroll_nth_element_into_view` | 滚动到第 N 个匹配元素（Python 侧遍历笔记列表时使用） |

### 9. 鼠标模拟（2 个方法）

| 方法 | 说明 |
|------|------|
| `mouse_move` | 在指定视口坐标触发 mousemove 事件 |
| `mouse_click` | 通过 `elementFromPoint` 定位坐标处元素，触发 mousedown → mouseup → click 完整序列 |

这对方法用在 CSS 选择器无法精确定位的场景——比如需要点击某个列表项的特定位置。

### 10. 滚轮事件（1 个方法）

| 方法 | 说明 |
|------|------|
| `dispatch_wheel_event` | 在 XHS 滚动容器上触发 WheelEvent |

XHS 的笔记详情页用了自定义滚动容器（`.note-scroller`），`window.scrollBy` 对它无效。这个方法直接在容器上触发 wheel 事件，选择器优先级：`.note-scroller` → `.interaction-container` → `document.documentElement`。

## 值得关注的设计决策

### MAIN world 而非 content script

Content script 运行在隔离世界中，无法访问页面的 JS 全局变量。XHS 的页面状态（如 `window.__INITIAL_STATE__`）包含大量有用的数据——笔记内容、用户信息、搜索结果等。MAIN world 让 Extension 直接读取这些数据，避免了自己解析 DOM。

同时，MAIN world 中的 DOM 操作（click、input 等）产生的事件更接近真实用户操作，不容易被 XHS 的前端检测机制识别。

### CDP 仅用于文件上传

`<input type="file">` 是浏览器安全模型中保护最严格的元素之一。JS 无法通过任何标准 API 设置文件路径。CDP 的 `DOM.setFileInputFiles` 是唯一能绕过这个限制的方法。

值得注意的是，作者只在文件上传这一个场景使用了 CDP，用完立即 detach，最小化 debugger 的生命周期。其他所有操作都通过标准 Chrome API 完成，避免不必要的权限依赖。

### content script 的实际角色

虽然注册了 content script（`content.js`），但实际的路由逻辑中，DOM 操作都走 `chrome.scripting.executeScript` + MAIN world。Content script 更像是一个预留的备用通道——如果未来某些操作需要在隔离世界中执行（比如需要访问 chrome.runtime API），可以通过它中转。目前它在运行时基本是个空壳。

## 小结

XHS Bridge Extension 的设计哲学是**最小化智能、最大化可控**。它不包含任何业务逻辑，只是把浏览器能力暴露为 32 个原子化的 RPC 方法。Python 侧负责所有的决策——该点什么、该输入什么、该等什么。Extension 只管执行。

这种分离让 Extension 代码保持简单稳定，业务逻辑的变化不需要重新加载扩展。

整个 Extension 核心代码不到 540 行（`background.js`），却覆盖了小红书自动化所需的全部浏览器操作能力。540 行做到这个程度，说明作者对 Chrome Extension API 和浏览器自动化的理解很到位。
