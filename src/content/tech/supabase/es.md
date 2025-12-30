---
title: "Supabase"
description: "Comienza con Supabase en 5 minutos"
template: "tool"
tags: ["database", "backend", "baas"]
---

## TL;DR

**Qué**: Una alternativa open-source a Firebase con PostgreSQL.

**Por qué**: APIs instantáneas, suscripciones en tiempo real, auth, almacenamiento - todo en PostgreSQL.

## Quick Start

**Crear proyecto**: Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto.

**Instalar cliente**:
```bash
npm install @supabase/supabase-js
```

**Inicializar**:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)
```

**Crear tabla** (vía Dashboard o SQL):
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Cheatsheet

| Operación | Código |
|-----------|------|
| Select | `supabase.from('table').select()` |
| Insert | `supabase.from('table').insert({})` |
| Update | `supabase.from('table').update({}).eq('id', 1)` |
| Delete | `supabase.from('table').delete().eq('id', 1)` |
| Filtrar | `.eq()`, `.neq()`, `.gt()`, `.lt()` |
| Ordenar | `.order('column', { ascending: false })` |
| Límite | `.limit(10)` |

## Gotchas

### CRUD operations

```javascript
// Select
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(10)

// Insert
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'Hello', content: 'World' })
  .select()

// Update
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated' })
  .eq('id', 1)
  .select()

// Delete
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', 1)
```

### Authentication

```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Get user
const { data: { user } } = await supabase.auth.getUser()

// Sign out
await supabase.auth.signOut()
```

### Real-time subscriptions

```javascript
const channel = supabase
  .channel('posts')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => console.log(payload)
  )
  .subscribe()
```

### Row Level Security

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own posts
CREATE POLICY "Users can view own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);
```

## Next Steps

- [Supabase Documentation](https://supabase.com/docs) - Documentación oficial
- [Supabase Tutorials](https://supabase.com/docs/guides) - Guías
- [Supabase CLI](https://supabase.com/docs/guides/cli) - Desarrollo local
- [Supabase Discord](https://discord.supabase.com/) - Comunidad
