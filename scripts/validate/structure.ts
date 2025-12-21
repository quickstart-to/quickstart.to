import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import type { ValidationError } from './types.js';

const REQUIRED_SECTIONS = ['TL;DR', 'Quick Start', 'Cheatsheet', 'Gotchas', 'Next Steps'];

function extractHeadings(content: string): string[] {
  const headings: string[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Match ## headings (h2)
    const match = line.match(/^## (.+)$/);
    if (match) {
      headings.push(match[1].trim());
    }
  }

  return headings;
}

export function validateStructure(contentDir: string): ValidationError[] {
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
          const headings = extractHeadings(content);

          // Check for required sections
          for (const section of REQUIRED_SECTIONS) {
            if (!headings.includes(section)) {
              errors.push({
                file: filePath,
                rule: 'structure',
                message: `Missing required section: ${section}`,
                suggestion: `Add a "## ${section}" section to the content`,
              });
            }
          }

          // Check section order
          const sectionIndices = REQUIRED_SECTIONS.map((s) => headings.indexOf(s)).filter((i) => i !== -1);
          for (let i = 1; i < sectionIndices.length; i++) {
            if (sectionIndices[i] < sectionIndices[i - 1]) {
              errors.push({
                file: filePath,
                rule: 'structure',
                message: 'Sections are not in the correct order',
                suggestion: `Expected order: ${REQUIRED_SECTIONS.join(' → ')}`,
              });
              break;
            }
          }
        }
      }
    } catch {
      // Category directory doesn't exist, skip
    }
  }

  return errors;
}
