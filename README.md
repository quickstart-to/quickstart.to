# quickstart.to

> The TL;DR of everything

[中文](./README.zh.md)

An open-source community-driven "no-fluff" knowledge base providing minimal viable guides for every technology and skill.

## What is quickstart.to?

quickstart.to is a collection of concise, actionable quickstart guides. Each guide is designed to get you up and running in 5 minutes or less, without the fluff.

- **No-fluff**: Just the essentials, no lengthy explanations
- **Community-driven**: Anyone can contribute
- **Variant support**: Multiple versions per topic (translations, advanced versions, etc.)
- **Open-source**: MIT licensed

## People Profiles

Create your personal "instruction manual" at `quickstart.to/@username`.

**Philosophy:**

A People Profile is not a resume or portfolio—it's a **collaboration guide**. We encourage profiles that:

- **Help others work with you** - What's the best way to reach you? What topics can you help with?
- **Stay actionable** - Skip the life story, focus on what matters for collaboration
- **Keep it fresh** - Update what you're working on, not a static bio
- **Be authentic** - Your working style, preferences, and quirks are valuable info

Think of it as the README for *you*.

**Features:**
- **Your own page**: `quickstart.to/@yourusername`
- **Ownership verified**: Linked to your GitHub account
- **Multi-language**: Support for variants (e.g., `/@username/zh`)

**Quick start:**
```bash
pnpm new:people
```

**Suggested sections:**
- Who am I? *(Brief intro, current focus)*
- What I'm good at *(Core skills and expertise)*
- What I can help with *(Open to collaboration on)*
- What I'm working on *(Current projects)*
- How I work *(Working style and preferences)*
- How to reach me *(Contact preferences)*

See [CONTRIBUTING.md](./CONTRIBUTING.md#2-people-profile) for details.

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm

### Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Create a New Quickstart

```bash
pnpm new
```

This interactive CLI will guide you through creating a new quickstart.

### Validate Content

```bash
pnpm validate
```

Runs all validation checks on content files.

## Project Structure

```
src/
├── content/
│   ├── tech/           # Technology guides
│   │   └── {id}/
│   │       ├── default.md  # Default version (required)
│   │       ├── zh.md       # Chinese variant (optional)
│   │       └── assets/     # Images and assets
│   ├── life/           # Life skill guides
│   └── people/         # People profiles
│       └── @{username}/
│           ├── default.md
│           └── zh.md
├── components/         # Astro components
├── layouts/            # Page layouts
├── pages/              # Route pages
└── utils/              # Utilities
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Types of Contributions

- **New quickstarts**: Add a new guide
- **People profiles**: Create your personal page at `/@username`
- **Variants**: Add translations or alternative versions
- **Improvements**: Fix typos, improve clarity

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Pagefind](https://pagefind.app/) - Static search
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting

## License

MIT
