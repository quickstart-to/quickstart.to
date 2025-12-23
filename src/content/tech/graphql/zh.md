---
title: "GraphQL"
description: "5 分钟快速入门 GraphQL API 开发"
template: "tool"
tags: ["api", "query-language", "facebook"]
---

## TL;DR

**是什么**：API 的查询语言和执行查询的运行时。

**为什么用**：精确获取所需数据、单一端点、强类型、自文档化。

## Quick Start

**安装（Node.js）**：
```bash
npm install graphql @apollo/server
```

**创建服务器**：
```javascript
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const typeDefs = `
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
```

**查询**（在 http://localhost:4000）：
```graphql
query {
  hello
}
```

## Cheatsheet

| 概念 | 描述 |
|---------|-------------|
| Query | 读取数据 |
| Mutation | 写入/修改数据 |
| Subscription | 实时更新 |
| Type | Schema 定义 |
| Resolver | 字段逻辑 |
| Fragment | 可复用字段 |

## Gotchas

### Schema 定义

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String
  author: User!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
  createPost(title: String!, authorId: ID!): Post!
}
```

### 解析器

```javascript
const resolvers = {
  Query: {
    users: () => db.users.findAll(),
    user: (_, { id }) => db.users.findById(id),
    posts: () => db.posts.findAll()
  },
  Mutation: {
    createUser: (_, { name, email }) => db.users.create({ name, email }),
    createPost: (_, { title, authorId }) => db.posts.create({ title, authorId })
  },
  User: {
    posts: (user) => db.posts.findByAuthor(user.id)
  },
  Post: {
    author: (post) => db.users.findById(post.authorId)
  }
}
```

### 客户端查询

```graphql
# 带参数查询
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    posts {
      title
    }
  }
}

# Mutation
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
  }
}

# Fragments
fragment UserFields on User {
  id
  name
  email
}

query {
  users {
    ...UserFields
  }
}
```

### Apollo Client（React）

```javascript
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`

function Users() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return data.users.map(user => <div key={user.id}>{user.name}</div>)
}
```

## Next Steps

- [GraphQL 文档](https://graphql.org/learn/) - 官方文档
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - 服务器库
- [Apollo Client](https://www.apollographql.com/docs/react/) - React 客户端
- [GraphQL Playground](https://github.com/graphql/graphql-playground) - IDE
