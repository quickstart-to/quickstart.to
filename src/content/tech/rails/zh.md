---
title: "Ruby on Rails"
description: "5 分钟快速入门 Ruby on Rails 框架"
tags: ["backend", "ruby", "framework"]
---

## TL;DR

**是什么**：用 Ruby 编写的全栈 Web 应用框架。

**为什么用**：约定优于配置、快速开发、MVC 架构、成熟的生态系统。

## Quick Start

**安装 Rails**：
```bash
gem install rails
```

**创建新应用**：
```bash
rails new myapp
cd myapp
rails server
```

打开 http://localhost:3000

**生成资源**：
```bash
rails generate scaffold Post title:string body:text
rails db:migrate
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `rails new name` | 创建新应用 |
| `rails server` / `rails s` | 启动服务器 |
| `rails console` / `rails c` | 交互式控制台 |
| `rails generate scaffold` | 生成 CRUD |
| `rails generate model` | 生成模型 |
| `rails generate controller` | 生成控制器 |
| `rails db:migrate` | 运行迁移 |
| `rails routes` | 显示所有路由 |

## Gotchas

### 路由

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root "posts#index"
  resources :posts           # RESTful 路由
  get "/about", to: "pages#about"
end
```

### 控制器

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to @post
    else
      render :new
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
```

### 模型

```ruby
class Post < ApplicationRecord
  validates :title, presence: true
  validates :body, length: { minimum: 10 }

  has_many :comments
  belongs_to :user
end
```

### Active Record 查询

```ruby
Post.all
Post.find(1)
Post.where(published: true)
Post.order(created_at: :desc)
Post.first
Post.last
```

## Next Steps

- [Rails 指南](https://guides.rubyonrails.org/) - 官方指南
- [Rails 教程](https://www.railstutorial.org/) - 免费书籍
- [Rails API](https://api.rubyonrails.org/) - API 文档
- [GoRails](https://gorails.com/) - 视频教程
