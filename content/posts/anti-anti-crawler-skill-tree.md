+++
date = 2026-03-17T12:00:00+08:00
draft = false
title = '反反爬虫技术全景：技能树与实战指南'
tags = ['爬虫', '反检测', '浏览器自动化', '网络安全']
categories = ['技术指南']
+++

## 技能掌握情况汇总

> 本表格记录个人对各项反反爬虫技术的掌握程度和使用情况，方便后续追踪学习进度。

### 技术技能

| 层级 | 技能项 | 优先级 | AI 备注 | 个人备注 |
|------|--------|--------|---------|----------|
| **基础层** | HTTP 请求基础 |⭐⭐⭐⭐⭐ | User-Agent、Headers 等 | |
| **基础层** | HTTP/2 协议 |⭐⭐⭐ | 二进制协议、多路复用 | |
| **基础层** | WebSocket 处理 |⭐⭐⭐ | 实时通信、心跳机制 | |
| **基础层** | HTTP 缓存控制 |⭐⭐⭐ | ETag、If-Modified-Since | |
| **基础层** | Cookie 签名管理 |⭐⭐⭐ | Cookie 属性控制 | |
| **基础层** | 浏览器工作原理 |⭐⭐⭐⭐ | 渲染进程、JS 引擎、DOM | |
| **基础层** | 指纹技术原理 |⭐⭐⭐⭐ | Canvas、WebGL、Audio 指纹 | |
| **基础层** | 请求管理 |⭐⭐⭐⭐ | 智能拦截、自定义请求头、资源控制 | |
| **环境层** | Navigator 对象伪造 |⭐⭐⭐⭐⭐ | webdriver、plugins、languages | |
| **环境层** | CDP 检测绕过 |⭐⭐⭐⭐⭐ | 堆栈检测、脚本注入检测 | |
| **环境层** | Canvas/WebGL 指纹处理 |⭐⭐⭐⭐ | 指纹随机化、噪声注入 | |
| **环境层** | 完整浏览器指纹伪装 |⭐⭐⭐⭐⭐ | 全栈指纹规避 | |
| **环境层** | TLS 指纹伪装 |⭐⭐⭐⭐ | JA3、HTTP/2 指纹模拟 | |
| **环境层** | WebRTC 防护 |⭐⭐⭐ | IP 泄露防护 | |
| **环境层** | CDN 绕过 |⭐⭐⭐⭐⭐ | Cloudflare、Akamai 等 | |
| **环境层** | 反调试技术 |⭐⭐⭐ | 调试器检测和绕过 |
| **环境层** | 代理池管理 |⭐⭐⭐⭐⭐ | HTTP/SOCKS5/住宅代理 | |
| **环境层** | 代理轮换与失败切换 |⭐⭐⭐⭐⭐ | 自动轮换、健康检查 | |
| **环境层** | 代理健康检查 |⭐⭐⭐⭐ | 延迟检测、可用性验证 | |
| **环境层** | IP 地理位置匹配 |⭐⭐⭐⭐ | 时区与代理地区一致 | |
| **环境层** | 设备信息伪造 |⭐⭐⭐ | 分辨率、时区、语言 | |
| **环境层** | 字体指纹伪造 |⭐⭐⭐ | 字体列表伪造 |
| **环境层** | Web Audio 指纹处理 |⭐⭐⭐ | AudioContext 指纹 | |
| **环境层** | Battery API 伪造 |⭐⭐ | 电量信息模拟 | |
| **环境层** | Network API 伪造 |⭐⭐⭐ | 网络类型伪造 | |
| **环境层** | Screen API 伪造 |⭐⭐⭐ | 屏幕方向、像素比 | |
| **环境层** | Permissions API 控制 |⭐⭐⭐⭐ | 权限权限请求 | |
| **环境层** | Geolocation 伪造 |⭐⭐⭐ | 位置信息模拟 | |
| **环境层** | Connection Type 伪造 |⭐⭐⭐ | 网络连接类型 | |
| **环境层** | WebGL 参数随机化 |⭐⭐⭐ | 纹理模式、精度控制 | |
| **环境层** | Canvas 噺拟检测绕过 |⭐⭐⭐⭐ | getImageData Hook | |
| **环境层** | Web Workers 检测绕过 |⭐⭐⭐ | Worker 指纹统一 | |
| **行为层** | 鼠标行为模拟 |⭐⭐⭐⭐ | 贝塞尔曲线轨迹 | |
| **行为层** | 键盘行为模拟 |⭐⭐⭐ | 打字节奏、事件完整性 | |
| **行为层** | 滚动行为模拟 |⭐⭐⭐ | 分段滚动、惯性模拟 | |
| **行为层** | 视线停留模拟 |⭐⭐ | 阅读停留时间 |
| **行为层** | 窗口大小变化模拟 |⭐⭐ | 调整窗口大小 |
| **行为层** | 页面停留时间随机化 |⭐⭐⭐ | 不同页面停留时间不同 | |
| **行为层** | 点击位置偏移 |⭐⭐⭐ | 非中心点击 |
| **行为层** | 多标签页操作 |⭐⭐⭐ | 打开/切换/关闭标签 | |
| **行为层** | 浏览器历史操作 |⭐⭐ | 前进后退导航 |
| **行为层** | 右键操作模拟 |⭐⭐ | 右键菜单、复制粘贴 | |
| **行为层** | 拖放操作模拟 |⭐⭐⭐ | 元素拖拽行为 |
| **行为层** | 音频/视频交互 |⭐⭐ | 播放/暂停、音量调节 | |
| **行为层** | 表单提交行为 |⭐⭐⭐ | 输入框聚焦、验证前检查 | |
| **行为层** | 鼠标抖动 |⭐⭐ | 点击前微小随机移动 |
| **行为层** | 键盘修正行为 |⭐⭐ | 打错后删除重打 |
| **行为层** | 触摸事件模拟 |⭐⭐⭐ | 移动端触摸行为 |
| **行为层** | Hover 停留 |⭐⭐⭐ | 鼠标悬停一段时间 | |
| **持久层** | Cookie 池管理 |⭐⭐⭐⭐⭐ | 指纹 Cookie、会话 Cookie | |
| **持久层** | 多会话池管理 |⭐⭐⭐⭐ | 多账号并发管理 | |
| **持久层** | 浏览器 Profile |⭐⭐⭐⭐ | User Data 目录管理 | |
| **持久层** | LocalStorage 管理 |⭐⭐⭐ | 存储保存与恢复 | |
| **持久层** | SessionStorage 管理 |⭐⭐⭐ | 会话存储管理 | |
| **持久层** | IndexedDB 管理 |⭐⭐⭐⭐ | 结构化数据存储 | |
| **持久层** | 状态快照 |⭐⭐⭐ | 状态同步与回滚 |
| **持久层** | Session 恢复 |⭐⭐⭐⭐ | 会话过期自动恢复 | |
| **持久层** | Cookie 过期检测 |⭐⭐⭐⭐ | 自动刷新过期 Cookie | |
| **持久层** | 跨域 Cookie 同步 |⭐⭐⭐ | 多域名 Cookie 共享 | |
| **持久层** | Cache API 管理 |⭐⭐⭐ | 缓存存储操作 | |
| **持久层** | Service Worker 管理 |⭐⭐⭐ | 离线缓存处理 | |
| **持久层** | WebSQL 处理 |⭐⭐ | 已废弃但仍在用 | |
| **持久层** | FileSystem API |⭐⭐ | 文件系统访问 | |
| **验证层** | OCR 验证码识别 |⭐⭐⭐⭐ | Tesseract、CNN 模型 | |
| **验证层** | 滑动验证码破解 |⭐⭐⭐⭐ | 模板匹配、轨迹生成 | |
| **验证层** | 验证码 AI 识别 |⭐⭐⭐⭐⭐ | 多种验证码自动识别 | |
| **验证层** | reCAPTCHA 对抗 |⭐⭐⭐⭐⭐ | v2/v3 应对策略 | |
| **验证层** | 行为验证对抗 |⭐⭐⭐ | 完整行为模拟 |
| **架构层** | 分布式爬虫 |⭐⭐⭐⭐ | 任务调度、节点协同 | |
| **架构层** | 策略路由 |⭐⭐⭐⭐ | A/B 测试、策略切换 | |
| **架构层** | 速率限制 |⭐⭐⭐⭐ | 令牌桶、滑动窗口、自适应 | |
| **架构层** | AI 智能体 |⭐⭐⭐⭐⭐ | 强化学习决策、自适应导航 | |
| **架构层** | 自适应引擎 |⭐⭐⭐⭐ | 根据网站策略动态调整 | |
| **架构层** | 动态选择器 |⭐⭐⭐ | 智能选择器生成和验证 | |
| **架构层** | 特征工程 |⭐⭐⭐ | 页面、请求、行为特征提取 | |
| **架构层** | 模式识别 |⭐⭐⭐⭐ | 反爬虫机制检测、异常识别 | |
| **架构层** | 预测模型 |⭐⭐⭐ | 风险预测、趋势分析 | |
| **架构层** | 智能分类 |⭐⭐⭐ | 网站类型自动分类 | |
| **架构层** | 监控告警 |⭐⭐⭐ | 成功率、检测率监控 | |

---

**填写说明：**
- **优先级**：⭐(低) ~ ⭐⭐⭐⭐⭐(高)
- **AI 备注**：简要说明技术要点、关键思路或相关工具
- **个人备注**：留空供个人填写

---

## 前言

网络爬虫与反爬虫是一场持续的军备竞赛。随着检测技术的发展，现代网站已经构建了多层防御体系。本文系统整理反反爬虫技术体系，构建完整的技能树，帮助从业者从入门到精通。

本文面向：
- 网络爬虫开发者
- Web 自动化测试工程师
- 数据采集工程师
- 网络安全从业者

---

# 一、反反爬虫技术体系概览

## 1.1 检测与对抗的本质

| 维度 | 网站侧（检测） | 爬虫侧（反检测） |
|------|--------------|-----------------|
| **目标** | 识别自动化访问，保护数据/资源 | 模拟真实用户行为，获取目标数据 |
| **手段** | 指纹识别、行为分析、环境检测 | 指纹伪造、行为模拟、环境隔离 |
| **技术栈** | JS 检测、服务器检测、设备指纹 | 浏览器自动化、代理池、验证码识别 |

## 1.2 技能树全景图

```
反反爬虫技能树
│
├── 基础层（必学）
│   ├── HTTP 请求基础
│   ├── 浏览器工作原理
│   ├── 指纹技术原理
│   └── 请求管理
│
├── 环境层（核心）
│   ├── 浏览器指纹伪装
│   │   ├── Navigator 对象伪造
│   │   ├── CDP 检测绕过
│   │   └── Canvas/WebGL 指纹处理
│   ├── 网络环境隔离
│   │   ├── 代理池管理
│   │   ├── 代理轮换与失败切换
│   │   ├── TLS 指纹伪装
│   │   ├── WebRTC 防护
│   │   └── CDN 绕过
│   ├── 设备信息伪造
│   └── 反调试技术
│
├── 行为层（进阶）
│   ├── 鼠标/键盘行为模拟
│   │   ├── 贝塞尔曲线轨迹
│   │   ├── 点击位置偏移
│   │   └── 鼠标抖动
│   ├── 浏览器操作轨迹
│   │   ├── 窗口大小变化模拟
│   │   ├── 多标签页操作
│   │   ├── 浏览器历史操作
│   │   └── 右键操作模拟
│   └── 人类行为模式
│       ├── 拖放操作模拟
│       ├── 音频/视频交互
│       ├── 表单提交行为
│       ├── 键盘修正行为
│       ├── 触摸事件模拟
│       └── Hover 停留
│
├── 持久层（高级）
│   ├── Cookies/Session 管理
│   │   ├── Cookie 池管理
│   │   └── 多会话池管理
│   ├── 浏览器指纹持久化
│   │   ├── 浏览器 Profile
│   │   └── LocalStorage 管理
│   └── 状态同步（状态快照）
│
├── 验证层（专攻）
│   ├── 验证码识别（OCR/ML）
│   │   ├── OCR 验证码识别
│   │   ├── 滑动验证码破解
│   │   └── 验证码 AI 识别
│   ├── 人机验证绕过
│   │   └── reCAPTCHA 对抗
│   └── 行为验证对抗
│
└── 架构层（精通）
    ├── 分布式爬虫架构
    ├── 反检测策略库
    │   ├── 策略路由
    │   └── 速率限制
    ├── AI 智能化
    │   ├── AI 智能体
    │   ├── 自适应引擎
    │   └── 动态选择器
    ├── 机器学习（ML）
    │   ├── 特征工程
    │   ├── 模式识别
    │   ├── 预测模型
    │   └── 智能分类
    └── 监控告警
```

---

# 二、基础层技术详解

## 2.1 HTTP 请求基础

### 核心 HTTP 指纹

| 指标 | 检测内容 | 真实浏览器特征 | 常见爬虫问题 |
|------|----------|--------------|-------------|
| **User-Agent** | 浏览器标识 | 版本、操作系统、Chrome 版本号 | 过时/伪造不完整 |
| **Accept** | 内容协商 | `text/html,application/xhtml+xml,...` | 缺失或错误 |
| **Accept-Language** | 语言偏好 | `zh-CN,zh;q=0.9,en;q=0.8` | 缺失或单一 |
| **Accept-Encoding** | 压缩支持 | `gzip, deflate, br` | 缺失 |
| **Connection** | 连接控制 | `keep-alive` | 可能缺失 |
| **Upgrade-Insecure-Requests** | HTTPS 升级 | `1` | 通常缺失 |

### 实战要点

```python
# 完整的 HTTP 头部示例（以 Chrome 为例）
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0',
}
```

## 2.2 浏览器工作原理

### 关键概念

1. **渲染进程隔离**：每个标签页独立进程，沙箱环境
2. **JavaScript 执行引擎**：V8（Chrome）、SpiderMonkey（Firefox）
3. **DOM 树构建**：HTML 解析 → 树构建 → 布局 → 绘制
4. **事件循环**：宏任务/微任务调度机制

### 检测点

```javascript
// 1. 浏览器引擎识别
console.log(window.navigator.userAgentData?.platform);  // 'macOS'
console.log(window.navigator.userAgentData?.brands);      // Chrome 品牌

// 2. 特性检测
console.log('chrome' in window);        // Chrome 特定 API
console.log('webkit' in window);        // WebKit 特性

// 3. WebGL 渲染器
const gl = canvas.getContext('webgl');
console.log(gl.getParameter(gl.RENDERER));  // GPU 信息
```

## 2.3 指纹技术原理

### 指纹分类

| 指纹类型 | 唯一性 | 稳定性 | 检测难度 |
|---------|--------|--------|----------|
| Canvas 指纹 | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| WebGL 指纹 | ★★★★★ | ★★★★★ | ★★★★☆ |
| Audio 指纹 | ★★★★☆ | ★★★☆☆ | ★★★★☆ |
| 字体指纹 | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| 浏览器指纹 | ★★★★★ | ★★★★★ | ★★★☆☆ |
| 硬件指纹 | ★★★★★ | ★★★★★ | ★★★★★ |

---

## 2.4 HTTP/2 协议指纹

### HTTP/2 连接管理

| 指纹特征 | 检测内容 | 绕过策略 |
|----------|----------|----------|
| SETTINGS 帧 | 窗口大小、流控 | 使用真实浏览器值 |
| HEADERS 帧 | 权重压缩、方法优先级 | 匹配真实请求 |
| WINDOW_UPDATE | 增量大小设置 | 模拟真实浏览 |

### HTTP/2 伪装修饰

```python
# 使用 curl_cffi 进行 HTTP/2 指纹伪装
from curl_cffi import requests

# 禁用 HTTP/2 草级
session = requests.Session(impersonate="chrome120")

# 自定义 SETTINGS
response = session.get(
    url,
    http2_settings={
        'ENABLE_PUSH': False,
        'MAX_CONCURRENT_STREAMS': 100,
    }
)
```

## 2.5 WebSocket 处理

### WebSocket 连接特征

| 特征 | 真实浏览器 | 自动化工具检测点 |
|------|----------|--------------|
| 握手协议 | h2c/h3/h4/gp | 可能缺失或固定 |
| 扩展头 | permessage/compress | 可能缺失 |
| 心跳机制 | 间隔发送 | 可能不实现 |

### WebSocket 模拟实现

```python
import asyncio
import websockets
import json
import random
import time

class RealisticWebSocket:
    def __init__(self, url):
        self.url = url
        self.heartbeat_interval = random.randint(25, 40)
        self.last_ping = None

    async def connect(self):
        # 连接时发送正确的协议
        self.ws = await websockets.connect(
            self.url,
            extra_headers={
                'User-Agent': 'Mozilla/5.0...',
                'Sec-WebSocket-Protocol': 'permessage, deflate',
            }
        )

        # 启动心跳
        asyncio.create_task(self._heartbeat())

    async def send_message(self, data):
        await self.ws.send(json.dumps(data))

    async def _heartbeat(self):
        """模拟心跳机制"""
        while True:
            await asyncio.sleep(self.heartbeat_interval)

            # 发送 ping
            ping_data = {
                'type': 'ping',
                'timestamp': int(time.time() * 1000),
                'data': f'ping_{random.randint(1000, 9999)}'
            }
            await self.ws.send(json.dumps(ping_data))
            self.last_ping = time.time()

            # 接收超时检测
            if time.time() - self.last_ping > self.heartbeat_interval * 3:
                await self.reconnect()

    async def reconnect(self):
        """断线重连"""
        await self.ws.close()
        await asyncio.sleep(random.uniform(2, 5))
        await self.connect()

    async def close(self):
        await self.ws.close()
```

## 2.6 HTTP 缓存控制

### 缓存控制策略

| 头部字段 | 作用 | 使用场景 |
|----------|------|----------|
| ETag | 版本标识 | 资源监控 |
| If-None-Match | 缓存指令 | 精确控制 |
| If-Modified-Since | 增量更新 | 避免重复下载 |
| Cache-Control | 缓存策略 | 控制缓存行为 |

### 智能缓存管理

```python
import hashlib
import time

class SmartCacheManager:
    def __init__(self):
        self.cache = {}
        self.etags = {}

    def should_fetch(self, url, headers):
        """判断是否需要获取新内容"""
        # 1. 检查 ETag
        if 'ETag' in headers:
            etag = headers['ETag']
            if url in self.etags and self.etags[url] == etag:
                return False

        # 2. 检查 Cache-Control
        cache_control = headers.get('Cache-Control', '')
        if 'no-cache' in cache_control:
            return True
        if 'max-age' in cache_control:
            # 解析 max-age
            max_age = int(cache_control.split('max-age=')[1].split(',')[0])
            cached_time = self.cache.get(f'{url}_time', 0)
            return time.time() - cached_time > max_age

        return True

    def update_cache(self, url, response):
        """更新缓存"""
        # 保存 ETag
        if 'ETag' in response.headers:
            self.etags[url] = response.headers['ETag']

        # 保存时间
        self.cache[f'{url}_time'] = time.time()
```

## 2.7 Cookie 属性控制

### Cookie 属性详解

| 属性 | 作用 | 绕过用途 |
|------|------|----------|
| Secure | 仅 HTTPS 传输 | 防止明文传输 |
| HttpOnly | 禁止 JS 访问 | 防止 XSS 读取 |
| SameSite | 跨域控制 | 限制 Cookie 范围 |
| SameParty | 跨域控制 | 同站子域共享 |
| Path | 路径限制 | 限制 Cookie 路径 |
| Domain | 域名限制 | 限制 Cookie 域名 |
| Max-Age | 过期时间 | 设置 Cookie 生命周期 |
| Expires | 绝对过期时间 | 设置 Cookie 生命周期 |

### Cookie 属性伪造示例

```python
def create_secure_cookie(name, value, domain):
    """创建安全 Cookie"""
    return {
        'name': name,
        'value': value,
        'domain': domain,
        'path': '/',
        'secure': True,           # 仅 HTTPS
        'httponly': False,         # 允许 JS 访问
        'samesite': 'Lax',        # 严格同站
        'max-age': 3600 * 24,     # 24 小时过期
        'sameparty': 'None',       # 不跨域
    }

# 创建指纹 Cookie（长期）
fingerprint_cookies = {
    '_ga': create_secure_cookie('_ga', 'GA1.2.xxxxxxxxx', '.google.com'),
    '_gid': create_secure_cookie('_gid', 'GA1.2.yyyyyyyyy', '.google.com'),
    '__cfduid': create_secure_cookie('__cfduid', 'cfduid_hash', '.example.com'),
}

# 创建会话 Cookie（短期）
session_cookie = create_secure_cookie('sessionid', 'session_token_hash', '.example.com')
session_cookie['max-age'] = 3600  # 1 小时过期
```

## 2.8 请求头完整性

### 常见请求头组合

| 头部 | 作用 | Chrome 典型值 | 检测重要性 |
|------|------|--------------|----------|
| **User-Agent** | 浏览器标识 | Chrome 131.0.0.0 Safari/537.36 | ⭐⭐⭐⭐⭐ |
| **Accept Sec-Fetch** | 请求模式 | document/cors/navigate | ⭐⭐⭐⭐ |
| **Sec-Fetch-Site** | 跨域控制 | cross-site/same-origin/none | ⭐⭐⭐⭐ |
| **Sec-Fetch-User** | 用户激活 | ?1 或 ?0 | ⭐⭐⭐⭐ |
| **Sec-Fetch-Mode** | 请求模式 | navigate/cors/navigate | ⭐⭐⭐⭐ |
| **Sec-Ch-Ua** | 客户端提示 | Android/Windows/macOS | ⭐⭐⭐ |
| **Sec-Ch-Ua-Platform** | 操作系统 | Android/iOS/Windows/macOS | ⭐⭐⭐ |
| **Sec-Ch-Ua-Mobile** | 移动标识 | ?0 或 ?1 | ⭐⭐⭐ |
| **Sec-Ch-Ua-Arch** | 架构 | x86/x64/arm | ⭐⭐ |

### 完整请求头示例

```python
def get_complete_headers(user_agent):
    """生成完整的 Chrome 请求头"""
    return {
        'User-Agent': user_agent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Sec-Ch-Ua': '"Windows"; v="131", u="0", a="Google Chrome 131.0.0.0 Safari/537.36"',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Arch': '"x86"',
        'DNT': '1',
        'Sec-GPC': '1',
        'Cache-Control': 'max-age=0',
        'sec-ch-ua': ' "Not_A;Brand";v="8", "Chromium";v="8", "Google Chrome";v="131"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-full-version-list': '"Not_A;Brand";v="8", "Chromium";v="8", "Google Chrome";v="131"',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua-arch': '"x86"',
        'sec-ch-ua-bitness': '"32"',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-wow64': '?0',
    }
```

## 2.9 Referer 链管理

### 合理的 Referer 生成

```python
import random
from urllib.parse import urlparse

class RefererManager:
    """Referer 管理器"""

    def __init__(self):
        self.history = []
        self.max_history = 10

    def get_referer(self, target_url):
        """获取合理的 Referer"""
        # 解析目标域名
        target_domain = urlparse(target_url).netloc

        # 检查历史记录
        for url in reversed(self.history):
            domain = urlparse(url).netloc
            if domain == target_domain:
                return url

        # 同域无历史，使用首页
        return f'https://{target_domain}/'

    def update_history(self, url):
        """更新访问历史"""
        self.history.append(url)

        # 保持历史长度
        if len(self.history) > self.max_history:
            self.history.pop(0)
```

## 2.10 断点续传

### 大文件下载续传

```python
import os
import requests

class ResumableDownloader:
    """支持断点续传的下载器"""

    def __init__(self, chunk_size=8192):
        self.chunk_size = chunk_size

    def download(self, url, save_path, headers=None):
        """带续传的下载"""
        # 检查已下载部分
        downloaded = 0
        temp_file = f'{save_path}.tmp'

        if os.path.exists(temp_file):
            downloaded = os.path.getsize(temp_file)

        # 设置 Range 头
        if headers is None:
            headers = {}

        if downloaded > 0:
            headers['Range'] = f'bytes={downloaded}-'

        # 下载
        mode = 'ab' if downloaded > 0 else 'wb'

        with open(temp_file, mode) as f:
            with requests.get(url, headers=headers, stream=True) as r:
                total_size = int(r.headers.get('content-length', 0))

                for chunk in r.iter_content(chunk_size=self.chunk_size):
                    f.write(chunk)
                    downloaded += len(chunk)

                    # 显示进度
                    self._show_progress(downloaded, total_size)

        # 重命名
        os.rename(temp_file, save_path)

    def _show_progress(self, downloaded, total):
        percent = (downloaded / total) * 100 if total > 0 else 100
        print(f'\r下载进度: {percent:.1f}% ({downloaded}/{total})', end='')
```

## 2.11 请求重试机制

### 智能重试策略

```python
import time
import random
from functools import wraps

def retry_with_backoff(max_retries=3, base_delay=1, backoff_factor=2):
    """带指数退避的重试装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            retries = 0
            last_exception = None

            while retries < max_retries:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    retries += 1

                    if retries < max_retries:
                        # 计算退避延迟
                        delay = base_delay * (backoff_factor ** (retries - 1))
                        delay = delay + random.uniform(0, 1)

                        print(f'重试 {retries}/{max_retries}，延迟 {delay:.2f}s')
                        time.sleep(delay)

            raise last_exception

        return wrapper
    return decorator

# 使用示例
@retry_with_backoff(max_retries=3, base_delay=1, backoff_factor=2)
def fetch_url(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.json()
```

## 2.12 请求并发控制

### 并发请求管理

```python
import asyncio
import aiohttp
from asyncio import Semaphore

class ConcurrentRequestManager:
    """并发请求管理器"""

    def __init__(self, max_concurrent=10):
        self.semaphore = Semaphore(max_concurrent)

    async def fetch(self, url, session):
        """带并发控制的请求"""
        async with self.semaphore:
            try:
                async with session.get(url) as response:
                    return await response.text()
            except Exception as e:
                print(f'请求失败 {url}: {e}')
                return None

    async def fetch_all(self, urls):
        """并发请求所有 URL"""
        async with aiohttp.ClientSession() as session:
            tasks = [self.fetch(url, session) for url in urls]
            results = await asyncio.gather(*tasks)

        return results

# 使用示例
manager = ConcurrentRequestManager(max_concurrent=5)
results = await manager.fetch_all(urls)
```

## 2.13 Cookie 同步策略

### 多账号 Cookie 同步

```python
class CookieSync:
    """Cookie 同步器"""

    def __init__(self, storage_path):
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(exist_ok=True)

    def sync_cookies(self, page, account_id):
        """同步 Cookie 到浏览器"""
        cookie_file = self.storage_path / f'cookies_{account_id}.json'

        if cookie_file.exists():
            with open(cookie_file) as f:
                cookies = json.load(f)

            # 清除现有 Cookies
            page.context.clear_cookies()

            # 添加 Cookies
            for cookie in cookies:
                page.context.add_cookie(cookie)

    def update_cookies(self, page, account_id):
        """更新 Cookie 存储"""
        cookies = page.context.cookies()

        cookie_file = self.storage_path / f'cookies_{account_id}.json'

        with open(cookie_file, 'w') as f:
            json.dump(cookies, f)
```

## 2.14 Cookie 域名处理

### 跨域 Cookie 策略

```python
def add_cookie_with_domain(cookie, page):
    """根据 Cookie 添加域Cookie"""
    # 获取当前域名
    current_domain = page.evaluate('window.location.hostname')

    # 处理 Cookie 域名
    cookie_domain = cookie.get('domain')

    if cookie_domain and cookie_domain.startswith('.'):
        # 域名以点开头，所有子域共享
        pass
    elif cookie_domain:
        # 特定域名
        pass
    else:
        # 当前域名
        cookie['domain'] = current_domain

    page.context.add_cookie(cookie)
```

## 2.15 Cookie 属性处理

### HttpOnly 和 Secure Cookie

```python
def secure_cookie_from_string(cookie_string, domain):
    """从 Cookie 字符串创建安全 Cookie"""
    parts = cookie_string.split(';')

    name_value = parts[0].split('=', 1)
    cookie = {
        'name': name_value[0],
        'value': name_value[1] if len(name_value) > 1 else '',
        'domain': domain,
        'path': '/',
    }

    # 解析属性
    for part in parts[1:]:
        part = part.strip().lower()

        if part == 'httponly':
            cookie['httpOnly'] = True
        elif part == 'secure':
            cookie['secure'] = True
        elif part.startswith('path='):
            cookie['path'] = part[5:].strip('"')
        elif part.startswith('max-age='):
            cookie['expires'] = time.time() + int(part[8:])
        elif part.startswith('expires='):
            # 解析日期
            pass

    return cookie
```

---

# 三、环境层：浏览器指纹伪装

## 3.1 Navigator 对象指纹

### 关键属性伪造

| 属性 | 真实值 | 自动化工具默认 | 重要性 |
|------|-------|--------------|--------|
| `navigator.webdriver` | `undefined` | `true` | ⭐⭐⭐⭐⭐ |
| `navigator.plugins` | 对象数组 | `[]` | ⭐⭐⭐⭐ |
| `navigator.languages` | 语言数组 | `[]` | ⭐⭐⭐ |
| `navigator.platform` | 平台字符串 | 可能不匹配 | ⭐⭐⭐⭐ |
| `navigator.hardwareConcurrency` | CPU 核心数 | 固定值 | ⭐⭐⭐ |
| `navigator.deviceMemory` | 内存大小 | 固定值 | ⭐⭐ |

### Puppeteer 检测绕过示例

```javascript
// 1. 基础 webdriver 属性移除
await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
  });
});

// 2. 完整 plugins 伪造
await page.evaluateOnNewDocument(() => {
  navigator.plugins = [
    {
      name: 'Chrome PDF Plugin',
      description: 'Portable Document Format',
      filename: 'internal-pdf-viewer',
    },
    {
      name: 'Chrome PDF Viewer',
      description: '',
      filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
    },
    {
      name: 'Native Client',
      description: '',
      filename: 'internal-nacl-plugin',
    },
  ];
});

// 3. languages 伪造
await page.evaluateOnNewDocument(() => {
  navigator.languages = ['zh-CN', 'zh', 'en-US', 'en'];
});

// 4. platform 伪造
await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'platform', {
    get: () => 'MacIntel',
  });
});
```

## 3.2 Chrome DevTools Protocol 检测

### 检测原理

CDP（Chrome DevTools Protocol）为自动化控制提供接口，但会留下特征：

```javascript
// 检测方法 1：错误堆栈检测
const error = new Error();
const isAutomated = error.stack.includes('puppeteer') ||
                    error.stack.includes('playwright') ||
                    error.stack.includes('selenium');

// 检测方法 2：window.chrome 属性
// 自动化工具可能缺少完整的 chrome 对象结构

// 检测方法 3：外部脚本注入检测
const scripts = Array.from(document.scripts);
const hasInjectedScripts = scripts.some(s =>
  s.src.includes('puppeteer') || !s.src && s.innerHTML.includes('evaluate')
);
```

### 绕过策略

```javascript
// 使用 undetected-chromedriver (Python)
// 或 puppeteer-extra-plugin-stealth (Node.js)
```

## 3.3 WebGL 与 Canvas 指纹

### Canvas 指纹检测

```javascript
// 获取 Canvas 指纹
function getCanvasFingerprint() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Fingerprint', 2, 2);
  return canvas.toDataURL();
}
```

### WebGL 指纹检测

```javascript
// 获取 WebGL 指纹
function getWebGLFingerprint() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return null;

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

  return { renderer, vendor };
}
```

### 指纹随机化策略

```javascript
// Canvas 指纹注入噪声
const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = function() {
  const result = originalToDataURL.apply(this, arguments);
  // 在结果中注入微小噪声
  return result.slice(0, -5) + Math.random().toString(36).slice(2, 5);
};
```

## 3.4 网络环境隔离

### 代理池管理

| 代理类型 | 优势 | 劣势 | 适用场景 |
|---------|------|------|----------|
| HTTP 代理 | 成本低、易获取 | 明文传输、易被封锁 | 低价值目标 |
| HTTPS 代理 | 加密传输 | 成本较高 | 中等价值目标 |
| SOCKS5 代理 | 支持所有协议 | 配置复杂 | 高价值目标 |
| 住宅代理 | IP 可信度高 | 成本极高 | 严格检测场景 |
| 移动代理 | 4G/5G 真实 IP | 动态不稳定 | 移动端场景 |

### 代理轮换策略

```python
import random
import time

class ProxyPool:
    def __init__(self, proxies):
        self.proxies = proxies
        self.failed = {}
        self.cooldown = {}

    def get_proxy(self):
        # 排除冷却中的代理
        available = [p for p in self.proxies
                    if p not in self.cooldown
                    or time.time() > self.cooldown[p]]

        # 按失败率加权随机
        weights = [1 / (1 + self.failed.get(p, 0)) for p in available]
        return random.choices(available, weights=weights)[0]

    def mark_failed(self, proxy):
        self.failed[proxy] = self.failed.get(proxy, 0) + 1
        # 失败次数多则冷却更久
        self.cooldown[proxy] = time.time() + min(300, self.failed[proxy] * 60)
```

## 3.5 设备信息伪造

### 屏幕分辨率

```javascript
// 匹配常见分辨率
const resolutions = [
  [1920, 1080],  // FHD
  [1366, 768],   // 笔记本
  [2560, 1440],  // 2K
  [1440, 900],   // MacBook Pro 13"
  [1680, 1050],  // MacBook Pro 15"
];

const [width, height] = resolutions[Math.floor(Math.random() * resolutions.length)];

Object.defineProperty(screen, 'width', { get: () => width });
Object.defineProperty(screen, 'height', { get: () => height });
Object.defineProperty(window, 'innerWidth', { get: () => width });
Object.defineProperty(window, 'innerHeight', { get: () => height });
```

### 时区与语言

```javascript
// 时区设置应与 IP 地理位置一致
const timezones = {
  'US': 'America/New_York',
  'CN': 'Asia/Shanghai',
  'JP': 'Asia/Tokyo',
  'EU': 'Europe/London',
};

// 注意：时区不能通过 JS 直接修改，需要在浏览器启动时设置
// Chrome: --timezone="Asia/Shanghai"
```

## 3.6 TLS 指纹伪装

### TLS 指纹检测原理

网站可以通过 TLS Client Hello 包的特征识别客户端：

| 指纹类型 | 检测内容 | 绕过难度 |
|---------|----------|----------|
| JA3 | TLS 版本、密码套件、扩展顺序 | ⭐⭐⭐⭐ |
| JA4 | 改进的 JA3，包含更多细节 | ⭐⭐⭐⭐⭐ |
| HTTP/2 指纹 | SETTINGS 帧参数、窗口大小 | ⭐⭐⭐ |
| HTTP/3 指纹 | QUIC 参数 | ⭐⭐⭐⭐ |

### TLS 指纹伪装方案

```python
# 使用 curl_cffi 进行 TLS 指纹伪装
from curl_cffi import requests, Curl

# 使用预设的浏览器指纹
session = requests.Session(impersonate="chrome110")

# 自定义指纹
curl = Curl()
curl.setopt(curl.IMPERSONATE, "chrome120")
curl.setopt(curl.URL, "https://example.com")
curl.perform()
```

```python
# Playwright + curl-impersonate
from playwright.sync_api import sync_playwright
import subprocess

# 启动带有 TLS 伪装的代理
# 详见: https://github.com/lwthiker/curl-impersonate
```

## 3.7 WebRTC 防护

### WebRTC IP 泄露原理

WebRTC 可以绕过代理，泄露真实 IP：

```javascript
// 检测 WebRTC 泄露
const pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

pc.createOffer().then(offer => {
  // SDP 中可能包含真实 IP
  console.log(offer.sdp);
});
```

### 防护方案

```javascript
// 1. 禁用 WebRTC
await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'mediaDevices', {
    get: () => undefined,
  });
});

// 2. 使用浏览器插件
// Chrome: WebRTC Leak Shield
// Firefox: Disable WebRTC

// 3. Playwright 防护
context = browser.new_context(
  permissions=['geolocation'],  # 限制权限
  # 禁用 WebRTC
)
```

## 3.8 CDN 绕过

### Cloudflare 检测机制

| 检测维度 | 检测内容 | 绕过策略 |
|---------|----------|----------|
| TLS 指纹 | JA3/JA4 匹配 | 使用真实浏览器指纹 |
| JavaScript | 挑战脚本执行 | 完整 JS 引擎 |
| HTTP/2 | SETTINGS 帧 | 使用 curl-impersonate |
| 行为分析 | 访问模式 | 模拟人类行为 |

### Cloudflare 绕过方案

```python
# 1. 使用 curl_cffi
from curl_cffi import requests

# Chrome 浏览器指纹
response = requests.get(
    url,
    impersonate="chrome120",
    headers={
        'User-Agent': 'Mozilla/5.0 ...',
        'Accept': 'text/html,application/xhtml+xml...',
    }
)

# 2. 使用 undetected-chromedriver
import undetected_chromedriver as uc

driver = uc.Chrome()
driver.get(url)

# 3. 使用 playwright + proxy
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(
        proxy={'server': 'http://proxy'},
        args=[
            '--disable-blink-features=AutomationControlled',
        ]
    )
```

## 3.9 反调试技术

### 调试器检测

```javascript
// 检测方法 1: debugger 语句
setInterval(() => {
  const start = Date.now();
  debugger;
  if (Date.now() - start > 100) {
    // 调试器打开
    console.log('Debugger detected!');
  }
}, 1000);

// 检测方法 2: DevTools 检测
const devtools = /./;
devtools.toString = function() {
  this.opened = true;
}

// 检测方法 3: window 对象检测
if (window.chrome && window.chrome.webstore) {
  // 可能是自动化工具
}
```

### 绕过策略

```python
# 1. 禁用 debugger
await page.evaluateOnNewDocument(() => {
  window.debugger = () => {};
  setInterval = new Proxy(setInterval, {
    apply: (target, thisArg, args) => {
      if (args[0]?.toString?.()?.includes('debugger')) {
        return;
      }
      return Reflect.apply(target, thisArg, args);
    }
  });
});

# 2. 启动参数
browser = p.chromium.launch(
    args=[
        '--disable-dev-shm-usage',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-blink-features=AutomationControlled',
    ]
)

# 3. 注入反检测脚本
stealth_script = """
Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
"""
await page.add_init_script(stealth_script)
```

## 3.10 请求管理

### 请求拦截与修改

```python
# Playwright 请求拦截
async def handle_route(route):
    # 修改请求头
    headers = route.request.headers
    headers['X-Custom-Header'] = 'value'

    # 阻止特定资源
    if route.request.resource_type in ['image', 'font']:
        await route.abort()
    else:
        await route.continue_(headers=headers)

page.route('**/*', handle_route)
```

### 资源控制

```python
# 控制资源加载
context = browser.new_context(
    # 禁用图片加载
    accept_downloads=False,
)

# 拦截并响应自定义内容
await page.route('**/*.{png,jpg,jpeg}', lambda route: route.fulfill(
    status=404,
    body=b''
))
```

## 3.11 代理健康检查

### 代理质量检测

```python
import asyncio
import aiohttp
import time

class ProxyHealthChecker:
    def __init__(self):
        self.proxies = {}  # {proxy_url: {last_check, success_rate, latency}}

    async def check_proxy(self, proxy_url):
        """检查单个代理"""
        start_time = time.time()

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    'https://httpbin.org/ip',
                    proxy=proxy_url,
                    timeout=aiohttp.ClientTimeout(total=10)
                ) as response:
                    latency = time.time() - start_time
                    if response.status == 200:
                        return {
                            'status': 'success',
                            'latency': latency,
                            'ip': (await response.json()).get('origin')
                        }
        except Exception as e:
            return {'status': 'failed', 'error': str(e)}

    async def check_all_proxies(self, proxy_list):
        """检查所有代理"""
        results = await asyncio.gather(
            *[self.check_proxy(p) for p in proxy_list],
            return_exceptions=True
        )

        for proxy, result in zip(proxy_list, results):
            if result and result.get('status') == 'success':
                self.proxies[proxy] = {
                    'last_check': time.time(),
                    'latency': result['latency'],
                    'ip': result['ip']
                }

        return self.proxies
```

## 3.12 IP 地理位置匹配

### 时区与 IP 匹配

```python
from datetime import datetime
import pytz

class GeoLocationMatcher:
    def __init__(self):
        # 代理 IP 对应的时区
        self.proxy_timezones = {
            'US': 'America/New_York',
            'US-West': 'America/Los_Angeles',
            'EU': 'Europe/London',
            'EU-West': 'Europe/Paris',
            'CN': 'Asia/Shanghai',
            'JP': 'Asia/Tokyo',
            'KR': 'Asia/Seoul',
            'SG': 'Asia/Singapore',
            'AU': 'Australia/Sydney',
            'IN': 'Asia/Kolkata',
        }

    def match_timezone(self, proxy_region):
        """根据代理地区匹配时区"""
        return self.proxy_timezones.get(proxy_region, 'UTC')

    def set_browser_timezone(self, page, timezone_str):
        """设置浏览器时区"""
        # 通过启动参数设置
        # Chrome: --timezone="Asia/Shanghai"
        # 或通过 JS 注入修改 Date 对象行为

        page.evaluate(f'''
            () => {{
                const originalDate = Date;
                const timezone = '{timezone_str}';

                // 覆盖 getTimezoneOffset
                Date.prototype.getTimezoneOffset = function() {{
                    const offset = new Date().toLocaleString('en-US', {{
                        timeZone: timezone,
                        timeZoneName: 'short'
                    }});

                    // 解析时差（小时）
                    const match = offset.match(/GMT([+-]{{0,1}}\\d+){{0,1}}\\d*)/);
                    if (match) {{
                        return parseInt(match[1]) * 60;
                    }}
                    return 0;
                }};

                // 覆盖 toString
                Date.prototype.toString = function() {{
                    return this.toLocaleString('en-US', {{
                        timeZone: timezone,
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZoneName: 'short'
                    }});
                }};
            }}
        ''')
```

## 3.13 字体指纹伪造

### 字体检测原理

```javascript
// 网站检测安装的字体
function detectFonts() {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testFonts = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia'];

    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';
    const h = document.getElementsByTagName('body')[0];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const fontMap = {};

    baseFonts.forEach(function(baseFont) {
        testFonts.forEach(function(font) {
            context.font = testSize + ' ' + font + ', ' + baseFont;
            context.fillText(testString, 0, 0);

            const dataUrl = canvas.toDataURL();
            fontMap[font] = dataUrl;
        });
    });

    return fontMap;
}
```

### 字体指纹伪造

```python
# Playwright + 字体注入
def inject_font_fingerprint(page):
    """注入字体指纹"""

    # 方法1: 伪装已安装字体
    page.evaluate_on_new_document("""
        () => {
            // 覆盖 measureText 和其他字体检测方法
            const originalMeasureText = CanvasRenderingContext2D.prototype.measureText;

            CanvasRenderingContext2D.prototype.measureText = function(text) {
                // 添加随机噪声使指纹不一致
                const result = originalMeasureText.call(this, text);
                result.width += Math.random() * 0.01;
                return result;
            };
        }
    """)

    # 方法2: 使用字体回退列表
    context.fonts = [
        'Arial', 'Times New Roman', 'Courier New',
        'Verdana', 'Georgia', 'Palatino',
        'Garamond', 'Bookman', 'Comic Sans MS',
        'Trebuchet MS', 'Arial Black', 'Impact'
    ]
```

## 3.14 Web Audio 指纹处理

### Audio 指纹检测

```javascript
// Audio 指纹获取
function getAudioFingerprint() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const analyser = audioContext.createAnalyser();
    const gain = audioContext.createGain();
    const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

    gain.gain.value = 0; // 静音

    oscillator.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(0);

    const audioData = [];
    scriptProcessor.onaudioprocess = (e) => {
        audioData.push(e.inputBuffer.getChannelData(0));
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            oscillator.stop(0);
            audioContext.close();
            resolve(audioData);
        }, 100);
    });
}
```

### Audio 指纹伪装

```python
def spoof_audio_fingerprint(page):
    """伪装 Audio 指纹"""

    page.evaluate_on_new_document("""
        () => {
            // Hook AudioContext
            const AudioContext = window.AudioContext || window.webkitAudioContext;

            if (AudioContext) {
                // 重写 createOscillator
                const originalCreateOscillator = AudioContext.prototype.createOscillator;

                AudioContext.prototype.createOscillator = function() {
                    const oscillator = originalCreateOscillator.call(this);
                    const originalStart = oscillator.start.bind(oscillator);

                    oscillator.start = function(when) {
                        // 添加随机噪声
                        this.detune.value = Math.random() * 10 - 5;
                        return originalStart(when || 0);
                    };

                    return oscillator;
                };
            }

            // Hook AnalyserNode
            const AudioContext = window.AudioContext || window.webkitAudioContext;

            if (AudioContext) {
                const originalCreateAnalyser = AudioContext.prototype.createAnalyser;

                AudioContext.prototype.createAnalyser = function() {
                    const analyser = originalCreateAnalyser.call(this);
                    analyser.fftSize = 2048 + Math.floor(Math.random() * 10);
                    return analyser;
                };
            }
        }
    """)
```

## 3.15 Battery API 伪造

### 电池状态检测

```javascript
// 获取电池信息
navigator.getBattery().then(battery => {
    console.log('Battery level:', battery.level);        // 0-1
    console.log('Charging:', battery.charging);            // boolean
    console.log('Charging time:', battery.chargingTime);  // seconds
    console.log('Discharging time:', battery.dischargingTime);
});
```

### 电池信息伪造

```python
def spoof_battery_api(page):
    """伪造电池信息"""

    page.evaluate_on_new_document("""
        () => {
            Object.defineProperty(navigator, 'getBattery', {
                value: () => Promise.resolve({
                    charging: Math.random() > 0.5,
                    chargingTime: Math.random() > 0.5 ? Infinity : 3600,
                    dischargingTime: Math.random() > 0.5 ? Infinity : 7200,
                    level: 0.3 + Math.random() * 0.6,  // 30%-90%
                    addEventListener: () => {},
                    removeEventListener: () => {}
                }),
                writable: false
            });
        }
    """)
```

## 3.16 Network API 伪造

### 网络信息检测

```javascript
// 获取网络信息
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

console.log('Effective Type:', connection.effectiveType);  // 4g, 3g, 2g
console.log('Downlink:', connection.downlink);              // Mbps
console.log('RTT:', connection.rtt);                        // 往返时间 ms
console.log('Save Data:', connection.saveData);            // 省流量模式
```

### 网络信息伪造

```python
def spoof_network_api(page):
    """伪造网络信息"""

    page.evaluate_on_new_document("""
        () => {
            Object.defineProperty(navigator, 'connection', {
                value: {
                    effectiveType: '4g',
                    rtt: Math.floor(Math.random() * 100) + 50,  // 50-150ms
                    downlink: Math.floor(Math.random() * 10) + 5,  // 5-15 Mbps
                    saveData: false,
                    addEventListener: () => {},
                    removeEventListener: () => {},
                    onchange: null,
                    ontypechange: null
                },
                writable: false
            });
        }
    """)
```

## 3.17 Screen API 伪造

### 屏幕信息检测

```javascript
// 屏幕方向
console.log(screen.orientation.type);      // landscape-primary
console.log(screen.orientation.angle);     // 90, 180, 270, 0

// 像素比
console.log(window.devicePixelRatio);      // 1, 2, 3

// 颜色深度
console.log(screen.colorDepth);            // 24, 32
```

### 屏幕信息伪造

```python
def spoof_screen_api(page):
    """伪造屏幕信息"""

    page.evaluate_on_new_document("""
        () => {
            // 屏幕方向
            Object.defineProperty(screen.orientation, 'type', {
                get: () => 'landscape-primary',
                configurable: true
            });

            // 像素比
            Object.defineProperty(window, 'devicePixelRatio', {
                get: () => 2,
                configurable: true
            });

            // 颜色深度
            Object.defineProperty(screen, 'colorDepth', {
                get: () => 24,
                configurable: true
            });
        }
    """)
```

## 3.18 Permissions API 控制

### 权限请求检测

```javascript
// 检查权限状态
navigator.permissions.query({name: 'notifications'}).then(result => {
    console.log('Notification permission:', result.state);  // granted, denied, prompt
});

// 检查多个权限
const permissions = ['notifications', 'geolocation', 'camera', 'microphone'];

Promise.all(permissions.map(p => navigator.permissions.query({name: p}))).then(results => {
    results.forEach(r => {
        console.log(r.name, ':', r.state);
    });
});
```

### 权限控制策略

```python
def control_permissions(page):
    """控制权限请求"""

    # 方式1: 自动授权
    context = browser.new_context(
        geolocation={'latitude': 39.9, 'longitude': 116.4},
        permissions=['geolocation', 'notifications']
    )

    # 方式2: 拦截权限请求
    page.route('**/api/permissions/**', lambda route: route.fulfill(
        status=200,
        body='{"permissions": ["notifications", "geolocation"]}'
    ))

    # 方式3: 修改 Permissions API
    page.evaluate_on_new_document("""
        () => {
            const Permissions = window.Permissions || window.webkitPermissions;

            if (Permissions) {
                const originalQuery = Permissions.prototype.query;

                Permissions.prototype.query = function(permissionDesc) {
                    return Promise.resolve({
                        state: 'granted',
                        name: permissionDesc.name,
                        onchange: null
                    });
                };
            }
        }
    """)
```

## 3.19 Geolocation 伪造

### 地理位置检测

```javascript
// 获取位置
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log('Lat:', position.coords.latitude);
        console.log('Lon:', position.coords.longitude);
        console.log('Accuracy:', position.coords.accuracy);
    },
    (error) => {
        console.error('Error:', error.message);
    }
);
```

### 地理位置伪造

```python
def spoof_geolocation(page, latitude, longitude):
    """伪造地理位置"""

    page.evaluate_on_new_document(f"""
        () => {{
            const fakePosition = {{
                coords: {{
                    latitude: {latitude},
                    longitude: {longitude},
                    accuracy: 100 + Math.random() * 500,
                    altitude: null,
                    altitudeAccuracy: null,
                    heading: null,
                    speed: null
                }},
                timestamp: Date.now()
            }};

            const originalGetCurrentPosition = navigator.geolocation.getCurrentPosition;
            const originalWatchPosition = navigator.geolocation.watchPosition;
            const originalClearWatch = navigator.geolocation.clearWatch;

            navigator.geolocation.getCurrentPosition = function(success, error) {{
                if (success) success(fakePosition);
            }};

            navigator.geolocation.watchPosition = function(success, error, options) {{
                if (success) success(fakePosition);
                return 1; // watch ID
            }};

            navigator.geolocation.clearWatch = function(id) {{
                // Do nothing
            }};
        }}
    """)
```

## 3.20 WebGL 参数随机化

### WebGL 参数检测

```javascript
// WebGL 渲染器参数
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');

console.log('MAX_TEXTURE_SIZE:', gl.getParameter(gl.MAX_TEXTURE_SIZE));
console.log('MAX_VIEWPORT_DIMS:', gl.getParameter(gl.MAX_VIEWPORT_DIMS));
console.log('RENDERER:', gl.getParameter(gl.RENDERER));
console.log('VENDOR:', gl.getParameter(gl.VENDOR));
console.log('VERSION:', gl.getParameter(gl.VERSION));
```

### WebGL 参数伪造

```python
def randomize_webgl_params(page):
    """随机化 WebGL 参数"""

    page.evaluate_on_new_document("""
        () => {
            const getParameter = WebGLRenderingContext.prototype.getParameter;

            WebGLRenderingContext.prototype.getParameter = function(parameter) {
                const result = getParameter.call(this, parameter);

                // 随机化某些参数
                switch (parameter) {
                    case 37445:  // MAX_TEXTURE_SIZE
                        return result + Math.floor(Math.random() * 100) - 50;
                    case 32802:  // MAX_VIEWPORT_DIMS
                        return [result[0], result[1]];
                    case 7938:   // MAX_VIEWPORT_DIMS
                        return [result[0], result[1]];
                    default:
                        return result;
                }
            };
        }
    """)
```

## 3.21 Chrome DevTools 指纹隐藏

### DevTools 检测绕过

```python
def hide_devtools_fingerprints(page):
    """隐藏 DevTools 特征"""

    page.evaluate_on_new_document("""
        () => {
            // 1. 移除 chrome.runtime 对象
            if (window.chrome && window.chrome.runtime) {
                delete window.chrome.runtime;
            }

            // 2. 移除调试器检测
            const originalDebugger = window.debugger;
            window.debugger = () => {};

            // 3. 移除外检测脚本标记
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.innerHTML.includes('evaluate')) {
                    script.remove();
                }
            });

            // 4. 移除错误堆栈中的 puppeteer 标记
            const originalError = Error;
            window.Error = function(...args) {
                const error = new originalError(...args);
                if (error.stack) {
                    error.stack = error.stack
                        .replace(/puppeteer/g, '')
                        .replace(/playwright/g, '')
                        .replace(/selenium/g, '');
                }
                return error;
            };
        }
    """)
```

## 3.22 iframe 内容伪装

### iframe 检测处理

```python
def spoof_iframe_fingerprints(page):
    """处理 iframe 指纹检测"""

    page.evaluate_on_new_document("""
        () => {
            // Hook iframe 创建
            const originalCreateElement = document.createElement;

            document.createElement = function(tagName) {
                const element = originalCreateElement.call(this, tagName);

                if (tagName.toLowerCase() === 'iframe') {
                    // 监听 iframe 加载
                    element.addEventListener('load', function() {
                        try {
                            const iframeWindow = element.contentWindow;

                            if (iframeWindow) {
                                // 在 iframe 中注入伪装脚本
                                Object.defineProperty(
                                    iframeWindow.navigator,
                                    'webdriver',
                                    { get: () => undefined }
                                );

                                // 注入插件伪造
                                iframeWindow.navigator.plugins = [
                                    { name: 'Chrome PDF Plugin' }
                                ];
                            }
                        } catch (e) {
                            // 跨域 iframe 无法访问
                        }
                    });
                }

                return element;
            };
        }
    """)
```

## 3.23 媒体编解码器伪造

### Codec 检测与伪装

```python
def spoof_media_codecs(page):
    """伪造媒体编解码器支持"""

    page.evaluate_on_new_document("""
        () => {
            // 伪造 MediaCapabilities
            const originalGetCapabilities = navigator.mediaCapabilities;

            if (originalGetCapabilities) {
                const mockCapabilities = {
                    decodingInfo: {
                        powerEfficient: true,
                        smooth: true,
                        supportedPowerEfficient: [],
                        supportedSmooth: [],
                    },
                    encodingInfo: {
                        powerEfficient: true,
                        smooth: true,
                        supportedPowerEfficient: [],
                        supportedSmooth: [],
                    }
                };

                Object.defineProperty(navigator, 'mediaCapabilities', {
                    get: () => mockCapabilities
                });
            }

            // 伪造 canPlayType 方法
            const mockCanPlayType = (mimeType) => {
                // 常见视频类型
                const videoTypes = [
                    'video/mp4; codecs="avc1.64201f, mp4a.40.2"',
                    'video/webm; codecs="vp8, vorbis"',
                    'video/ogg; codecs="theora, vorbis"'
                ];

                // 常见音频类型
                const audioTypes = [
                    'audio/mpeg',
                    'audio/ogg; codecs="vorbis"',
                    'audio/wav; codecs="1"',
                    'audio/webm; codecs="opus"'
                ];

                return [...videoTypes, ...audioTypes].includes(mimeType) ||
                       'probably';
            };

            const mockVideoElement = {
                canPlayType: mockCanPlayType
            };

            // 尝试替换
            if (typeof HTMLVideoElement !== 'undefined') {
                Object.assign(HTMLVideoElement.prototype, mockVideoElement);
            }
        }
    """)
```

## 3.24 Memory API 伪装

### 设备内存信息

```python
def spoof_memory_api(page):
    """伪装内存 API"""

    page.evaluate_on_new_document("""
        () => {
            // 添加 deviceMemory 属性
            Object.defineProperty(navigator, 'deviceMemory', {
                get: () => 8,  // GB
                configurable: true
            });

            // 如果已有 deviceMemory，修改其值
            if (navigator.deviceMemory) {
                const originalMemory = navigator.deviceMemory;
                Object.defineProperty(navigator, 'deviceMemory', {
                    get: () => ({
                        ...originalMemory,
                        jsHeapSizeLimit: 8589934592,  // 8GB
                        totalJSHeapSize: 8589934592,
                        usedJSHeapSize: 800000000
                    })
                });
            }
        }
    """)
```

## 3.25 Connection RTT 动态调整

### 网络延迟模拟

```python
class DynamicNetworkSpoof:
    """动态网络指纹伪装"""

    def __init__(self):
        self.rtt_history = []
        self.bandwidth_history = []

    def update_network_stats(self, page, actual_rtt=None):
        """更新网络统计"""

        if actual_rtt:
            self.rtt_history.append(actual_rtt)
            if len(self.rtt_history) > 10:
                self.rtt_history.pop(0)

        # 计算平均值
        avg_rtt = sum(self.rtt_history) / len(self.rtt_history) if self.rtt_history else 50

        page.evaluate(f'''
            () => {{
                const rtt = {avg_rtt};
                const downlink = Math.max(10, Math.min(50, 5000 / rtt));

                Object.defineProperty(navigator, 'connection', {{
                    value: {{
                        effectiveType: rtt < 100 ? '4g' : rtt < 300 ? '3g' : '2g',
                        rtt: rtt,
                        downlink: downlink,
                        saveData: false,
                        addEventListener: () => {{}},
                        removeEventListener: () => {{}},
                        onchange: null
                    }},
                    writable: false
                }});
            }}
        ''')
```

## 3.26 Touch API 支持

### 触摸设备伪装

```python
def spoof_touch_api(page, is_touch_device=True):
    """伪装触摸设备"""

    if is_touch_device:
        page.evaluate_on_new_document("""
            () => {
                // 添加 touch support
                Object.defineProperty(navigator, 'maxTouchPoints', {
                    get: () => 5,
                    configurable: true
                });

                // 伪造触摸事件
                const mockTouchEvent = new TouchEvent('touchstart', {
                    bubbles: true,
                    cancelable: true,
                    touches: [{
                        identifier: 0,
                        target: document.body,
                        clientX: 100,
                        clientY: 100,
                        pageX: 100,
                        pageY: 100,
                        screenX: 100,
                        screenY: 100
                    }]
                });

                document.dispatchEvent(mockTouchEvent);
            }
        """)
    else:
        # 确保没有触摸支持
        page.evaluate_on_new_document("""
            () => {
                Object.defineProperty(navigator, 'maxTouchPoints', {
                    get: () => 0,
                    configurable: true
                });
            }
        """)
```

## 3.27 Vendor Prefixes 处理

### 浏览器厂商前缀

```python
def spoof_vendor_prefixes(page):
    """处理厂商前缀"""

    page.evaluate_on_new_document("""
        () => {
            // 添加 WebKit 前缀属性
            window.webkit = window.webkit || {};

            // 伪装特定前缀
            window.webkitAudioContext = AudioContext;
            window.webkitSpeechRecognition = window.SpeechRecognition || null;

            // 处理特定前缀的 API
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = window.webkitRequestAnimationFrame;
            }

            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
            }
        }
    """)
```

## 3.28 WebGL 扩展伪装

### WebGL 扩展信息

```python
def spoof_webgl_extensions(page):
    """伪装 WebGL 扩展"""

    page.evaluate_on_new_document("""
        () => {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') ||
                       canvas.getContext('experimental-webgl');

            if (gl) {
                // Hook getExtension
                const originalGetExtension = gl.getExtension.bind(gl);

                gl.getExtension = function(name) {
                    // 禁用某些扩展
                    if (name === 'WEBGL_debug_renderer_info') {
                        return null;
                    }

                    // 对其他扩展正常处理
                    return originalGetExtension(name);
                };

                // Hook getSupportedExtensions
                const originalGetSupportedExtensions = gl.getSupportedExtensions?.bind(gl);

                if (originalGetSupportedExtensions) {
                    gl.getSupportedExtensions = function() {
                        const extensions = originalGetSupportedExtensions();
                        // 过滤敏感扩展
                        return extensions.filter(ext =>
                            !ext.includes('debug') &&
                            !ext.includes('EXT_texture_float')
                        );
                    };
                }
            }
        }
    """)
```

## 3.29 硬件指纹随机化

### 硬件熵生成

```python
import uuid
import hashlib

class HardwareEntropyManager:
    """硬件熵管理器"""

    def __init__(self):
        self.seeds = {}

    def get_consistent_hardware_id(self, base_string):
        """生成一致的硬件 ID"""
        if base_string not in self.seeds:
            # 使用 base_string 作为种子
            hash_obj = hashlib.sha256(base_string.encode())
            self.seeds[base_string] = hash_obj.hexdigest()[:16]

        return self.seeds[base_string]

    def get_random_hardware_info(self):
        """生成随机但一致的硬件信息"""
        # 基于某种固定值生成
        hardware_id = self.get_consistent_hardware_id('anti-detection-seed')

        # 生成硬件序列号
        serial = f'HW-{hardware_id.upper()}'

        return {
            'hardwareConcurrency': 4 + (hash(hardware_id) % 4),
            'deviceMemory': 4 + (hash(hardware_id) % 4),
            'serial': serial,
            'uuid': str(uuid.UUID(hardware_id.ljust(32, '0')[:32]))
        }
```

---

# 四、行为层：人类行为模拟

## 4.1 鼠标行为模拟

### 贝塞尔曲线轨迹

真实用户的鼠标移动不是直线，而是带有自然曲线的平滑轨迹。

```python
import math
import time

class MouseSimulator:
    def bezier_curve(self, p0, p1, p2, p3, t):
        """三次贝塞尔曲线计算"""
        x = (1-t)**3 * p0[0] + 3*(1-t)**2*t * p1[0] + 3*(1-t)*t**2 * p2[0] + t**3 * p3[0]
        y = (1-t)**3 * p0[1] + 3*(1-t)**2*t * p1[1] + 3*(1-t)*t**2 * p2[1] + t**3 * p3[1]
        return (x, y)

    def natural_move(self, page, start, end, duration=1.0):
        """模拟自然鼠标移动"""
        # 生成控制点，制造随机偏差
        mid_x = (start[0] + end[0]) / 2
        mid_y = (start[1] + end[1]) / 2

        offset = 50
        p0 = start
        p1 = (mid_x + random.uniform(-offset, offset),
               mid_y + random.uniform(-offset, offset))
        p2 = (mid_x + random.uniform(-offset, offset),
               mid_y + random.uniform(-offset, offset))
        p3 = end

        # 分段移动
        steps = 20
        for i in range(steps + 1):
            t = i / steps
            x, y = self.bezier_curve(p0, p1, p2, p3, t)
            page.mouse.move(x, y)
            time.sleep(duration / steps)
```

### 鼠标事件序列

```python
# 完整的点击事件序列
def human_click(page, selector):
    element = page.query_selector(selector)
    if not element:
        return

    box = element.bounding_box()

    # 1. hover
    page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    time.sleep(random.uniform(0.1, 0.3))

    # 2. mouse down
    page.mouse.down()
    time.sleep(random.uniform(0.05, 0.15))

    # 3. click
    page.mouse.up()
    time.sleep(random.uniform(0.1, 0.2))
```

## 4.2 键盘行为模拟

### 打字速度与节奏

```python
import random

class KeyboardSimulator:
    def human_type(self, page, selector, text):
        """模拟人类打字"""
        page.click(selector)

        for char in text:
            page.keyboard.type(char)

            # 随机延迟，模拟真实打字节奏
            delay = random.gauss(0.1, 0.05)  # 正态分布
            delay = max(0.02, min(0.3, delay))  # 限制范围
            time.sleep(delay)

            # 偶尔停顿（思考）
            if random.random() < 0.05:
                time.sleep(random.uniform(0.3, 0.8))
```

### 输入事件完整性

```javascript
// 真实用户输入会触发一系列事件
inputElement.dispatchEvent(new Event('focus', { bubbles: true }));
inputElement.value = 'text';
inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, data: 'text' }));
inputElement.dispatchEvent(new Event('change', { bubbles: true }));
```

## 4.3 滚动行为模拟

```python
def human_scroll(page, direction='down', amount=None):
    """模拟人类滚动行为"""
    viewport = page.viewport_size
    scroll_height = page.evaluate('document.documentElement.scrollHeight')

    if amount is None:
        amount = random.randint(200, 500)

    # 分段滚动，模拟惯性
    segments = random.randint(3, 7)
    for _ in range(segments):
        if direction == 'down':
            page.mouse.wheel(0, amount / segments)
        else:
            page.mouse.wheel(0, -amount / segments)

        time.sleep(random.uniform(0.1, 0.3))

    # 随机等待
    time.sleep(random.uniform(0.5, 1.5))
```

## 4.4 视线停留时间

```python
# 不同元素类型的平均停留时间（秒）
DWELL_TIMES = {
    'title': random.uniform(0.5, 1.5),
    'content': random.uniform(2, 5),
    'button': random.uniform(0.3, 0.8),
    'link': random.uniform(0.2, 0.5),
    'form': random.uniform(3, 8),
}

def human_read(page, selector):
    """模拟阅读停留"""
    time.sleep(DWELL_TIMES.get(selector, 1))
```

## 4.5 窗口大小变化模拟

真实用户在使用浏览器时会调整窗口大小，这种行为可以增加自然性。

```python
def random_window_resize(page):
    """随机调整窗口大小"""
    # 常见分辨率
    resolutions = [
        (1920, 1080), (1366, 768), (1536, 864),
        (1440, 900), (1280, 720), (2560, 1440)
    ]

    # 随机选择新分辨率
    if random.random() < 0.1:  # 10% 概率调整窗口
        width, height = random.choice(resolutions)
        page.set_viewport_size(width, height)
        time.sleep(random.uniform(0.5, 2.0))
```

## 4.6 页面停留时间随机化

不同类型页面需要不同的停留时间，模拟真实用户浏览习惯。

```python
PAGE_DWELL_TIMES = {
    'homepage': (3, 10),      # 首页：浏览时间长
    'article': (10, 30),      # 文章：阅读时间长
    'product': (5, 15),       # 商品页：比较选择
    'listing': (2, 8),        # 列表页：快速浏览
    'checkout': (20, 60),     # 结算页：填写信息
    'search': (3, 8),         # 搜索结果：快速筛选
}

def page_dwell_time(page_type):
    """根据页面类型返回停留时间"""
    min_time, max_time = PAGE_DWELL_TIMES.get(page_type, (2, 10))
    return random.uniform(min_time, max_time)
```

## 4.7 点击位置偏移

真实用户点击时不会总是点击在元素正中心，会有随机偏移。

```python
def click_with_offset(page, selector):
    """带位置偏移的点击"""
    element = page.query_selector(selector)
    box = element.bounding_box()

    # 中心点
    center_x = box.x + box.width / 2
    center_y = box.y + box.height / 2

    # 添加随机偏移（在元素范围内）
    offset_x = random.uniform(-box.width * 0.3, box.width * 0.3)
    offset_y = random.uniform(-box.height * 0.3, box.height * 0.3)

    page.mouse.click(center_x + offset_x, center_y + offset_y)
```

## 4.8 多标签页操作

真实用户经常使用多个标签页进行浏览。

```python
class TabManager:
    """标签页管理器"""

    def __init__(self, context):
        self.context = context
        self.tabs = []

    def open_new_tab(self, url):
        """打开新标签页"""
        new_page = self.context.new_page()
        new_page.goto(url)
        self.tabs.append(new_page)

        # 随机等待后切换回原标签页
        time.sleep(random.uniform(2, 5))

        return new_page

    def switch_tabs(self):
        """随机切换标签页"""
        if len(self.tabs) < 2:
            return

        # 随机选择一个标签页切换
        target_tab = random.choice(self.tabs)
        target_tab.bring_to_front()

        time.sleep(random.uniform(1, 3))

    def close_tab(self, page):
        """关闭标签页"""
        page.close()
        if page in self.tabs:
            self.tabs.remove(page)
```

## 4.9 浏览器历史操作

模拟用户的前进后退导航行为。

```python
def simulate_history_navigation(page):
    """模拟历史导航"""
    # 随机决定是否进行历史导航
    if random.random() < 0.15:  # 15% 概率
        action = random.choice(['back', 'forward'])

        if action == 'back':
            page.go_back()
        else:
            page.go_forward()

        # 导航后的停留
        time.sleep(random.uniform(2, 5))
```

## 4.10 右键操作模拟

真实用户会使用右键菜单进行复制、粘贴等操作。

```python
def simulate_context_menu(page, selector, action='copy'):
    """模拟右键菜单操作"""
    element = page.query_selector(selector)
    box = element.bounding_box()

    # 右键点击
    page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, button='right')

    time.sleep(random.uniform(0.3, 0.6))

    # 使用键盘快捷键执行操作
    if action == 'copy':
        # Ctrl+C
        page.keyboard.down('Control')
        page.keyboard.press('c')
        page.keyboard.up('Control')
    elif action == 'paste':
        # Ctrl+V
        page.keyboard.down('Control')
        page.keyboard.press('v')
        page.keyboard.up('Control')

    time.sleep(random.uniform(0.2, 0.5))
```

## 4.11 拖放操作模拟

某些网站使用拖拽上传或排序功能。

```python
def simulate_drag_and_drop(page, source_selector, target_selector):
    """模拟拖放操作"""
    source = page.query_selector(source_selector)
    target = page.query_selector(target_selector)

    source_box = source.bounding_box()
    target_box = target.bounding_box()

    # 1. 鼠标移动到源元素
    start_x = source_box.x + source_box.width / 2
    start_y = source_box.y + source_box.height / 2

    page.mouse.move(start_x, start_y)
    time.sleep(random.uniform(0.2, 0.4))

    # 2. 按下鼠标
    page.mouse.down()
    time.sleep(random.uniform(0.1, 0.2))

    # 3. 拖动到目标位置（使用贝塞尔曲线）
    end_x = target_box.x + target_box.width / 2
    end_y = target_box.y + target_box.height / 2

    steps = 20
    for i in range(steps + 1):
        t = i / steps
        x = start_x + (end_x - start_x) * t
        y = start_y + (end_y - start_y) * t
        page.mouse.move(x, y)
        time.sleep(0.02)

    # 4. 释放鼠标
    page.mouse.up()
    time.sleep(random.uniform(0.3, 0.6))
```

## 4.12 音频/视频交互

模拟用户与媒体内容的交互。

```python
def simulate_media_interaction(page, video_selector):
    """模拟视频交互"""
    video = page.query_selector(video_selector)

    # 随机选择操作
    action = random.choice(['play_pause', 'seek', 'volume', 'none'])

    if action == 'play_pause':
        # 点击播放/暂停
        video.click()
        time.sleep(random.uniform(5, 15))  # 观看一段时间
        video.click()  # 暂停

    elif action == 'seek':
        # 拖动进度条
        box = video.bounding_box()
        page.mouse.move(box.x + box.width * 0.7, box.y + box.height / 2)
        page.mouse.down()
        time.sleep(0.5)
        page.mouse.up()

    elif action == 'volume':
        # 调整音量
        page.keyboard.down('Control')
        page.touch_home('ArrowDown')
        page.touch_home('ArrowDown')
        page.keyboard.up('Control')
```

## 4.13 表单提交行为

模拟真实的表单填写和提交流程。

```python
def simulate_form_submission(page, form_data):
    """模拟表单提交"""
    # 1. 逐个填写字段
    for field_selector, value in form_data.items():
        # 聚焦字段
        page.click(field_selector)
        time.sleep(random.uniform(0.2, 0.4))

        # 清空现有内容
        page.keyboard.down('Control')
        page.keyboard.press('a')
        page.keyboard.up('Control')
        time.sleep(0.1)

        # 填写新内容
        human_type(page, field_selector, value)

        # 验证前检查
        time.sleep(random.uniform(0.3, 0.6))

        # Tab 切换到下一个字段
        page.keyboard.press('Tab')
        time.sleep(random.uniform(0.2, 0.4))

    # 2. 提交前的停顿（检查确认）
    time.sleep(random.uniform(1, 3))

    # 3. 点击提交按钮
    page.click('button[type="submit"]')
```

## 4.14 鼠标抖动

真实用户在点击前手会有微小抖动。

```python
def click_with_jitter(page, selector):
    """带抖动的点击"""
    element = page.query_selector(selector)
    box = element.bounding_box()

    target_x = box.x + box.width / 2
    target_y = box.y + box.height / 2

    # 移动到目标附近
    page.mouse.move(target_x, target_y)
    time.sleep(0.1)

    # 微小抖动
    for _ in range(random.randint(2, 5)):
        jitter_x = random.uniform(-3, 3)
        jitter_y = random.uniform(-3, 3)
        page.mouse.move(target_x + jitter_x, target_y + jitter_y)
        time.sleep(random.uniform(0.02, 0.05))

    # 点击
    page.mouse.click(target_x, target_y)
```

## 4.15 键盘修正行为

模拟用户打错字后删除重打的行为。

```python
def type_with_corrections(page, selector, text):
    """带修正的打字"""
    page.click(selector)
    time.sleep(0.2)

    i = 0
    while i < len(text):
        # 决定是否打错字
        if random.random() < 0.08:  # 8% 概率打错
            # 打入错误字符
            wrong_char = chr(random.randint(97, 122))  # 随机字母
            page.keyboard.type(wrong_char)
            time.sleep(random.uniform(0.1, 0.2))

            # 意识到错误，停顿
            time.sleep(random.uniform(0.3, 0.6))

            # 删除错误
            page.keyboard.press('Backspace')
            time.sleep(random.uniform(0.1, 0.2))

        # 打入正确字符
        page.keyboard.type(text[i])
        delay = random.gauss(0.12, 0.04)
        time.sleep(max(0.05, min(0.3, delay)))
        i += 1
```

## 4.16 触摸事件模拟

移动端触摸行为模拟。

```python
def simulate_touch_interaction(page, element_selector):
    """模拟触摸交互"""
    element = page.query_selector(element_selector)
    box = element.bounding_box()

    x = box.x + box.width / 2
    y = box.y + box.height / 2

    # touchstart
    page.evaluate(f'''
        () => {{
            const element = document.querySelector("{element_selector}");
            const touch = new Touch({{
                identifier: 0,
                target: element,
                clientX: {x},
                clientY: {y},
                pageX: {x},
                pageY: {y}
            }});

            const touchStart = new TouchEvent('touchstart', {{
                bubbles: true,
                cancelable: true,
                touches: [touch]
            }});

            element.dispatchEvent(touchStart);
        }}
    ''')

    time.sleep(random.uniform(0.1, 0.3))

    # touchend
    page.evaluate(f'''
        () => {{
            const element = document.querySelector("{element_selector}");
            const touchEnd = new TouchEvent('touchend', {{
                bubbles: true,
                cancelable: true,
                changedTouches: []
            }});

            element.dispatchEvent(touchEnd);
        }}
    ''')

    # 点击事件
    element.click()
```

## 4.17 Hover 停留

模拟鼠标悬停在元素上一段时间后再操作。

```python
def hover_before_click(page, selector):
    """Hover 后再点击"""
    element = page.query_selector(selector)
    box = element.bounding_box()

    # Hover
    page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)

    # 随机停留时间
    dwell_time = random.uniform(0.5, 2.0)
    time.sleep(dwell_time)

    # 有时离开后再回来
    if random.random() < 0.1:
        page.mouse.move(box.x + box.width / 2, box.y - 50)
        time.sleep(random.uniform(0.2, 0.5))
        page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
        time.sleep(random.uniform(0.3, 0.8))

    # 点击
    page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
```

## 4.18 视觉扫视行为

模拟人类浏览时的视觉扫视模式。

```python
import numpy as np

class VisualScanPattern:
    """视觉扫视模拟器"""

    def __init__(self):
        self.hotspots = [
            (0.2, 0.3),   # 左上区域
            (0.5, 0.2),   # 顶部中央
            (0.8, 0.3),   # 右上区域
            (0.2, 0.7),   # 左下区域
            (0.5, 0.8),   # 底部中央
            (0.8, 0.7),   # 右下区域
        ]

    def visual_scan(self, page):
        """执行视觉扫视"""
        viewport = page.viewport_size

        # 随机选择热点区域
        for _ in range(random.randint(3, 6)):
            hotspot_x, hotspot_y = random.choice(self.hotspots)

            target_x = viewport['width'] * hotspot_x
            target_y = viewport['height'] * hotspot_y

            # 移动到热点
            mouse_sim.natural_move(page, (target_x, target_y), duration=0.3)
            time.sleep(random.uniform(0.1, 0.3))

        # 回到内容区域
        center_x = viewport['width'] * 0.5
        center_y = viewport['height'] * 0.5
        mouse_sim.natural_move(page, (center_x, center_y), duration=0.5)
```

## 4.19 随机停顿行为

模拟人类阅读或思考时的随机停顿。

```python
class RandomPauseManager:
    """随机停顿管理器"""

    def __init__(self):
        self.think_time = (0.5, 2.0)  # 思考时间范围
        self.read_time = (1.0, 5.0)   # 阅读时间范围
        self.short_pause = (0.1, 0.5)  # 短暂停

    def think_pause(self):
        """思考停顿"""
        duration = random.uniform(*self.think_time)
        time.sleep(duration)

    def read_pause(self, text_length=None):
        """阅读停顿（根据文本长度调整）"""
        base_duration = random.uniform(*self.read_time)

        if text_length:
            # 文本越长，停留越久
            adjustment = min(len(text_length) * 0.05, 3.0)
            duration = base_duration + adjustment
        else:
            duration = base_duration

        time.sleep(duration)

    def short_pause(self):
        """短停顿"""
        duration = random.uniform(*self.short_pause)
        time.sleep(duration)
```

## 4.20 链接点击决策

模拟人类点击链接时的决策过程。

```python
class LinkClickDecision:
    """链接点击决策器"""

    def __init__(self):
        self.click_probability = 0.7  # 70% 概率点击
        self.skip_probability = 0.2   # 20% 概率跳过
        self.scroll_probability = 0.1  # 10% 概率滚动

    def decide_action(self, link_text, link_url):
        """决定对链接采取的行动"""
        # 随机因素
        random_factor = random.random()

        # 基于链接特征调整
        if '广告' in link_text.lower():
            self.click_probability *= 0.5
        if 'read more' in link_text.lower():
            self.click_probability *= 1.5

        # 决策
        if random_factor < self.click_probability:
            return 'click'
        elif random_factor < self.click_probability + self.skip_probability:
            return 'skip'
        else:
            return 'scroll'
```

## 4.21 表单填写节奏

模拟人类填写表单时的节奏和顺序。

```python
class FormFillingRhythm:
    """表单填写节奏管理器"""

    def __init__(self):
        self.typing_speeds = {
            'name': (0.08, 0.15),      # 姓名：慢速
            'email': (0.05, 0.10),    # 邮箱：中速
            'password': (0.12, 0.20),  # 密码：慢速
            'other': (0.06, 0.12),     # 其他：中速
        }

    def get_typing_delay(self, field_type='other'):
        """获取打字延迟"""
        delay_range = self.typing_speeds.get(field_type, self.typing_speeds['other'])
        return random.gauss(
            (delay_range[0] + delay_range[1]) / 2,
            (delay_range[1] - delay_range[0]) / 4
        )

    def fill_field(self, page, selector, value, field_type='other'):
        """填写表单字段"""
        # 聚焦
        element = page.query_selector(selector)
        element.click()

        # 短暂停
        time.sleep(random.uniform(0.1, 0.3))

        # 逐个字符输入
        for char in value:
            page.keyboard.type(char)
            delay = self.get_typing_delay(field_type)
            delay = max(0.05, min(0.5, abs(delay)))
            time.sleep(delay)

        # 填写后的停顿
        time.sleep(random.uniform(0.2, 0.5))

        # 随机回看
        if random.random() < 0.15:
            time.sleep(random.uniform(0.3, 0.8))
```

## 4.22 页面滚动模式

模拟多种不同的滚动模式。

```python
class ScrollPatternManager:
    """滚动模式管理器"""

    def __init__(self):
        self.patterns = [
            'continuous',    # 连续滚动
            'intermittent',  # 间歇滚动
            'accelerating',  # 加速滚动
            'bouncing',      # 来回滚动
        ]

    def continuous_scroll(self, page, scroll_amount=500):
        """连续滚动"""
        steps = random.randint(5, 10)
        step_size = scroll_amount / steps

        for _ in range(steps):
            page.mouse.wheel(0, step_size)
            time.sleep(random.uniform(0.05, 0.15))

    def intermittent_scroll(self, page, max_scrolls=5):
        """间歇滚动"""
        for _ in range(max_scrolls):
            # 滚动一段
            amount = random.randint(100, 400)
            page.mouse.wheel(0, amount)
            time.sleep(random.uniform(0.2, 0.5))

            # 停顿
            time.sleep(random.uniform(0.5, 2.0))

    def accelerating_scroll(self, page, total_amount=800):
        """加速滚动"""
        speeds = [30, 50, 80, 120, 150]  # 逐步加速
        remaining = total_amount

        for speed in speeds:
            scroll_size = min(speed, remaining)
            page.mouse.wheel(0, scroll_size)
            remaining -= scroll_size

            if remaining <= 0:
                break

            time.sleep(0.1)

    def bouncing_scroll(self, page, bounce_count=3):
        """来回滚动"""
        for _ in range(bounce_count):
            # 向下滚动
            down_amount = random.randint(200, 400)
            page.mouse.wheel(0, down_amount)
            time.sleep(random.uniform(0.3, 0.6))

            # 向上滚动（部分回滚）
            up_amount = random.randint(50, 150)
            page.mouse.wheel(0, -up_amount)
            time.sleep(random.uniform(0.2, 0.4))

    def choose_and_execute(self, page):
        """随机选择并执行滚动模式"""
        pattern = random.choice(self.patterns)

        if pattern == 'continuous':
            self.continuous_scroll(page)
        elif pattern == 'intermittent':
            self.intermittent_scroll(page)
        elif pattern == 'accelerating':
            self.accelerating_scroll(page)
        elif pattern == 'bouncing':
            self.bouncing_scroll(page)
```

## 4.23 多步交互序列

模拟复杂的多步交互过程。

```python
class MultiStepInteraction:
    """多步交互管理器"""

    def __init__(self):
        self.pause_manager = RandomPauseManager()
        self.scroll_manager = ScrollPatternManager()
        self.form_rhythm = FormFillingRhythm()

    def complex_search_interaction(self, page, search_query):
        """复杂搜索交互"""
        # 1. 定位搜索框
        search_box = page.query_selector('input[type="search"]')

        # 2. 移动到搜索框
        box = search_box.bounding_boxbox()
        mouse_sim.natural_move(
            page,
            (box.x + box.width / 2, box.y + box.height / 2),
            duration=0.8
        )

        # 3. 点击聚焦
        search_box.click()
        self.pause_manager.short_pause()

        # 4. 删除现有内容
        page.keyboard.down('Control')
        page.keyboard.press('a')
        page.keyboard.up('Control')
        self.pause_manager.short_pause()

        # 5. 输入搜索词
        self.form_rhythm.fill_field(
            page,
            'input[type="search"]',
            search_query,
            field_type='other'
        )

        # 6. 稍作停顿
        self.pause_manager.think_pause()

        # 7. 按下回车
        page.keyboard.press('Enter')
        self.pause_manager.short_pause()

        # 8. 等待结果加载
        time.sleep(random.uniform(2.0, 4.0))

        # 9. 滚动浏览结果
        self.scroll_manager.choose_and_execute(page)
```

## 4.24 用户偏好模拟

模拟不同类型用户的浏览偏好。

```python
class UserPreference:
    """用户偏好模拟"""

    def __init__(self, user_type='average'):
        self.user_type = user_type
        self.preferences = self._get_preferences(user_type)

    def _get_preferences(self, user_type):
        """获取用户类型偏好"""
        prefs = {
            'careful': {
                'click_speed': 'slow',
                'read_depth': 'deep',
                'scroll_frequency': 'low',
                'form_filling': 'meticulous',
            },
            'casual': {
                'click_speed': 'fast',
                'read_depth': 'shallow',
                'scroll_frequency': 'high',
                'form_filling': 'quick',
            },
            'average': {
                'click_speed': 'medium',
                'read_depth': 'medium',
                'scroll_frequency': 'medium',
                'form_filling': 'medium',
            }
        }
        return prefs.get(user_type, prefs['average'])

    def get_click_delay(self):
        """获取点击延迟"""
        speed_map = {
            'slow': (0.3, 0.6),
            'medium': (0.15, 0.3),
            'fast': (0.08, 0.15),
        }
        speed = self.preferences['click_speed']
        return random.uniform(*speed_map[speed])

    def should_read_article(self):
        """是否阅读文章"""
        read_depth_map = {
            'deep': 0.8,
            'medium': 0.5,
            'shallow': 0.2,
        }
        depth = self.preferences['read_depth']
        return random.random() < read_depth_map[depth]
```

---

# 五、持久层：状态管理

## 5.1 Cookies 与 Session 管理

### Cookie 池架构

```
Cookie Pool
├── 用户指纹 Cookie（长期）
│   ├── _ga, _gid（Google Analytics）
│   ├── __cfduid（Cloudflare）
│   └── 站点特定识别 Cookie
│
├── 会话 Cookie（短期）
│   ├── sessionid
│   ├── JSESSIONID
│   └── PHPSESSID
│
└── 临时 Cookie（单次）
    ├── CSRF Token
    └── State 参数
```

### Cookie 策略

| 场景 | Cookie 策略 | 刷新策略 |
|------|------------|---------|
| 登录态 | 持久化存储 | Token 失效时刷新 |
| 会话态 | 内存缓存 | 定期刷新或失效时重新获取 |
| 匿名访问 | 无状态 | 每次新会话 |

```python
import json
import hashlib
from pathlib import Path

class CookieManager:
    def __init__(self, storage_path):
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(exist_ok=True)

    def get_cookies(self, url, fingerprint):
        """获取指纹对应的 Cookies"""
        fingerprint_hash = hashlib.md5(fingerprint.encode()).hexdigest()
        cookie_file = self.storage_path / f"{fingerprint_hash}.json"

        if cookie_file.exists():
            with open(cookie_file) as f:
                cookies = json.load(f)
                return self._filter_valid_cookies(cookies)

        return []

    def save_cookies(self, url, cookies, fingerprint):
        """保存 Cookies"""
        fingerprint_hash = hashlib.md5(fingerprint.encode()).hexdigest()
        cookie_file = self.storage_path / f"{fingerprint_hash}.json"

        with open(cookie_file, 'w') as f:
            json.dump(cookies, f)

    def _filter_valid_cookies(self, cookies):
        """过滤过期的 Cookie"""
        return [c for c in cookies
                if 'expires' not in c or c['expires'] > time.time()]
```

## 5.2 浏览器指纹持久化

### User Data 目录管理

```python
from playwright.sync_api import sync_playwright

class BrowserProfile:
    def __init__(self, base_path='./profiles'):
        self.base_path = Path(base_path)
        self.base_path.mkdir(exist_ok=True)

    def get_profile_path(self, profile_id):
        return self.base_path / profile_id

    def create_browser(self, profile_id):
        profile_path = self.get_profile_path(profile_id)

        playwright = sync_playwright().start()
        browser = playwright.chromium.launch_persistent_context(
            user_data_dir=str(profile_path),
            headless=False,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-infobars',
            ]
        )
        return browser
```

### LocalStorage/SessionStorage 保存

```python
def save_storage(page, profile_id):
    """保存所有存储"""
    storage = {
        'localStorage': page.evaluate('Object.entries(localStorage)'),
        'sessionStorage': page.evaluate('Object.entries(sessionStorage)'),
        'cookies': page.context.cookies(),
    }

    with open(f'storage/{profile_id}.json', 'w') as f:
        json.dump(storage, f)

def restore_storage(page, profile_id):
    """恢复存储"""
    with open(f'storage/{profile_id}.json') as f:
        storage = json.load(f)

    # 恢复 Cookies
    for cookie in storage['cookies']:
        page.context.add_cookie(cookie)

    # 恢复 LocalStorage
    page.evaluate(f'''
        localStorage.clear();
        {storage['localStorage'].forEach(([k, v]) => {{
            localStorage.setItem(k, v);
        }})}
    ''')
```

## 5.3 状态同步与回滚

### 状态快照

```python
import pickle
from datetime import datetime

class StateSnapshot:
    def __init__(self):
        self.snapshots = {}

    def create_snapshot(self, page, name):
        """创建状态快照"""
        self.snapshots[name] = {
            'url': page.url,
            'cookies': page.context.cookies(),
            'storage': page.evaluate('Object.entries(localStorage)'),
            'timestamp': datetime.now().isoformat(),
        }

    def restore_snapshot(self, page, name):
        """恢复状态快照"""
        if name not in self.snapshots:
            raise ValueError(f"Snapshot {name} not found")

        snapshot = self.snapshots[name]

        # 导航到 URL
        page.goto(snapshot['url'])

        # 恢复 Cookies
        page.context.clear_cookies()
        for cookie in snapshot['cookies']:
            page.context.add_cookie(cookie)

        # 恢复 Storage
        page.evaluate(f'''
            localStorage.clear();
            {snapshot['storage'].forEach(([k, v]) => {{
                localStorage.setItem(k, v);
            }})}
        ''')

    def save_to_disk(self, filepath):
        with open(filepath, 'wb') as f:
            pickle.dump(self.snapshots, f)

    def load_from_disk(self, filepath):
        with open(filepath, 'rb') as f:
            self.snapshots = pickle.load(f)
```

## 5.4 IndexedDB 管理

### IndexedDB 存储操作

```python
def save_indexeddb(page, profile_id):
    """保存 IndexedDB 数据"""
    indexeddb_data = page.evaluate('''
        async () => {
            const dbs = await indexedDB.databases();
            const result = {};

            for (const db of dbs) {
                try {
                    const request = indexedDB.open(db.name);
                    const dbInstance = await new Promise((resolve, reject) => {
                        request.onsuccess = () => resolve(request.result);
                        request.onerror = () => reject(request.error);
                    });

                    const stores = {};
                    for (const storeName of dbInstance.objectStoreNames) {
                        const transaction = dbInstance.transaction(storeName, 'readonly');
                        const store = transaction.objectStore(storeName);
                        const items = await new Promise((resolve, reject) => {
                            const request = store.getAll();
                            request.onsuccess = () => resolve(request.result);
                            request.onerror = () => reject(request.error);
                        });
                        stores[storeName] = items;
                    }

                    result[db.name] = stores;
                    dbInstance.close();
                } catch (e) {
                    console.error('Error accessing DB:', db.name, e);
                }
            }

            return result;
        }
    ''')

    with open(f'indexeddb/{profile_id}.json', 'w') as f:
        json.dump(indexeddb_data, f)

def restore_indexeddb(page, profile_id):
    """恢复 IndexedDB 数据"""
    with open(f'indexeddb/{profile_id}.json') as f:
        indexeddb_data = json.load(f)

    page.evaluate(f'''
        async (data) => {{
            for (const [dbName, stores] of Object.entries(data)) {{
                try {{
                    const request = indexedDB.open(dbName, 1);

                    request.onupgradeneeded = (event) => {{
                        const db = event.target.result;
                        for (const storeName of Object.keys(stores)) {{
                            if (!db.objectStoreNames.contains(storeName)) {{
                                db.createObjectStore(storeName, {{ keyPath: 'id' }});
                            }}
                        }}
                    }};

                    const db = await new Promise((resolve, reject) => {{
                        request.onsuccess = () => resolve(request.result);
                        request.onerror = () => reject(request.error);
                    }});

                    for (const [storeName, items] of Object.entries(stores)) {{
                        const transaction = db.transaction(storeName, 'readwrite');
                        const store = transaction.objectStore(storeName);

                        for (const item of items) {{
                            store.put(item);
                        }}
                    }}

                    await new Promise((resolve, reject) => {{
                        const transaction = db.transaction([...db.objectStoreNames], 'readwrite');
                        transaction.oncomplete = () => resolve();
                        transaction.onerror = () => reject(transaction.error);
                    }});

                    db.close();
                }} catch (e) {{
                    console.error('Error restoring DB:', dbName, e);
                }}
            }}
        }}
    ''', indexeddb_data)
```

## 5.5 SessionStorage 管理

### 会话存储持久化

```python
class SessionStorageManager:
    def __init__(self, storage_path):
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(exist_ok=True)

    def save_session_storage(self, page, session_id):
        """保存 SessionStorage"""
        storage_data = page.evaluate('''
            () => {
                const data = {};
                for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
                    data[key] = sessionStorage.getItem(key);
                }
                return data;
            }
        ''')

        storage_file = self.storage_path / f'session_{session_id}.json'
        with open(storage_file, 'w') as f:
            json.dump({
                'data': storage_data,
                'timestamp': time.time()
            }, f)

    def restore_session_storage(self, page, session_id):
        """恢复 SessionStorage"""
        storage_file = self.storage_path / f'session_{session_id}.json'

        if not storage_file.exists():
            return False

        with open(storage_file) as f:
            storage = json.load(f)

        # 检查是否过期（1小时）
        if time.time() - storage['timestamp'] > 3600:
            return False

        page.evaluate(f'''
            (data) => {{
                sessionStorage.clear();
                for (const [key, value] of Object.entries(data)) {{
                    sessionStorage.setItem(key, value);
                }}
            }}
        ''', storage['data'])

        return True
```

## 5.6 Cookie 池扩展功能

### 多账号并发管理

```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

class MultiAccountCookieManager:
    """多账号 Cookie 管理器"""

    def __init__(self, storage_path):
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(exist_ok=True)
        self.accounts = {}  # {account_id: {cookies, metadata}}
        self.lock = asyncio.Lock()

    async def load_account(self, account_id):
        """加载账号 Cookies"""
        async with self.lock:
            if account_id in self.accounts:
                return self.accounts[account_id]

            account_file = self.storage_path / f'account_{account_id}.json'

            if account_file.exists():
                with open(account_file) as f:
                    self.accounts[account_id] = json.load(f)

                # 检查 Cookies 是否过期
                if self._is_account_valid(account_id):
                    return self.accounts[account_id]

            return None

    def _is_account_valid(self, account_id):
        """检查账号是否有效"""
        account = self.accounts.get(account_id)
        if not account:
            return False

        # 检查关键 Cookie
        for cookie in account.get('cookies', []):
            if cookie.get('name') in ['sessionid', 'auth_token']:
                if 'expires' in cookie and cookie['expires'] < time.time():
                    return False

        return True

    async def refresh_account(self, account_id, browser_context):
        """刷新账号 Cookies"""
        # 获取当前 Cookies
        cookies = await browser_context.cookies()

        # 获取存储
        storage = await browser_context.evaluate('''
            () => ({
                localStorage: Object.entries(localStorage),
                sessionStorage: Object.entries(sessionStorage)
            })
        ''')

        # 更新账号信息
        self.accounts[account_id] = {
            'cookies': cookies,
            'storage': storage,
            'updated_at': time.time()
        }

        # 保存到文件
        account_file = self.storage_path / f'account_{account_id}.json'
        with open(account_file, 'w') as f:
            json.dump(self.accounts[account_id], f)

    async def get_available_account(self):
        """获取可用账号"""
        async with self.lock:
            for account_id, account in self.accounts.items():
                if self._is_account_valid(account_id):
                    # 更新最后使用时间
                    account['last_used'] = time.time()
                    return account_id

            return None
```

### Cookie 自动刷新机制

```python
class CookieRefreshManager:
    """Cookie 自动刷新管理器"""

    def __init__(self, cookie_manager, check_interval=300):
        self.cookie_manager = cookie_manager
        self.check_interval = check_interval
        self.refreshing = set()

    async def start_auto_refresh(self):
        """启动自动刷新"""
        while True:
            await asyncio.sleep(self.check_interval)

            # 检查需要刷新的账号
            accounts_to_refresh = await self._get_expired_accounts()

            for account_id in accounts_to_refresh:
                if account_id not in self.refreshing:
                    asyncio.create_task(self._refresh_account(account_id))

    async def _get_expired_accounts(self):
        """获取即将过期的账号"""
        expired = []
        threshold = time.time() + 3600  # 1小时内过期

        for account_id in self.cookie_manager.accounts:
            account = self.cookie_manager.accounts[account_id]

            for cookie in account.get('cookies', []):
                if 'expires' in cookie and cookie['expires'] < threshold:
                    expired.append(account_id)
                    break

        return expired

    async def _refresh_account(self, account_id):
        """刷新指定账号"""
        self.refreshing.add(account_id)

        try:
            # 启动浏览器
            browser = await self._launch_browser_for_account(account_id)

            # 导航到目标站点
            await browser.goto('https://example.com')

            # 等待登录态恢复
            await asyncio.sleep(5)

            # 刷新 Cookie
            await self.cookie_manager.refresh_account(account_id, browser)

        finally:
            self.refreshing.discard(account_id)
            await browser.close()
```

## 5.7 Cache API 管理

### 缓存存储操作

```python
class CacheAPIManager:
    """Cache API 管理器"""

    async def list_caches(self, page):
        """列出所有缓存"""
        return await page.evaluate('''
            async () => {
                const cacheNames = await caches.keys();
                const caches = {};

                for (const cacheName of cacheNames) {
                    const cache = await caches.open(cacheName);
                    const keys = await cache.keys();
                    caches[cacheName] = keys.map(req => req.url);
                }

                return caches;
            }
        ''')

    async def clear_all_caches(self, page):
        """清除所有缓存"""
        await page.evaluate('''
            async () => {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(name => caches.delete(name))
                );
                return cacheNames.length;
            }
        ''')

    async def save_cache_state(self, page, profile_id):
        """保存缓存状态"""
        caches = await self.list_caches(page)

        with open(f'cache/{profile_id}_caches.json', 'w') as f:
            json.dump({
                'caches': caches,
                'timestamp': time.time()
            }, f)
```

## 5.8 Service Worker 管理

### Service Worker 控制

```python
class ServiceWorkerManager:
    """Service Worker 管理器"""

    async def register_sw(self, page, sw_url):
        """注册 Service Worker"""
        return await page.evaluate(f'''
            async () => {{
                if ('serviceWorker' in navigator) {{
                    try {{
                        const registration = await navigator.serviceWorker.register('{sw_url}');
                        return {{ success: true, scope: registration.scope }};
                    }} catch (e) {{
                        return {{ success: false, error: e.message }};
                    }}
                }}
                return {{ success: false, error: 'Not supported' }};
            }}
        ''')

    async def unregister_all_sw(self, page):
        """注销所有 Service Worker"""
        return await page.evaluate('''
            async () => {
                const registrations = await navigator.serviceWorker.getRegistrations();
                const results = [];

                for (const registration of registrations) {
                    const result = await registration.unregister();
                    results.push({
                        scope: registration.scope,
                        unregistered: result
                    });
                }

                return results;
            }
        ''')

    async def get_sw_state(self, page):
        """获取 Service Worker 状态"""
        return await page.evaluate('''
            async () => {
                if (!('serviceWorker' in navigator)) {
                    return { supported: false };
                }

                const registrations = await navigator.serviceWorker.getRegistrations();

                return {
                    supported: true,
                    controller: navigator.serviceWorker.controller?.scriptURL,
                    registrations: registrations.map(r => ({
                        scope: r.scope,
                        state: r.active?.state,
                        scriptURL: r.active?.scriptURL
                    }))
                };
            }
        ''')
```

---

# 六、验证层：验证码处理

## 6.1 验证码类型与应对

| 验证码类型 | 难度 | 识别方案 | 成功率 |
|-----------|------|---------|--------|
| 图形验证码（简单） | ★★☆☆☆ | OCR/Tesseract | 70-90% |
| 图形验证码（复杂） | ★★★☆☆ | CNN 模型训练 | 80-95% |
| 滑动验证码 | ★★★★☆ | 轨迹计算/模拟拖动 | 60-85% |
| 点击验证码 | ★★★★☆ | 目标检测/模拟点击 | 70-90% |
| 行为验证码 | ★★★★★ | 行为采集/完整模拟 | 40-70% |
| reCAPTCHA v2 | ★★★★★ | 第三方服务/人工介入 | 50-80% |
| reCAPTCHA v3 | ★★★★★ | 行为训练/信誉管理 | 30-60% |

## 6.2 OCR 识别方案

```python
import pytesseract
from PIL import Image
import cv2
import numpy as np

class CaptchaSolver:
    def preprocess_image(self, image_path):
        """图像预处理"""
        img = cv2.imread(image_path)

        # 灰度化
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # 二值化
        _, binary = cv2.threshold(gray, 0, 255,
                                cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # 去噪
        denoised = cv2.medianBlur(binary, 3)

        return Image.fromarray(denoised)

    def solve_text_captcha(self, image_path):
        """文字验证码识别"""
        processed = self.preprocess_image(image_path)

        # Tesseract OCR
        config = r'--oem 3 --psm 7 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        result = pytesseract.image_to_string(processed, config=config)

        return result.strip()

    def solve_with_model(self, image_path, model):
        """使用训练的模型识别"""
        img = cv2.imread(image_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # 预处理
        img = cv2.resize(img, (160, 60))
        img = img.astype('float32') / 255.0

        # 推理
        prediction = model.predict(np.expand_dims(img, axis=0))
        result = self.decode_ctc(prediction)

        return result
```

## 6.3 滑动验证码破解

```python
import cv2
import numpy as np

class SliderSolver:
    def find_template(self, background, template):
        """模板匹配找到滑块位置"""
        bg = cv2.imread(background)
        tpl = cv2.imread(template)

        # 多尺度匹配
        for scale in np.linspace(0.8, 1.2, 10):
            resized = cv2.resize(tpl, None,
                                fx=scale, fy=scale,
                                interpolation=cv2.INTER_AREA)

            if resized.shape[0] > bg.shape[0] or resized.shape[1] > bg.shape[1]:
                continue

            result = cv2.matchTemplate(bg, resized, cv2.TM_CCOEFF_NORMED)
            _, max_val, _, max_loc = cv2.minMaxLoc(result)

            if max_val > 0.8:  # 相似度阈值
                return max_loc[0]  # 返回 x 坐标

        return None

    def get_track(self, distance):
        """生成滑动轨迹"""
        track = []
        current = 0

        # 加速段
        while current < distance * 0.7:
            step = random.randint(5, 10)
            track.append(step)
            current += step

        # 减速段
        while current < distance:
            step = random.randint(1, 5)
            if current + step > distance:
                step = distance - current
            track.append(step)
            current += step

        return track

    def solve_slider(self, page, slider_element, distance):
        """执行滑动操作"""
        track = self.get_track(distance)

        # 按下
        slider_element.hover()
        page.mouse.down()

        # 移动
        for step in track:
            page.mouse.move_by(step, random.randint(-1, 1))
            time.sleep(random.uniform(0.01, 0.03))

        # 释放
        page.mouse.up()
```

## 6.4 reCAPTCHA v3 对抗

```python
class ReCaptchaV3Solver:
    def analyze_score_threshold(self, page):
        """分析 score 阈值"""
        # 注入代码监控 reCAPTCHA 行为
        script = """
        window.recaptchaScores = [];
        const originalExecute = grecaptcha.execute;
        grecaptcha.execute = function(siteKey, options) {
            return originalExecute.call(this, siteKey, options).then(token => {
                // 模拟发送到验证接口
                fetch('/recaptcha/verify', {
                    method: 'POST',
                    body: JSON.stringify({ token }),
                }).then(r => r.json()).then(data => {
                    window.recaptchaScores.push(data.score);
                });
                return token;
            });
        };
        """
        page.evaluate(script)

    def build_trust(self, page):
        """构建信任分数"""
        # 1. 首次访问，建立基线
        page.goto('https://example.com')
        time.sleep(5)  # 停留建立正常行为模式

        # 2. 模拟正常用户行为
        page.mouse.move(500, 300)
        time.sleep(2)
        page.mouse.wheel(0, 300)
        time.sleep(1)

        # 3. 重复访问提高信任
        for _ in range(3):
            page.reload()
            time.sleep(random.uniform(3, 8))
```

## 6.5 点击验证码破解

### 图像目标检测

```python
class ClickCaptchaSolver:
    """点击验证码破解器"""

    def __init__(self):
        self.target_detector = self._load_yolo_model()

    def _load_yolo_model(self):
        """加载 YOLO 目标检测模型"""
        # 使用预训练的 YOLOv8 模型
        from ultralytics import YOLO
        return YOLO('yolov8n.pt')

    def find_targets(self, image_path, target_type):
        """查找目标对象"""
        import cv2

        img = cv2.imread(image_path)

        # 运行目标检测
        results = self.target_detector(img)

        # 提取目标位置
        targets = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                # 获取类别和置信度
                cls = int(box.cls[0])
                conf = float(box.conf[0])

                # 根据目标类型过滤
                if self._is_target_type(cls, target_type) and conf > 0.5:
                    # 获取边界框坐标
                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    center_x = int((x1 + x2) / 2)
                    center_y = int((y1 + y2) / 2)

                    targets.append({
                        'center': (center_x, center_y),
                        'bbox': (int(x1), int(y1), int(x2), int(y2)),
                        'confidence': conf
                    })

        return targets

    def _is_target_type(self, cls, target_type):
        """检查是否为目标类型"""
        # COCO 数据集类别映射
        coco_classes = {
            0: 'person', 1: 'bicycle', 2: 'car', 3: 'motorcycle',
            # ... 更多类别
        }

        detected_class = coco_classes.get(cls, '')
        return target_type.lower() in detected_class.lower()

    def solve_click_captcha(self, page, image_selector, target_type):
        """解决点击验证码"""
        # 获取验证码图像位置
        captcha_element = page.query_selector(image_selector)
        box = captcha_element.bounding_box()

        # 截图验证码区域
        captcha_image = page.screenshot({
            'clip': {
                'x': box['x'],
                'y': box['y'],
                'width': box['width'],
                'height': box['height']
            }
        })

        # 保存临时图像
        temp_path = '/tmp/captcha.png'
        with open(temp_path, 'wb') as f:
            f.write(captcha_image)

        # 查找目标
        targets = self.find_targets(temp_path, target_type)

        # 点击每个目标
        for target in targets:
            # 计算点击位置（相对于页面）
            click_x = box['x'] + target['center'][0]
            click_y = box['y'] + target['center'][1]

            # 点击
            page.mouse.click(click_x, click_y)
            time.sleep(random.uniform(0.2, 0.4))

        return len(targets)
```

## 6.6 行为验证码完整模拟

### 综合行为模拟

```python
class BehaviorCaptchaSolver:
    """行为验证码破解器"""

    def __init__(self):
        self.mouse_sim = MouseSimulator()
        self.keyboard_sim = KeyboardSimulator()

    async def solve(self, page, captcha_config):
        """解决行为验证码"""
        # 1. 等待验证码加载
        await self._wait_for_captcha(page, captcha_config['selector'])

        # 2. 鼠标悬停（模拟用户发现验证码）
        captcha_element = page.query_selector(captcha_config['selector'])
        box = captcha_element.bounding_box()

        self.mouse_sim.natural_move(
            page,
            (box.x + box.width / 2, box.y + box.height / 2),
            duration=0.8
        )
        time.sleep(random.uniform(0.5, 1.0))

        # 3. 点击开始验证
        page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
        time.sleep(random.uniform(1, 2))

        # 4. 等待验证完成
        await self._wait_for_verification(page)

        # 5. 处理可能的二次验证
        if await self._is_secondary_challenge(page):
            await self._solve_secondary(page, captcha_config)

        return True

    async def _wait_for_captcha(self, page, selector, timeout=10):
        """等待验证码出现"""
        start_time = time.time()

        while time.time() - start_time < timeout:
            try:
                element = page.query_selector(selector)
                if element and element.is_visible():
                    return True
            except:
                pass

            await asyncio.sleep(0.5)

        return False

    async def _wait_for_verification(self, page, timeout=30):
        """等待验证完成"""
        start_time = time.time()

        while time.time() - start_time < timeout:
            # 检查是否通过验证
            is_passed = await page.evaluate('''
                () => {
                    // 常见的验证通过标识
                    return document.querySelector('.captcha-success') !== null ||
                           document.querySelector('.verified') !== null ||
                           !document.querySelector('.captcha-container');
                }
            ''')

            if is_passed:
                return True

            # 模拟人类等待时的行为
            if random.random() < 0.1:
                await self._simulate_waiting_behavior(page)

            await asyncio.sleep(1)

        return False

    async def _simulate_waiting_behavior(self, page):
        """模拟等待时的行为"""
        behaviors = [
            self._small_mouse_move,
            self._subtle_scroll,
            self._blink_pause
        ]

        behavior = random.choice(behaviors)
        await behavior(page)

    async def _small_mouse_move(self, page):
        """小幅度鼠标移动"""
        current_pos = page.mouse.position
        offset_x = random.randint(-20, 20)
        offset_y = random.randint(-20, 20)
        page.mouse.move(
            current_pos['x'] + offset_x,
            current_pos['y'] + offset_y
        )

    async def _subtle_scroll(self, page):
        """细微滚动"""
        scroll_amount = random.randint(-30, 30)
        page.mouse.wheel(0, scroll_amount)
        time.sleep(0.1)

    async def _blink_pause(self, page):
        """短暂停顿"""
        time.sleep(random.uniform(0.3, 0.8))

    async def _is_secondary_challenge(self, page):
        """检查是否有二次验证"""
        return await page.evaluate('''
            () => {
                const secondaryIndicators = [
                    '.slider-captcha',
                    '.puzzle-captcha',
                    '.image-captcha',
                    '#captcha-challenge'
                ];

                return secondaryIndicators.some(selector =>
                    document.querySelector(selector) !== null
                );
            }
        ''')

    async def _solve_secondary(self, page, config):
        """解决二次验证"""
        # 检测验证码类型
        captcha_type = await self._detect_captcha_type(page)

        if captcha_type == 'slider':
            slider_solver = SliderSolver()
            await slider_solver.solve(page)
        elif captcha_type == 'puzzle':
            puzzle_solver = PuzzleSolver()
            await puzzle_solver.solve(page)
        elif captcha_type == 'image':
            image_solver = ImageCaptchaSolver()
            await image_solver.solve(page)
```

## 6.7 验证码识别服务集成

### 第三方验证码服务

```python
class CaptchaServiceAPI:
    """验证码识别服务 API 集成"""

    def __init__(self, service_type='2captcha', api_key=None):
        self.service_type = service_type
        self.api_key = api_key
        self.base_urls = {
            '2captcha': 'http://2captcha.com',
            'anticaptcha': 'https://api.anti-captcha.com',
            'deathbycaptcha': 'http://api.dbcapi.me',
        }

    def solve_recaptcha_v2(self, page, site_key, action='verify'):
        """解决 reCAPTCHA v2"""
        import requests

        # 1. 创建任务
        create_task_url = f'{self.base_urls[self.service_type]}/createTask'

        task_data = {
            'clientKey': self.api_key,
            'task': {
                'type': 'RecaptchaV2TaskProxyless',
                'websiteURL': page.url,
                'websiteKey': site_key,
                'isInvisible': False
            }
        }

        response = requests.post(create_task_url, json=task_data)
        task_id = response.json()['taskId']

        # 2. 等待结果
        while True:
            result_url = f'{self.base_urls[self.service_type]}/getTaskResult'
            result_data = {
                'clientKey': self.api_key,
                'taskId': task_id
            }

            result = requests.post(result_url, json=result_data).json()

            if result['status'] == 'ready':
                return result['solution']['gRecaptchaResponse']

            time.sleep(2)

    def solve_hcaptcha(self, page, site_key):
        """解决 hCaptcha"""
        import requests

        create_task_url = f'{self.base_urls[self.service_type]}/createTask'

        task_data = {
            'clientKey': self.api_key,
            'task': {
                'type': 'HCaptchaTaskProxyless',
                'websiteURL': page.url,
                'websiteKey': site_key
            }
        }

        response = requests.post(create_task_url, json=task_data)
        task_id = response.json()['taskId']

        # 等待结果
        while True:
            result_url = f'{self.base_urls[self.service_type]}/getTaskResult'
            result_data = {
                'clientKey': self.api_key,
                'taskId': task_id
            }

            result = requests.post(result_url, json=result_data).json()

            if result['status'] == 'ready':
                return result['solution']['gRecaptchaResponse']

            time.sleep(2)
```

## 6.8 验证码自动识别框架

### 统一验证码处理接口

```python
class CaptchaSolverFramework:
    """验证码解决框架"""

    def __init__(self):
        self.solvers = {
            'text': TextCaptchaSolver(),
            'slider': SliderSolver(),
            'click': ClickCaptchaSolver(),
            'recaptcha': ReCaptchaSolver(),
            'hcaptcha': HCaptchaSolver(),
            'behavior': BehaviorCaptchaSolver(),
        }
        self.fallback_service = CaptchaServiceAPI(service_type='2captcha')

    async def solve(self, page, captcha_info):
        """自动解决验证码"""
        captcha_type = captcha_info.get('type', 'auto')

        # 自动检测类型
        if captcha_type == 'auto':
            captcha_type = await self._detect_captcha_type(page, captcha_info)

        # 尝试本地解决
        solver = self.solvers.get(captcha_type)
        if solver:
            try:
                result = await solver.solve(page, captcha_info)
                if result:
                    return result
            except Exception as e:
                print(f'本地解决失败: {e}')

        # 回退到第三方服务
        print('使用第三方验证码服务')
        return await self._fallback_solve(page, captcha_info)

    async def _detect_captcha_type(self, page, captcha_info):
        """自动检测验证码类型"""
        return await page.evaluate('''
            () => {
                // 检测 reCAPTCHA
                if (document.querySelector('.g-recaptcha') ||
                    document.querySelector('[data-sitekey]')) {
                    return 'recaptcha';
                }

                // 检测 hCaptcha
                if (document.querySelector('.h-captcha') ||
                    document.querySelector('[data-hcaptcha]')) {
                    return 'hcaptcha';
                }

                // 检测滑块验证
                if (document.querySelector('.slider-captcha') ||
                    document.querySelector('.slide-verify')) {
                    return 'slider';
                }

                // 检测点选验证
                if (document.querySelector('.click-captcha') ||
                    document.querySelector('.verify-click')) {
                    return 'click';
                }

                // 检测文字验证
                if (document.querySelector('.text-captcha') ||
                    document.querySelector('input[name="captcha"]')) {
                    return 'text';
                }

                return 'behavior';
            }
        ''')

    async def _fallback_solve(self, page, captcha_info):
        """使用第三方服务解决"""
        captcha_type = captcha_info.get('type', 'recaptcha')

        if captcha_type == 'recaptcha':
            return self.fallback_service.solve_recaptcha_v2(
                page,
                captcha_info['site_key']
            )
        elif captcha_type == 'hcaptcha':
            return self.fallback_service.solve_hcaptcha(
                page,
                captcha_info['site_key']
            )

        return None
```

## 6.9 验证码缓存策略

### 验证码结果缓存

```python
class CaptchaCache:
    """验证码缓存管理"""

    def __init__(self, cache_dir='./captcha_cache'):
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(exist_ok=True)
        self.cache_ttl = 3600  # 1小时过期

    def get_cached_solution(self, captcha_hash):
        """获取缓存的解决方案"""
        cache_file = self.cache_dir / f'{captcha_hash}.json'

        if cache_file.exists():
            with open(cache_file) as f:
                cache = json.load(f)

            # 检查是否过期
            if time.time() - cache['timestamp'] < self.cache_ttl:
                return cache['solution']

        return None

    def save_solution(self, captcha_hash, solution):
        """保存解决方案"""
        cache_file = self.cache_dir / f'{captcha_hash}.json'

        with open(cache_file, 'w') as f:
            json.dump({
                'solution': solution,
                'timestamp': time.time()
            }, f)

    def hash_captcha(self, image_data):
        """生成验证码哈希"""
        import hashlib
        return hashlib.md5(image_data).hexdigest()
```

---

# 七、架构层：分布式爬虫

## 7.1 分布式架构设计

```
分布式反检测爬虫架构
│
├── 任务调度中心
│   ├── 任务队列（Redis/消息队列）
│   ├── 策略路由
│   └── 失败重试机制
│
├── Worker 节点池
│   ├── 节点 A - US 代理池
│   ├── 节点 B - EU 代理池
│   └── 节点 C - CN 代理池
│
├── 资源管理
│   ├── 代理池服务
│   ├── Cookie 池服务
│   └── 浏览器实例池
│
└── 监控与告警
    ├── 成功率监控
    ├── 检测率监控
    └── 资源状态监控
```

## 7.2 反检测策略库

```python
class AntiDetectionStrategy:
    """反检测策略基类"""
    def __init__(self, browser, proxy):
        self.browser = browser
        self.proxy = proxy
        self.setup()

    def setup(self):
        """初始化环境"""
        raise NotImplementedError

    def navigate(self, url):
        """导航到目标"""
        raise NotImplementedError

    def extract(self, selector):
        """提取数据"""
        raise NotImplementedError


class PlaywrightStealthStrategy(AntiDetectionStrategy):
    """Playwright 伪装策略"""
    def setup(self):
        # 1. 注入 stealth 脚本
        stealth_script = self._load_stealth_js()
        self.browser.add_init_script(stealth_script)

        # 2. 设置 User-Agent
        self.browser.set_extra_http_headers({
            'User-Agent': self._get_realistic_ua()
        })

    def navigate(self, url):
        page = self.browser.new_page()

        # 模拟人类行为
        self._simulate_navigation(page, url)

        return page

    def _simulate_navigation(self, page, url):
        """模拟导航行为"""
        # 首次访问主页
        if not self.browser.context.pages:
            page.goto(url)
            time.sleep(random.uniform(2, 5))

        # 后续访问
        else:
            # 随机滚动
            self._scroll_randomly(page)
            time.sleep(random.uniform(1, 3))

            # 导航
            page.goto(url)

    def _scroll_randomly(self, page):
        """随机滚动"""
        page.evaluate('window.scrollBy(0, Math.random() * 500)')


class StrategyRouter:
    """策略路由器"""
    def __init__(self):
        self.strategies = {
            'default': PlaywrightStealthStrategy,
            'strict': StrictStealthStrategy,
            'minimal': MinimalStrategy,
        }
        self.strategy_stats = {}

    def get_strategy(self, target, risk_level='default'):
        """根据目标选择策略"""
        # 检查历史成功率
        history = self.strategy_stats.get(target, {})

        # 如果成功率低，切换策略
        if history.get('success_rate', 1) < 0.5:
            risk_level = 'strict'

        return self.strategies[risk_level]

    def update_stats(self, target, strategy_name, success):
        """更新策略统计"""
        if target not in self.strategy_stats:
            self.strategy_stats[target] = {}

        stats = self.strategy_stats[target]
        stats['total'] = stats.get('total', 0) + 1
        stats['success'] = stats.get('success', 0) + (1 if success else 0)
        stats['success_rate'] = stats['success'] / stats['total']
```

## 7.3 A/B 测试与对抗

```python
class ABTestingFramework:
    """A/B 测试框架"""
    def __init__(self):
        self.experiments = {}
        self.results = {}

    def create_experiment(self, name, variations):
        """创建实验"""
        self.experiments[name] = {
            'variations': variations,
            'traffic': {v: 0 for v in variations},
            'conversions': {v: 0 for v in variations},
        }

    def assign_variation(self, name, session_id):
        """为会话分配变体"""
        exp = self.experiments[name]

        if session_id not in self.results:
            # 随机分配
            variation = random.choice(exp['variations'])
            self.results[session_id] = {'variation': variation}
            exp['traffic'][variation] += 1

        return self.results[session_id]['variation']

    def record_conversion(self, name, session_id):
        """记录转化"""
        exp = self.experiments[name]
        variation = self.results[session_id]['variation']
        exp['conversions'][variation] += 1

    def get_results(self, name):
        """获取实验结果"""
        exp = self.experiments[name]
        results = {}

        for v in exp['variations']:
            traffic = exp['traffic'][v]
            conversions = exp['conversions'][v]
            results[v] = {
                'traffic': traffic,
                'conversions': conversions,
                'rate': conversions / traffic if traffic > 0 else 0
            }

        return results


# 使用示例：测试不同反检测策略
ab_test = ABTestingFramework()
ab_test.create_experiment('anti-detection', [
    'basic-headers',
    'stealth-plugin',
    'full-simulation',
])

# 为每个会话分配策略
strategy = ab_test.assign_variation('anti-detection', session_id)
```

## 7.4 速率限制

### 令牌桶算法

```python
import time
from threading import Lock

class TokenBucket:
    def __init__(self, rate, capacity):
        """令牌桶限流

        Args:
            rate: 令牌生成速率（个/秒）
            capacity: 桶容量
        """
        self.rate = rate
        self.capacity = capacity
        self.tokens = capacity
        self.last_time = time.time()
        self.lock = Lock()

    def consume(self, tokens=1):
        """消费令牌"""
        with self.lock:
            now = time.time()
            # 补充令牌
            self.tokens = min(
                self.capacity,
                self.tokens + (now - self.last_time) * self.rate
            )
            self.last_time = now

            # 检查是否有足够令牌
            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False

    def wait(self, tokens=1):
        """等待令牌可用"""
        while not self.consume(tokens):
            time.sleep(0.1)
```

### 滑动窗口算法

```python
from collections import deque
import time

class SlidingWindow:
    def __init__(self, limit, window):
        """滑动窗口限流

        Args:
            limit: 时间窗口内最大请求数
            window: 时间窗口（秒）
        """
        self.limit = limit
        self.window = window
        self.requests = deque()

    def allow(self):
        """检查是否允许请求"""
        now = time.time()

        # 移除窗口外的请求
        while self.requests and self.requests[0] <= now - self.window:
            self.requests.popleft()

        # 检查是否超过限制
        if len(self.requests) < self.limit:
            self.requests.append(now)
            return True
        return False
```

### 自适应限流

```python
class AdaptiveRateLimiter:
    """自适应限流器"""
    def __init__(self, initial_rate=1, min_rate=0.1, max_rate=10):
        self.rate = initial_rate
        self.min_rate = min_rate
        self.max_rate = max_rate
        self.success_count = 0
        self.failure_count = 0
        self.window_size = 10
        self.history = []

    def record(self, success):
        """记录请求结果"""
        self.history.append(success)
        if len(self.history) > self.window_size:
            self.history.pop(0)

        # 计算成功率
        success_rate = sum(self.history) / len(self.history)

        # 调整速率
        if success_rate > 0.9:
            self.rate = min(self.max_rate, self.rate * 1.1)
        elif success_rate < 0.5:
            self.rate = max(self.min_rate, self.rate * 0.8)

    def wait_time(self):
        """获取等待时间"""
        return max(0, 1 / self.rate)

    def wait(self):
        """等待下一个请求"""
        time.sleep(self.wait_time())
```

## 7.5 AI 智能体

### 强化学习决策

```python
import numpy as np

class RLCrawlerAgent:
    """基于强化学习的爬虫智能体"""

    def __init__(self, state_size, action_size):
        self.state_size = state_size
        self.action_size = action_size
        self.memory = []
        self.epsilon = 1.0  # 探索率
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995

    def act(self, state):
        """选择动作"""
        if np.random.random() <= self.epsilon:
            # 探索：随机选择
            return np.random.choice(self.action_size)

        # 利用：选择最佳动作
        return np.argmax(self.model.predict(state))

    def remember(self, state, action, reward, next_state, done):
        """存储经验"""
        self.memory.append((state, action, reward, next_state, done))

    def replay(self, batch_size=32):
        """经验回放训练"""
        if len(self.memory) < batch_size:
            return

        # 随机采样
        samples = np.random.choice(len(self.memory), batch_size, replace=False)

        for i in samples:
            state, action, reward, next_state, done = self.memory[i]

            # Q-learning 更新
            target = reward
            if not done:
                target = reward + self.gamma * np.amax(
                    self.model.predict(next_state)[0]
                )

            target_f = self.model.predict(state)
            target_f[0][action] = target
            self.model.fit(state, target_f, epochs=1, verbose=0)

        # 衰减探索率
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay


# 使用示例
agent = RLCrawlerAgent(state_size=10, action_size=5)

# 状态: [成功率, 被检测次数, 请求间隔, ...]
# 动作: [增加延迟, 减少延迟, 切换代理, 重试, 放弃]
state = get_current_state()
action = agent.act(state)
```

### 自适应导航

```python
class AdaptiveNavigator:
    """自适应导航器"""

    def __init__(self):
        self.strategies = {
            'conservative': ConservativeStrategy(),
            'aggressive': AggressiveStrategy(),
            'balanced': BalancedStrategy(),
        }
        self.current_strategy = 'balanced'
        self.performance_history = {}

    def navigate(self, page, url):
        """自适应导航"""
        # 1. 检查历史性能
        domain = urlparse(url).netloc
        if domain in self.performance_history:
            success_rate = self.performance_history[domain]['success_rate']

            # 动态选择策略
            if success_rate < 0.3:
                self.current_strategy = 'conservative'
            elif success_rate > 0.8:
                self.current_strategy = 'aggressive'
            else:
                self.current_strategy = 'balanced'

        # 2. 执行策略
        strategy = self.strategies[self.current_strategy]
        result = strategy.execute(page, url)

        # 3. 更新性能记录
        self._record_performance(domain, result)

        return result

    def _record_performance(self, domain, result):
        """记录性能数据"""
        if domain not in self.performance_history:
            self.performance_history[domain] = {
                'success': 0,
                'failure': 0,
                'success_rate': 0
            }

        if result['success']:
            self.performance_history[domain]['success'] += 1
        else:
            self.performance_history[domain]['failure'] += 1

        total = (self.performance_history[domain]['success'] +
                self.performance_history[domain]['failure'])
        self.performance_history[domain]['success_rate'] = (
            self.performance_history[domain]['success'] / total
        )
```

### 动态选择器

```python
class DynamicSelector:
    """动态选择器生成器"""

    def __init__(self):
        self.selector_cache = {}
        self.patterns = [
            r'\[data-testid="([^"]+)"\]',
            r'\[id="([^"]+)"\]',
            r'\.([a-zA-Z][\w-]+)',
            r'#([a-zA-Z][\w-]+)',
        ]

    def find_selector(self, element, page):
        """为元素生成选择器"""
        # 1. 尝试从缓存获取
        element_id = id(element)
        if element_id in self.selector_cache:
            return self.selector_cache[element_id]

        # 2. 生成候选选择器
        selectors = self._generate_selectors(element)

        # 3. 验证选择器唯一性
        for selector in selectors:
            if self._is_unique(selector, page):
                self.selector_cache[element_id] = selector
                return selector

        # 4. 生成 XPath 作为后备
        xpath = self._generate_xpath(element)
        self.selector_cache[element_id] = xpath
        return xpath

    def _generate_selectors(self, element):
        """生成候选选择器"""
        selectors = []

        # data-testid
        test_id = element.get_attribute('data-testid')
        if test_id:
            selectors.append(f'[data-testid="{test_id}"]')

        # id
        elem_id = element.get_attribute('id')
        if elem_id:
            selectors.append(f'#{elem_id}')

        # class
        classes = element.get_attribute('class') or ''
        for cls in classes.split():
            selectors.append(f'.{cls}')

        # tag + attribute
        tag = element.evaluate('el => el.tagName.toLowerCase()')
        selectors.append(tag)

        return selectors

    def _is_unique(self, selector, page):
        """验证选择器是否唯一"""
        try:
            count = page.query_selector_all(selector)
            return len(count) == 1
        except:
            return False
```

## 7.6 机器学习应用

### 特征工程

```python
import numpy as np
from sklearn.feature_extraction import FeatureHasher

class PageFeatureExtractor:
    """页面特征提取器"""

    def __init__(self):
        self.hasher = FeatureHasher(n_features=1024)

    def extract(self, page):
        """提取页面特征"""
        features = {}

        # 1. 结构特征
        features['element_count'] = page.evaluate(
            'document.querySelectorAll("*").length'
        )
        features['script_count'] = page.evaluate(
            'document.querySelectorAll("script").length'
        )
        features['iframe_count'] = page.evaluate(
            'document.querySelectorAll("iframe").length'
        )

        # 2. 内容特征
        features['text_length'] = len(page.inner_text())
        features['link_count'] = page.evaluate(
            'document.querySelectorAll("a").length'
        )

        # 3. 动态特征
        features['has_webdriver'] = page.evaluate(
            'navigator.webdriver !== undefined'
        )
        features['chrome_object'] = page.evaluate(
            'typeof window.chrome === "object"'
        )

        # 4. 性能特征
        metrics = page.evaluate('''
            () => ({
                domContentLoaded: performance.timing.domContentLoadedEventEnd -
                                performance.timing.navigationStart,
                loadComplete: performance.timing.loadEventEnd -
                              performance.timing.navigationStart,
            })
        ''')
        features.update(metrics)

        return features
```

### 模式识别

```python
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

class AnomalyDetector:
    """异常检测器"""

    def __init__(self):
        self.scaler = StandardScaler()
        self.model = IsolationForest(contamination=0.1)
        self.fitted = False

    def fit(self, X):
        """训练模型"""
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled)
        self.fitted = True

    def predict(self, X):
        """预测异常"""
        if not self.fitted:
            return np.zeros(len(X))

        X_scaled = self.scaler.transform(X)
        return self.model.predict(X_scaled)

    def is_anomaly(self, features):
        """检测单条记录是否异常"""
        prediction = self.predict([features])
        return prediction[0] == -1


# 使用示例
detector = AnomalyDetector()

# 正常访问数据
normal_data = [
    {'load_time': 1.2, 'element_count': 500, 'script_count': 10},
    {'load_time': 1.5, 'element_count': 600, 'script_count': 12},
    # ...
]

# 训练
X = [[d['load_time'], d['element_count'], d['script_count']]
     for d in normal_data]
detector.fit(X)

# 检测异常
test_features = {'load_time': 0.1, 'element_count': 50, 'script_count': 0}
if detector.is_anomaly([
    test_features['load_time'],
    test_features['element_count'],
    test_features['script_count']
]):
    print("检测到异常访问模式！可能被识别为爬虫")
```

### 预测模型

```python
from sklearn.ensemble import RandomForestClassifier
import joblib

class RiskPredictor:
    """风险预测模型"""

    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100)
        self.fitted = False

    def train(self, X, y):
        """训练模型

        Args:
            X: 特征矩阵 [[延迟, 代理类型, 指纹完整性, ...], ...]
            y: 标签 [0=成功, 1=被检测, ...]
        """
        self.model.fit(X, y)
        self.fitted = True

    def predict(self, features):
        """预测风险

        Returns:
            risk_score: 0-1 风险分数
        """
        if not self.fitted:
            return 0.5

        # 获取被检测的概率
        proba = self.model.predict_proba([features])[0]
        return proba[1]  # 被检测的概率

    def save(self, path):
        """保存模型"""
        joblib.dump(self.model, path)

    def load(self, path):
        """加载模型"""
        self.model = joblib.load(path)
        self.fitted = True


# 使用示例
predictor = RiskPredictor()

# 训练数据
X_train = [
    [1.0, 0, 0.8],  # [延迟(s), 代理类型, 指纹完整性]
    [2.0, 1, 0.9],
    [0.5, 0, 0.5],
    # ...
]
y_train = [0, 0, 1, ...]  # 0=成功, 1=被检测

predictor.train(X_train, y_train)

# 预测
risk = predictor.predict([1.5, 1, 0.85])
if risk > 0.7:
    print("高风险！建议降低频率或切换策略")
```

### 智能分类

```python
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer

class SiteClassifier:
    """网站类型分类器"""

    def __init__(self, n_clusters=5):
        self.vectorizer = TfidfVectorizer(max_features=100)
        self.cluster = KMeans(n_clusters=n_clusters)
        self.fitted = False

    def fit(self, html_contents):
        """训练分类器"""
        # 提取 TF-IDF 特征
        X = self.vectorizer.fit_transform(html_contents)

        # 聚类
        self.cluster.fit(X)
        self.fitted = True

    def predict(self, html_content):
        """预测网站类型"""
        if not self.fitted:
            return 0

        X = self.vectorizer.transform([html_content])
        return self.cluster.predict(X)[0]

    def get_strategy(self, html_content):
        """根据网站类型获取爬取策略"""
        cluster_id = self.predict(html_content)

        strategies = {
            0: 'ecommerce',     # 电商：需要处理图片、价格
            1: 'social',        # 社交：需要登录、处理动态加载
            2: 'news',          # 新闻：主要是文本内容
            3: 'forum',         # 论坛：处理分页、回复
            4: 'corporate',     # 企业：简单静态页面
        }

        return strategies.get(cluster_id, 'default')


# 使用示例
classifier = SiteClassifier()

# 训练（使用不同类型网站的 HTML）
training_html = [
    '<html>...电商页面...</html>',
    '<html>...社交页面...</html>',
    # ...
]
classifier.fit(training_html)

# 预测
strategy = classifier.get_strategy(page.content())
print(f"推荐策略: {strategy}")
```

## 7.7 分布式任务调度

### 任务队列设计

```python
import redis
import json
from dataclasses import dataclass
from typing import Optional

@dataclass
class CrawlTask:
    """爬虫任务"""
    url: str
    priority: int = 0
    domain: str = ''
    strategy: str = 'default'
    retries: int = 0
    max_retries: int = 3

class TaskScheduler:
    """分布式任务调度器"""

    def __init__(self, redis_url='redis://localhost:6379'):
        self.redis = redis.from_url(redis_url)
        self.task_queue = 'crawl:tasks'
        self.result_queue = 'crawl:results'
        self.failed_queue = 'crawl:failed'

    def add_task(self, task: CrawlTask):
        """添加任务"""
        task_data = json.dumps({
            'url': task.url,
            'priority': task.priority,
            'domain': task.domain,
            'strategy': task.strategy,
            'retries': task.retries,
            'max_retries': task.max_retries,
        })

        # 使用优先级队列
        self.redis.zadd(f'{self.task_queue}:priority', {
            task_data: task.priority
        })

    def get_task(self) -> Optional[CrawlTask]:
        """获取下一个任务"""
        # 从优先级队列获取最高优先级任务
        result = self.redis.zpopmax(f'{self.task_queue}:priority')

        if result:
            task_data, priority = result[0]
            data = json.loads(task_data)

            return CrawlTask(**data)

        return None

    def complete_task(self, task: CrawlTask, result_data: dict):
        """标记任务完成"""
        result = {
            'url': task.url,
            'status': 'success',
            'data': result_data,
            'timestamp': time.time()
        }

        self.redis.rpush(self.result_queue, json.dumps(result))

    def fail_task(self, task: CrawlTask, error: str):
        """标记任务失败"""
        if task.retries < task.max_retries:
            # 重新加入队列
            task.retries += 1
            self.add_task(task)
        else:
            # 放入失败队列
            result = {
                'url': task.url,
                'status': 'failed',
                'error': error,
                'retries': task.retries,
                'timestamp': time.time()
            }

            self.redis.rpush(self.failed_queue, json.dumps(result))

    def get_queue_size(self) -> dict:
        """获取队列状态"""
        return {
            'pending': self.redis.zcard(f'{self.task_queue}:priority'),
            'completed': self.redis.llen(self.result_queue),
            'failed': self.redis.llen(self.failed_queue),
        }
```

### Worker 节点管理

```python
import asyncio
from playwright.async_api import async_playwright

class WorkerNode:
    """Worker 节点"""

    def __init__(self, node_id: str, scheduler: TaskScheduler):
        self.node_id = node_id
        self.scheduler = scheduler
        self.is_running = False
        self.browser = None
        self.proxy_pool = ProxyPool()

    async def start(self):
        """启动 Worker"""
        self.is_running = True

        async with async_playwright() as p:
            self.browser = await p.chromium.launch(headless=False)

            while self.is_running:
                # 获取任务
                task = self.scheduler.get_task()

                if task:
                    try:
                        # 执行任务
                        result = await self._execute_task(task)
                        self.scheduler.complete_task(task, result)

                    except Exception as e:
                        self.scheduler.fail_task(task, str(e))

                else:
                    # 等待新任务
                    await asyncio.sleep(1)

    async def _execute_task(self, task: CrawlTask) -> dict:
        """执行单个任务"""
        # 获取代理
        proxy = self.proxy_pool.get_proxy()

        # 创建上下文
        context = await self.browser.new_context(
            proxy={'server': proxy}
        )

        page = await context.new_page()

        # 应用策略
        strategy = self._get_strategy(task.strategy)
        result = await strategy.execute(page, task.url)

        await context.close()

        return result

    def _get_strategy(self, strategy_name: str):
        """获取策略实例"""
        from strategies import (
            PlaywrightStealthStrategy,
            StrictStealthStrategy,
            MinimalStrategy
        )

        strategies = {
            'default': PlaywrightStealthStrategy,
            'strict': StrictStealthStrategy,
            'minimal': MinimalStrategy,
        }

        return strategies.get(strategy_name, PlaywrightStealthStrategy)()

    async def stop(self):
        """停止 Worker"""
        self.is_running = False

        if self.browser:
            await self.browser.close()
```

## 7.8 分布式状态管理

### Redis 状态存储

```python
class DistributedStateManager:
    """分布式状态管理器"""

    def __init__(self, redis_url='redis://localhost:6379'):
        self.redis = redis.from_url(redis_url)
        self.key_prefix = 'crawler:state'

    def save_browser_state(self, session_id: str, state: dict):
        """保存浏览器状态"""
        key = f'{self.key_prefix}:session:{session_id}'

        # 保存到 Redis Hash
        self.redis.hset(key, mapping={
            'cookies': json.dumps(state.get('cookies', [])),
            'storage': json.dumps(state.get('storage', {})),
            'timestamp': time.time(),
        })

        # 设置过期时间
        self.redis.expire(key, 86400)  # 24小时

    def load_browser_state(self, session_id: str) -> Optional[dict]:
        """加载浏览器状态"""
        key = f'{self.key_prefix}:session:{session_id}'

        data = self.redis.hgetall(key)

        if data:
            return {
                'cookies': json.loads(data.get(b'cookies', b'[]')),
                'storage': json.loads(data.get(b'storage', b'{}')),
                'timestamp': float(data.get(b'timestamp', b'0')),
            }

        return None

    def save_proxy_state(self, proxy_pool: dict):
        """保存代理池状态"""
        key = f'{self.key_prefix}:proxies'

        self.redis.set(key, json.dumps(proxy_pool))

    def load_proxy_state(self) -> dict:
        """加载代理池状态"""
        key = f'{self.key_prefix}:proxies'

        data = self.redis.get(key)

        if data:
            return json.loads(data)

        return {}
```

## 7.9 监控与告警

### 实时监控系统

```python
from prometheus_client import Counter, Histogram, Gauge

class MetricsCollector:
    """指标收集器"""

    def __init__(self):
        # 请求计数
        self.request_counter = Counter(
            'crawler_requests_total',
            'Total requests',
            ['domain', 'status']
        )

        # 响应时间
        self.response_time = Histogram(
            'crawler_response_time_seconds',
            'Response time',
            ['domain']
        )

        # 队列长度
        self.queue_size = Gauge(
            'crawler_queue_size',
            'Queue size',
            ['queue_type']
        )

        # 检测率
        self.detection_counter = Counter(
            'crawler_detections_total',
            'Detection events',
            ['domain', 'type']
        )

    def record_request(self, domain: str, status: str):
        """记录请求"""
        self.request_counter.labels(domain=domain, status=status).inc()

    def record_response_time(self, domain: str, duration: float):
        """记录响应时间"""
        self.response_time.labels(domain=domain).observe(duration)

    def record_detection(self, domain: str, detection_type: str):
        """记录检测事件"""
        self.detection_counter.labels(domain=domain, type=detection_type).inc()

    def update_queue_size(self, queue_type: str, size: int):
        """更新队列大小"""
        self.queue_size.labels(queue_type=queue_type).set(size)
```

### 告警系统

```python
class AlertManager:
    """告警管理器"""

    def __init__(self, metrics: MetricsCollector):
        self.metrics = metrics
        self.thresholds = {
            'detection_rate': 0.1,  # 10% 检测率告警
            'queue_size': 1000,     # 队列积压告警
            'response_time': 30,    # 响应时间告警
        }
        self.alert_history = []

    def check_alerts(self, stats: dict) -> list:
        """检查告警条件"""
        alerts = []

        # 检测率告警
        detection_rate = stats.get('detection_rate', 0)
        if detection_rate > self.thresholds['detection_rate']:
            alerts.append({
                'type': 'detection_rate',
                'severity': 'high',
                'value': detection_rate,
                'message': f'检测率过高: {detection_rate:.1%}'
            })

        # 队列积压告警
        queue_size = stats.get('queue_size', 0)
        if queue_size > self.thresholds['queue_size']:
            alerts.append({
                'type': 'queue_size',
                'severity': 'medium',
                'value': queue_size,
                'message': f'队列积压: {queue_size}'
            })

        # 响应时间告警
        avg_response_time = stats.get('avg_response_time', 0)
        if avg_response_time > self.thresholds['response_time']:
            alerts.append({
                'type': 'response_time',
                'severity': 'medium',
                'value': avg_response_time,
                'message': f'响应时间过长: {avg_response_time:.1f}s'
            })

        # 去重后返回
        return self._deduplicate_alerts(alerts)

    def _deduplicate_alerts(self, alerts: list) -> list:
        """告警去重"""
        unique_alerts = []

        for alert in alerts:
            # 检查是否最近已告警过
            is_duplicate = any(
                a['type'] == alert['type'] and
                time.time() - a['timestamp'] < 3600  # 1小时内
                for a in self.alert_history
            )

            if not is_duplicate:
                alert['timestamp'] = time.time()
                unique_alerts.append(alert)
                self.alert_history.append(alert)

        return unique_alerts
```

## 7.10 故障恢复机制

### 自动故障处理

```python
class FailureRecoveryManager:
    """故障恢复管理器"""

    def __init__(self):
        self.recovery_strategies = {
            'ip_blocked': self._recover_from_ip_block,
            'rate_limit': self._recover_from_rate_limit,
            'captcha_failed': self._recover_from_captcha,
            'timeout': self._recover_from_timeout,
        }

    async def handle_failure(self, task: CrawlTask, error: dict) -> bool:
        """处理失败"""
        failure_type = error.get('type', 'unknown')

        recovery_strategy = self.recovery_strategies.get(failure_type)

        if recovery_strategy:
            return await recovery_strategy(task, error)

        return False

    async def _recover_from_ip_block(self, task: CrawlTask, error: dict) -> bool:
        """从 IP 封锁中恢复"""
        # 1. 标记代理为失效
        proxy_manager.mark_failed(task.proxy)

        # 2. 切换到新代理
        new_proxy = proxy_manager.get_proxy()

        # 3. 降低请求频率
        rate_limiter.reduce_rate(0.5)

        # 4. 重试任务
        task.proxy = new_proxy
        task.retries += 1

        return True

    async def _recover_from_rate_limit(self, task: CrawlTask, error: dict) -> bool:
        """从速率限制中恢复"""
        # 1. 计算等待时间
        retry_after = error.get('retry_after', 60)

        # 2. 等待
        await asyncio.sleep(retry_after)

        # 3. 降低速率
        rate_limiter.reduce_rate(0.7)

        # 4. 重试
        task.retries += 1

        return True

    async def _recover_from_captcha(self, task: CrawlTask, error: dict) -> bool:
        """从验证码失败中恢复"""
        # 1. 切换验证码解决方式
        if task.captcha_solver == 'local':
            task.captcha_solver = 'service'
        else:
            # 2. 更换会话
            task.session_id = session_manager.create_session()

        # 3. 重试
        task.retries += 1

        return True

    async def _recover_from_timeout(self, task: CrawlTask, error: dict) -> bool:
        """从超时中恢复"""
        # 1. 增加超时时间
        task.timeout = min(task.timeout * 1.5, 300)

        # 2. 降低并发
        concurrency_limiter.reduce_concurrency()

        # 3. 重试
        task.retries += 1

        return True
```

## 7.11 性能优化

### 并发控制优化

```python
class OptimizedConcurrencyManager:
    """优化的并发管理器"""

    def __init__(self, initial_concurrency=10):
        self.current_concurrency = initial_concurrency
        self.min_concurrency = 1
        self.max_concurrency = 50
        self.success_history = []
        self.window_size = 100

    def adjust_concurrency(self, success: bool):
        """根据成功率调整并发"""
        self.success_history.append(success)

        if len(self.success_history) > self.window_size:
            self.success_history.pop(0)

        # 计算成功率
        success_rate = sum(self.success_history) / len(self.success_history)

        # 调整策略
        if success_rate > 0.95 and self.current_concurrency < self.max_concurrency:
            # 成功率高，增加并发
            self.current_concurrency += 2
        elif success_rate < 0.7 and self.current_concurrency > self.min_concurrency:
            # 成功率低，减少并发
            self.current_concurrency = max(
                self.min_concurrency,
                int(self.current_concurrency * 0.8)
            )

        return self.current_concurrency

    def get_concurrency(self) -> int:
        """获取当前并发数"""
        return self.current_concurrency
```

### 资源池管理

```python
class BrowserPool:
    """浏览器实例池"""

    def __init__(self, max_size=10):
        self.max_size = max_size
        self.pool = asyncio.Queue(maxsize=max_size)
        self.created_count = 0

    async def acquire(self) -> Browser:
        """获取浏览器实例"""
        try:
            # 尝试从池中获取
            browser = await asyncio.wait_for(
                self.pool.get(),
                timeout=1.0
            )
            return browser

        except asyncio.TimeoutError:
            # 池为空，创建新实例
            if self.created_count < self.max_size:
                self.created_count += 1
                return await self._create_browser()

            raise Exception('Browser pool exhausted')

    async def release(self, browser: Browser):
        """归还浏览器实例"""
        try:
            await self.pool.put(browser)
        except asyncio.QueueFull:
            # 池已满，关闭浏览器
            await browser.close()
            self.created_count -= 1

    async def _create_browser(self) -> Browser:
        """创建新浏览器"""
        playwright = await async_playwright().start()
        return await playwright.chromium.launch(headless=False)
```

---

# 八、学习路径与实战建议

## 8.1 入门阶段（1-2 周）

### 目标
- 理解反爬虫基本原理
- 掌握基础 HTTP 指纹伪装
- 能够应对简单检测

### 学习清单

- [ ] **HTTP 基础**
  - [ ] 理解 HTTP 头部组成
  - [ ] 掌握 User-Agent 伪造
  - [ ] 完整请求头模拟

- [ ] **基础浏览器自动化**
  - [ ] 安装配置 Playwright/Puppeteer
  - [ ] 基本的页面导航与交互
  - [ ] 元素定位与数据提取

- [ ] **简单指纹处理**
  - [ ] 移除 `navigator.webdriver`
  - [ ] 伪造 `navigator.plugins`
  - [ ] 设置真实的 User-Agent

### 实战项目
**目标**：爬取一个中等复杂度的电商网站

```python
# 入门项目示例
from playwright.sync_api import sync_playwright

def scrape_ecommerce(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        # 基础伪装
        page.set_extra_http_headers({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...'
        })

        page.goto(url)
        time.sleep(2)

        # 提取数据
        products = page.query_selector_all('.product-item')
        for product in products:
            title = product.query_selector('.title').text_content()
            price = product.query_selector('.price').text_content()
            print(f"{title}: {price}")

        browser.close()
```

## 8.2 进阶阶段（1-2 个月）

### 目标
- 掌握完整指纹伪装
- 模拟人类行为
- 应对中等难度检测

### 学习清单

- [ ] **完整指纹伪装**
  - [ ] Navigator 对象完整伪造
  - [ ] Canvas/WebGL 指纹处理
  - [ ] 屏幕分辨率与设备信息

- [ ] **人类行为模拟**
  - [ ] 贝塞尔曲线鼠标移动
  - [ ] 自然打字节奏
  - [ ] 滚动与停留模拟

- [ ] **网络环境管理**
  - [ ] 代理池搭建
  - [ ] 代理轮换策略
  - [ ] 失败重试机制

- [ ] **状态管理**
  - [ ] Cookie 持久化
  - [ ] 浏览器 Profile 管理
  - [ ] LocalStorage 保存恢复

### 实战项目
**目标**：爬取一个有基本反爬虫的社交媒体

```python
# 进阶项目示例
class AdvancedScraper:
    def __init__(self):
        self.proxy_pool = ProxyPool.load_proxies()
        self.cookie_manager = CookieManager('./cookies')
        self.mouse_sim = MouseSimulator()

    def scrape_target(self, target_url, account_id):
        # 1. 获取代理和 Cookie
        proxy = self.proxy_pool.get_proxy()
        cookies = self.cookie_manager.get_cookies(target_url, account_id)

        # 2. 启动浏览器
        browser = self.launch_with_proxy(proxy, cookies)

        # 3. 模拟人类导航
        self.human_navigate(browser, target_url)

        # 4. 提取数据
        data = self.extract_data(browser)

        # 5. 保存状态
        self.cookie_manager.save_cookies(target_url, cookies, account_id)

        return data
```

## 8.3 高级阶段（3-6 个月）

### 目标
- 处理验证码
- 构建分布式架构
- 应对高难度检测

### 学习清单

- [ ] **验证码处理**
  - [ ] OCR 图像识别
  - [ ] 滑动验证码破解
  - [ ] 行为验证对抗

- [ ] **分布式架构**
  - [ ] 任务调度设计
  - [ ] 多节点协同
  - [ ] 资源池管理

- [ ] **高级反检测**
  - [ ] reCAPTCHA v3 对抗
  - [ ] 浏览器指纹完全一致
  - [ ] WAF 绕过

### 实战项目
**目标**：构建企业级分布式爬虫系统

## 8.4 精通阶段（持续）

### 目标
- 深入理解检测机制
- 开发反检测工具
- 持续跟进对抗技术

### 学习方向

- [ ] **浏览器内核研究**
  - [ ] Chromium 源码分析
  - [ ] 检测机制深度理解
  - [ ] 内核级绕过方案

- [ ] **AI 辅助**
  - [ ] 行为模式学习
  - [ ] 检测预测模型
  - [ ] 自动化对抗

- [ ] **工具开发**
  - [ ] 反检测框架开发
  - [ ] A/B 测试平台
  - [ ] 监控与分析工具

---

# 九、实用工具与库推荐

## 9.1 Python 生态

| 库名 | 用途 | 推荐指数 |
|------|------|---------|
| **playwright** | 浏览器自动化 | ⭐⭐⭐⭐⭐ |
| **selenium** | 浏览器自动化 | ⭐⭐⭐⭐ |
| **undetected-chromedriver** | 绕过检测的 Chrome | ⭐⭐⭐⭐⭐ |
| **fake-useragent** | User-Agent 生成 | ⭐⭐⭐⭐ |
| **pytesseract** | OCR 识别 | ⭐⭐⭐ |
| **opencv-python** | 图像处理 | ⭐⭐⭐⭐⭐ |
| **requests** | HTTP 请求 | ⭐⭐⭐⭐⭐ |
| **httpx** | 异步 HTTP | ⭐⭐⭐⭐ |
| **playwright-stealth** | Playwright 隐身插件 | ⭐⭐⭐⭐⭐ |
| **go-rod/stealth** | Go 语言反检测 | ⭐⭐⭐⭐ |

## 9.2 Node.js 生态

| 库名 | 用途 | 推荐指数 |
|------|------|---------|
| **puppeteer** | 浏览器自动化 | ⭐⭐⭐⭐⭐ |
| **puppeteer-extra** | Puppeteer 扩展 | ⭐⭐⭐⭐⭐ |
| **puppeteer-extra-plugin-stealth** | 隐身插件 | ⭐⭐⭐⭐⭐ |
| **playwright** | 浏览器自动化 | ⭐⭐⭐⭐⭐ |
| **2captcha** | 验证码服务 | ⭐⭐⭐⭐ |
| **tesseract.js** | OCR 识别 | ⭐⭐⭐ |

## 9.3 Go 生态

| 库名 | 用途 | 推荐指数 |
|------|------|---------|
| **rod** | 浏览器自动化 | ⭐⭐⭐⭐⭐ |
| **go-rod/stealth** | 反检测库 | ⭐⭐⭐⭐⭐ |
| **colly** | 爬虫框架 | ⭐⭐⭐⭐ |
| **chromedp** | Chrome DevTools 协议 | ⭐⭐⭐⭐ |

## 9.4 在线服务

| 服务 | 用途 | 成本 |
|------|------|------|
| **2captcha** | 验证码识别 | $2.99/1000 次 |
| **Anti-Captcha** | 验证码识别 | $3/1000 次 |
| **Capy** | 验证码识别 | 按需计费 |
| **Bright Data** | 住宅代理 | $500+/月起 |
| **Oxylabs** | 代理服务 | $300+/月起 |

---

# 十、常见问题与解决方案

## 10.1 检测特征对照

| 症状 | 可能原因 | 解决方案 |
|------|---------|---------|
| 立即返回 403 | IP 被封 | 更换代理 |
| 验证码频繁出现 | 行为可疑 | 改善行为模拟 |
| 登录态失效 | Cookie 过期 | 实现 Cookie 刷新 |
| 数据获取不全 | JS 动态渲染 | 等待元素加载 |
| 触发风控 | 指纹异常 | 完善指纹伪装 |

## 10.2 调试技巧

### 开启详细日志

```python
# Playwright 调试模式
context = browser.new_context(
    proxy={'server': proxy},
    locale='zh-CN',
    viewport={'width': 1920, 'height': 1080},
)

page = context.new_page()
page.on('console', lambda msg: print(f"Console: {msg.text}"))
page.on('request', lambda req: print(f"Request: {req.url}"))
```

### 抓包分析

```bash
# 使用 mitmproxy 分析请求
mitmproxy --listen-port 8080

# 浏览器设置代理
proxy = {'server': 'http://127.0.0.1:8080'}
```

## 10.3 性能分析

### 瓶颈识别

```python
import cProfile
import pstats
from io import StringIO

class PerformanceProfiler:
    """性能分析器"""

    def profile_function(self, func, *args, **kwargs):
        """分析函数性能"""
        profiler = cProfile.Profile()

        profiler.enable()
        result = func(*args, **kwargs)
        profiler.disable()

        # 输出统计
        s = StringIO()
        stats = pstats.Stats(profiler, stream=s)
        stats.strip_dirs()
        stats.sort_stats('cumulative')
        stats.print_stats(20)  # 打印前 20 个函数

        print(s.getvalue())

        return result

# 使用示例
profiler = PerformanceProfiler()
profiler.profile_function(scrape_url, url)
```

### 内存泄漏检测

```python
import tracemalloc

class MemoryLeakDetector:
    """内存泄漏检测器"""

    def __init__(self):
        self.snapshots = []

    def start_tracking(self):
        """开始跟踪内存"""
        tracemalloc.start()
        self.snapshots.append(tracemalloc.take_snapshot())

    def take_snapshot(self, label=''):
        """获取内存快照"""
        snapshot = tracemalloc.take_snapshot()
        self.snapshots.append((label, snapshot))

        return snapshot

    def compare_snapshots(self, index1=-2, index2=-1):
        """比较两个快照"""
        label1, snapshot1 = self.snapshots[index1]
        label2, snapshot2 = self.snapshots[index2]

        stats = snapshot2.compare_to(snapshot1, 'lineno')

        print(f"内存变化 ({label1} -> {label2}):")
        for stat in stats[:10]:
            print(stat)

    def stop_tracking(self):
        """停止跟踪"""
        tracemalloc.stop()
```

## 10.4 常见错误处理

### 异常分类与处理

```python
class CrawlerErrorHandler:
    """爬虫错误处理器"""

    def __init__(self):
        self.error_handlers = {
            'TimeoutError': self._handle_timeout,
            'ConnectionError': self._handle_connection,
            'HTTPError': self._handle_http_error,
            'DetectedError': self._handle_detection,
            'CaptchaError': self._handle_captcha,
        }

    def handle_error(self, error, context=None):
        """处理错误"""
        error_type = type(error).__name__
        error_name = error_type.split("'")[0] if "'" in error_type else error_type

        handler = self.error_handlers.get(error_name)

        if handler:
            return handler(error, context)

        # 默认处理
        return self._handle_unknown(error, context)

    def _handle_timeout(self, error, context):
        """处理超时"""
        print(f"超时错误: {error}")
        return {
            'action': 'retry',
            'delay': 10,
            'message': '请求超时，将重试'
        }

    def _handle_connection(self, error, context):
        """处理连接错误"""
        print(f"连接错误: {error}")
        return {
            'action': 'switch_proxy',
            'message': '连接失败，切换代理'
        }

    def _handle_http_error(self, error, context):
        """处理 HTTP 错误"""
        status_code = getattr(error.response, 'status_code', None)

        if status_code == 403:
            return {
                'action': 'rotate_strategy',
                'message': '被拒绝访问，切换策略'
            }
        elif status_code == 429:
            return {
                'action': 'backoff',
                'delay': 60,
                'message': '速率限制，等待后重试'
            }

        return {
            'action': 'retry',
            'message': f'HTTP {status_code} 错误'
        }

    def _handle_detection(self, error, context):
        """处理被检测"""
        print(f"检测到反爬虫: {error}")
        return {
            'action': 'escalate',
            'message': '被检测到，升级策略'
        }

    def _handle_captcha(self, error, context):
        """处理验证码"""
        return {
            'action': 'solve_captcha',
            'message': '触发验证码'
        }

    def _handle_unknown(self, error, context):
        """处理未知错误"""
        print(f"未知错误: {error}")
        return {
            'action': 'skip',
            'message': '未知错误，跳过'
        }
```

## 10.5 调试工具链

### Chrome DevTools 集成

```python
import asyncio
from playwright.async_api import async_playwright

class DebuggerIntegration:
    """调试器集成"""

    async def attach_devtools(self, browser):
        """附加 DevTools"""
        # 获取 WebSocket URL
        cdp_url = await browser.context.cdp_session()

        # 可以通过以下方式连接：
        # 1. Chrome 远程调试端口
        # 2. puppeteer-cluster 的调试模式
        # 3. playwright 的 debug 模式

        print(f"CDP URL: {cdp_url}")

    async def enable_tracing(self, page, trace_path):
        """启用跟踪"""
        await page.context.tracing.start(
            name="trace",
            screenshots=True,
            snapshots=True
        )

        # ... 执行操作 ...

        await page.context.tracing.stop(path=trace_path)
```

---

# 十一、法律与伦理

## 11.1 重要提示

**反爬虫技术仅供学习和研究使用。** 在实际应用前，请确保：

1. **遵守 robots.txt**：尊重网站的爬虫协议
2. **获得授权**：对目标网站爬取前获得明确授权
3. **控制频率**：避免对目标服务器造成压力
4. **数据合规**：遵守数据保护和隐私法规
5. **商业考量**：理解商业条款，避免法律风险

## 11.2 灰色地带

以下场景可能涉及法律风险：

- [ ] 爬取未授权的商业数据
- [ ] 绕过付费墙获取内容
- [ ] 爬取用户隐私数据
- [ ] 影响网站正常运营

---

# 十二、总结

反反爬虫是一个复杂而持续发展的领域。本文构建的技能树涵盖了从基础到精通的完整技术体系：

1. **基础层**：理解 HTTP、浏览器工作原理、指纹技术
2. **环境层**：浏览器指纹伪装、网络环境隔离、设备信息伪造
3. **行为层**：鼠标/键盘行为模拟、人类行为模式
4. **持久层**：Cookie/Session 管理、状态同步
5. **验证层**：验证码识别、人机验证对抗
6. **架构层**：分布式架构、反检测策略库

**核心原则**：
- 指纹伪装要完整
- 行为模拟要自然
- 状态管理要持久
- 策略调整要灵活
- 伦理法律要遵守

随着检测技术的进步，反检测策略也需要持续更新。建议定期关注社区动态，分享经验，共同成长。

### 完整技术体系回顾

```
反反爬虫技术体系
│
├── 基础层（必备）
│   ├── HTTP 请求完整伪装
│   ├── HTTP/2 协议指纹处理
│   ├── WebSocket 连接模拟
│   ├── 请求头完整性维护
│   ├── Referer 链管理
│   ├── Cookie 属性控制
│   └── 断点续传支持
│
├── 环境层（核心）
│   ├── Navigator 对象完整伪造
│   ├── CDP 检测绕过
│   ├── Canvas/WebGL 指纹伪装
│   ├── TLS 指纹伪装
│   ├── WebRTC 防护
│   ├── CDN 绕过
│   ├── 代理池管理
│   ├── 字体指纹伪造
│   ├── Web Audio 指纹处理
│   ├── Battery/Network/Screen API 伪造
│   ├── Geolocation 伪装
│   ├── WebGL 参数随机化
│   ├── Chrome DevTools 指纹隐藏
│   ├── iframe 内容伪装
│   ├── 媒体编解码器伪造
│   ├── Touch API 支持
│   └── 硬件指纹随机化
│
├── 行为层（高级）
│   ├── 鼠标贝塞尔曲线轨迹
│   ├── 键盘打字节奏模拟
│   ├── 滚动行为模式
│   ├── 视线停留时间
│   ├── 窗口大小变化
│   ├── 页面停留时间
│   ├── 点击位置偏移
│   ├── 多标签页操作
│   ├── 浏览器历史导航
│   ├── 右键操作
│   ├── 拖放操作
│   ├── 音频/视频交互
│   ├── 表单提交节奏
│   ├── 鼠标抖动
│   ├── 键盘修正
│   ├── 触摸事件
│   ├── Hover 停留
│   ├── 视觉扫视
│   ├── 随机停顿
│   ├── 链接决策
│   ├── 滚动模式
│   └── 用户偏好模拟
│
├── 持久层（稳定）
│   ├── Cookie 池管理
│   ├── 多账号并发管理
│   ├── 浏览器 Profile
│   ├── LocalStorage 管理
│   ├── SessionStorage 管理
│   ├── IndexedDB 管理
│   ├── 状态快照
│   ├── Cache API 管理
│   ├── Service Worker 管理
│   └── Cookie 自动刷新
│
├── 验证层（攻坚）
│   ├── OCR 验证码识别
│   ├── 滑动验证码破解
│   ├── 点击验证码破解
│   ├── 行为验证模拟
│   ├── reCAPTCHA 对抗
│   ├── hCaptcha 对抗
│   ├── 验证码服务集成
│   ├── 自动识别框架
│   └── 验证码缓存策略
│
└── 架构层（精通）
    ├── 分布式任务调度
    ├── Worker 节点管理
    ├── 分布式状态管理
    ├── 监控告警系统
    ├── 故障恢复机制
    ├── 性能优化
    ├── 策略路由
    ├── A/B 测试
    ├── 速率限制
    ├── AI 智能决策
    ├── 自适应导航
    ├── 动态选择器
    ├── 特征工程
    ├── 模式识别
    ├── 风险预测
    └── 网站智能分类
```

### 技能掌握建议

| 阶段 | 掌握目标 | 重点技能 | 时间投入 |
|------|---------|----------|----------|
| 入门 | 能应对简单检测 | HTTP 伪装、基础指纹 | 1-2 周 |
| 进阶 | 能应对中等检测 | 完整指纹、行为模拟 | 1-2 个月 |
| 高级 | 能应对复杂检测 | 验证码、分布式架构 | 3-6 个月 |
| 精通 | 能应对高难度检测 | 内核级对抗、AI 辅助 | 持续学习 |

### 常见陷阱

1. **过度依赖单一策略**：网站会更新检测机制，需要多种策略组合
2. **忽视行为模拟**：再完美的指纹，行为异常也会被检测
3. **忽略性能优化**：资源浪费会降低系统可扩展性
4. **不遵守法律边界**：技术再强，法律风险也不能忽视
5. **缺乏监控反馈**：没有数据支撑的优化是盲目的

---

## 参考资源

### 官方文档
- [Playwright 文档](https://playwright.dev/)
- [Puppeteer 文档](https://pptr.dev/)
- [rod 文档](https://github.com/go-rod/rod)

### 反检测工具
- [go-rod/stealth](https://github.com/go-rod/stealth) - Go 反检测库
- [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) - Puppeteer 隐身插件
- [playwright-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/playwright-stealth) - Playwright 隐身插件
- [undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) - Python 反检测 Chrome

### 检测工具
- [browserleaks](https://browserleaks.com/) - 浏览器指纹检测网站
- [abuseipdb](https://abuseipdb.com/) - IP 信誉检查
- [whoer.net](https://whoer.net/) - 综合指纹检测

### 学习资源
- [反反爬虫技术社区](https://github.com/topics/anti-scraping)
- [爬虫论坛](https://cuiqingcai.com/)
- [验证码识别研究](https://github.com/tesseract-ocr/tesseract)

### 相关项目
- [scrapy-cluster](https://github.com/vinta/scrapy-cluster) - 分布式爬虫
- [crawlerhunter](https://crawlerhunter.com/) - 爬虫检测研究

---

**本文档持续更新中，欢迎提交 PR 补充和完善内容。**
