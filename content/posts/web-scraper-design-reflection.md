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

```typescript
// 基础
await page.goto(url);
await page.locator('selector').click();
await page.locator('input').fill('text');
const text = await page.locator('.class').textContent();

// 等待
await page.waitForSelector('.class');
await page.waitForLoadState('networkidle');

// 提取
const items = await page.locator('.item').allTextContents();
const html = await page.locator('.container').innerHTML();
const attr = await page.locator('a').getAttribute('href');

// 截图调试
await page.screenshot({ path: 'debug.png', fullPage: true });
```

## 总结

产品对着 CRM 告知需要哪些数据。并没有快速聚合的方式，且数据落在不同的数据库，很难聚合。

对后端来说，快速提取业务数据，通过爬虫的方式从数据源直接提取。不需要根据数据源反推数据库中的形式。实现比找前后端代码和数据库快多了。

> 用户看到什么，就提取什么。简单，直接。
