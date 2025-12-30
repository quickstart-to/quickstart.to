---
title: "React"
description: "Démarrez avec React pour créer des interfaces utilisateur en 5 minutes"
template: "framework"
tags: ["frontend", "javascript", "ui"]
---

## TL;DR

**En une ligne**: React est une bibliothèque JavaScript pour créer des UIs avec des composants - les briques Lego du développement web.

**Forces principales**:
- Basé sur les composants - construisez une fois, réutilisez partout
- Virtual DOM - mises à jour rapides sans toucher le vrai DOM
- Hooks - gestion élégante de l'état et du cycle de vie
- Écosystème massif - React Native, Next.js et des milliers de bibliothèques

## Core Concepts

### Concept 1: Components

Tout dans React est un composant. Un composant est simplement une fonction qui retourne du JSX (syntaxe HTML-like en JavaScript).

```jsx
function Welcome({ name }) {
  return <h1>Bonjour, {name}!</h1>;
}

// Utilisez-le comme du HTML
<Welcome name="Alice" />
```

### Concept 2: State & Props

**Props** = données passées du parent à l'enfant (lecture seule)
**State** = données gérées à l'intérieur d'un composant (peut changer)

```jsx
function Counter() {
  const [count, setCount] = useState(0);  // State
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Concept 3: One-way Data Flow

Les données circulent vers le bas du parent à l'enfant via les props. L'enfant ne peut pas modifier directement les données du parent - il appelle des fonctions callback à la place.

## Quick Start

### Create Project

```bash
# Avec Vite (recommandé)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── src/
│   ├── App.jsx       # Composant racine
│   ├── main.jsx      # Point d'entrée
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
      <h1>Bonjour React!</h1>
      <button onClick={() => setCount(count + 1)}>
        Compteur: {count}
      </button>
    </div>
  );
}

export default App;
```

### Run

```bash
npm run dev
# Ouvrez http://localhost:5173
```

## Gotchas

### Component names must be capitalized

```jsx
// ❌ Faux - traité comme une balise HTML
function myButton() { return <button>Hi</button> }

// ✅ Correct
function MyButton() { return <button>Hi</button> }
```

### Don't call handlers, pass them

```jsx
// ❌ Faux - s'exécute immédiatement au rendu
<button onClick={handleClick()}>

// ✅ Correct - passe la référence
<button onClick={handleClick}>

// ✅ Avec des arguments
<button onClick={() => handleClick(id)}>
```

### State updates are async

```jsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);  // Encore 0! L'état se met à jour au prochain rendu
}

// Utilisez la forme fonction pour plusieurs mises à jour
setCount(c => c + 1);
setCount(c => c + 1);  // Ajoute maintenant correctement 2
```

### State is immutable

```jsx
// ❌ Faux - mutation de l'état
user.name = 'Nouveau Nom';
setUser(user);  // React ne re-rendra pas!

// ✅ Correct - nouvel objet
setUser({ ...user, name: 'Nouveau Nom' });

// Pour les tableaux
setItems([...items, newItem]);  // Ajouter
setItems(items.filter(i => i.id !== id));  // Supprimer
```

## When to Use

**Idéal pour**:
- Applications monopages (SPAs)
- UIs interactives complexes
- Équipes qui veulent réutiliser des composants
- Projets nécessitant un support d'écosystème fort

**Pas idéal pour**:
- Sites statiques simples (utilisez Astro, Hugo)
- Sites critiques pour le SEO sans configuration SSR (utilisez plutôt Next.js)
- Très petits projets (le JS vanilla pourrait suffire)

**Comparaison**:
| Fonctionnalité | React | Vue | Angular |
|----------------|-------|-----|---------|
| Courbe d'apprentissage | Moyenne | Facile | Raide |
| Taille | 40KB | 30KB | 150KB+ |
| Style | Bibliothèque | Framework | Framework complet |
| Flexibilité | Haute | Moyenne | Opinionné |

## Next Steps

- [Tutoriel officiel React](https://react.dev/learn)
- [Référence des Hooks React](https://react.dev/reference/react/hooks)
- [Next.js](https://nextjs.org/) - Framework React full-stack
- [React Router](https://reactrouter.com/) - Routage côté client

## Cheatsheet

| Modèle | Code |
|--------|------|
| Component | `function Name() { return <div>...</div> }` |
| Props | `function Card({ title }) { ... }` |
| State | `const [val, setVal] = useState(initial)` |
| Effect | `useEffect(() => { ... }, [deps])` |
| Ref | `const ref = useRef(null)` |
| Context | `const val = useContext(MyContext)` |
| Conditionnel | `{show && <Component />}` |
| Liste | `{items.map(i => <Item key={i.id} />)}` |
| Event | `onClick={fn}` / `onChange={fn}` |
