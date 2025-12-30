---
title: "Laravel"
description: "Framework PHP full-stack elegante - Eloquent ORM, plantillas Blade, CLI Artisan, todo incluido para artesanos web"
template: "framework"
tags: ["backend", "php", "framework"]
---

## TL;DR

**En resumen**: Laravel es el elegante framework full-stack de PHP - Eloquent ORM, plantillas Blade y CLI artisan hacen el desarrollo web agradable.

**Fortalezas principales**:
- Eloquent ORM - hermosa implementación Active Record
- Plantillas Blade - templating potente con sintaxis limpia
- CLI Artisan - generación de código y automatización de tareas
- Todo incluido - auth, colas, caché, testing integrado

## Core Concepts

### Concept 1: Eloquent ORM

Patrón Active Record - cada modelo corresponde a una tabla de base de datos:

```php
// Definir modelo
class User extends Model
{
    protected $fillable = ['name', 'email'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

// Las consultas son expresivas
$users = User::where('active', true)
             ->orderBy('name')
             ->get();

$user = User::find(1);
$user->posts;  // Carga lazy de la relación
```

### Concept 2: Routes → Controllers

Enrutamiento limpio a métodos de controlador:

```php
// routes/web.php
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);

// Rutas resource para CRUD
Route::resource('posts', PostController::class);

// Controlador
class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show(User $user)  // Route model binding
    {
        return $user;
    }
}
```

### Concept 3: Blade Templates

Templating limpio con herencia y componentes:

```php
<!-- layouts/app.blade.php -->
<html>
<body>
    @yield('content')
</body>
</html>

<!-- users/index.blade.php -->
@extends('layouts.app')

@section('content')
    @foreach($users as $user)
        <p>{{ $user->name }}</p>
    @endforeach
@endsection
```

## Quick Start

### Create Project

```bash
composer create-project laravel/laravel myapp
cd myapp
```

### Create a Route and Controller

```bash
php artisan make:controller HelloController
```

```php
// app/Http/Controllers/HelloController.php
class HelloController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Hello Laravel!']);
    }
}

// routes/web.php
Route::get('/', [HelloController::class, 'index']);
```

### Run

```bash
php artisan serve
# Abre http://localhost:8000
```

## Gotchas

### Mass assignment protection

```php
// ❌ MassAssignmentException
User::create($request->all());

// ✅ Definir campos fillable
class User extends Model
{
    protected $fillable = ['name', 'email'];
}

// O usar guarded para lo inverso
protected $guarded = ['id'];  // Permitir todo excepto id
```

### Validation in controllers

```php
public function store(Request $request)
{
    // Validar - lanza ValidationException en caso de fallo
    $validated = $request->validate([
        'name' => 'required|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8|confirmed',
    ]);

    return User::create($validated);
}
```

### Environment configuration

```bash
# Archivo .env - ¡nunca commitear!
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=laravel

# Acceso en el código
config('app.env');
env('DB_HOST');
```

### Artisan generators

```bash
php artisan make:model Post -mcr
# Crea: Model, Migration, Controller (resource)

php artisan make:migration create_posts_table
php artisan migrate
php artisan migrate:rollback
```

## When to Use

**Ideal para**:
- Aplicaciones web full-stack
- APIs con lógica de negocio compleja
- Equipos que quieren desarrollo rápido
- Proyectos que necesitan auth, colas, etc.

**No ideal para**:
- Microservicios (demasiado pesado)
- APIs de alto rendimiento (usa Go/Rust)
- Scripts simples

**Comparación**:
| Feature | Laravel | Symfony | CodeIgniter |
|---------|---------|---------|-------------|
| Tamaño | Full-stack | Full-stack | Ligero |
| ORM | Eloquent | Doctrine | Custom |
| Aprendizaje | Fácil | Medio | Fácil |
| Opinionado | Sí | Menos | Menos |

## Next Steps

- [Documentación de Laravel](https://laravel.com/docs)
- [Laravel Bootcamp](https://bootcamp.laravel.com/)
- [Laracasts](https://laracasts.com/)
- [Laravel News](https://laravel-news.com/)

## Cheatsheet

| Patrón | Código |
|---------|------|
| Crear proyecto | `composer create-project laravel/laravel app` |
| Servidor dev | `php artisan serve` |
| Crear controlador | `php artisan make:controller Name` |
| Crear modelo | `php artisan make:model Name -m` |
| Ejecutar migraciones | `php artisan migrate` |
| Tinker | `php artisan tinker` |
| Lista de rutas | `php artisan route:list` |
| Limpiar caché | `php artisan cache:clear` |
