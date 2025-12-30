---
title: "Angular"
description: "Google 企业级 TypeScript 框架 - 路由、表单、HTTP、测试全内置，观点明确"
template: "framework"
tags: ["frontend", "typescript", "framework"]
---

## TL;DR

**一句话**：Angular 是 Google 的全功能企业级框架——开箱即用，观点明确。

**核心优势**：
- 完整方案 - 路由、表单、HTTP、测试全内置
- TypeScript 优先 - 从第一天就有完整类型安全
- 依赖注入 - 企业级架构
- 长期支持 - 可预测的 6 个月发布周期

## Core Concepts

### 概念 1：组件

一切都是组件。组件 = TypeScript 类 + HTML 模板 + CSS 样式。

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

### 概念 2：依赖注入

服务被注入到组件中——无需手动连接。

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

### 概念 3：Signals（Angular 16+）

新的响应式原语——比 RxJS 更简单的组件状态管理。

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

### 安装 CLI

```bash
npm install -g @angular/cli
```

### 创建项目

```bash
ng new my-app
cd my-app
ng serve
```

### 项目结构

```
my-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts    # 根组件
│   │   └── app.config.ts       # 应用配置
│   ├── main.ts                 # 入口文件
│   └── index.html
├── angular.json                # Angular 配置
└── package.json
```

### 最小示例

```typescript
// src/app/app.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello Angular!</h1>
    <button (click)="increment()">计数: {{ count() }}</button>
  `
})
export class AppComponent {
  count = signal(0);
  increment() { this.count.update(n => n + 1); }
}
```

### 运行

```bash
ng serve
# 打开 http://localhost:4200
```

## Gotchas

### 模板语法差异

```html
<!-- 属性绑定（单向） -->
<img [src]="imageUrl">
<button [disabled]="isLoading">

<!-- 事件绑定 -->
<button (click)="onClick()">点击</button>

<!-- 双向绑定 -->
<input [(ngModel)]="name">

<!-- 结构指令 -->
@if (show) {
  <div>条件渲染</div>
}
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

### Standalone vs NgModule

```typescript
// 现代方式：独立组件（Angular 14+）
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `...`
})
export class MyComponent {}

// 传统方式：基于 NgModule
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule]
})
export class MyModule {}
```

### Zone.js vs Zoneless

```typescript
// 默认：Zone.js 自动检测变化
// Angular 18+：Zoneless 模式性能更好

// 在 app.config.ts 中
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
};
```

### Observable 订阅

```typescript
// 总是要取消订阅，防止内存泄漏
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

// 或者在模板中使用 async 管道（自动取消订阅）
// <div>{{ data$ | async }}</div>
```

## When to Use

**适合**：
- 企业应用
- 需要结构化的大团队
- 需要长期维护的项目
- 熟悉 TypeScript/OOP 的团队

**不适合**：
- 小项目或 MVP
- 想要灵活性的团队
- 快速原型
- Web 开发新手

**对比**：
| 特性 | Angular | React | Vue |
|------|---------|-------|-----|
| 学习曲线 | 陡峭 | 中等 | 简单 |
| 打包体积 | 150KB+ | 40KB | 30KB |
| 定位 | 全功能框架 | 库 | 渐进式 |
| 类型 | 必须 TS | 可选 | 可选 |

## Next Steps

- [Angular 文档](https://angular.dev/)
- [Angular 教程](https://angular.dev/tutorials)
- [Angular CLI 参考](https://angular.dev/tools/cli)
- [RxJS](https://rxjs.dev/) - 响应式编程

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 组件 | `@Component({ selector, template })` |
| 服务 | `@Injectable({ providedIn: 'root' })` |
| Signal | `count = signal(0)` |
| 计算 | `doubled = computed(() => count() * 2)` |
| 副作用 | `effect(() => console.log(count()))` |
| 输入 | `@Input() title: string` |
| 输出 | `@Output() clicked = new EventEmitter()` |
| 路由 | `{ path: 'users', component: UsersComponent }` |
