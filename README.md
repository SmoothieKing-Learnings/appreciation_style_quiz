# Appreciation Style Quiz Prototype

A modular, single-page React application for an "Appreciation Style Quiz". It emphasizes a clean project structure through reusable utility functions ("skills") and strict review protocols for UI and WCAG compliance. This document tracks the initial system requirements, project planning, and updates.

> This iteration is scaffolded from the Communication Style Quiz prototype. The questions and style definitions in `src/data/` remain as placeholders until new appreciation-focused content is dropped in.

## Mission & Design Constraints
**Goal**: Build a fully client-side React app without a backend database.

### Strict Design & Styling Rules
Configured via Tailwind CSS with a warm palette constraint:
- **Background Color**: `#FFF9EF`
- **Primary Action Color**: `#930018` (Buttons, progress bars)
- **Default Text Color**: `#40000F`
- **WCAG Constraint**: Whenever text overlaps `#930018`, text must be `#FFF9EF` to pass contrast standards. Otherwise, default to `#40000F`.
- **Chart Colors**: Four distinct complementary colors (`#F4A261`, `#E76F51`, `#2A9D8F`, `#E9C46A`) assigned structurally in the codebase for easy editing.

### Deployment Context
- Configured specifically for **GitHub Pages** (via standard URL like `username.github.io/Communication_Quiz_Prototype`).
- **Base Pathing**: Setup in `vite.config.js` to ensure assets avoid 404 errors.
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
A pure utility function that takes the user's answers array, tallies scores for the 4 styles, calculates the percentage, and securely returns an array of the top styles cleanly to handle exact numeric "Ties".

### Skill 3: Export & Share (`exportAndShare.js`)
Utility wrapper that bridges `html2canvas` to process a DOM ID into an image blob, attempting `navigator.share()` (Web Share API) natively with an automated fallback to gracefully download the `.png` if the browser does not support the Web Share standard.

### Skill 4: WCAG & Accessibility Engine (`a11yUtils.js`)
- **Announcer**: Verbally calls route/step changes to Screen Readers globally (`"Question 2 of 3: ..."`).
- **Keyboard Navigation**: Enforces explicit Tab formatting and `"Enter"` or `"Space"` firing on Answer buttons.
- **Auditor**: Development mode runs `@axe-core/react` instantly mapping structural violation logs.

### Skill 5: UI & Responsive Review Protocol (`LayoutWrapper.jsx`)
- Master Layout Wrapper enforcing mobile-first CSS architecture.
- Touch Target Sizes: Minimum `44x44px` enforced across all selectable objects (iOS/Android native standard).
- Desktop Constraint: Enforces a maximum width (`max-w-2xl`) preventing ugly horizontal stretch lines.

---

## Data Structure

**The 4 Communication Styles** are defined in `src/data/stylesData.js` and matched to `styleId`s on each option in `src/data/questionsData.js`. The current entries are placeholders inherited from the previous iteration — replace them with the new communication-focused styles, questions, strengths, and blind spots.

When updating content, keep these in sync:
- `STYLES` array in `src/data/stylesData.js` (one entry per style).
- `STYLE_COLORS` map in the same file (one color per style id).
- `styleId` on each option in `src/data/questionsData.js` must match an `id` in `STYLES`.

---

## Getting Started

1. **Install dependencies:** `npm install`
2. **Run Dev Server:** `npm run dev`
3. **Run Testing Suite:** `npm run test`
4. **Build Production Bundle:** `npm run build`

> _Note: For GitHub Pages deployment, execute `npm run build` and follow standard GitHub actions configuration protocols to host the generated `/dist` build output statically._

---

## Iteration Plan: Leadership → Communication Style Quiz

This section is the working plan for converting the inherited Leadership Style scaffolding into a dedicated Communication Style Quiz. Update it as decisions are made; treat it as the source of truth for in-flight work.

### Phase 0 — Scaffolding & Rename ✅ Complete
The structural rename has already been applied. No content yet — only labels, paths, and metadata.

- [x] App title (`index.html`) → "Communication Style Quiz"
- [x] Welcome heading + description + CTA aria-label → communication-focused copy
- [x] Results "Hybrid Leader" → "Hybrid Communicator"
- [x] Share filename + Web Share `title`/`text` → communication-focused
- [x] `package.json` name → `communication-quiz-prototype`
- [x] Vite `base` → `/Communication_Quiz_Prototype/`
- [x] README rewritten; comments updated; agent skill folder renamed
- [x] Placeholder notes added to `questionsData.js` and `stylesData.js`

### Phase 1 — Define the 4 Communication Styles ✅ Complete

The 4 styles live in `src/data/stylesData.js`:

| `id` | Display name | Subtitle | Letter |
| --- | --- | --- | --- |
| `direct` | The Just the Facts Communicator | Direct | A |
| `enthusiastic` | The Cheerleader Communicator | Enthusiastic | B |
| `collaborative` | The Kindness Communicator | Collaborative | C |
| `precise` | The Detailed Standards Communicator | Precise | D |

**Still to review (placeholder content, inferred):** `focus`, `strengths`, and `blindSpots` for each style were filled in based on common archetype descriptors. Replace with stakeholder-approved copy when available.

### Phase 2 — Author the Question Set ✅ Complete

10 questions are in `src/data/questionsData.js`, sourced from `communication_style_quiz.md`. Each question has exactly 4 options, one per style id, with the consistent letter→style mapping above (A=direct, B=enthusiastic, C=collaborative, D=precise).

If new questions are added, follow the same pattern: `{ id, text, options: [{ id, text, styleId }] }`, and ensure every `styleId` matches one of the 4 ids in `stylesData.js`. Tests in `src/skills/calculateResults.test.js` already reference the new ids.

### Phase 3 — Visual & Brand Pass ⏳ Pending Direction

- [ ] Logo: confirm whether `src/assets/logo.png` / `logo-light.png` stay or are swapped.
- [ ] Color palette: decide whether warm palette (`#FFF9EF`, `#930018`, `#40000F`) carries over or shifts for the communication branding. Defined in `tailwind.config.js` and `src/index.css`.
- [ ] Welcome copy tone: confirm "Let's Blend!" CTA still fits, or swap for a communication-flavored verb.
- [ ] Results screen "Hybrid Communicator" tie copy: confirm phrasing.

### Phase 4 — Deployment Wiring ⏳ Pending

- [ ] Confirm GitHub Pages repo path. If repo is renamed, update `base` in `vite.config.js` to match the new repo slug.
- [ ] Update GitHub Actions workflow (in `.github/`) if the repo or branch changes.
- [ ] Verify built `/dist` loads with the new base path before publishing.

### Phase 5 — QA Checklist (before each release)

- [ ] `npm run test` passes (update `calculateResults.test.js` if style ids changed).
- [ ] `npm run lint` clean.
- [ ] Manual run of the full quiz: every option selectable, Back works, Continue gates correctly on the last question.
- [ ] Donut chart renders with 4 colors and tooltips show point counts.
- [ ] Score breakdown sorted high → low with correct max possible.
- [ ] Tie path: force a tie and confirm "Hybrid Communicator" copy + multiple top style cards render.
- [ ] Share button: capture image and verify download fallback in a non-Web-Share browser.
- [ ] Keyboard-only run-through: Tab to each option, Enter/Space selects, focus rings visible.
- [ ] Screen reader announces "Question N of M" and the final result.
- [ ] axe-core dev console clean (no violations on welcome, quiz, results).
- [ ] Mobile viewport (≤375px): touch targets ≥44px, no horizontal scroll, chart legible.

### Files most likely to change per iteration

| File | What changes |
| --- | --- |
| `src/data/stylesData.js` | Style definitions, colors |
| `src/data/questionsData.js` | Question prompts, options, `styleId` mapping |
| `src/components/WelcomeScreen.jsx` | Welcome copy + CTA |
| `src/components/ResultsScreen.jsx` | Tie copy, results layout tweaks |
| `tailwind.config.js` / `src/index.css` | Palette changes |
| `vite.config.js` | `base` path on repo rename |
| `src/skills/calculateResults.test.js` | Test fixtures if style ids change |
