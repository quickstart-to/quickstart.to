---
title: "Laravel"
description: "Starten Sie mit dem Laravel PHP-Framework in 5 Minuten"
template: "framework"
tags: ["backend", "php", "framework"]
---

## TL;DR

**Einzeiler**: Laravel ist PHPs elegantes Full-Stack-Framework - Eloquent ORM, Blade-Templates und Artisan CLI machen Webentwicklung angenehm.

**Kernstärken**:
- Eloquent ORM - wunderschöne Active Record-Implementierung
- Blade-Templates - mächtiges Templating mit sauberer Syntax
- Artisan CLI - Codegenerierung und Aufgabenautomatisierung
- Alles inklusive - Auth, Queues, Caching, Testing integriert

## Core Concepts

### Concept 1: Eloquent ORM

Active Record-Pattern - jedes Model entspricht einer Datenbanktabelle:

```php
// Model definieren
class User extends Model
{
    protected $fillable = ['name', 'email'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

// Abfragen sind ausdrucksstark
$users = User::where('active', true)
             ->orderBy('name')
             ->get();

$user = User::find(1);
$user->posts;  // Lazy-Load-Beziehung
```

### Concept 2: Routes → Controllers

Sauberes Routing zu Controller-Methoden:

```php
// routes/web.php
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);

// Resource-Routen für CRUD
Route::resource('posts', PostController::class);

// Controller
class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show(User $user)  // Route-Model-Binding
    {
        return $user;
    }
}
```

### Concept 3: Blade Templates

Sauberes Templating mit Vererbung und Komponenten:

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
# Öffnen Sie http://localhost:8000
```

## Gotchas

### Mass assignment protection

```php
// ❌ MassAssignmentException
User::create($request->all());

// ✅ Füllbare Felder definieren
class User extends Model
{
    protected $fillable = ['name', 'email'];
}

// Oder guarded für das Gegenteil verwenden
protected $guarded = ['id'];  // Alles außer id erlauben
```

### Validation in controllers

```php
public function store(Request $request)
{
    // Validieren - wirft ValidationException bei Fehler
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
# .env-Datei - niemals committen!
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=laravel

# Zugriff im Code
config('app.env');
env('DB_HOST');
```

### Artisan generators

```bash
php artisan make:model Post -mcr
# Erstellt: Model, Migration, Controller (resource)

php artisan make:migration create_posts_table
php artisan migrate
php artisan migrate:rollback
```

## When to Use

**Ideal für**:
- Full-Stack-Webanwendungen
- APIs mit komplexer Geschäftslogik
- Teams, die schnelle Entwicklung wünschen
- Projekte, die Auth, Queues etc. benötigen

**Nicht ideal für**:
- Microservices (zu schwer)
- Hochleistungs-APIs (verwenden Sie Go/Rust)
- Einfache Skripte

**Vergleich**:
| Feature | Laravel | Symfony | CodeIgniter |
|---------|---------|---------|-------------|
| Umfang | Full-Stack | Full-Stack | Leichtgewichtig |
| ORM | Eloquent | Doctrine | Custom |
| Lernen | Einfach | Mittel | Einfach |
| Meinungsstark | Ja | Weniger | Weniger |

## Next Steps

- [Laravel Dokumentation](https://laravel.com/docs)
- [Laravel Bootcamp](https://bootcamp.laravel.com/)
- [Laracasts](https://laracasts.com/)
- [Laravel News](https://laravel-news.com/)

## Cheatsheet

| Muster | Code |
|---------|------|
| Projekt erstellen | `composer create-project laravel/laravel app` |
| Dev-Server | `php artisan serve` |
| Controller erstellen | `php artisan make:controller Name` |
| Model erstellen | `php artisan make:model Name -m` |
| Migrations ausführen | `php artisan migrate` |
| Tinker | `php artisan tinker` |
| Routenliste | `php artisan route:list` |
| Cache leeren | `php artisan cache:clear` |
