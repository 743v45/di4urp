+++
date = 2026-03-17T13:47:37+08:00
draft = false
title = 'MCP vs Skill：AI 能力扩展的两种范式与决策指南'
description = '深入对比 MCP 和 Skill 两种 AI 扩展机制，提供场景化的决策框架'
tags = ['MCP', 'Skill', 'Claude', '架构设计']
categories = ['架构设计']
+++

## 核心概念

在构建 AI 应用的能力扩展时，我们面临两个主要选择：

- **MCP（Model Context Protocol）**：连接层协议，解决 AI 与外部系统/工具的标准化通信问题
- **Skill**：认知层封装，解决任务流程与知识复用问题

简单来说，MCP 回答"**能不能访问、怎么连、谁能连、怎么管**"的问题，而 Skill 回答"**怎么做、流程是什么、输出要什么格式**"的问题。

## 架构对比

```
┌─────────────────────────────────────────────────────────────────┐
│                        AI 客户端 (Claude/Cursor 等)           │
├─────────────────────────┬───────────────────────────────────────┤
│                         │                                       │
│         Skill 层 (认知)  │          MCP 层 (连接)               │
│                         │                                       │
│  ┌─────────────────────┐│    ┌─────────────────────────────┐  │
│  │  任务流程编排      ││    │   统一工具接口               │  │
│  │  知识模板应用      ││    │   标准化通信协议             │  │
│  │  提示词工程        ││    │   跨平台兼容                 │  │
│  └─────────────────────┘│    └─────────────────────────────┘  │
│                         │                                       │
└─────────────────────────┴───────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  外部系统/资源  │
                    │  (DB/API/文件)  │
                    └─────────────────┘
```

## 特征对比表

| 维度 | MCP | Skill |
|------|-----|-------|
| **定位** | 连接层协议 | 认知层封装 |
| **适用范围** | 跨平台、跨模型 | 特定平台内 |
| **主要解决** | 标准化通信、权限管控 | 任务流程、知识复用 |
| **部署位置** | 独立 Server进程 | 客户端/平台内 |
| **权限能力** | 系统级、本地访问 | 通常受限 |
| **标准程度** | 开放协议、强约束 | 自由定义、弱约束 |
| **生态性** | 可插拔、可扩展 | 封闭/半封闭 |

## MCP 不可替代的六类场景

### 一、跨平台 / 跨模型 / 跨客户端统一接入

**问题场景**：同一套工具/服务需要被多个不同 AI 客户端调用。

**典型用例**：

| 场景 | 说明 | Skill 的局限性 |
|------|------|----------------|
| 多客户端共享 | Claude、Cursor、VS Code Copilot、自定义 Agent 都要调用同一套后端 | Skill 仅绑定到特定平台 |
| 跨模型复用 | Anthropic、OpenAI、字节等模型都要调用同一套后端能力 | Skill 模型绑定性强 |
| 企业内协作 | 多团队、多 Agent 平台共享一套外部能力（DB、API、文件系统） | Skill 难以统一分发 |
| 开放生态 | 让第三方 AI 接入你的服务 | Skill 是私有实现 |

**MCP 解决方案示例**：

```python
# mcp_server.py
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

mcp = Server("database-access")

@mcp.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="query_database",
            description="Execute SQL queries on the main database",
            inputSchema={
                "type": "object",
                "properties": {
                    "sql": {"type": "string", "description": "SQL query"}
                },
                "required": ["sql"]
            }
        )
    ]

@mcp.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "query_database":
        # 任何 MCP 客户端都可以调用这个功能
        result = execute_sql(arguments["sql"])
        return [TextContent(type="text", text=str(result))]

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await mcp.run(read_stream, write_stream)
```

### 二、本地 / 私有环境深度访问

**问题场景**：需要直接访问本地资源或敏感数据不出域。

**典型用例**：

| 场景 | 说明 | Skill 的局限性 |
|------|------|----------------|
| 本地文件系统 | 直接读写本地代码库、配置文件 | Skill 通常无本地写权限 |
| 本地数据库 | 直接连线本地 MySQL/PostgreSQL | Skill 多为云端调用 |
| 内网服务 | 访问企业内网、私有云、本地服务器 | Skill 跨内网困难 |
| 数据合规 | 敏感数据本地处理、不流出 | Skill 难保证数据不出域 |

**MCP 深度访问示例**：

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as fs from "fs/promises";
import * as path from "path";

const server = new Server({
  name: "local-dev-tools",
  version: "1.0.0"
});

// 本地代码库分析
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "analyze-codebase") {
    const projectPath = request.params.arguments.path;

    // 直接访问本地文件系统
    const files = await fs.readdir(projectPath, { recursive: true });
    const codeFiles = files.filter(f => f.endsWith('.ts') || f.endsWith('.py'));

    // 并发读取文件内容（Skill 做不到这么高效）
    const contents = await Promise.all(
      codeFiles.map(f => fs.readFile(path.join(projectPath, f), 'utf-8'))
    );

    return {
      content: [{
        type: "text",
        text: JSON.stringify({ files: codeFiles, totalSize: contents.join('').length })
      }]
    };
  }
});
```

### 三、集中式安全、权限与审计治理

**问题场景**：企业级应用需要统一的安全管控入口。

**典型用例**：

| 治理维度 | MCP 能力 | Skill 的局限性 |
|----------|-----------|----------------|
| 密钥管理 | 统一 API 密钥存储、轮换 | 密钥分散在各 Skill 中 |
| 权限分级 | 基于用户的精细化权限控制 | Skill 难以全局鉴权 |
| �审计 | 统一日志、调用追溯、速率限制 | 日志分散、难以聚合 |
| 合规要求 | 必须通过统一网关管控所有调用 | 调用路径不透明 |
| 多租户隔离 | 租户级别的数据隔离 | Skill 难以实现租户隔离 |

**MCP 权限治理架构**：

```python
class AuthMiddleware:
    """MCP 服务端的统一权限网关"""

    async def __call__(self, request: ToolRequest) -> ToolResponse:
        # 1. 验证用户身份
        user = await self.authenticate(request.headers)

        # 2. 检查工具调用权限
        if not await self.check_permission(user, request.tool_name):
            raise PermissionDenied(f"User {user.id} cannot access {request.tool_name}")

        # 3. 速率限制
        if not await self.check_rate_limit(user):
            raise RateLimitExceeded("Too many requests")

        # 4. 执行并审计
        start_time = time.time()
        try:
            response = await self.execute_tool(request)
            await self.audit_log(user, request, response, duration=time.time() - start_time)
            return response
        except Exception as e:
            await self.audit_error(user, request, e)
            raise
```

### 四、复杂系统 / 多数据源的插拔式集成

**问题场景**：需要接入大量异构系统，实现动态发现和挂载。

**典型用例**：

| 系统类型 | MCP 优势 | Skill 的局限 |
|----------|-----------|-------------|
| 数据库集群 | 动态发现表结构、执行查询 | Skill 需硬编码每个 DB |
| 知识库 | 统一检索接口，可插拔后端 | Skill 难以扩展 |
| 工单系统 | 统一的 CRUD 接口适配多系统 | 需为每个系统写 Skill |
| IM 通道 | 统一消息发送接口 | Skill 通道绑定固定 |
| 第三方 SaaS | Slack、Notion、Jira 统一封装 | 各需要独立 Skill |

**MCP 动态资源发现示例**：

```python
@mcp.list_resources()
async def list_resources() -> list[Resource]:
    """动态发现所有可用的数据源"""
    resources = []

    # 数据库资源动态发现
    for db_config in await discover_databases():
        for table in await list_tables(db_config):
            resources.append(Resource(
                uri=f"db://{db_config.name}/{table}",
                name=f"{db_config.name}.{table}",
                description=f"Table {table} in {db_config.name}",
                mimeType="application/json"
            ))

    # 文件系统资源
    for root, dirs, files in os.walk("/shared/documents"):
        for file in files:
            resources.append(Resource(
                uri=f"file://{os.path.join(root, file)}",
                name=file,
                description=f"Document file",
                mimeType="text/plain"
            ))

    return resources

# AI 可以自主探索和调用这些资源
@mcp.read_resource()
async def read_resource(uri: str) -> str:
    if uri.startswith("db://"):
        return await query_table(uri)
    elif uri.startswith("file://"):
        return await read_file(uri)
```

### 五、真实操作与系统级自动化

**问题场景**：需要执行真实的写操作和跨系统业务流程。

**典型用例**：

| 操作类型 | MCP 能力 | Skill 的局限 |
|----------|-----------|-------------|
| 写操作 | 创建工单、发送消息、更新 CRM | Skill 多为模拟/只读 |
| SQL 执行 | 执行 INSERT/UPDATE/DELETE | Skill 难以执行写 SQL |
| 代码提交 | Git commit/pull request 操作 | Skill 通常无 Git 写权限 |
| 配置修改 | 修改系统配置、环境变量 | Skill 系统权限受限 |
| 跨服务流程 | 跨网络的业务流程编排 | Skill 流程编排能力弱 |
| 运维操作 | 实时监控、告警处理 | Skill 稳定性难以保证 |

**MCP 自动化工作流示例**：

```python
@mcp.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "onboard_new_user":
        """跨系统自动化：新用户入职流程"""

        # 1. 在 HR 系统创建员工记录
        employee_id = await hr_api.create_employee(arguments)

        # 2. 在 AD 域创建账号
        ad_user = await ad_api.create_user({
            "username": arguments["email"].split("@")[0],
            "email": arguments["email"],
            "department": arguments["department"]
        })

        # 3. 在 Jira 创建工单分配设备
        ticket_id = await jira_api.create_ticket({
            "summary": f"设备申请: {arguments['name']}",
            "assignee": "it-support"
        })

        # 4. 在 Slack 发送欢迎消息
        await slack_api.send_message(
            channel="#announcements",
            text=f"欢迎新同事 {arguments['name']} 加入 {arguments['department']}！"
        )

        return [TextContent(type="text", text=f"""
            入职流程完成：
            - 员工ID: {employee_id}
            - AD账号: {ad_user.username}
            - 设备工单: {ticket_id}
        """)]
```

### 六、协议级标准化与生态兼容

**问题场景**：需要构建可插拔、可扩展的 AI 工具生态。

| 标准化维度 | MCP | Skill |
|------------|-----|-------|
| 协议规范 | 强制 JSON-RPC 2.0 接口 | 自定义，无强制标准 |
| 接口约束 | Schema 验证、类型检查 | 自由度极高 |
| 版本兼容 | 明确的版本管理 | 难以保证向后兼容 |
| 互操作性 | 不同 MCP Server 可互换 | Skill 难以替换 |
| 生态扩展 | 第三方可贡献 Server | 生态封闭 |

**MCP 标准化带来的生态价值**：

```typescript
// 任何符合 MCP 标准的 Server 都可以被任何 MCP Client 使用
interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, { type: string; description: string }>;
    required: string[];
  };
}

// 客户端可以动态加载任何 MCP Server
async function loadMCPServer(serverPath: string) {
  const server = spawn(serverPath);
  return new MCPClient(server.stdin, server.stdout);
}

// 生态示例：插件式架构
const pluginRegistry = {
  "filesystem": "/opt/mcp-servers/fileserver",
  "database": "/opt/mcp-servers/dbconnector",
  "cloud-storage": "/opt/mcp-servers/s3-connector"
};

// 用户可以随意替换某个插件，无需修改客户端代码
```

## Skill 的优势场景

虽然 MCP 在上述场景不可替代，但 Skill 在以下领域更有优势：

### 1. 轻量级任务流程编排

**适用场景**：固定模式的任务流程，不需要外部系统访问。

```yaml
# SKILL.md 中的工作流定义
---
name: code-review
description: "Perform code review with standard checklist"
---

## Workflow

1. Read the code file provided by user
2. Check for:
   - Security vulnerabilities
   - Performance issues
   - Code style violations
   - Missing error handling
3. Generate review report in markdown format
4. Suggest specific fixes for each issue found
```

### 2. 知识模板和提示词复用

**适用场景**：需要将特定的知识结构或提示词模式应用到不同的输入。

```
technical-doc-writer/
├── SKILL.md
├── references/
│   ├── api-doc-template.md    # API 文档模板
│   ├── changelog-template.md  # 变更日志模板
│   └── contribution-guide.md  # 贡献指南模板
```

### 3. 平台特定优化

**适用场景**：针对特定平台（如 Claude Code）的深度集成优化。

```yaml
---
name: claude-code-optimization
description: "Claude Code specific workflow optimizations"
---

## Optimization

1. Use Edit tool instead of Write for existing files
2. Batch independent operations together
3. Use TodoWrite for task tracking
4. Follow Git Safety Protocol
```

## 决策流程图

```
                    开始
                      │
                      ▼
            需要扩展 AI 能力？
                  /│\
                 / │ \
               是  │  否
               /   │   \
              ▼    │    不需要扩展
        涉及外部系统？
          /│\
        是 │ 否
        /  │  \
       ▼   │   ▼
  跨平台/跨模型？  固定流程编排？
      │ \      │
      │  \     │ 是
      │   \    │
     是    \   ▼
      │     \  使用 Skill
      │      \
      ▼       \
  需要系统级访问？
      │ \      │
     是  \     │
      │   \    │
      ▼    \   │
  使用 MCP   \  │
              │
           需要统一安全管控？
               /│\
             是 │ 否
             /  │  \
            ▼   │   ▼
      使用 MCP   \  使用 MCP（标准化要求）
                  │
                需要动态资源发现？
                   /│\
                 是 │ 否
                 /  │  \
                ▼   │   ▼
          使用 MCP   \  根据复杂度选择
```

## 实战决策矩阵

| 决策维度 | 权重 | MCP 评分 | Skill 评分 | 推荐选择 |
|----------|------|----------|-----------|----------|
| 跨平台需求 | ⭐⭐⭐⭐⭐ | 5 | 1 | **MCP** |
| 本地访问 | ⭐⭐⭐⭐ | 5 | 2 | **MCP** |
| 安全管控 | ⭐⭐⭐⭐⭐ | 5 | 1 | **MCP** |
| 系统集成 | ⭐⭐⭐⭐ | 5 | 2 | **MCP** |
| 真实操作 | ⭐⭐⭐⭐ | 5 | 2 | **MCP** |
| 标准化 | ⭐⭐⭐ | 5 | 2 | **MCP** |
| 轻量级 | ⭐⭐⭐ | 2 | 5 | Skill |
| 知识复用 | ⭐⭐⭐ | 2 | 5 | Skill |
| 平台优化 | ⭐⭐ | 1 | 5 | Skill |
| 简单性 | ⭐⭐ | 2 | 4 | Skill |

## 混合架构：最佳实践

在实际项目中，MCP 和 Skill 往往是互补而非互斥的：

```
┌─────────────────────────────────────────────────────────┐
│                   AI 客户端                          │
├─────────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────────────────────────────────┐  │
│  │              Skill 层                           │  │
│  │  ┌─────────────┐  ┌─────────────┐            │  │
│  │  │ 审查流程    │  │ 文档生成    │            │  │
│  │  └──────┬──────┘  └──────┬──────┘            │  │
│  │         │                │                      │  │
│  │         └────────┬───────┘                      │  │
│  │                  ▼                              │  │
│  │         调用 MCP 工具                          │  │
│  └──────────────────┬─────────────────────────────┘  │
│                     ▼                                │
│  ┌─────────────────────────────────────────────────┐  │
│  │              MCP 层                            │  │
│  │  ┌─────────────┐  ┌─────────────┐            │  │
│  │  │ Git 操作    │  │ 文件读写    │            │  │
│  │  └─────────────┘  └─────────────┘            │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**示例：代码审查 Skill 调用 MCP Git 工具**

```yaml
---
name: code-review-with-git
description: "Code review that uses MCP Git tools for file operations"
---

## Workflow

1. 使用 MCP 工具获取当前 Git 仓库状态
2. 使用 MCP 工具读取变更的文件内容
3. 在本地执行代码审查分析
4. 生成审查报告
5. 使用 MCP 工具创建 Git commit（如果用户确认）
```

## 一句话判断规则

最终，可以用两个问题快速决策：

**问题一**：这个能力是否涉及"能不能访问、怎么连、谁能连、怎么管"？
- 是 → 用 **MCP**

**问题二**：这个能力主要是关于"怎么做、流程是什么、输出要什么格式"？
- 是 → 用 **Skill**

## 总结

| 方面 | MCP | Skill |
|------|-----|-------|
| **本质** | 连接层协议 | 认知层封装 |
| **强项** | 跨平台、系统访问、安全管控 | 流程编排、知识复用 |
| **适用** | 外部系统集成、企业级应用 | 平台内优化、轻量任务 |
| **关系** | 互补而非互斥 | 互补而非互斥 |

在实际架构设计时，建议：
1. **优先使用 MCP** 处理所有外部系统集成
2. **使用 Skill** 编排任务流程和复用知识模板
3. **混合架构** 充分发挥两者优势

---

## 参考资料

- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Claude Skills Documentation](https://docs.anthropic.com/claude/docs/skills)
- [MCP Server SDK](https://github.com/modelcontextprotocol/servers)
