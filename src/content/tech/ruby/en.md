---
title: "Ruby"
description: "Get started with Ruby programming language in 5 minutes"
template: "language"
tags: ["programming", "web", "scripting"]
---

## TL;DR

**One-liner**: Ruby is designed for developer happiness - expressive, elegant, and productive.

**Core Strengths**:
- Beautiful, readable syntax
- Everything is an object
- Rails framework for rapid web development
- Vibrant community and rich gems ecosystem

## Philosophy

Ruby follows the principle of least surprise:

- **Optimized for developer happiness** - Matz designed Ruby to be fun to use
- **Everything is an object** - Even numbers and nil have methods
- **Duck typing** - If it walks like a duck, it's a duck
- **Convention over configuration** - Sensible defaults, less boilerplate

Ruby values expressiveness over performance. It's a language where you write what you mean.

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

Create `hello.rb`:
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

### nil is falsy, but 0 and "" are truthy

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

### Implicit return

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

### Method naming conventions

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

**Best for**:
- Web applications (Ruby on Rails)
- Rapid prototyping
- Scripting and automation
- Startups needing fast development

**Not ideal for**:
- Performance-critical applications
- Mobile development
- Data science (use Python)

**Comparison**:
| Aspect | Ruby | Python | JavaScript |
|--------|------|--------|------------|
| Web framework | Rails | Django | Express |
| Syntax | Elegant | Clean | Flexible |
| Speed | Slow | Medium | Medium |
| Use case | Web | General | Full-stack |

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
- **Background jobs**: Sidekiq, Resque
