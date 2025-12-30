---
title: "Phoenix"
description: "Comienza con el framework Phoenix en 5 minutos"
template: "framework"
tags: ["backend", "elixir", "framework"]
---

## TL;DR

**En resumen**: Phoenix es el framework web de Elixir para apps en tiempo real y tolerantes a fallos - LiveView ofrece UIs interactivas sin JavaScript.

**Fortalezas principales**:
- LiveView - UIs en tiempo real con HTML renderizado en servidor
- Channels - soporte WebSocket integrado para millones de conexiones
- Tolerancia a fallos - filosofía "let it crash" de Erlang/OTP
- Performance - tiempos de respuesta sub-milisegundo

## Core Concepts

### Concept 1: Contexts

Lógica de negocio organizada por dominio, no por tipo de archivo:

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

UIs interactivas sin JavaScript - el estado vive en el servidor:

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

Middleware componible - todo es un plug:

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

**Ideal para**:
- Aplicaciones en tiempo real (chat, dashboards, juegos)
- Sistemas de alta concurrencia (millones de conexiones)
- Apps que necesitan tolerancia a fallos
- Equipos que quieren menos JavaScript

**No ideal para**:
- Apps CRUD simples (frameworks más simples bastan)
- Equipos no familiarizados con programación funcional
- Tareas intensivas en CPU (Elixir no es el más rápido)

**Comparación**:
| Feature | Phoenix | Rails | Django |
|---------|---------|-------|--------|
| Tiempo real | Excelente | ActionCable | Channels |
| Concurrencia | Millones | Threads | Async |
| Aprendizaje | Difícil | Moderado | Moderado |
| Ecosistema | Creciendo | Maduro | Maduro |

## Next Steps

- [Phoenix Guides](https://hexdocs.pm/phoenix/)
- [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/)
- [Elixir School](https://elixirschool.com/)
- [Programming Phoenix LiveView](https://pragprog.com/titles/liveview/)

## Cheatsheet

| Comando | Uso |
|---------|---------|
| `mix phx.new app` | Crear proyecto |
| `mix phx.server` | Iniciar servidor |
| `iex -S mix phx.server` | Servidor con REPL |
| `mix ecto.create` | Crear base de datos |
| `mix ecto.migrate` | Ejecutar migraciones |
| `mix ecto.rollback` | Deshacer migración |
| `mix phx.gen.html` | Generar CRUD HTML |
| `mix phx.gen.json` | Generar API JSON |
| `mix phx.gen.live` | Generar LiveView |
| `mix phx.routes` | Mostrar todas las rutas |
