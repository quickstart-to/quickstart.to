import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import type { ValidationError } from './types.js';

const VALID_NAME_PATTERN = /^[a-z0-9-]+\.[a-z]+$/;
const VALID_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

export function validateAssets(contentDir: string): ValidationError[] {
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

        const assetsPath = join(entryPath, 'assets');

        try {
          const assets = readdirSync(assetsPath);

          for (const asset of assets) {
            const assetPath = join(assetsPath, asset);
            const assetStat = statSync(assetPath);

            if (assetStat.isDirectory()) {
              errors.push({
                file: assetPath,
                rule: 'assets',
                message: 'Subdirectories not allowed in assets folder',
                suggestion: 'Keep all assets in a flat structure',
              });
              continue;
            }

            // Check naming convention
            if (!VALID_NAME_PATTERN.test(asset)) {
              errors.push({
                file: assetPath,
                rule: 'assets',
                message: `Invalid asset name: ${asset}`,
                suggestion: 'Use lowercase letters, numbers, and hyphens only (e.g., screenshot-1.png)',
              });
            }

            // Check extension
            const ext = asset.slice(asset.lastIndexOf('.')).toLowerCase();
            if (!VALID_EXTENSIONS.includes(ext)) {
              errors.push({
                file: assetPath,
                rule: 'assets',
                message: `Invalid file extension: ${ext}`,
                suggestion: `Use one of: ${VALID_EXTENSIONS.join(', ')}`,
              });
            }
          }
        } catch {
          // Assets directory doesn't exist, that's fine
        }
      }
    } catch {
      // Category directory doesn't exist, skip
    }
  }

  return errors;
}
