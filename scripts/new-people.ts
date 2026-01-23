import { mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { createInterface } from 'readline';

const CONTENT_DIR = join(process.cwd(), 'src', 'content');
const TEMPLATES_DIR = join(process.cwd(), 'src', 'templates');
const PEOPLE_DIR = join(CONTENT_DIR, 'people');

// Username validation constants
const USERNAME_MIN_LENGTH = 1;
const USERNAME_MAX_LENGTH = 39;
const USERNAME_PATTERN = /^[a-zA-Z0-9_-]+$/;

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

function validateUsername(username: string): string | null {
  // Must start with @
  if (!username.startsWith('@')) {
    return 'Username must start with @';
  }

  const name = username.slice(1);

  // Check length
  if (name.length < USERNAME_MIN_LENGTH) {
    return 'Username cannot be empty';
  }
  if (name.length > USERNAME_MAX_LENGTH) {
    return `Username too long (max ${USERNAME_MAX_LENGTH} characters)`;
  }

  // Only allow letters, numbers, hyphens, underscores
  if (!USERNAME_PATTERN.test(name)) {
    return 'Username can only contain letters, numbers, hyphens, and underscores';
  }

  // Check reserved usernames
  if (RESERVED_USERNAMES.includes(name.toLowerCase())) {
    return `Username "${name}" is reserved`;
  }

  return null;
}

function getTemplateContent(): string {
  const templatePath = join(TEMPLATES_DIR, 'people.md');

  if (existsSync(templatePath)) {
    let content = readFileSync(templatePath, 'utf-8');
    // Remove template's own frontmatter
    content = content.replace(/^---\n[\s\S]*?\n---\n?/, '');
    return content;
  }

  // Fallback content if template doesn't exist
  return `
## Who am I?

<!-- Brief intro: who you are, what you do, current status -->

## What can I help with?

<!-- Your skills, expertise, what help you can offer -->

## What am I working on?

<!-- Current projects, what you're building -->

## How to reach me?

<!-- Contact info: email, social media, messaging -->
`;
}

async function main() {
  console.log('\n📝 Create a new people profile\n');

  // Get username
  let username = '';
  let usernameError: string | null = 'empty';
  while (usernameError) {
    username = await prompt('Username (e.g., @octocat): ');
    usernameError = validateUsername(username);
    if (usernameError) {
      console.error(`❌ Error: ${usernameError}`);
    }
  }

  // Check if profile already exists
  const profilePath = join(PEOPLE_DIR, username);
  if (existsSync(profilePath)) {
    console.log(`\n⚠️  Profile "${username}" already exists`);
    const proceed = await prompt('Add a new variant? (y/n): ');
    if (proceed.toLowerCase() !== 'y') {
      console.log('Cancelled.');
      rl.close();
      return;
    }

    // Get variant name
    let variant = '';
    while (!variant) {
      variant = await prompt('Variant name (e.g., zh): ');
      if (!variant) {
        console.error('❌ Error: Variant name cannot be empty');
      } else if (variant === 'default') {
        console.error('❌ Error: Cannot use "default" as variant name');
        variant = '';
      }
    }

    // Check if variant file already exists
    const variantFile = join(profilePath, `${variant}.md`);
    if (existsSync(variantFile)) {
      console.log(`\n❌ File already exists: ${variantFile}`);
      rl.close();
      return;
    }

    // Get display name
    const displayName = await prompt('Display name: ');
    if (!displayName) {
      console.error('❌ Error: Display name is required');
      rl.close();
      return;
    }

    // Get tagline (optional)
    const tagline = await prompt('Tagline (10-160 chars, optional): ');
    if (tagline && (tagline.length < 10 || tagline.length > 160)) {
      console.error('❌ Error: Tagline must be 10-160 characters');
      rl.close();
      return;
    }

    // Generate content
    const templateContent = getTemplateContent();
    let frontmatter = `---
display_name: "${displayName}"`;
    if (tagline) {
      frontmatter += `\ntagline: "${tagline}"`;
    }
    frontmatter += '\n---\n';

    const content = frontmatter + templateContent;
    writeFileSync(variantFile, content);
    console.log(`\n✅ Created: ${variantFile}\n`);
  } else {
    // Create new profile
    mkdirSync(profilePath, { recursive: true });
    mkdirSync(join(profilePath, 'assets'), { recursive: true });
    console.log(`Created directory: ${profilePath}`);

    // Get owner_id (GitHub User ID)
    let ownerId = '';
    while (!ownerId) {
      ownerId = await prompt('GitHub User ID (owner_id): ');
      if (!ownerId || !/^\d+$/.test(ownerId)) {
        console.error('❌ Error: Please enter a valid numeric GitHub User ID');
        ownerId = '';
      }
    }

    // Get display name
    const displayName = await prompt('Display name: ');
    if (!displayName) {
      console.error('❌ Error: Display name is required');
      rl.close();
      return;
    }

    // Get tagline (optional)
    const tagline = await prompt('Tagline (10-160 chars, optional): ');
    if (tagline && (tagline.length < 10 || tagline.length > 160)) {
      console.error('❌ Error: Tagline must be 10-160 characters');
      rl.close();
      return;
    }

    // Generate content
    const templateContent = getTemplateContent();
    let frontmatter = `---
owner_id: ${ownerId}
display_name: "${displayName}"`;
    if (tagline) {
      frontmatter += `\ntagline: "${tagline}"`;
    }
    frontmatter += '\n---\n';

    const content = frontmatter + templateContent;
    const defaultFile = join(profilePath, 'default.md');

    writeFileSync(defaultFile, content);
    console.log(`\n✅ Created: ${defaultFile}`);
    console.log(`\nYour profile URL will be: https://quickstart.to/${username}\n`);
  }

  rl.close();
}

main().catch(console.error);
