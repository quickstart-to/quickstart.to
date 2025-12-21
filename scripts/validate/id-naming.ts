import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import type { ValidationError } from './types.js';

const RESERVED_WORDS = ['admin', 'api', 'assets', 'static', 'index', '404', '500', 'contributors'];
const INVALID_CHARS = /[_\/\s\?#&=\.]/;
const MAX_LENGTH = 100;

export function validateIdNaming(contentDir: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const categories = ['tech', 'life'];

  for (const category of categories) {
    const categoryPath = join(contentDir, category);

    try {
      const entries = readdirSync(categoryPath);

      for (const entry of entries) {
        if (entry.startsWith('_')) continue; // Skip templates

        const entryPath = join(categoryPath, entry);
        const stat = statSync(entryPath);

        if (!stat.isDirectory()) continue;

        const id = entry;

        // Check length
        if (id.length > MAX_LENGTH) {
          errors.push({
            file: entryPath,
            rule: 'id-naming',
            message: `ID "${id}" exceeds maximum length of ${MAX_LENGTH} characters`,
            suggestion: 'Use a shorter, more concise ID',
          });
        }

        // Check reserved words
        if (RESERVED_WORDS.includes(id.toLowerCase())) {
          errors.push({
            file: entryPath,
            rule: 'id-naming',
            message: `ID "${id}" is a reserved word`,
            suggestion: `Choose a different ID. Reserved: ${RESERVED_WORDS.join(', ')}`,
          });
        }

        // Check invalid characters
        if (INVALID_CHARS.test(id)) {
          const invalidChars = id.match(INVALID_CHARS);
          errors.push({
            file: entryPath,
            rule: 'id-naming',
            message: `ID "${id}" contains invalid characters: ${invalidChars?.join(', ')}`,
            suggestion: 'Use lowercase letters, numbers, and hyphens only',
          });
        }
      }
    } catch {
      // Category directory doesn't exist, skip
    }
  }

  return errors;
}
