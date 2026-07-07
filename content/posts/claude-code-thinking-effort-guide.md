+++
date = 2026-07-07T22:30:00+08:00
draft = false
title = '什么时候让 Claude 多想想：思考链、effort 与 adaptive reasoning 指南'
tags = ['Claude Code', 'Extended Thinking', 'Effort Level', 'Adaptive Reasoning', 'AI 工具']
categories = ['AI 工具']
description = '基于 Claude Code 与 Claude Platform 官方文档原文，完整梳理 extended thinking、effort level、adaptive reasoning 三者的关系，澄清 ultrathink 关键词的真相，并给出"什么时候开思考链"的决策表。'
+++

> **资料来源声明**：本文基于 Claude Code 官方文档 [Model configuration](https://code.claude.com/docs/en/model-config)、[Fast mode](https://code.claude.com/docs/en/fast-mode)、[Environment variables](https://code.claude.com/docs/en/env-vars)，以及 Claude Platform 文档 [Extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) 的原文整理。所有结论均可回溯到这些页面。

## 一个前提：思考链已经不是原来那套了

很多人对"Claude 思考链"的印象还停留在旧机制：在 prompt 里写 `think`、`think hard`、`think harder`、`ultrathink`，分别对应 4000 / 10000 / 31999 个 thinking token 的固定预算。

**这套机制在 Opus 4.7 及以上（含 Opus 4.8）和 Fable 5 上已经不适用了。**

官方原文说得很清楚：

> Opus 4.7 and later always use adaptive reasoning, as does Fable 5. The fixed thinking budget mode and `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` do not apply to them.

也就是说，在新一代模型上，**固定 token 预算那套旧思考模式不再适用**——Opus 4.7+ 和 Fable 5 始终走 adaptive reasoning，`CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` 对它们无效；思考多少的主控制权交给了 **effort level**。（注意：`MAX_THINKING_TOKENS=0` 在 Anthropic API 上**仍然能关闭思考**，原文明确"**except on Fable 5**"——所以真正"关不掉"的只有 Fable 5。）围绕它有三层相互独立又彼此关联的机制：**adaptive reasoning**（底层）、**effort level**（主控制）、**extended thinking 显示与开关**（呈现层）。

把它们分清楚，是回答"什么时候开思考链"的前提。

## 三个容易混淆的概念

| 概念 | 是什么 | 在哪一层 |
| --- | --- | --- |
| **Adaptive reasoning** | 模型在每一步**自行决定**要不要思考、思考多少 | 底层机制（Opus 4.7+ / Fable 5 强制开启） |
| **Effort level** | 你给模型的"思考强度档位" | 主控制（`low` → `max`） |
| **Extended thinking** | Claude 在回答前**发出**的那段推理输出 | 呈现层（开/关/折叠/显示） |

官方对 adaptive reasoning 的定义是：

> Adaptive reasoning, which lets the model decide whether and how much to think on each step based on task complexity. Lower effort is faster and cheaper for straightforward tasks, while higher effort provides deeper reasoning for complex problems.

关键点：在新模型上，**effort level 是控制"思考多少"的主要手段**，而 extended thinking 的那些开关只管"开不开、怎么显示"。

## effort level：思考强度的主控制

### 支持的模型与档位

| 模型 | 支持的级别 | 默认 |
| --- | --- | --- |
| Fable 5 | `low` / `medium` / `high` / `xhigh` / `max` | `high` |
| Opus 4.8 / Opus 4.7 | `low` / `medium` / `high` / `xhigh` / `max` | Opus 4.8 = `high`；Opus 4.7 = `xhigh` |
| Opus 4.6 / Sonnet 4.6 | `low` / `medium` / `high` / `max` | `high` |

注意 Opus 4.6 和 Sonnet 4.6 **没有 `xhigh`**。如果你设了一个模型不支持的级别，Claude Code 会回退到"不超过该级别的最高支持级别"——例如 `xhigh` 在 Opus 4.6 上实际跑成 `high`。

### 每个档位该怎么用

官方对每个级别的用途给出了明确界定（下表是原文 `Choose an effort level` 的直译）：

| 级别 | 适用场景 |
| --- | --- |
| `low` | 短、范围明确、延迟敏感、且对"智力"不敏感的任务 |
| `medium` | 成本敏感、可以牺牲一部分智能来换 token 的工作 |
| `high` | 平衡 token 与智能。Fable 5 / Opus 4.8 / Opus 4.6 / Sonnet 4.6 的默认 |
| `xhigh` | 更深推理、更高 token 花费。Opus 4.7 的默认 |
| `max` | 可能在高难度任务上提升表现，但**可能收益递减、容易过度思考**。大规模采用前要先测试 |
| `ultracode` | 一个 Claude Code 设置：为每个实质性任务编排 [dynamic workflow](https://code.claude.com/docs/en/workflows)，配 `xhigh` 的逐消息推理。仅当前会话有效 |

关于 `max`，原文有一句值得单独拎出来的提醒：

> Can improve performance on demanding tasks but may show diminishing returns and is prone to overthinking. Test before adopting broadly.

> ↑ 原文出处：[Model configuration — Claude Code](https://code.claude.com/docs/en/model-config)，*Adjust effort level* 与 *Choose an effort level* 节。

还有两个跨会话的行为细节：

- `low` / `medium` / `high` / `xhigh` 会**跨会话持久**；`max` **仅当前会话**（除非通过环境变量 `CLAUDE_CODE_EFFORT_LEVEL` 设置）。
- `ultracode` 不是 effort level，而是 Claude Code 层的设置——发送 `xhigh` 并额外编排 workflow，**仅当前会话**，且不属于 `effortLevel` 设置、`--effort` flag 或 `CLAUDE_CODE_EFFORT_LEVEL`。

另一个容易踩的坑：**首次切到 Fable 5 / Opus 4.8 / Opus 4.7 时，Claude Code 会强制应用该模型的默认 effort**（Fable 5 和 Opus 4.8 是 `high`，Opus 4.7 是 `xhigh`），即便你之前为别的模型设过别的级别。切换后要重新 `/effort` 选择。

### 怎么设置 effort

按优先级从高到低：

1. **环境变量**（最高优先级）：`CLAUDE_CODE_EFFORT_LEVEL`，可设级别名或 `auto`
2. **Skill / subagent frontmatter** 的 `effort` 字段（在该 skill / subagent 活跃时覆盖会话级别，但不覆盖环境变量）
3. **会话内命令** `/effort`：无参弹出滑块；`/effort <level>` 直接设；`/effort auto` 重置为模型默认
4. **`/model` 选择器**里用左右方向键调 effort 滑块
5. **启动 flag** `--effort <level>`
6. **settings.json** 的 `effortLevel`：只接受 `low` / `medium` / `high` / `xhigh`，**不接受** `max` 和 `ultracode`（二者仅会话有效）

当前 effort 会显示在 logo 和 spinner 旁边（如 "with low effort"），不用打开 `/model` 也能确认。

## ultrathink 的真相

`ultrathink` 是当前**唯一**被 Claude Code 识别的思考关键词。官方原文：

> Include `ultrathink` anywhere in your prompt to request deeper reasoning on that turn without changing your session effort setting. Claude Code recognizes the keyword and adds an in-context instruction. **The effort level sent to the API is unchanged.** Other phrases such as "think", "think hard", and "think more" are passed through as ordinary prompt text and are not recognized as keywords.

三点结论：

1. `ultrathink` 写在 prompt 任意位置即可，让**这一轮**想得更深。
2. 它**不改 token 预算，也不改发给 API 的 effort level**——只是加了一条 in-context 指令。
3. `think` / `think hard` / `think more` 这些**已经不识别**，会被当作普通文本。旧资料里"think=4000、ultrathink=31999"的预算映射表对新模型无效。

所以日常用法是：保持默认 effort（`high`），遇到某一轮想得不够深时，临时在那个 prompt 里加个 `ultrathink`，不必动整个会话的 effort。

> ↑ 原文出处：[Model configuration — Claude Code](https://code.claude.com/docs/en/model-config)，*Use ultrathink for one-off deep reasoning* 节。

## 思考的开/关与显示

extended thinking 是 Claude 在回答前发出的那段推理。在新模型上 effort 已经决定了思考多少，这里的控制只管"开不开"和"怎么显示"：

| 控制 | 怎么设 |
| --- | --- |
| 当前会话开关思考 | `Option+T`（macOS）/ `Alt+T`（Windows/Linux） |
| 全局默认开关 | `/config` 里切换，存为 `~/.claude/settings.json` 的 `alwaysThinkingEnabled` |
| 无论 effort 都禁用 | `MAX_THINKING_TOKENS=0`——在 Anthropic API 上关闭思考；第三方 provider 上则是省略 `thinking` 参数，adaptive-reasoning 模型**可能仍会思考** |

三个必须知道的细节：

- **Fable 5 上思考无法关闭**。session toggle、`alwaysThinkingEnabled`、`MAX_THINKING_TOKENS=0` 对它都无效，它按 effort 每步自行决定。
- **思考输出默认折叠**。按 `Ctrl+O` 切换 verbose，才能看到灰色斜体的推理过程。
- **Anthropic API 上的交互会话默认收到脱敏（redacted）的 thinking blocks**。想看到完整摘要，要在 settings 里设 `showThinkingSummaries: true`。

最后一点关于计费，原文毫不含糊：

> You are charged for all thinking tokens generated, even when collapsed or redacted.

**所有 thinking token 都计费**，无论折叠还是脱敏。

> ↑ 原文出处：[Model configuration — Claude Code](https://code.claude.com/docs/en/model-config)，*Extended thinking* 节。

### 平台层补充：summarized vs omitted

如果你直接用 Messages API，`display` 字段控制思考如何返回，Claude Code 的呈现层对应的正是这套机制：

- `summarized`：thinking block 里是**摘要文本**（Opus 4.6 / Sonnet 4.6 及更早 Claude 4 的默认）
- `omitted`：thinking 字段为空，`signature` 仍带加密的完整思考（**Fable 5 / Mythos 5 / Sonnet 5 / Opus 4.8 / Opus 4.7 / Mythos Preview 的默认**）

`omitted` 的主要好处是 streaming 时**更快的首文本 token**（server 跳过流式思考 token，只发 signature）。但官方明确：**omitted 只降延迟，不降成本**——你仍按完整 thinking token 计费。

> ↑ 原文出处：[Extended thinking — Claude Platform](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)，*Controlling thinking display* 与 *Pricing* 节。

## Fast mode：与 effort 独立的另一个维度

很多人会把 fast mode 和"低 effort"混为一谈，但它们是完全不同的两件事。官方原文：

> Fast mode is not a different model. It uses Claude Opus with a different API configuration that prioritizes speed over cost efficiency. You get identical quality and capabilities with faster responses.

二者的对比表（原文直译）：

| 设置 | 效果 |
| --- | --- |
| **Fast mode** | 同样的模型质量，更低延迟，更高成本 |
| **更低 effort level** | 更少思考时间，更快响应，复杂任务上**可能更低质量** |

关键区别：fast mode **不降质量**，只是用更高单价换更低延迟；低 effort **可能降质量**，因为思考变少了。两者可以叠加——`/fast` + 低 effort = 在直线任务上追求最大速度。

fast mode 的几个事实：

- 是 **research preview**，特性和定价可能变。
- 支持 Opus 4.8 / 4.7 / 4.6，**不支持** Sonnet / Haiku / 其他模型。
- 定价（每 MTok input / output）：Opus 4.8 **$10 / $50**；Opus 4.7 和 4.6 **$30 / $150**。定价在 1M context 全窗口平价。
- 用 `/fast` 切换（或 settings 里 `"fastMode": true`），开启后 prompt 旁出现 `↯` 图标。
- 首次在对话中开启 fast mode，要对**整段对话上下文**按 fast mode 的 uncached input 价付一次费——**对话越深越贵**，所以从会话开始就开更划算。
- fast mode 有独立的 rate limit，Opus 4.8 / 4.7 / 4.6 共享同一池。触发限流会自动回退标准速度，`↯` 变灰，冷却后自动恢复。

> ↑ 原文出处：[Fast mode — Claude Code](https://code.claude.com/docs/en/fast-mode)，*Fast mode vs effort level* 与 *Understand the cost tradeoff* 节。

## 什么时候开思考链：决策表

回到最初的问题。先分清两个动作：

- **"开思考链"** 在新模型上 ≈ **调高 effort**（或对单轮用 `ultrathink`），因为你没法真正关掉思考。
- **"开 fast mode"** 是另一个独立决定，要的是延迟而非更深思考。

### 值得调高 effort（或加 ultrathink / 用 max、xhigh）

- **复杂调试**：根因排查、难复现 bug、跨文件调用链追踪
- **架构设计**：技术选型、模块边界、数据流与 API 设计
- **多步推理**：需要在多步之间保持逻辑一致的任务
- **大规模重构 / 迁移**：跨包跨模块改动、影响面分析
- **算法 / 数学 / 并发正确性**：需要逐步推理验证
- **深度调查**：outage debugging、长自治任务（Fable 5 的主场）
- **临时加深**：发现 Claude 这一轮"想得不够深"时，单轮加 `ultrathink`

### 不需要调高，甚至应该调低（low / medium）

- **简单问答**：概念解释、文档查询
- **格式化 / 模板化输出**
- **单文件小改动**：改常量、修 typo、调样式
- **延迟敏感的直线任务**：快速迭代、即时反馈
- **批量 / CI 流水线**：成本敏感、速度优先

### 一张速查表

| 场景 | 推荐 |
| --- | --- |
| 日常编码（多数情况） | 默认 `high`，不用动 |
| 卡住的难题、深度调查 | `xhigh`，或在 prompt 里加 `ultrathink` |
| 极难的架构 / 算法、不赶时间 | `max`（注意可能过度思考） |
| 实质性多步工程任务 | `/effort` 选 `ultracode`（自动编排 workflow） |
| 改 typo、跑格式化、直线快速迭代 | `low` / `medium`，可叠加 `/fast` |
| 需要低延迟但不想降质量 | `/fast`（保持默认 effort） |

平台层官方对"何时用 extended thinking"也有一句简洁的概括，可作为收尾原则：

> Use extended thinking for particularly complex tasks that benefit from step-by-step reasoning, like math, coding, and analysis.

## 环境变量速查

| 变量 | 作用 |
| --- | --- |
| `CLAUDE_CODE_EFFORT_LEVEL` | 设 effort 级别或 `auto`，**优先级最高**；通过它设 `max` 可跨会话持久 |
| `MAX_THINKING_TOKENS` | 设 `0` 关闭思考（Anthropic API，Fable 5 除外）；其他值仅配合 fixed thinking budget 在 Opus 4.6 / Sonnet 4.6 上有效 |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` | 仅在 Opus 4.6 / Sonnet 4.6 上有效，回退到固定思考预算模式；对 Opus 4.7+ 和 Fable 5 **无效** |
| `CLAUDE_CODE_DISABLE_FAST_MODE=1` | 完全禁用 fast mode |

> ↑ 原文出处：[Environment variables — Claude Code](https://code.claude.com/docs/en/env-vars)（`MAX_THINKING_TOKENS`、`CLAUDE_CODE_EFFORT_LEVEL`、`CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING`）与 [Model configuration](https://code.claude.com/docs/en/model-config) 的 *Adaptive reasoning and fixed thinking budgets* 节。

## 一句话总结

在 Opus 4.8 上，思考默认自适应、固定预算的旧开关已失效（`MAX_THINKING_TOKENS=0` 在 Anthropic API 上仍可硬关，**只有 Fable 5 才是真关不掉**）；你能日常调的是**强度**（effort）、**单轮深度**（`ultrathink`）和**速度与成本的权衡**（fast mode）。日常用默认 `high`，难题调 `xhigh` 或加 `ultrathink`，极难且不急才考虑 `max`，直线快活用 `low` + `/fast`。记住：**所有思考 token 都计费**，折叠和脱敏都不省钱。

---

**参考文档**：

- [Model configuration — Claude Code](https://code.claude.com/docs/en/model-config)（effort level、ultrathink、adaptive reasoning、extended thinking 开关）
- [Fast mode — Claude Code](https://code.claude.com/docs/en/fast-mode)（fast mode 与 effort level 对比）
- [Environment variables — Claude Code](https://code.claude.com/docs/en/env-vars)（`MAX_THINKING_TOKENS`、`CLAUDE_CODE_EFFORT_LEVEL` 等）
- [Extended thinking — Claude Platform](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)（summarized / omitted、计费、跨版本差异）
