# Dawn 15.4.1 Customization Setup Guide
**Professional Shopify Theme Development Workflow**

---

## 📋 PART 1: GITHUB REPOSITORY SETUP

### Step 1.1: Create New Repository from Dawn Source
- [ ] Go to https://github.com/Shopify/dawn
- [ ] Click "Fork" or "Use this template"
- [ ] Name your repository (e.g., `yourstore-dawn-theme`)
- [ ] Make it private (recommended for client work)
- [ ] Clone to local machine:
  ```bash
  git clone https://github.com/YOUR-USERNAME/yourstore-dawn-theme.git
  cd yourstore-dawn-theme
  ```

### Step 1.2: Alternative - Initialize from Current Export
- [ ] Navigate to your current theme directory
- [ ] Initialize git repository:
  ```bash
  cd /Users/karinabravo/Downloads/theme_export__0hk2w1-gz-myshopify-com-dawn__07FEB2026-0307pm
  git init
  git checkout -b main
  ```
- [ ] Create repository on GitHub
- [ ] Link local to remote:
  ```bash
  git remote add origin https://github.com/YOUR-USERNAME/yourstore-dawn-theme.git
  ```

### Step 1.3: Verify Dawn Version
- [ ] Confirm version in `config/settings_schema.json`:
  ```json
  "theme_version": "15.4.1"
  ```

---

## 📋 PART 2: BRANCHING STRATEGY SETUP

### Step 2.1: Create Branch Structure
```bash
# Main branch - production ready code
git checkout -b main

# Development branch - staging/testing environment
git checkout -b dev

# Create feature branch template (example)
git checkout -b feature/example-feature
git checkout dev  # Return to dev
git branch -D feature/example-feature  # Delete example
```

### Step 2.2: Branch Protection Rules
Configure on GitHub (`Settings > Branches`):

**Main Branch:**
- [ ] Require pull request reviews (minimum 1)
- [ ] Require status checks to pass
- [ ] Require branches to be up to date
- [ ] Include administrators in restrictions

**Dev Branch:**
- [ ] Require pull request reviews (optional for solo)
- [ ] Allow force pushes (for rebasing)

### Step 2.3: Branching Workflow
```
main          [production] ← PR from dev
  └── dev     [staging]    ← PR from feature branches
       ├── feature/custom-header
       ├── feature/product-tabs
       └── bugfix/cart-issue
```

**Rules:**
- `main` = Connected to live Shopify store
- `dev` = Connected to development/staging store
- `feature/*` = Individual features/customizations
- `bugfix/*` = Bug fixes
- `hotfix/*` = Emergency production fixes

---

## 📋 PART 3: CUSTOM DIRECTORY STRUCTURE

### Step 3.1: Create Custom Directories
```bash
# From theme root
mkdir -p custom/sections
mkdir -p custom/snippets
mkdir -p custom/assets
mkdir -p custom/templates
mkdir -p custom/layout
mkdir -p docs
```

### Step 3.2: File Naming Convention
**Use prefix `custom-` for all custom files:**

```
custom/
├── sections/
│   ├── custom-hero-banner.liquid
│   ├── custom-testimonials.liquid
│   └── custom-product-tabs.liquid
├── snippets/
│   ├── custom-icon-trust.liquid
│   ├── custom-product-badge.liquid
│   └── custom-newsletter-form.liquid
├── assets/
│   ├── custom-styles.css
│   ├── custom-scripts.js
│   ├── custom-hero.jpg
│   └── custom-icons.svg
└── templates/
    ├── custom-page.landing.json
    └── custom-product.bundle.json
```

### Step 3.3: Create Documentation File
```bash
touch custom/README.md
```

**Template for `custom/README.md`:**
```markdown
# Custom Components Directory

## Purpose
This directory contains all store-specific customizations to maintain clean separation from Dawn core files.

## File Organization

### Sections (`custom/sections/`)
- Custom reusable sections for the theme editor
- Naming: `custom-{purpose}.liquid`

### Snippets (`custom/snippets/`)
- Reusable code snippets
- Naming: `custom-{component}.liquid`

### Assets (`custom/assets/`)
- Custom CSS, JS, images
- Naming: `custom-{name}.{ext}`

## Integration Points
Document how custom files integrate with Dawn core:
- Modified core files (avoid when possible)
- Template JSON references
- Asset dependencies

## Development Guidelines
1. Never edit Dawn core files directly
2. Use custom directory for all modifications
3. Comment code thoroughly
4. Test on dev store before merging to main
```

### Step 3.4: Create .gitignore
- [ ] Create `.gitignore` in theme root:
```
# Shopify CLI
.shopify/
*.log

# Development
node_modules/
.DS_Store
.vscode/
.idea/

# Environment
.env
.env.local

# Build artifacts
dist/
build/

# Theme editor backup files
*~
*.backup

# Ignore config files with store credentials (if using)
config.yml
```

### Step 3.5: Move Custom Files (If Any Exist)
- [ ] Identify any existing customizations in current export
- [ ] Move to appropriate `/custom` directory
- [ ] Update references in template JSON files
- [ ] Update asset references in Liquid files
- [ ] Test all pages to ensure nothing broke

---

## 📋 PART 4: DEVELOPMENT WORKFLOW

### Step 4.1: Install Shopify CLI
```bash
# Install via Homebrew (Mac)
brew tap shopify/shopify
brew install shopify-cli

# Or via npm
npm install -g @shopify/cli @shopify/theme
```

### Step 4.2: Connect to Shopify Stores
**Production Store (main branch):**
```bash
git checkout main
shopify theme dev --store=yourstore.myshopify.com
# Follow authentication prompts
```

**Development Store (dev branch):**
```bash
git checkout dev
shopify theme dev --store=yourstore-dev.myshopify.com
# Follow authentication prompts
```

### Step 4.3: Local Development Workflow

**Starting Work on New Feature:**
```bash
# 1. Update dev branch
git checkout dev
git pull origin dev

# 2. Create feature branch
git checkout -b feature/custom-product-gallery

# 3. Start local development
shopify theme dev

# 4. Open browser to preview URL (usually http://127.0.0.1:9292)
# Make changes to files - auto-syncs to dev store
```

**Making Changes:**
- [ ] Edit files locally in IDE
- [ ] Files automatically sync to Shopify via CLI
- [ ] Preview changes in browser
- [ ] Test across devices/browsers
- [ ] Check accessibility with browser tools

### Step 4.4: Commit and Push Workflow
```bash
# 1. Review changes
git status
git diff

# 2. Stage files
git add custom/sections/custom-product-gallery.liquid
git add custom/assets/custom-gallery.js

# 3. Commit with descriptive message
git commit -m "feat: add custom product image gallery with lightbox

- Created custom-product-gallery section
- Added custom JavaScript for lightbox
- Maintains accessibility standards
- Mobile responsive design"

# 4. Push to GitHub
git push origin feature/custom-product-gallery
```

### Step 4.5: Pull Request Process

**Creating PR:**
- [ ] Go to GitHub repository
- [ ] Click "Compare & pull request"
- [ ] Set base branch to `dev`
- [ ] Fill out PR template:
  ```markdown
  ## Description
  Brief description of changes
  
  ## Changes Made
  - List specific files/features modified
  - List new sections/snippets created
  
  ## Testing Checklist
  - [ ] Tested on desktop
  - [ ] Tested on mobile
  - [ ] Tested on tablet
  - [ ] Accessibility check (keyboard navigation)
  - [ ] Browser testing (Chrome, Safari, Firefox)
  - [ ] Page speed check (no significant degradation)
  
  ## Screenshots
  [Add before/after screenshots]
  
  ## Related Issues
  Closes #123
  ```

**Review and Merge:**
- [ ] Self-review code changes
- [ ] Request review from team member (if applicable)
- [ ] Address feedback
- [ ] Merge to `dev` branch
- [ ] Delete feature branch

### Step 4.6: Deploy to Staging (Dev Store)
```bash
# After merging to dev
git checkout dev
git pull origin dev

# Push to dev Shopify store
shopify theme push --store=yourstore-dev.myshopify.com
```

**Testing on Dev Store:**
- [ ] Complete checkout flow
- [ ] Test all modified pages
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Test with real products/collections

### Step 4.7: Deploy to Production
```bash
# 1. Create PR from dev to main
# (Follow same PR process as above)

# 2. After PR approval, merge dev → main on GitHub

# 3. Pull latest main locally
git checkout main
git pull origin main

# 4. Push to production store
shopify theme push --store=yourstore.myshopify.com --theme=THEME_ID

# Or publish as new version
shopify theme push --store=yourstore.myshopify.com --unpublished
```

### Step 4.8: Complete Workflow Diagram
```
┌─────────────────────────────────────────────────────┐
│ 1. CREATE FEATURE BRANCH                            │
│    git checkout -b feature/new-section              │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│ 2. DEVELOP LOCALLY                                  │
│    shopify theme dev                                │
│    Edit files → Auto-sync → Preview                │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│ 3. COMMIT & PUSH                                    │
│    git add . && git commit && git push              │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│ 4. CREATE PULL REQUEST                              │
│    feature/branch → dev                             │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│ 5. REVIEW & MERGE TO DEV                            │
│    Code review → Merge                              │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│ 6. DEPLOY TO DEV STORE                              │
│    shopify theme push (dev store)                   │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│ 7. TEST ON STAGING                                  │
│    Full QA testing on dev store                     │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│ 8. MERGE TO MAIN                                    │
│    dev → main via PR                                │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│ 9. DEPLOY TO PRODUCTION                             │
│    shopify theme push (live store)                  │
└─────────────────────────────────────────────────────┘
```

---

## 📋 PART 5: SAFE vs. AVOID EDITING GUIDE

### ✅ SAFE TO EDIT (Customization Encouraged)

**Templates (JSON files in `/templates/`):**
- ✅ All template JSON files - these define section layout
- ✅ Create alternate templates (e.g., `product.bundle.json`)
- **How:** Duplicate, rename with custom prefix, modify sections array

**Settings:**
- ✅ `config/settings_data.json` - theme settings values
- ✅ `config/settings_schema.json` - ADD new settings (append only)
- **Caution:** Don't remove Dawn's default settings

**Sections (when extending):**
- ✅ Create new custom sections in `/custom/sections/`
- ✅ Copy Dawn section → modify → save as `custom-{name}.liquid`
- **Example:** Copy `featured-collection.liquid` → `custom-featured-collection.liquid`

**Assets:**
- ✅ Add new CSS files (`custom-styles.css`)
- ✅ Add new JavaScript files (`custom-scripts.js`)
- ✅ Add new images/fonts
- **Integration:** Reference in `layout/theme.liquid` or section settings

**Locales:**
- ✅ `locales/en.default.json` - ADD custom translation keys
- ✅ Create custom locale files `locales/custom.en.json`
- **Caution:** Don't remove Dawn's default translations

**Snippets:**
- ✅ Create new custom snippets in `/custom/snippets/`
- ✅ Create specialized versions (e.g., `custom-card-product.liquid`)

---

### ⚠️ EDIT WITH CAUTION (Understand Impact First)

**Layout Files:**
- ⚠️ `layout/theme.liquid` - Main layout wrapper
  - **Safe:** Add custom CSS/JS references in `<head>`
  - **Safe:** Add analytics scripts before `</body>`
  - **Risky:** Modifying core structure/Dawn JS includes
  
- ⚠️ `layout/password.liquid` - Password page layout
  - **Safe:** Styling modifications
  - **Risky:** Removing security elements

**Core Sections (in `/sections/`):**
- ⚠️ `header.liquid`, `footer.liquid` - Navigation structure
  - **Better:** Duplicate → rename → customize → swap in templates
  - **Risky:** Direct modification (hard to merge updates)

- ⚠️ `main-product.liquid`, `main-collection.liquid` - Core page sections
  - **Better:** Create alternate versions with `custom-` prefix
  - **Risky:** Modifying data attributes (breaks Dawn JS)

- ⚠️ `cart-*.liquid` sections - Cart functionality
  - **Risky:** Breaking AJAX cart functionality
  - **Test:** Thoroughly test cart operations after changes

**Core Snippets:**
- ⚠️ `snippets/icon-*.liquid` - SVG icons
  - **Safe:** Add new custom icons
  - **Risky:** Modifying existing (may break throughout theme)

- ⚠️ `snippets/card-product.liquid` - Product card component
  - **Better:** Create `custom-card-product.liquid`
  - **Risky:** Breaking product grid layouts

**Assets:**
- ⚠️ `assets/base.css` - Dawn's core styles
  - **Better:** Add `custom-overrides.css` with higher specificity
  - **Risky:** Modifying directly (merging updates is difficult)
  - **Pattern:** 
    ```css
    /* custom-overrides.css */
    /* Override specific Dawn styles */
    .product-card { /* your changes */ }
    ```

- ⚠️ `assets/global.js`, `assets/product-form.js` - Dawn core JavaScript
  - **Better:** Create `custom-enhancements.js` that extends functionality
  - **Risky:** Modifying core functions

---

### 🚫 AVOID EDITING (High Risk)

**Dawn JavaScript Core:**
- 🚫 `assets/theme-editor.js` - Theme editor integration
- 🚫 `assets/customer.js` - Account functionality
- 🚫 `assets/cart-drawer.js` - Cart core functionality
- 🚫 `assets/predictive-search.js` - Search functionality
- **Why:** Deep integration with Shopify ecosystem
- **Alternative:** Use Shopify app or custom app blocks

**Shopify Required Files:**
- 🚫 `layout/*.liquid` deletion - Keep all layouts
- 🚫 `templates/*.json` deletion - Keep Dawn defaults
- 🚫 Removing required Liquid tags (`{{ content_for_header }}`)

**Critical Snippets:**
- 🚫 `snippets/cart-*.liquid` - Cart component logic
- 🚫 `snippets/quantity-*.liquid` - Quantity selectors
- 🚫 `snippets/price.liquid` - Price display logic
- **Why:** Complex logic with multiple dependencies
- **Alternative:** Wrap in custom snippets that add features

**Schema Deletions:**
- 🚫 Removing sections from `settings_schema.json`
- 🚫 Removing preset data from sections
- **Why:** May break theme editor for merchants

---

### 📝 EDITING DECISION TREE

```
Need to customize a Dawn component?
│
├─ Is it a template JSON?
│  └─ ✅ SAFE - Edit freely or create alternate
│
├─ Is it a section/snippet?
│  ├─ Need minor changes (CSS/text)?
│  │  └─ ⚠️ CAUTION - Consider duplicating first
│  └─ Need major changes (structure/logic)?
│     └─ ✅ BEST - Duplicate → rename to custom-* → modify
│
├─ Is it CSS?
│  └─ ✅ BEST - Create custom-overrides.css
│
├─ Is it JavaScript?
│  ├─ Adding new features?
│  │  └─ ✅ BEST - Create custom-scripts.js
│  └─ Modifying Dawn core JS?
│     └─ 🚫 AVOID - High risk, consider alternatives
│
└─ Is it layout/theme.liquid?
   ├─ Adding scripts/styles?
   │  └─ ✅ SAFE - Add in designated areas
   └─ Modifying structure?
      └─ 🚫 AVOID - High risk
```

---

### 🎯 BEST PRACTICES SUMMARY

1. **Create, Don't Modify**
   - New custom sections/snippets instead of editing Dawn files
   - Easier to maintain, update Dawn version, and debug

2. **Use Prefixes**
   - `custom-` prefix for all custom files
   - Immediately identifies customizations vs. Dawn core

3. **CSS Specificity**
   - Load custom CSS after Dawn's stylesheets
   - Use more specific selectors to override
   - Document what you're overriding and why

4. **JavaScript Extensions**
   - Create separate JS files that extend Dawn functionality
   - Use event listeners instead of modifying core functions
   - Example:
     ```javascript
     // custom-scripts.js
     document.addEventListener('DOMContentLoaded', () => {
       // Extend Dawn functionality here
     });
     ```

5. **Version Control**
   - Commit Dawn core separately from customizations
   - Use clear commit messages documenting what and why
   - Tag versions before major updates

6. **Testing Protocol**
   - Test every customization on dev store first
   - Test critical paths: add to cart, checkout, account pages
   - Use browser console to check for JavaScript errors
   - Run Lighthouse audit to maintain performance

7. **Documentation**
   - Comment WHY, not just WHAT
   - Document dependencies between custom files
   - Keep README updated with customization inventory

---

## 📋 PART 6: PERFORMANCE & ACCESSIBILITY CHECKLIST

### Performance Maintenance

**Before Every Deploy:**
- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Check total page weight (target: < 1MB initial load)
- [ ] Optimize images (WebP format, lazy loading)
- [ ] Minimize custom CSS/JS (remove unused code)
- [ ] Test on 3G connection (Chrome DevTools throttling)

**Asset Optimization:**
- [ ] Compress images before uploading
- [ ] Use SVG for icons when possible
- [ ] Lazy load images below the fold
- [ ] Defer non-critical JavaScript
- [ ] Inline critical CSS if needed

**Code Quality:**
- [ ] No console.log() in production code
- [ ] Remove commented-out code
- [ ] Use Liquid filters for performance (`| image_url: width: 800`)
- [ ] Avoid N+1 Liquid queries (use `assign` to cache)

### Accessibility Standards

**Every Custom Component:**
- [ ] Keyboard navigable (Tab, Enter, Space, Esc)
- [ ] ARIA labels on interactive elements
- [ ] Color contrast ratio 4.5:1 minimum (WCAG AA)
- [ ] Focus indicators visible and clear
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Semantic HTML (`<button>` for buttons, not `<div>`)
- [ ] Alt text on all images
- [ ] Form labels properly associated
- [ ] Skip navigation links if applicable
- [ ] No auto-playing media

**Testing Tools:**
- [ ] axe DevTools browser extension
- [ ] WAVE evaluation tool
- [ ] Keyboard-only navigation test
- [ ] Screen reader test (basic)

---

## 📋 PART 7: EMERGENCY PROCEDURES

### Rollback Process

**If something breaks in production:**

1. **Immediate Rollback via Shopify Admin:**
   ```
   Shopify Admin → Online Store → Themes → 
   Find previous version → Click Actions → Publish
   ```

2. **Git Rollback:**
   ```bash
   # Find last working commit
   git log --oneline
   
   # Create hotfix branch from last working commit
   git checkout -b hotfix/rollback-issue COMMIT_HASH
   
   # Push to production
   shopify theme push --store=yourstore.myshopify.com
   ```

3. **Report Issue:**
   - Document what broke
   - Note steps to reproduce
   - Create GitHub issue
   - Fix on dev branch first

### Backup Strategy

- [ ] Enable Shopify theme versioning (automatic)
- [ ] Weekly manual backup:
  ```bash
  shopify theme pull --store=yourstore.myshopify.com
  zip -r backup-$(date +%Y%m%d).zip .
  ```
- [ ] Keep 3 most recent backups locally
- [ ] Monthly archive to cloud storage

### Hotfix Workflow

```bash
# 1. Create hotfix from main
git checkout main
git checkout -b hotfix/critical-cart-bug

# 2. Fix issue
# ... make changes ...

# 3. Test locally
shopify theme dev

# 4. Deploy immediately
shopify theme push --store=yourstore.myshopify.com

# 5. Commit and merge back
git add .
git commit -m "hotfix: resolve cart quantity bug"
git push origin hotfix/critical-cart-bug

# 6. Create PR to main AND dev
# (Ensure fix is in both branches)
```

---

## 📋 PART 8: TOOLS & RESOURCES

### Essential Tools

**Development:**
- [ ] Shopify CLI (theme development)
- [ ] Git (version control)
- [ ] Code editor with Liquid support (VS Code + Shopify Liquid extension)
- [ ] Browser DevTools (Chrome/Firefox)

**Testing:**
- [ ] BrowserStack (cross-browser testing)
- [ ] Lighthouse (performance)
- [ ] axe DevTools (accessibility)
- [ ] Shopify Theme Check (linting)

**Monitoring:**
- [ ] Google Analytics 4
- [ ] Shopify Analytics
- [ ] Error tracking (e.g., Sentry)

### VS Code Extensions

Recommended extensions:
- Shopify Liquid (by Shopify)
- Shopify Liquid Snippets
- GitLens
- Prettier
- ESLint

### Documentation References

- [Dawn theme documentation](https://github.com/Shopify/dawn)
- [Shopify CLI documentation](https://shopify.dev/themes/tools/cli)
- [Liquid documentation](https://shopify.dev/api/liquid)
- [Theme architecture guide](https://shopify.dev/themes/architecture)

---

## 📋 PART 9: INITIAL SETUP CHECKLIST

### One-Time Setup Tasks

- [ ] Complete Part 1: GitHub repository created
- [ ] Complete Part 2: Branch strategy implemented
- [ ] Complete Part 3: Custom directory structure created
- [ ] Complete Part 4: Shopify CLI installed and configured
- [ ] Create development Shopify store (if needed)
- [ ] Connect main branch to production store
- [ ] Connect dev branch to development store
- [ ] Create `.gitignore` file
- [ ] Create `custom/README.md` documentation
- [ ] Set up GitHub branch protection rules
- [ ] Create PR template in `.github/pull_request_template.md`
- [ ] Create issue templates in `.github/ISSUE_TEMPLATE/`
- [ ] Install recommended VS Code extensions
- [ ] Test complete workflow with dummy feature
- [ ] Document store-specific information (theme ID, store URLs)
- [ ] Set up backup schedule
- [ ] Share workflow documentation with team

### First Feature Implementation

Practice the workflow:
- [ ] Create feature branch
- [ ] Build simple custom section
- [ ] Test locally
- [ ] Create PR to dev
- [ ] Merge and deploy to dev store
- [ ] Test on dev store
- [ ] Create PR to main
- [ ] Deploy to production

---

## 🎓 QUICK REFERENCE COMMANDS

```bash
# Start local development
shopify theme dev

# Pull current theme from Shopify
shopify theme pull --store=yourstore.myshopify.com

# Push theme to Shopify
shopify theme push --store=yourstore.myshopify.com

# Create new branch
git checkout -b feature/my-feature

# Save changes
git add .
git commit -m "feat: description"
git push origin feature/my-feature

# Switch branches
git checkout main
git checkout dev

# Update branch with latest
git pull origin dev

# View branch status
git status

# View commit history
git log --oneline

# View what changed
git diff
```

---

## 📞 SUPPORT & TROUBLESHOOTING

### Common Issues

**Issue: Changes not appearing**
- Check Shopify CLI is running
- Verify correct store connected
- Clear browser cache
- Check for JavaScript errors in console

**Issue: Merge conflicts**
- Use VS Code merge conflict resolver
- Test thoroughly after resolving
- Ask for help if unsure

**Issue: Theme editor broken**
- Check section schema validity
- Ensure all required fields present
- Review Shopify theme check output

**Issue: Performance degraded**
- Run Lighthouse audit
- Check asset sizes
- Review custom JavaScript for issues
- Ensure images optimized

---

## ✅ SUCCESS METRICS

Track these to ensure workflow is working:

- ✅ Zero direct edits to production theme (all via Git)
- ✅ All features tested on dev store before production
- ✅ Performance scores maintained above 90
- ✅ Accessibility scores maintained above 95
- ✅ Clean git history with descriptive commits
- ✅ Documentation kept up to date
- ✅ Team follows workflow consistently

---

**Document Version:** 1.0  
**Last Updated:** February 7, 2026  
**Theme Version:** Dawn 15.4.1  
**Maintenance:** Update this guide as workflow evolves
