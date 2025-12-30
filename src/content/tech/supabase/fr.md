---
title: "Supabase"
description: "Alternative Firebase open-source - PostgreSQL, temps reel, auth, stockage, Edge Functions"
template: "tool"
tags: ["database", "backend", "baas"]
---

## TL;DR

**Quoi** : Une alternative open-source à Firebase avec PostgreSQL.

**Pourquoi** : APIs instantanées, abonnements temps réel, auth, stockage - tout sur PostgreSQL.

## Quick Start

**Créer un projet** : Allez sur [supabase.com](https://supabase.com) et créez un nouveau projet.

**Installer le client** :
```bash
npm install @supabase/supabase-js
```

**Initialiser** :
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)
```

**Créer une table** (via Dashboard ou SQL) :
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Cheatsheet

| Opération | Code |
|-----------|------|
| Select | `supabase.from('table').select()` |
| Insert | `supabase.from('table').insert({})` |
| Update | `supabase.from('table').update({}).eq('id', 1)` |
| Delete | `supabase.from('table').delete().eq('id', 1)` |
| Filtrer | `.eq()`, `.neq()`, `.gt()`, `.lt()` |
| Trier | `.order('column', { ascending: false })` |
| Limite | `.limit(10)` |

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

- [Supabase Documentation](https://supabase.com/docs) - Documentation officielle
- [Supabase Tutorials](https://supabase.com/docs/guides) - Guides
- [Supabase CLI](https://supabase.com/docs/guides/cli) - Développement local
- [Supabase Discord](https://discord.supabase.com/) - Communauté
