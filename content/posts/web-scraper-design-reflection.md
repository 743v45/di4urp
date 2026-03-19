+++
date = 2026-03-19T12:00:00+08:00
draft = false
title = '由需求反思爬虫设计：所见即所提取'
tags = ['爬虫', 'Playwright', '架构']
categories = ['技术思考']
+++

## 场景

需要提取一个业务数据表格。

**传统思路的困境：**
- 数据分散在多个数据库
- 前端有数据处理逻辑
- 多个后端服务都会修改数据
- 要理清数据流转简直噩梦

**换个思路：**
用户在页面上看到的就是最终结果，直接提取不就行了？

## 所见即所提取

与其追着数据源头跑，不如直接拿最终渲染结果。

```typescript
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('https://example.com/data-page');

// 直接提取表格内容
const rows = await page.locator('table tbody tr').all();

const data = await Promise.all(rows.map(async row => {
  const cells = await row.locator('td').allTextContents();
  return cells;
}));

await browser.close();

console.log(data); // 拿到了
```

**优势：**
- 快速：几分钟搞定
- 稳定：页面结构变化比数据流逻辑变化慢得多
- 简单：不需要理解业务，不需要申请数据库权限

## Playwright 常用速记

### 启动（带状态保持）

```typescript
// 推荐：launchPersistentContext 保留登录状态和 cookies
const context = await chromium.launchPersistentContext(
  '/tmp/playwright-profile',  // 用户数据目录
  {
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false,           // 显示浏览器窗口
    slowMo: 500,               // 操作减速，方便观察
    channel: 'chrome',         // 使用 Chrome 而非 Chromium
  }
);
const page = context.pages()[0] || await context.newPage();
```

### 基础操作

```typescript
// 导航
await page.goto(url, { waitUntil: 'networkidle' });

// 交互
await page.locator('selector').click();
await page.locator('input').fill('text');
await page.locator('select').selectOption('value');

// 提取
const text = await page.locator('.class').textContent();
const items = await page.locator('.item').allTextContents();
const html = await page.locator('.container').innerHTML();
const attr = await page.locator('a').getAttribute('href');

// 等待
await page.waitForSelector('.class', { state: 'visible' });
await page.waitForLoadState('networkidle');
await page.waitForTimeout(1000);  // 固定延迟（不推荐但有时必要）

// 截图调试
await page.screenshot({ path: 'debug.png', fullPage: true });
```

### 实用选项

```typescript
// 设置视口
await page.setViewportSize({ width: 1920, height: 1080 });

// 拦截请求（屏蔽图片等）
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());

// 执行自定义脚本
await page.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => false });
});
```

## 总结

产品对着 CRM 告知需要哪些数据。并没有快速聚合的方式，且数据落在不同的数据库，很难聚合。

对后端来说，快速提取业务数据，通过爬虫的方式从数据源直接提取。不需要根据数据源反推数据库中的形式。实现比找前后端代码和数据库快多了。

> 用户看到什么，就提取什么。简单，直接。
