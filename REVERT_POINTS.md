# Revert Points

This file tracks safe restore points for the Bayview Hub website.

---

## v1.0-pre-redesign (Feb 27, 2026)

**Description:** Backup before homepage full redesign. All pages functional, header navigation fix applied.

**What was working:**
- Homepage with 7 CTAs, proof bar, experiences grid, founding roles, newsletter
- All sub-pages: /experiences, /cellar-door, /edible-gardens, /backyard-small-second-home, /partners, /events, /visit, /invest
- All API routes: /api/newsletter, /api/partners, /api/eoi-edible-gardens, /api/feasibility
- External links to gallery.bayviewhub.me and thepigandwhistle.com.au
- Dark/light theme support
- Mobile responsive navigation

**Git Tag:** `v1.0-pre-redesign`
**Git Branch:** `backup/pre-redesign-feb27`

### Revert Commands

```bash
# Option 1: Switch to backup branch (keeps main unchanged)
git checkout backup/pre-redesign-feb27

# Option 2: Reset main branch to this point (destructive - loses newer commits)
git reset --hard v1.0-pre-redesign

# Option 3: Create new branch from backup point
git checkout -b restore-from-backup v1.0-pre-redesign
```

### After Revert
```bash
# Reinstall dependencies (if needed)
npm install

# Start dev server
npm run dev

# Or build and deploy
npm run build
git push --force  # Only if you used reset --hard
```

---

## How to Add New Revert Points

When creating a new backup before major changes:

```bash
# Create tagged backup
git add -A
git commit -m "checkpoint: description of current state"
git tag -a vX.X-description -m "Backup before [change description]"
git branch backup/description-date

# Document in this file
```

---

## Current Active Branch
Check with: `git branch --show-current`
