import { join } from 'path';
import { validateIdNaming } from './id-naming.js';
import { validateIdConflicts } from './id-conflicts.js';
import { validateFrontmatter } from './frontmatter.js';
import { validateAssets } from './assets.js';
import type { ValidationError } from './types.js';

const CONTENT_DIR = join(process.cwd(), 'src', 'content');

function formatError(error: ValidationError): string {
  let output = `\n❌ ${error.rule}: ${error.message}`;
  output += `\n   File: ${error.file}`;
  if (error.suggestion) {
    output += `\n   💡 ${error.suggestion}`;
  }
  return output;
}

function main() {
  console.log('🔍 Validating content...\n');

  const errors: ValidationError[] = [
    ...validateIdNaming(CONTENT_DIR),
    ...validateIdConflicts(CONTENT_DIR),
    ...validateFrontmatter(CONTENT_DIR),
    ...validateAssets(CONTENT_DIR),
  ];

  if (errors.length === 0) {
    console.log('✅ All validation checks passed!\n');
    process.exit(0);
  }

  console.log(`Found ${errors.length} validation error(s):\n`);

  // Group errors by rule
  const byRule = new Map<string, ValidationError[]>();
  for (const error of errors) {
    const list = byRule.get(error.rule) ?? [];
    list.push(error);
    byRule.set(error.rule, list);
  }

  for (const [rule, ruleErrors] of byRule) {
    console.log(`\n📋 ${rule} (${ruleErrors.length} errors)`);
    console.log('─'.repeat(50));
    for (const error of ruleErrors) {
      console.log(formatError(error));
    }
  }

  console.log('\n');
  process.exit(1);
}

main();
