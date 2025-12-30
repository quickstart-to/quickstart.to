---
title: "Markdown"
description: "Démarrez avec Markdown pour la documentation"
template: "tool"
tags: ["documentation", "writing", "formatting"]
---

## TL;DR

**Quoi** : Langage de balisage léger pour créer du texte formaté.

**Pourquoi** : Écrire des docs, READMEs, notes avec une syntaxe simple qui se convertit en HTML.

## Quick Start

**En-têtes** :

```markdown
# H1 Header
## H2 Header
### H3 Header
```

**Formatage du texte** :

```markdown
**bold text**
*italic text*
~~strikethrough~~
`inline code`
```

**Listes** :

```markdown
- Unordered item
- Another item
  - Nested item

1. Ordered item
2. Another item
```

**Liens et images** :

```markdown
[Link text](https://example.com)
![Alt text](image.png)
```

**Blocs de code** :

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

## Cheatsheet

| Syntaxe | Résultat |
|--------|--------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `~~strike~~` | ~~strike~~ |
| `` `code` `` | `code` |
| `[text](url)` | lien |
| `![alt](img)` | image |
| `> quote` | citation |
| `---` | ligne horizontale |

**Tableaux** :

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

**Listes de tâches** (GitHub Flavored) :

```markdown
- [x] Completed task
- [ ] Pending task
```

## Gotchas

### Line breaks not working

```markdown
<!-- Add two spaces at end of line  -->
Line one
Line two

<!-- Or use blank line for paragraph -->
Paragraph one

Paragraph two
```

### Images not showing

```markdown
<!-- Use relative path -->
![Screenshot](./images/screenshot.png)

<!-- Or absolute URL -->
![Logo](https://example.com/logo.png)
```

### Code block language highlighting

````markdown
<!-- Specify language after backticks -->
```python
print("Hello")
```

```bash
echo "Hello"
```
````

### Escaping special characters

```markdown
\* Not italic \*
\# Not a header
\[Not a link\]
```

## Next Steps

- [CommonMark Spec](https://commonmark.org/)
- [GitHub Markdown Guide](https://docs.github.com/en/get-started/writing-on-github)
- [Markdown Tutorial](https://www.markdowntutorial.com/)
- [Dillinger Online Editor](https://dillinger.io/)
