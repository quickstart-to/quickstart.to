---
title: "Angular"
description: "5 分钟快速入门 Angular 框架"
tags: ["frontend", "typescript", "framework"]
---

## TL;DR

**是什么**：使用 TypeScript 构建 Web 应用的平台。

**为什么用**：功能完整的框架、强类型、依赖注入、企业级。

## Quick Start

**安装 Angular CLI**：
```bash
npm install -g @angular/cli
```

**创建新项目**：
```bash
ng new my-app
cd my-app
ng serve
```

打开 http://localhost:4200

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `ng new name` | 创建新项目 |
| `ng serve` | 启动开发服务器 |
| `ng build` | 构建生产版本 |
| `ng generate component name` | 生成组件 |
| `ng generate service name` | 生成服务 |
| `ng test` | 运行单元测试 |
| `ng e2e` | 运行端到端测试 |

**组件结构**：
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

### 模板语法

```html
<!-- 插值 -->
<p>{{ message }}</p>

<!-- 属性绑定 -->
<img [src]="imageUrl">

<!-- 事件绑定 -->
<button (click)="onClick()">Click</button>

<!-- 双向绑定 -->
<input [(ngModel)]="name">

<!-- 结构指令 -->
<div *ngIf="show">Conditional</div>
<div *ngFor="let item of items">{{ item }}</div>
```

### 依赖注入

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

### 独立组件（Angular 17+）

```typescript
@Component({
  standalone: true,
  imports: [CommonModule],
  template: `...`
})
export class StandaloneComponent {}
```

## Next Steps

- [Angular 文档](https://angular.dev/) - 官方文档
- [Angular 教程](https://angular.dev/tutorials) - 交互式教程
- [Angular CLI](https://angular.dev/tools/cli) - CLI 参考
- [RxJS](https://rxjs.dev/) - 响应式扩展
