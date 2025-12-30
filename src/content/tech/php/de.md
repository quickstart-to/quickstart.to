---
title: "PHP"
description: "Meistverbreitete Web-Sprache - betreibt WordPress und Laravel mit einfachem Hosting und reifem Okosystem"
template: "language"
tags: ["programming", "web", "backend"]
---

## TL;DR

**Kurzfassung**: PHP betreibt 70%+ des Webs - es ist nicht sexy, aber es funktioniert.

**Kernstärken**:
- Einfach zu lernen, einfach zu deployen
- Betreibt WordPress, Laravel, Drupal
- Auf praktisch jedem Webhost verfügbar
- Ausgereiftes Ökosystem mit Composer

## Philosophy

PHP wurde für das Web gebaut:

- **Pragmatisch statt pur** - Es hat sich entwickelt, um echte Probleme zu lösen, nicht um akademisch elegant zu sein
- **Niedrige Einstiegshürde** - PHP und HTML mischen, Variable ausgeben, Browser aktualisieren, fertig
- **Batterien inklusive** - Datenbank, JSON, XML, Dateiverarbeitung alles eingebaut
- **Nachsichtig** - Typumwandlung, Standardwerte, es versucht, Dinge zum Laufen zu bringen

Modernes PHP (8.x) hat sich erheblich weiterentwickelt - Typen, Attribute, Match-Ausdrücke, benannte Argumente. Es ist nicht mehr das PHP deines Opas.

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

Erstelle `hello.php`:
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

**Ideal für**:
- Content-Sites (WordPress, Drupal)
- Webanwendungen (Laravel, Symfony)
- APIs (PHP 8+ mit typisierten Eigenschaften)
- Shared-Hosting-Umgebungen

**Weniger geeignet für**:
- CLI-Tools (Go, Rust verwenden)
- Echtzeit-Anwendungen (Node.js verwenden)
- Data Science (Python verwenden)

**Vergleich**:
| Aspekt | PHP | Python | Node.js |
|--------|-----|--------|---------|
| Web-Fokus | Nativ | Django/Flask | Express |
| Geschwindigkeit | Schnell (8.x) | Mittel | Schnell |
| Hosting | Überall | Begrenzt | VPS |
| Lernen | Einfach | Einfach | Mittel |

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
