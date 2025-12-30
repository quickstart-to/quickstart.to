---
title: "Phoenix"
description: "Démarrez avec le framework Phoenix en 5 minutes"
template: "framework"
tags: ["backend", "elixir", "framework"]
---

## TL;DR

**En bref** : Phoenix est le framework web d'Elixir pour les apps temps réel et tolérantes aux pannes - LiveView offre des UIs interactives sans JavaScript.

**Points forts** :
- LiveView - UIs temps réel avec HTML rendu côté serveur
- Channels - support WebSocket intégré pour des millions de connexions
- Tolérance aux pannes - philosophie "let it crash" d'Erlang/OTP
- Performance - temps de réponse sous la milliseconde

## Core Concepts

### Concept 1: Contexts

Logique métier organisée par domaine, pas par type de fichier :

```elixir
# lib/my_app/accounts.ex - The Accounts context
defmodule MyApp.Accounts do
  alias MyApp.Repo
  alias MyApp.Accounts.User

  def list_users, do: Repo.all(User)
  def get_user!(id), do: Repo.get!(User, id)

  def create_user(attrs) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end
end

# Used in controller - clean separation
users = Accounts.list_users()
```

### Concept 2: LiveView

UIs interactives sans JavaScript - l'état vit sur le serveur :

```elixir
defmodule MyAppWeb.CounterLive do
  use MyAppWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, assign(socket, count: 0)}
  end

  def handle_event("increment", _, socket) do
    {:noreply, update(socket, :count, &(&1 + 1))}
  end

  def render(assigns) do
    ~H"""
    <button phx-click="increment">Count: <%= @count %></button>
    """
  end
end
```

### Concept 3: Plugs

Middleware composable - tout est un plug :

```elixir
# A plug is a function: conn -> conn
defmodule MyAppWeb.AuthPlug do
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    case get_session(conn, :user_id) do
      nil -> conn |> put_status(401) |> halt()
      user_id -> assign(conn, :current_user, Accounts.get_user!(user_id))
    end
  end
end

# Use in router
pipeline :authenticated do
  plug MyAppWeb.AuthPlug
end
```

## Quick Start

### Install

```bash
# Install Elixir first (https://elixir-lang.org/install.html)
mix local.hex
mix archive.install hex phx_new
```

### Create Project

```bash
mix phx.new my_app
cd my_app
```

### Setup Database

```bash
mix ecto.create
```

### Run

```bash
mix phx.server
# Open http://localhost:4000
```

## Gotchas

### Pattern matching in function heads

```elixir
def show(conn, %{"id" => id}) do
  # id is extracted from params
  user = Accounts.get_user!(id)
  render(conn, :show, user: user)
end

# Handle missing user with pattern matching
def show(conn, %{"id" => id}) do
  case Accounts.get_user(id) do
    nil -> conn |> put_status(404) |> json(%{error: "Not found"})
    user -> json(conn, %{data: user})
  end
end
```

### Ecto changesets for validation

```elixir
defmodule MyApp.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name])
    |> validate_required([:email])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
  end
end
```

### LiveView gotchas

```elixir
# Wrong: assigns must go through socket
def mount(_, _, socket) do
  @count = 0  # This doesn't work!
  {:ok, socket}
end

# Right: use assign/2
def mount(_, _, socket) do
  {:ok, assign(socket, count: 0)}
end

# For expensive operations, use async
def mount(_, _, socket) do
  if connected?(socket) do
    send(self(), :load_data)
  end
  {:ok, assign(socket, loading: true, data: [])}
end

def handle_info(:load_data, socket) do
  {:noreply, assign(socket, loading: false, data: fetch_data())}
end
```

## When to Use

**Idéal pour** :
- Applications temps réel (chat, dashboards, jeux)
- Systèmes haute concurrence (millions de connexions)
- Apps nécessitant tolérance aux pannes
- Équipes voulant moins de JavaScript

**Moins adapté pour** :
- Apps CRUD simples (frameworks plus simples suffisent)
- Équipes non familières avec la programmation fonctionnelle
- Tâches intensives en CPU (Elixir n'est pas le plus rapide)

**Comparaison** :
| Feature | Phoenix | Rails | Django |
|---------|---------|-------|--------|
| Temps réel | Excellent | ActionCable | Channels |
| Concurrence | Millions | Threads | Async |
| Apprentissage | Difficile | Modéré | Modéré |
| Écosystème | En croissance | Mature | Mature |

## Next Steps

- [Phoenix Guides](https://hexdocs.pm/phoenix/)
- [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/)
- [Elixir School](https://elixirschool.com/)
- [Programming Phoenix LiveView](https://pragprog.com/titles/liveview/)

## Cheatsheet

| Commande | Usage |
|---------|---------|
| `mix phx.new app` | Créer un projet |
| `mix phx.server` | Démarrer le serveur |
| `iex -S mix phx.server` | Serveur avec REPL |
| `mix ecto.create` | Créer la base |
| `mix ecto.migrate` | Exécuter les migrations |
| `mix ecto.rollback` | Annuler une migration |
| `mix phx.gen.html` | Générer CRUD HTML |
| `mix phx.gen.json` | Générer API JSON |
| `mix phx.gen.live` | Générer LiveView |
| `mix phx.routes` | Afficher toutes les routes |
