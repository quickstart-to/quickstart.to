---
title: "Markdown"
description: "Lightweight markup language - simple syntax for docs, READMEs, notes that converts to HTML"
template: "tool"
tags: ["documentation", "writing", "formatting"]
---

## TL;DR

**What**: Lightweight markup language for creating formatted text.

**Why**: Write docs, READMEs, notes with simple syntax that converts to HTML.

## Quick Start

**Headers**:

```markdown
# H1 Header
## H2 Header
### H3 Header
```

**Text formatting**:

```markdown
**bold text**
*italic text*
~~strikethrough~~
`inline code`
```

**Lists**:

```markdown
- Unordered item
- Another item
  - Nested item

1. Ordered item
2. Another item
```

**Links and images**:

```markdown
[Link text](https://example.com)
![Alt text](image.png)
```

**Code blocks**:

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

## Cheatsheet

| Syntax | Result |
|--------|--------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `~~strike~~` | ~~strike~~ |
| `` `code` `` | `code` |
| `[text](url)` | link |
| `![alt](img)` | image |
| `> quote` | blockquote |
| `---` | horizontal rule |

**Tables**:

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

**Task lists** (GitHub Flavored):

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
