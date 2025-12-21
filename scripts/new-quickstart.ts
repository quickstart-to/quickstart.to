import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

const CONTENT_DIR = join(process.cwd(), 'src', 'content');
const CATEGORIES = ['tech', 'life'];
const LANGUAGES = ['en', 'zh', 'de', 'fr', 'es'];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function validateId(id: string): string | null {
  if (!id) return 'ID cannot be empty';
  if (id.length > 100) return 'ID too long (max 100 characters)';
  if (/[_\/\s\?#&=\.]/.test(id)) return 'ID contains invalid characters';
  if (['admin', 'api', 'assets', 'static', 'index', '404', '500', 'contributors'].includes(id.toLowerCase())) {
    return 'ID is a reserved word';
  }
  return null;
}

async function main() {
  console.log('\n📝 Create a new quickstart\n');

  // Get category
  console.log('Categories:', CATEGORIES.join(', '));
  let category = '';
  while (!CATEGORIES.includes(category)) {
    category = await prompt('Category: ');
    if (!CATEGORIES.includes(category)) {
      console.log(`Invalid category. Choose from: ${CATEGORIES.join(', ')}`);
    }
  }

  // Get ID
  let id = '';
  let idError: string | null = 'empty';
  while (idError) {
    id = await prompt('ID (e.g., docker, git, 如何做饭): ');
    idError = validateId(id);
    if (idError) {
      console.log(`Invalid ID: ${idError}`);
    }
  }

  // Check if ID already exists
  const idPath = join(CONTENT_DIR, category, id);
  if (existsSync(idPath)) {
    console.log(`\n⚠️  ID "${id}" already exists in category "${category}"`);
    const proceed = await prompt('Add a new language version? (y/n): ');
    if (proceed.toLowerCase() !== 'y') {
      console.log('Cancelled.');
      rl.close();
      return;
    }
  } else {
    mkdirSync(idPath, { recursive: true });
    mkdirSync(join(idPath, 'assets'), { recursive: true });
    console.log(`Created directory: ${idPath}`);
  }

  // Get language
  console.log('\nLanguages:', LANGUAGES.join(', '));
  let lang = '';
  while (!LANGUAGES.includes(lang)) {
    lang = await prompt('Language: ');
    if (!LANGUAGES.includes(lang)) {
      console.log(`Invalid language. Choose from: ${LANGUAGES.join(', ')}`);
    }
  }

  // Check if language file already exists
  const langFile = join(idPath, `${lang}.md`);
  if (existsSync(langFile)) {
    console.log(`\n❌ File already exists: ${langFile}`);
    rl.close();
    return;
  }

  // Get title
  const title = await prompt('Title: ');
  if (!title) {
    console.log('Title is required.');
    rl.close();
    return;
  }

  // Get description
  const description = await prompt('Description (10-200 chars): ');
  if (description.length < 10 || description.length > 200) {
    console.log('Description must be 10-200 characters.');
    rl.close();
    return;
  }

  // Get tags
  const tagsInput = await prompt('Tags (comma-separated, optional): ');
  const tags = tagsInput
    ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  // Generate content based on category
  const techContent = `---
title: "${title}"
description: "${description}"
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
---

## TL;DR

**What**: One-line definition of ${title}.

**Why**: What problem it solves.

## Quick Start

\`\`\`bash
# Install
brew install example

# Run
example init
\`\`\`

## Cheatsheet

| Command | Description |
|---------|-------------|
| \`example start\` | Start service |
| \`example stop\` | Stop service |
| \`example status\` | Check status |

## Gotchas

### Common Issue

How to fix it.

## Next Steps

- [Official Docs](https://example.com/docs)
`;

  const lifeContent = `---
title: "${title}"
description: "${description}"
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
---

## TL;DR

**What**: One-line definition of ${title}.

**Why**: Why it matters.

## Quick Start

**Prepare**:
- Item 1
- Item 2

**Steps**:
1. First step
2. Second step
3. Third step

## Cheatsheet

- **Tip 1**: Description
- **Tip 2**: Description
- **Tip 3**: Description

## Gotchas

### Common Mistake

How to avoid or fix it.

## Next Steps

- [Learn More](https://example.com)
`;

  const content = category === 'tech' ? techContent : lifeContent;

  writeFileSync(langFile, content);
  console.log(`\n✅ Created: ${langFile}\n`);

  rl.close();
}

main().catch(console.error);
