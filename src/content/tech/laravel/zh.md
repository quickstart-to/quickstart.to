---
title: "Laravel"
description: "5 分钟快速入门 Laravel PHP 框架"
template: "framework"
tags: ["backend", "php", "framework"]
---

## TL;DR

**一句话**：Laravel 是 PHP 的优雅全栈框架——Eloquent ORM、Blade 模板和 artisan CLI 让 Web 开发变得愉快。

**核心优势**：
- Eloquent ORM - 优美的 Active Record 实现
- Blade 模板 - 强大的模板引擎，语法简洁
- Artisan CLI - 代码生成和任务自动化
- 全功能 - 认证、队列、缓存、测试内置

## Core Concepts

### 概念 1：Eloquent ORM

Active Record 模式——每个模型对应一张数据库表：

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

// 查询表达力强
$users = User::where('active', true)
             ->orderBy('name')
             ->get();

$user = User::find(1);
$user->posts;  // 延迟加载关联
```

### 概念 2：路由 → 控制器

清晰的路由到控制器方法：

```php
// routes/web.php
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);

// 资源路由实现 CRUD
Route::resource('posts', PostController::class);

// 控制器
class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show(User $user)  // 路由模型绑定
    {
        return $user;
    }
}
```

### 概念 3：Blade 模板

带继承和组件的简洁模板：

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

### 创建项目

```bash
composer create-project laravel/laravel myapp
cd myapp
```

### 创建路由和控制器

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

### 运行

```bash
php artisan serve
# 打开 http://localhost:8000
```

## Gotchas

### 批量赋值保护

```php
// ❌ MassAssignmentException
User::create($request->all());

// ✅ 定义可填充字段
class User extends Model
{
    protected $fillable = ['name', 'email'];
}

// 或用 guarded 做反向定义
protected $guarded = ['id'];  // 允许除 id 外所有字段
```

### 控制器验证

```php
public function store(Request $request)
{
    // 验证 - 失败时抛出 ValidationException
    $validated = $request->validate([
        'name' => 'required|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8|confirmed',
    ]);

    return User::create($validated);
}
```

### 环境配置

```bash
# .env 文件 - 永远不要提交！
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=laravel

# 在代码中访问
config('app.env');
env('DB_HOST');
```

### Artisan 生成器

```bash
php artisan make:model Post -mcr
# 创建：Model、Migration、Controller（资源型）

php artisan make:migration create_posts_table
php artisan migrate
php artisan migrate:rollback
```

## When to Use

**适合**：
- 全栈 Web 应用
- 有复杂业务逻辑的 API
- 追求快速开发的团队
- 需要认证、队列等功能的项目

**不适合**：
- 微服务（太重）
- 高性能 API（用 Go/Rust）
- 简单脚本

**对比**：
| 特性 | Laravel | Symfony | CodeIgniter |
|------|---------|---------|-------------|
| 体积 | 全栈 | 全栈 | 轻量 |
| ORM | Eloquent | Doctrine | 自定义 |
| 学习 | 简单 | 中等 | 简单 |
| 有主见 | 是 | 较少 | 较少 |

## Next Steps

- [Laravel 文档](https://laravel.com/docs)
- [Laravel Bootcamp](https://bootcamp.laravel.com/)
- [Laracasts](https://laracasts.com/)
- [Laravel News](https://laravel-news.com/)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 创建项目 | `composer create-project laravel/laravel app` |
| 开发服务器 | `php artisan serve` |
| 创建控制器 | `php artisan make:controller Name` |
| 创建模型 | `php artisan make:model Name -m` |
| 运行迁移 | `php artisan migrate` |
| Tinker | `php artisan tinker` |
| 路由列表 | `php artisan route:list` |
| 清除缓存 | `php artisan cache:clear` |
