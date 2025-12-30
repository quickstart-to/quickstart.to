---
title: "GraphQL"
description: "Lenguaje de consulta para APIs - solicita exactamente lo que necesitas, resultados predecibles desde un solo endpoint"
template: "tool"
tags: ["api", "query-language", "facebook"]
---

## TL;DR

**Qué**: Un lenguaje de consulta para APIs y un runtime para ejecutar consultas.

**Por qué**: Obtén exactamente lo que necesitas, un solo endpoint, fuertemente tipado, auto-documentado.

## Quick Start

**Instalación (Node.js)**:
```bash
npm install graphql @apollo/server
```

**Crear servidor**:
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

**Consulta** (en http://localhost:4000):
```graphql
query {
  hello
}
```

## Cheatsheet

| Concepto | Descripción |
|---------|-------------|
| Query | Leer datos |
| Mutation | Escribir/modificar datos |
| Subscription | Actualizaciones en tiempo real |
| Type | Definición del esquema |
| Resolver | Lógica de campos |
| Fragment | Campos reutilizables |

## Gotchas

### Schema definition

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

### Resolvers

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

### Client queries

```graphql
# Consulta con argumentos
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

### Apollo Client (React)

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

- [Documentación de GraphQL](https://graphql.org/learn/) - Docs oficiales
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Biblioteca del servidor
- [Apollo Client](https://www.apollographql.com/docs/react/) - Cliente React
- [GraphQL Playground](https://github.com/graphql/graphql-playground) - IDE
