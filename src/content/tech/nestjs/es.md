---
title: "NestJS"
description: "Framework backend Node.js con TypeScript - arquitectura estilo Angular, inyeccion de dependencias, patrones empresariales"
template: "framework"
tags: ["backend", "nodejs", "typescript", "framework"]
---

## TL;DR

**En resumen**: NestJS es arquitectura estilo Angular para backends Node.js - TypeScript, inyección de dependencias y patrones enterprise integrados.

**Fortalezas principales**:
- TypeScript-first - decoradores y tipado fuerte en todas partes
- Inyección de dependencias - código testeable y modular por defecto
- Generadores CLI - scaffolding de módulos, controladores, servicios
- Listo para empresa - guards, interceptors, pipes, filtros

## Core Concepts

### Concept 1: Modules

Todo está organizado en módulos. Cada feature tiene su propio módulo.

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

Los controladores manejan HTTP. Los servicios manejan lógica. DI los conecta.

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

Validación de requests via decoradores de class-validator:

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

**Ideal para**:
- APIs a gran escala
- Aplicaciones enterprise
- Equipos familiares con Angular
- Arquitectura de microservicios

**No ideal para**:
- Scripts simples o APIs pequeñas (usa Express)
- Funciones serverless (overhead de cold start)
- Proyectos que evitan decoradores/DI

**Comparación**:
| Feature | NestJS | Express | Fastify |
|---------|--------|---------|---------|
| Estructura | Opinionado | Mínimo | Mínimo |
| TypeScript | Integrado | Add-on | Integrado |
| DI | Sí | No | No |
| Curva de aprendizaje | Media | Fácil | Fácil |

## Next Steps

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Courses](https://courses.nestjs.com/)
- [Awesome NestJS](https://github.com/nestjs/awesome-nestjs)
- [NestJS Discord](https://discord.gg/nestjs)

## Cheatsheet

| Patrón | Código |
|---------|------|
| Crear proyecto | `nest new name` |
| Generar resource | `nest g resource name` |
| Generar módulo | `nest g module name` |
| Generar servicio | `nest g service name` |
| Ruta GET | `@Get()` / `@Get(':id')` |
| Ruta POST | `@Post()` |
| Parámetro de ruta | `@Param('id') id: string` |
| Parámetro de query | `@Query('page') page: number` |
| Body | `@Body() dto: CreateDto` |
| Headers | `@Headers('auth') auth: string` |
