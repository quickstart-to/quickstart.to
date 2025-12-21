---
title: "Laravel"
description: "Get started with Laravel PHP framework in 5 minutes"
tags: ["backend", "php", "framework"]
---

## TL;DR

**What**: A PHP web application framework with expressive, elegant syntax.

**Why**: Full-featured, Eloquent ORM, Blade templates, great tooling, large community.

## Quick Start

**Install Laravel**:
```bash
composer create-project laravel/laravel myapp
cd myapp
php artisan serve
```

Open http://localhost:8000

**Or with Laravel installer**:
```bash
composer global require laravel/installer
laravel new myapp
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `php artisan serve` | Start dev server |
| `php artisan make:controller Name` | Create controller |
| `php artisan make:model Name -m` | Create model + migration |
| `php artisan migrate` | Run migrations |
| `php artisan tinker` | Interactive shell |
| `php artisan route:list` | List all routes |

## Gotchas

### Routes

```php
// routes/web.php
Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);

// Resource routes (CRUD)
Route::resource('posts', PostController::class);
```

### Controller

```php
class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
        ]);

        $user = User::create($validated);
        return response()->json($user, 201);
    }
}
```

### Eloquent ORM

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

// Queries
User::all();
User::find(1);
User::where('active', true)->get();
User::create(['name' => 'John', 'email' => 'john@example.com']);
```

### Blade Templates

```php
<!-- resources/views/users.blade.php -->
@extends('layouts.app')

@section('content')
    <h1>Users</h1>
    @foreach($users as $user)
        <p>{{ $user->name }}</p>
    @endforeach
@endsection
```

## Next Steps

- [Laravel Documentation](https://laravel.com/docs) - Official docs
- [Laracasts](https://laracasts.com/) - Video tutorials
- [Laravel News](https://laravel-news.com/) - Community news
- [Laravel Bootcamp](https://bootcamp.laravel.com/) - Official tutorial
