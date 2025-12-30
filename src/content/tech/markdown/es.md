---
title: "Markdown"
description: "Comienza con Markdown para documentación"
template: "tool"
tags: ["documentation", "writing", "formatting"]
---

## TL;DR

**Qué**: Lenguaje de marcado ligero para crear texto formateado.

**Por qué**: Escribe docs, READMEs, notas con sintaxis simple que se convierte a HTML.

## Quick Start

**Encabezados**:

```markdown
# H1 Header
## H2 Header
### H3 Header
```

**Formato de texto**:

```markdown
**bold text**
*italic text*
~~strikethrough~~
`inline code`
```

**Listas**:

```markdown
- Unordered item
- Another item
  - Nested item

1. Ordered item
2. Another item
```

**Enlaces e imágenes**:

```markdown
[Link text](https://example.com)
![Alt text](image.png)
```

**Bloques de código**:

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

## Cheatsheet

| Sintaxis | Resultado |
|--------|--------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `~~strike~~` | ~~strike~~ |
| `` `code` `` | `code` |
| `[text](url)` | enlace |
| `![alt](img)` | imagen |
| `> quote` | cita |
| `---` | línea horizontal |

**Tablas**:

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

**Listas de tareas** (GitHub Flavored):

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
