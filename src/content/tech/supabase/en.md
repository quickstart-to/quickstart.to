---
title: "Supabase"
description: "Get started with Supabase in 5 minutes"
template: "tool"
tags: ["database", "backend", "baas"]
---

## TL;DR

**What**: An open-source Firebase alternative with PostgreSQL.

**Why**: Instant APIs, real-time subscriptions, auth, storage - all on PostgreSQL.

## Quick Start

**Create project**: Go to [supabase.com](https://supabase.com) and create a new project.

**Install client**:
```bash
npm install @supabase/supabase-js
```

**Initialize**:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)
```

**Create table** (via Dashboard or SQL):
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Cheatsheet

| Operation | Code |
|-----------|------|
| Select | `supabase.from('table').select()` |
| Insert | `supabase.from('table').insert({})` |
| Update | `supabase.from('table').update({}).eq('id', 1)` |
| Delete | `supabase.from('table').delete().eq('id', 1)` |
| Filter | `.eq()`, `.neq()`, `.gt()`, `.lt()` |
| Order | `.order('column', { ascending: false })` |
| Limit | `.limit(10)` |

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

- [Supabase Documentation](https://supabase.com/docs) - Official docs
- [Supabase Tutorials](https://supabase.com/docs/guides) - Guides
- [Supabase CLI](https://supabase.com/docs/guides/cli) - Local development
- [Supabase Discord](https://discord.supabase.com/) - Community
