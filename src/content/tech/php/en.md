---
title: "PHP"
description: "Get started with PHP programming language in 5 minutes"
tags: ["programming", "web", "backend"]
---

## TL;DR

**What**: A server-side scripting language designed for web development.

**Why**: Easy to learn, powers WordPress/Laravel, huge hosting support, rapid development.

## Quick Start

**Install**:

macOS:
```bash
brew install php
```

Linux (Ubuntu/Debian):
```bash
sudo apt install php php-cli
```

Windows: Download from [windows.php.net](https://windows.php.net/download)

**Verify installation**:
```bash
php --version
```

**Hello World**:

Create `hello.php`:
```php
<?php
echo "Hello, World!\n";
```

Run it:
```bash
php hello.php
```

**Built-in web server**:
```bash
php -S localhost:8000
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `php file.php` | Run PHP file |
| `php -S host:port` | Start dev server |
| `php -a` | Interactive mode |
| `php -m` | List modules |
| `php -i` | PHP info |
| `composer init` | Initialize project |
| `composer require pkg` | Add package |
| `composer install` | Install dependencies |

## Gotchas

### == vs ===

```php
0 == "hello"   // true (type juggling!)
0 === "hello"  // false (strict comparison)

// Always use === for comparisons
```

### Arrays are everything

```php
// Indexed array
$arr = [1, 2, 3];

// Associative array (like dict/map)
$user = ["name" => "John", "age" => 30];

// Mixed is allowed
$mixed = [1, "name" => "John", 2];
```

### Variable scope in functions

```php
$x = 10;

function test() {
    // $x is not accessible here!
    global $x;  // Now it is
    echo $x;
}

// Or use closures
$fn = function() use ($x) {
    echo $x;
};
```

## Next Steps

- [PHP Manual](https://www.php.net/manual/) - Official documentation
- [Laravel](https://laravel.com/) - Popular framework
- [Composer](https://getcomposer.org/) - Dependency manager
- [PHP The Right Way](https://phptherightway.com/) - Best practices
