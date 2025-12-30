---
title: "Ruby on Rails"
description: "Framework Ruby full-stack avec convention plutot que configuration - scaffoldez des fonctionnalites en secondes, tout inclus"
template: "framework"
tags: ["backend", "ruby", "framework"]
---

## TL;DR

**En bref** : Rails est le framework full-stack opinioné de Ruby - convention plutôt que configuration signifie développement rapide avec des valeurs par défaut sensées.

**Points forts** :
- Convention plutôt que configuration - moins de décisions, plus de code
- Générateurs - créer des fonctionnalités complètes en quelques secondes
- Active Record - ORM élégant avec migrations
- Batteries incluses - auth, mailers, jobs, tout intégré

## Core Concepts

### Concept 1: MVC Architecture

Models, Views, Controllers avec séparation claire :

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

Routes orientées ressources :

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

Interface de requête et validations :

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

**Idéal pour** :
- Applications web full-stack
- Prototypage rapide et MVPs
- Applications CRUD
- Équipes recherchant la productivité

**Moins adapté pour** :
- Microservices (trop lourd)
- Apps temps réel (utiliser Phoenix/Elixir)
- Équipes non familières avec Ruby

**Comparaison** :
| Feature | Rails | Django | Laravel |
|---------|-------|--------|---------|
| Langage | Ruby | Python | PHP |
| Philosophie | Convention | Explicite | Élégant |
| ORM | Active Record | Django ORM | Eloquent |
| Apprentissage | Moyen | Moyen | Facile |

## Next Steps

- [Rails Guides](https://guides.rubyonrails.org/)
- [Rails Tutorial](https://www.railstutorial.org/)
- [Rails API](https://api.rubyonrails.org/)
- [GoRails](https://gorails.com/)

## Cheatsheet

| Commande | Usage |
|---------|---------|
| `rails new app` | Créer un projet |
| `rails server` | Démarrer le serveur |
| `rails console` | Shell interactif |
| `rails generate scaffold Model` | CRUD complet |
| `rails generate model Model` | Model + migration |
| `rails generate controller Name` | Controller |
| `rails db:migrate` | Exécuter les migrations |
| `rails db:rollback` | Annuler une migration |
| `rails routes` | Afficher les routes |
| `rails test` | Exécuter les tests |
