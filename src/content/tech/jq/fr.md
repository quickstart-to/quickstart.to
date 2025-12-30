---
title: "jq"
description: "Processeur JSON en ligne de commande - analyser, filtrer, transformer des donnees JSON dans les scripts"
template: "tool"
tags: ["cli", "json", "data-processing"]
---

## TL;DR

**Quoi** : Processeur JSON léger en ligne de commande.

**Pourquoi** : Parser, filtrer, transformer du JSON, scriptable, compatible avec les pipes.

## Quick Start

**Installation** :
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt install jq

# Vérifier la version
jq --version
```

**Utilisation basique** :
```bash
# Affichage formaté
echo '{"name":"John"}' | jq '.'

# Récupérer un champ
echo '{"name":"John"}' | jq '.name'

# Depuis un fichier
jq '.' data.json
```

## Cheatsheet

| Filtre | Description |
|--------|-------------|
| `.` | Identité (entrée complète) |
| `.field` | Récupérer un champ |
| `.[]` | Itérer sur un array |
| `.[0]` | Index d'array |
| `|` | Chaîner les filtres |
| `select()` | Filtrer les éléments |
| `map()` | Transformer les éléments |

## Gotchas

### Basic selection

```bash
# JSON exemple
echo '{"user":{"name":"John","age":30}}' | jq '.'

# Récupérer un champ imbriqué
echo '{"user":{"name":"John"}}' | jq '.user.name'
# Sortie : "John"

# Récupérer une chaîne brute (sans guillemets)
echo '{"name":"John"}' | jq -r '.name'
# Sortie : John

# Champs multiples
echo '{"name":"John","age":30}' | jq '.name, .age'
```

### Arrays

```bash
# Array exemple
echo '[1,2,3,4,5]' | jq '.'

# Récupérer tous les éléments
echo '[1,2,3]' | jq '.[]'

# Récupérer par index
echo '["a","b","c"]' | jq '.[1]'
# Sortie : "b"

# Tranche
echo '[1,2,3,4,5]' | jq '.[2:4]'
# Sortie : [3,4]

# Longueur de l'array
echo '[1,2,3]' | jq 'length'
```

### Objects in arrays

```bash
# Données exemple
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'

# Récupérer tous les noms
echo $DATA | jq '.[].name'

# Récupérer le premier élément
echo $DATA | jq '.[0]'

# Mapper vers une nouvelle structure
echo $DATA | jq 'map({n: .name, a: .age})'
```

### Filtering

```bash
# Sélectionner des éléments
echo '[1,2,3,4,5]' | jq 'map(select(. > 2))'
# Sortie : [3,4,5]

# Filtrer des objets
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'
echo $DATA | jq '.[] | select(.age > 26)'

# Conditions multiples
echo $DATA | jq '.[] | select(.age > 20 and .name == "John")'
```

### Transformation

```bash
# Mapper des valeurs
echo '[1,2,3]' | jq 'map(. * 2)'
# Sortie : [2,4,6]

# Ajouter un champ
echo '{"name":"John"}' | jq '. + {age: 30}'

# Mettre à jour un champ
echo '{"count":1}' | jq '.count += 1'

# Supprimer un champ
echo '{"name":"John","age":30}' | jq 'del(.age)'

# Construire un nouvel objet
echo '{"first":"John","last":"Doe"}' | jq '{fullName: "\(.first) \(.last)"}'
```

### Practical examples

```bash
# Parser une réponse API
curl -s https://api.github.com/users/octocat | jq '{name, company, location}'

# Compter les éléments
cat data.json | jq 'length'

# Sommer des valeurs
echo '[{"price":10},{"price":20}]' | jq '[.[].price] | add'

# Grouper par champ
echo '[{"type":"a"},{"type":"b"},{"type":"a"}]' | jq 'group_by(.type)'

# Trier
echo '[3,1,2]' | jq 'sort'
echo '[{"name":"B"},{"name":"A"}]' | jq 'sort_by(.name)'
```

## Next Steps

- [Manuel jq](https://jqlang.github.io/jq/manual/) - Docs officielles
- [Playground jq](https://jqplay.org/) - Essayer en ligne
- [Cookbook jq](https://github.com/stedolan/jq/wiki/Cookbook) - Recettes
- [jqterm](https://jqterm.com/) - Explorateur interactif
