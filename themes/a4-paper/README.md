# A4 Paper — Hugo Theme

A4 纸张风格的 Hugo 博客主题，中文优先排版。

## 设计要求

### 核心视觉

- **A4 纸张**：每张纸固定 794x1123px（A4 at 96dpi），`height: var(--a4-height)` + `overflow: hidden` + `display: flex; flex-direction: column`
- **纸张阴影**：5 层指数级 `box-shadow`，底部 `::before` / `::after` 伪元素模拟堆叠纸边
- **桌面背景**：浅灰暖色 `#e8e6e1`（纸张底色感）
- **纸张背景**：`#fefefe`（暖白）
- **页码**：每页底部显示 `© 年份 作者 X / Y`

### A4 分页规则

- JS（`paginate.js`）自动将内容分发到多张 A4 纸上
- `getMaxContentHeight()` 动态计算可用内容高度（扣除 padding、footer、首页 site-header）
- 元素不截断：如果当前页放不下一个完整元素，整个元素移到下一页
- `.page-content { flex: 1 1 auto }` + `.page-footer` 流式布局（非绝对定位）
- 博客列表页：所有文章连续排列，按月份有标题分隔，自动分页
- 文章页：长文章自动分成多张 A4 纸，标题+日期+标签在第一页
- 首页：单张纸，grid 布局（内容 + sidebar）
- 移动端：取消固定高度，`min-height: auto`，`box-shadow: none`

### 排版

| 属性 | 值 | 说明 |
|------|------|------|
| 正文字体 | LXGW WenKai, PingFang SC, Microsoft YaHei, Noto Sans CJK SC | 霞鹜文楷优先，系统字体回退 |
| 标题字体 | Noto Sans SC, PingFang SC, Microsoft YaHei | 无衬线 |
| 等宽字体 | LXGW WenKai Mono, JetBrains Mono, Fira Code, Menlo | 代码 |
| 字号 | 17px | 中文笔画多，需比英文大 |
| 行高 | 1.75 | CJK 最佳 |
| 字间距 | 0.03em | 少量间距提升阅读性 |
| 内容宽度 | 36em | 每行 30-40 字 |
| 对齐 | `justify` + `text-justify: inter-ideograph` | 中文两端对齐 |

字体 CDN：`https://cdn.jsdelivr.net/npm/lxgw-wenkai-web-font@1.1.0/style.css`

### Markdown 样式

- **标题**：h1 带底部分隔线，h2-h4 无衬线字体
- **代码块**：深色背景 `#1e293b`，圆角 6px，`overflow-x: auto`
- **行内 code**：浅灰背景，红色文字 `#d73a49`，圆角 3px
- **表格**：`width: 100%`，hover 行高亮，`overflow-x: auto`
- **引用块**：4px 左边框 + 圆角，浅色背景
- **图片**：`max-width: 100%`，居中，圆角 4px
- **链接**：无下划线，hover 显示下划线，蓝色
- **分隔线**：1px `background` 色线
- **任务列表**：复选框样式
- **脚注**：goldmark 原生渲染
- **粗体/斜体**：直接渲染，不做 post-process（如 emphasis dots、chinese bold 替换等）

### Markdown 安全要点

- `{{ .Content }}` 直接输出，**不做任何** `replaceRE` / `safeHTML` / 正则替换
- TOC 用 Hugo 原生 `.TableOfContents`
- 不做 emphasis dots 等特殊处理
- 这是为了防止 markdown 解析异常

### 暗色模式

- CSS 变量同时支持 `prefers-color-scheme` 媒体查询和 `data-theme` 属性
- 手动切换：JS 设置 `data-theme="dark"` 或 `data-theme="light"`，存入 `localStorage`
- 当 `localStorage` 为 `"light"` 时，设置 `data-theme="light"` 而非移除属性（防止系统暗色偏好覆盖用户选择）
- 切换按钮：月亮/太阳 SVG 图标，在 header 导航栏右侧

### 首页

- 保留 grid 双栏布局（左侧内容 + 右侧 sidebar 分类/标签）
- 单张 `.paper` 容器

### 博客列表页

- 所有文章连续排列（不分月分纸）
- 月份标题 `h3.month-heading` 作为视觉分隔
- JS 自动分页到 A4 纸

### 文章页

- 第一页：header + 返回链接 + 标题 + 日期 + 标签 + TOC + 正文开头
- 后续页：正文内容继续
- 上下篇导航在最后一页

## 依赖

- Hugo >= 0.120.0
- **无** Sass/PostCSS/node_modules 依赖
- 纯 CSS + 原生 JS
- 外部字体：LXGW WenKai via jsDelivr CDN

## 文件结构

```
themes/a4-paper/
├── assets/
│   ├── css/main.css          # 全部样式（CSS 变量 + A4 纸张 + 排版 + 暗色）
│   └── js/paginate.js        # A4 分页逻辑
├── layouts/
│   ├── _default/
│   │   ├── baseof.html       # 骨架（无 paper 包裹）
│   │   ├── single.html       # 文章页（JS 分页）
│   │   ├── list.html         # 列表页（JS 分页）
│   │   └── rss.xml
│   ├── partials/
│   │   ├── head.html         # meta + 字体 CDN + CSS
│   │   ├── header.html       # 站点标题 + 导航 + 暗色切换
│   │   └── footer.html       # 版权
│   ├── index.html            # 首页（单纸 grid）
│   ├── 404.html
│   ├── tags/terms.html
│   └── categories/terms.html
├── static/
└── theme.toml
```

## 配置

```toml
theme = 'a4-paper'

[params]
  author = "your-name"
  description = "Your blog description"
  authorEmail = "your@email.com"

[taxonomies]
  tags = "tags"
  categories = "categories"
```
