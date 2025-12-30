---
title: "GraphQL"
description: "Démarrez avec le développement d'API GraphQL en 5 minutes"
template: "tool"
tags: ["api", "query-language", "facebook"]
---

## TL;DR

**Quoi** : Un langage de requête pour les APIs et un runtime pour exécuter des requêtes.

**Pourquoi** : Obtenez exactement ce dont vous avez besoin, point d'accès unique, fortement typé, auto-documenté.

## Quick Start

**Installation (Node.js)** :
```bash
npm install graphql @apollo/server
```

**Créer le serveur** :
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

**Requête** (sur http://localhost:4000) :
```graphql
query {
  hello
}
```

## Cheatsheet

| Concept | Description |
|---------|-------------|
| Query | Lire des données |
| Mutation | Écrire/modifier des données |
| Subscription | Mises à jour temps réel |
| Type | Définition du schéma |
| Resolver | Logique des champs |
| Fragment | Champs réutilisables |

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
# Requête avec arguments
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

- [Documentation GraphQL](https://graphql.org/learn/) - Docs officielles
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Bibliothèque serveur
- [Apollo Client](https://www.apollographql.com/docs/react/) - Client React
- [GraphQL Playground](https://github.com/graphql/graphql-playground) - IDE
