---
title: "SQLAlchemy"
description: "Toolkit SQL de Python y ORM - consultas flexibles, relaciones, soporte async, multi-BD"
template: "tool"
tags: ["python", "orm", "database"]
---

## TL;DR

**Qué**: Kit de herramientas SQL de Python y Object-Relational Mapper.

**Por qué**: Flexible, potente, soporta SQL crudo y ORM, agnóstico de base de datos.

## Quick Start

**Instalar**:
```bash
pip install sqlalchemy
```

**Conectar y consultar**:
```python
from sqlalchemy import create_engine, text

engine = create_engine('sqlite:///example.db')

with engine.connect() as conn:
    result = conn.execute(text("SELECT 'Hello, SQLAlchemy!'"))
    print(result.all())
```

## Cheatsheet

| Concepto | Descripción |
|---------|-------------|
| `Engine` | Conexión a base de datos |
| `Session` | Unidad de trabajo |
| `Model` | Mapeo de tabla |
| `Column` | Definición de campo |
| `relationship` | Relaciones de modelo |
| `Query` | Recuperación de datos |

## Gotchas

### Model definition (ORM)

```python
from sqlalchemy import Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True)

    posts = relationship('Post', back_populates='author')

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    author_id = Column(Integer, ForeignKey('users.id'))

    author = relationship('User', back_populates='posts')

# Create tables
engine = create_engine('sqlite:///example.db')
Base.metadata.create_all(engine)
```

### CRUD operations

```python
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)
session = Session()

# Create
user = User(name='John', email='john@example.com')
session.add(user)
session.commit()

# Read
users = session.query(User).all()
user = session.query(User).filter_by(id=1).first()
user = session.query(User).filter(User.name == 'John').first()

# Update
user.name = 'Johnny'
session.commit()

# Delete
session.delete(user)
session.commit()
```

### Query filtering

```python
from sqlalchemy import and_, or_

# Basic filters
users = session.query(User).filter(User.name == 'John').all()
users = session.query(User).filter(User.name.like('%John%')).all()
users = session.query(User).filter(User.id.in_([1, 2, 3])).all()

# Multiple conditions
users = session.query(User).filter(
    and_(
        User.name == 'John',
        User.email.like('%@example.com')
    )
).all()

# Ordering and limiting
users = session.query(User).order_by(User.name).limit(10).all()

# Counting
count = session.query(User).count()
```

### Relationships

```python
# Query with relationship
user = session.query(User).filter_by(id=1).first()
print(user.posts)  # Lazy load posts

# Eager loading
from sqlalchemy.orm import joinedload

users = session.query(User).options(joinedload(User.posts)).all()

# Create with relationship
post = Post(title='Hello', author=user)
session.add(post)
session.commit()
```

### SQLAlchemy 2.0 style

```python
from sqlalchemy import select
from sqlalchemy.orm import Session

with Session(engine) as session:
    # Select
    stmt = select(User).where(User.name == 'John')
    users = session.scalars(stmt).all()

    # Insert
    user = User(name='Jane', email='jane@example.com')
    session.add(user)
    session.commit()
```

### Async support

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

engine = create_async_engine('postgresql+asyncpg://user:pass@localhost/db')
async_session = sessionmaker(engine, class_=AsyncSession)

async with async_session() as session:
    result = await session.execute(select(User))
    users = result.scalars().all()
```

## Next Steps

- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/) - Documentación oficial
- [ORM Tutorial](https://docs.sqlalchemy.org/en/20/tutorial/) - Para empezar
- [ORM Quickstart](https://docs.sqlalchemy.org/en/20/orm/quickstart.html) - Introducción rápida
- [Alembic](https://alembic.sqlalchemy.org/) - Migraciones
