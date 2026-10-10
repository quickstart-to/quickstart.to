import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const topics = new URL('../topics/', import.meta.url);
for (const topic of readdirSync(topics, { withFileTypes: true }).filter(entry => entry.isDirectory())) {
  const assets = new URL(`${topic.name}/assets/`, topics);
  let entries;
  try { entries = readdirSync(assets); }
  catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  for (const file of entries.filter(name => name.endsWith('-drill.mjs')).sort()) {
    process.stdout.write(`Running ${topic.name}/${file}\n`);
    execFileSync(process.execPath, [fileURLToPath(new URL(file, assets))], { stdio: 'inherit' });
  }
}
