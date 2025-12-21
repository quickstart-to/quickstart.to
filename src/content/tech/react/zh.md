---
title: "React"
description: "快速入门 React 构建用户界面"
tags: ["frontend", "javascript", "ui"]
---

## TL;DR

**是什么**：用于构建可复用组件的 JavaScript UI 库。

**为什么**：组件化架构、虚拟 DOM 提升性能、生态系统庞大。

## Quick Start

**创建新项目**：

```bash
npx create-react-app my-app
cd my-app
npm start
```

或使用 Vite（推荐，速度更快）：
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

**第一个组件**：

```jsx
// src/App.jsx
function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <MyButton />
    </div>
  );
}

function MyButton() {
  return <button>点击我</button>;
}

export default App;
```

**添加状态**：

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      点击了 {count} 次
    </button>
  );
}
```

## Cheatsheet

| 概念 | 语法 |
|------|------|
| 组件 | `function Name() { return <div>...</div> }` |
| Props | `function Card({ title }) { return <h1>{title}</h1> }` |
| 状态 | `const [val, setVal] = useState(initial)` |
| 副作用 | `useEffect(() => { ... }, [deps])` |
| 事件 | `onClick={handleClick}` |
| 条件渲染 | `{condition && <Component />}` |
| 列表渲染 | `{items.map(i => <Li key={i.id} />)}` |
| 样式 | `style={{ color: 'red' }}` |

## Gotchas

### 组件名必须大写

```jsx
// 错误
function myButton() { return <button>Hi</button> }

// 正确
function MyButton() { return <button>Hi</button> }
```

### 不要调用事件处理函数

```jsx
// 错误 - 会立即执行
<button onClick={handleClick()}>

// 正确 - 传递函数引用
<button onClick={handleClick}>

// 正确 - 带参数
<button onClick={() => handleClick(id)}>
```

### 列表必须使用 key

```jsx
{items.map(item => (
  <li key={item.id}>{item.name}</li>  // 使用唯一 id，不要用 index
))}
```

### 状态是不可变的

```jsx
// 错误
user.name = 'New Name';
setUser(user);

// 正确
setUser({ ...user, name: 'New Name' });
```

## Next Steps

- [React 官方教程](https://react.dev/learn)
- [React Hooks 参考](https://react.dev/reference/react)
- [Next.js 框架](https://nextjs.org/)
- [React Router](https://reactrouter.com/)
