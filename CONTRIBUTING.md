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

**Template types:**

| Template | Use For | Example |
|----------|---------|---------|
| `tool` | CLI tools, utilities | Docker, Git, Vim |
| `language` | Programming languages | Python, Go, Rust |
| `framework` | Web frameworks, UI libs | React, Django |
| `service` | Cloud platforms | AWS, GCP, Vercel |
| `concept` | Protocols, specs | GraphQL, OAuth |
| `life` | Non-tech content | Cooking, Fitness |
| `aha` | Free-form content | Humor, satire |
| `collection` | Curated content indexes | Topic hubs |
| `people` | Personal profiles | Collaboration guides |

### 2. People Profile

Create a personal "instruction manual" for collaboration at `quickstart.to/@username`.

**How to create:**
```bash
pnpm new:people
```

**Frontmatter:**
```yaml
---
owner_id: 583231           # Your GitHub User ID (required)
display_name: "Your Name"  # Display name (required)
tagline: "Short bio"       # 10-160 chars (optional)
---
```

**Rules:**
- Directory must start with `@` (e.g., `@octocat`)
- One profile per GitHub user (enforced by `owner_id`)
- Only you can modify your profile
- Variants (like `zh.md`) inherit ownership from `default.md`

**Username Verification:**
- **Same name**: If your profile username matches your GitHub username, it passes automatically
- **Different name (alias)**: If you want to use a different username (e.g., GitHub is `john-doe` but profile is `@johnny`):
  1. Submit your PR normally
  2. The CI will generate a verification challenge code
  3. Add the challenge code to your social bio (Twitter/GitHub/etc)
  4. Request a maintainer to verify and add the `verified-alias` label
  5. Once labeled, your PR can be merged

### 3. Variants

Add a variant of an existing quickstart (e.g., Chinese translation, advanced version).

**How variants work:**
- `default.md` - Required default version
- `zh.md` - Chinese variant
- `advanced.md` - Advanced variant
- Any other `{name}.md` files

### 4. Improvements

Fix typos, improve clarity, or update outdated information.

### 5. New Template

Add a new content template type (maintainer-level contribution).

**Steps:**
1. Create template file: `src/templates/{name}.md`
2. Update types: `scripts/validate/types.ts`
3. Update docs: `CLAUDE.md`, `CONTRIBUTING.md`

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
├── default.md      # Required default version
├── zh.md           # Optional Chinese variant
├── advanced.md     # Optional advanced variant
└── assets/         # Optional images
```

### 3. Frontmatter Format

```yaml
---
title: "Your Title"
description: "Feature-oriented: [what it does] - [value proposition]"
template: "tool"  # Required: tool/language/framework/service/concept/life/aha/collection
tags: ["tag1", "tag2"]
---
```

### 4. Content Structure

Each template has different required sections. Run `pnpm new` to generate the correct structure, or check the template files in `src/templates/`.

**Example (tool template):**

```markdown
## TL;DR
One-line definition and why it matters.

## Quick Start
Installation and first example.

## Cheatsheet
Common commands or tips.

## Gotchas
Common problems and solutions.

## Next Steps
Links to resources.
```

> Different templates have different required sections. The `aha` and `collection` templates are free-form with no required structure.

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

### Description Writing

Write what it does, not "get started":

- **Good**: "Package and run apps in isolated containers - consistent environments"
- **Bad**: "Get started with Docker in 5 minutes"

## ID Naming Rules

- Use lowercase letters, numbers, and hyphens
- No underscores, spaces, or special characters
- Examples: `docker`, `react-hooks`, `git入门`

## Validation Rules

| Rule | Description |
|------|-------------|
| ID naming | No `_` `/` spaces `?#&=.` |
| ID conflicts | Same ID can only exist in one category |
| Frontmatter | title, description, and template required |
| Description | 10-200 characters |
| Assets | Lowercase names with hyphens |
| Structure | Required sections vary by template type |

## Need Help?

- Open an [Issue](https://github.com/quickstart-to/quickstart.to/issues)
- Check existing [Discussions](https://github.com/quickstart-to/quickstart.to/discussions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
