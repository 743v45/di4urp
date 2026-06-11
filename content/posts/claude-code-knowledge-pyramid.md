+++
date = '2026-06-12T00:30:00+08:00'
draft = false
title = 'Claude Code 知识层级金字塔：从入门到自主 AI 工厂'
description = 'Claude Code 全功能知识图谱，按入门→中级→进阶→高阶→系统级五层递进，覆盖内置工具、Hooks、Agent Teams、Workflow 编排、插件开发、企业部署等全部能力域'
tags = ['Claude Code', '知识体系', 'CLI', 'Agent', 'AI 工具']
categories = ['AI 工具']
+++

## 为什么需要这个金字塔

Claude Code 不只是"终端里的 ChatGPT"。它是一个完整的 AI 开发平台——内置工具系统、生命周期钩子、多 Agent 编排、插件生态、企业级权限控制。

但官方文档分散在 40+ 个页面里，没有统一的难度递进地图。

这篇文章把 Claude Code 的所有能力域按**认知难度**分成五层。每一层都是下一层的前提。你可以用它评估自己当前在哪一层，以及向上突破需要学什么。

---

## 第一层：入门级 -- 用 Claude Code 写代码

大多数用户停留在这里。核心是"让 AI 读你的代码、改你的代码、跑你的命令"。

> 推荐阅读：[概述](https://code.claude.com/docs/en/overview)、[CLI 参考](https://code.claude.com/docs/en/cli-reference)、[命令列表](https://code.claude.com/docs/en/commands)

### 基础交互

| 能力 | 说明 |
|------|------|
| 多轮对话 | 上下文感知的连续对话，Claude 记得你说过什么 |
| 单次查询 | `claude "query"` 直接执行，不需要进入 REPL |
| 管道模式 | `cat file.py \| claude -p "explain"` 非交互式 |
| 会话续接 | `claude -c` 继续，`claude -r <id>` 恢复指定会话 |
| 分叉对话 | `/fork` 从当前上下文分叉出新 Agent |
| 回溯 | `/rewind` 回退到之前的对话状态 |

### 内置工具（7 个核心）

| 工具 | 用途 |
|------|------|
| **Read** | 读文件（文本/PNG/JPG/PDF/Jupyter Notebook） |
| **Write** | 创建或完整覆盖文件 |
| **Edit** | 精确字符串替换（不是行号替换） |
| **Bash** | 执行 shell 命令，工作目录跨调用持久化 |
| **WebSearch** | 网络搜索，获取最新信息 |
| **NotebookEdit** | 编辑 Jupyter Notebook 单元格 |
| **AskUserQuestion** | Agent 向你提问确认 |

### 基本命令

| 命令 | 用途 |
|------|------|
| `/help` | 帮助信息 |
| `/clear` | 清空上下文重新开始 |
| `/compact` | 手动压缩上下文（接近窗口限制时） |
| `/cost` | 查看当前会话 token 消耗 |
| `/model` | 切换模型（sonnet/opus/haiku/fable） |
| `/resume` | 恢复历史会话 |
| `/status` | 查看账户、模型、上下文用量 |
| `/remember` | 手动触发记忆保存 |
| `/bug` `/feedback` | 反馈提交 |
| `/terminal-setup` | 终端集成配置 |

### 安装与启动

```bash
# 推荐（macOS/Linux/WSL）
curl -fsSL https://claude.ai/install.sh | bash

# Homebrew
brew install --cask claude-code

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

### 你需要掌握的概念

- **上下文窗口**：每次对话有 token 上限，超出会自动压缩
- **权限提示**：写文件、跑命令时 Claude 会请求你的批准
- **努力级别**：`--effort low/medium/high/xhigh/max` 控制推理深度

---

## 第二层：中级 -- 让 Claude Code 适应你的项目

这一层是日常开发者的高效使用层。核心是"配置你的 Claude Code"。

> 推荐阅读：[设置](https://code.claude.com/docs/en/settings)、[记忆](https://code.claude.com/docs/en/memory)、[权限](https://code.claude.com/docs/en/permissions)

### CLAUDE.md 配置层级

| 文件 | 作用域 | 例子 |
|------|--------|------|
| `~/.claude/CLAUDE.md` | 全局，所有项目 | "所有回复用中文" |
| `项目根/CLAUDE.md` | 团队共享，提交到 git | "本项目用 pnpm" |
| `项目根/CLAUDE.local.md` | 个人，不提交 | "我偏好 Vim 快捷键" |
| `.claude/rules/*.md` | 模块化规则，支持路径匹配 | "匹配 `*.tsx` 时使用 React 规范" |

CLAUDE.md 支持 `@path/to/import` 导入其他文件（最大深度 4 跳），支持 `AGENTS.md` 兼容。

### settings.json 配置

| 文件 | 作用域 | 提交到 git |
|------|--------|-----------|
| `~/.claude/settings.json` | 用户全局 | 否 |
| `.claude/settings.json` | 项目共享 | 是 |
| `.claude/settings.local.json` | 项目私有 | 否 |

关键配置项：

```json
{
  "model": "opus",
  "language": "chinese",
  "theme": "dark-daltonized",
  "env": {
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:5000"
  },
  "permissions": {
    "allow": ["Bash(git *)", "Bash(npm test)"],
    "deny": ["Read(~/.ssh/*)"]
  }
}
```

设置优先级：**托管设置 > CLI 参数 > 本地项目 > 共享项目 > 用户设置**

### 权限系统

六种权限模式，通过 `--permission-mode` 或 Shift+Tab 循环切换：

| 模式 | 行为 |
|------|------|
| `default` | 标准提示 |
| `acceptEdits` | 自动接受文件编辑，其余照常提示 |
| `plan` | 只读探索，执行前需明确批准 |
| `auto` | 自动模式分类器（三层：allow / soft_deny / hard_deny） |
| `dontAsk` | 只允许预批准的操作，其余自动拒绝 |
| `bypassPermissions` | 跳过所有检查（仅限沙盒环境） |

权限规则语法：`Tool(specifier)`

```
Bash(git *)              # 匹配所有 git 命令
Read(./.env)             # 匹配读取 .env
mcp__pencil              # 匹配 MCP 工具
Skill(code-review:*)     # 匹配 skill
```

评估顺序：**deny > ask > allow**，第一个匹配项获胜。

### Skills 调用

Skills 是可复用的知识文档，以 `/skill-name` 形式调用：

- 内置：`/code-review`、`/batch`、`/debug`、`/loop`、`/verify`
- 插件提供：`superpowers:brainstorming`、`hugo:hugo`
- 个人：`~/.claude/skills/<name>/SKILL.md`
- 项目：`.claude/skills/<name>/SKILL.md`

Skill 不在启动时全部加载——只在匹配到 `description` 时按需注入，节省 token。

### Memory 记忆系统

| 类型 | 位置 | 加载时机 |
|------|------|---------|
| MEMORY.md 索引 | `~/.claude/projects/<path>/memory/MEMORY.md` | 每次会话启动 |
| 主题文件 | 同目录下 `*.md` 文件 | 按需加载 |
| 写入 | Claude 在对话中自动写入 | 跨会话持久化 |

MEMORY.md 前 200 行 / 25KB 在启动时自动加载。

### Git 集成

- 自动检测 git 仓库，安全协议保护（不 push --force、不 --no-verify）
- `gh` CLI 集成：PR 创建/审查/查看
- 提交信息自动附带 `Co-Authored-By: Claude` 标注

### 定时任务

| 工具 | 说明 |
|------|------|
| `CronCreate` | 创建 cron 定时任务（标准 5 字段表达式，本地时区） |
| `CronDelete` | 删除定时任务 |
| `CronList` | 列出所有定时任务 |
| `/loop` | 封装 CronCreate，更简洁的语法 |

`durable: true` 写入 `.claude/scheduled_tasks.json`，跨会话存活。Recurring 任务 7 天自动过期。

### 会话管理

| 命令 | 用途 |
|------|------|
| `claude -c` | 继续最近对话 |
| `claude -r <id\|name>` | 恢复指定会话 |
| `claude --from-pr 42` | 恢复关联 PR 的会话 |
| `claude --fork-session` | 恢复时创建分支，不修改原始历史 |
| `claude -n "my session"` | 给会话命名 |
| `/rename <name>` | 重命名当前会话 |
| `/export <filename>` | 导出会话 |

### 认证方式

| 方式 | 说明 |
|------|------|
| Claude.ai 账户 | 默认，`claude auth login` |
| API Key | `ANTHROPIC_API_KEY` 环境变量 |
| SSO | `claude auth login --sso` |
| API 代理 | `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` |
| Bedrock | `CLAUDE_CODE_USE_BEDROCK=1` |
| Vertex AI | `CLAUDE_CODE_USE_VERTEX=1` |
| apiKeyHelper | 在 settings.json 中定义动态密钥获取命令 |

---

## 第三层：进阶级 -- 扩展 Claude Code 的能力边界

这一层是 Power User 的领域。核心是"给 Claude Code 装上外挂"。

> 推荐阅读：[钩子](https://code.claude.com/docs/en/hooks)、[MCP 服务器](https://code.claude.com/docs/en/mcp)、[技能](https://code.claude.com/docs/en/skills)、[子代理](https://code.claude.com/docs/en/sub-agents)

### Hooks 系统（28 种生命周期事件）

Hook 是 Claude Code 最强大的扩展机制。它在特定生命周期事件发生时触发你的自定义逻辑。

**全部 28 种 Hook 事件**：

| 类别 | 事件 | 触发时机 |
|------|------|---------|
| 会话 | `SessionStart` | 会话开始/恢复 |
| 会话 | `SessionEnd` | 会话终止 |
| 设置 | `Setup` | `--init`/`--init-only`/`--maintenance` 启动时 |
| 用户输入 | `UserPromptSubmit` | 用户提交 prompt 后，处理前 |
| 用户输入 | `UserPromptExpansion` | 命令扩展为 prompt 时 |
| 工具 | `PreToolUse` | 工具执行前（**可阻断**，exit code 2） |
| 工具 | `PostToolUse` | 工具执行成功后 |
| 工具 | `PostToolUseFailure` | 工具执行失败后 |
| 工具 | `PostToolBatch` | 一批并行工具调用完成后 |
| 权限 | `PermissionRequest` | 权限对话框出现时 |
| 权限 | `PermissionDenied` | 自动模式分类器拒绝时 |
| 消息 | `MessageDisplay` | 助手文本显示时 |
| 通知 | `Notification` | 通知发送时 |
| Agent | `SubagentStart` | 子 Agent 启动时 |
| Agent | `SubagentStop` | 子 Agent 完成时 |
| Agent | `TeammateIdle` | 团队 Agent 空闲时 |
| 任务 | `TaskCreated` | 通过 TaskCreate 创建任务时 |
| 任务 | `TaskCompleted` | 任务标记为完成时 |
| 指令 | `InstructionsLoaded` | CLAUDE.md/规则文件加载时 |
| 配置 | `ConfigChange` | 配置文件变更时 |
| 目录 | `CwdChanged` | 工作目录变更时 |
| 文件 | `FileChanged` | 监视的文件在磁盘上变更时 |
| Worktree | `WorktreeCreate` | Worktree 创建时 |
| Worktree | `WorktreeRemove` | Worktree 移除时 |
| 压缩 | `PreCompact` | 上下文压缩前 |
| 压缩 | `PostCompact` | 上下文压缩后 |
| MCP | `Elicitation` | MCP 服务器请求用户输入时 |
| MCP | `ElicitationResult` | 用户响应 MCP 请求后 |
| 停止 | `Stop` | Claude 完成响应时 |
| 停止 | `StopFailure` | 因 API 错误导致轮次结束时 |

**5 种 Hook 处理程序类型**：

| 类型 | 说明 | 典型用途 |
|------|------|---------|
| `command` | 执行 shell 命令，stdin 接收 JSON | 格式化、类型检查、安全扫描 |
| `http` | 发送 HTTP POST 到 URL | 外部审批系统、审计日志 |
| `mcp_tool` | 调用已连接的 MCP 工具 | 集成外部工具 |
| `prompt` | 单轮 LLM 评估，返回 yes/no | 智能审批决策 |
| `agent` | 生成有工具访问权限的子 Agent | 复杂验证逻辑（实验性） |

**匹配器模式**：
- `""` 或 `"*"` — 匹配所有
- `"Bash"` — 精确匹配
- `"Edit|Write"` — 管道分隔的多工具匹配
- 任何其他字符 — JavaScript 正则表达式

**实战 Hook 场景**：

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write $CLAUDE_FILE_PATH"
      }]
    }],
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "node review-command.js"
      }]
    }]
  }
}
```

### MCP Server 配置

| 传输类型 | 适用场景 | 示例 |
|----------|---------|------|
| `stdio` | 本地进程 | `npx chrome-devtools-mcp@latest` |
| `http` | 远程服务器（推荐） | `https://mcp.sentry.dev/mcp` |
| `sse` | 远程（已弃用） | — |
| `ws` | WebSocket | — |

管理命令：

```bash
claude mcp add <name> <commandOrUrl>
claude mcp add --transport http <name> <url>
claude mcp add-json <name> '<json>'
claude mcp list              # 列出 + 健康检查
claude mcp get <name>        # 详细信息
claude mcp remove <name>
claude mcp serve              # 将 Claude Code 自身暴露为 MCP 服务器
claude mcp add-from-claude-desktop  # 从 Desktop 导入
```

MCP 工具以 `mcp__<server>__<tool>` 前缀出现在工具列表中。

### Worktree 隔离开发

```bash
claude -w [name]              # 创建 git worktree 并启动会话
claude -w --tmux              # worktree + tmux 窗格
claude -w --tmux=classic      # 传统 tmux（非 iTerm2 原生面板）
```

Worktree 位置：`.claude/worktrees/<name>/`

会话内切换：
- `EnterWorktree` — 创建/进入 worktree
- `ExitWorktree` — 退出（`action: "keep"` 或 `"remove"`）

### 自定义 Agent 定义

位置：`~/.claude/agents/<name>.md` 或 `.claude/agents/<name>.md`

```markdown
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: ["Read", "Grep", "Glob"]
model: sonnet
---

You are a senior security engineer...
```

Frontmatter 字段：

| 字段 | 说明 |
|------|------|
| `name` | Agent 名称 |
| `description` | 何时委派（用于自动匹配） |
| `tools` | 工具白名单 |
| `disallowedTools` | 工具黑名单 |
| `model` | 指定模型（sonnet/opus/haiku/fable/inherit/完整 ID） |
| `permissionMode` | 权限模式 |
| `maxTurns` | 最大轮次 |
| `skills` | 启动时预加载的 skill |
| `mcpServers` | 范围内的 MCP 服务器 |
| `hooks` | 范围内的生命周期钩子 |
| `memory` | 持久记忆范围（user/project/local） |
| `background` | 始终作为后台任务运行 |
| `isolation` | `"worktree"` 在临时 git worktree 中运行 |
| `color` | 显示颜色（red/blue/green/yellow/purple/orange/pink/cyan） |
| `initialPrompt` | 作为主会话时的第一个用户轮次 |

### 自定义 Skill 开发

Skill 是 Markdown 文档，注入到对话上下文中指导行为：

```markdown
---
name: my-skill
description: When to use this skill
allowed-tools: ["Bash(npm test)"]
disallowed-tools: ["Write"]
model: sonnet
effort: high
paths: ["src/**/*.ts"]
---

# Skill instructions here...
```

动态上下文注入：

```
!`date`               -> 内联命令输出

```!                   -> 多行命令围栏

$ARGUMENTS            -> 完整参数
$ARGUMENTS[0]         -> 第一个参数
${CLAUDE_SESSION_ID}  -> 会话 ID
${CLAUDE_SKILL_DIR}   -> Skill 目录路径
```

### 深度配置调优

**自动模式分类器**（三层安全决策）：

| 级别 | 行为 | 示例 |
|------|------|------|
| **allow** | 自动批准 | 测试操作、只读、已声明的依赖 |
| **soft_deny** | 默认拒绝，用户明确指令可覆盖 | push --force、生产部署、凭证操作 |
| **hard_deny** | 始终拒绝 | 数据渗出（敏感数据离开信任边界） |

```bash
claude auto-mode defaults   # 查看默认规则
claude auto-mode config     # 查看当前生效配置
claude auto-mode critique   # AI 评估你的自定义规则
```

### 模型选择与切换

```bash
# CLI 标志
claude --model opus
claude --model sonnet
claude --fallback-model haiku,opus   # 主模型不可用时的降级链

# 环境变量覆盖
ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
ANTHROPIC_DEFAULT_SONNET_MODEL_NAME="自定义名称"
```

模型解析顺序：`CLAUDE_CODE_SUBAGENT_MODEL` > 调用参数 > frontmatter `model` > 主会话模型

### Token 与上下文优化

| 策略 | 配置 | 效果 |
|------|------|------|
| 控制思考 token | `MAX_THINKING_TOKENS=10000` | 减少约 70% 思考开销 |
| 更早压缩 | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` | 默认 95% 太晚，50% 保持质量 |
| 子 Agent 用便宜模型 | `CLAUDE_CODE_SUBAGENT_MODEL=haiku` | Explore 等只读任务用 Haiku |
| 禁用非必要流量 | `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` | 停止遥测/更新检查 |
| 缓存 TTL 延长 | `ENABLE_PROMPT_CACHING_1H=1` | 5 分钟到 1 小时 |

### 调试和诊断

| 工具 | 用途 |
|------|------|
| `/doctor` | 自动检查安装、设置、MCP、上下文 |
| `/heapdump` | JS 堆快照，内存诊断 |
| `--debug [filter]` | 类别过滤调试（`"api,hooks"` 或 `"!1p,!file"`） |
| `--debug-file <path>` | 写入调试日志 |
| `--safe-mode` | 禁用所有自定义（排查问题） |
| `--verbose` | 详细输出 |

---

## 第四层：高阶级 -- 用 Claude Code 构建 AI 系统

这一层是架构师的领域。核心是"让多个 AI 协作完成复杂任务"。

> 推荐阅读：[代理团队](https://code.claude.com/docs/en/agent-teams)、[企业部署](https://code.claude.com/docs/en/admin-setup)、[服务器管理设置](https://code.claude.com/docs/en/server-managed-settings)

### Agent Teams 多智能体编排

```bash
# 启用（环境变量）
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

**核心工作流**：

1. `TeamCreate` — 创建团队，生成共享任务列表
2. `TaskCreate` — 创建任务，设置依赖关系
3. `Agent` + `team_name` + `name` — 启动 teammate
4. `TaskUpdate` — 分配任务（`owner: "agent-name"`）
5. `SendMessage` — agent 间通信
6. `TeamDelete` — 任务完成后清理

**tmux 模式**：`teammateMode: "tmux"` 让每个 teammate 在独立 tmux 窗格运行，可以看到每个 agent 的实时输出。

**资源消耗**：每个 teammate 约等于独立 Claude Code 会话，7 个 teammate 约等于 7 倍 token 消耗。

### Workflow 脚本编排

Workflow 是确定性编排 DSL，用于复杂的多 Agent 流水线：

```javascript
export const meta = {
  name: 'review-changes',
  description: 'Review changed files across dimensions',
  phases: [{ title: 'Review' }, { title: 'Verify' }]
}

const DIMENSIONS = [
  { key: 'bugs', prompt: 'Find correctness bugs...' },
  { key: 'security', prompt: 'Find security vulnerabilities...' }
]

const results = await pipeline(
  DIMENSIONS,
  d => agent(d.prompt, { schema: FINDINGS_SCHEMA, phase: 'Review' }),
  review => parallel(review.findings.map(f => () =>
    agent(`Verify: ${f.title}`, { schema: VERDICT_SCHEMA, phase: 'Verify' })
  ))
)
```

**核心 API**：

| 函数 | 说明 |
|------|------|
| `agent(prompt, opts)` | 启动子 Agent，返回结果 |
| `pipeline(items, stage1, stage2, ...)` | 串行流水线（默认推荐） |
| `parallel(thunks)` | 并行执行（有屏障，等所有完成） |
| `phase(title)` | 阶段管理 |
| `log(message)` | 输出日志 |
| `budget` | Token 预算控制 |

**设计模式**：

| 模式 | 说明 |
|------|------|
| **Adversarial verify** | N 个独立质疑者投票，大于等于多数通过才放行 |
| **Judge panel** | N 个独立方案，评委打分，综合最优 |
| **Loop-until-dry** | 持续发现，直到 K 轮无新发现 |
| **Multi-modal sweep** | 并行 agent 从不同角度搜索 |
| **Completeness critic** | 最终 agent 问"缺了什么"，驱动下一轮 |

### 插件开发

插件是 Claude Code 的包管理单元：

```
my-plugin/
  plugin.json          # Manifest
  agents/              # 自定义 Agent
  skills/              # Skills
  hooks/               # Hooks
  commands/            # 斜杠命令
  rules/               # 规则文件
  .mcp.json            # MCP 服务器
```

```bash
claude plugin init my-plugin --with skills,agents,hooks  # 初始化
claude plugin validate ./my-plugin                       # 验证
claude plugin details my-plugin                          # 查看组件 + token 成本
claude plugin tag                                        # 版本化发布
```

插件命名空间：skill 以 `plugin-name:skill-name` 调用，如 `superpowers:brainstorming`。

### Hooks 高级组合

**权限桥接**（外部审批系统）：

```json
{
  "PreToolUse": [{
    "matcher": "",
    "hooks": [{
      "type": "http",
      "url": "https://internal.approval.system/hook"
    }]
  }]
}
```

**自动审批流**（Agent 验证）：

```json
{
  "PreToolUse": [{
    "matcher": "Bash",
    "hooks": [{
      "type": "agent",
      "prompt": "Review this command for safety. Approve or deny.",
      "model": "haiku"
    }]
  }]
}
```

**会话持久化**（Stop hook 保存状态）：

```json
{
  "Stop": [{
    "hooks": [{
      "type": "command",
      "command": "echo $CLAUDE_SESSION_ID >> ~/.claude/session-log.txt"
    }]
  }]
}
```

### SDK/程序化集成

将 Claude Code 嵌入自动化管道：

```bash
# 结构化 JSON 输出
claude -p "task" --output-format json --json-schema '{...}'

# 流式 JSON 双向通信
claude -p --input-format stream-json --output-format stream-json

# CI/CD 模式
claude -p --bare --dangerously-skip-permissions "task"

# 包含钩子事件和增量消息
claude -p --output-format stream-json --include-hook-events --include-partial-messages
```

`--bare` 跳过所有可选组件（hooks/LSP/插件/自动记忆/CLAUDE.md 发现），只接受 API Key 认证。

### Prompt Caching 优化

| 使缓存失效 | 保留缓存 |
|-----------|---------|
| 切换模型 | 编辑仓库文件 |
| 更改努力级别 | 编辑 CLAUDE.md（注入前） |
| 开启快速模式 | 更改权限模式 |
| 连接/断开 MCP | 调用 skill/命令 |
| 启用/禁用插件 | `/recap`、回滚 |
| 压缩对话 | 生成子 Agent |
| 升级 Claude Code | |

高级优化：`--exclude-dynamic-system-prompt-sections` 将每机器部分（cwd、环境变量、git 状态）从系统 prompt 移至第一条用户消息，提高跨用户缓存命中率。

### 企业级部署

**托管设置优先级**：服务器托管 > MDM/plist > 文件型 > CLI > 项目 > 用户

| 功能 | 配置方式 |
|------|---------|
| SSO/SAML | `forceLoginMethod` + `forceLoginOrgUUID` |
| API 代理 | `ANTHROPIC_BASE_URL` 指向企业 LLM Gateway |
| 审计日志 | OpenTelemetry 导出 + 合规 API |
| 沙盒 | `sandbox.filesystem.*` + `sandbox.network.*` |
| 网络代理 | `HTTPS_PROXY` + `HTTP_PROXY` + `NO_PROXY` |
| 版本控制 | `requiredMinimumVersion` / `requiredMaximumVersion` |
| 插件管控 | `strictKnownMarketplaces` + `blockedMarketplaces` |
| 仅托管 Hook | `allowManagedHooksOnly` |
| 禁止绕过权限 | `disableBypassPermissionsMode` |
| 动态策略 | `policyHelper` 可执行文件在启动时计算设置 |

---

## 第五层：系统级 -- 用 Claude Code 构建自主 AI 工厂

这一层没有上限。核心是"让 AI 自主运行，人类只在关键节点介入"。

> 推荐阅读：[环境变量](https://code.claude.com/docs/en/env-vars)、[无头模式](https://code.claude.com/docs/en/headless)、[Prompt 缓存](https://code.claude.com/docs/en/prompt-caching)、[上下文窗口](https://code.claude.com/docs/en/context-window)

### 多 Workflow 串联

跨会话状态管理，实现完整软件生命周期自动化：

```
理解（多 Agent 并行读取）
  -> 设计（评委团打分）
  -> 实现（子 Agent 工作树隔离）
  -> 审查（对抗验证）
  -> 部署（Hook 触发 CI）
```

每个阶段都是一个独立 Workflow，预算分配策略：

```javascript
// 动态 agent 池缩放
const FLEET = budget.total
  ? Math.floor(budget.total / 100000)
  : 5
```

### 自主 Issue 到 PR 工厂

```
Cron（每小时扫描 GitHub Issues）
  -> Agent Teams（自动 dispatch 修复任务）
    -> Worktree 隔离开发
      -> Hook 触发 lint/test
        -> 失败自动修复循环
          -> 成功自动提 PR
            -> Workflow 审查
              -> 通过自动 merge
```

### 上下文工程

将"给 AI 好的上下文"变成一门工程学科：

- **动态系统 prompt 注入**：`claude --system-prompt "$(cat context.md)"`
- **Shell alias 模式切换**：
  ```bash
  alias claude-dev='claude --system-prompt "$(cat ~/.claude/contexts/dev.md)"'
  alias claude-review='claude --system-prompt "$(cat ~/.claude/contexts/review.md)"'
  ```
- **Skill 渐进加载**：skill 内容在压缩后持久存在（每个 5000 token，总计 25000 token）
- **子 Agent 隔离读取**：大文件读取卸载到子 Agent，主上下文只收摘要
- **--exclude-dynamic-system-prompt-sections**：跨用户缓存共享

### 完整环境变量参考

| 变量 | 用途 |
|------|------|
| `ANTHROPIC_API_KEY` | API 密钥 |
| `ANTHROPIC_BASE_URL` | API 代理地址 |
| `ANTHROPIC_AUTH_TOKEN` | 代理认证 token |
| `ANTHROPIC_MODEL` | 模型覆盖 |
| `ANTHROPIC_DEFAULT_*_MODEL` | 模型别名覆盖（sonnet/opus/haiku） |
| `MAX_THINKING_TOKENS` | 扩展思考 token 预算 |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | 每次输出上限 |
| `CLAUDE_CODE_MAX_CONTEXT_TOKENS` | 上下文窗口限制 |
| `CLAUDE_CODE_MAX_TURNS` | 最大 agent 轮次 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 自动压缩阈值 |
| `CLAUDE_CODE_SUBAGENT_MODEL` | 子 Agent 模型 |
| `API_TIMEOUT_MS` | API 超时 |
| `BASH_DEFAULT_TIMEOUT_MS` | Bash 默认超时 |
| `BASH_MAX_TIMEOUT_MS` | Bash 最大超时 |
| `DISABLE_PROMPT_CACHING` | 禁用缓存 |
| `ENABLE_PROMPT_CACHING_1H` | 缓存 TTL 延长到 1 小时 |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | 启用遥测 |
| `OTEL_*` | OpenTelemetry 配置 |
| `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY` | 网络代理 |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | 禁用非必要流量 |

### 高级调度系统

| 工具 | 范围 | 用途 |
|------|------|------|
| `CronCreate` | 分钟级 | 标准 cron 表达式，长期重复任务 |
| `ScheduleWakeup` | 60-3600 秒 | 短期回调，用于 /loop 动态模式 |
| `--bg` | 整个会话 | 后台 Agent 会话 |
| `claude agents` | 全局 | 查看/调度后台 Agent |

### 键绑定自定义

文件：`~/.claude/keybindings.json`

支持 20 个上下文（Chat/Autocomplete/Settings/Confirmation/Tabs 等），修饰键（ctrl/shift/alt/cmd），和弦（`ctrl+k ctrl+s`），设置为 `null` 解绑。

### 主题系统

内置：`dark`、`light`、`dark-daltonized`、`light-daltonized`、`dark-ansi`、`light-ansi`

自定义主题：`~/.claude/themes/` 目录，覆盖 30+ 颜色 token。

### 内置 Subagent 类型

| 类型 | 模型 | 工具 | 用途 |
|------|------|------|------|
| **Explore** | Haiku | 只读 | 快速代码库搜索 |
| **Plan** | 继承 | 只读 | 架构设计研究 |
| **general-purpose** | 继承 | 全部 | 复杂多步骤任务 |
| **claude-code-guide** | Haiku | 受限 | 功能问答 |
| **statusline-setup** | Sonnet | Read/Edit | 状态栏配置 |

### .claude/ 目录完整结构

```
~/.claude/
  CLAUDE.md                  # 全局指令
  settings.json              # 全局设置
  settings.local.json        # 本地覆盖
  keybindings.json           # 键绑定
  agents/                    # 自定义 Agent
  skills/                    # Skills
  commands/                  # 斜杠命令
  rules/                     # 规则文件
  hooks/                     # Hook 脚本
  plugins/                   # 插件
    installed_plugins.json
    config.json
    cache/
  projects/                  # 项目状态
    <encoded-path>/
      memory/                # 记忆文件
      *.jsonl                # 会话记录
  sessions/                  # 会话持久化
  teams/                     # 团队配置
  tasks/                     # 任务列表
  plans/                     # 计划文件
  worktrees/                 # Worktree 存储
  jobs/                      # 后台任务
  daemon/                    # 守护进程
  backups/                   # 文件备份
  file-history/              # 文件编辑历史
  ide/                       # IDE 连接
  debug/                     # 调试输出
  themes/                    # 自定义主题
```

---

## 知识层级速查表

| 层级 | 核心能力 | 典型用户 | 关键概念 |
|------|---------|---------|---------|
| 入门 | 让 AI 读/改/跑 | 所有用户 | 内置工具、基本命令 |
| 中级 | 配置你的 Claude Code | 日常开发者 | CLAUDE.md、权限、Memory |
| 进阶 | 扩展能力边界 | Power User | Hooks、MCP、自定义 Agent |
| 高阶 | 多 Agent 协作系统 | 架构师 | Teams、Workflow、插件 |
| 系统级 | 自主 AI 工厂 | AI 工程师 | 跨会话编排、上下文工程 |

---

## 数据来源与推荐阅读

### 官方文档

- [Claude Code 文档首页](https://code.claude.com/docs) — 总入口
- [概述](https://code.claude.com/docs/en/overview) — 安装方法、平台支持、功能全景
- [CLI 参考](https://code.claude.com/docs/en/cli-reference) — 全部命令和标志
- [设置](https://code.claude.com/docs/en/settings) — settings.json 完整 schema、优先级、权限规则
- [记忆](https://code.claude.com/docs/en/memory) — CLAUDE.md 层级、Rules、自动记忆
- [钩子](https://code.claude.com/docs/en/hooks) — 28 种事件、5 种处理程序、匹配器语法
- [MCP 服务器](https://code.claude.com/docs/en/mcp) — 传输类型、作用域、管理命令
- [技能](https://code.claude.com/docs/en/skills) — SKILL.md frontmatter、动态注入、捆绑列表
- [子代理](https://code.claude.com/docs/en/sub-agents) — 内置类型、自定义定义、frontmatter 字段
- [权限](https://code.claude.com/docs/en/permissions) — 六种模式、规则语法、沙盒
- [企业部署](https://code.claude.com/docs/en/admin-setup) — MDM、托管设置、策略分发
- [服务器管理设置](https://code.claude.com/docs/en/server-managed-settings) — 远程策略、合规 API
- [环境变量](https://code.claude.com/docs/en/env-vars) — 259 个变量完整参考
- [命令列表](https://code.claude.com/docs/en/commands) — 70+ 个斜杠命令
- [键绑定](https://code.claude.com/docs/en/keybindings) — 20 个上下文、和弦语法
- [上下文窗口](https://code.claude.com/docs/en/context-window) — 加载时序、压缩后保留策略
- [Prompt 缓存](https://code.claude.com/docs/en/prompt-caching) — 失效条件、TTL 控制
- [模型配置](https://code.claude.com/docs/en/model-config) — 别名、回退链、努力级别
- [故障排除](https://code.claude.com/docs/en/troubleshooting) — /doctor、/heapdump、safe-mode
- [无头模式](https://code.claude.com/docs/en/headless) — SDK 集成、流式 JSON、结构化输出
- [代理团队](https://code.claude.com/docs/en/agent-teams) — 多会话协调、tmux 模式
- [GitHub Actions](https://code.claude.com/docs/en/github-actions) — CI/CD 自动化、@claude 触发
- [网络配置](https://code.claude.com/docs/en/network-config) — 代理、mTLS、CA 证书
- [LLM Gateway](https://code.claude.com/docs/en/llm-gateway) — API 代理、会话级成本归因
- [数据使用](https://code.claude.com/docs/en/data-usage) — 零数据保留、合规
- [监控使用](https://code.claude.com/docs/en/monitoring-usage) — OpenTelemetry、审计日志

### 其他来源

- Claude Code v2.1.173 CLI `--help` 输出
- [Claude Code GitHub 仓库](https://github.com/anthropics/claude-code)
