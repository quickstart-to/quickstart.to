---
title: "Angular"
description: "Starten Sie mit dem Angular-Framework in 5 Minuten"
template: "framework"
tags: ["frontend", "typescript", "framework"]
---

## TL;DR

**Eine Zeile**: Angular ist Googles vollständiges Enterprise-Framework - alles inklusive, klare Meinungen.

**Kernstärken**:
- Komplettlösung - Routing, Formulare, HTTP, Testing eingebaut
- TypeScript first - volle Typsicherheit von Anfang an
- Dependency Injection - Enterprise-Grade-Architektur
- Langzeit-Support - vorhersagbarer 6-Monats-Veröffentlichungszyklus

## Core Concepts

### Concept 1: Components

Alles ist eine Komponente. Eine Komponente = TypeScript-Klasse + HTML-Template + CSS-Styles.

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

Services werden in Komponenten injiziert - keine manuelle Verkabelung.

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

Das neue reaktive Primitive - einfacher als RxJS für Komponenten-State.

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
│   │   ├── app.component.ts    # Root-Komponente
│   │   └── app.config.ts       # App-Konfiguration
│   ├── main.ts                 # Einstiegspunkt
│   └── index.html
├── angular.json                # Angular-Konfiguration
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
# Öffnen Sie http://localhost:4200
```

## Gotchas

### Template syntax differences

```html
<!-- Property-Binding (einwegig) -->
<img [src]="imageUrl">
<button [disabled]="isLoading">

<!-- Event-Binding -->
<button (click)="onClick()">Klick mich</button>

<!-- Two-way-Binding -->
<input [(ngModel)]="name">

<!-- Strukturelle Direktiven -->
@if (show) {
  <div>Bedingt</div>
}
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

### Standalone vs NgModule

```typescript
// Moderne Variante: Standalone-Komponenten (Angular 14+)
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `...`
})
export class MyComponent {}

// Legacy-Variante: NgModule-basiert
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule]
})
export class MyModule {}
```

### Zone.js vs Zoneless

```typescript
// Standard: Zone.js erkennt Änderungen automatisch
// Angular 18+: Zoneless-Modus für bessere Performance

// In app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
};
```

### Observable subscriptions

```typescript
// Immer unsubscribe, um Speicherlecks zu vermeiden
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

// Oder async-Pipe im Template verwenden (automatisches unsubscribe)
// <div>{{ data$ | async }}</div>
```

## When to Use

**Am besten für**:
- Enterprise-Anwendungen
- Große Teams, die Struktur benötigen
- Projekte mit langfristiger Wartung
- Teams mit TypeScript/OOP-Erfahrung

**Nicht ideal für**:
- Kleine Projekte oder MVPs
- Teams, die Flexibilität wollen
- Schnelle Prototypen
- Entwickler, die neu in der Webentwicklung sind

**Vergleich**:
| Feature | Angular | React | Vue |
|---------|---------|-------|-----|
| Lernkurve | Steil | Mittel | Einfach |
| Bundle-Größe | 150KB+ | 40KB | 30KB |
| Stil | Vollständiges Framework | Bibliothek | Progressiv |
| Typisierung | TS erforderlich | Optional | Optional |

## Next Steps

- [Angular-Dokumentation](https://angular.dev/)
- [Angular-Tutorial](https://angular.dev/tutorials)
- [Angular CLI-Referenz](https://angular.dev/tools/cli)
- [RxJS](https://rxjs.dev/) - Reaktive Programmierung

## Cheatsheet

| Muster | Code |
|--------|------|
| Component | `@Component({ selector, template })` |
| Service | `@Injectable({ providedIn: 'root' })` |
| Signal | `count = signal(0)` |
| Computed | `doubled = computed(() => count() * 2)` |
| Effect | `effect(() => console.log(count()))` |
| Input | `@Input() title: string` |
| Output | `@Output() clicked = new EventEmitter()` |
| Route | `{ path: 'users', component: UsersComponent }` |
