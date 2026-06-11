+++
date = '2026-06-11T23:45:00+08:00'
draft = false
title = 'Claude Code /loop 新手使用手册'
description = 'Claude Code 内置定时循环命令 /loop 的完整使用指南，涵盖语法、间隔格式、两种模式、相关工具和实战示例'
tags = ['Claude Code', 'loop', 'CLI', '定时任务']
categories = ['AI 工具']
+++

## 什么是 /loop

`/loop` 是 Claude Code 内置的定时循环命令。它可以让你设定一个间隔，让 Claude 自动重复执行某个提示词或斜杠命令。

简单理解：**一个会自动重复跑的 prompt。**

---

## 基本语法

```
/loop [interval] <prompt>
```

| 参数 | 说明 |
|------|------|
| `interval` | 可选。时间间隔，如 `5m`、`2h`、`1d` |
| `prompt` | 要循环执行的内容，可以是普通文字或 `/slash-command` |

如果不写间隔，默认 **10 分钟**。

---

## 间隔格式

支持四种时间单位：

| 后缀 | 含义 | 示例 |
|------|------|------|
| `s` | 秒（向上取整到分钟） | `30s` → 1 分钟 |
| `m` | 分钟 | `5m` → 每 5 分钟 |
| `h` | 小时 | `2h` → 每 2 小时 |
| `d` | 天 | `1d` → 每天午夜 |

### 解析规则

按优先级依次匹配：

1. **开头带单位**：`5m check status` → 间隔 `5m`，prompt 是 `check status`
2. **末尾带 every**：`check deploy every 20m` → 间隔 `20m`，prompt 是 `check deploy`
3. **默认**：无匹配 → 间隔 `10m`，整段文字作为 prompt

注意：`check every PR` 中 `every` 后面不是时间表达式，走默认规则。

### 不能整除的间隔

`7m` → `*/7` 在 :56→:00 处会产生不均匀间隔，系统会自动取最近的规整值并告知你。

---

## 两种模式

### 1. CronCreate 模式（有间隔）

```
/loop 10m say hi
```

走 cron 定时触发。适合固定节奏的重复任务。

底层调用 `CronCreate`，生成标准 cron 表达式。

### 2. Dynamic 模式（无间隔）

`/loop` 不带间隔参数时，agent 通过 `ScheduleWakeup` 自行决定下次唤醒时间，适合需要根据运行结果动态调整节奏的场景。

---

## 相关工具一览

| 工具 | 用途 |
|------|------|
| `CronCreate` | 创建定时任务（recurring / one-shot） |
| `CronDelete` | 取消已创建的任务 |
| `CronList` | 查看所有活跃任务 |
| `ScheduleWakeup` | 动态模式下的自调度唤醒 |

### CronCreate 参数

```
CronCreate({
  cron: "*/5 * * * *",     // 标准 5 字段 cron 表达式
  prompt: "check status",   // 要执行的 prompt
  recurring: true,          // true=循环, false=一次性
  durable: false            // true=写入磁盘跨会话持久
})
```

### CronDelete

```
CronDelete({ id: "3cbc6b18" })  // 传入 CronCreate 返回的 job ID
```

### CronList

```
CronList()  // 返回所有当前活跃的定时任务
```

---

## 实战示例

### 每 5 分钟检查部署状态

```
/loop 5m 检查部署状态，如果失败就通知我
```

### 每小时跑测试

```
/loop 1h run tests
```

### 每 30 分钟 babysit PR

```
/loop 30m /babysit-prs
```

### 一次性提醒

不用 `/loop`，直接用 `CronCreate` 的 `recurring: false`：

```
CronCreate({
  cron: "30 14 12 6 *",    // 6月12日 14:30
  prompt: "提醒我检查发布",
  recurring: false
})
```

---

## 注意事项

1. **自动过期**：recurring 任务 7 天后自动停止
2. **会话绑定**：默认任务仅在当前会话存活，退出 Claude 就没了；需要跨会话用 `durable: true`
3. **首次执行**：`/loop` 创建后立即执行一次，不用等第一个 cron 周期
4. **取消任务**：用 `CronDelete` + job ID，job ID 在创建时返回
5. **避免 :00 和 :30**：系统会自动加抖动（jitter），无需手动避开

---

## 快速参考卡

```
# 基本用法
/loop 5m check the deploy        → 每 5 分钟检查部署
/loop 1h run tests               → 每小时跑测试
/loop check status every 20m     → 每 20 分钟检查状态

# 查看任务
→ CronList()

# 取消任务
→ CronDelete({ id: "your-job-id" })

# 默认间隔
/loop do something               → 每 10 分钟
```

---

## 总结

`/loop` 本质就是 **cron + prompt 的结合体**。记住五个工具（CronCreate / CronDelete / CronList / ScheduleWakeup + `/loop` skill），一个解析规则（开头单位 > 末尾 every > 默认 10m），就够用了。
