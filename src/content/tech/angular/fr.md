---
title: "Angular"
description: "Démarrez avec le framework Angular en 5 minutes"
template: "framework"
tags: ["frontend", "typescript", "framework"]
---

## TL;DR

**En une ligne**: Angular est le framework d'entreprise complet de Google - tout inclus, opinions fortes.

**Forces principales**:
- Solution complète - routing, formulaires, HTTP, testing intégrés
- TypeScript first - sécurité de typage complète dès le départ
- Injection de dépendances - architecture de niveau entreprise
- Support à long terme - cycle de release prévisible de 6 mois

## Core Concepts

### Concept 1: Components

Tout est un composant. Un composant = classe TypeScript + template HTML + styles CSS.

```typescript
@Component({
  selector: 'app-hello',
  template: `<h1>{{ title }}</h1>`,
  styles: [`h1 { color: blue; }`]
})
export class HelloComponent {
  title = 'Hello Angular!';
}
```

### Concept 2: Dependency Injection

Les services sont injectés dans les composants - pas de câblage manuel.

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers() { return ['Alice', 'Bob']; }
}

@Component({...})
export class UserListComponent {
  constructor(private userService: UserService) {}
  users = this.userService.getUsers();
}
```

### Concept 3: Signals (Angular 16+)

La nouvelle primitive réactive - plus simple que RxJS pour l'état des composants.

```typescript
@Component({
  template: `<button (click)="increment()">{{ count() }}</button>`
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update(n => n + 1);
  }
}
```

## Quick Start

### Install CLI

```bash
npm install -g @angular/cli
```

### Create Project

```bash
ng new my-app
cd my-app
ng serve
```

### Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts    # Composant racine
│   │   └── app.config.ts       # Configuration de l'app
│   ├── main.ts                 # Point d'entrée
│   └── index.html
├── angular.json                # Configuration Angular
└── package.json
```

### Minimal Example

```typescript
// src/app/app.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello Angular!</h1>
    <button (click)="increment()">Count: {{ count() }}</button>
  `
})
export class AppComponent {
  count = signal(0);
  increment() { this.count.update(n => n + 1); }
}
```

### Run

```bash
ng serve
# Ouvrez http://localhost:4200
```

## Gotchas

### Template syntax differences

```html
<!-- Property binding (unidirectionnel) -->
<img [src]="imageUrl">
<button [disabled]="isLoading">

<!-- Event binding -->
<button (click)="onClick()">Cliquez-moi</button>

<!-- Two-way binding -->
<input [(ngModel)]="name">

<!-- Directives structurelles -->
@if (show) {
  <div>Conditionnel</div>
}
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

### Standalone vs NgModule

```typescript
// Façon moderne: Composants standalone (Angular 14+)
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `...`
})
export class MyComponent {}

// Façon legacy: Basé sur NgModule
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule]
})
export class MyModule {}
```

### Zone.js vs Zoneless

```typescript
// Par défaut: Zone.js détecte les changements automatiquement
// Angular 18+: Mode Zoneless pour de meilleures performances

// Dans app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
};
```

### Observable subscriptions

```typescript
// Toujours se désabonner pour éviter les fuites de mémoire
export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data = data);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Ou utiliser le pipe async dans le template (désabonnement automatique)
// <div>{{ data$ | async }}</div>
```

## When to Use

**Idéal pour**:
- Applications d'entreprise
- Grandes équipes nécessitant de la structure
- Projets nécessitant une maintenance à long terme
- Équipes familières avec TypeScript/POO

**Pas idéal pour**:
- Petits projets ou MVPs
- Équipes voulant de la flexibilité
- Prototypes rapides
- Développeurs nouveaux dans le développement web

**Comparaison**:
| Fonctionnalité | Angular | React | Vue |
|----------------|---------|-------|-----|
| Courbe d'apprentissage | Raide | Moyenne | Facile |
| Taille du bundle | 150KB+ | 40KB | 30KB |
| Style | Framework complet | Bibliothèque | Progressif |
| Typage | TS requis | Optionnel | Optionnel |

## Next Steps

- [Documentation Angular](https://angular.dev/)
- [Tutoriel Angular](https://angular.dev/tutorials)
- [Référence CLI Angular](https://angular.dev/tools/cli)
- [RxJS](https://rxjs.dev/) - Programmation réactive

## Cheatsheet

| Modèle | Code |
|--------|------|
| Component | `@Component({ selector, template })` |
| Service | `@Injectable({ providedIn: 'root' })` |
| Signal | `count = signal(0)` |
| Computed | `doubled = computed(() => count() * 2)` |
| Effect | `effect(() => console.log(count()))` |
| Input | `@Input() title: string` |
| Output | `@Output() clicked = new EventEmitter()` |
| Route | `{ path: 'users', component: UsersComponent }` |
