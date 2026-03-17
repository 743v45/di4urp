+++
date = '2026-03-17T14:30:00+08:00'
draft = true
title = '前端开发词条检索知识树'
description = '前端开发领域核心术语中英文对照速查表，涵盖 JavaScript、CSS、HTML、框架与工程化'
tags = ['frontend', 'glossary', 'javascript', 'css', 'reference']
categories = ['programming']
+++

## 前言

前端开发技术栈庞大，很多技术名词容易混淆或记不住英文名称。本文整理了一份前端开发知识树，包含中英文对照和官方文档链接，方便快速检索。

---

## 一、核心基础 (Core Fundamentals)

### HTML 相关

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| 超文本标记语言 | HyperText Markup Language | HTML | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML) |
| 文档对象模型 | Document Object Model | DOM | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model) |
| 语义化标签 | Semantic Elements | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Semantics) |
| 无障碍访问 | Accessibility | A11Y | [W3C WAI](https://www.w3.org/WAI/) |
| 数据属性 | Data Attributes | data-* | [MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Howto/Use_data_attributes) |
| 模板元素 | Template Element | `<template>` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template) |
| 插槽 | Slot | `<slot>` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot) |

### CSS 相关

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| 层叠样式表 | Cascading Style Sheets | CSS | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS) |
| 盒模型 | Box Model | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model) |
| 弹性盒子布局 | Flexible Box Layout | Flexbox | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout) |
| 网格布局 | Grid Layout | CSS Grid | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout) |
| 定位 | Positioning | position | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) |
| 层叠上下文 | Stacking Context | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) |
| 块级格式化上下文 | Block Formatting Context | BFC | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) |
| 伪类 | Pseudo-class | `:hover` 等 | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) |
| 伪元素 | Pseudo-element | `::before` 等 | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements) |
| 媒体查询 | Media Query | `@media` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries) |
| 自定义属性 | Custom Properties | CSS Variables | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) |
| 层叠层 | Cascade Layers | `@layer` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@layer) |
| 容器查询 | Container Queries | `@container` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Container_Queries) |
| 视图过渡 | View Transitions API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/View_Transitions_API) |

### JavaScript 相关

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| ECMAScript | ECMAScript | ES | [ECMA](https://ecma-international.org/publications-and-standards/standards/ecma-262/) |
| 异步 JavaScript 与 XML | Asynchronous JavaScript and XML | AJAX | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX) |
| Promise | Promise | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) |
| 异步函数 | Async Function | async/await | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) |
| 闭包 | Closure | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures) |
| 原型链 | Prototype Chain | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) |
| 作用域 | Scope | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_closures) |
| 事件循环 | Event Loop | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Event_loop) |
| 任务队列 | Task Queue | Macrotask | [HTML Spec](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops) |
| 微任务队列 | Microtask Queue | Microtask | [HTML Spec](https://html.spec.whatwg.org/multipage/webappapis.html#microtask-queue) |
| 模块 | Module | ES Modules | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules) |
| 类 | Class | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes) |
| 箭头函数 | Arrow Function | `=>` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions) |
| 解构赋值 | Destructuring Assignment | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) |
| 展开运算符 | Spread Syntax | `...` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax) |
| 可选链 | Optional Chaining | `?.` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining) |
| 空值合并 | Nullish Coalescing | `??` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) |
| 代理 | Proxy | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) |
| 反射 | Reflect | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect) |
| 生成器 | Generator | function* | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) |
| 迭代器 | Iterator | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) |
| Map / Set | Map / Set | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) |
| WeakMap / WeakSet | WeakMap / WeakSet | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) |

---

## 二、Web API

### 浏览器 API

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| Fetch API | Fetch API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) |
| Canvas API | Canvas API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) |
| WebGL | WebGL | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) |
| WebGPU | WebGPU | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGPU_API) |
| Web Audio API | Web Audio API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API) |
| Web Speech API | Web Speech API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Speech_API) |
| Geolocation API | Geolocation API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) |
| Notification API | Notification API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API) |
| Service Worker | Service Worker | SW | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) |
| Web Worker | Web Worker | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) |
| IndexedDB | IndexedDB | IDB | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) |
| Web Storage | Web Storage | localStorage/sessionStorage | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) |
| Clipboard API | Clipboard API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API) |
| Intersection Observer | Intersection Observer | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API) |
| Mutation Observer | Mutation Observer | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) |
| Resize Observer | Resize Observer | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) |
| Performance API | Performance API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API) |
| RequestAnimationFrame | RequestAnimationFrame | rAF | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame) |
| WebSocket | WebSocket | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) |
| Server-Sent Events | Server-Sent Events | SSE | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events) |
| Streams API | Streams API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API) |
| Broadcast Channel | Broadcast Channel | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API) |
| Message Channel | Message Channel | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel) |
| File System Access API | File System Access API | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/File_System_Access_API) |
| WebRTC | Web Real-Time Communication | WebRTC | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API) |

---

## 三、框架与库

### React 生态

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| 虚拟 DOM | Virtual DOM | VDOM | [React](https://react.dev/learn/understanding-your-ui-as-a-tree) |
| 函数组件 | Function Component | - | [React](https://react.dev/reference/react) |
| 类组件 | Class Component | - | [React](https://react.dev/reference/react/Component) |
| Hooks | Hooks | - | [React](https://react.dev/reference/react) |
| useState | State Hook | useState | [React](https://react.dev/reference/react/useState) |
| useEffect | Effect Hook | useEffect | [React](https://react.dev/reference/react/useEffect) |
| useContext | Context Hook | useContext | [React](https://react.dev/reference/react/useContext) |
| useReducer | Reducer Hook | useReducer | [React](https://react.dev/reference/react/useReducer) |
| useRef | Ref Hook | useRef | [React](https://react.dev/reference/react/useRef) |
| useMemo | Memo Hook | useMemo | [React](https://react.dev/reference/react/useMemo) |
| useCallback | Callback Hook | useCallback | [React](https://react.dev/reference/react/useCallback) |
| 自定义 Hook | Custom Hook | - | [React](https://react.dev/learn/reusing-logic-with-custom-hooks) |
| Context API | Context API | - | [React](https://react.dev/reference/react/useContext) |
| Redux | Redux | - | [Redux](https://redux.js.org/) |
| Zustand | Zustand | - | [Zustand](https://zustand-demo.pmnd.rs/) |
| Jotai | Jotai | - | [Jotai](https://jotai.org/) |
| React Query | React Query | RQ | [TanStack Query](https://tanstack.com/query/latest) |
| Next.js | Next.js | - | [Next.js](https://nextjs.org/docs) |
| 服务端渲染 | Server-Side Rendering | SSR | [Next.js](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering) |
| 静态生成 | Static Site Generation | SSG | [Next.js](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) |
| 增量静态再生成 | Incremental Static Regeneration | ISR | [Next.js](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) |
| 服务端组件 | Server Component | RSC | [React](https://react.dev/reference/rsc/server-components) |
| 客户端组件 | Client Component | RCC | [React](https://react.dev/reference/rsc/use-client) |

### Vue 生态

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| 响应式系统 | Reactivity System | - | [Vue](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) |
| 组合式 API | Composition API | - | [Vue](https://vuejs.org/guide/extras/composition-api-faq.html) |
| 选项式 API | Options API | - | [Vue](https://vuejs.org/api/options-state.html) |
| ref / reactive | ref / reactive | - | [Vue](https://vuejs.org/api/reactivity-core.html) |
| computed | Computed | - | [Vue](https://vuejs.org/api/reactivity-core.html#computed) |
| watch / watchEffect | watch / watchEffect | - | [Vue](https://vuejs.org/api/reactivity-core.html#watch) |
| 生命周期钩子 | Lifecycle Hooks | - | [Vue](https://vuejs.org/api/composition-api-lifecycle.html) |
| 依赖注入 | Provide / Inject | - | [Vue](https://vuejs.org/api/composition-api-dependency-injection.html) |
| Pinia | Pinia | - | [Pinia](https://pinia.vuejs.org/) |
| Vue Router | Vue Router | - | [Vue Router](https://router.vuejs.org/) |
| Nuxt | Nuxt | - | [Nuxt](https://nuxt.com/docs) |
| 指令 | Directive | v-* | [Vue](https://vuejs.org/guide/essentials/template-syntax.html#directives) |
| 插槽 | Slot | `<slot>` | [Vue](https://vuejs.org/guide/components/slots.html) |
| 传送门 | Teleport | `<Teleport>` | [Vue](https://vuejs.org/guide/built-ins/teleport.html) |
| 过渡动画 | Transition | `<Transition>` | [Vue](https://vuejs.org/guide/built-ins/transition.html) |
| KeepAlive | KeepAlive | `<KeepAlive>` | [Vue](https://vuejs.org/guide/built-ins/keep-alive.html) |
| Suspense | Suspense | `<Suspense>` | [Vue](https://vuejs.org/guide/built-ins/suspense.html) |

### 其他框架

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| Angular | Angular | - | [Angular](https://angular.io/docs) |
| Svelte | Svelte | - | [Svelte](https://svelte.dev/docs) |
| SolidJS | SolidJS | - | [Solid](https://docs.solidjs.com/) |
| Preact | Preact | - | [Preact](https://preactjs.com/guide/v10/getting-started) |
| Astro | Astro | - | [Astro](https://docs.astro.build/) |
| Remix | Remix | - | [Remix](https://remix.run/docs) |

---

## 四、构建工具与工程化

### 构建工具

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| 模块打包器 | Module Bundler | Bundler | - |
| Webpack | Webpack | - | [Webpack](https://webpack.js.org/concepts/) |
| Vite | Vite | - | [Vite](https://vitejs.dev/guide/) |
| Rollup | Rollup | - | [Rollup](https://rollupjs.org/introduction/) |
| esbuild | esbuild | - | [esbuild](https://esbuild.github.io/) |
| Turbopack | Turbopack | - | [Turbopack](https://turbo.build/pack/docs) |
| Rspack | Rspack | - | [Rspack](https://rspack.dev/guide/) |
| Parcel | Parcel | - | [Parcel](https://parceljs.org/) |
| Browserify | Browserify | - | [Browserify](https://browserify.org/) |

### 包管理器

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| npm | npm | - | [npm](https://docs.npmjs.com/) |
| Yarn | Yarn | - | [Yarn](https://yarnpkg.com/getting-started) |
| pnpm | pnpm | - | [pnpm](https://pnpm.io/) |
| Bun | Bun | - | [Bun](https://bun.sh/docs) |

### 模块规范

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| ES Modules | ECMAScript Modules | ESM | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules) |
| CommonJS | CommonJS | CJS | [CommonJS](https://commonjs.org/) |
| Universal Module Definition | UMD | UMD | [UMD](https://github.com/umdjs/umd) |
| AMD | Asynchronous Module Definition | AMD | [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) |

### 代码规范

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| ESLint | ESLint | - | [ESLint](https://eslint.org/docs/latest/) |
| Prettier | Prettier | - | [Prettier](https://prettier.io/docs/en/) |
| Stylelint | Stylelint | - | [Stylelint](https://stylelint.io/) |
| TypeScript | TypeScript | TS | [TypeScript](https://www.typescriptlang.org/docs/) |
| 类型声明 | Type Declaration | .d.ts | [TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html) |
| DefinitelyTyped | DefinitelyTyped | @types/* | [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) |

---

## 五、CSS 方案

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| Tailwind CSS | Tailwind CSS | - | [Tailwind](https://tailwindcss.com/docs) |
| Sass / SCSS | Sass / SCSS | - | [Sass](https://sass-lang.com/documentation) |
| Less | Less | - | [Less](https://lesscss.org/) |
| PostCSS | PostCSS | - | [PostCSS](https://postcss.org/) |
| CSS-in-JS | CSS-in-JS | - | - |
| Styled Components | Styled Components | - | [Styled Components](https://styled-components.com/docs) |
| Emotion | Emotion | - | [Emotion](https://emotion.sh/docs) |
| styled-jsx | styled-jsx | - | [styled-jsx](https://styled-jsx.github.io/docs) |
| CSS Modules | CSS Modules | - | [CSS Modules](https://github.com/css-modules/css-modules) |
| UnoCSS | UnoCSS | - | [UnoCSS](https://unocss.dev/) |
| Windi CSS | Windi CSS | - | [Windi CSS](https://windicss.org/) (已归档) |

---

## 六、测试

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| Jest | Jest | - | [Jest](https://jestjs.io/docs/getting-started) |
| Vitest | Vitest | - | [Vitest](https://vitest.dev/) |
| Testing Library | Testing Library | RTL/VTL | [Testing Library](https://testing-library.com/docs) |
| Cypress | Cypress | - | [Cypress](https://docs.cypress.io/) |
| Playwright | Playwright | - | [Playwright](https://playwright.dev/) |
| Puppeteer | Puppeteer | - | [Puppeteer](https://pptr.dev/) |
| MSW | Mock Service Worker | MSW | [MSW](https://mswjs.io/docs) |
| Storybook | Storybook | - | [Storybook](https://storybook.js.org/docs) |

---

## 七、性能优化

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| 核心网页指标 | Core Web Vitals | CWV | [Web Vitals](https://web.dev/articles/vitals) |
| 最大内容绘制 | Largest Contentful Paint | LCP | [LCP](https://web.dev/articles/lcp) |
| 首次输入延迟 | Interaction to Next Paint | INP | [INP](https://web.dev/articles/inp) |
| 累积布局偏移 | Cumulative Layout Shift | CLS | [CLS](https://web.dev/articles/cls) |
| 首次内容绘制 | First Contentful Paint | FCP | [FCP](https://web.dev/articles/fcp) |
| 首次字节时间 | Time to First Byte | TTFB | [TTFB](https://web.dev/articles/ttfb) |
| 首次绘制 | First Paint | FP | [FP](https://web.dev/articles/fcp) |
| 代码分割 | Code Splitting | - | [Webpack](https://webpack.js.org/guides/code-splitting/) |
| 懒加载 | Lazy Loading | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Performance/Lazy_loading) |
| 预加载 | Preload | `<link rel="preload">` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel/preload) |
| 预连接 | Preconnect | `<link rel="preconnect">` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel/preconnect) |
| 预取 | Prefetch | `<link rel="prefetch">` | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel/prefetch) |
| 优先获取 | Prerender | - | [Chrome](https://developer.chrome.com/docs/web-platform/prerender-pages) |
| Tree Shaking | Tree Shaking | - | [Webpack](https://webpack.js.org/guides/tree-shaking/) |
| 压缩 | Minification | - | - |
| 混淆 | Obfuscation | - | - |
| Gzip / Brotli | Compression | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Compression) |
| 缓存策略 | Caching Strategy | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching) |
| CDN | Content Delivery Network | CDN | - |
| Service Worker 缓存 | Service Worker Caching | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers) |

---

## 八、网络与协议

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| 超文本传输协议 | Hypertext Transfer Protocol | HTTP | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) |
| HTTP/2 | HTTP/2 | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Protocol_upgrade_mechanism) |
| HTTP/3 | HTTP/3 | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) |
| HTTPS | HTTPS | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/HTTPS) |
| CORS | Cross-Origin Resource Sharing | CORS | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS) |
| Same-Origin Policy | Same-Origin Policy | SOP | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy) |
| CSP | Content Security Policy | CSP | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) |
| HSTS | HTTP Strict Transport Security | HSTS | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Strict-Transport-Security) |
| X-Frame-Options | X-Frame-Options | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Frame-Options) |
| Cookie | Cookie | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies) |
| Session Storage | Session Storage | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage) |
| Local Storage | Local Storage | - | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) |

---

## 九、开发工具

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| Chrome DevTools | Chrome DevTools | - | [Chrome](https://developer.chrome.com/docs/devtools/) |
| Firefox Developer Tools | Firefox Developer Tools | - | [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/) |
| React Developer Tools | React DevTools | - | [React](https://react.dev/learn/react-developer-tools) |
| Vue Devtools | Vue Devtools | - | [Vue](https://devtools.vuejs.org/) |
| Lighthouse | Lighthouse | - | [Lighthouse](https://developer.chrome.com/docs/lighthouse/) |
| WebPageTest | WebPageTest | - | [WebPageTest](https://www.webpagetest.org/) |
| PageSpeed Insights | PageSpeed Insights | PSI | [PSI](https://pagespeed.web.dev/) |

---

## 十、设计系统与 UI 库

### 设计系统

| 中文名称 | 英文名称 | 官方文档 |
|---------|---------|---------|
| Material Design | Material Design | [Material](https://m3.material.io/) |
| Ant Design | Ant Design | [Ant Design](https://ant.design/docs/spec/introduce) |
| Human Interface Guidelines | HIG | [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) |
| Fluent Design | Fluent Design | [Fluent](https://www.fluent2.microsoft.design/) |
| Carbon Design System | Carbon Design | [Carbon](https://carbondesignsystem.com/) |
| Atlassian Design Guidelines | ADG | [Atlassian](https://atlassian.design/) |

### React UI 库

| 中文名称 | 英文名称 | 官方文档 |
|---------|---------|---------|
| Ant Design | Ant Design | [Ant Design](https://ant.design/components/overview/) |
| Material-UI | MUI | [MUI](https://mui.com/material-ui/) |
| Chakra UI | Chakra UI | [Chakra](https://v2.chakra-ui.com/docs/getting-started) |
| shadcn/ui | shadcn/ui | [shadcn/ui](https://ui.shadcn.com/) |
| Radix UI | Radix UI | [Radix](https://www.radix-ui.com/primitives/docs/overview/introduction) |
| Headless UI | Headless UI | [Headless UI](https://headlessui.com/) |
| Arco Design | Arco Design | [Arco Design](https://arco.design/react/docs/start) |
| Semi Design | Semi Design | [Semi Design](https://semi.design/) |

### Vue UI 库

| 中文名称 | 英文名称 | 官方文档 |
|---------|---------|---------|
| Element Plus | Element Plus | [Element Plus](https://element-plus.org/) |
| Ant Design Vue | Ant Design Vue | [Ant Design Vue](https://www.antdv.com/) |
| Naive UI | Naive UI | [Naive UI](https://www.naiveui.com/) |
| Vuetify | Vuetify | [Vuetify](https://vuetifyjs.com/) |
| Arco Design Vue | Arco Design Vue | [Arco Vue](https://arco.design/vue/docs/start) |

---

## 十一、状态管理方案

| 中文名称 | 英文名称 | 简称 | 官方文档 |
|---------|---------|------|---------|
| Redux | Redux | - | [Redux](https://redux.js.org/) |
| Zustand | Zustand | - | [Zustand](https://zustand-demo.pmnd.rs/) |
| Jotai | Jotai | - | [Jotai](https://jotai.org/) |
| Recoil | Recoil | - | [Recoil](https://recoiljs.org/) |
| Pinia | Pinia | - | [Pinia](https://pinia.vuejs.org/) |
| MobX | MobX | - | [MobX](https://mobx.js.org/) |
| Valtio | Valtio | - | [Valtio](https://valtio.pmnd.rs/) |
| XState | XState | - | [XState](https://stately.ai/docs) |

---

## 十二、常用设计模式

| 中文名称 | 英文名称 | 说明 |
|---------|---------|------|
| 单例模式 | Singleton Pattern | 确保一个类只有一个实例 |
| 工厂模式 | Factory Pattern | 创建对象时不暴露创建逻辑 |
| 观察者模式 | Observer Pattern | 对象间一对多依赖关系 |
| 发布订阅模式 | Pub-Sub Pattern | 解耦的观察者模式 |
| 策略模式 | Strategy Pattern | 定义算法族，可互相替换 |
| 装饰器模式 | Decorator Pattern | 动态添加对象职责 |
| 代理模式 | Proxy Pattern | 控制对对象的访问 |
| 组合模式 | Composite Pattern | 树形结构对象组合 |
| 模板方法模式 | Template Method Pattern | 定义算法骨架，子类实现 |
| HOC | Higher-Order Component | 高阶组件（React） |
| Render Props | Render Props | 渲染 props 模式 |
| Compound Components | Compound Components | 复合组件模式 |
| Controlled / Uncontrolled | Controlled / Uncontrolled | 受控/非受控组件 |

---

## 结语

本文持续更新中，如需补充或修正，欢迎反馈。

**建议收藏此页面**，在开发过程中遇到叫不出的术语时，可以快速检索。
