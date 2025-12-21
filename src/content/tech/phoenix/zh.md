---
title: "Phoenix"
description: "5 分钟快速入门 Phoenix 框架"
tags: ["backend", "elixir", "framework"]
---

## TL;DR

**是什么**：可大规模扩展的 Elixir 高效 Web 框架。

**为什么用**：实时功能、容错性、LiveView 交互式 UI、出色的性能。

## Quick Start

**安装 Elixir 和 Phoenix**：
```bash
# 先安装 Elixir (https://elixir-lang.org/install.html)
mix local.hex
mix archive.install hex phx_new
```

**创建新应用**：
```bash
mix phx.new my_app
cd my_app
mix ecto.create
mix phx.server
```

打开 http://localhost:4000

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `mix phx.new name` | 创建新项目 |
| `mix phx.server` | 启动服务器 |
| `mix ecto.create` | 创建数据库 |
| `mix ecto.migrate` | 运行迁移 |
| `mix phx.gen.html` | 生成 HTML 资源 |
| `mix phx.gen.json` | 生成 JSON API |
| `mix phx.gen.live` | 生成 LiveView |
| `iex -S mix phx.server` | 带 IEx 的服务器 |

## Gotchas

### 路由

```elixir
# lib/my_app_web/router.ex
scope "/api", MyAppWeb do
  pipe_through :api

  get "/users", UserController, :index
  post "/users", UserController, :create
  get "/users/:id", UserController, :show
end
```

### 控制器

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
    <button phx-click="increment">计数：<%= @count %></button>
    """
  end
end
```

## Next Steps

- [Phoenix 文档](https://hexdocs.pm/phoenix/) - 官方文档
- [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/) - 实时 UI
- [Elixir School](https://elixirschool.com/) - 学习 Elixir
- [Phoenix 教程](https://www.phoenixframework.org/blog/build-a-real-time-twitter-clone-in-15-minutes-with-live-view-and-phoenix-1-5) - 实时教程
