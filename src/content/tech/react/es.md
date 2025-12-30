---
title: "React"
description: "Comienza con React para construir interfaces de usuario en 5 minutos"
template: "framework"
tags: ["frontend", "javascript", "ui"]
---

## TL;DR

**En una línea**: React es una biblioteca JavaScript para construir UIs con componentes - los bloques Lego del desarrollo web.

**Fortalezas principales**:
- Basado en componentes - construye una vez, reutiliza en todas partes
- Virtual DOM - actualizaciones rápidas sin tocar el DOM real
- Hooks - gestión elegante de estado y ciclo de vida
- Ecosistema masivo - React Native, Next.js y miles de bibliotecas

## Core Concepts

### Concept 1: Components

Todo en React es un componente. Un componente es simplemente una función que devuelve JSX (sintaxis similar a HTML en JavaScript).

```jsx
function Welcome({ name }) {
  return <h1>¡Hola, {name}!</h1>;
}

// Úsalo como HTML
<Welcome name="Alice" />
```

### Concept 2: State & Props

**Props** = datos pasados del padre al hijo (solo lectura)
**State** = datos gestionados dentro de un componente (puede cambiar)

```jsx
function Counter() {
  const [count, setCount] = useState(0);  // State
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Concept 3: One-way Data Flow

Los datos fluyen hacia abajo del padre al hijo a través de props. El hijo no puede modificar los datos del padre directamente - en su lugar llama funciones callback.

## Quick Start

### Create Project

```bash
# Usando Vite (recomendado)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── src/
│   ├── App.jsx       # Componente raíz
│   ├── main.jsx      # Punto de entrada
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
      <h1>¡Hola React!</h1>
      <button onClick={() => setCount(count + 1)}>
        Contador: {count}
      </button>
    </div>
  );
}

export default App;
```

### Run

```bash
npm run dev
# Abre http://localhost:5173
```

## Gotchas

### Component names must be capitalized

```jsx
// ❌ Incorrecto - se trata como etiqueta HTML
function myButton() { return <button>Hi</button> }

// ✅ Correcto
function MyButton() { return <button>Hi</button> }
```

### Don't call handlers, pass them

```jsx
// ❌ Incorrecto - se ejecuta inmediatamente al renderizar
<button onClick={handleClick()}>

// ✅ Correcto - pasa la referencia
<button onClick={handleClick}>

// ✅ Con argumentos
<button onClick={() => handleClick(id)}>
```

### State updates are async

```jsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);  // ¡Aún 0! El estado se actualiza en el próximo render
}

// Usa la forma de función para múltiples actualizaciones
setCount(c => c + 1);
setCount(c => c + 1);  // Ahora suma correctamente 2
```

### State is immutable

```jsx
// ❌ Incorrecto - mutando el estado
user.name = 'Nuevo Nombre';
setUser(user);  // ¡React no re-renderizará!

// ✅ Correcto - nuevo objeto
setUser({ ...user, name: 'Nuevo Nombre' });

// Para arrays
setItems([...items, newItem]);  // Añadir
setItems(items.filter(i => i.id !== id));  // Eliminar
```

## When to Use

**Ideal para**:
- Aplicaciones de una sola página (SPAs)
- UIs interactivas complejas
- Equipos que quieren reutilizar componentes
- Proyectos que necesitan fuerte soporte del ecosistema

**No ideal para**:
- Sitios estáticos simples (usa Astro, Hugo)
- Sitios críticos para SEO sin configuración SSR (usa Next.js en su lugar)
- Proyectos muy pequeños (JS vanilla podría ser suficiente)

**Comparación**:
| Característica | React | Vue | Angular |
|----------------|-------|-----|---------|
| Curva de aprendizaje | Media | Fácil | Empinada |
| Tamaño | 40KB | 30KB | 150KB+ |
| Estilo | Biblioteca | Framework | Framework completo |
| Flexibilidad | Alta | Media | Opinionado |

## Next Steps

- [Tutorial oficial de React](https://react.dev/learn)
- [Referencia de Hooks de React](https://react.dev/reference/react/hooks)
- [Next.js](https://nextjs.org/) - Framework React full-stack
- [React Router](https://reactrouter.com/) - Enrutamiento del lado del cliente

## Cheatsheet

| Patrón | Código |
|--------|--------|
| Component | `function Name() { return <div>...</div> }` |
| Props | `function Card({ title }) { ... }` |
| State | `const [val, setVal] = useState(initial)` |
| Effect | `useEffect(() => { ... }, [deps])` |
| Ref | `const ref = useRef(null)` |
| Context | `const val = useContext(MyContext)` |
| Condicional | `{show && <Component />}` |
| Lista | `{items.map(i => <Item key={i.id} />)}` |
| Event | `onClick={fn}` / `onChange={fn}` |
