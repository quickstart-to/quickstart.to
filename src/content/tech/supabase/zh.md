---
title: "Supabase"
description: "5 分钟快速入门 Supabase"
template: "tool"
tags: ["database", "backend", "baas"]
---

## TL;DR

**是什么**：基于 PostgreSQL 的开源 Firebase 替代品。

**为什么用**：即时 API、实时订阅、认证、存储 - 全部基于 PostgreSQL。

## Quick Start

**创建项目**：访问 [supabase.com](https://supabase.com) 并创建新项目。

**安装客户端**：
```bash
npm install @supabase/supabase-js
```

**初始化**：
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)
```

**创建表**（通过仪表板或 SQL）：
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Cheatsheet

| 操作 | 代码 |
|-----------|------|
| 查询 | `supabase.from('table').select()` |
| 插入 | `supabase.from('table').insert({})` |
| 更新 | `supabase.from('table').update({}).eq('id', 1)` |
| 删除 | `supabase.from('table').delete().eq('id', 1)` |
| 过滤 | `.eq()`, `.neq()`, `.gt()`, `.lt()` |
| 排序 | `.order('column', { ascending: false })` |
| 限制 | `.limit(10)` |

## Gotchas

### CRUD 操作

```javascript
// 查询
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(10)

// 插入
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'Hello', content: 'World' })
  .select()

// 更新
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated' })
  .eq('id', 1)
  .select()

// 删除
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', 1)
```

### 认证

```javascript
// 注册
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})

// 登录
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// 获取用户
const { data: { user } } = await supabase.auth.getUser()

// 登出
await supabase.auth.signOut()
```

### 实时订阅

```javascript
const channel = supabase
  .channel('posts')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => console.log(payload)
  )
  .subscribe()
```

### 行级安全

```sql
-- 启用 RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 用户只能看到自己的帖子
CREATE POLICY "Users can view own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);
```

## Next Steps

- [Supabase 文档](https://supabase.com/docs) - 官方文档
- [Supabase 教程](https://supabase.com/docs/guides) - 指南
- [Supabase CLI](https://supabase.com/docs/guides/cli) - 本地开发
- [Supabase Discord](https://discord.supabase.com/) - 社区
