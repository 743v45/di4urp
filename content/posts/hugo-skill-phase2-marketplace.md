+++
date = 2026-03-12T15:00:00+08:00
draft = false
title = 'Claude Plugin 进阶：Marketplace 与项目规则实践'
tags = ['Claude', 'Plugin', 'Marketplace', 'Hugo']
categories = ['技术实践']
+++

## 背景

在上文[从零构建 Claude Skill](/posts/claude-skill-creation/)中，我们完成了 hugo skill 的基础功能。本文记录二阶段开发：接入 Marketplace 和建立项目规则，以及过程中遇到的问题。

## Marketplace 接入

### marketplace.json 结构

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "taevas-plugins",
  "version": "0.1.0",
  "description": "Taevas Plugins Marketplace",
  "owner": {
    "name": "743v45",
    "email": "noreply@743v45.com"
  },
  "plugins": [
    {
      "name": "hugo",
      "source": "./plugins/hugo",
      "category": "content",
      "description": "Publish content to Hugo blog..."
    }
  ]
}
```

**关键字段说明：**

| 字段 | 作用 |
|------|------|
| `$schema` | JSON Schema 验证 |
| `plugins[].source` | 相对于 marketplace.json 的插件路径 |
| `plugins[].category` | 分类：content/notifications/development 等 |

### 插件目录结构规范

从 Skill 升级为 Plugin，需要遵循更严格的目录结构：

```
plugins/hugo/
├── .claude-plugin/
│   └── plugin.json          # 插件元数据
├── skills/
│   └── hugo/                # 以 skill 名称命名的目录
│       ├── SKILL.md         # 核心指令
│       ├── references/      # 参考文档
│       └── scripts/         # 脚本工具
└── README.md
```

## 遇到的问题

### 问题一：Skill 目录结构重构

**现象：** 最初 skills 目录结构混乱，无法正确加载。

**原因：** Skills 应该放在以 skill 名称命名的子目录中，而不是直接放在 skills/ 下。

**解决：** 重构目录结构

```
# 错误 ❌
skills/
├── hugo.md
├── references/
└── scripts/

# 正确 ✓
skills/
└── hugo/
    ├── SKILL.md
    ├── references/
    └── scripts/
```

对应的 git commits:

```
f9be4f6 refactor(hugo): 重构插件目录结构
a6b6426 refactor(hugo): 重构 skill 目录结构
```

### 问题二：plugin.json 描述过于简单

**现象：** 插件加载后功能描述不清晰，用户不知道如何使用。

**解决：** 扩展 description 字段，详细说明所有使用模式：

```json
{
  "description": "Publish content to Hugo blog. Supports: (1) /hugo alone - check installation, (2) /hugo with content - create/update post, (3) /hugo new <content> - force create, (4) /hugo update <content> - force update, (5) /hugo ... -c - preview with hugo server"
}
```

### 问题三：文章更新模式缺失

**现象：** 只能创建新文章，无法更新已有文章。

**解决：** 添加三种操作模式

| 模式 | 命令 | 行为 |
|------|------|------|
| CREATE | `/hugo new <content>` | 强制创建，存在则报错 |
| UPDATE | `/hugo update <content>` | 强制更新，不存在则报错 |
| AUTO | `/hugo <content>` | 搜索匹配文章，让用户选择 |

实现搜索功能需要扩展 `detect_hugo_site.py`：

```python
def search_posts(directory: str, keywords: str) -> list:
    """Search posts by title or filename, return sorted by match score."""
    # 计算匹配分数
    # 标题匹配 +20，文件名匹配 +10
    # 分词匹配每个词 +5/+3
```

## 项目规则建立

### Commit 规范

采用 Conventional Commits：

```
<type>(<scope>): <description>

类型：feat/fix/refactor/docs/style/test/chore
范围：hugo/sound-hooks 等
```

### 目录结构规则

```
.claude-plugin/
├── marketplace.json         # 市场配置（项目根）
└── plugins/
    └── <plugin-name>/
        ├── .claude-plugin/
        │   └── plugin.json  # 插件元数据
        ├── skills/
        │   └── <skill-name>/
        │       ├── SKILL.md
        │       ├── references/
        │       └── scripts/
        └── README.md
```

### 文件命名规则

- SKILL.md 大写，作为 skill 入口
- 脚本使用 snake_case: `detect_hugo_site.py`
- 参考文档使用 kebab-case: `front-matter.md`

## 总结

二阶段开发的核心工作：

1. **接入 Marketplace** - 建立 marketplace.json 和目录规范
2. **重构目录结构** - skills 放入以名称命名的子目录
3. **完善功能** - 添加文章搜索和更新模式
4. **建立规则** - commit 规范、目录结构、命名约定

## 参考资料

- [Claude Code Plugin 文档](https://docs.anthropic.com/claude-code)
- [Conventional Commits](https://www.conventionalcommits.org/)