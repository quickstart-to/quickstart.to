---
title: "NestJS"
description: "Framework backend Node.js avec TypeScript - architecture style Angular, injection de dependances, patterns entreprise"
template: "framework"
tags: ["backend", "nodejs", "typescript", "framework"]
---

## TL;DR

**En bref** : NestJS est une architecture style Angular pour les backends Node.js - TypeScript, injection de dépendances et patterns enterprise intégrés.

**Points forts** :
- TypeScript-first - décorateurs et typage fort partout
- Injection de dépendances - code testable et modulaire par défaut
- Générateurs CLI - scaffolding des modules, contrôleurs, services
- Prêt pour l'entreprise - guards, interceptors, pipes, filtres

## Core Concepts

### Concept 1: Modules

Tout est organisé en modules. Chaque fonctionnalité a son propre module.

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

Les contrôleurs gèrent HTTP. Les services gèrent la logique. DI les connecte.

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

Validation des requêtes via décorateurs class-validator :

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

**Idéal pour** :
- APIs à grande échelle
- Applications enterprise
- Équipes familières avec Angular
- Architecture microservices

**Moins adapté pour** :
- Scripts simples ou petites APIs (utilisez Express)
- Fonctions serverless (overhead de cold start)
- Projets évitant décorateurs/DI

**Comparaison** :
| Feature | NestJS | Express | Fastify |
|---------|--------|---------|---------|
| Structure | Opinioné | Minimal | Minimal |
| TypeScript | Intégré | Add-on | Intégré |
| DI | Oui | Non | Non |
| Courbe d'apprentissage | Moyenne | Facile | Facile |

## Next Steps

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Courses](https://courses.nestjs.com/)
- [Awesome NestJS](https://github.com/nestjs/awesome-nestjs)
- [NestJS Discord](https://discord.gg/nestjs)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Créer un projet | `nest new name` |
| Générer une ressource | `nest g resource name` |
| Générer un module | `nest g module name` |
| Générer un service | `nest g service name` |
| Route GET | `@Get()` / `@Get(':id')` |
| Route POST | `@Post()` |
| Paramètre de chemin | `@Param('id') id: string` |
| Paramètre de requête | `@Query('page') page: number` |
| Body | `@Body() dto: CreateDto` |
| Headers | `@Headers('auth') auth: string` |
