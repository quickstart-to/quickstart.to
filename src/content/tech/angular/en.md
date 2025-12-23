---
title: "Angular"
description: "Get started with Angular framework in 5 minutes"
template: "framework"
tags: ["frontend", "typescript", "framework"]
---

## TL;DR

**One-liner**: Angular is Google's full-featured enterprise framework - batteries included, opinions strong.

**Core Strengths**:
- Complete solution - routing, forms, HTTP, testing built-in
- TypeScript first - full type safety from day one
- Dependency injection - enterprise-grade architecture
- Long-term support - predictable 6-month release cycle

## Core Concepts

### Concept 1: Components

Everything is a component. A component = TypeScript class + HTML template + CSS styles.

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

Services are injected into components - no manual wiring.

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

The new reactive primitive - simpler than RxJS for component state.

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
│   │   ├── app.component.ts    # Root component
│   │   └── app.config.ts       # App configuration
│   ├── main.ts                 # Entry point
│   └── index.html
├── angular.json                # Angular config
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
# Open http://localhost:4200
```

## Gotchas

### Template syntax differences

```html
<!-- Property binding (one-way) -->
<img [src]="imageUrl">
<button [disabled]="isLoading">

<!-- Event binding -->
<button (click)="onClick()">Click me</button>

<!-- Two-way binding -->
<input [(ngModel)]="name">

<!-- Structural directives -->
@if (show) {
  <div>Conditional</div>
}
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

### Standalone vs NgModule

```typescript
// Modern way: Standalone components (Angular 14+)
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `...`
})
export class MyComponent {}

// Legacy way: NgModule-based
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule]
})
export class MyModule {}
```

### Zone.js vs Zoneless

```typescript
// Default: Zone.js detects changes automatically
// Angular 18+: Zoneless mode for better performance

// In app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
};
```

### Observable subscriptions

```typescript
// Always unsubscribe to prevent memory leaks
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

// Or use async pipe in template (auto-unsubscribes)
// <div>{{ data$ | async }}</div>
```

## When to Use

**Best for**:
- Enterprise applications
- Large teams needing structure
- Projects requiring long-term maintenance
- Teams familiar with TypeScript/OOP

**Not ideal for**:
- Small projects or MVPs
- Teams wanting flexibility
- Quick prototypes
- Developers new to web development

**Comparison**:
| Feature | Angular | React | Vue |
|---------|---------|-------|-----|
| Learning curve | Steep | Medium | Easy |
| Bundle size | 150KB+ | 40KB | 30KB |
| Style | Full framework | Library | Progressive |
| Typing | Required TS | Optional | Optional |

## Next Steps

- [Angular Documentation](https://angular.dev/)
- [Angular Tutorial](https://angular.dev/tutorials)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [RxJS](https://rxjs.dev/) - Reactive programming

## Cheatsheet

| Pattern | Code |
|---------|------|
| Component | `@Component({ selector, template })` |
| Service | `@Injectable({ providedIn: 'root' })` |
| Signal | `count = signal(0)` |
| Computed | `doubled = computed(() => count() * 2)` |
| Effect | `effect(() => console.log(count()))` |
| Input | `@Input() title: string` |
| Output | `@Output() clicked = new EventEmitter()` |
| Route | `{ path: 'users', component: UsersComponent }` |
