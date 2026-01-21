import { mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { createInterface } from 'readline';

const CONTENT_DIR = join(process.cwd(), 'src', 'content');
const TEMPLATES_DIR = join(process.cwd(), 'src', 'templates');
const CATEGORIES = ['tech', 'life'];

// Get available templates from src/templates/
function getAvailableTemplates(): string[] {
  try {
    return readdirSync(TEMPLATES_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => basename(f, '.md'));
  } catch {
    return ['tool', 'language', 'framework', 'service', 'concept', 'life'];
  }
}

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

// Read template file and replace placeholders
function getTemplateContent(templateName: string, title: string, description: string, tags: string[]): string {
  const templatePath = join(TEMPLATES_DIR, `${templateName}.md`);

  if (existsSync(templatePath)) {
    let content = readFileSync(templatePath, 'utf-8');

    // Replace template frontmatter with actual values
    const frontmatter = `---
title: "${title}"
description: "${description}"
template: "${templateName}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---`;

    // Remove template's own frontmatter and prepend new one
    content = content.replace(/^---\n[\s\S]*?\n---\n?/, '');

    // Replace placeholders
    content = content.replace(/\{语言名\}|\{工具名\}|\{框架名\}|\{服务名\}|\{概念名\}|\{主题\}/g, title);
    content = content.replace(/\{lang\}/g, title.toLowerCase());
    content = content.replace(/\{tool\}/g, title.toLowerCase());

    return frontmatter + '\n\n' + content;
  }

  // Fallback content if template doesn't exist
  return `---
title: "${title}"
description: "${description}"
template: "${templateName}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---

## TL;DR

**One liner**: ${title} is...

**Core value**:
- Value 1
- Value 2

## Quick Start

### Installation

\`\`\`bash
# Install command
\`\`\`

### First example

\`\`\`
# Example code
\`\`\`

## Gotchas

### Common issues

Solutions...

## Next Steps

- [Official docs](https://...)
`;
}

async function main() {
  console.log('\n📝 Create a new quickstart\n');

  const TEMPLATES = getAvailableTemplates();

  // Get category
  console.log('Categories:', CATEGORIES.join(', '));
  let category = '';
  while (!CATEGORIES.includes(category)) {
    category = await prompt('Category: ');
    if (!CATEGORIES.includes(category)) {
      console.log(`Invalid category. Choose from: ${CATEGORIES.join(', ')}`);
    }
  }

  // Get template
  console.log('\nTemplates:', TEMPLATES.join(', '));
  let template = '';
  while (!TEMPLATES.includes(template)) {
    template = await prompt('Template: ');
    if (!TEMPLATES.includes(template)) {
      console.log(`Invalid template. Choose from: ${TEMPLATES.join(', ')}`);
    }
  }

  // Get ID
  let id = '';
  let idError: string | null = 'empty';
  while (idError) {
    id = await prompt('ID (e.g., docker, git): ');
    idError = validateId(id);
    if (idError) {
      console.log(`Invalid ID: ${idError}`);
    }
  }

  // Check if ID already exists
  const idPath = join(CONTENT_DIR, category, id);
  if (existsSync(idPath)) {
    console.log(`\n⚠️  ID "${id}" already exists in category "${category}"`);
    const proceed = await prompt('Add a new variant? (y/n): ');
    if (proceed.toLowerCase() !== 'y') {
      console.log('Cancelled.');
      rl.close();
      return;
    }

    // Get variant name
    let variant = '';
    while (!variant) {
      variant = await prompt('Variant name (e.g., zh, advanced): ');
      if (!variant) {
        console.log('Variant name cannot be empty');
      }
    }

    // Check if variant file already exists
    const variantFile = join(idPath, `${variant}.md`);
    if (existsSync(variantFile)) {
      console.log(`\n❌ File already exists: ${variantFile}`);
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

    // Generate content from template
    const content = getTemplateContent(template, title, description, tags);

    writeFileSync(variantFile, content);
    console.log(`\n✅ Created: ${variantFile}\n`);
  } else {
    mkdirSync(idPath, { recursive: true });
    mkdirSync(join(idPath, 'assets'), { recursive: true });
    console.log(`Created directory: ${idPath}`);

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

    // Generate content from template - always create default.md
    const content = getTemplateContent(template, title, description, tags);
    const defaultFile = join(idPath, 'default.md');

    writeFileSync(defaultFile, content);
    console.log(`\n✅ Created: ${defaultFile}\n`);
  }

  rl.close();
}

main().catch(console.error);
