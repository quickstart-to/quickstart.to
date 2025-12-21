---
title: "Phoenix"
description: "Get started with Phoenix framework in 5 minutes"
tags: ["backend", "elixir", "framework"]
---

## TL;DR

**What**: A productive web framework for Elixir that scales massively.

**Why**: Real-time features, fault-tolerant, LiveView for interactive UIs, excellent performance.

## Quick Start

**Install Elixir and Phoenix**:
```bash
# Install Elixir first (https://elixir-lang.org/install.html)
mix local.hex
mix archive.install hex phx_new
```

**Create new app**:
```bash
mix phx.new my_app
cd my_app
mix ecto.create
mix phx.server
```

Open http://localhost:4000

## Cheatsheet

| Command | Description |
|---------|-------------|
| `mix phx.new name` | Create new project |
| `mix phx.server` | Start server |
| `mix ecto.create` | Create database |
| `mix ecto.migrate` | Run migrations |
| `mix phx.gen.html` | Generate HTML resource |
| `mix phx.gen.json` | Generate JSON API |
| `mix phx.gen.live` | Generate LiveView |
| `iex -S mix phx.server` | Server with IEx |

## Gotchas

### Router

```elixir
# lib/my_app_web/router.ex
scope "/api", MyAppWeb do
  pipe_through :api

  get "/users", UserController, :index
  post "/users", UserController, :create
  get "/users/:id", UserController, :show
end
```

### Controller

```elixir
defmodule MyAppWeb.UserController do
  use MyAppWeb, :controller

  def index(conn, _params) do
    users = Accounts.list_users()
    json(conn, %{data: users})
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    json(conn, %{data: user})
  end

  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> json(%{data: user})
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset})
    end
  end
end
```

### LiveView

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

## Next Steps

- [Phoenix Documentation](https://hexdocs.pm/phoenix/) - Official docs
- [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/) - Real-time UIs
- [Elixir School](https://elixirschool.com/) - Learn Elixir
- [Phoenix Tutorial](https://www.phoenixframework.org/blog/build-a-real-time-twitter-clone-in-15-minutes-with-live-view-and-phoenix-1-5) - Real-time tutorial
