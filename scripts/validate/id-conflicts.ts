import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import type { ValidationError } from './types.js';

export function validateIdConflicts(contentDir: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const categories = ['tech', 'life'];
  const idToCategory = new Map<string, { category: string; path: string }>();

  for (const category of categories) {
    const categoryPath = join(contentDir, category);

    try {
      const entries = readdirSync(categoryPath);

      for (const entry of entries) {
        if (entry.startsWith('_')) continue;

        const entryPath = join(categoryPath, entry);
        const stat = statSync(entryPath);

        if (!stat.isDirectory()) continue;

        const id = entry;

        // Check if ID already exists in another category
        const existing = idToCategory.get(id);
        if (existing) {
          errors.push({
            file: entryPath,
            rule: 'id-conflicts',
            message: `ID "${id}" already exists in category "${existing.category}"`,
            suggestion: `Each ID must be unique across all categories. Existing: ${existing.path}`,
          });
        } else {
          idToCategory.set(id, { category, path: entryPath });
        }

        // Check for duplicate lang files within the same ID
        const langFiles = readdirSync(entryPath).filter(
          (f) => f.endsWith('.md') && !f.startsWith('_')
        );

        const langCounts = new Map<string, number>();
        for (const file of langFiles) {
          const lang = file.replace('.md', '');
          langCounts.set(lang, (langCounts.get(lang) || 0) + 1);
        }

        for (const [lang, count] of langCounts) {
          if (count > 1) {
            errors.push({
              file: join(entryPath, `${lang}.md`),
              rule: 'id-conflicts',
              message: `Duplicate language file "${lang}.md" found`,
              suggestion: 'Each language can only have one file per ID',
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
