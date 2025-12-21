---
title: "Vue.js"
description: "5 分钟快速入门 Vue.js 框架"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**是什么**：用于构建用户界面的渐进式 JavaScript 框架。

**为什么用**：学习曲线平缓、响应式数据绑定、优秀的文档、灵活的架构。

## Quick Start

**创建新项目**：
```bash
npm create vue@latest my-app
cd my-app
npm install
npm run dev
```

**或使用 CDN**（快速原型开发）：
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<div id="app">{{ message }}</div>
<script>
  Vue.createApp({
    data() { return { message: 'Hello Vue!' } }
  }).mount('#app')
</script>
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npm create vue@latest` | 创建新 Vue 项目 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |

**模板语法**：
```vue
<template>
  <div>{{ message }}</div>           <!-- 文本插值 -->
  <div v-if="show">Conditional</div> <!-- 条件渲染 -->
  <div v-for="item in items">Loop</div> <!-- 循环 -->
  <button @click="handler">Click</button> <!-- 事件 -->
  <input v-model="text" />           <!-- 双向绑定 -->
</template>
```

## Gotchas

### 对象的响应式

```javascript
// 不会触发更新
this.obj.newProp = 'value'

// 使用响应式赋值
this.obj = { ...this.obj, newProp: 'value' }
```

### Props 是只读的

```vue
<script setup>
const props = defineProps(['title'])
// props.title = 'new' // 错误！Props 是只读的
</script>
```

### ref vs reactive

```javascript
import { ref, reactive } from 'vue'

const count = ref(0)        // 用于基本类型，通过 .value 访问
const state = reactive({})   // 用于对象，不需要 .value
```

## Next Steps

- [Vue 文档](https://cn.vuejs.org/guide/) - 官方指南
- [Vue 教程](https://cn.vuejs.org/tutorial/) - 交互式教程
- [Pinia](https://pinia.vuejs.org/zh/) - 状态管理
- [Vue Router](https://router.vuejs.org/zh/) - 路由
