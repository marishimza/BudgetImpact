# AusBudget2026

A self-improving, AI-maintained journalistic website about the 2026 Australian Federal Budget. The site is updated automatically every 6 hours by two Claude AI agents and deployed via GitHub Pages.

## How It Works

Two autonomous agents maintain this website:

1. **Reviewer Agent** (00:00, 06:00, 12:00, 18:00 AEST) — Scrapes budget news, detects conflicts between sources, and writes improvement suggestions to `content/suggestions.json`.

2. **Builder Agent** (02:00, 08:00, 14:00, 20:00 AEST) — Reads pending suggestions, implements them (updates JSON data + HTML pages), self-validates before committing, then tags a version snapshot.

Changes deploy automatically via GitHub Actions. All versions are accessible through git history and the [Archive](/archive/) page.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Dashboard with latest news, key changes, and navigation |
| Property Tax | `/pages/property-tax/` | CGT and negative gearing changes for property |
| ASX & Shares | `/pages/stock-tax/` | CGT changes for shares and pre-1985 grandfathering |
| Calculators | `/pages/tools/` | Interactive CGT and negative gearing calculators |
| Debates | `/pages/debate/` | Both sides of contested budget claims |
| Fact Checks | `/pages/fact-checks/` | Budget claims verified against official sources |
| News Digest | `/pages/news/` | Aggregated budget news with source links |
| Timeline | `/pages/timeline/` | Key implementation dates and milestones |
| FAQs | `/pages/faqs/` | Common budget questions answered |
| Archive | `/archive/` | Full version history of all AI-generated changes |

## Data Files

All page content is stored as JSON in `content/` and loaded client-side:

| File | Purpose |
|------|---------|
| `budget-updates.json` | News digest items |
| `tax-rules.json` | Tax rule definitions (old vs new) |
| `timeline.json` | Key dates and milestones |
| `faqs.json` | Q&A content |
| `debates.json` | Debate topics with both sides |
| `fact-checks.json` | Claims and verification status |
| `calculators.json` | Calculator parameters |
| `suggestions.json` | Pending and processed agent suggestions |
| `schemas/` | JSON schema definitions for validation |

## Contributing

**Found an error?** Open a GitHub Issue labeled `suggestion`. The Reviewer Agent processes new issues at each run and converts them into improvement tasks for the Builder Agent.

**Not financial advice.** Always consult a registered accountant for advice specific to your situation.

## Tech Stack

- Static HTML + [Tailwind CSS](https://tailwindcss.com/) (CDN, no build step)
- GitHub Pages (auto-deploy on push to main)
- Claude AI agents (Anthropic API) for content generation and review
- Git for versioning (snapshot tags: `snapshot-YYYYMMDD-HHMM`)

## Version History

Each Builder Agent run is tagged in git as `snapshot-YYYYMMDD-HHMM`. Browse all snapshots on the [Archive page](/archive/) or via git tags:

```bash
git tag -l "snapshot-*"
git show snapshot-20260517-1400
```
