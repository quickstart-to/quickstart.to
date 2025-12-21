# Contributing to quickstart.to

> The TL;DR of everything

[中文](./CONTRIBUTING.zh.md)

Thank you for your interest in contributing to quickstart.to! This guide will help you get started.

## Types of Contributions

### 1. New Quickstart

Add a new guide for a technology or skill.

**Requirements:**
- Title must be clear and specific
- Description must be 10-200 characters
- Content should be completable in 5 minutes or less
- Include all essential steps, nothing more

### 2. Translation

Translate an existing quickstart to another language.

**Supported languages:**
- English (en)
- Chinese (zh)
- German (de)
- French (fr)
- Spanish (es)

### 3. Improvements

Fix typos, improve clarity, or update outdated information.

## Getting Started

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/quickstart.to.git
cd quickstart.to
pnpm install
```

### 2. Create a New Quickstart

```bash
pnpm new
```

Or manually create:

```
src/content/{category}/{id}/
├── {lang}.md       # Any language (en.md, zh.md, de.md, etc.)
└── assets/         # Optional images
```

### 3. Frontmatter Format

```yaml
---
title: "Your Title"
description: "A brief description (10-200 characters)"
tags: ["tag1", "tag2"]
---
```

### 4. Content Structure

All quickstarts must follow this structure:

```markdown
## TL;DR

**What**: One-line definition.

**Why**: What problem it solves.

## Quick Start

Installation and first example.

## Cheatsheet

Common commands or tips in a table/list format.

## Gotchas

Common problems and how to fix them.

## Next Steps

- [Link to docs](url)
- [Link to more resources](url)
```

### 5. Validate Your Content

```bash
pnpm validate
```

### 6. Test Locally

```bash
pnpm dev
```

### 7. Submit a Pull Request

1. Create a new branch: `git checkout -b feat/my-quickstart`
2. Commit your changes
3. Push to your fork
4. Open a Pull Request

## Style Guide

### Writing Style

- **Be concise**: No fluff, just essentials
- **Be actionable**: Every section should have clear steps
- **Be specific**: Include exact commands and code

### Code Blocks

Always specify the language:

```bash
# Good
npm install package
```

### Images

- Place in `assets/` folder within the quickstart directory
- Use lowercase names with hyphens: `step-1-install.png`
- Reference with relative paths: `![Screenshot](./assets/screenshot.png)`

## ID Naming Rules

- Use lowercase letters, numbers, and hyphens
- No underscores, spaces, or special characters
- Examples: `docker`, `react-hooks`, `git入门`

## Validation Rules

| Rule | Description |
|------|-------------|
| ID naming | No `_` `/` spaces `?#&=.` |
| ID conflicts | Same ID can only exist in one category |
| Frontmatter | title and description required |
| Description | 10-200 characters |
| Assets | Lowercase names with hyphens |
| Structure | Must have: TL;DR, Quick Start, Cheatsheet, Gotchas, Next Steps |

## Need Help?

- Open an [Issue](https://github.com/quickstart-to/quickstart.to/issues)
- Check existing [Discussions](https://github.com/quickstart-to/quickstart.to/discussions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
