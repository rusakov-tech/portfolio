---
name: portfolio-vanilla-js
description: Build and maintain a vanilla JavaScript portfolio site with Vite + Tailwind CSS 4. Use when creating new sections, components, utilities, or modifying the portfolio structure. Triggers on tasks involving new pages, UI components, animations, scroll behavior, or theming.
---

# Portfolio Vanilla JS

## Architecture

Atomic design without a framework — pure vanilla JS with ES modules.

```
app/
  atoms/        — small UI elements (single responsibility)
  molecules/    — composed behaviors (multiple DOM elements)
  pages/        — entry points (index.html + index.js)

src/
  styles/       — Tailwind CSS 4 config + component styles
  utils/        — pure helper functions
```

## Creating a New Component

### 1. Create the module

Place in `app/atoms/` (small, single element) or `app/molecules/` (composed):

```js
import { isPrefersReducedMotion } from '#/utils/is-prefers-reduced-motion';

export function initComponentName() {
    const element = document.getElementById('component-id');
    if (!element) return;

    const SOME_CONSTANT = 100;

    function handleEvent() {
        // logic
    }

    element.addEventListener('click', handleEvent, { passive: true });
}
```

### 2. Register in entry point

Add to `app/pages/index.js`:

```js
import { initComponentName } from '@/atoms/component-name';

// Inside init():
initComponentName();
```

### 3. Add HTML markup

Add semantic HTML in `app/pages/index.html` with proper `id` and `data-scroll` attributes if the section needs navigation.

### 4. Add styles

Add component styles in `src/styles/globals.css` under `@layer components`:

```css
@layer components {
    .component-name {
        @apply /* tailwind classes */;
    }
}
```

## Creating a Utility

Place in `src/utils/`:

```js
export function utilityName() {
    // Pure function, no side effects
}
```

Prefer `#/utils/name` import alias.

## Styling Guidelines

- Tailwind CSS 4 with `@theme`, `@layer`, `@utility` syntax
- Design tokens live in `@theme { }` block in `globals.css`
- Use `@apply` inside `@layer components` for component styles
- Custom utilities via `@utility name { }` for reusable patterns
- Responsive: mobile-first, breakpoints via `md:`, `sm:`, `xs:`
- Dark mode: `dark:` variant + `prefers-color-scheme` media queries

## Patterns to Follow

| Pattern | Implementation |
|---------|---------------|
| Passive listeners | `{ passive: true }` on scroll/mouse/touch |
| Reduced motion | Check `isPrefersReducedMotion()` before animations |
| Mobile detection | Check `isMobile()` before desktop-only features |
| Error guards | Early return + `console.error` for missing DOM elements |
| Theme toggle | `document.documentElement.classList.toggle('dark')` |
| Scroll behavior | `'auto'` when reduced motion, `'smooth'` otherwise |

## Build & Deploy

```bash
npm run dev       # Vite dev server
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
npm run format    # Prettier format
```

Deploy: push to `main` triggers GitHub Actions → GitHub Pages at `/portfolio`.
