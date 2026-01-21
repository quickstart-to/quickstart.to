import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import type { ValidationError, TemplateSection, TemplateType } from './types.js';
import { VALID_TEMPLATES } from './types.js';

// Parse template file to extract sections
function parseTemplateSections(templatePath: string): TemplateSection[] {
  if (!existsSync(templatePath)) {
    return [];
  }

  const content = readFileSync(templatePath, 'utf-8');
  const sections: TemplateSection[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Match ## headings
    const match = line.match(/^## (.+)$/);
    if (match) {
      const rawName = match[1].trim();
      // Check if section is marked as optional with [可选] or [optional]
      const isOptional = /\[可选\]|\[optional\]/i.test(rawName);
      // Remove optional marker from name
      const name = rawName.replace(/\s*\[可选\]|\s*\[optional\]/gi, '').trim();
      sections.push({ name, optional: isOptional });
    }
  }

  return sections;
}

// Get template sections for a given template type
function getTemplateSections(templateType: TemplateType): TemplateSection[] {
  const templatePath = join(process.cwd(), 'src', 'templates', `${templateType}.md`);
  return parseTemplateSections(templatePath);
}

// Parse frontmatter to get template type
function parseFrontmatter(content: string): Record<string, string> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter: Record<string, string> = {};
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

        // Check if default.md exists
        const defaultPath = join(entryPath, 'default.md');
        if (!existsSync(defaultPath)) {
          errors.push({
            file: entryPath,
            rule: 'structure',
            message: 'Missing required default.md file',
            suggestion: 'Create a default.md file as the default variant',
          });
        }

        const files = readdirSync(entryPath).filter(
          (f) => f.endsWith('.md') && !f.startsWith('_')
        );

        for (const file of files) {
          const filePath = join(entryPath, file);
          const content = readFileSync(filePath, 'utf-8');
          const headings = extractHeadings(content);
          const frontmatter = parseFrontmatter(content);

          // Get template type from frontmatter
          const templateType = frontmatter?.template as TemplateType;

          // Skip structure validation if template is invalid or missing
          // (frontmatter validation will catch this)
          if (!templateType || !VALID_TEMPLATES.includes(templateType)) {
            continue;
          }

          // Get template sections
          const templateSections = getTemplateSections(templateType);

          // Skip structure validation for templates with no required sections (e.g., aha)
          if (templateSections.length === 0) {
            continue;
          }

          // Check for required sections
          const requiredSections = templateSections.filter(s => !s.optional);
          for (const section of requiredSections) {
            if (!headings.includes(section.name)) {
              errors.push({
                file: filePath,
                rule: 'structure',
                message: `Missing required section: ${section.name}`,
                suggestion: `Add a "## ${section.name}" section (template: ${templateType})`,
              });
            }
          }

          // Check section order (only for required sections that exist)
          const requiredSectionNames = requiredSections.map(s => s.name);
          const existingRequiredSections = requiredSectionNames.filter(name => headings.includes(name));
          const sectionIndices = existingRequiredSections.map(s => headings.indexOf(s));

          for (let i = 1; i < sectionIndices.length; i++) {
            if (sectionIndices[i] < sectionIndices[i - 1]) {
              errors.push({
                file: filePath,
                rule: 'structure',
                message: 'Sections are not in the correct order',
                suggestion: `Expected order: ${requiredSectionNames.join(' → ')}`,
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
