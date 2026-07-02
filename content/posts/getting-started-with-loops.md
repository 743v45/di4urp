+++
date = 2026-07-02T12:00:00+08:00
draft = false
title = '入门：使用 Loops（循环）'
tags = ['Claude Code', 'Loops', '自动化', 'Agent']
categories = ['技术实践']
description = '了解 Claude Code 团队如何定义 agent 循环，以及从回合制到基于目标、基于时间和主动循环的实用指导——以及何时使用每种循环。'
+++

> **翻译声明**：本文翻译自 Claude 官方博客：https://claude.com/blog/getting-started-with-loops

了解 Claude Code 团队如何定义 agent 循环，以及从回合制到基于目标、基于时间和主动循环的实用指导——以及何时使用每种循环。

![loops hero](/images/loops-hero.svg)

目前关于"设计循环"而不是向编程 agent 发送 prompt 的讨论很多。如果你在 X（Twitter）上花时间试图弄清楚循环到底是什么，你会发现多种不同的答案。

在 Claude Code 团队，我们将**循环定义为 agent 重复工作周期，直到满足停止条件**。我们根据以下几个维度将循环分为不同类型：

* 触发方式
* 停止方式
* 使用的 Claude Code 原语
* 每种循环最适合的任务类型

我们将介绍主要的循环类型、何时使用每种类型，以及在管理 token 用量时如何保持代码质量。并非所有任务都需要复杂的循环；从最简单的解决方案开始，选择性地使用这些模式。

## 回合制循环

* **触发方式：** 用户 prompt。
* **停止标准：** Claude 判断任务已完成或需要更多上下文。
* **最佳用途：** 不属于定期流程或计划的短期任务。
* **用量管理：** 编写具体的 prompt，并使用 skills 改进验证，以减少回合数。

你发送的每个 prompt 都启动了一个手动循环，由你指导每一轮。Claude 收集上下文、采取行动、检查其工作、在需要时重复，然后做出回应。我们称之为 agent 循环。

例如，让 Claude 创建一个点赞按钮。它阅读你的代码，进行修改，运行测试，然后返回它*认为*可以工作的内容。然后你手动检查工作成果，并编写下一个 prompt。

你可以通过将手动步骤编码为 SKILL.md 来改进验证步骤，这样 Claude 可以端到端地检查更多工作。这应包括允许 Claude *查看*、*测量*或*交互*结果的工具或连接器。检查越量化，Claude 自我验证就越容易。

例如，在你的 SKILL.md 文件中可以指定：

```yaml
---
name: verify-frontend-change
description: Verify any UI change end-to-end before declaring it done.
---

# Verifying frontend changes
Never report a UI change as complete based on a successful edit alone. Verify it the way a human reviewer would:

1. Start the dev server and open the edited page in the browser.
2. Interact with the change directly. For a new control (button, input, toggle): click it, confirm the expected state change, and screenshot before/after.
3. Check the browser console: zero new errors or warnings.
4. Use the Chrome Devtools MCP, run a performance trace and audit Core Web Vitals.

If any step fails, fix the issue and rerun from step 1 — do not hand back partially verified work.
```

![turn-based loops](/images/loops-turnbased.png)

## 基于目标的循环（/goal）

* **触发方式：** 实时的手动 prompt。
* **停止标准：** 目标达成 或 达到最大回合数。
* **最佳用途：** 具有可验证退出条件的任务。
* **用量管理：** 设置具体的完成标准和明确的回合上限，如"5 次尝试后停止"。

有时，单个回合是不够的，尤其是对于更复杂的任务。Agent 在能够迭代时表现更好。你可以通过 /goal 定义"完成"的样子，来延长 Claude 持续迭代的时间。

当你定义成功标准时，Claude 不需要自行判断什么是"足够好"从而过早结束循环。每次 Claude 尝试停止时，一个评估模型会检查你的条件并将其送回工作，直到达成目标或达到你设定的回合数。

这就是为什么像通过的测试数量或**达到**特定分数阈值这样确定性的标准如此有效。

例如：

```text
/goal get the homepage Lighthouse score to 90 or above, stop after 5 tries.
```

![goal-based loop](/images/loops-goalbased.png)

## 基于时间的循环（/loop 和 /schedule）

* **触发方式：** 指定的时间间隔。
* **停止标准：** 你取消它，或工作完成（PR 合并，队列为空）。
* **最佳用途：** 重复性工作，或与外部环境/系统交互。
* **用量管理：** 设置更长的间隔，或基于事件响应而非时间响应。

一些 agent 工作是重复的：任务保持不变，只有输入发生变化。例如，每天早上总结 Slack 消息。其他工作依赖于外部系统，与外部系统交互的一种简单方式是按间隔检查并做出响应。例如，一个可能收到代码审查或 CI 失败的 PR。

对于这些情况，你可以使用 `/loop` 来触发 Claude 按间隔运行一个 prompt。例如：

```text
/loop 5m check my PR, address review comments, and fix failing CI
```

`/loop` 在你的计算机上运行，所以如果你关闭它，它就会停止。你可以通过使用 `/schedule` 创建例程来将循环移至云端。

## 主动循环

* **触发方式：** 事件或计划触发，无需实时人工参与。
* **停止标准：** 每个任务在目标达成时退出。例程本身运行直到你关闭它。
* **最佳用途：** 重复性的、定义明确的工作流：bug 报告、问题分类、迁移、依赖升级等。
* **用量管理：** 将例程路由到更小、更快的模型，并使用最强大的模型进行判断。

上述原语以及 Claude Code 的其他功能如**自动模式**和**动态工作流**（研究预览版）可以组合成一个用于长期运行的循环。

例如，要处理传入的反馈，你可以使用：

1. **`/schedule`**（研究预览版）运行一个检查新报告的例程
2. **`/goal`** 定义"完成"的样子，并使用 **skills** 记录如何验证
3. **动态工作流** 编排 agent 来分类每个报告、修复它并审查修复
4. **自动模式** 让例程运行而不停下来请求许可

将它们组合在一起，一个 prompt 可能如下所示：

```text
/schedule every hour: check #project-feedback for bug reports. /goal: don't stop until every report found this run is triaged, actioned, and responded to. When fixing a bug, use a workflow to explore three solutions in parallel worktrees and have a judge adversarially review them.
```

![proactive loops](/images/loops-proactive.png)

## 保持代码质量

循环输出的质量取决于围绕它的系统。在设计系统时：

* **保持代码库本身的清洁：** Claude 遵循你代码库中已有的模式和约定。
* **给 Claude 一种自我验证的方式：** 使用 [skills](https://code.claude.com/docs/en/skills) 为你和你的团队编码"什么是好的"。
* **让文档易于获取：** 框架和库的文档有最新的最佳实践。
* **使用第二个 agent 进行代码审查：** 拥有全新上下文的审查者偏见更少，不受主 agent 推理的影响。你可以使用内置的 `/code-review` skill 或 [Code Review](https://code.claude.com/docs/en/code-review) for Github。

当单个结果不达标时，不要止步于修复单个问题，尝试将其编码化，以改进系统的所有未来迭代。

## 管理 token 用量

要管理 token 用量，循环应该有清晰的边界：

* **为任务选择合适的原语和模型：** 较小的任务不需要多个 agent 或循环。某些任务可以使用更便宜、更快的模型。
* **定义清晰的成功和停止标准：** 明确说明"完成"的样子，这样 Claude 可以更快地找到解决方案（但也不要太快）。
* **大规模运行前先试点：** 动态工作流可以生成数百个 agent。先在一小部分工作上评估用量。
* **确定性工作使用脚本：** 运行脚本比重复推理步骤更便宜。例如，一个 PDF skill 可以附带一个表单填充脚本，Claude 每次运行它，而不是重新推导代码。
* **不要以高于需要的频率运行例程：** 将间隔与你所观察内容的变化频率相匹配
* **审查用量：** `/usage` 命令按 skills、子 agent 和 MCP 分解最近的用量，不带参数的 `/goal` 显示当前的回合数和 token 用量，`/workflows` 显示每个 agent 的 token 用量，你可以随时停止一个 agent。

## 开始使用

总结：

| 循环类型 | 你交出的是 | 何时使用 | 推荐使用 |
|---------|-----------|---------|---------|
| 回合制 | 检查权 | 你在探索或做决策时 | 自定义验证 skills |
| 基于目标 | 停止条件 | 你知道"完成"的样子时 | `/goal` |
| 基于时间 | 触发器 | 工作按计划在你项目之外进行时 | `/loop`、`/schedule` |
| 主动式 | prompt | 工作是重复且定义明确时 | 以上所有，以及动态工作流 |

要开始使用循环，看看你已经在做的工作。选择一个你是瓶颈的任务，问自己可以将哪一部分交出：你能写出验证检查吗？目标足够清晰吗？工作是按计划到来的吗？

一旦有了想法，运行循环，观察结果——如在哪里停滞或过度执行，不要害怕对其进行迭代。

更多信息，请阅读 Claude Code 文档中关于[并行运行 agent](https://code.claude.com/docs/en/agents)、[loop](https://code.claude.com/docs/en/goal)、[schedule](https://code.claude.com/docs/en/routines)、[goal](https://code.claude.com/docs/en/goal)和[动态工作流](https://code.claude.com/docs/en/workflows#orchestrate-subagents-at-scale-with-dynamic-workflows)的页面。

*本文原作者为 Delba de Oliveira 和 Michael Segner*
