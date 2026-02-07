# 🎯 Premium CSS Classes & Effects Reference

Quick reference for developers/designers working with the premium enhancements.

---

## 🎨 Utility Classes Available

### Elevation Levels
```css
.premium-elevation-1  /* Light shadow: 0 2px 8px */
.premium-elevation-2  /* Medium shadow: 0 4px 16px */
.premium-elevation-3  /* Heavy shadow: 0 8px 32px */
```

**Usage:**
```html
<div class="premium-elevation-2">
  Content with medium elevation
</div>
```

---

### Glass Effects
```css
.premium-glass-effect
/* Creates frosted glass appearance:
   - Semi-transparent background
   - 20px backdrop blur
   - Subtle border
*/
```

**Usage:**
```html
<div class="premium-glass-effect">
  Glass morphism container
</div>
```

---

### Gradient Backgrounds
```css
.premium-gradient-bg
/* Subtle gradient from background to foreground colors */
```

**Usage:**
```html
<section class="premium-gradient-bg">
  Section with gradient
</section>
```

---

### Animation Classes
```css
.animate-on-scroll
/* Automatically fades in when element enters viewport
   Applied via JavaScript IntersectionObserver
*/
```

**Usage:**
```html
<div class="card animate-on-scroll">
  Will fade in on scroll
</div>
```

---

## ✨ Automatic Enhancements

These effects are automatically applied to existing Dawn elements:

### Cards
**Selector:** `.card`, `.product-card-wrapper`, `.card-wrapper`

**Effects:**
- Rounded corners (respects theme settings)
- Soft shadows
- Hover lift (-6px translateY)
- Shadow intensifies on hover
- Image zoom inside (1.05x scale)
- Smooth transitions (0.3s)

**Desktop Only:**
- 3D tilt effect on hover

---

### Buttons
**Selector:** `.button`, `button`, `input[type="submit"]`

**Effects:**
- Enhanced padding and spacing
- Uppercase text with letter-spacing
- Hover lift (-2px translateY)
- Shadow increase on hover
- Shimmer overlay animation
- Smooth cubic-bezier transitions

---

### Header
**Selector:** `.header`

**Effects:**
- Backdrop blur (20px)
- Semi-transparent background (0.95 opacity)
- Dynamic shadow on scroll

**Scroll State:**
```css
.header.scrolled  /* Applied after 50px scroll */
```

---

### Navigation
**Selector:** `.header__menu-item`

**Effects:**
- Underline animation from left on hover
- Active state support

**Usage:**
```html
<li class="header__menu-item active">
  <a href="/page">Page</a>
</li>
```

---

### Form Inputs
**Selector:** `input`, `textarea`, `select`

**Effects:**
- Enhanced focus states
- Glow effect (3px shadow)
- Border color transition
- Subtle lift on focus (-1px)

---

### Product Info
**Selector:** `.product__info-wrapper`

**Effects:**
- Glass effect background
- Generous padding
- Rounded corners (16px)

---

### Badges
**Selector:** `.badge`

**Effects:**
- Enhanced rounded corners
- Better padding
- Shadow for depth
- Backdrop blur

---

### Cart Items
**Selector:** `.cart-item`

**Effects:**
- Rounded container
- Hover background change
- Smooth transitions

---

### Accordion
**Selector:** `.accordion summary`

**Effects:**
- Hover background
- Enhanced padding
- Smooth transitions

---

### Newsletter Form
**Selector:** `.newsletter-form`

**Effects:**
- Pill-shaped design
- Enhanced shadows
- Modern layout

---

## 🎬 Animations & Transitions

### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Applied to:** Elements with `.animate-on-scroll`
**Duration:** 0.8s
**Easing:** cubic-bezier(0.4, 0, 0.2, 1)

---

### Shimmer
```css
@keyframes shimmer {
  /* Sliding gradient effect for loading states */
}
```

**Applied to:** `.loading-skeleton`
**Duration:** 2s infinite

---

### Hover States

**Card Hover:**
```css
/* Transform: translateY(-6px) + shadow increase */
/* Image inside: scale(1.05) */
/* Duration: 0.3s */
```

**Button Hover:**
```css
/* Transform: translateY(-2px) */
/* Shadow: increases */
/* Shimmer overlay slides across */
/* Duration: 0.3s */
```

---

## 🎨 CSS Variables Used

All enhancements respect Dawn's CSS variables:

```css
/* Colors (from theme settings) */
--color-background
--color-foreground
--color-button
--color-button-text

/* Typography */
--font-body-family
--font-heading-family
--font-body-scale
--font-heading-scale

/* Spacing */
--spacing-sections-desktop
--spacing-sections-mobile
--page-width

/* Components */
--buttons-radius
--product-card-corner-radius
--badge-corner-radius
--inputs-radius
```

---

## 📱 Responsive Behavior

### Mobile (< 750px)
- Reduced animation intensity
- Smaller button padding
- Simpler hover effects (no 3D tilt)
- Optimized spacing
- Faster animation duration

### Tablet (750px - 989px)
- Standard animations
- Full hover effects
- Optimized layouts

### Desktop (≥ 990px)
- Full 3D tilt on cards
- Enhanced parallax hints
- Maximum hover effects
- All animations active

---

## ♿ Accessibility Features

### Focus Indicators
```css
*:focus-visible {
  outline: 3px solid rgba(var(--color-button), 0.5);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### Skip Link
```css
.skip-to-content-link:focus {
  /* Becomes visible on keyboard focus */
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are simplified/removed */
  /* Transitions still work but faster */
}
```

---

## 🎨 Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  /* Enhanced shadows for dark backgrounds */
  /* Adjusted opacities */
  /* Better contrast */
}
```

---

## 🔧 Customization Examples

### Change Hover Lift Amount
```css
/* Find in custom-premium-enhancements.css */
.card-wrapper:hover {
  transform: translateY(-6px); /* Change -6px to -10px for more lift */
}
```

### Adjust Shadow Intensity
```css
.card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  /* Increase 0.06 to 0.12 for darker shadow */
}
```

### Modify Animation Speed
```css
/* Global change - find all instances of: */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
/* Change 0.3s to 0.5s for slower animations */
```

### Change Button Shimmer Color
```css
.button::before {
  background: rgba(255, 255, 255, 0.1);
  /* Change rgba values for different shimmer color */
}
```

---

## 🎯 JavaScript API

### PremiumEnhancements Class

```javascript
// Main class (auto-initialized)
class PremiumEnhancements {
  init()                    // Initialize all features
  addScrollEffects()        // Header shadow on scroll
  enhanceCards()            // 3D tilt + lazy loading
  improveNavigation()       // Active states
  addLoadingStates()        // Button feedback
  initIntersectionObserver() // Scroll animations
}

// Static methods
PremiumEnhancements.initSmoothScroll() // Anchor link smoothness
```

---

## 📊 Performance Considerations

### GPU Acceleration
These properties trigger GPU acceleration:
- `transform` (all animations)
- `opacity` (fade effects)
- `filter` (backdrop-blur)

### Will-Change
Not used by default (can cause issues). Only add if specific elements need it:
```css
.specific-element {
  will-change: transform; /* Use sparingly */
}
```

### Intersection Observer
Used instead of scroll events for better performance:
```javascript
// Observes elements entering viewport
// Only animates when visible
// Unobserves after animation
```

---

## 🚀 Quick Customization Tips

### Make Everything Faster
```css
/* Search and replace in CSS file: */
0.3s → 0.2s
0.6s → 0.4s
0.8s → 0.5s
```

### Remove All Animations
```javascript
// In custom-premium-interactions.js
// Comment out in init():
// this.initIntersectionObserver();
```

### Disable Card Tilt
```javascript
// In custom-premium-interactions.js
// Comment out in init():
// this.enhanceCards();
```

### Use Different Shadow Color
```css
/* Change from black to blue shadow: */
box-shadow: 0 4px 16px rgba(0, 0, 255, 0.08);
```

---

## 📚 Related Documentation

- **Full Features:** `PREMIUM_ENHANCEMENTS_README.md`
- **Visual Changes:** `VISUAL_CHANGES_SUMMARY.md`
- **Getting Started:** `QUICK_START.md`
- **Git Workflow:** `DAWN_CUSTOMIZATION_SETUP_GUIDE.md`

---

**Last Updated:** February 7, 2026  
**Compatible with:** Dawn 15.4.1  
**Version:** 1.0
