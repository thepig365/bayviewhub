#!/usr/bin/env node
/**
 * Replaces {{LAST_UPDATED}} placeholder in static files with the value from lib/seo.ts.
 * Run before build (prebuild) so deployed llms.txt, llms-full.txt, docs show correct date.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Extract LAST_UPDATED from lib/seo.ts
const seoContent = fs.readFileSync(path.join(ROOT, 'lib/seo.ts'), 'utf8');
const match = seoContent.match(/LAST_UPDATED\s*=\s*['"]([^'"]+)['"]/);
const date = match ? match[1] : new Date().toISOString().split('T')[0];

const files = [
  'public/llms.txt',
  'public/llms-full.txt',
  'public/docs/ai-traffic-tracking.md',
  'public/docs/indexnow.md',
  'docs/ai-traffic-tracking.md',
  'docs/indexnow.md',
];

for (const relPath of files) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes('{{LAST_UPDATED}}')) {
    content = content.replace(/\{\{LAST_UPDATED\}\}/g, date);
    fs.writeFileSync(fullPath, content);
  }
}
