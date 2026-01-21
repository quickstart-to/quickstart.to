import { readdirSync, readFileSync, statSync } from 'fs';
import { join, basename } from 'path';
import type { ValidationError } from './types.js';

const MIN_TAGLINE_LENGTH = 10;
const MAX_TAGLINE_LENGTH = 160;

// Reserved usernames that cannot be used
const RESERVED_USERNAMES = [
  'admin',
  'api',
  'help',
  'support',
  'settings',
  'about',
  'login',
  'logout',
  'signup',
  'register',
  'profile',
  'user',
  'users',
  'account',
  'dashboard',
  'static',
  'assets',
  'public',
];

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
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Handle numbers
    if (/^\d+$/.test(value)) {
      frontmatter[key] = parseInt(value, 10);
    } else {
      frontmatter[key] = value;
    }
  }

  return frontmatter;
}

function validateUsername(username: string): string | null {
  // Must start with @
  if (!username.startsWith('@')) {
    return 'Username must start with @';
  }

  const name = username.slice(1);

  // Check length (1-39 characters without @)
  if (name.length < 1) {
    return 'Username cannot be empty';
  }
  if (name.length > 39) {
    return 'Username too long (max 39 characters)';
  }

  // Only allow letters, numbers, hyphens, underscores
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    return 'Username can only contain letters, numbers, hyphens, and underscores';
  }

  // Check reserved usernames
  if (RESERVED_USERNAMES.includes(name.toLowerCase())) {
    return `Username "${name}" is reserved`;
  }

  return null;
}

export function validatePeople(contentDir: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const peoplePath = join(contentDir, 'people');

  try {
    const entries = readdirSync(peoplePath);

    // Track owner_ids for uniqueness check
    const ownerIdMap = new Map<number, string>();

    for (const entry of entries) {
      if (entry.startsWith('_') || entry.startsWith('.')) continue;

      const entryPath = join(peoplePath, entry);
      const stat = statSync(entryPath);

      if (!stat.isDirectory()) continue;

      // Rule: people-naming - Directory must start with @
      const usernameError = validateUsername(entry);
      if (usernameError) {
        errors.push({
          file: entryPath,
          rule: 'people-naming',
          message: usernameError,
          suggestion: 'Directory name should be like @username',
        });
        continue;
      }

      const files = readdirSync(entryPath).filter(
        (f) => f.endsWith('.md') && !f.startsWith('_')
      );

      // Rule: people-structure - Must have default.md
      if (!files.includes('default.md')) {
        errors.push({
          file: entryPath,
          rule: 'people-structure',
          message: 'Missing required default.md file',
          suggestion: 'Every people profile must have a default.md file',
        });
        continue;
      }

      // Validate default.md first
      const defaultPath = join(entryPath, 'default.md');
      const defaultContent = readFileSync(defaultPath, 'utf-8');
      const defaultFrontmatter = parseFrontmatter(defaultContent);

      if (!defaultFrontmatter) {
        errors.push({
          file: defaultPath,
          rule: 'people-frontmatter',
          message: 'Missing or invalid frontmatter',
          suggestion: 'Add frontmatter with --- delimiters at the top of the file',
        });
        continue;
      }

      // Rule: people-frontmatter - default.md must have owner_id
      if (typeof defaultFrontmatter.owner_id !== 'number') {
        errors.push({
          file: defaultPath,
          rule: 'people-frontmatter',
          message: 'Missing required field: owner_id (GitHub User ID)',
          suggestion: 'Add owner_id field with your GitHub User ID',
        });
      } else {
        // Rule: people-uniqueness - owner_id must be globally unique
        const existingPath = ownerIdMap.get(defaultFrontmatter.owner_id);
        if (existingPath) {
          errors.push({
            file: defaultPath,
            rule: 'people-uniqueness',
            message: `Duplicate owner_id: ${defaultFrontmatter.owner_id} (already used in ${existingPath})`,
            suggestion: 'Each GitHub user can only have one profile',
          });
        } else {
          ownerIdMap.set(defaultFrontmatter.owner_id, entry);
        }
      }

      // Rule: people-frontmatter - default.md must have display_name
      if (!defaultFrontmatter.display_name) {
        errors.push({
          file: defaultPath,
          rule: 'people-frontmatter',
          message: 'Missing required field: display_name',
          suggestion: 'Add a display_name field to the frontmatter',
        });
      }

      // Rule: people-frontmatter - tagline length validation (optional field)
      if (defaultFrontmatter.tagline) {
        const taglineLength = defaultFrontmatter.tagline.length;
        if (taglineLength < MIN_TAGLINE_LENGTH) {
          errors.push({
            file: defaultPath,
            rule: 'people-frontmatter',
            message: `Tagline too short (${taglineLength} chars, min ${MIN_TAGLINE_LENGTH})`,
            suggestion: 'Write a more descriptive tagline',
          });
        } else if (taglineLength > MAX_TAGLINE_LENGTH) {
          errors.push({
            file: defaultPath,
            rule: 'people-frontmatter',
            message: `Tagline too long (${taglineLength} chars, max ${MAX_TAGLINE_LENGTH})`,
            suggestion: 'Shorten the tagline',
          });
        }
      }

      // Validate variant files (non-default.md)
      for (const file of files) {
        if (file === 'default.md') continue;

        const filePath = join(entryPath, file);
        const content = readFileSync(filePath, 'utf-8');
        const frontmatter = parseFrontmatter(content);

        if (!frontmatter) {
          errors.push({
            file: filePath,
            rule: 'people-frontmatter',
            message: 'Missing or invalid frontmatter',
            suggestion: 'Add frontmatter with --- delimiters at the top of the file',
          });
          continue;
        }

        // Rule: people-variant-no-id - Variant files must NOT have owner_id
        if (frontmatter.owner_id !== undefined) {
          errors.push({
            file: filePath,
            rule: 'people-variant-no-id',
            message: 'Variant files must not contain owner_id',
            suggestion: 'Remove owner_id from variant files; it should only be in default.md',
          });
        }

        // Rule: people-frontmatter - variant files must have display_name
        if (!frontmatter.display_name) {
          errors.push({
            file: filePath,
            rule: 'people-frontmatter',
            message: 'Missing required field: display_name',
            suggestion: 'Add a display_name field to the frontmatter',
          });
        }

        // Rule: people-frontmatter - tagline length validation (optional field)
        if (frontmatter.tagline) {
          const taglineLength = frontmatter.tagline.length;
          if (taglineLength < MIN_TAGLINE_LENGTH) {
            errors.push({
              file: filePath,
              rule: 'people-frontmatter',
              message: `Tagline too short (${taglineLength} chars, min ${MIN_TAGLINE_LENGTH})`,
              suggestion: 'Write a more descriptive tagline',
            });
          } else if (taglineLength > MAX_TAGLINE_LENGTH) {
            errors.push({
              file: filePath,
              rule: 'people-frontmatter',
              message: `Tagline too long (${taglineLength} chars, max ${MAX_TAGLINE_LENGTH})`,
              suggestion: 'Shorten the tagline',
            });
          }
        }
      }
    }
  } catch {
    // people directory doesn't exist, skip
  }

  return errors;
}
