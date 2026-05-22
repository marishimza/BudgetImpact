# Builder Agent Instructions

This file is read by the Builder Agent at the start of every session. Follow all instructions here exactly.

## CRITICAL: Content File Modification Rules

Content files contain a wrapper object with a named array. You MUST preserve ALL existing items when adding new ones.

### File structure reference

| File | Wrapper key |
|------|-------------|
| `content/budget-updates.json` | `items` |
| `content/fact-checks.json` | `claims` |
| `content/debates.json` | `debates` |
| `content/faqs.json` | `faqs` |
| `content/timeline.json` | `events` |

### Required pattern for ALL content file writes

**Step 1 — Read the entire existing file first:**
```bash
cat content/fact-checks.json
```

**Step 2 — Append your new item to the existing array. Never replace the array.**

**Step 3 — Write back the complete file with ALL existing items preserved plus your addition.**

**Step 4 — Verify no items were lost:**
```bash
node scripts/validate-content.js
```
If validation fails, do NOT commit. Fix the file and re-validate.

### NEVER do this

```json
// Wrong — replaces entire file with one item
{
  "id": "fc-008",
  "claim": "..."
}
```

### ALWAYS do this

```json
// Correct — full wrapper with all existing items preserved
{
  "lastUpdated": "2026-05-21T00:00:00.000Z",
  "claims": [
    { "id": "fc-001", ... },
    { "id": "fc-002", ... },
    ...all existing items...,
    { "id": "fc-008", "claim": "..." }
  ]
}
```

## Minimum item counts

These counts must never decrease. If validation reports fewer items than these minimums, you have lost data — stop and restore from git history.

| File | Minimum items |
|------|--------------|
| `content/budget-updates.json` | 23 |
| `content/fact-checks.json` | 8 |
| `content/debates.json` | 7 |
| `content/faqs.json` | 9 |
| `content/timeline.json` | 3 |

## Pre-commit checklist

Before every `git commit`, run:
```bash
node scripts/validate-content.js
```

All checks must pass. Do not commit if any check fails.
