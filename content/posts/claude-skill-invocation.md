+++
date = 2026-03-12T12:00:00+08:00
draft = false
title = 'Claude Skill 调用触发流程详解'
tags = ['Claude', 'Skill', '架构设计']
categories = ['技术分析']
+++

## 概述

Claude Code 的 Skill 系统通过智能匹配机制，在用户请求时自动加载相关能力。本文深入分析 Skill 的调用触发流程。

## 三层加载架构

```
┌─────────────────────────────────────────────────────────┐
│                    Claude 上下文                         │
├─────────────────────────────────────────────────────────┤
│  Layer 1: Metadata (始终加载)                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │ hugo: "Publish content to Hugo blog..."         │   │
│  │ skill-creator: "Guide for creating skills..."   │   │
│  │ pdf: "PDF processing..."                        │   │
│  │ ... (所有 skill 的 name + description)          │   │
│  └─────────────────────────────────────────────────┘   │
│                          ↓                              │
│  Layer 2: SKILL.md Body (触发后加载)                   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ # Hugo Blog Publisher                           │   │
│  │ ## Workflow                                     │   │
│  │ 1. Check Hugo installation                      │   │
│  │ 2. Determine Hugo site path...                  │   │
│  └─────────────────────────────────────────────────┘   │
│                          ↓                              │
│  Layer 3: Bundled Resources (按需加载)                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │ scripts/detect_hugo_site.py                     │   │
│  │ references/front-matter.md                      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 触发流程详解

### 阶段一：用户输入解析

```
用户输入: /hugo 写一篇关于 Go 并发的文章
                    ↓
          命令解析: skill = "hugo"
                    args = "写一篇关于 Go 并发的文章"
```

### 阶段二：Metadata 匹配

Claude 在所有已安装 skill 的 description 中搜索匹配项：

```yaml
# hugo skill 的 description
description: "Publish content to Hugo blog. Use when user invokes /hugo command..."

# 匹配逻辑
/hugo → 匹配 "invokes /hugo command" → 触发 hugo skill
```

**匹配规则**：
1. 显式命令 `/skill-name` 优先匹配
2. 隐式触发通过 description 语义匹配
3. 多个匹配时选择描述最相关的

### 阶段三：Skill Body 加载

触发后，Claude 加载 SKILL.md 的完整内容：

```markdown
# Hugo Blog Publisher

## Workflow

1. **Check Hugo installation**
   ```bash
   hugo version
   ```

2. **Determine Hugo site path**
   - Run `scripts/detect_hugo_site.py`
   - Always confirm with user
...
```

### 阶段四：执行工作流

```
┌──────────────────────────────────────────────────┐
│  1. 检查 hugo version                            │
│     ↓                                            │
│  2. 运行 detect_hugo_site.py                     │
│     ↓                                            │
│  3. 确认站点路径                                  │
│     ↓                                            │
│  4. 确认文章内容                                  │
│     ↓                                            │
│  5. 读取 front-matter.md (按需)                  │
│     ↓                                            │
│  6. 创建文章文件                                  │
└──────────────────────────────────────────────────┘
```

## 关键机制

### 1. Description 是触发核心

```yaml
# 好的 description
description: "PDF processing. Use when user needs to: (1) extract text from PDF, (2) merge PDFs, (3) split PDF..."

# 不好的 description
description: "A skill for PDF"  # 太模糊
```

**原则**：description 必须包含所有触发条件，因为 SKILL.md body 只有在触发后才加载。

### 2. 脚本执行路径

```
SKILL.md 指令
     ↓
Claude 调用 Bash Tool
     ↓
python3 /path/to/skill/scripts/xxx.py
     ↓
返回结构化结果
     ↓
Claude 解析并继续工作流
```

### 3. 按需加载 Reference

```markdown
# SKILL.md 中的引用
- Front matter format: [references/front-matter.md](references/front-matter.md)
```

Claude 只在需要时读取该文件，避免上下文膨胀。

## 实际调用示例

```
用户: /hugo

Claude 内部流程:
1. 解析命令 → skill="hugo"
2. 匹配 metadata → 找到 hugo skill
3. 加载 SKILL.md body
4. 执行 Workflow:
   - hugo version → v0.157.0
   - detect_hugo_site.py → /Users/xxx/blog
   - 确认: "检测到站点，确认？"
   - 等待用户输入内容...

用户: 写一篇 Go 教程

Claude 继续:
- 生成内容大纲
- 确认内容
- 读取 front-matter.md
- 创建文件
```

## 性能优化

### 上下文占用

| 组件 | 大小 | 加载频率 |
|------|------|---------|
| 所有 metadata | ~2KB | 始终 |
| 单个 SKILL.md | 2-10KB | 触发后 |
| references/ | 任意 | 按需 |

### 最佳实践

1. **控制 description 长度**：100-200 词最佳
2. **SKILL.md < 500 行**：超出部分放入 references
3. **脚本优于重复代码**：脚本不占用上下文

## 总结

Skill 调用流程的核心是**渐进式披露**：

1. Metadata 始终在场，负责匹配
2. Body 触发后加载，提供工作流
3. Resources 按需读取，提供细节

这种设计在功能和上下文效率之间取得了平衡。

## 参考资料

- [Claude Code Skill System](https://docs.anthropic.com/claude-code)
- [Progressive Disclosure Pattern](https://www.nngroup.com/articles/progressive-disclosure/)