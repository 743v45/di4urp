+++
date = '2026-06-12T01:00:00+08:00'
draft = false
title = 'Claude Code Cron 设计原则：CTO 视角下的定时任务架构'
description = '从进阶到最高阶的 Cron 设计方法论——Jitter 机制、Cache TTL 成本模型、幂等性、自愈循环、级联调度、可观测性，以及 CTO 级别的决策框架'
tags = ['Claude Code', 'Cron', '定时任务', '架构设计', 'Agent']
categories = ['AI 工具']
+++

## 这篇文章写给谁

如果你已经读过 [Claude Code /loop 新手使用手册](/posts/claude-code-loop-guide/)，知道了 CronCreate 怎么用，那篇是操作层。

这篇是**设计层**。回答的问题是：当你决定"让 AI 定时做一件事"的时候，怎么设计这件事，才能不烧钱、不翻车、可维护。

视角从"怎么用"拉到"怎么想"。

---

## 一、运行时行为：你以为的 vs 实际发生的

### 1.1 Jitter——你的任务不会准点触发

CronCreate 的文档里有一句容易被忽略的话：

> recurring tasks fire up to 10% of their period late (max 15 min)

这不是 bug。这是**反惊群设计**（thundering herd prevention）。

想象 1000 个 Claude Code 用户都设了 `0 9 * * *`（每天 9 点）。如果精确到秒触发，Anthropic API 瞬间收到 1000 个并发请求。Jitter 把压力分散到一个时间窗口内。

**实际影响**：

| 你设的 | 你以为的 | 实际的 |
|--------|---------|--------|
| `*/5 * * * *` | 每 5 分钟整点 | 可能在 :00 到 :30 之间任意时刻 |
| `0 9 * * *` | 9:00:00 | 可能在 9:00:00 到 9:01:30 之间 |
| `*/30 * * * *` | 每半小时 | 可能在 :00 到 :03 之间 |

**设计原则**：不要依赖精确触发时间做时间敏感的逻辑。如果你的需求是"恰好 X 秒后执行一件事"，用 `ScheduleWakeup`（60-3600 秒范围），不要用 Cron。

### 1.2 REPL 空闲检测——触发的前提条件

> Jobs only fire while the REPL is idle (not mid-query)

这意味着：

- 你在打字或 Claude 正在回复时，**任务会推迟到下一个空闲时刻**
- 推迟不是跳过——一旦空闲就立即触发
- 但如果连续对话占满了整个 cron 周期，你可能"丢失"一个触发周期

**设计原则**：Cron 任务应该是**幂等的**——同一任务触发两次不应产生不同结果。因为你无法保证精确的触发次数。

### 1.3 7 天过期——特性，不是限制

Recurring 任务 7 天后自动过期，触发最后一次然后删除。

这意味着你不能用它做"永久"的后台服务——那是 daemon 的职责。它适合**有时间边界的工作**：一个 sprint、一次迁移、一段监控期。

如果需要长期运行，用操作系统的 crontab 调度 `claude -p "task"`：

```bash
# 系统 crontab（不受 7 天限制）
*/30 * * * * cd /my/project && claude -p --bare "check CI status" >> /tmp/cron.log 2>&1
```

### 1.4 durable: true 的真实代价

`durable: true` 写入 `~/.claude/scheduled_tasks.json`，重启后自动恢复。

但恢复时运行在**一个全新的会话上下文**中。不会恢复你之前的对话历史。这意味着：

- durable 任务里的 prompt 必须**自包含**
- CLAUDE.md 和 Memory 会正常加载（启动时注入的）
- 对话级别的状态全部丢失

**反模式**：

```
❌ "继续之前的工作"         ← 新会话没有"之前"
❌ "检查我刚才让你改的文件"   ← "刚才"不存在
❌ "看看上面的分析"          ← 没有上面的内容
```

**正确做法**：

```
✅ "读取 ~/cron-state/task.md 获取当前任务状态，然后执行下一步。
    执行后更新该文件。"
```

---

## 二、成本模型：每次触发都是一笔独立的账

### 2.1 Cache TTL 对 Cron 的经济影响

Anthropic 的 prompt cache 有 5 分钟 TTL（API Key 用户），Claude 订阅用户默认 1 小时。

如果你的 Cron 间隔小于 TTL：

```
第 0 分钟：触发 → cache 命中（快 + 便宜）
第 3 分钟：触发 → cache 命中
第 6 分钟：触发 → cache 过期，冷启动（慢 + 贵）
```

如果间隔大于 TTL，**每次触发都是冷启动**。每次都是"首次对话"级别的 token 消耗。

### 2.2 成本公式

```
月成本 = 触发次数/天 × 天数 × 平均 token/次 × 单价
```

算一道题：

```
频率：*/10 * * * *（每 10 分钟）= 144 次/天
每次消耗：5K input + 2K output token（保守估计）
模型：Opus（$15/M input, $75/M output）

日成本 = 144 × (5000 × 0.015 + 2000 × 0.075) / 1,000,000
       = 144 × $0.000225
       = $0.032/天 ≈ $1/月
```

**但是**——如果 prompt 里让 Claude 读文件、跑命令，实际 token 消耗可能是估算的 5-10 倍。一次"检查 CI 状态"可能需要读 3 个文件、解析日志，轻松 30K+ token。

**实际案例**：

| 场景 | 频率 | 单次 token | 月成本（Sonnet） | 月成本（Opus） |
|------|------|-----------|----------------|---------------|
| 快速状态检查 | */30 | ~3K | ~$0.5 | ~$3 |
| 代码审查 | */60 | ~30K | ~$15 | ~$90 |
| 完整部署检查 | */120 | ~50K | ~$25 | ~$150 |

### 2.3 省 token 的 Cron 设计技巧

在 prompt 里加前置检查：

```
"先快速判断是否需要执行完整流程。
 如果 git log --oneline -1 与上次相同，直接返回'无变化'。
 否则执行完整审查。"
```

这条规则能让 90% 的触发在 1K token 内完成。

---

## 三、五种架构模式

### 模式 1：轮询器（Poller）

```
Cron 定期触发 → 检查外部状态 → 有变化则执行
```

**适用场景**：监控 PR 状态、CI 结果、文件变更

```
"检查 git log --oneline -5 是否有新的 commit。
 如果有，对最新 commit 运行代码审查。
 如果没有，直接返回'无变化'。"
```

**设计要点**：
- prompt 必须包含"检查"和"条件执行"两个步骤
- 无变化时应该快速返回，不消耗大量 token
- 上次检查的状态写入文件，下次对比用

### 模式 2：定时管道（Scheduled Pipeline）

```
Cron 触发 → 启动 Agent Teams → 并行执行多步骤任务
```

**适用场景**：每日代码审查、定期安全扫描、批量数据处理

```
"每日代码审查启动。扫描今天所有变更文件，
 为每个文件分配一个 Agent 进行安全审查，
 汇总审查结果写入 ~/daily-review/YYYY-MM-DD.md"
```

**设计要点**：
- Cron 只是**触发器**，实际工作由 Agent Teams 完成
- prompt 里必须明确"输出到哪里"——每次是新会话
- 结果持久化到文件系统，不留在对话里

### 模式 3：自愈循环（Self-Healing Loop）

```
Cron 触发 → 检查健康 → 发现异常 → 自动修复 → 记录
```

**适用场景**：构建看门狗、部署健康检查、服务可用性监控

```
"检查 npm run build 是否通过。
 如果失败，读取错误信息，分析根因，尝试修复，再次构建。
 最多尝试 3 次。
 无论成功失败，将结果追加写入 ~/build-health.log"
```

**设计要点**：
- 必须设**重试上限**——否则可能无限循环
- 结果必须**追加写入**文件，不覆盖之前记录
- 每次修复尝试是独立思路，不依赖上一轮的"我刚才试了什么"

### 模式 4：级联调度（Cascading Schedule）

```
步骤 A 完成 → ScheduleWakeup 等待 → 步骤 B → ScheduleWakeup → 步骤 C
```

**适用场景**：部署流水线、多阶段验证、灰度发布

```
步骤 1 CronCreate:
  "部署 staging 环境。部署成功后，
   调用 ScheduleWakeup 等待 300 秒，
   触发 prompt：'运行 staging 的 smoke test'"

步骤 2（由步骤 1 触发）:
  "运行 smoke test。通过后，
   调用 ScheduleWakeup 等待 60 秒，
   触发 prompt：'检查 metrics 是否正常'"

步骤 3（由步骤 2 触发）:
  "检查 metrics。正常则写入 ~/deploy-success.md，
   异常则写入 ~/deploy-rollback-needed.md"
```

**设计要点**：
- `ScheduleWakeup` 范围 60-3600 秒，适合短间隔级联
- 每一步完成后在 prompt 里明确写"下一步做什么"
- 状态持久化到文件——任何一步失败都能从断点恢复

### 模式 5：看门狗（Watchdog）

```
Cron 定期检查 → 超时未完成 → 告警或补救
```

**适用场景**：部署卡住检测、长任务超时、lock 文件清理

```
"检查 ~/deploy-lock 文件是否存在且修改时间超过 30 分钟。
 如果是，说明部署卡住了：
   1. 读取 lock 文件内容获取部署信息
   2. 写入 ~/escalation/deploy-stuck-$(date).md
   3. 尝试清理 lock 文件
 如果 lock 文件不存在或不超过 30 分钟，直接返回正常。"
```

---

## 四、六条设计原则（CTO 检查清单）

### 原则 1：幂等性是硬性要求

同一 prompt 触发 N 次，结果必须等价。

**反模式**：

```
❌ "删除所有过期的临时文件"
   ← 如果触发两次，第二次可能删掉刚创建的文件
```

**正确**：

```
✅ "检查 ~/tmp/ 下修改时间超过 7 天的文件，先列出来，
    确认后再删除"
   ← 先列出再确认，多次触发结果一致
```

**检查清单**：
- 同一 prompt 触发 N 次，副作用是否可接受？
- 是否有写操作需要去重？
- 失败后重试是否安全？

### 原则 2：状态外置，无状态执行

Cron 任务 = 无状态微服务。所有状态持久化到外部存储。

```
Cron 任务启动
  → 从文件读取状态
  → 执行逻辑
  → 将新状态写回文件
  → 返回结果
```

**状态文件设计**：

```
~/cron-state/
├── ci-watchdog-lastrun.md       ← 上次运行时间
├── ci-watchdog-log.md           ← 执行日志
├── ci-escalation/               ← 升级告警
│   └── 2026-06-12-build-fail.md
└── deploy-pipeline-state.md     ← 级联调度状态
```

### 原则 3：有限重试，人类兜底

```
自动修复 → 3 次失败 → 停止 → 写入告警 → 等待人类
```

**退路设计矩阵**：

| 场景 | 退路 |
|------|------|
| 自动修复 N 次失败 | 写入告警文件，停止重试 |
| 检测到危险操作 | 跳过，写入日志等待人工 |
| 外部服务不可用 | 记录失败，下次触发重试 |
| 成功但需确认 | 写入待确认文件，等待人工 |

在 prompt 里明确写上限：

```
"最多尝试修复 3 次。超过 3 次写入 ~/escalation/ 目录，停止。
 不要尝试超过 3 次。这一点非常重要。"
```

### 原则 4：可观测性——能看到 Cron 在干什么

每次 Cron 触发都会产生会话记录（`.jsonl` 文件）：

```bash
# 查看所有活跃后台会话
claude agents --all

# 查看特定会话的输出
claude logs <session-id>
```

**更好的做法**——在 prompt 里加日志输出：

```
"执行完成后，将以下信息追加写入 ~/cron-log.md：
 [日期] [耗时] [成功/失败] [摘要] [token 消耗]
 如果失败，附上错误信息和已尝试的修复步骤。"
```

日志格式示例：

```
| 2026-06-12 09:30 | 45s | 成功 | 发现 2 个新 commit，已审查 | ~8K token |
| 2026-06-12 10:00 | 12s | 跳过 | 无新 commit | ~1K token |
| 2026-06-12 10:30 | 2m  | 失败 | 审查超时，已写入 escalation | ~15K token |
```

### 原则 5：频率选择不是越高越好

**决策树**：

```
你需要什么？
├── "过一会再检查" → ScheduleWakeup（60-3600 秒）
├── "定期轮询" → CronCreate
│   ├── 每 5 分钟 → 你确定需要这么频繁吗？先试 30 分钟
│   ├── 每 30 分钟 → 合理的监控频率
│   ├── 每小时 → 日常检查的甜点区
│   └── 每天一次 → 报告类任务的频率
├── "跑一次就完了" → --bg（后台 Agent）
└── "永远在后台跑" → 系统 crontab + claude -p
```

**频率 vs 成本 vs 价值的三角**：

```
        高价值
         /\
        /  \
       /    \
      / 合理  \
     /  区间   \
    /          \
   /____________\
  低成本        高成本
```

合理区间：成本可控，价值足够。超过这个区间，要么降频率省成本，要么加频率追价值。

### 原则 6：模型选择——Sonnet 跑 Cron，Opus 跑主对话

Cron 任务大多不需要 Opus 级推理。在 prompt 开头指定：

```json
{
  "model": "sonnet"
}
```

或通过环境变量：

```
CLAUDE_CODE_SUBAGENT_MODEL=haiku
```

Haiku 跑"检查有无变化"这种轻量任务绰绰有余，成本只有 Opus 的 1/10。

---

## 五、完整设计模板

把上面所有原则整合成一个可直接使用的模板：

### CI 看门狗模板

```json
{
  "cron": "*/30 * * * *",
  "prompt": "你是 CI 看门狗。执行以下步骤：\n\n1. 读取 ~/cron-state/ci-watchdog-lastrun.md 获取上次运行时间\n2. 运行 gh run list --limit 5 检查最近的 GitHub Actions 运行\n3. 如果有失败的运行：\n   a. 读取失败日志：gh run view <id> --log-failed\n   b. 分析根因\n   c. 如果是已知问题（依赖安装失败、超时），尝试修复\n   d. 如果是未知问题，写入 ~/cron-state/escalation/ci-<date>.md\n4. 如果没有失败的运行，直接返回正常\n5. 更新 ci-watchdog-lastrun.md 为当前时间\n6. 将执行摘要追加写入 ~/cron-state/ci-watchdog-log.md\n\n格式：[日期] [耗时] [结果] [摘要]\n\n最多尝试修复 2 次。超过 2 次写入 escalation 停止。\n这一点非常重要，不要超过 2 次。",
  "recurring": true,
  "durable": true
}
```

这个模板体现了全部六条原则：

| 原则 | 体现 |
|------|------|
| 幂等性 | 先读上次状态，有据可查 |
| 状态外置 | lastrun.md 记录时间，日志文件记录历史 |
| 有限重试 | "最多 2 次"写了两遍（强化） |
| 人类兜底 | escalation 目录等待人工 |
| 可观测性 | 每次执行追加日志 |
| 成本控制 | 30 分钟间隔，无变化时快速返回 |

### 每日代码审查模板

```json
{
  "cron": "0 9 * * 1-5",
  "prompt": "每日代码审查启动。\n\n1. 读取 ~/cron-state/daily-review-lastrun.md 获取上次审查日期\n2. 运行 git log --oneline --since='<上次日期>' 找到所有新 commit\n3. 如果没有新 commit，直接返回'无变更'\n4. 如果有新 commit：\n   a. 列出所有变更文件\n   b. 对每个文件进行安全审查（重点关注：SQL 注入、XSS、凭证泄露）\n   c. 对每个文件进行质量审查（重点关注：死代码、性能问题、错误处理缺失）\n5. 将审查结果写入 ~/daily-review/YYYY-MM-DD.md\n6. 如果发现严重问题，额外写入 ~/cron-state/escalation/review-<date>.md\n7. 更新 lastrun 文件\n\n审查标准参考 ~/cron-state/review-checklist.md",
  "recurring": true,
  "durable": true
}
```

注意 `0 9 * * 1-5` —— 只在工作日 9 点触发。

---

## 六、工具选择决策矩阵

| 需求 | 正确工具 | 错误选择 | 理由 |
|------|---------|---------|------|
| 下班后检查部署 | `CronCreate` + `durable` | `/loop` | 需要跨会话存活 |
| 每天早上代码审查 | 系统 crontab + `claude -p` | CronCreate | 超过 7 天，需要长期运行 |
| 每 30 分钟轮询 PR | `/loop 30m` | CronCreate | 会话级，关了就停 |
| 等 CI 跑完再继续 | `ScheduleWakeup` | CronCreate | 60-3600 秒短回调 |
| 后台跑完告诉我 | `--bg` + `claude logs` | CronCreate | 一次性任务不需要定时 |
| 永远在后台监控 | 系统 crontab | CronCreate | 7 天限制 |

---

## 七、状态文件管理最佳实践

### 目录结构

```
~/cron-state/
├── README.md                    ← 说明每个文件的用途
├── ci-watchdog-lastrun.md       ← 上次运行时间戳
├── ci-watchdog-log.md           ← 执行日志（追加写入）
├── daily-review-lastrun.md
├── daily-review-log.md
├── review-checklist.md          ← 审查标准（参考文档）
├── escalation/                  ← 需要人工介入的问题
│   ├── ci-2026-06-12.md
│   └── review-2026-06-11.md
└── deploy-pipeline-state.md     ← 级联调度当前状态
```

### lastrun 文件格式

```markdown
# CI Watchdog Last Run

- last_run: 2026-06-12T09:30:00+08:00
- last_status: success
- last_commit: abc1234
```

### log 文件格式

```markdown
# CI Watchdog Log

| 日期 | 耗时 | 结果 | 摘要 |
|------|------|------|------|
| 2026-06-12 09:30 | 45s | 成功 | 2 个新 commit，已审查 |
| 2026-06-12 10:00 | 12s | 跳过 | 无新 commit |
| 2026-06-12 10:30 | 2m | 失败 | 审查超时，escalated |
```

### 为什么用 Markdown 而不是 JSON

- Claude 可以直接用 Edit 工具追加写入 Markdown 表格
- JSON 需要解析 → 修改 → 序列化，多一步出错的可能
- Markdown 人类可直接阅读，方便手动检查状态
- MEMORY.md 本身就是 Markdown 生态的一部分

---

## 八、CTO 的终极检查清单

在批准一个 Cron 任务上线之前，过一遍这个清单：

### 成本

- [ ] 计算了月度 token 消耗估算？
- [ ] 选择了合适的模型（Sonnet/Haiku 而非 Opus）？
- [ ] 频率是否有优化空间（30 分钟够不够，非要 5 分钟吗）？
- [ ] 是否有"无变化快速返回"的前置检查？

### 可靠性

- [ ] 是否幂等（触发两次结果一致）？
- [ ] 是否有重试上限？
- [ ] 失败后是否有明确的退路（告警/升级/停止）？
- [ ] durable 任务是否自包含（不依赖对话上下文）？

### 可维护性

- [ ] 执行结果是否写入日志文件？
- [ ] 状态是否持久化到文件系统？
- [ ] 是否有 escalation 目录存放需要人工处理的问题？
- [ ] 7 天过期是否可接受？

### 安全

- [ ] prompt 中是否避免了敏感凭证？
- [ ] 是否限制了可执行的操作范围？
- [ ] 写入的文件路径是否在预期目录内？

---

## 数据来源与推荐阅读

- [Claude Code CronCreate 工具文档](https://code.claude.com/docs/en/cli-reference) — CLI 参考中的 Cron 相关部分
- [Claude Code ScheduleWakeup 工具文档](https://code.claude.com/docs/en/cli-reference) — 短期回调机制
- [Claude Code 环境变量参考](https://code.claude.com/docs/en/env-vars) — 缓存 TTL、模型选择等变量
- [Claude Code Prompt 缓存](https://code.claude.com/docs/en/prompt-caching) — 理解 Cache TTL 对 Cron 成本的影响
- [Claude Code 无头模式](https://code.claude.com/docs/en/headless) — `claude -p` 与系统 crontab 集成
- [Claude Code /loop 新手使用手册](/posts/claude-code-loop-guide/) — 入门操作层 companion
