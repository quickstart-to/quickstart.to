---
title: "PHP"
description: "Web's most deployed language - powers WordPress and Laravel with easy hosting and mature ecosystem"
template: "language"
tags: ["programming", "web", "backend"]
---

## TL;DR

**One-liner**: PHP powers 70%+ of the web - it's not sexy, but it works.

**Core Strengths**:
- Easy to learn, easy to deploy
- Powers WordPress, Laravel, Drupal
- Available on virtually every web host
- Mature ecosystem with Composer

## Philosophy

PHP was built for the web:

- **Pragmatic over pure** - It evolved to solve real problems, not to be academically elegant
- **Low barrier to entry** - Mix PHP and HTML, echo a variable, refresh browser, done
- **Batteries included** - Database, JSON, XML, file handling all built-in
- **Forgiving** - Type coercion, default values, it tries to make things work

Modern PHP (8.x) has evolved significantly - types, attributes, match expressions, named arguments. It's not your grandpa's PHP anymore.

## Quick Start

### Install

```bash
# macOS
brew install php

# Linux (Ubuntu)
sudo apt install php php-cli

# Windows - download from windows.php.net
```

### Verify (latest: 8.5)

```bash
php --version  # PHP 8.5.1
```

### First Program

Create `hello.php`:
```php
<?php
echo "Hello, World!\n";
```

```bash
php hello.php
```

### Built-in Web Server

```bash
php -S localhost:8000
# Open http://localhost:8000 in browser
```

### Interactive Mode

```bash
php -a
php > echo 2 + 2;
4
```

## Language Essentials

### Variables & Types

```php
// Variables start with $
$name = "Alice";
$age = 25;
$price = 19.99;
$active = true;

// Arrays (both indexed and associative)
$numbers = [1, 2, 3];
$user = ["name" => "Alice", "age" => 25];

// Type declarations (PHP 7+)
function greet(string $name): string {
    return "Hello, $name!";
}
```

### Control Flow

```php
// if-else
if ($age >= 18) {
    echo "Adult";
} elseif ($age >= 13) {
    echo "Teen";
} else {
    echo "Child";
}

// Match expression (PHP 8+)
$status = match($code) {
    200 => "OK",
    404 => "Not Found",
    500 => "Error",
    default => "Unknown"
};

// foreach
foreach ($users as $user) {
    echo $user["name"];
}

foreach ($user as $key => $value) {
    echo "$key: $value";
}
```

### Functions

```php
// Basic function
function greet($name) {
    return "Hello, $name!";
}

// Default parameters
function greet($name, $greeting = "Hello") {
    return "$greeting, $name!";
}

// Named arguments (PHP 8+)
greet(greeting: "Hi", name: "Alice");

// Arrow functions
$double = fn($x) => $x * 2;
```

### Classes

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

### Error Handling

```php
// Try-catch
try {
    $result = riskyOperation();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
} finally {
    cleanup();
}

// Null safe operator (PHP 8+)
$name = $user?->profile?->name;

// Null coalescing
$name = $user["name"] ?? "Guest";
```

## Gotchas

### == vs ===

```php
0 == "hello"   // true! (type juggling)
0 === "hello"  // false (strict comparison)

// Always use === for comparisons
if ($value === false) {
    // Only matches actual false, not 0, "", or null
}
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

### Arrays are passed by value

```php
$arr1 = [1, 2, 3];
$arr2 = $arr1;      // Copy!
$arr2[] = 4;        // Only $arr2 has 4

// Pass by reference
function addItem(&$arr, $item) {
    $arr[] = $item;  // Modifies original
}
```

### Falsy values are everywhere

```php
// All of these are falsy
false, 0, 0.0, "", "0", [], null

// Check for null specifically
if ($value === null) { }

// Check if set and not empty
if (!empty($value)) { }
```

## When to Choose

**Best for**:
- Content sites (WordPress, Drupal)
- Web applications (Laravel, Symfony)
- APIs (PHP 8+ with typed properties)
- Shared hosting environments

**Not ideal for**:
- CLI tools (use Go, Rust)
- Real-time applications (use Node.js)
- Data science (use Python)

**Comparison**:
| Aspect | PHP | Python | Node.js |
|--------|-----|--------|---------|
| Web focus | Native | Django/Flask | Express |
| Speed | Fast (8.x) | Medium | Fast |
| Hosting | Everywhere | Limited | VPS |
| Learning | Easy | Easy | Medium |

## Next Steps

- [PHP Manual](https://www.php.net/manual/)
- [Laravel](https://laravel.com/)
- [PHP The Right Way](https://phptherightway.com/)
- [Composer](https://getcomposer.org/)

## Ecosystem

### Package Management

```bash
# Composer (the standard)
composer init              # Create project
composer require pkg/name  # Add package
composer install           # Install dependencies
composer update            # Update dependencies
```

### Popular Packages

- **Web**: Laravel, Symfony, Slim
- **CMS**: WordPress, Drupal
- **Testing**: PHPUnit, Pest
- **ORM**: Eloquent, Doctrine
