---
title: "React"
description: "Get started with React for building user interfaces"
tags: ["frontend", "javascript", "ui"]
---

## TL;DR

**What**: A JavaScript library for building user interfaces with reusable components.

**Why**: Component-based architecture, virtual DOM for performance, massive ecosystem.

## Quick Start

**Create a new project**:

```bash
npx create-react-app my-app
cd my-app
npm start
```

Or with Vite (recommended for speed):
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

**First component**:

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
  return <button>Click me</button>;
}

export default App;
```

**Add state**:

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

## Cheatsheet

| Concept | Syntax |
|---------|--------|
| Component | `function Name() { return <div>...</div> }` |
| Props | `function Card({ title }) { return <h1>{title}</h1> }` |
| State | `const [val, setVal] = useState(initial)` |
| Effect | `useEffect(() => { ... }, [deps])` |
| Event | `onClick={handleClick}` |
| Conditional | `{condition && <Component />}` |
| List | `{items.map(i => <Li key={i.id} />)}` |
| Style | `style={{ color: 'red' }}` |

## Gotchas

### Component names must be capitalized

```jsx
// Wrong
function myButton() { return <button>Hi</button> }

// Correct
function MyButton() { return <button>Hi</button> }
```

### Don't call event handlers

```jsx
// Wrong - calls immediately
<button onClick={handleClick()}>

// Correct - passes function reference
<button onClick={handleClick}>

// Correct - with arguments
<button onClick={() => handleClick(id)}>
```

### Always use key in lists

```jsx
{items.map(item => (
  <li key={item.id}>{item.name}</li>  // Use unique id, not index
))}
```

### State is immutable

```jsx
// Wrong
user.name = 'New Name';
setUser(user);

// Correct
setUser({ ...user, name: 'New Name' });
```

## Next Steps

- [React Official Tutorial](https://react.dev/learn)
- [React Hooks Reference](https://react.dev/reference/react)
- [Next.js Framework](https://nextjs.org/)
- [React Router](https://reactrouter.com/)
