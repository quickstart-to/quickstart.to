---
title: "NestJS"
description: "5 分钟快速入门 NestJS 框架"
tags: ["backend", "nodejs", "typescript", "framework"]
---

## TL;DR

**是什么**：用于构建可扩展服务端应用的渐进式 Node.js 框架。

**为什么用**：TypeScript 优先、Angular 风格架构、依赖注入、企业级。

## Quick Start

**安装 CLI 并创建项目**：
```bash
npm i -g @nestjs/cli
nest new my-app
cd my-app
npm run start:dev
```

打开 http://localhost:3000

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `nest new name` | 创建新项目 |
| `nest g module name` | 生成模块 |
| `nest g controller name` | 生成控制器 |
| `nest g service name` | 生成服务 |
| `npm run start:dev` | 开发服务器（监听模式）|
| `npm run build` | 构建生产版本 |
| `npm run start:prod` | 启动生产服务 |

## Gotchas

### 控制器

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return body;
  }
}
```

### 依赖注入服务

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }

  create(user) {
    this.users.push(user);
    return user;
  }
}

// 在控制器中注入
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

### 模块

```typescript
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],  // 导出给其他模块
})
export class UsersModule {}
```

### DTO 验证

```typescript
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
```

## Next Steps

- [NestJS 文档](https://docs.nestjs.com/) - 官方文档
- [NestJS 课程](https://courses.nestjs.com/) - 官方课程
- [Awesome NestJS](https://github.com/nestjs/awesome-nestjs) - 资源
- [NestJS Discord](https://discord.gg/nestjs) - 社区
