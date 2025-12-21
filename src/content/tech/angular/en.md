---
title: "Angular"
description: "Get started with Angular framework in 5 minutes"
tags: ["frontend", "typescript", "framework"]
---

## TL;DR

**What**: A platform for building web applications with TypeScript.

**Why**: Full-featured framework, strong typing, dependency injection, enterprise-ready.

## Quick Start

**Install Angular CLI**:
```bash
npm install -g @angular/cli
```

**Create new project**:
```bash
ng new my-app
cd my-app
ng serve
```

Open http://localhost:4200

## Cheatsheet

| Command | Description |
|---------|-------------|
| `ng new name` | Create new project |
| `ng serve` | Start dev server |
| `ng build` | Build for production |
| `ng generate component name` | Generate component |
| `ng generate service name` | Generate service |
| `ng test` | Run unit tests |
| `ng e2e` | Run e2e tests |

**Component structure**:
```typescript
@Component({
  selector: 'app-hello',
  template: `<h1>{{ title }}</h1>`
})
export class HelloComponent {
  title = 'Hello Angular!';
}
```

## Gotchas

### Template syntax

```html
<!-- Interpolation -->
<p>{{ message }}</p>

<!-- Property binding -->
<img [src]="imageUrl">

<!-- Event binding -->
<button (click)="onClick()">Click</button>

<!-- Two-way binding -->
<input [(ngModel)]="name">

<!-- Structural directives -->
<div *ngIf="show">Conditional</div>
<div *ngFor="let item of items">{{ item }}</div>
```

### Dependency Injection

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  getData() { return ['a', 'b', 'c']; }
}

@Component({...})
export class MyComponent {
  constructor(private dataService: DataService) {}
}
```

### Standalone components (Angular 17+)

```typescript
@Component({
  standalone: true,
  imports: [CommonModule],
  template: `...`
})
export class StandaloneComponent {}
```

## Next Steps

- [Angular Documentation](https://angular.dev/) - Official docs
- [Angular Tutorial](https://angular.dev/tutorials) - Interactive tutorial
- [Angular CLI](https://angular.dev/tools/cli) - CLI reference
- [RxJS](https://rxjs.dev/) - Reactive extensions
