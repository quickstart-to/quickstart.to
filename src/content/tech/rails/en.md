---
title: "Ruby on Rails"
description: "Get started with Ruby on Rails framework in 5 minutes"
tags: ["backend", "ruby", "framework"]
---

## TL;DR

**What**: A full-stack web application framework written in Ruby.

**Why**: Convention over configuration, rapid development, MVC architecture, mature ecosystem.

## Quick Start

**Install Rails**:
```bash
gem install rails
```

**Create new app**:
```bash
rails new myapp
cd myapp
rails server
```

Open http://localhost:3000

**Generate a resource**:
```bash
rails generate scaffold Post title:string body:text
rails db:migrate
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `rails new name` | Create new app |
| `rails server` / `rails s` | Start server |
| `rails console` / `rails c` | Interactive console |
| `rails generate scaffold` | Generate CRUD |
| `rails generate model` | Generate model |
| `rails generate controller` | Generate controller |
| `rails db:migrate` | Run migrations |
| `rails routes` | Show all routes |

## Gotchas

### Routes

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root "posts#index"
  resources :posts           # RESTful routes
  get "/about", to: "pages#about"
end
```

### Controller

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

### Model

```ruby
class Post < ApplicationRecord
  validates :title, presence: true
  validates :body, length: { minimum: 10 }

  has_many :comments
  belongs_to :user
end
```

### Active Record queries

```ruby
Post.all
Post.find(1)
Post.where(published: true)
Post.order(created_at: :desc)
Post.first
Post.last
```

## Next Steps

- [Rails Guides](https://guides.rubyonrails.org/) - Official guides
- [Rails Tutorial](https://www.railstutorial.org/) - Free book
- [Rails API](https://api.rubyonrails.org/) - API documentation
- [GoRails](https://gorails.com/) - Video tutorials
