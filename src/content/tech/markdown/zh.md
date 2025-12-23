---
title: "Markdown"
description: "快速入门 Markdown 文档写作"
template: "tool"
tags: ["documentation", "writing", "formatting"]
---

## TL;DR

**是什么**：轻量级标记语言，用于创建格式化文本。

**为什么**：用简单语法写文档、README、笔记，可转换为 HTML。

## Quick Start

**标题**：

```markdown
# 一级标题
## 二级标题
### 三级标题
```

**文本格式**：

```markdown
**粗体文本**
*斜体文本*
~~删除线~~
`行内代码`
```

**列表**：

```markdown
- 无序项
- 另一项
  - 嵌套项

1. 有序项
2. 另一项
```

**链接和图片**：

```markdown
[链接文本](https://example.com)
![替代文本](image.png)
```

**代码块**：

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

## Cheatsheet

| 语法 | 效果 |
|------|------|
| `**粗体**` | **粗体** |
| `*斜体*` | *斜体* |
| `~~删除~~` | ~~删除~~ |
| `` `代码` `` | `代码` |
| `[文本](url)` | 链接 |
| `![alt](img)` | 图片 |
| `> 引用` | 引用块 |
| `---` | 水平线 |

**表格**：

```markdown
| 表头 1 | 表头 2 |
|--------|--------|
| 单元格 1 | 单元格 2 |
| 单元格 3 | 单元格 4 |
```

**任务列表**（GitHub 风格）：

```markdown
- [x] 已完成任务
- [ ] 待完成任务
```

## Gotchas

### 换行不生效

```markdown
<!-- 在行尾添加两个空格  -->
第一行
第二行

<!-- 或用空行分隔段落 -->
段落一

段落二
```

### 图片不显示

```markdown
<!-- 使用相对路径 -->
![截图](./images/screenshot.png)

<!-- 或使用绝对 URL -->
![Logo](https://example.com/logo.png)
```

### 代码块语法高亮

````markdown
<!-- 在反引号后指定语言 -->
```python
print("Hello")
```

```bash
echo "Hello"
```
````

### 转义特殊字符

```markdown
\* 不是斜体 \*
\# 不是标题
\[不是链接\]
```

## Next Steps

- [CommonMark 规范](https://commonmark.org/)
- [GitHub Markdown 指南](https://docs.github.com/en/get-started/writing-on-github)
- [Markdown 教程](https://www.markdowntutorial.com/)
- [Dillinger 在线编辑器](https://dillinger.io/)
