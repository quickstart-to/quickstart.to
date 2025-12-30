---
title: "NestJS"
description: "Node.js Backend-Framework mit TypeScript - Angular-aehnliche Architektur, Dependency Injection, Enterprise-Patterns"
template: "framework"
tags: ["backend", "nodejs", "typescript", "framework"]
---

## TL;DR

**Kurzfassung**: NestJS ist Angular-ähnliche Architektur für Node.js-Backends - TypeScript, Dependency Injection und Enterprise-Patterns eingebaut.

**Kernstärken**:
- TypeScript-first - Decorators und starke Typisierung überall
- Dependency Injection - testbarer, modularer Code als Standard
- CLI-Generatoren - Scaffolding für Module, Controller, Services
- Enterprise-ready - Guards, Interceptors, Pipes, Filter

## Core Concepts

### Concept 1: Modules

Alles ist in Module organisiert. Jedes Feature bekommt sein eigenes Modul.

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

Controller verarbeiten HTTP. Services verarbeiten Logik. DI verbindet sie.

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

Request-Validierung via class-validator Decorators:

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

**Ideal für**:
- Große APIs
- Enterprise-Anwendungen
- Teams vertraut mit Angular
- Microservices-Architektur

**Weniger geeignet für**:
- Einfache Scripts oder kleine APIs (Express verwenden)
- Serverless Functions (Cold-Start-Overhead)
- Projekte ohne Decorators/DI

**Vergleich**:
| Feature | NestJS | Express | Fastify |
|---------|--------|---------|---------|
| Struktur | Opinionated | Minimal | Minimal |
| TypeScript | Eingebaut | Add-on | Eingebaut |
| DI | Ja | Nein | Nein |
| Lernkurve | Mittel | Einfach | Einfach |

## Next Steps

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Courses](https://courses.nestjs.com/)
- [Awesome NestJS](https://github.com/nestjs/awesome-nestjs)
- [NestJS Discord](https://discord.gg/nestjs)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Projekt erstellen | `nest new name` |
| Resource generieren | `nest g resource name` |
| Modul generieren | `nest g module name` |
| Service generieren | `nest g service name` |
| GET-Route | `@Get()` / `@Get(':id')` |
| POST-Route | `@Post()` |
| Path-Parameter | `@Param('id') id: string` |
| Query-Parameter | `@Query('page') page: number` |
| Body | `@Body() dto: CreateDto` |
| Headers | `@Headers('auth') auth: string` |
