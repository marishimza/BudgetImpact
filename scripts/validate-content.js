#!/usr/bin/env node
// Run before every builder commit: node scripts/validate-content.js

const fs = require('fs');
const path = require('path');

const CHECKS = [
  { file: 'content/budget-updates.json', key: 'items',  min: 23 },
  { file: 'content/fact-checks.json',    key: 'claims', min: 8  },
  { file: 'content/debates.json',        key: 'debates', min: 7 },
  { file: 'content/faqs.json',           key: 'faqs',   min: 9  },
  { file: 'content/timeline.json',       key: 'events', min: 3  },
];

let failed = false;

for (const { file, key, min } of CHECKS) {
  const filePath = path.join(__dirname, '..', file);
  let data;

  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`FAIL [${file}] Could not parse JSON: ${e.message}`);
    failed = true;
    continue;
  }

  if (Array.isArray(data)) {
    console.error(`FAIL [${file}] File is a bare array — must be a wrapper object with "${key}" key`);
    failed = true;
    continue;
  }

  if (!Array.isArray(data[key])) {
    console.error(`FAIL [${file}] Missing "${key}" array — found keys: ${Object.keys(data).join(', ')}`);
    failed = true;
    continue;
  }

  const count = data[key].length;
  if (count < min) {
    console.error(`FAIL [${file}] Only ${count} items in "${key}" — minimum is ${min}. Items have been lost!`);
    failed = true;
    continue;
  }

  console.log(`OK   [${file}] ${count} ${key}`);
}

if (failed) {
  console.error('\nValidation FAILED — do not commit. Restore missing items from git history.');
  process.exit(1);
} else {
  console.log('\nAll checks passed.');
}
