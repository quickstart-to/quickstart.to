# quickstart.to

> The TL;DR of everything

[中文](./README.zh.md)

An open-source community-driven "no-fluff" knowledge base providing minimal viable guides for every technology and skill.

## What is quickstart.to?

quickstart.to is a collection of concise, actionable quickstart guides. Each guide is designed to get you up and running in 5 minutes or less, without the fluff.

- **No-fluff**: Just the essentials, no lengthy explanations
- **Community-driven**: Anyone can contribute
- **Multilingual**: Available in multiple languages
- **Open-source**: MIT licensed

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
│   │       ├── en.md   # English version
│   │       ├── zh.md   # Chinese version
│   │       └── assets/ # Images and assets
│   └── life/           # Life skill guides
├── components/         # Astro components
├── layouts/            # Page layouts
├── pages/              # Route pages
└── i18n/               # Internationalization
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Types of Contributions

- **New quickstarts**: Add a new guide
- **Translations**: Translate existing guides
- **Improvements**: Fix typos, improve clarity

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Pagefind](https://pagefind.app/) - Static search
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting

## License

MIT
