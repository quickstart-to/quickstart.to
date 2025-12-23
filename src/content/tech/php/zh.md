---
title: "PHP"
description: "5 分钟快速入门 PHP 编程语言"
template: "language"
tags: ["programming", "web", "backend"]
---

## TL;DR

**一句话**：PHP 驱动着 70%+ 的 Web 网站——不够时髦，但真的好用。

**核心优势**：
- 易学易部署
- 驱动 WordPress、Laravel、Drupal
- 几乎所有 Web 主机都支持
- Composer 成熟的包管理生态

## Philosophy

PHP 是为 Web 而生的：

- **实用优于纯粹** - 它是为解决实际问题而演进的，不是为了学术上的优雅
- **入门门槛低** - 混合 PHP 和 HTML，输出个变量，刷新浏览器，搞定
- **自带电池** - 数据库、JSON、XML、文件处理全都内置
- **宽容** - 类型转换、默认值，它会尽量让事情能跑起来

现代 PHP（8.x）已经进化很多了——类型、属性、match 表达式、命名参数。这不是你爷爷那个年代的 PHP 了。

## Quick Start

### 安装

```bash
# macOS
brew install php

# Linux (Ubuntu)
sudo apt install php php-cli

# Windows - 从 windows.php.net 下载
```

### 验证（最新版：8.5）

```bash
php --version  # PHP 8.5.1
```

### 第一个程序

创建 `hello.php`：
```php
<?php
echo "Hello, World!\n";
```

```bash
php hello.php
```

### 内置 Web 服务器

```bash
php -S localhost:8000
# 浏览器打开 http://localhost:8000
```

### 交互模式

```bash
php -a
php > echo 2 + 2;
4
```

## Language Essentials

### 变量与类型

```php
// 变量以 $ 开头
$name = "Alice";
$age = 25;
$price = 19.99;
$active = true;

// 数组（索引和关联都支持）
$numbers = [1, 2, 3];
$user = ["name" => "Alice", "age" => 25];

// 类型声明（PHP 7+）
function greet(string $name): string {
    return "Hello, $name!";
}
```

### 控制流

```php
// if-else
if ($age >= 18) {
    echo "成年人";
} elseif ($age >= 13) {
    echo "青少年";
} else {
    echo "儿童";
}

// Match 表达式（PHP 8+）
$status = match($code) {
    200 => "OK",
    404 => "未找到",
    500 => "错误",
    default => "未知"
};

// foreach
foreach ($users as $user) {
    echo $user["name"];
}

foreach ($user as $key => $value) {
    echo "$key: $value";
}
```

### 函数

```php
// 基本函数
function greet($name) {
    return "Hello, $name!";
}

// 默认参数
function greet($name, $greeting = "Hello") {
    return "$greeting, $name!";
}

// 命名参数（PHP 8+）
greet(greeting: "Hi", name: "Alice");

// 箭头函数
$double = fn($x) => $x * 2;
```

### 类

```php
class User {
    public function __construct(
        public string $name,
        public int $age,
        public bool $admin = false
    ) {}

    public function isAdult(): bool {
        return $this->age >= 18;
    }
}

$user = new User("Alice", 25);
echo $user->name;       // Alice
echo $user->isAdult();  // true
```

### 错误处理

```php
// Try-catch
try {
    $result = riskyOperation();
} catch (Exception $e) {
    echo "错误: " . $e->getMessage();
} finally {
    cleanup();
}

// 空安全运算符（PHP 8+）
$name = $user?->profile?->name;

// 空合并
$name = $user["name"] ?? "访客";
```

## Gotchas

### == vs ===

```php
0 == "hello"   // true！（类型转换）
0 === "hello"  // false（严格比较）

// 始终用 === 进行比较
if ($value === false) {
    // 只匹配真正的 false，不匹配 0、""、null
}
```

### 函数中的变量作用域

```php
$x = 10;

function test() {
    // 这里无法访问 $x！
    global $x;  // 现在可以了
    echo $x;
}

// 或使用闭包
$fn = function() use ($x) {
    echo $x;
};
```

### 数组是值传递

```php
$arr1 = [1, 2, 3];
$arr2 = $arr1;      // 复制！
$arr2[] = 4;        // 只有 $arr2 有 4

// 引用传递
function addItem(&$arr, $item) {
    $arr[] = $item;  // 修改原数组
}
```

### 假值无处不在

```php
// 这些全是假值
false, 0, 0.0, "", "0", [], null

// 专门检查 null
if ($value === null) { }

// 检查是否设置且非空
if (!empty($value)) { }
```

## When to Choose

**适合**：
- 内容站点（WordPress、Drupal）
- Web 应用（Laravel、Symfony）
- API（PHP 8+ 配合类型属性）
- 共享主机环境

**不适合**：
- CLI 工具（用 Go、Rust）
- 实时应用（用 Node.js）
- 数据科学（用 Python）

**对比**：
| 方面 | PHP | Python | Node.js |
|------|-----|--------|---------|
| Web 专注 | 原生 | Django/Flask | Express |
| 速度 | 快（8.x） | 中等 | 快 |
| 托管 | 到处都有 | 有限 | VPS |
| 学习难度 | 简单 | 简单 | 中等 |

## Next Steps

- [PHP 手册](https://www.php.net/manual/zh/)
- [Laravel](https://laravel.com/)
- [PHP The Right Way](https://phptherightway.com/)
- [Composer](https://getcomposer.org/)

## Ecosystem

### 包管理

```bash
# Composer（标准）
composer init              # 创建项目
composer require pkg/name  # 添加包
composer install           # 安装依赖
composer update            # 更新依赖
```

### 主流包

- **Web**：Laravel、Symfony、Slim
- **CMS**：WordPress、Drupal
- **测试**：PHPUnit、Pest
- **ORM**：Eloquent、Doctrine
