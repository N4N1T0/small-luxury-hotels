# Trae.ai Project Rules

These rules must be followed by the AI when working within the `trae.ai` context of this Astro project.

## Code Style

- **Indentation**: Use **2 spaces** for indentation (no tabs).
- **Naming Conventions**:
  - Variables and functions: `camelCase`
  - Components: `PascalCase`
  - Files and folders: `kebab-case`
- **Quotes**: Always use **single quotes** `'` for strings.
- **Semicolons**: **Omit semicolons** at the end of lines.
- **Line Length**: Maximum **100 characters** per line.
- **Comments**:
  - Use `//` for single-line comments
  - Use `/** */` for block comments
  - Comments should be clear and concise
- **Imports**:
  - Imports should be grouped by type (e.g., `import React from 'react'`)
  - Imports should be sorted alphabetically
- **Style**:
  - use sharp corners not rounded corners

## Languages and Frameworks

- **Primary language**: TypeScript
- **Frameworks**:
  - Astro (main framework)
  - Preact (for interactive components inside Astro islands)
- **Styling**:
  - Tailwind CSS (prefer utility classes over custom CSS)
- **Other**:
  - Use Astro server-side rendering (`.astro` files) unless stated otherwise
  - Client-side interactivity only when necessary (`client:only` or partial hydration strategies)

## API Restrictions

- **Do not use**:
  - External CMS APIs (unless explicitly requested)
  - External analytics libraries without approval (e.g., Google Analytics, Plausible)
- **Allowed APIs**:
  - Native Astro APIs
  - Browser native APIs (e.g., `fetch`, `localStorage`, `sessionStorage`)
- **Environment Variables**:
  - Use `import.meta.env` to securely access environment variables

## Additional Guidelines

- **Accessibility**:
  - Always use semantic HTML
  - Include ARIA attributes when necessary
- **Performance**:
  - Lazy-load images
  - Minimize JavaScript
- **SEO**:
  - Use proper `<title>`, `<meta>`, and heading hierarchy (`<h1>`-`<h6>`)

## Terminal

- Always use pnpm instead of npm or yarn

## Placeholders

- use placeholder images from <https://placehold.co/> example for 400x400 <https://placehold.co/400x400>
- use lorem ipsum placeholder text for the copy
