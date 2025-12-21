---
title: "PHP"
description: "5 分钟快速入门 PHP 编程语言"
tags: ["programming", "web", "backend"]
---

## TL;DR

**是什么**：专为 Web 开发设计的服务器端脚本语言。

**为什么用**：易于学习、驱动 WordPress/Laravel、广泛的托管支持、快速开发。

## Quick Start

**安装**：

macOS:
```bash
brew install php
```

Linux (Ubuntu/Debian):
```bash
sudo apt install php php-cli
```

Windows: 从 [windows.php.net](https://windows.php.net/download) 下载

**验证安装**：
```bash
php --version
```

**Hello World**：

创建 `hello.php`：
```php
<?php
echo "Hello, World!\n";
```

运行：
```bash
php hello.php
```

**内置 Web 服务器**：
```bash
php -S localhost:8000
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `php file.php` | 运行 PHP 文件 |
| `php -S host:port` | 启动开发服务器 |
| `php -a` | 交互模式 |
| `php -m` | 列出模块 |
| `php -i` | PHP 信息 |
| `composer init` | 初始化项目 |
| `composer require pkg` | 添加包 |
| `composer install` | 安装依赖 |

## Gotchas

### == vs ===

```php
0 == "hello"   // true（类型转换！）
0 === "hello"  // false（严格比较）

// 始终使用 === 进行比较
```

### 数组即一切

```php
// 索引数组
$arr = [1, 2, 3];

// 关联数组（类似字典/映射）
$user = ["name" => "John", "age" => 30];

// 混合也可以
$mixed = [1, "name" => "John", 2];
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

## Next Steps

- [PHP 手册](https://www.php.net/manual/zh/) - 官方文档
- [Laravel](https://laravel.com/) - 流行框架
- [Composer](https://getcomposer.org/) - 依赖管理器
- [PHP The Right Way](https://phptherightway.com/) - 最佳实践
