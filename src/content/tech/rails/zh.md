---
title: "Ruby on Rails"
description: "5 分钟快速入门 Ruby on Rails 框架"
template: "framework"
tags: ["backend", "ruby", "framework"]
---

## TL;DR

**一句话**：Rails 是 Ruby 的全栈框架——约定优于配置意味着用合理默认值快速开发。

**核心优势**：
- 约定优于配置 - 少做决定，多写代码
- 生成器 - 几秒内搭建整个功能
- Active Record - 优雅的 ORM 带迁移
- 全功能 - 认证、邮件、任务队列都内置

## Core Concepts

### 概念 1：MVC 架构

模型、视图、控制器清晰分离：

```ruby
# app/models/post.rb
class Post < ApplicationRecord
  validates :title, presence: true
  has_many :comments
end

# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end
end

# app/views/posts/index.html.erb
<% @posts.each do |post| %>
  <h2><%= post.title %></h2>
<% end %>
```

### 概念 2：RESTful 路由

面向资源的路由：

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root "posts#index"

  resources :posts do
    resources :comments, only: [:create, :destroy]
  end

  # 生成：GET /posts, POST /posts, GET /posts/:id 等
end
```

### 概念 3：Active Record

查询接口和验证：

```ruby
# 查询
Post.all
Post.find(1)
Post.where(published: true).order(created_at: :desc)
Post.first(5)

# 创建
Post.create(title: "Hello", body: "World")

# 更新
post.update(title: "New Title")

# 关联
user.posts.create(title: "My Post")
post.comments
```

## Quick Start

### 安装 Rails

```bash
gem install rails
```

### 创建项目

```bash
rails new myapp
cd myapp
```

### 生成资源

```bash
rails generate scaffold Post title:string body:text published:boolean
rails db:migrate
```

### 运行

```bash
rails server
# 打开 http://localhost:3000/posts
```

## Gotchas

### 强参数

```ruby
class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to @post
    else
      render :new
    end
  end

  private

  # 白名单允许的参数
  def post_params
    params.require(:post).permit(:title, :body, :published)
  end
end
```

### 验证

```ruby
class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8 }
  validates :age, numericality: { greater_than: 0 }, allow_nil: true

  validate :custom_validation

  private

  def custom_validation
    errors.add(:base, "自定义错误") if some_condition
  end
end
```

### 回调

```ruby
class Post < ApplicationRecord
  before_save :normalize_title
  after_create :send_notification

  private

  def normalize_title
    self.title = title.titleize
  end

  def send_notification
    PostMailer.new_post(self).deliver_later
  end
end
```

### 迁移

```bash
rails generate migration AddCategoryToPosts category:string
rails db:migrate
rails db:rollback  # 撤销上次迁移
```

```ruby
class AddCategoryToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :category, :string
    add_index :posts, :category
  end
end
```

## When to Use

**适合**：
- 全栈 Web 应用
- 快速原型和 MVP
- CRUD 密集型应用
- 追求生产力的团队

**不适合**：
- 微服务（太重）
- 实时应用（用 Phoenix/Elixir）
- 不熟悉 Ruby 的团队

**对比**：
| 特性 | Rails | Django | Laravel |
|------|-------|--------|---------|
| 语言 | Ruby | Python | PHP |
| 理念 | 约定 | 显式 | 优雅 |
| ORM | Active Record | Django ORM | Eloquent |
| 学习 | 中等 | 中等 | 简单 |

## Next Steps

- [Rails 指南](https://guides.rubyonrails.org/)
- [Rails 教程](https://www.railstutorial.org/)
- [Rails API](https://api.rubyonrails.org/)
- [GoRails](https://gorails.com/)

## Cheatsheet

| 命令 | 用途 |
|------|------|
| `rails new app` | 创建项目 |
| `rails server` | 启动服务器 |
| `rails console` | 交互式 shell |
| `rails generate scaffold Model` | 完整 CRUD |
| `rails generate model Model` | 模型 + 迁移 |
| `rails generate controller Name` | 控制器 |
| `rails db:migrate` | 运行迁移 |
| `rails db:rollback` | 撤销迁移 |
| `rails routes` | 显示路由 |
| `rails test` | 运行测试 |
