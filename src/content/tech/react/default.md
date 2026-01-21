---
title: "React"
description: "Build interactive UIs with components - declarative, efficient, and flexible JavaScript library for web interfaces"
template: "framework"
tags: ["frontend", "javascript", "ui"]
---

## TL;DR

**One-liner**: React is a JavaScript library for building UIs with components - the Lego blocks of web development.

**Core Strengths**:
- Component-based - build once, reuse everywhere
- Virtual DOM - fast updates without touching the real DOM
- Hooks - elegant state and lifecycle management
- Massive ecosystem - React Native, Next.js, and thousands of libraries

## Core Concepts

### Concept 1: Components

Everything in React is a component. A component is just a function that returns JSX (HTML-like syntax in JavaScript).

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Use it like HTML
<Welcome name="Alice" />
```

### Concept 2: State & Props

**Props** = data passed from parent to child (read-only)
**State** = data managed inside a component (can change)

```jsx
function Counter() {
  const [count, setCount] = useState(0);  // State
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Concept 3: One-way Data Flow

Data flows down from parent to child through props. Child can't modify parent's data directly - it calls callback functions instead.

## Quick Start

### Create Project

```bash
# Using Vite (recommended)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── src/
│   ├── App.jsx       # Root component
│   ├── main.jsx      # Entry point
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

### Minimal Example

```jsx
// src/App.jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello React!</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;
```

### Run

```bash
npm run dev
# Open http://localhost:5173
```

## Gotchas

### Component names must be capitalized

```jsx
// ❌ Wrong - treated as HTML tag
function myButton() { return <button>Hi</button> }

// ✅ Correct
function MyButton() { return <button>Hi</button> }
```

### Don't call handlers, pass them

```jsx
// ❌ Wrong - executes immediately on render
<button onClick={handleClick()}>

// ✅ Correct - passes reference
<button onClick={handleClick}>

// ✅ With arguments
<button onClick={() => handleClick(id)}>
```

### State updates are async

```jsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);  // Still 0! State updates on next render
}

// Use function form for multiple updates
setCount(c => c + 1);
setCount(c => c + 1);  // Now correctly adds 2
```

### State is immutable

```jsx
// ❌ Wrong - mutating state
user.name = 'New Name';
setUser(user);  // React won't re-render!

// ✅ Correct - new object
setUser({ ...user, name: 'New Name' });

// For arrays
setItems([...items, newItem]);  // Add
setItems(items.filter(i => i.id !== id));  // Remove
```

## When to Use

**Best for**:
- Single-page applications (SPAs)
- Complex interactive UIs
- Teams that want component reusability
- Projects needing strong ecosystem support

**Not ideal for**:
- Simple static sites (use Astro, Hugo)
- SEO-critical sites without SSR setup (use Next.js instead)
- Very small projects (vanilla JS might be enough)

**Comparison**:
| Feature | React | Vue | Angular |
|---------|-------|-----|---------|
| Learning curve | Medium | Easy | Steep |
| Size | 40KB | 30KB | 150KB+ |
| Style | Library | Framework | Full framework |
| Flexibility | High | Medium | Opinionated |

## Next Steps

- [React Official Tutorial](https://react.dev/learn)
- [React Hooks Reference](https://react.dev/reference/react/hooks)
- [Next.js](https://nextjs.org/) - Full-stack React framework
- [React Router](https://reactrouter.com/) - Client-side routing

## Cheatsheet

| Pattern | Code |
|---------|------|
| Component | `function Name() { return <div>...</div> }` |
| Props | `function Card({ title }) { ... }` |
| State | `const [val, setVal] = useState(initial)` |
| Effect | `useEffect(() => { ... }, [deps])` |
| Ref | `const ref = useRef(null)` |
| Context | `const val = useContext(MyContext)` |
| Conditional | `{show && <Component />}` |
| List | `{items.map(i => <Item key={i.id} />)}` |
| Event | `onClick={fn}` / `onChange={fn}` |
