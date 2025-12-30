---
title: "jq"
description: "Starten Sie mit dem jq JSON-Prozessor in 5 Minuten"
template: "tool"
tags: ["cli", "json", "data-processing"]
---

## TL;DR

**Was**: Leichtgewichtiger Kommandozeilen-JSON-Prozessor.

**Warum**: JSON parsen, filtern, transformieren, skriptfähig, pipe-freundlich.

## Quick Start

**Installation**:
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt install jq

# Version prüfen
jq --version
```

**Grundlegende Verwendung**:
```bash
# Formatierte Ausgabe
echo '{"name":"John"}' | jq '.'

# Feld abrufen
echo '{"name":"John"}' | jq '.name'

# Aus Datei
jq '.' data.json
```

## Cheatsheet

| Filter | Beschreibung |
|--------|-------------|
| `.` | Identität (gesamte Eingabe) |
| `.field` | Feld abrufen |
| `.[]` | Array iterieren |
| `.[0]` | Array-Index |
| `|` | Filter verketten |
| `select()` | Elemente filtern |
| `map()` | Elemente transformieren |

## Gotchas

### Basic selection

```bash
# Beispiel-JSON
echo '{"user":{"name":"John","age":30}}' | jq '.'

# Verschachteltes Feld abrufen
echo '{"user":{"name":"John"}}' | jq '.user.name'
# Ausgabe: "John"

# Rohstring abrufen (ohne Anführungszeichen)
echo '{"name":"John"}' | jq -r '.name'
# Ausgabe: John

# Mehrere Felder
echo '{"name":"John","age":30}' | jq '.name, .age'
```

### Arrays

```bash
# Beispiel-Array
echo '[1,2,3,4,5]' | jq '.'

# Alle Elemente abrufen
echo '[1,2,3]' | jq '.[]'

# Nach Index abrufen
echo '["a","b","c"]' | jq '.[1]'
# Ausgabe: "b"

# Ausschnitt
echo '[1,2,3,4,5]' | jq '.[2:4]'
# Ausgabe: [3,4]

# Array-Länge
echo '[1,2,3]' | jq 'length'
```

### Objects in arrays

```bash
# Beispieldaten
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'

# Alle Namen abrufen
echo $DATA | jq '.[].name'

# Erstes Element abrufen
echo $DATA | jq '.[0]'

# Zu neuer Struktur mappen
echo $DATA | jq 'map({n: .name, a: .age})'
```

### Filtering

```bash
# Elemente auswählen
echo '[1,2,3,4,5]' | jq 'map(select(. > 2))'
# Ausgabe: [3,4,5]

# Objekte filtern
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'
echo $DATA | jq '.[] | select(.age > 26)'

# Mehrere Bedingungen
echo $DATA | jq '.[] | select(.age > 20 and .name == "John")'
```

### Transformation

```bash
# Werte mappen
echo '[1,2,3]' | jq 'map(. * 2)'
# Ausgabe: [2,4,6]

# Feld hinzufügen
echo '{"name":"John"}' | jq '. + {age: 30}'

# Feld aktualisieren
echo '{"count":1}' | jq '.count += 1'

# Feld löschen
echo '{"name":"John","age":30}' | jq 'del(.age)'

# Neues Objekt konstruieren
echo '{"first":"John","last":"Doe"}' | jq '{fullName: "\(.first) \(.last)"}'
```

### Practical examples

```bash
# API-Antwort parsen
curl -s https://api.github.com/users/octocat | jq '{name, company, location}'

# Elemente zählen
cat data.json | jq 'length'

# Werte summieren
echo '[{"price":10},{"price":20}]' | jq '[.[].price] | add'

# Nach Feld gruppieren
echo '[{"type":"a"},{"type":"b"},{"type":"a"}]' | jq 'group_by(.type)'

# Sortieren
echo '[3,1,2]' | jq 'sort'
echo '[{"name":"B"},{"name":"A"}]' | jq 'sort_by(.name)'
```

## Next Steps

- [jq Handbuch](https://jqlang.github.io/jq/manual/) - Offizielle Docs
- [jq Playground](https://jqplay.org/) - Online ausprobieren
- [jq Cookbook](https://github.com/stedolan/jq/wiki/Cookbook) - Rezepte
- [jqterm](https://jqterm.com/) - Interaktiver Explorer
