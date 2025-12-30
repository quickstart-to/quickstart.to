---
title: "React"
description: "Starten Sie mit React zum Erstellen von Benutzeroberflächen in 5 Minuten"
template: "framework"
tags: ["frontend", "javascript", "ui"]
---

## TL;DR

**Eine Zeile**: React ist eine JavaScript-Bibliothek zum Erstellen von UIs mit Komponenten - die Lego-Bausteine der Webentwicklung.

**Kernstärken**:
- Komponentenbasiert - einmal bauen, überall wiederverwenden
- Virtual DOM - schnelle Updates ohne das echte DOM zu berühren
- Hooks - elegante State- und Lifecycle-Verwaltung
- Riesiges Ökosystem - React Native, Next.js und tausende Bibliotheken

## Core Concepts

### Concept 1: Components

Alles in React ist eine Komponente. Eine Komponente ist einfach eine Funktion, die JSX zurückgibt (HTML-ähnliche Syntax in JavaScript).

```jsx
function Welcome({ name }) {
  return <h1>Hallo, {name}!</h1>;
}

// Wie HTML verwenden
<Welcome name="Alice" />
```

### Concept 2: State & Props

**Props** = Daten vom Elternelement zum Kind (nur lesen)
**State** = Daten innerhalb einer Komponente verwaltet (kann sich ändern)

```jsx
function Counter() {
  const [count, setCount] = useState(0);  // State
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Concept 3: One-way Data Flow

Daten fließen von oben nach unten durch Props. Kind kann Elterndaten nicht direkt ändern - stattdessen werden Callback-Funktionen aufgerufen.

## Quick Start

### Create Project

```bash
# Mit Vite (empfohlen)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── src/
│   ├── App.jsx       # Root-Komponente
│   ├── main.jsx      # Einstiegspunkt
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
      <h1>Hallo React!</h1>
      <button onClick={() => setCount(count + 1)}>
        Zähler: {count}
      </button>
    </div>
  );
}

export default App;
```

### Run

```bash
npm run dev
# Öffnen Sie http://localhost:5173
```

## Gotchas

### Component names must be capitalized

```jsx
// ❌ Falsch - wird als HTML-Tag behandelt
function myButton() { return <button>Hi</button> }

// ✅ Richtig
function MyButton() { return <button>Hi</button> }
```

### Don't call handlers, pass them

```jsx
// ❌ Falsch - wird sofort beim Rendern ausgeführt
<button onClick={handleClick()}>

// ✅ Richtig - übergibt Referenz
<button onClick={handleClick}>

// ✅ Mit Argumenten
<button onClick={() => handleClick(id)}>
```

### State updates are async

```jsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);  // Noch 0! State aktualisiert beim nächsten Render
}

// Funktionsform für mehrere Updates verwenden
setCount(c => c + 1);
setCount(c => c + 1);  // Addiert jetzt korrekt 2
```

### State is immutable

```jsx
// ❌ Falsch - State mutieren
user.name = 'Neuer Name';
setUser(user);  // React rendert nicht neu!

// ✅ Richtig - neues Objekt
setUser({ ...user, name: 'Neuer Name' });

// Für Arrays
setItems([...items, newItem]);  // Hinzufügen
setItems(items.filter(i => i.id !== id));  // Entfernen
```

## When to Use

**Am besten für**:
- Single-Page-Anwendungen (SPAs)
- Komplexe interaktive UIs
- Teams, die Komponenten wiederverwenden wollen
- Projekte, die starke Ökosystem-Unterstützung brauchen

**Nicht ideal für**:
- Einfache statische Seiten (Astro, Hugo verwenden)
- SEO-kritische Seiten ohne SSR-Setup (stattdessen Next.js verwenden)
- Sehr kleine Projekte (Vanilla JS könnte reichen)

**Vergleich**:
| Feature | React | Vue | Angular |
|---------|-------|-----|---------|
| Lernkurve | Mittel | Einfach | Steil |
| Größe | 40KB | 30KB | 150KB+ |
| Stil | Bibliothek | Framework | Vollständiges Framework |
| Flexibilität | Hoch | Mittel | Eigene Meinung |

## Next Steps

- [Offizielles React-Tutorial](https://react.dev/learn)
- [React Hooks-Referenz](https://react.dev/reference/react/hooks)
- [Next.js](https://nextjs.org/) - Full-Stack React-Framework
- [React Router](https://reactrouter.com/) - Client-seitiges Routing

## Cheatsheet

| Muster | Code |
|--------|------|
| Component | `function Name() { return <div>...</div> }` |
| Props | `function Card({ title }) { ... }` |
| State | `const [val, setVal] = useState(initial)` |
| Effect | `useEffect(() => { ... }, [deps])` |
| Ref | `const ref = useRef(null)` |
| Context | `const val = useContext(MyContext)` |
| Bedingt | `{show && <Component />}` |
| Liste | `{items.map(i => <Item key={i.id} />)}` |
| Event | `onClick={fn}` / `onChange={fn}` |
