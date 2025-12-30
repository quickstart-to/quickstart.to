---
title: "Ruby on Rails"
description: "Ruby Full-Stack-Framework mit Konvention ueber Konfiguration - Features in Sekunden scaffolden, alles inklusive"
template: "framework"
tags: ["backend", "ruby", "framework"]
---

## TL;DR

**Kurzfassung**: Rails ist Rubys opinioniertes Full-Stack-Framework - Konvention über Konfiguration bedeutet schnelle Entwicklung mit sinnvollen Standardwerten.

**Kernstärken**:
- Konvention über Konfiguration - weniger Entscheidungen, mehr Programmieren
- Generatoren - komplette Features in Sekunden erstellen
- Active Record - elegantes ORM mit Migrationen
- Batterien inklusive - Auth, Mailer, Jobs, alles eingebaut

## Core Concepts

### Concept 1: MVC Architecture

Models, Views, Controllers mit klarer Trennung:

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

Ressourcenorientierte Routen:

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

Query-Interface und Validierungen:

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

### Validierungen

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

### Migrationen

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

**Ideal für**:
- Full-Stack-Webanwendungen
- Rapid Prototyping und MVPs
- CRUD-lastige Anwendungen
- Teams, die Produktivität wollen

**Nicht ideal für**:
- Microservices (zu schwer)
- Echtzeit-Apps (Phoenix/Elixir verwenden)
- Teams, die mit Ruby nicht vertraut sind

**Vergleich**:
| Feature | Rails | Django | Laravel |
|---------|-------|--------|---------|
| Sprache | Ruby | Python | PHP |
| Philosophie | Konvention | Explizit | Elegant |
| ORM | Active Record | Django ORM | Eloquent |
| Lernen | Mittel | Mittel | Einfach |

## Next Steps

- [Rails Guides](https://guides.rubyonrails.org/)
- [Rails Tutorial](https://www.railstutorial.org/)
- [Rails API](https://api.rubyonrails.org/)
- [GoRails](https://gorails.com/)

## Cheatsheet

| Befehl | Zweck |
|---------|---------|
| `rails new app` | Projekt erstellen |
| `rails server` | Server starten |
| `rails console` | Interaktive Shell |
| `rails generate scaffold Model` | Vollständiges CRUD |
| `rails generate model Model` | Model + Migration |
| `rails generate controller Name` | Controller |
| `rails db:migrate` | Migrationen ausführen |
| `rails db:rollback` | Migration rückgängig |
| `rails routes` | Routen anzeigen |
| `rails test` | Tests ausführen |
