---
title: "Ruby"
description: "5 分钟快速入门 Ruby 编程语言"
tags: ["programming", "web", "scripting"]
---

## TL;DR

**是什么**：一种动态、富有表现力的编程语言，专注于开发者的幸福感。

**为什么用**：优雅的语法、Rails 框架、非常适合创业公司和快速原型开发。

## Quick Start

**安装**：

macOS:
```bash
brew install ruby
```

Linux (Ubuntu/Debian):
```bash
sudo apt install ruby-full
```

或使用 rbenv/rvm 进行版本管理：
```bash
brew install rbenv
rbenv install 3.3.0
rbenv global 3.3.0
```

**验证安装**：
```bash
ruby --version
```

**Hello World**：

创建 `hello.rb`：
```ruby
puts "Hello, World!"
```

运行：
```bash
ruby hello.rb
```

**交互式 Ruby (IRB)**：
```bash
irb
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `ruby file.rb` | 运行 Ruby 文件 |
| `irb` | 交互式 Ruby |
| `gem install name` | 安装 gem |
| `gem list` | 列出已安装的 gems |
| `bundle init` | 创建 Gemfile |
| `bundle install` | 安装依赖 |
| `ruby -e 'code'` | 运行内联代码 |

## Gotchas

### 一切皆对象

```ruby
5.times { puts "Hello" }
"hello".upcase  # "HELLO"
[1,2,3].sum     # 6
```

### Symbol vs String

```ruby
:name           # Symbol - 不可变，内存高效
"name"          # String - 可变

# 使用 symbol 作为 hash 的键
user = { name: "John", age: 30 }
user[:name]     # "John"
```

### 隐式返回

```ruby
def add(a, b)
  a + b  # 最后一个表达式的值会被返回
end

add(2, 3)  # 5
```

### nil 是假值，但 0 是真值

```ruby
if nil
  puts "不会打印"
end

if 0
  puts "会打印！"  # 在 Ruby 中 0 是真值
end
```

## Next Steps

- [Ruby 文档](https://www.ruby-lang.org/zh_cn/documentation/) - 官方文档
- [20 分钟体验 Ruby](https://www.ruby-lang.org/zh_cn/documentation/quickstart/) - 快速教程
- [Ruby on Rails](https://rubyonrails.org/) - Web 框架
- [RubyGems](https://rubygems.org/) - 包仓库
