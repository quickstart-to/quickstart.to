---
title: "Laravel"
description: "5 分钟快速入门 Laravel PHP 框架"
tags: ["backend", "php", "framework"]
---

## TL;DR

**是什么**：具有优雅语法的 PHP Web 应用框架。

**为什么用**：功能完整、Eloquent ORM、Blade 模板、优秀的工具链、大型社区。

## Quick Start

**安装 Laravel**：
```bash
composer create-project laravel/laravel myapp
cd myapp
php artisan serve
```

打开 http://localhost:8000

**或使用 Laravel 安装器**：
```bash
composer global require laravel/installer
laravel new myapp
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `php artisan serve` | 启动开发服务器 |
| `php artisan make:controller Name` | 创建控制器 |
| `php artisan make:model Name -m` | 创建模型 + 迁移 |
| `php artisan migrate` | 运行迁移 |
| `php artisan tinker` | 交互式 shell |
| `php artisan route:list` | 列出所有路由 |

## Gotchas

### 路由

```php
// routes/web.php
Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);

// 资源路由（CRUD）
Route::resource('posts', PostController::class);
```

### 控制器

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
// 定义模型
class User extends Model
{
    protected $fillable = ['name', 'email'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

// 查询
User::all();
User::find(1);
User::where('active', true)->get();
User::create(['name' => 'John', 'email' => 'john@example.com']);
```

### Blade 模板

```php
<!-- resources/views/users.blade.php -->
@extends('layouts.app')

@section('content')
    <h1>用户列表</h1>
    @foreach($users as $user)
        <p>{{ $user->name }}</p>
    @endforeach
@endsection
```

## Next Steps

- [Laravel 文档](https://laravel.com/docs) - 官方文档
- [Laracasts](https://laracasts.com/) - 视频教程
- [Laravel News](https://laravel-news.com/) - 社区新闻
- [Laravel Bootcamp](https://bootcamp.laravel.com/) - 官方教程
