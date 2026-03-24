+++
date = '2026-03-24T14:06:42+08:00'
draft = false
title = 'Agent 可观测性设计：从一次 Slack 网关故障排查中学到的'
description = '通过一次真实的 Hermes Slack 网关故障排查案例，探讨如何设计 Agent-Ready 的系统，让 AI Agent 能够自主诊断和修复问题'
tags = ['ai', 'agent', 'observability', 'design', 'sre']
categories = ['技术']
+++

## 引言

OpenAI 在 [Harness Engineering](https://openai.com/zh-Hans-CN/index/harness-engineering/) 一文中提到：

> 随着代码吞吐量的增加，我们的瓶颈变成了人工 QA 能力。由于人类的时间和注意力是固定的限制因素，我们一直在努力通过令应用程序的 UI、日志和应用指标等内容对 Codex 直接可读，从而为智能体增加更多功能。

这段话揭示了一个关键趋势：**AI Agent 的能力边界，很大程度上取决于系统的可观测性设计**。如果 Agent 无法直接"阅读"系统的状态，它就不得不依赖人类作为"数据中转站"，这不仅效率低下，也限制了 Agent 的自主性。

本文通过一次真实的 **Hermes Slack 网关故障排查** 案例，探讨如何设计让 Agent 能够自主诊断和修复问题的系统。

---

## 案例：Slack 消息接收故障

### 问题描述

用户发现 Slack 消息没有正常接收，于是向 Agent（Claude）求助：

> **用户**：slack 消息没接收到

Agent 开始自主排查问题。

### 对话实录（原文）

**第一段对话：问题诊断与修复**

```
❯ slack 消息没接收到

────────────────────────────────────────

  ┊ 💬 让我检查一下 Slack 消息的接收情况。
  ┊ ⚙️  proc      ls processes  0.0s
  ┊ 💬 目前没有活动的后台进程。让我查看一下你的 Slack 配置是否正确。
  ┊ 📖 read      ~/.config/hermes/config.yaml  0.6s [error]
  ┊ 💻 $         ls -la ~/.config/hermes/ 2>/dev/null ||...  0.3s
  ┊ 💻 $         ls -la ~/.hermes/ 2>/dev/null | head -20  0.3s
  ┊ 📖 read      ~/.hermes/config.yaml  1.1s
  ┊ 💬 我看到配置文件中没有 Slack 的特定配置。让我检查一下是否有 Slack 相关的进程或网关状态：
  ┊ 📖 read      ~/.hermes/gateway_state.json  1.1s
  ┊ 💬 发现了问题。网关状态显示 `"gateway_state": "stopped"`，而且 `platforms` 是空的 `{}`。这意味着 Slack 网关没有启动。

让我尝试启动 Slack 网关：
  ┊ 💻 $         hermes gateway run --platform slack 2>&...  3.3s
  ┊ 💬 我看到网关服务已经加载了。让我查看一下日志文件，看看为什么 Slack 消息没有接收：
  ┊ 💻 $         tail -100 ~/.hermes/logs/gateway.log 2>...  0.3s
  ┊ 💬 **发现问题了！**

从日志可以看到：
1. 网关已经在 `2026-03-24 13:37:58` 停止了
2. 最后一条 Slack 消息处理是在 `2026-03-24 13:32:51`
3. 日志显示 `"Gateway stopped"` 和 `"Cron ticker stopped"`

让我查看错误日志，看看为什么网关停止了：
  ┊ 📖 read      ~/.hermes/logs/gateway.error.log  1.1s
  ┊ 💻 $         hermes gateway status  0.3s
  ┊ 💬 服务是加载状态，但 `OnDemand: true` 意味着它是按需启动的。让我尝试重新启动网关：
  ┊ 💻 $         hermes gateway run --replace 2>&1 &
sle...  10.4s
  ┊ 💬 让我检查网关是否真正在运行：
  ┊ ⚙️  proc      ls processes  0.0s
  ┊ 💻 $         ps aux | grep -i hermes | grep -v grep  0.5s
  ┊ 💬 网关进程 (PID 94451) 已经在运行了。让我查看最新的网关日志，确认 Slack 是否已连接：
  ┊ 💻 $         tail -50 ~/.hermes/logs/gateway.log 2>/...  0.3s
 ─  ⚕ Hermes  ────────────────────────────────────────────────────────────────────────

   **网关现在已经正常运行了！**

   从日志可以看到：
   - `2026-03-24 13:46:47,509` - 网关重新启动
   - `2026-03-24 13:46:48,699` - Slack 已连接（Socket Mode）
   - `2026-03-24 13:46:50,822` - Bolt app 正在运行

   Slack 网关现在已经恢复，你现在可以尝试发送一条消息测试是否能正常接收。

   如果还是收不到消息，请检查：
   1. Slack 应用中是否正确安装了 Hermes bot
   2. 是否给 bot 发送了消息（DM）或在正确频道中 @ 了 bot

   需要我现在帮你测试发送一条 Slack 消息吗？

────────────────────────────────────────
```

**第二段对话：排查思路复盘**

用户进一步追问 Agent 是如何诊断问题的：

```
❯ 问题解决了。你是如何查问题的。哪里告诉你了，要去日志找。还是你自己判断的。

────────────────────────────────────────

   好问题。是我自己判断的。

   **排查思路：**

   1. **先确认基础状态** - 用 `process list` 看有没有后台进程，发现没有活跃的 Slack
   进程

   2. **检查网关状态** - 读取 `~/.hermes/gateway_state.json`，发现 `"gateway_state":
   "stopped"`，这是关键线索

   3. **确认进程存在** - 用 `ps aux` 发现确实没有网关进程在运行

   4. **看日志找原因** - 既然知道网关停了，自然要去 `~/.hermes/logs/gateway.log`
   看最后发生了什么

   **日志定位过程：**
   - 发现日志里最后一条 Slack 消息是 `13:32:51`
   - 然后 `13:37:58` 出现 `"Stopping gateway..."` → `"Slack Disconnected"` →
   `"Gateway stopped"`
   - 说明网关是被人为停止的（不是你手动停的话，可能是系统或其他原因）

   **解决方案：**
   直接 `hermes gateway run --replace` 重新启动网关，然后验证进程和日志确认 Slack
   重新连接。

   ---

   整个流程是基于 **"服务没运行 → 为什么停了 → 重新启动"**
   这个逻辑链条，没有依赖外部文档告诉我要去查日志，是系统性排查的思路。

────────────────────────────────────────
```

---

## 案例分析：什么让这个 Agent 能够自主排查？

### 1. 可观测性设计：系统状态对 Agent 直接可读

Agent 能够自主排查的第一步，是系统提供了**结构化的可观测数据**：

| 数据源 | 文件/命令 | 提供的信息 |
|-------|----------|-----------|
| 网关状态 | `~/.hermes/gateway_state.json` | `gateway_state: stopped`, `platforms: {}` |
| 运行日志 | `~/.hermes/logs/gateway.log` | 启动/停止时间、连接状态、消息处理记录 |
| 错误日志 | `~/.hermes/logs/gateway.error.log` | 异常信息和错误堆栈 |
| 进程状态 | `ps aux` / `hermes gateway status` | 实时进程信息和资源占用 |
| 配置信息 | `~/.hermes/config.yaml` | 服务配置和平台设置 |

**关键设计原则**：这些数据都是**机器可读**的（JSON、结构化日志），Agent 可以直接解析，而不需要人类去"读懂"后转述。

### 2. 分层排查逻辑：Agent 的系统性思维

Agent 展示了清晰的**分层排查思路**：

```
Layer 1: 基础状态检查
  └─ 检查是否有后台进程在运行
  └─ 发现：没有活跃的 Slack 进程

Layer 2: 配置和元数据检查
  └─ 读取 gateway_state.json
  └─ 发现：gateway_state = "stopped"

Layer 3: 运行时日志分析
  └─ 读取 gateway.log
  └─ 发现：13:37:58 网关停止，13:32:51 最后一条消息

Layer 4: 问题定位与修复
  └─ 确认服务需要重新启动
  └─ 执行 hermes gateway run --replace

Layer 5: 修复验证
  └─ 检查进程 PID
  └─ 确认日志显示 "Slack 已连接"
```

这种分层排查的逻辑，让 Agent 能够像 SRE 一样系统性地定位问题，而不是盲目猜测。

### 3. 自主验证闭环：Agent 能独立确认结果

Agent 不只是执行命令，还能**独立验证操作结果**：

- **执行前验证**：检查当前状态（进程、网关状态）
- **执行后验证**：
  - 用 `ps aux` 确认进程在运行（PID 94451）
  - 用 `tail` 读取最新日志确认 "Slack 已连接"

这种"执行-验证"的闭环，让 Agent 不需要人类去检查"修复是否成功"。

---

## Agent-Ready 系统的设计原则

基于这个案例和 OpenAI Harness Engineering 的观点，我总结出以下设计原则：

### 原则 1：可观测性优先（Observability-First）

**核心理念**：Agent 必须能直接"阅读"系统的状态。

| 传统设计 | Agent-Ready 设计 |
|---------|-----------------|
| 人类查看 UI 然后告诉 Agent | UI/状态文件直接可被 Agent 读取（JSON、API） |
| 人类运行命令后口述结果 | Agent 能直接执行命令并解析输出 |
| 非结构化文本日志 | 结构化日志（JSON）便于 Agent 解析 |
| 分散的监控面板 | 统一的状态文件和指标端点 |

**实践建议**：
- 将关键状态写入结构化文件（JSON/YAML）
- 使用结构化日志格式
- 提供 CLI/API 让 Agent 能查询实时状态

### 原则 2：决策可解释（Explainable Decisions）

**核心理念**：Agent 应该能够解释它为什么做出某个决定。

在这个案例中，当用户问"你是如何查问题的"，Agent 能够清晰地描述它的排查思路：

1. 先确认基础状态
2. 检查网关状态文件
3. 确认进程存在
4. 看日志找原因

这种可解释性不仅让结果可信，也便于人类在必要时介入或调整。

### 原则 3：安全自主（Safe Autonomy）

**核心理念**：Agent 应该能够安全地"尝试-验证-重试"。

在这个案例中：
- **幂等操作**：`hermes gateway run --replace` 可以安全地重复执行
- **只读优先**：先通过只读操作（读取文件、检查状态）定位问题
- **渐进式修复**：从影响最小的修复方案开始（重启服务）

### 原则 4：人类注意力保护（Human Attention Protection）

**核心理念**：Agent 应该减少"不必要的人工 QA"。

从案例中可以看到，Agent 能够独立完成：
- ✅ 自主发现问题（网关停止）
- ✅ 自主定位根因（查看日志确认停止时间）
- ✅ 自主执行修复（重启网关）
- ✅ 自主验证结果（确认进程和连接状态）

唯一需要人类介入的点是：**最终确认问题是否解决**（发送测试消息）。

**反模式**：每一步都让 Agent 问"我应该查看日志吗？""我发现网关停止了，应该重启吗？"——这是对人类注意力的浪费。

---

## 设计检查清单

在设计 Agent-Ready 系统时，问自己这些问题：

### 可观测性检查
- [ ] 系统的关键状态是否存储在机器可读的文件中？
- [ ] Agent 能否直接查询服务状态，而不需要人类转述？
- [ ] 日志是否采用结构化格式，便于 Agent 解析？
- [ ] 是否有明确的错误状态码和错误信息？

### 可操作性检查
- [ ] Agent 能否直接执行修复操作（通过 CLI/API）？
- [ ] 修复操作是否幂等，可以安全地重复执行？
- [ ] 操作后是否有明确的成功/失败信号？
- [ ] Agent 能否独立验证操作结果？

### 安全性检查
- [ ] Agent 能否在只读模式下完成大部分诊断？
- [ ] 破坏性操作是否有足够的确认机制？
- [ ] 是否有回滚机制应对错误操作？

---

## 结语

OpenAI 的 Harness Engineering 理念提醒我们：**AI Agent 的能力上限，取决于系统设计的可观测性**。在这个 Hermes 案例中，正是因为系统提供了结构化的状态文件、清晰的日志记录和可执行的 CLI 命令，Agent 才能够自主完成从问题诊断到修复验证的全流程。

未来，当我们设计系统时，不仅要考虑"人类如何使用"，更要考虑"Agent 如何使用"。因为随着 AI 能力的提升，**Agent 将成为系统最主要的用户之一**。

---

**参考阅读**：
- [OpenAI: Harness Engineering](https://openai.com/zh-Hans-CN/index/harness-engineering/)
- [Google SRE Book: Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)
