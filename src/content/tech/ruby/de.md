---
title: "Ruby"
description: "Starten Sie mit der Programmiersprache Ruby in 5 Minuten"
template: "language"
tags: ["programming", "web", "scripting"]
---

## TL;DR

**Kurzfassung**: Ruby wurde für Entwicklerzufriedenheit entwickelt - ausdrucksstark, elegant und produktiv.

**Kernstärken**:
- Schöne, lesbare Syntax
- Alles ist ein Objekt
- Rails-Framework für schnelle Webentwicklung
- Lebendige Community und reiches Gem-Ökosystem

## Philosophy

Ruby folgt dem Prinzip der geringsten Überraschung:

- **Optimiert für Entwicklerzufriedenheit** - Matz hat Ruby so gestaltet, dass es Spaß macht
- **Alles ist ein Objekt** - Sogar Zahlen und nil haben Methoden
- **Duck Typing** - Wenn es wie eine Ente läuft, ist es eine Ente
- **Konvention über Konfiguration** - Sinnvolle Standardwerte, weniger Boilerplate

Ruby schätzt Ausdruckskraft über Performance. Es ist eine Sprache, in der man schreibt, was man meint.

## Quick Start

### Install

```bash
# macOS
brew install ruby

# Linux - use version manager (recommended)
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
rbenv install 3.4.8
rbenv global 3.4.8
```

### Verify (latest: 3.4.8)

```bash
ruby --version  # ruby 3.4.8
```

### First Program

Erstelle `hello.rb`:
```ruby
puts "Hello, World!"
```

```bash
ruby hello.rb
```

### Interactive Ruby (IRB)

```bash
irb
>> 2 + 2
=> 4
>> "hello".upcase
=> "HELLO"
```

## Language Essentials

### Variables & Types

```ruby
# Variables (no type declarations)
name = "Alice"
age = 25
price = 19.99
active = true

# Symbols (immutable identifiers)
status = :pending

# Arrays
numbers = [1, 2, 3]
mixed = [1, "two", :three]

# Hashes (dictionaries)
user = { name: "Alice", age: 25 }
user[:name]  # "Alice"
```

### Control Flow

```ruby
# if-else
if age >= 18
  puts "Adult"
elsif age >= 13
  puts "Teen"
else
  puts "Child"
end

# One-liner
puts "Adult" if age >= 18

# unless (opposite of if)
puts "Minor" unless age >= 18

# case (pattern matching)
case status
when :pending
  "Waiting"
when :active, :running
  "In progress"
else
  "Unknown"
end
```

### Iterators & Blocks

```ruby
# Blocks are everywhere
5.times { puts "Hello" }

# each
[1, 2, 3].each { |n| puts n }

# map
doubled = [1, 2, 3].map { |n| n * 2 }  # [2, 4, 6]

# select (filter)
evens = [1, 2, 3, 4].select { |n| n.even? }  # [2, 4]

# Multi-line block
numbers.each do |n|
  puts n * 2
end
```

### Methods

```ruby
# Method definition
def greet(name)
  "Hello, #{name}!"  # Implicit return
end

# Default parameters
def greet(name, greeting = "Hello")
  "#{greeting}, #{name}!"
end

# Keyword arguments
def create_user(name:, age:, admin: false)
  { name: name, age: age, admin: admin }
end

create_user(name: "Alice", age: 25)
```

### Classes

```ruby
class User
  attr_accessor :name, :age  # Getters and setters

  def initialize(name, age)
    @name = name  # Instance variable
    @age = age
  end

  def adult?
    @age >= 18
  end
end

user = User.new("Alice", 25)
user.name       # "Alice"
user.adult?     # true
```

## Gotchas

### nil ist falsy, aber 0 und "" sind truthy

```ruby
if nil
  # won't run
end

if 0
  puts "0 is truthy!"  # Will print!
end

if ""
  puts "empty string is truthy!"  # Will print!
end
```

### Symbols vs Strings

```ruby
# Symbols are immutable and memory-efficient
:name.object_id == :name.object_id  # true

# Strings are mutable
"name".object_id == "name".object_id  # false

# Use symbols for hash keys
user = { name: "Alice" }  # Symbol key
user[:name]               # Access with symbol
```

### Impliziter Return

```ruby
def add(a, b)
  a + b  # Last expression is returned
end

# Explicit return only when needed
def early_exit(n)
  return "negative" if n < 0
  n * 2
end
```

### Methoden-Benennungskonventionen

```ruby
# ? for predicates (return boolean)
"hello".empty?    # false
[1, 2].include?(1)  # true

# ! for dangerous/mutating methods
str = "hello"
str.upcase   # Returns "HELLO", str unchanged
str.upcase!  # Modifies str in place
```

## When to Choose

**Ideal für**:
- Webanwendungen (Ruby on Rails)
- Rapid Prototyping
- Scripting und Automatisierung
- Startups, die schnelle Entwicklung brauchen

**Nicht ideal für**:
- Performance-kritische Anwendungen
- Mobile Entwicklung
- Data Science (Python verwenden)

**Vergleich**:
| Aspekt | Ruby | Python | JavaScript |
|--------|------|--------|------------|
| Web-Framework | Rails | Django | Express |
| Syntax | Elegant | Sauber | Flexibel |
| Geschwindigkeit | Langsam | Mittel | Mittel |
| Anwendungsfall | Web | Allgemein | Full-Stack |

## Next Steps

- [Ruby Documentation](https://www.ruby-lang.org/en/documentation/)
- [Ruby in 20 Minutes](https://www.ruby-lang.org/en/documentation/quickstart/)
- [Ruby on Rails](/rails)
- [RubyGems](https://rubygems.org/)

## Ecosystem

### Package Management

```bash
gem install rails       # Install a gem
gem list                # List installed gems
bundle init             # Create Gemfile
bundle install          # Install dependencies
```

### Popular Gems

- **Web**: Rails, Sinatra, Hanami
- **Testing**: RSpec, Minitest
- **Database**: ActiveRecord, Sequel
- **Background Jobs**: Sidekiq, Resque
