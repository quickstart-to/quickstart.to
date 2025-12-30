---
title: "Laravel"
description: "Démarrez avec le framework PHP Laravel en 5 minutes"
template: "framework"
tags: ["backend", "php", "framework"]
---

## TL;DR

**En bref** : Laravel est le framework full-stack élégant de PHP - Eloquent ORM, templates Blade et CLI artisan rendent le développement web agréable.

**Points forts** :
- Eloquent ORM - belle implémentation Active Record
- Templates Blade - templating puissant avec syntaxe propre
- CLI Artisan - génération de code et automatisation des tâches
- Batteries incluses - auth, queues, cache, tests intégrés

## Core Concepts

### Concept 1: Eloquent ORM

Pattern Active Record - chaque modèle correspond à une table de base de données :

```php
// Définir le modèle
class User extends Model
{
    protected $fillable = ['name', 'email'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

// Les requêtes sont expressives
$users = User::where('active', true)
             ->orderBy('name')
             ->get();

$user = User::find(1);
$user->posts;  // Chargement lazy de la relation
```

### Concept 2: Routes → Controllers

Routage propre vers les méthodes de contrôleur :

```php
// routes/web.php
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);

// Routes resource pour CRUD
Route::resource('posts', PostController::class);

// Contrôleur
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

Templating propre avec héritage et composants :

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
# Ouvrez http://localhost:8000
```

## Gotchas

### Mass assignment protection

```php
// ❌ MassAssignmentException
User::create($request->all());

// ✅ Définir les champs fillable
class User extends Model
{
    protected $fillable = ['name', 'email'];
}

// Ou utiliser guarded pour l'inverse
protected $guarded = ['id'];  // Autoriser tout sauf id
```

### Validation in controllers

```php
public function store(Request $request)
{
    // Valider - lance ValidationException en cas d'échec
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
# Fichier .env - ne jamais commiter !
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=laravel

# Accès dans le code
config('app.env');
env('DB_HOST');
```

### Artisan generators

```bash
php artisan make:model Post -mcr
# Crée : Model, Migration, Controller (resource)

php artisan make:migration create_posts_table
php artisan migrate
php artisan migrate:rollback
```

## When to Use

**Idéal pour** :
- Applications web full-stack
- APIs avec logique métier complexe
- Équipes voulant un développement rapide
- Projets nécessitant auth, queues, etc.

**Moins adapté pour** :
- Microservices (trop lourd)
- APIs haute performance (utilisez Go/Rust)
- Scripts simples

**Comparaison** :
| Feature | Laravel | Symfony | CodeIgniter |
|---------|---------|---------|-------------|
| Taille | Full-stack | Full-stack | Léger |
| ORM | Eloquent | Doctrine | Custom |
| Apprentissage | Facile | Moyen | Facile |
| Opinioné | Oui | Moins | Moins |

## Next Steps

- [Documentation Laravel](https://laravel.com/docs)
- [Laravel Bootcamp](https://bootcamp.laravel.com/)
- [Laracasts](https://laracasts.com/)
- [Laravel News](https://laravel-news.com/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Créer un projet | `composer create-project laravel/laravel app` |
| Serveur dev | `php artisan serve` |
| Créer contrôleur | `php artisan make:controller Name` |
| Créer modèle | `php artisan make:model Name -m` |
| Exécuter migrations | `php artisan migrate` |
| Tinker | `php artisan tinker` |
| Liste des routes | `php artisan route:list` |
| Vider le cache | `php artisan cache:clear` |
