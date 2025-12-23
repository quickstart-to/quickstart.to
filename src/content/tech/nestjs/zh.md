---
title: "NestJS"
description: "5 分钟快速入门 NestJS 框架"
template: "framework"
tags: ["backend", "nodejs", "typescript", "framework"]
---

## TL;DR

**一句话**：NestJS 是 Node.js 后端的 Angular 风格架构——TypeScript、依赖注入、企业级模式开箱即用。

**核心优势**：
- TypeScript 优先 - 装饰器和强类型无处不在
- 依赖注入 - 代码默认可测试、模块化
- CLI 生成器 - 一键生成模块、控制器、服务
- 企业级 - 守卫、拦截器、管道、过滤器

## Core Concepts

### 概念 1：模块

一切都组织成模块。每个功能有自己的模块。

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],  // 分享给其他模块
})
export class UsersModule {}
```

### 概念 2：控制器 + 服务

控制器处理 HTTP。服务处理逻辑。依赖注入连接它们。

```typescript
// users.controller.ts
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}  // 依赖注入

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}

// users.service.ts
@Injectable()
export class UsersService {
  private users = [];

  findAll() { return this.users; }
  create(dto) { this.users.push(dto); return dto; }
}
```

### 概念 3：DTO + 验证

用 class-validator 装饰器做请求验证：

```typescript
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
```

## Quick Start

### 创建项目

```bash
npm i -g @nestjs/cli
nest new my-app
cd my-app
```

### 生成功能模块

```bash
nest g resource users
# 创建：模块、控制器、服务、DTO、测试
```

### 运行

```bash
npm run start:dev
# 打开 http://localhost:3000
```

## Gotchas

### 别忘了导入模块

```typescript
// ❌ 服务不可用
@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

// ✅ 导入 UsersModule 才能用 UsersService
@Module({
  imports: [UsersModule],  // 导入模块
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
```

### 全局启用验证

```typescript
// main.ts - DTO 生效的必要配置
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe({
  whitelist: true,  // 过滤掉未知属性
  transform: true,  // 自动类型转换
}));
```

### 异步配置

```typescript
// ❌ 同步配置 - 无法使用 ConfigService 的环境变量
TypeOrmModule.forRoot({ host: 'localhost' })

// ✅ 异步配置 - 注入 ConfigService
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    host: config.get('DB_HOST'),
  }),
})
```

## When to Use

**适合**：
- 大型 API
- 企业级应用
- 熟悉 Angular 的团队
- 微服务架构

**不适合**：
- 简单脚本或小 API（用 Express）
- Serverless 函数（冷启动开销大）
- 不想用装饰器/DI 的项目

**对比**：
| 特性 | NestJS | Express | Fastify |
|------|--------|---------|---------|
| 结构 | 有主见 | 极简 | 极简 |
| TypeScript | 内置 | 附加 | 内置 |
| 依赖注入 | 有 | 无 | 无 |
| 学习曲线 | 中等 | 简单 | 简单 |

## Next Steps

- [NestJS 文档](https://docs.nestjs.com/)
- [NestJS 课程](https://courses.nestjs.com/)
- [Awesome NestJS](https://github.com/nestjs/awesome-nestjs)
- [NestJS Discord](https://discord.gg/nestjs)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 创建项目 | `nest new name` |
| 生成资源 | `nest g resource name` |
| 生成模块 | `nest g module name` |
| 生成服务 | `nest g service name` |
| GET 路由 | `@Get()` / `@Get(':id')` |
| POST 路由 | `@Post()` |
| 路径参数 | `@Param('id') id: string` |
| 查询参数 | `@Query('page') page: number` |
| 请求体 | `@Body() dto: CreateDto` |
| 请求头 | `@Headers('auth') auth: string` |
