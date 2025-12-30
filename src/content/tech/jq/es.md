---
title: "jq"
description: "Comienza con el procesador JSON jq en 5 minutos"
template: "tool"
tags: ["cli", "json", "data-processing"]
---

## TL;DR

**Qué**: Procesador JSON ligero de línea de comandos.

**Por qué**: Parsear, filtrar, transformar JSON, scriptable, compatible con pipes.

## Quick Start

**Instalación**:
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt install jq

# Verificar versión
jq --version
```

**Uso básico**:
```bash
# Imprimir formateado
echo '{"name":"John"}' | jq '.'

# Obtener campo
echo '{"name":"John"}' | jq '.name'

# Desde archivo
jq '.' data.json
```

## Cheatsheet

| Filtro | Descripción |
|--------|-------------|
| `.` | Identidad (toda la entrada) |
| `.field` | Obtener campo |
| `.[]` | Iterar array |
| `.[0]` | Índice de array |
| `|` | Encadenar filtros |
| `select()` | Filtrar elementos |
| `map()` | Transformar elementos |

## Gotchas

### Basic selection

```bash
# JSON de ejemplo
echo '{"user":{"name":"John","age":30}}' | jq '.'

# Obtener campo anidado
echo '{"user":{"name":"John"}}' | jq '.user.name'
# Salida: "John"

# Obtener string sin comillas
echo '{"name":"John"}' | jq -r '.name'
# Salida: John

# Múltiples campos
echo '{"name":"John","age":30}' | jq '.name, .age'
```

### Arrays

```bash
# Array de ejemplo
echo '[1,2,3,4,5]' | jq '.'

# Obtener todos los elementos
echo '[1,2,3]' | jq '.[]'

# Obtener por índice
echo '["a","b","c"]' | jq '.[1]'
# Salida: "b"

# Slice
echo '[1,2,3,4,5]' | jq '.[2:4]'
# Salida: [3,4]

# Longitud del array
echo '[1,2,3]' | jq 'length'
```

### Objects in arrays

```bash
# Datos de ejemplo
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'

# Obtener todos los nombres
echo $DATA | jq '.[].name'

# Obtener primer elemento
echo $DATA | jq '.[0]'

# Mapear a nueva estructura
echo $DATA | jq 'map({n: .name, a: .age})'
```

### Filtering

```bash
# Seleccionar elementos
echo '[1,2,3,4,5]' | jq 'map(select(. > 2))'
# Salida: [3,4,5]

# Filtrar objetos
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'
echo $DATA | jq '.[] | select(.age > 26)'

# Múltiples condiciones
echo $DATA | jq '.[] | select(.age > 20 and .name == "John")'
```

### Transformation

```bash
# Mapear valores
echo '[1,2,3]' | jq 'map(. * 2)'
# Salida: [2,4,6]

# Añadir campo
echo '{"name":"John"}' | jq '. + {age: 30}'

# Actualizar campo
echo '{"count":1}' | jq '.count += 1'

# Eliminar campo
echo '{"name":"John","age":30}' | jq 'del(.age)'

# Construir nuevo objeto
echo '{"first":"John","last":"Doe"}' | jq '{fullName: "\(.first) \(.last)"}'
```

### Practical examples

```bash
# Parsear respuesta de API
curl -s https://api.github.com/users/octocat | jq '{name, company, location}'

# Contar elementos
cat data.json | jq 'length'

# Sumar valores
echo '[{"price":10},{"price":20}]' | jq '[.[].price] | add'

# Agrupar por campo
echo '[{"type":"a"},{"type":"b"},{"type":"a"}]' | jq 'group_by(.type)'

# Ordenar
echo '[3,1,2]' | jq 'sort'
echo '[{"name":"B"},{"name":"A"}]' | jq 'sort_by(.name)'
```

## Next Steps

- [Manual de jq](https://jqlang.github.io/jq/manual/) - Docs oficiales
- [Playground de jq](https://jqplay.org/) - Probar online
- [Cookbook de jq](https://github.com/stedolan/jq/wiki/Cookbook) - Recetas
- [jqterm](https://jqterm.com/) - Explorador interactivo
