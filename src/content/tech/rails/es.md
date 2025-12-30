---
title: "Ruby on Rails"
description: "Framework Ruby full-stack con convencion sobre configuracion - scaffolding en segundos, baterias incluidas"
template: "framework"
tags: ["backend", "ruby", "framework"]
---

## TL;DR

**En resumen**: Rails es el framework full-stack opinionado de Ruby - convención sobre configuración significa desarrollo rápido con valores predeterminados sensatos.

**Fortalezas principales**:
- Convención sobre configuración - menos decisiones, más código
- Generadores - crear funcionalidades completas en segundos
- Active Record - ORM elegante con migraciones
- Baterías incluidas - auth, mailers, jobs, todo integrado

## Core Concepts

### Concept 1: MVC Architecture

Models, Views, Controllers con separación clara:

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

Rutas orientadas a recursos:

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

Interfaz de consultas y validaciones:

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

### Strong Parameters

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

### Validaciones

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

### Migraciones

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

**Ideal para**:
- Aplicaciones web full-stack
- Prototipado rápido y MVPs
- Aplicaciones CRUD
- Equipos que buscan productividad

**No ideal para**:
- Microservicios (demasiado pesado)
- Apps en tiempo real (usar Phoenix/Elixir)
- Equipos no familiarizados con Ruby

**Comparación**:
| Feature | Rails | Django | Laravel |
|---------|-------|--------|---------|
| Lenguaje | Ruby | Python | PHP |
| Filosofía | Convención | Explícito | Elegante |
| ORM | Active Record | Django ORM | Eloquent |
| Aprendizaje | Medio | Medio | Fácil |

## Next Steps

- [Rails Guides](https://guides.rubyonrails.org/)
- [Rails Tutorial](https://www.railstutorial.org/)
- [Rails API](https://api.rubyonrails.org/)
- [GoRails](https://gorails.com/)

## Cheatsheet

| Comando | Uso |
|---------|---------|
| `rails new app` | Crear proyecto |
| `rails server` | Iniciar servidor |
| `rails console` | Shell interactivo |
| `rails generate scaffold Model` | CRUD completo |
| `rails generate model Model` | Model + migración |
| `rails generate controller Name` | Controller |
| `rails db:migrate` | Ejecutar migraciones |
| `rails db:rollback` | Deshacer migración |
| `rails routes` | Mostrar rutas |
| `rails test` | Ejecutar tests |
