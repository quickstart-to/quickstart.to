---
title: "jq"
description: "Get started with jq JSON processor in 5 minutes"
template: "tool"
tags: ["cli", "json", "data-processing"]
---

## TL;DR

**What**: Lightweight command-line JSON processor.

**Why**: Parse, filter, transform JSON, scriptable, pipe-friendly.

## Quick Start

**Install**:
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt install jq

# Check version
jq --version
```

**Basic usage**:
```bash
# Pretty print
echo '{"name":"John"}' | jq '.'

# Get field
echo '{"name":"John"}' | jq '.name'

# From file
jq '.' data.json
```

## Cheatsheet

| Filter | Description |
|--------|-------------|
| `.` | Identity (whole input) |
| `.field` | Get field |
| `.[]` | Iterate array |
| `.[0]` | Array index |
| `|` | Pipe filters |
| `select()` | Filter items |
| `map()` | Transform items |

## Gotchas

### Basic selection

```bash
# Sample JSON
echo '{"user":{"name":"John","age":30}}' | jq '.'

# Get nested field
echo '{"user":{"name":"John"}}' | jq '.user.name'
# Output: "John"

# Get raw string (no quotes)
echo '{"name":"John"}' | jq -r '.name'
# Output: John

# Multiple fields
echo '{"name":"John","age":30}' | jq '.name, .age'
```

### Arrays

```bash
# Sample array
echo '[1,2,3,4,5]' | jq '.'

# Get all elements
echo '[1,2,3]' | jq '.[]'

# Get by index
echo '["a","b","c"]' | jq '.[1]'
# Output: "b"

# Slice
echo '[1,2,3,4,5]' | jq '.[2:4]'
# Output: [3,4]

# Array length
echo '[1,2,3]' | jq 'length'
```

### Objects in arrays

```bash
# Sample data
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'

# Get all names
echo $DATA | jq '.[].name'

# Get first item
echo $DATA | jq '.[0]'

# Map to new structure
echo $DATA | jq 'map({n: .name, a: .age})'
```

### Filtering

```bash
# Select items
echo '[1,2,3,4,5]' | jq 'map(select(. > 2))'
# Output: [3,4,5]

# Filter objects
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'
echo $DATA | jq '.[] | select(.age > 26)'

# Multiple conditions
echo $DATA | jq '.[] | select(.age > 20 and .name == "John")'
```

### Transformation

```bash
# Map values
echo '[1,2,3]' | jq 'map(. * 2)'
# Output: [2,4,6]

# Add field
echo '{"name":"John"}' | jq '. + {age: 30}'

# Update field
echo '{"count":1}' | jq '.count += 1'

# Delete field
echo '{"name":"John","age":30}' | jq 'del(.age)'

# Construct new object
echo '{"first":"John","last":"Doe"}' | jq '{fullName: "\(.first) \(.last)"}'
```

### Practical examples

```bash
# Parse API response
curl -s https://api.github.com/users/octocat | jq '{name, company, location}'

# Count items
cat data.json | jq 'length'

# Sum values
echo '[{"price":10},{"price":20}]' | jq '[.[].price] | add'

# Group by field
echo '[{"type":"a"},{"type":"b"},{"type":"a"}]' | jq 'group_by(.type)'

# Sort
echo '[3,1,2]' | jq 'sort'
echo '[{"name":"B"},{"name":"A"}]' | jq 'sort_by(.name)'
```

## Next Steps

- [jq Manual](https://jqlang.github.io/jq/manual/) - Official docs
- [jq Playground](https://jqplay.org/) - Try online
- [jq Cookbook](https://github.com/stedolan/jq/wiki/Cookbook) - Recipes
- [jqterm](https://jqterm.com/) - Interactive explorer
