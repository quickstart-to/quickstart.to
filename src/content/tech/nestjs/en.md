---
title: "NestJS"
description: "Get started with NestJS framework in 5 minutes"
template: "framework"
tags: ["backend", "nodejs", "typescript", "framework"]
---

## TL;DR

**One-liner**: NestJS is Angular-style architecture for Node.js backends - TypeScript, dependency injection, and enterprise patterns built-in.

**Core Strengths**:
- TypeScript-first - decorators and strong typing everywhere
- Dependency injection - testable, modular code by default
- CLI generators - scaffolding modules, controllers, services
- Enterprise ready - guards, interceptors, pipes, filters

## Core Concepts

### Concept 1: Modules

Everything is organized into modules. Each feature gets its own module.

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],  // Share with other modules
})
export class UsersModule {}
```

### Concept 2: Controllers + Services

Controllers handle HTTP. Services handle logic. DI connects them.

```typescript
// users.controller.ts
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}  // DI

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

### Concept 3: DTOs + Validation

Request validation via class-validator decorators:

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

### Create Project

```bash
npm i -g @nestjs/cli
nest new my-app
cd my-app
```

### Generate a Feature

```bash
nest g resource users
# Creates: module, controller, service, DTOs, tests
```

### Run

```bash
npm run start:dev
# Open http://localhost:3000
```

## Gotchas

### Don't forget to import modules

```typescript
// ❌ Service won't be available
@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

// ✅ Import UsersModule to use UsersService
@Module({
  imports: [UsersModule],  // Import the module
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
```

### Enable validation globally

```typescript
// main.ts - required for DTOs to work
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe({
  whitelist: true,  // Strip unknown properties
  transform: true,  // Auto-transform types
}));
```

### Async configuration

```typescript
// ❌ Sync config - can't use env vars from ConfigService
TypeOrmModule.forRoot({ host: 'localhost' })

// ✅ Async config - inject ConfigService
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    host: config.get('DB_HOST'),
  }),
})
```

## When to Use

**Best for**:
- Large-scale APIs
- Enterprise applications
- Teams familiar with Angular
- Microservices architecture

**Not ideal for**:
- Simple scripts or small APIs (use Express)
- Serverless functions (cold start overhead)
- Projects avoiding decorators/DI

**Comparison**:
| Feature | NestJS | Express | Fastify |
|---------|--------|---------|---------|
| Structure | Opinionated | Minimal | Minimal |
| TypeScript | Built-in | Add-on | Built-in |
| DI | Yes | No | No |
| Learning curve | Medium | Easy | Easy |

## Next Steps

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Courses](https://courses.nestjs.com/)
- [Awesome NestJS](https://github.com/nestjs/awesome-nestjs)
- [NestJS Discord](https://discord.gg/nestjs)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Create project | `nest new name` |
| Generate resource | `nest g resource name` |
| Generate module | `nest g module name` |
| Generate service | `nest g service name` |
| GET route | `@Get()` / `@Get(':id')` |
| POST route | `@Post()` |
| Path param | `@Param('id') id: string` |
| Query param | `@Query('page') page: number` |
| Body | `@Body() dto: CreateDto` |
| Headers | `@Headers('auth') auth: string` |
