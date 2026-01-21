---
title: "Phoenix"
description: "Elixir web framework for real-time apps - LiveView delivers interactive UIs without JavaScript, fault-tolerant by design"
template: "framework"
tags: ["backend", "elixir", "framework"]
---

## TL;DR

**One-liner**: Phoenix is Elixir's web framework built for real-time, fault-tolerant apps - LiveView gives you interactive UIs without writing JavaScript.

**Core Strengths**:
- LiveView - real-time UIs with server-rendered HTML
- Channels - built-in WebSocket support for millions of connections
- Fault tolerance - Erlang/OTP's "let it crash" philosophy
- Performance - sub-millisecond response times

## Core Concepts

### Concept 1: Contexts

Business logic organized by domain, not by file type:

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

Interactive UIs without JavaScript - state lives on server:

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

Composable middleware - everything is a plug:

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

**Best for**:
- Real-time applications (chat, dashboards, games)
- High-concurrency systems (millions of connections)
- Apps needing fault tolerance
- Teams wanting less JavaScript

**Not ideal for**:
- Simple CRUD apps (simpler frameworks suffice)
- Teams unfamiliar with functional programming
- CPU-intensive tasks (Elixir is not fastest for number crunching)

**Comparison**:
| Feature | Phoenix | Rails | Django |
|---------|---------|-------|--------|
| Real-time | Excellent | ActionCable | Channels |
| Concurrency | Millions | Threads | Async |
| Learning | Steep | Moderate | Moderate |
| Ecosystem | Growing | Mature | Mature |

## Next Steps

- [Phoenix Guides](https://hexdocs.pm/phoenix/)
- [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/)
- [Elixir School](https://elixirschool.com/)
- [Programming Phoenix LiveView](https://pragprog.com/titles/liveview/)

## Cheatsheet

| Command | Purpose |
|---------|---------|
| `mix phx.new app` | Create project |
| `mix phx.server` | Start server |
| `iex -S mix phx.server` | Server with REPL |
| `mix ecto.create` | Create database |
| `mix ecto.migrate` | Run migrations |
| `mix ecto.rollback` | Undo migration |
| `mix phx.gen.html` | Generate HTML CRUD |
| `mix phx.gen.json` | Generate JSON API |
| `mix phx.gen.live` | Generate LiveView |
| `mix phx.routes` | Show all routes |
