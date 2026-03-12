+++
date = 2026-03-12T12:00:00+08:00
draft = false
title = '从零构建 Claude Skill：以 Hugo 博客发布为例'
tags = ['Claude', 'Skill', 'Hugo', '自动化']
categories = ['技术实践']
+++

## 背景

Claude Code 支持 Skill 系统，允许用户创建可复用的能力模块。本文以实际创建的 `hugo` skill 为例，详解 Skill 的构建过程。

## 什么是 Skill

Skill 是 Claude Code 的扩展机制，本质是一个包含指令和资源的目录：

```
skill-name/
├── SKILL.md          # 核心：YAML frontmatter + Markdown 指令
├── scripts/          # 可执行脚本
├── references/       # 参考文档
└── assets/           # 输出资源
```

## 创建步骤

### 第一步：定义使用场景

明确 skill 要解决的问题。以 hugo skill 为例：

| 场景 | 用户输入 | 预期行为 |
|------|---------|---------|
| 检查环境 | `/hugo` | 检测 Hugo 安装和站点 |
| 创建文章 | `/hugo 写一篇 Go 教程` | 生成内容并发布 |
| 指定路径 | `/hugo --path ~/myblog` | 使用指定站点 |

### 第二步：规划资源需求

分析需要哪些辅助资源：

```
hugo/
├── scripts/
│   └── detect_hugo_site.py  # 检测 Hugo 站点
├── references/
│   └── front-matter.md      # Front matter 格式参考
└── SKILL.md
```

**脚本的作用**：检测站点需要遍历目录、检查配置文件，逻辑复杂，用 Python 脚本更可靠。

**参考文档的作用**：Front matter 有多种格式（TOML/YAML），放入 reference 按需加载。

### 第三步：编写 SKILL.md

#### Frontmatter 设计

```yaml
---
name: hugo
description: "Publish content to Hugo blog. Use when user invokes /hugo command..."
---
```

`description` 是触发机制的关键：
- 必须包含 skill 功能
- 必须包含触发条件
- 会被 Claude 持续加载在上下文中

#### 工作流设计

```markdown
## Workflow

1. **Check Hugo installation**
2. **Determine Hugo site path**
3. **Determine content**
4. **Determine front matter format**
5. **Create the post**
```

每一步都有明确的指令，包括命令示例和预期输出。

### 第四步：实现脚本

```python
# scripts/detect_hugo_site.py
def is_hugo_site(directory: str) -> dict:
    # 检查 config.toml / hugo.toml / config.yaml
    config_names = ["config", "hugo"]
    config_extensions = [".toml", ".yaml", ".yml", ".json"]

    # 返回检测结果
    return {
        "is_hugo_site": bool,
        "config_file": str,
        "content_dir": str,
        "existing_posts": list
    }
```

### 第五步：验证和迭代

```bash
# 测试脚本
python3 scripts/detect_hugo_site.py /path/to/hugo/site

# 实际调用
/hugo 写一篇测试文章
```

## 设计原则

### 1. 渐进式披露

Skill 采用三层加载机制：

| 层级 | 内容 | 加载时机 |
|------|------|---------|
| Metadata | name + description | 始终 |
| SKILL.md body | 工作流指令 | 触发后 |
| references/ | 详细文档 | 按需 |

### 2. 简洁至上

SKILL.md 应控制在 500 行以内，详细内容放入 references。

### 3. 自由度匹配

| 自由度 | 适用场景 | hugo skill 示例 |
|--------|---------|----------------|
| 高 | 多种有效方案 | 文章内容由 LLM 生成 |
| 中 | 有首选模式 | Front matter 格式检测 |
| 低 | 必须精确执行 | 站点检测脚本 |

## 最终结构

```
hugo/
├── SKILL.md                    # 2.8KB，核心指令
├── scripts/
│   └── detect_hugo_site.py    # 92 行，站点检测
├── references/
│   └── front-matter.md        # Front matter 格式参考
└── LICENSE.txt
```

## 总结

构建 Skill 的核心是**明确场景 → 规划资源 → 精简指令**。好的 skill 应该：

1. 在 description 中清晰描述触发条件
2. 用脚本处理确定性任务
3. 用 references 存放详细文档
4. 保持 SKILL.md 精简

## 参考资料

- [Skill Creator Skill](https://github.com/anthropics/claude-code)
- [Hugo Documentation](https://gohugo.io/documentation/)