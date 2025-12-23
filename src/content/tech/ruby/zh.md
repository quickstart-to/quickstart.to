---
title: "Ruby"
description: "5 分钟快速入门 Ruby 编程语言"
template: "language"
tags: ["programming", "web", "scripting"]
---

## TL;DR

**一句话**：Ruby 是为开发者幸福感设计的——表达力强、优雅、高效。

**核心优势**：
- 优美、可读的语法
- 一切皆对象
- Rails 框架快速开发 Web 应用
- 活跃社区和丰富的 gem 生态

## Philosophy

Ruby 遵循最小惊讶原则：

- **为开发者幸福感优化** - Matz 设计 Ruby 的初衷是让编程变得有趣
- **一切皆对象** - 连数字和 nil 都有方法
- **鸭子类型** - 如果它走起来像鸭子，那它就是鸭子
- **约定优于配置** - 合理的默认值，更少的样板代码

Ruby 重视表达力胜过性能。这是一门让你写出心中所想的语言。

## Quick Start

### 安装

```bash
# macOS
brew install ruby

# Linux - 使用版本管理器（推荐）
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
rbenv install 3.4.8
rbenv global 3.4.8
```

### 验证（最新版：3.4.8）

```bash
ruby --version  # ruby 3.4.8
```

### 第一个程序

创建 `hello.rb`：
```ruby
puts "Hello, World!"
```

```bash
ruby hello.rb
```

### 交互式 Ruby (IRB)

```bash
irb
>> 2 + 2
=> 4
>> "hello".upcase
=> "HELLO"
```

## Language Essentials

### 变量与类型

```ruby
# 变量（无需类型声明）
name = "Alice"
age = 25
price = 19.99
active = true

# Symbol（不可变标识符）
status = :pending

# 数组
numbers = [1, 2, 3]
mixed = [1, "two", :three]

# 哈希（字典）
user = { name: "Alice", age: 25 }
user[:name]  # "Alice"
```

### 控制流

```ruby
# if-else
if age >= 18
  puts "成年人"
elsif age >= 13
  puts "青少年"
else
  puts "儿童"
end

# 单行写法
puts "成年人" if age >= 18

# unless（if 的反义）
puts "未成年" unless age >= 18

# case（模式匹配）
case status
when :pending
  "等待中"
when :active, :running
  "进行中"
else
  "未知"
end
```

### 迭代器与块

```ruby
# 块无处不在
5.times { puts "Hello" }

# each
[1, 2, 3].each { |n| puts n }

# map
doubled = [1, 2, 3].map { |n| n * 2 }  # [2, 4, 6]

# select（过滤）
evens = [1, 2, 3, 4].select { |n| n.even? }  # [2, 4]

# 多行块
numbers.each do |n|
  puts n * 2
end
```

### 方法

```ruby
# 方法定义
def greet(name)
  "Hello, #{name}!"  # 隐式返回
end

# 默认参数
def greet(name, greeting = "Hello")
  "#{greeting}, #{name}!"
end

# 关键字参数
def create_user(name:, age:, admin: false)
  { name: name, age: age, admin: admin }
end

create_user(name: "Alice", age: 25)
```

### 类

```ruby
class User
  attr_accessor :name, :age  # getter 和 setter

  def initialize(name, age)
    @name = name  # 实例变量
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

### nil 是假值，但 0 和 "" 是真值

```ruby
if nil
  # 不会执行
end

if 0
  puts "0 是真值！"  # 会打印！
end

if ""
  puts "空字符串是真值！"  # 会打印！
end
```

### Symbol vs String

```ruby
# Symbol 不可变且内存高效
:name.object_id == :name.object_id  # true

# String 可变
"name".object_id == "name".object_id  # false

# 用 symbol 作为哈希键
user = { name: "Alice" }  # Symbol 键
user[:name]               # 用 symbol 访问
```

### 隐式返回

```ruby
def add(a, b)
  a + b  # 最后一个表达式的值被返回
end

# 只在需要时显式 return
def early_exit(n)
  return "negative" if n < 0
  n * 2
end
```

### 方法命名约定

```ruby
# ? 用于判断方法（返回布尔值）
"hello".empty?    # false
[1, 2].include?(1)  # true

# ! 用于危险/修改性方法
str = "hello"
str.upcase   # 返回 "HELLO"，str 不变
str.upcase!  # 原地修改 str
```

## When to Choose

**适合**：
- Web 应用（Ruby on Rails）
- 快速原型开发
- 脚本和自动化
- 需要快速开发的创业公司

**不适合**：
- 性能关键的应用
- 移动开发
- 数据科学（用 Python）

**对比**：
| 方面 | Ruby | Python | JavaScript |
|------|------|--------|------------|
| Web 框架 | Rails | Django | Express |
| 语法 | 优雅 | 简洁 | 灵活 |
| 速度 | 慢 | 中等 | 中等 |
| 用途 | Web | 通用 | 全栈 |

## Next Steps

- [Ruby 文档](https://www.ruby-lang.org/zh_cn/documentation/)
- [20 分钟体验 Ruby](https://www.ruby-lang.org/zh_cn/documentation/quickstart/)
- [Ruby on Rails](/rails)
- [RubyGems](https://rubygems.org/)

## Ecosystem

### 包管理

```bash
gem install rails       # 安装 gem
gem list                # 列出已安装的 gem
bundle init             # 创建 Gemfile
bundle install          # 安装依赖
```

### 主流 Gem

- **Web**：Rails、Sinatra、Hanami
- **测试**：RSpec、Minitest
- **数据库**：ActiveRecord、Sequel
- **后台任务**：Sidekiq、Resque
