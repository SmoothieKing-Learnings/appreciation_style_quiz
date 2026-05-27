# Appreciation Style Quiz Prototype

A modular, single-page React application for an "Appreciation Style Quiz" — a 5-question assessment that identifies which of the 5 appreciation styles (Words of Affirmation, Quality Time, Acts of Service, Tangible Gifts, Physical Touch) most resonates with the user, with strict review protocols for UI and WCAG compliance.

## Mission & Design Constraints
**Goal**: Build a fully client-side React app without a backend database.

### Strict Design & Styling Rules
Configured via Tailwind CSS with a warm palette constraint:
- **Background Color**: `#FFF9EF`
- **Primary Action Color**: `#930018` (Buttons, progress bars)
- **Default Text Color**: `#40000F`
- **WCAG Constraint**: Whenever text overlaps `#930018`, text must be `#FFF9EF` to pass contrast standards. Otherwise, default to `#40000F`.
- **Chart Colors**: Five distinct complementary colors (`#6A4C93`, `#2A9D8F`, `#E76F51`, `#E9C46A`, `#F4A261`) — one per style — defined in `src/data/stylesData.js` for easy editing.

### Deployment Context
- Configured specifically for **GitHub Pages** (URL: `https://daechan-ot.github.io/Appreciation_style_quiz/`).
- **Base Pathing**: Set in `vite.config.js` to ensure assets avoid 404 errors.
- **Routing**: Employs static React state-based rendering (`currentScreen`) to completely bypass `react-router-dom` 404 errors standard to static site refreshes.

## Tech Stack
- **React (Vite Base)**
- **Tailwind CSS** (for styling)
- **Recharts** (for the donut chart visualization)
- **html2canvas** (for capturing the results screen as an image)
- **lucide-react** (for simple UI icons)
- **@axe-core/react** (for dev-time accessibility auditing)
- **Vitest & React Testing Library** (Unit and component testing)

---

## Core Utilities ("Skills") Workflow

### Skill 1: Deployment & Hosting Config
State-based rendering handling navigation between Welcome, Quiz, and Result screens natively without an external DOM router.

### Skill 2: Data Processing (`calculateResults.js`)
A pure utility function that takes the user's answers array, tallies scores for the 5 styles, calculates the percentage, and returns an array of the top styles cleanly to handle exact numeric ties.

### Skill 3: Export & Share (`exportAndShare.js`)
Utility wrapper that bridges `html2canvas` to process a DOM ID into an image blob, attempting `navigator.share()` (Web Share API) natively with an automated fallback to gracefully download the `.png` if the browser does not support the Web Share standard.

### Skill 4: WCAG & Accessibility Engine (`a11yUtils.js`)
- **Announcer**: Verbally calls route/step changes to Screen Readers globally (`"Question 2 of 5: ..."`).
- **Keyboard Navigation**: Enforces explicit Tab formatting and `"Enter"` or `"Space"` firing on Answer buttons.
- **Auditor**: Development mode runs `@axe-core/react` instantly mapping structural violation logs.

### Skill 5: UI & Responsive Review Protocol (`LayoutWrapper.jsx`)
- Master Layout Wrapper enforcing mobile-first CSS architecture.
- Touch Target Sizes: Minimum `44x44px` enforced across all selectable objects (iOS/Android native standard).
- Desktop Constraint: Enforces a maximum width (`max-w-2xl`) preventing ugly horizontal stretch lines.

---

## Data Structure

**The 5 Appreciation Styles** are defined in `src/data/stylesData.js` and matched to `styleId`s on each option in `src/data/questionsData.js`.

Each style has:
- `id` — slug used in `styleId` mapping
- `name` / `subtitle` — display names
- `description` — single paragraph shown on the results screen
- `color` — chart and accent color

When updating content, keep these in sync:
- `STYLES` array in `src/data/stylesData.js` (one entry per style).
- `STYLE_COLORS` map in the same file (one color per style id).
- `styleId` on each option in `src/data/questionsData.js` must match an `id` in `STYLES`.
- If style ids change, update `src/skills/calculateResults.test.js` fixtures.

---

## Getting Started

1. **Install dependencies:** `npm install`
2. **Run Dev Server:** `npm run dev`
3. **Run Testing Suite:** `npm run test`
4. **Build Production Bundle:** `npm run build`

Deployment happens automatically via `.github/workflows/deploy.yml` on pushes to `main`.

---

## QA Checklist (before each release)

- [ ] `npm run test` passes.
- [ ] `npm run lint` clean.
- [ ] Manual run of the full quiz: every option selectable, Back works, Continue gates correctly on the last question.
- [ ] Donut chart renders with the correct colors and tooltips show point counts.
- [ ] Full breakdown lists all 5 styles with their score.
- [ ] Tie path: force a tie and confirm "Hybrid Appreciation Style" copy + multiple top style cards render.
- [ ] Share button: capture image and verify download fallback in a non-Web-Share browser.
- [ ] Keyboard-only run-through: Tab to each option, Enter/Space selects, focus rings visible.
- [ ] Screen reader announces "Question N of M" and the final result.
- [ ] axe-core dev console clean (no violations on welcome, quiz, results).
- [ ] Mobile viewport (≤375px): touch targets ≥44px, no horizontal scroll, chart legible.

---

## Files most likely to change per iteration

| File | What changes |
| --- | --- |
| `src/data/stylesData.js` | Style definitions, colors, descriptions |
| `src/data/questionsData.js` | Question prompts, options, `styleId` mapping |
| `src/components/WelcomeScreen.jsx` | Welcome copy + CTA |
| `src/components/ResultsScreen.jsx` | Tie copy, results layout tweaks |
| `tailwind.config.js` / `src/index.css` | Palette changes |
| `vite.config.js` | `base` path on repo rename |
| `src/skills/calculateResults.test.js` | Test fixtures if style ids change |
