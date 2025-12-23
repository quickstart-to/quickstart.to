# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

quickstart.to is a community-driven knowledge base providing no-fluff quickstart guides. Built with Astro (static site generator), TypeScript, and supports 5 languages (en, zh, de, fr, es).

## Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production (runs prebuild automatically)
pnpm preview          # Preview production build
pnpm new              # Interactive CLI to create new quickstart guide
pnpm validate         # Validate all content (ID naming, frontmatter, assets)
pnpm contributors     # Fetch contributor data from GitHub API
pnpm contributors:full # Force full re-fetch of contributors
```

## Architecture

### Content Structure
```
src/content/{category}/{id}/{lang}.md
src/content/{category}/{id}/assets/   # Optional images
```
- Categories: `tech`, `life`
- Languages: `en.md`, `zh.md`, `de.md`, `fr.md`, `es.md`

### Routing
- `/docker` → English (default, no prefix)
- `/zh/docker` → Chinese (with prefix)
- `/contributors` → Contributors page

### Key Directories
- `src/content/` - Markdown content with frontmatter
- `src/components/` - Astro components
- `src/layouts/` - Page layouts (BaseLayout, QuickstartLayout)
- `src/i18n/` - Language config and UI translations
- `src/utils/` - Content queries, language utils, contributor utils
- `scripts/` - CLI tools and validation scripts

### Path Aliases
```
@/* → src/*
@components/* → src/components/*
@layouts/* → src/layouts/*
@utils/* → src/utils/*
@i18n/* → src/i18n/*
```

## Content Requirements

### Frontmatter (Required)
```yaml
---
title: "Docker"
description: "Get started with Docker containers" # 10-200 chars
template: "tool"                                  # Required: tool/language/framework/service/concept/life
tags: ["containers", "devops"]                    # Optional
---
```

### ID Naming Rules
- Allowed: lowercase letters, numbers, hyphens, Chinese characters
- Forbidden: underscores, slashes, spaces, special chars (`?#&=.`)
- Reserved words: `admin`, `api`, `assets`, `static`, `index`, `404`, `500`, `contributors`
- Max length: 100 characters

### Asset Naming
- Location: `src/content/{category}/{id}/assets/`
- Pattern: lowercase + numbers + hyphens (e.g., `step-1-install.png`)
- Extensions: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`
- No subdirectories (flat structure)

## Template System

Templates are stored in `src/templates/` as Markdown files. Each content file must specify a `template` field in frontmatter.

### Available Templates

| Template | Use For | Required Sections |
|----------|---------|-------------------|
| `tool` | CLI tools, utilities (Docker, Git, Vim) | TL;DR, Quick Start, Cheatsheet, Gotchas, Next Steps |
| `language` | Programming languages (Python, Go, Rust) | TL;DR, Philosophy, Quick Start, Language Essentials, Gotchas, When to Choose, Next Steps |
| `framework` | Web frameworks, UI libs (React, Django) | TL;DR, Core Concepts, Quick Start, Gotchas, When to Use, Next Steps |
| `service` | Cloud platforms (AWS, GCP, Vercel) | TL;DR, Architecture, Quick Start, Core Services, Gotchas, Next Steps |
| `concept` | Protocols, specs (GraphQL, OAuth) | TL;DR, How It Works, Quick Start, Key Concepts, Gotchas, Next Steps |
| `life` | Non-tech content (Cooking) | TL;DR, Fundamentals, Getting Started, Common Mistakes, Next Steps |

### Writing Guidelines

1. **说人话** - 清晰易懂简洁，避免晦涩术语
2. **信息准确** - 更新时搜索官网验证版本、API、命令
3. **价值优先** - 内核、实战、决策能力

## Validation

The `pnpm validate` command checks:
1. **id-naming** - ID length, characters, reserved words
2. **id-conflicts** - Duplicate IDs across categories
3. **frontmatter** - Required fields (title, description, template), description length
4. **assets** - File naming conventions
5. **structure** - Required sections based on template type

## GitHub API Integration

Contributors are fetched via GitHub REST API:
- Configured in `scripts/contributors/github-api.ts`
- Set `GITHUB_TOKEN` env var for higher rate limits (60 → 5000 req/hour)
- Cache stored in `scripts/contributors/cache.json`
