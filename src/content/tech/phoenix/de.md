---
title: "Phoenix"
description: "Elixir Web-Framework fuer Echtzeit-Apps - LiveView liefert interaktive UIs ohne JavaScript, fehlertolerant by design"
template: "framework"
tags: ["backend", "elixir", "framework"]
---

## TL;DR

**Kurzfassung**: Phoenix ist Elixirs Web-Framework für Echtzeit-Apps mit Fehlertoleranz - LiveView bietet interaktive UIs ohne JavaScript.

**Kernstärken**:
- LiveView - Echtzeit-UIs mit server-gerendertem HTML
- Channels - eingebaute WebSocket-Unterstützung für Millionen von Verbindungen
- Fehlertoleranz - Erlangs/OTPs "let it crash"-Philosophie
- Performance - Sub-Millisekunden-Antwortzeiten

## Core Concepts

### Concept 1: Contexts

Geschäftslogik nach Domäne organisiert, nicht nach Dateityp:

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

Interaktive UIs ohne JavaScript - Zustand lebt auf dem Server:

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

Komponierbare Middleware - alles ist ein Plug:

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

**Ideal für**:
- Echtzeit-Anwendungen (Chat, Dashboards, Spiele)
- Hochkonkurrenz-Systeme (Millionen von Verbindungen)
- Apps mit Fehlertoleranz-Anforderungen
- Teams, die weniger JavaScript wollen

**Weniger geeignet für**:
- Einfache CRUD-Apps (einfachere Frameworks reichen)
- Teams ohne funktionale Programmierung-Erfahrung
- CPU-intensive Aufgaben (Elixir ist nicht das schnellste für Zahlenverarbeitung)

**Vergleich**:
| Feature | Phoenix | Rails | Django |
|---------|---------|-------|--------|
| Echtzeit | Exzellent | ActionCable | Channels |
| Konkurrenz | Millionen | Threads | Async |
| Lernen | Steil | Moderat | Moderat |
| Ökosystem | Wachsend | Ausgereift | Ausgereift |

## Next Steps

- [Phoenix Guides](https://hexdocs.pm/phoenix/)
- [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/)
- [Elixir School](https://elixirschool.com/)
- [Programming Phoenix LiveView](https://pragprog.com/titles/liveview/)

## Cheatsheet

| Befehl | Zweck |
|---------|---------|
| `mix phx.new app` | Projekt erstellen |
| `mix phx.server` | Server starten |
| `iex -S mix phx.server` | Server mit REPL |
| `mix ecto.create` | Datenbank erstellen |
| `mix ecto.migrate` | Migrationen ausführen |
| `mix ecto.rollback` | Migration rückgängig |
| `mix phx.gen.html` | HTML-CRUD generieren |
| `mix phx.gen.json` | JSON-API generieren |
| `mix phx.gen.live` | LiveView generieren |
| `mix phx.routes` | Alle Routen anzeigen |
