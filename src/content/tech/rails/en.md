---
title: "Ruby on Rails"
description: "Ruby full-stack framework with convention over configuration - scaffold features in seconds, batteries included"
template: "framework"
tags: ["backend", "ruby", "framework"]
---

## TL;DR

**One-liner**: Rails is Ruby's opinionated full-stack framework - convention over configuration means rapid development with sensible defaults.

**Core Strengths**:
- Convention over configuration - less decisions, more coding
- Generators - scaffold entire features in seconds
- Active Record - elegant ORM with migrations
- Batteries included - auth, mailers, jobs, all built-in

## Core Concepts

### Concept 1: MVC Architecture

Models, Views, Controllers with clear separation:

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

### Concept 2: RESTful Routing

Resource-oriented routes:

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root "posts#index"

  resources :posts do
    resources :comments, only: [:create, :destroy]
  end

  # Generates: GET /posts, POST /posts, GET /posts/:id, etc.
end
```

### Concept 3: Active Record

Query interface and validations:

```ruby
# Queries
Post.all
Post.find(1)
Post.where(published: true).order(created_at: :desc)
Post.first(5)

# Create
Post.create(title: "Hello", body: "World")

# Update
post.update(title: "New Title")

# Associations
user.posts.create(title: "My Post")
post.comments
```

## Quick Start

### Install Rails

```bash
gem install rails
```

### Create Project

```bash
rails new myapp
cd myapp
```

### Generate a Resource

```bash
rails generate scaffold Post title:string body:text published:boolean
rails db:migrate
```

### Run

```bash
rails server
# Open http://localhost:3000/posts
```

## Gotchas

### Strong parameters

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

  # Whitelist allowed params
  def post_params
    params.require(:post).permit(:title, :body, :published)
  end
end
```

### Validations

```ruby
class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8 }
  validates :age, numericality: { greater_than: 0 }, allow_nil: true

  validate :custom_validation

  private

  def custom_validation
    errors.add(:base, "Custom error") if some_condition
  end
end
```

### Callbacks

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

### Migrations

```bash
rails generate migration AddCategoryToPosts category:string
rails db:migrate
rails db:rollback  # Undo last migration
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

**Best for**:
- Full-stack web applications
- Rapid prototyping and MVPs
- CRUD-heavy applications
- Teams wanting productivity

**Not ideal for**:
- Microservices (too heavy)
- Real-time apps (use Phoenix/Elixir)
- Teams unfamiliar with Ruby

**Comparison**:
| Feature | Rails | Django | Laravel |
|---------|-------|--------|---------|
| Language | Ruby | Python | PHP |
| Philosophy | Convention | Explicit | Elegant |
| ORM | Active Record | Django ORM | Eloquent |
| Learning | Medium | Medium | Easy |

## Next Steps

- [Rails Guides](https://guides.rubyonrails.org/)
- [Rails Tutorial](https://www.railstutorial.org/)
- [Rails API](https://api.rubyonrails.org/)
- [GoRails](https://gorails.com/)

## Cheatsheet

| Command | Purpose |
|---------|---------|
| `rails new app` | Create project |
| `rails server` | Start server |
| `rails console` | Interactive shell |
| `rails generate scaffold Model` | Full CRUD |
| `rails generate model Model` | Model + migration |
| `rails generate controller Name` | Controller |
| `rails db:migrate` | Run migrations |
| `rails db:rollback` | Undo migration |
| `rails routes` | Show routes |
| `rails test` | Run tests |
