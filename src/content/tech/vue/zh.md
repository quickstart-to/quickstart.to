---
title: "Vue.js"
description: "渐进式 JavaScript 框架 - 响应式数据驱动，从简单组件到复杂单页应用自如扩展"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**一句话**：Vue 是渐进式 JavaScript 框架——从简单开始，可扩展到复杂。

**核心优势**：
- 学习曲线平缓 - 三大框架里最容易上手
- 默认响应式 - 数据变了，UI 自动更新
- 单文件组件 - HTML、JS、CSS 都在一个 .vue 文件里
- 文档优秀 - 可以说是生态里最好的

## Core Concepts

### 概念 1：响应式

Vue 自动追踪数据依赖。改变数据，DOM 自动更新。

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)  // 响应式引用
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

### 概念 2：单文件组件（SFC）

组件的一切都在一个 `.vue` 文件里：

```vue
<script setup>
// JavaScript 逻辑
</script>

<template>
  <!-- HTML 模板 -->
</template>

<style scoped>
/* CSS 样式（作用域限定在这个组件） */
</style>
```

### 概念 3：组合式 API

Vue 3 的现代组织方式——把相关逻辑放在一起，而不是按选项类型拆分。

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

// 相关逻辑放在一起
const count = ref(0)
const doubled = computed(() => count.value * 2)
onMounted(() => console.log('Ready!'))
</script>
```

## Quick Start

### 创建项目

```bash
npm create vue@latest my-app
cd my-app
npm install
npm run dev
```

### 项目结构

```
my-app/
├── src/
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── components/     # 组件目录
├── index.html
├── package.json
└── vite.config.js
```

### 最小示例

```vue
<!-- src/App.vue -->
<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue!')
const count = ref(0)
</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="count++">计数: {{ count }}</button>
</template>
```

### 运行

```bash
npm run dev
# 打开 http://localhost:5173
```

## Gotchas

### JS 里要 .value，模板里不用

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)

// JS 里要用 .value
console.log(count.value)
count.value++
</script>

<template>
  <!-- 模板里不需要 .value -->
  <span>{{ count }}</span>
</template>
```

### ref vs reactive

```javascript
import { ref, reactive } from 'vue'

// ref - 用于基本类型（或任何类型）
const count = ref(0)           // 访问：count.value
const user = ref({ name: '' }) // 访问：user.value.name

// reactive - 只能用于对象（不需要 .value）
const state = reactive({ count: 0 })  // 访问：state.count
```

### Props 是只读的

```vue
<script setup>
const props = defineProps(['title'])
// props.title = 'new'  // ❌ 错误！不能修改 props

// ✅ 应该 emit 事件给父组件
const emit = defineEmits(['update'])
emit('update', 'new value')
</script>
```

### v-if vs v-show

```vue
<!-- v-if：真的从 DOM 中移除/添加元素 -->
<div v-if="show">切换代价高</div>

<!-- v-show：只是切换 CSS display 属性 -->
<div v-show="show">切换代价低</div>
```

## When to Use

**适合**：
- 学习第一个框架的团队
- 从小项目开始可能会扩大的项目
- 喜欢清晰有主见结构的开发者
- 快速原型开发

**不适合**：
- 已经投入 React/Angular 的团队
- 需要最大就业市场选择（React 领先）
- 非常大的企业应用（Angular 可能更合适）

**对比**：
| 特性 | Vue | React | Angular |
|------|-----|-------|---------|
| 学习曲线 | 简单 | 中等 | 陡峭 |
| 模板风格 | 基于 HTML | JSX | 基于 HTML |
| 状态管理 | Pinia（官方）| 选择多 | RxJS |
| 体积 | 30KB | 40KB | 150KB+ |

## Next Steps

- [Vue 文档](https://cn.vuejs.org/guide/)
- [Vue 教程](https://cn.vuejs.org/tutorial/)
- [Pinia](https://pinia.vuejs.org/zh/) - 状态管理
- [Vue Router](https://router.vuejs.org/zh/) - 路由
- [Nuxt](https://nuxt.com/) - 全栈 Vue 框架

## Cheatsheet

| 模式 | 语法 |
|------|------|
| 文本 | `{{ message }}` |
| 属性 | `:href="url"` 或 `v-bind:href` |
| 事件 | `@click="fn"` 或 `v-on:click` |
| 双向绑定 | `v-model="text"` |
| 条件 | `v-if` / `v-else-if` / `v-else` |
| 显示隐藏 | `v-show="bool"` |
| 列表 | `v-for="item in items" :key="item.id"` |
| Ref | `const x = ref(0)` → `x.value` |
| 计算属性 | `const x = computed(() => ...)` |
| 监听 | `watch(source, callback)` |
