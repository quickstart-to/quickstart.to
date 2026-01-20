# Quickstart.to Project Context

## Project Overview

`quickstart.to` is an open-source, community-driven knowledge base providing concise, "no-fluff" quickstart guides for various technologies and life skills. It is built using the **Astro** static site generator and allows for multilingual content.

## Building and Running

The project uses **pnpm** for package management.

### Key Commands

-   **Install Dependencies:**
    ```bash
    pnpm install
    ```
-   **Start Development Server:**
    ```bash
    pnpm dev
    ```
-   **Build for Production:**
    ```bash
    pnpm build
    ```
-   **Preview Production Build:**
    ```bash
    pnpm preview
    ```
-   **Create New Quickstart:**
    ```bash
    pnpm new
    ```
    *Interactive CLI to guide you through creating a new content entry.*
-   **Validate Content:**
    ```bash
    pnpm validate
    ```
    *Runs validation checks on content files (structure, frontmatter, etc.).*

## Project Structure

-   **`src/content/`**: Contains the actual quickstart guides, categorized into `tech/` and `life/`.
    -   Each guide is a directory (e.g., `src/content/tech/docker/`) containing Markdown files for different languages (e.g., `en.md`, `zh.md`) and an `assets/` subdirectory.
-   **`src/templates/`**: Markdown templates (`tool.md`, `language.md`, etc.) used when creating new guides.
-   **`src/components/`**: Astro UI components.
-   **`scripts/`**: TypeScript scripts for the CLI (`new-quickstart.ts`) and validation logic.
-   **`astro.config.mjs`**: Astro configuration, including i18n and sitemap settings.

## Development Conventions

### Content Creation

1.  **Templates**: Content must follow one of the defined templates:
    -   `tool` (CLI tools)
    -   `language` (Programming languages)
    -   `framework` (Libraries/Frameworks)
    -   `service` (Cloud platforms)
    -   `concept` (Protocols/Specs)
    -   `life` (Life skills)
    -   `aha` (Humor/Free-form)
    -   `collection` (Topic hubs)
2.  **Frontmatter**:
    ```yaml
    ---
    title: "Your Title"
    description: "Feature-oriented: [what it does] - [value proposition]"
    template: "tool" # Must match one of the templates above
    tags: ["tag1", "tag2"]
    ---
    ```
3.  **Naming & Assets**:
    -   IDs must be lowercase, hyphenated (e.g., `react-hooks`).
    -   Images go in the `assets/` folder within the guide's directory.
    -   Image filenames must be lowercase with hyphens (e.g., `step-1.png`).

### Validation

Always run `pnpm validate` before submitting changes to ensure content adheres to the structure and naming conventions.

### Internationalization (i18n)

-   Supported locales: `en`, `zh`, `de`, `fr`, `es`.
-   Files are named with the locale code (e.g., `zh.md` for Chinese).
-   `en` is the default locale.
