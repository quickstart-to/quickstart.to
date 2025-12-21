import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import type { ValidationError } from './types.js';

const VALID_LANGS = ['en', 'zh', 'de', 'fr', 'es'];
const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 200;

function parseFrontmatter(content: string): Record<string, any> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter: Record<string, any> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Handle quoted strings
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

export function validateFrontmatter(contentDir: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const categories = ['tech', 'life'];

  for (const category of categories) {
    const categoryPath = join(contentDir, category);

    try {
      const entries = readdirSync(categoryPath);

      for (const entry of entries) {
        if (entry.startsWith('_')) continue;

        const entryPath = join(categoryPath, entry);
        const stat = statSync(entryPath);

        if (!stat.isDirectory()) continue;

        const files = readdirSync(entryPath).filter(
          (f) => f.endsWith('.md') && !f.startsWith('_')
        );

        for (const file of files) {
          const filePath = join(entryPath, file);
          const content = readFileSync(filePath, 'utf-8');
          const frontmatter = parseFrontmatter(content);

          if (!frontmatter) {
            errors.push({
              file: filePath,
              rule: 'frontmatter',
              message: 'Missing or invalid frontmatter',
              suggestion: 'Add frontmatter with --- delimiters at the top of the file',
            });
            continue;
          }

          // Check required fields
          if (!frontmatter.title) {
            errors.push({
              file: filePath,
              rule: 'frontmatter',
              message: 'Missing required field: title',
              suggestion: 'Add a title field to the frontmatter',
            });
          }

          if (!frontmatter.description) {
            errors.push({
              file: filePath,
              rule: 'frontmatter',
              message: 'Missing required field: description',
              suggestion: 'Add a description field to the frontmatter',
            });
          } else {
            const descLength = frontmatter.description.length;
            if (descLength < MIN_DESCRIPTION_LENGTH) {
              errors.push({
                file: filePath,
                rule: 'frontmatter',
                message: `Description too short (${descLength} chars, min ${MIN_DESCRIPTION_LENGTH})`,
                suggestion: 'Write a more descriptive summary',
              });
            } else if (descLength > MAX_DESCRIPTION_LENGTH) {
              errors.push({
                file: filePath,
                rule: 'frontmatter',
                message: `Description too long (${descLength} chars, max ${MAX_DESCRIPTION_LENGTH})`,
                suggestion: 'Shorten the description',
              });
            }
          }

          // Check language file name
          const lang = file.replace('.md', '');
          if (!VALID_LANGS.includes(lang)) {
            errors.push({
              file: filePath,
              rule: 'frontmatter',
              message: `Invalid language code: ${lang}`,
              suggestion: `Use one of: ${VALID_LANGS.join(', ')}`,
            });
          }
        }
      }
    } catch {
      // Category directory doesn't exist, skip
    }
  }

  return errors;
}
