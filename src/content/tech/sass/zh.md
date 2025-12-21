---
title: "Sass"
description: "5 分钟快速入门 Sass CSS 预处理器"
tags: ["css", "frontend", "preprocessor"]
---

## TL;DR

**是什么**：添加变量、嵌套、混入等功能的 CSS 预处理器。

**为什么用**：更整洁的样式表、可复用代码、更好的组织、强大的功能。

## Quick Start

**安装**：
```bash
npm install -D sass
```

**编译**：
```bash
npx sass input.scss output.css
npx sass --watch input.scss output.css  # 监听模式
```

**使用 Vite**（自动）：
```bash
npm install -D sass
# 直接导入 .scss 文件即可
```

**第一个 SCSS 文件**（`style.scss`）：
```scss
$primary: #007bff;

.button {
  background: $primary;
  &:hover {
    background: darken($primary, 10%);
  }
}
```

## Cheatsheet

| 功能 | 语法 |
|---------|--------|
| 变量 | `$name: value;` |
| 嵌套 | `.parent { .child { } }` |
| 片段 | `_partial.scss` |
| 导入 | `@use 'partial';` |
| 混入 | `@mixin name { }` |
| 包含 | `@include name;` |
| 继承 | `@extend .class;` |
| 函数 | `@function name() { @return value; }` |

## Gotchas

### 变量

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

### 嵌套

```scss
nav {
  ul {
    margin: 0;
    li {
      display: inline-block;
      a {
        color: blue;
        &:hover { color: red; }  // & = 父选择器
      }
    }
  }
}
```

### 混入

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button($bg-color) {
  background: $bg-color;
  padding: 10px 20px;
  border-radius: 4px;
}

.container {
  @include flex-center;
}

.btn-primary {
  @include button(#007bff);
}
```

### @use vs @import

```scss
// 现代方式：@use（推荐）
@use 'variables' as vars;
color: vars.$primary;

// 旧方式：@import（已弃用）
@import 'variables';
```

## Next Steps

- [Sass 文档](https://sass-lang.com/documentation/) - 官方文档
- [Sass Guidelines](https://sass-guidelin.es/) - 最佳实践
- [Sass Playground](https://www.sassmeister.com/) - 在线编译器
- [Sass in VS Code](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) - 扩展
