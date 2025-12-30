---
title: "Angular"
description: "Framework TypeScript empresarial de Google - routing, formularios, HTTP, testing integrados, opiniones fuertes incluidas"
template: "framework"
tags: ["frontend", "typescript", "framework"]
---

## TL;DR

**En una línea**: Angular es el framework empresarial completo de Google - todo incluido, opiniones fuertes.

**Fortalezas principales**:
- Solución completa - routing, formularios, HTTP, testing integrados
- TypeScript first - seguridad de tipos completa desde el inicio
- Inyección de dependencias - arquitectura de nivel empresarial
- Soporte a largo plazo - ciclo de lanzamiento predecible de 6 meses

## Core Concepts

### Concept 1: Components

Todo es un componente. Un componente = clase TypeScript + template HTML + estilos CSS.

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

Los servicios se inyectan en los componentes - sin cableado manual.

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

La nueva primitiva reactiva - más simple que RxJS para el estado de componentes.

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
│   │   ├── app.component.ts    # Componente raíz
│   │   └── app.config.ts       # Configuración de la app
│   ├── main.ts                 # Punto de entrada
│   └── index.html
├── angular.json                # Configuración de Angular
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
# Abre http://localhost:4200
```

## Gotchas

### Template syntax differences

```html
<!-- Property binding (unidireccional) -->
<img [src]="imageUrl">
<button [disabled]="isLoading">

<!-- Event binding -->
<button (click)="onClick()">Haz clic</button>

<!-- Two-way binding -->
<input [(ngModel)]="name">

<!-- Directivas estructurales -->
@if (show) {
  <div>Condicional</div>
}
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

### Standalone vs NgModule

```typescript
// Forma moderna: Componentes standalone (Angular 14+)
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `...`
})
export class MyComponent {}

// Forma legacy: Basado en NgModule
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule]
})
export class MyModule {}
```

### Zone.js vs Zoneless

```typescript
// Por defecto: Zone.js detecta cambios automáticamente
// Angular 18+: Modo Zoneless para mejor rendimiento

// En app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
};
```

### Observable subscriptions

```typescript
// Siempre cancelar suscripción para evitar fugas de memoria
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

// O usar el pipe async en el template (cancelación automática)
// <div>{{ data$ | async }}</div>
```

## When to Use

**Ideal para**:
- Aplicaciones empresariales
- Equipos grandes que necesitan estructura
- Proyectos que requieren mantenimiento a largo plazo
- Equipos familiarizados con TypeScript/POO

**No ideal para**:
- Proyectos pequeños o MVPs
- Equipos que quieren flexibilidad
- Prototipos rápidos
- Desarrolladores nuevos en desarrollo web

**Comparación**:
| Característica | Angular | React | Vue |
|----------------|---------|-------|-----|
| Curva de aprendizaje | Empinada | Media | Fácil |
| Tamaño del bundle | 150KB+ | 40KB | 30KB |
| Estilo | Framework completo | Biblioteca | Progresivo |
| Tipado | TS requerido | Opcional | Opcional |

## Next Steps

- [Documentación de Angular](https://angular.dev/)
- [Tutorial de Angular](https://angular.dev/tutorials)
- [Referencia de CLI Angular](https://angular.dev/tools/cli)
- [RxJS](https://rxjs.dev/) - Programación reactiva

## Cheatsheet

| Patrón | Código |
|--------|--------|
| Component | `@Component({ selector, template })` |
| Service | `@Injectable({ providedIn: 'root' })` |
| Signal | `count = signal(0)` |
| Computed | `doubled = computed(() => count() * 2)` |
| Effect | `effect(() => console.log(count()))` |
| Input | `@Input() title: string` |
| Output | `@Output() clicked = new EventEmitter()` |
| Route | `{ path: 'users', component: UsersComponent }` |
