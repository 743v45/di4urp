+++
date = '2026-06-12T02:00:00+08:00'
draft = false
title = 'Claude Code Cron 常见误用与反模式'
description = '12 个 Cron 设计中容易踩的坑——工具错配、成本失控、状态幻觉、反馈循环、凭证泄漏，每个附带正确写法和诊断方法'
tags = ['Claude Code', 'Cron', '反模式', '定时任务', '架构设计']
categories = ['AI 工具']
+++

## 这篇文章解决什么问题

如果你读过 [Cron 设计原则](/posts/cron-design-principles/)，知道了怎么正确设计一个 Cron 任务，这篇是它的反面——**什么不该做**。

每个反模式都是真实会犯的错误。不是理论推演，是你写了第一个 Cron 之后大概率会踩的坑。

---

## 反模式 1：用 Cron 模拟实时监控

### 错误写法

```
*/1 * * * * "检查服务器是否还活着"
```

### 为什么错

Cron 最小粒度 1 分钟，加上 Jitter 可能晚 6 秒，加上 REPL 空闲等待可能更久。你得到的不是实时监控，是"最近 1-2 分钟的快照"。

如果你的服务每秒 1000 个请求，1 分钟盲区 = 60000 个请求可能已经失败了。

**根本原因**：实时监控是 Prometheus/Grafana/Datadog 的事。Cron 最多做**事后巡检**。

### 正确写法

```
✅ */30 * * * * "检查最近 30 分钟的 error rate，
   如果超过阈值写入 ~/cron-state/alerts/error-spike.md"
```

承认自己不是实时的，改成"定期审计"。

### 诊断方法

> 你的 Cron 里有没有"如果 X 就立即 Y"的逻辑？如果有，"立即"这个词就是信号——你需要的不是 Cron。

---

## 反模式 2：把通用知识写进 prompt 而不是 Skill

### 错误写法

```
Cron prompt (500 字):
"你现在是一个高级 DevOps 工程师，擅长 Kubernetes 和 AWS。
 你的任务是检查集群健康状态。
 首先运行 kubectl get pods --all-namespaces。
 然后分析哪些 pod 不是 Running 状态。
 对于 CrashLoopBackOff 的 pod，检查日志。
 对于 ImagePullBackOff 的 pod，检查镜像版本。
 ..."
```

### 为什么错

每次触发都把 500 字的 prompt 完整发送。如果 90% 是"怎么做事"的通用知识，这部分应该放到 Skill 里。

Skill 在上下文压缩后持久存在（每个 5000 token 免费额度）。Cron prompt 每次按原价算钱。

**算账**：

```
500 字 prompt ≈ 800 token
每天触发 48 次（每 30 分钟）
月成本差异（Sonnet）：
  写在 prompt 里：800 × 48 × 30 × $3/M = $3.5/月
  写在 Skill 里：0（压缩后免费注入）
```

### 正确写法

```
✅ 创建 Skill: ~/.claude/skills/k8s-watchdog/SKILL.md
   （完整操作指南、判断逻辑、修复策略）

✅ Cron prompt（1 句话）：
   "调用 /k8s-watchdog 检查集群健康状态"
```

### 诊断方法

> 你的 Cron prompt 超过 3 行？把"怎么做"的部分抽到 Skill 里，prompt 只留"做什么"。

---

## 反模式 3：无短路逻辑——第一步失败还在继续

### 错误写法

```
"检查 CI → 跑测试 → 部署 → 通知"
```

如果 CI 挂了，AI 还会继续"跑测试"和"部署"。每一步都消耗 token，而且第一步已经失败了，后面全是浪费。

### 正确写法

```
✅ "步骤 1：检查 CI 状态。如果失败，写入日志并停止，不执行后续步骤。
   步骤 2：跑测试。如果失败，写入日志并停止。
   步骤 3：部署。只在前面都通过时执行。
   步骤 4：通知。将整体结果写入 ~/cron-state/deploy-log.md"
```

**关键句式**：每步后面跟 **"如果失败，停止，不执行后续步骤"**。

### 诊断方法

> 你的 prompt 里有没有"先 A 再 B 再 C"的顺序结构？如果 A 失败了 B 还有意义吗？如果没意义，就需要短路。

---

## 反模式 4：把状态留在对话里

### 错误写法

```
Cron prompt: "记住上次的检查结果，和这次对比"
```

### 为什么错

每次 Cron 触发是**全新会话**。没有"上次"。但很多人下意识觉得 Cron 是同一个进程在循环运行。

更隐蔽的版本：

```
❌ "按照我们讨论的方案执行"
   → 哪次讨论？哪个方案？新 Agent 不知道

❌ "继续之前未完成的修复"
   → 之前的什么修复？在哪个文件？改了什么？
```

### 正确写法

```
✅ "读取 ~/cron-state/last-check-result.md 获取上次结果。
   和当前结果对比。
   更新 last-check-result.md。"
```

**Cron 任务 = 无状态函数**。所有状态必须外置到文件。

### 诊断方法

> 你的 prompt 里有没有"上次"、"之前"、"继续"这些词？如果有，你需要一个状态文件来承载这些信息。

---

## 反模式 5：忽略冷启动的固定成本

### 问题

每次 Cron 触发，Claude 在干活之前先加载：

```
系统 prompt       ≈ 2K token
CLAUDE.md         ≈ 1K token
MEMORY.md 前 200 行 ≈ 2K token
Skill 描述列表    ≈ 1K token
MCP 工具定义      ≈ 1K token
──────────────────────────
固定成本          ≈ 7K token（还没开始干活）
```

如果大部分触发都是"无变化直接返回"，**87% 的 token 花在了加载上下文上**。

### 影响

| 场景 | 固定成本 | 工作成本 | 浪费比例 |
|------|---------|---------|---------|
| "无变化，返回" | 7K | 1K | **87%** |
| 简单状态检查 | 7K | 3K | 70% |
| 复杂分析 | 7K | 50K | 12% |

### 解法

```
方案 1：降频率
  不需要每 5 分钟检查，30 分钟够用

方案 2：用 --bare 模式
  跳过 CLAUDE.md/Memory/Skill 加载
  固定成本降到 ~2K token
  但你失去了 CLAUDE.md 的指令

方案 3：接受固定成本，提高单次价值
  确保每次触发都产出有意义的结果
```

### 诊断方法

> 算一下：你的 Cron 每月触发多少次？每次平均消耗多少 token？如果 × 0.87（浪费比例），被浪费的 token 对应多少钱？

---

## 反模式 6：两个 Cron 任务互相触发形成反馈循环

### 错误写法

```
Cron A: "分析 bug，创建 GitHub Issue"
Cron B: "有新 Issue 就自动修复"
```

### 为什么错

```
Cron A 产生幻觉 → 创建了一个不存在 bug 的 Issue
Cron B 读到 Issue → 认真修了一个不存在的 bug
→ 你得到了一个真实的新 bug
```

更严重的情况：

```
Cron B 修复 Issue → 修复引入新 bug
Cron A 检测到新 bug → 创建新 Issue
Cron B 修新 Issue → 又引入新 bug
→ 无限循环
```

这叫**幻觉级联**——上游错误被下游当成真实输入。

### 正确写法

```
✅ 方案 1：标记来源
  Cron A 创建 Issue 时打标签 "source: auto-analysis"
  Cron B 只处理 "source: human" 的 Issue
  → 打断循环

✅ 方案 2：日配额
  "本次运行最多处理 3 个 Issue。
   超过 3 个写入 backlog，不处理。"

✅ 方案 3：冷却期
  "只处理创建时间超过 1 小时的 Issue。
   1 小时内的 Issue 可能还在编辑中，跳过。"
```

### 诊断方法

> 你有多个 Cron 任务操作同一个外部系统（GitHub、Slack、数据库）吗？如果有，画一张依赖图。图里有环吗？有环就需要打断。

---

## 反模式 7：在 prompt 里硬编码凭证

### 错误写法

```
Cron prompt: "使用 API_KEY=sk-xxxxx 调用 xxx 接口"
```

### 为什么错

`durable: true` 写入 `scheduled_tasks.json`，是**明文 JSON**。任何能读 `~/.claude/` 的人都能看到你的 API Key。

如果 `~/.claude/` 被同步到 iCloud/dotfiles/GitHub，凭证就泄露了。

### 正确写法

```
✅ 方案 1：凭证放在 settings.json 的 env 里
  settings.json → env.MY_API_KEY
  Cron prompt → "使用 $MY_API_KEY"（shell 变量引用）

✅ 方案 2：凭证放在 .env 文件
  Cron prompt → "先 source ~/.env 加载凭证"

✅ 方案 3：绝不在 prompt 里出现任何密钥
```

### 诊断方法

> `grep -r "sk-\|key-\|token-\|password" ~/.claude/scheduled_tasks.json`。如果有输出，立刻轮换那些凭证。

---

## 反模式 8：Token 预算失控——一次触发跑飞了

### 错误写法

```
Cron prompt: "检查所有文件的安全问题"
```

### 为什么错

```
→ 读了 200 个文件，每个 1K token = 200K input
→ 发现 50 个问题，逐一分析 = 100K token
→ 总共 300K token，一次触发花了 $5（Opus）
```

没有预算约束，AI 会尽力把所有事做完，不管成本。

### 正确写法

```
✅ "只检查最近 24 小时内修改的文件。
   本次执行 token 预算不超过 50K。
   如果接近上限还没处理完，将剩余项写入 backlog。"
```

或用 `--max-turns` 限制（仅 `--print` 模式）：

```bash
claude -p --max-turns 10 "检查安全问题"
```

### 诊断方法

> 跑了 `/cost` 看了一次触发的消耗吗？如果单次超过 50K token，你需要加范围限制。

---

## 反模式 9：Cron 任务之间有隐式依赖

### 错误写法

```
Cron A (每天 18:00): "分析 bug，写入 ~/bugs/today.md"
Cron B (每天 18:00): "读取 ~/bugs/today.md，修复 bug"
```

两个都在 18:00 触发。A 还没写完，B 就开始读了。B 读到空文件或不完整文件。

### 正确写法

```
✅ 方案 1：错开时间（最简单）
  Cron A: 0 18 * * *
  Cron B: 30 18 * * *（晚 30 分钟）

✅ 方案 2：用状态文件做信号
  A 完成后写入 ~/cron-state/bugs-ready.flag
  B 先检查 flag 是否存在，不存在就跳过

✅ 方案 3：合并成一个 Cron（通常最好）
  "分析 bug 并修复"（一步到位，不要拆两步）
```

方案 3 通常最好——**能合并就合并，拆得越碎，依赖管理越复杂**。

### 诊断方法

> 你有多个 Cron 任务读写同一个文件吗？如果有，它们的时间会重叠吗？重叠就有冲突风险。

---

## 反模式 10：万物皆可重试

### 错误写法

```
"如果失败，记录并下次重试"
```

### 为什么错

有些失败是**永久性的**，重试不会改变结果：

| 失败类型 | 可重试？ | 原因 |
|---------|---------|------|
| 网络超时 | 是 | 下次可能恢复 |
| API 限速 | 是 | 一段时间后重置 |
| 文件不存在 | **否** | 文件可能被删了 |
| 权限不足 | **否** | 需要人工修权限 |
| 语法错误 | **否** | prompt 或代码有 bug |
| 依赖版本冲突 | **否** | 需要人工解决 |

对永久性错误重试 = 浪费 token + 可能恶化问题（比如反复尝试写一个不存在的目录）。

### 正确写法

```
✅ "失败时判断类型：
 - 临时性错误（超时、限速）→ 写入 ~/cron-state/retry-queue.md
 - 永久性错误（权限、文件不存在）→ 写入 ~/cron-state/escalation/，不重试
 - 不确定 → 默认当作永久性错误处理"
```

**核心原则**：不确定时默认不重试。重试是特权，需要明确授权。

### 诊断方法

> 你的 Cron prompt 里只有"失败则重试"，没有区分错误类型？加上区分逻辑。

---

## 反模式 11：Prompt Drift——同一段话跑出不同的结果

### 问题

同一个 Cron prompt，今天跑和一周后跑，AI 的行为可能不同：

```
Day 1: "分析 bug，输出 JSON"
→ {"bugs": [...], "severity": "high"}  ✓ 纯 JSON

Day 7: 同样 prompt
→ "分析结果如下：\n```json\n{...}\n```\n以上是分析"
→ 不是纯 JSON，解析失败 ✗
```

原因：模型版本更新、对话上下文不同、随机性（temperature > 0）。

### 正确写法

```
✅ 方案 1：prompt 里加强约束
  "输出必须是纯 JSON，不要包含任何其他文字。
   不要用 markdown 代码块包裹。直接输出 JSON 对象。"

✅ 方案 2：结果自检
  "输出后，验证你的输出是否是有效 JSON。
   如果不是，修正后重新输出。"

✅ 方案 3：--json-schema（仅 --print 模式）
  claude -p --json-schema '{...}' "分析 bug"
  → 强制结构化输出，Schema 级别验证
```

### 诊断方法

> 你的 Cron 结果是给机器读的（JSON/CSV）还是给人读的（Markdown）？给机器读的必须加约束。给 AI 的"自由度"应该和下游消费者的"宽容度"匹配。

---

## 反模式 12：把 Cron 当长期后台服务

### 错误写法

```
CronCreate({
  cron: "0 */1 * * *",    // 每小时
  recurring: true,
  durable: true
})
// 期望它"永远"运行
```

### 为什么错

Recurring 任务 **7 天后自动过期**。这不是 bug，是设计——Cron 不适合做永久后台服务。

### 你真正需要的是什么

| 需求 | 正确工具 |
|------|---------|
| 跑 1-7 天的定时任务 | `CronCreate` + `durable: true` |
| 跑一次就完了 | `--bg` 或 `ScheduleWakeup` |
| 永久定时任务 | 系统 crontab + `claude -p` |
| 持续运行的 Agent | `claude agents` + 守护进程 |

系统 crontab + `claude -p` 的写法：

```bash
# 编辑 crontab
crontab -e

# 每小时跑一次，不受 7 天限制
0 * * * * cd /my/project && claude -p --bare "check CI status" >> /tmp/cron.log 2>&1
```

### 诊断方法

> 你的 Cron 任务需要运行超过 7 天吗？如果是，它不属于 Claude Code 的 Cron 系统。

---

## 速查表：怎么判断你的 Cron 有没有踩坑

| 检查项 | 如果"是" → 可能踩了 |
|--------|-------------------|
| prompt 超过 3 行？ | 反模式 2（知识该放 Skill） |
| 有"如果失败继续下一步"？ | 反模式 3（缺短路逻辑） |
| 有"上次"、"之前"、"继续"？ | 反模式 4（状态幻觉） |
| 每次触发 80% 是"无变化"？ | 反模式 5（冷启动浪费） |
| 两个 Cron 操作同一个系统？ | 反模式 6（反馈循环） |
| prompt 里有密钥/token？ | 反模式 7（凭证泄漏） |
| prompt 说"检查所有"？ | 反模式 8（预算失控） |
| 两个 Cron 跑同一时间？ | 反模式 9（隐式依赖） |
| 所有错误都重试？ | 反模式 10（盲目重试） |
| 输出格式不固定？ | 反模式 11（Prompt Drift） |
| 需要跑超过 7 天？ | 反模式 12（工具错配） |

---

## 系列文章

- [Claude Code /loop 新手使用手册](/posts/claude-code-loop-guide/) — 操作层：语法、间隔、两种模式
- [Claude Code Cron 设计原则](/posts/cron-design-principles/) — 设计层：运行时行为、架构模式、CTO 检查清单
- **本文** — 反面教材：12 个常见误用和正确写法

---

## 数据来源与推荐阅读

- [Claude Code CLI 参考](https://code.claude.com/docs/en/cli-reference) — CronCreate/ScheduleWakeup 参数
- [Claude Code 技能系统](https://code.claude.com/docs/en/skills) — Skill 替代长 prompt 的方案
- [Claude Code Prompt 缓存](https://code.claude.com/docs/en/prompt-caching) — 理解冷启动成本
- [Claude Code 无头模式](https://code.claude.com/docs/en/headless) — 系统 crontab 集成方案
- [Claude Code 环境变量](https://code.claude.com/docs/en/env-vars) — 凭证管理的正确方式
