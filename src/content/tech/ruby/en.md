---
title: "Ruby"
description: "Get started with Ruby programming language in 5 minutes"
tags: ["programming", "web", "scripting"]
---

## TL;DR

**What**: A dynamic, expressive programming language focused on developer happiness.

**Why**: Elegant syntax, Rails framework, great for startups and rapid prototyping.

## Quick Start

**Install**:

macOS:
```bash
brew install ruby
```

Linux (Ubuntu/Debian):
```bash
sudo apt install ruby-full
```

Or use rbenv/rvm for version management:
```bash
brew install rbenv
rbenv install 3.3.0
rbenv global 3.3.0
```

**Verify installation**:
```bash
ruby --version
```

**Hello World**:

Create `hello.rb`:
```ruby
puts "Hello, World!"
```

Run it:
```bash
ruby hello.rb
```

**Interactive Ruby (IRB)**:
```bash
irb
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `ruby file.rb` | Run Ruby file |
| `irb` | Interactive Ruby |
| `gem install name` | Install a gem |
| `gem list` | List installed gems |
| `bundle init` | Create Gemfile |
| `bundle install` | Install dependencies |
| `ruby -e 'code'` | Run inline code |

## Gotchas

### Everything is an object

```ruby
5.times { puts "Hello" }
"hello".upcase  # "HELLO"
[1,2,3].sum     # 6
```

### Symbols vs Strings

```ruby
:name           # Symbol - immutable, memory efficient
"name"          # String - mutable

# Use symbols for hash keys
user = { name: "John", age: 30 }
user[:name]     # "John"
```

### Implicit return

```ruby
def add(a, b)
  a + b  # Last expression is returned
end

add(2, 3)  # 5
```

### nil is falsy, but 0 is truthy

```ruby
if nil
  puts "won't print"
end

if 0
  puts "will print!"  # 0 is truthy in Ruby
end
```

## Next Steps

- [Ruby Documentation](https://www.ruby-lang.org/en/documentation/) - Official docs
- [Ruby in 20 Minutes](https://www.ruby-lang.org/en/documentation/quickstart/) - Quick tutorial
- [Ruby on Rails](https://rubyonrails.org/) - Web framework
- [RubyGems](https://rubygems.org/) - Package registry
