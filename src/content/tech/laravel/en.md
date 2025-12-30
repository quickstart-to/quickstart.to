---
title: "Laravel"
description: "PHP elegant full-stack framework - Eloquent ORM, Blade templates, Artisan CLI, batteries included for web artisans"
template: "framework"
tags: ["backend", "php", "framework"]
---

## TL;DR

**One-liner**: Laravel is PHP's elegant full-stack framework - Eloquent ORM, Blade templates, and artisan CLI make web development enjoyable.

**Core Strengths**:
- Eloquent ORM - beautiful Active Record implementation
- Blade templates - powerful templating with clean syntax
- Artisan CLI - code generation and task automation
- Batteries included - auth, queues, caching, testing built-in

## Core Concepts

### Concept 1: Eloquent ORM

Active Record pattern - each model maps to a database table:

```php
// Define model
class User extends Model
{
    protected $fillable = ['name', 'email'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

// Queries are expressive
$users = User::where('active', true)
             ->orderBy('name')
             ->get();

$user = User::find(1);
$user->posts;  // Lazy-load relationship
```

### Concept 2: Routes → Controllers

Clean routing to controller methods:

```php
// routes/web.php
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);

// Resource routes for CRUD
Route::resource('posts', PostController::class);

// Controller
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

Clean templating with inheritance and components:

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
# Open http://localhost:8000
```

## Gotchas

### Mass assignment protection

```php
// ❌ MassAssignmentException
User::create($request->all());

// ✅ Define fillable fields
class User extends Model
{
    protected $fillable = ['name', 'email'];
}

// Or use guarded for inverse
protected $guarded = ['id'];  // Allow all except id
```

### Validation in controllers

```php
public function store(Request $request)
{
    // Validate - throws ValidationException on failure
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
# .env file - never commit this!
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=laravel

# Access in code
config('app.env');
env('DB_HOST');
```

### Artisan generators

```bash
php artisan make:model Post -mcr
# Creates: Model, Migration, Controller (resource)

php artisan make:migration create_posts_table
php artisan migrate
php artisan migrate:rollback
```

## When to Use

**Best for**:
- Full-stack web applications
- APIs with complex business logic
- Teams wanting rapid development
- Projects needing auth, queues, etc.

**Not ideal for**:
- Microservices (too heavy)
- High-performance APIs (use Go/Rust)
- Simple scripts

**Comparison**:
| Feature | Laravel | Symfony | CodeIgniter |
|---------|---------|---------|-------------|
| Size | Full-stack | Full-stack | Lightweight |
| ORM | Eloquent | Doctrine | Custom |
| Learning | Easy | Medium | Easy |
| Opinionated | Yes | Less | Less |

## Next Steps

- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Bootcamp](https://bootcamp.laravel.com/)
- [Laracasts](https://laracasts.com/)
- [Laravel News](https://laravel-news.com/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Create project | `composer create-project laravel/laravel app` |
| Dev server | `php artisan serve` |
| Make controller | `php artisan make:controller Name` |
| Make model | `php artisan make:model Name -m` |
| Run migrations | `php artisan migrate` |
| Tinker | `php artisan tinker` |
| Route list | `php artisan route:list` |
| Clear cache | `php artisan cache:clear` |
