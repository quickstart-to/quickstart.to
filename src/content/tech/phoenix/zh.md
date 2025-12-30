---
title: "Phoenix"
description: "Elixir 实时 Web 框架 - LiveView 无需 JavaScript 即可构建交互式 UI，天生容错"
template: "framework"
tags: ["backend", "elixir", "framework"]
---

## TL;DR

**一句话**：Phoenix 是 Elixir 的 Web 框架，专为实时、容错应用而生——LiveView 让你不写 JavaScript 就能实现交互式 UI。

**核心优势**：
- LiveView - 服务端渲染的实时 UI
- Channels - 内置 WebSocket，支持百万级连接
- 容错性 - Erlang/OTP 的"让它崩溃"哲学
- 高性能 - 亚毫秒级响应时间

## Core Concepts

### 概念 1：Contexts

按业务领域组织逻辑，而不是按文件类型：

```elixir
# lib/my_app/accounts.ex - Accounts 上下文
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

# 在控制器中使用 - 清晰分离
users = Accounts.list_users()
```

### 概念 2：LiveView

无需 JavaScript 的交互式 UI——状态存在服务端：

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

### 概念 3：Plugs

可组合的中间件——一切皆 Plug：

```elixir
# Plug 是一个函数：conn -> conn
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

# 在路由中使用
pipeline :authenticated do
  plug MyAppWeb.AuthPlug
end
```

## Quick Start

### 安装

```bash
# 先安装 Elixir (https://elixir-lang.org/install.html)
mix local.hex
mix archive.install hex phx_new
```

### 创建项目

```bash
mix phx.new my_app
cd my_app
```

### 设置数据库

```bash
mix ecto.create
```

### 运行

```bash
mix phx.server
# 打开 http://localhost:4000
```

## Gotchas

### 函数头中的模式匹配

```elixir
def show(conn, %{"id" => id}) do
  # id 从 params 中提取
  user = Accounts.get_user!(id)
  render(conn, :show, user: user)
end

# 用模式匹配处理用户不存在
def show(conn, %{"id" => id}) do
  case Accounts.get_user(id) do
    nil -> conn |> put_status(404) |> json(%{error: "Not found"})
    user -> json(conn, %{data: user})
  end
end
```

### Ecto changeset 验证

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

### LiveView 常见错误

```elixir
# 错误：assigns 必须通过 socket
def mount(_, _, socket) do
  @count = 0  # 这样不行！
  {:ok, socket}
end

# 正确：使用 assign/2
def mount(_, _, socket) do
  {:ok, assign(socket, count: 0)}
end

# 耗时操作用异步
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

**适合**：
- 实时应用（聊天、仪表盘、游戏）
- 高并发系统（百万级连接）
- 需要容错性的应用
- 想少写 JavaScript 的团队

**不适合**：
- 简单 CRUD 应用（更简单的框架就够了）
- 不熟悉函数式编程的团队
- CPU 密集型任务（Elixir 在数值计算上不是最快的）

**对比**：
| 特性 | Phoenix | Rails | Django |
|------|---------|-------|--------|
| 实时 | 优秀 | ActionCable | Channels |
| 并发 | 百万级 | 线程 | 异步 |
| 学习曲线 | 陡峭 | 中等 | 中等 |
| 生态 | 成长中 | 成熟 | 成熟 |

## Next Steps

- [Phoenix 指南](https://hexdocs.pm/phoenix/)
- [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/)
- [Elixir School](https://elixirschool.com/)
- [Programming Phoenix LiveView](https://pragprog.com/titles/liveview/)

## Cheatsheet

| 命令 | 用途 |
|------|------|
| `mix phx.new app` | 创建项目 |
| `mix phx.server` | 启动服务器 |
| `iex -S mix phx.server` | 带 REPL 的服务器 |
| `mix ecto.create` | 创建数据库 |
| `mix ecto.migrate` | 运行迁移 |
| `mix ecto.rollback` | 撤销迁移 |
| `mix phx.gen.html` | 生成 HTML CRUD |
| `mix phx.gen.json` | 生成 JSON API |
| `mix phx.gen.live` | 生成 LiveView |
| `mix phx.routes` | 显示所有路由 |
