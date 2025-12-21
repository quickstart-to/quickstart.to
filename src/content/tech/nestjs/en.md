---
title: "NestJS"
description: "Get started with NestJS framework in 5 minutes"
tags: ["backend", "nodejs", "typescript", "framework"]
---

## TL;DR

**What**: A progressive Node.js framework for building scalable server-side applications.

**Why**: TypeScript-first, Angular-inspired architecture, dependency injection, enterprise-ready.

## Quick Start

**Install CLI and create project**:
```bash
npm i -g @nestjs/cli
nest new my-app
cd my-app
npm run start:dev
```

Open http://localhost:3000

## Cheatsheet

| Command | Description |
|---------|-------------|
| `nest new name` | Create new project |
| `nest g module name` | Generate module |
| `nest g controller name` | Generate controller |
| `nest g service name` | Generate service |
| `npm run start:dev` | Dev server with watch |
| `npm run build` | Build for production |
| `npm run start:prod` | Start production |

## Gotchas

### Controller

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

### Service with Dependency Injection

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

// Inject in controller
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

### Module

```typescript
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],  // Export for other modules
})
export class UsersModule {}
```

### Validation with DTOs

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

- [NestJS Documentation](https://docs.nestjs.com/) - Official docs
- [NestJS Courses](https://courses.nestjs.com/) - Official courses
- [Awesome NestJS](https://github.com/nestjs/awesome-nestjs) - Resources
- [NestJS Discord](https://discord.gg/nestjs) - Community
