import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const output = join(root, 'dist');
const excluded = new Set(['.git', 'dist', 'functions', 'node_modules', 'package.json', 'package-lock.json', 'scripts']);

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (!excluded.has(entry.name)) cpSync(join(root, entry.name), join(output, entry.name), { recursive: true });
}

console.log('Prepared prebuilt static files in dist/ for Cloudflare Pages.');
