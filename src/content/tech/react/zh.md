---
title: "React"
description: "用组件构建交互式 UI - 声明式、高效、灵活的 JavaScript 前端库"
template: "framework"
tags: ["frontend", "javascript", "ui"]
---

## TL;DR

**一句话**：React 是用组件搭建 UI 的 JavaScript 库——Web 开发的乐高积木。

**核心优势**：
- 组件化 - 写一次，到处复用
- 虚拟 DOM - 快速更新，不直接操作真实 DOM
- Hooks - 优雅的状态和生命周期管理
- 生态庞大 - React Native、Next.js 和无数库

## Core Concepts

### 概念 1：组件

React 中一切都是组件。组件就是返回 JSX（JavaScript 中的类 HTML 语法）的函数。

```jsx
function Welcome({ name }) {
  return <h1>你好, {name}!</h1>;
}

// 像 HTML 一样使用
<Welcome name="小明" />
```

### 概念 2：State 与 Props

**Props** = 父组件传给子组件的数据（只读）
**State** = 组件内部管理的数据（可变）

```jsx
function Counter() {
  const [count, setCount] = useState(0);  // State
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 概念 3：单向数据流

数据通过 props 从父组件流向子组件。子组件不能直接修改父组件的数据——只能调用父组件传下来的回调函数。

## Quick Start

### 创建项目

```bash
# 使用 Vite（推荐）
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### 项目结构

```
my-app/
├── src/
│   ├── App.jsx       # 根组件
│   ├── main.jsx      # 入口文件
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

### 最小示例

```jsx
// src/App.jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello React!</h1>
      <button onClick={() => setCount(count + 1)}>
        计数: {count}
      </button>
    </div>
  );
}

export default App;
```

### 运行

```bash
npm run dev
# 打开 http://localhost:5173
```

## Gotchas

### 组件名必须大写

```jsx
// ❌ 错误 - 会被当成 HTML 标签
function myButton() { return <button>Hi</button> }

// ✅ 正确
function MyButton() { return <button>Hi</button> }
```

### 传函数引用，不要调用

```jsx
// ❌ 错误 - 渲染时立即执行
<button onClick={handleClick()}>

// ✅ 正确 - 传引用
<button onClick={handleClick}>

// ✅ 带参数
<button onClick={() => handleClick(id)}>
```

### 状态更新是异步的

```jsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);  // 还是 0！状态在下次渲染才更新
}

// 连续更新用函数形式
setCount(c => c + 1);
setCount(c => c + 1);  // 正确加 2
```

### 状态不可变

```jsx
// ❌ 错误 - 直接修改状态
user.name = '新名字';
setUser(user);  // React 不会重新渲染！

// ✅ 正确 - 创建新对象
setUser({ ...user, name: '新名字' });

// 数组操作
setItems([...items, newItem]);  // 添加
setItems(items.filter(i => i.id !== id));  // 删除
```

## When to Use

**适合**：
- 单页应用（SPA）
- 复杂交互式 UI
- 需要组件复用的团队
- 需要强大生态支持的项目

**不适合**：
- 简单静态站点（用 Astro、Hugo）
- 没有 SSR 的 SEO 关键站点（用 Next.js）
- 非常小的项目（原生 JS 就够了）

**对比**：
| 特性 | React | Vue | Angular |
|------|-------|-----|---------|
| 学习曲线 | 中等 | 简单 | 陡峭 |
| 体积 | 40KB | 30KB | 150KB+ |
| 定位 | 库 | 框架 | 全功能框架 |
| 灵活性 | 高 | 中等 | 有主见 |

## Next Steps

- [React 官方教程](https://react.dev/learn)
- [React Hooks 参考](https://react.dev/reference/react/hooks)
- [Next.js](https://nextjs.org/) - 全栈 React 框架
- [React Router](https://reactrouter.com/) - 客户端路由

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 组件 | `function Name() { return <div>...</div> }` |
| Props | `function Card({ title }) { ... }` |
| 状态 | `const [val, setVal] = useState(initial)` |
| 副作用 | `useEffect(() => { ... }, [deps])` |
| Ref | `const ref = useRef(null)` |
| Context | `const val = useContext(MyContext)` |
| 条件渲染 | `{show && <Component />}` |
| 列表渲染 | `{items.map(i => <Item key={i.id} />)}` |
| 事件 | `onClick={fn}` / `onChange={fn}` |
