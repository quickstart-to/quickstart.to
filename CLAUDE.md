# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

quickstart.to is a community-driven knowledge base providing no-fluff quickstart guides. Built with Astro (static site generator) and TypeScript.

## Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production (runs prebuild automatically)
pnpm preview          # Preview production build
pnpm new              # Interactive CLI to create new quickstart guide
pnpm new:people       # Interactive CLI to create new people profile
pnpm validate         # Validate all content (ID naming, frontmatter, assets)
pnpm contributors     # Fetch contributor data from GitHub API
pnpm contributors:full # Force full re-fetch of contributors
```

## Architecture

### Content Structure
```
src/content/{category}/{id}/{variant}.md
src/content/{category}/{id}/assets/   # Optional images
src/content/people/@{username}/{variant}.md   # People profiles
```
- Categories: `tech`, `life`, `people`
- Variants: `default.md` (required), plus optional variants like `zh.md`, `advanced.md`, etc.

### Routing
- `/docker` → default.md (default variant)
- `/docker/zh` → zh.md (variant as path suffix)
- `/@username` → people profile default.md
- `/@username/zh` → people profile variant
- `/contributors` → Contributors page

### Key Directories
- `src/content/` - Markdown content with frontmatter
- `src/components/` - Astro components
- `src/layouts/` - Page layouts (BaseLayout, QuickstartLayout)
- `src/utils/` - Content queries, variant utils, contributor utils
- `scripts/` - CLI tools and validation scripts

### Path Aliases
```
@/* → src/*
@components/* → src/components/*
@layouts/* → src/layouts/*
@utils/* → src/utils/*
```

## Content Requirements

### Frontmatter (Required)
```yaml
---
title: "Docker"
description: "Package and run apps in isolated containers - consistent environments from dev to production" # 10-200 chars
template: "tool"                                  # Required: tool/language/framework/service/concept/life/aha/collection
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
| `aha` | Free-form content (humor, satire) | None (completely free) |
| `collection` | Curated content indexes, topic hubs | None (completely free) |
| `people` | Personal profiles, collaboration guides | None (all sections optional) |

### Adding a New Template

To add a new template type:

1. **Create template file**: `src/templates/{template-name}.md`
   - Must have frontmatter with `description` field
   - Define required sections with `## Section Name`
   - Mark optional sections with `## Section Name [optional]`
   - No sections = free-form (like `aha`, `collection`)

2. **Update type definitions**: `scripts/validate/types.ts`
   - Add to `TemplateType` union type
   - Add to `VALID_TEMPLATES` array

3. **Update documentation**:
   - `CLAUDE.md` - Add row to Available Templates table
   - `CONTRIBUTING.md` - Add to Types of Contributions section
   - `CONTRIBUTING.zh.md` - Add to 贡献类型 section

### Writing Guidelines

1. **Plain language** - Clear, concise, and easy to understand; avoid jargon
2. **Accuracy** - Verify versions, APIs, and commands from official sources
3. **Value-first** - Focus on core concepts, practical skills, and decision-making

### Description Guidelines

Write feature-oriented descriptions highlighting core capability and value:

**Formula**: `[Core capability] - [Use case/value]`

| Template | Focus | Example |
|----------|-------|---------|
| `tool` | What it does | "Package and run apps in isolated containers - consistent environments" |
| `language` | Core strengths | "Simple, fast, concurrent - build reliable cloud services" |
| `framework` | Problem solved | "Build interactive UIs with components - declarative, efficient" |
| `service` | Scope & scale | "Cloud platform - compute, storage, databases, 200+ services" |

**Avoid**: "Get started with X in 5 minutes" (too generic, poor SEO)

### ⚠️ MANDATORY: Technical Content Accuracy

**When writing or updating tech category quickstart content, you MUST search official documentation online to ensure accuracy.** This is a mandatory requirement and cannot be skipped.

Applies to templates: `tool`, `language`, `framework`, `service`, `concept`

Requirements:
1. **Version numbers** - Must query official site for latest stable version; never use memorized outdated versions
2. **Install commands** - Must copy from official docs; package manager commands may change
3. **API/Config** - Must verify current APIs, config options, and parameter names
4. **URLs** - Must verify official links are accessible and point to correct pages
5. **Best practices** - Reference official recommended practices, not outdated community conventions

Source priority:
1. Official documentation (e.g., docs.docker.com, react.dev)
2. Official GitHub repository
3. Official blog/announcements

**Prohibited:**
- ❌ Writing version numbers, commands, or APIs from memory alone
- ❌ Using unverified third-party tutorial content
- ❌ Skipping online verification before generating content

## People Profiles

People profiles are personal "instruction manuals" for collaboration. They use a different frontmatter schema.

### People Frontmatter
```yaml
---
owner_id: 583231                                  # GitHub User ID (required in default.md only)
display_name: "The Octocat"                       # Display name (required)
tagline: "GitHub's official mascot"              # 10-160 chars (optional)
---
```

### People Profile Rules
- Directory must start with `@` (e.g., `@octocat`)
- `owner_id` is required in `default.md` only
- Variant files (e.g., `zh.md`) must NOT contain `owner_id`
- One GitHub User ID can only have one profile (anti-hoarding)
- Only the profile owner can modify their profile

### People Username Rules
- Must start with `@`
- Only: letters, numbers, hyphens, underscores
- Length: 1-39 characters (excluding `@`)
- Reserved: `admin`, `api`, `help`, `support`, `settings`, etc.

## Validation

The `pnpm validate` command checks:
1. **id-naming** - ID length, characters, reserved words
2. **id-conflicts** - Duplicate IDs across categories
3. **frontmatter** - Required fields (title, description, template), description length
4. **assets** - File naming conventions
5. **structure** - Required sections based on template type
6. **people-naming** - People profile username format
7. **people-frontmatter** - owner_id, display_name requirements
8. **people-uniqueness** - One profile per GitHub User ID

## GitHub API Integration

Contributors are fetched via GitHub REST API:
- Configured in `scripts/contributors/github-api.ts`
- Set `GITHUB_TOKEN` env var for higher rate limits (60 → 5000 req/hour)
- Cache stored in `scripts/contributors/cache.json`
