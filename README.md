# Appreciation Style Quiz

A short, web-based assessment from the **SmoothieKing Learnings** team that helps team members discover how they most feel valued and appreciated at work. Designed to live inside a Rise 360 lesson and to be shareable as a standalone link.

**Live experience:** https://smoothieking-learnings.github.io/appreciation_style_quiz/

---

## About the Experience

The Appreciation Style Quiz introduces team members to five distinct ways people give and receive recognition. Across five questions, it surfaces the style — or styles — that resonate most strongly with the participant and gives them clear language to bring back to their manager.

### The Five Appreciation Styles

| Style | What it means for the participant |
| --- | --- |
| **Words of Affirmation** | Feels valued when recognition is specific, genuine, and named in the moment. |
| **Quality Time** | Feels valued when someone is fully present — listening, alongside them, undistracted. |
| **Acts of Service** | Feels valued when someone steps in, lightens the load, and shares the work. |
| **Tangible Gifts** | Feels valued by small, specific gestures that prove they were noticed personally. |
| **Physical Touch** | Feels valued through shared signals of team wins — a fist-bump, a high-five, a shoulder tap. |

Every style is paired with a paragraph the participant can read and share with their manager so the insight translates into action on the floor.

---

## Participant Experience

- **Welcome.** A branded intro, a name field, and a single "Let's Blend!" call to action.
- **Quiz.** Five questions presented one at a time with a progress bar, back navigation, and a clear "Continue" gate.
- **Results.** A personalized headline using the participant's name, a donut chart of how their answers distributed across the five styles, the full per-style score breakdown, and the dedicated description for their top style. Ties surface a "Hybrid Appreciation Style" view that celebrates more than one top result.
- **Share.** A one-tap option that captures the result card and uses the device's native share sheet on mobile, with a clean image download fallback in browsers that don't support Web Share.

The participant's name is used only to personalize the results headline. Nothing is stored, transmitted, or sent anywhere — the quiz runs entirely in the browser.

---

## Design System

This project ships with the **SmoothieKing Learnings unified design system**, identical across every experience in the `sk-learning` repo. The tokens live in [`tailwind.config.js`](./tailwind.config.js).

### Color tokens

| Token | Hex | Usage |
| --- | --- | --- |
| `brand` | `#930018` | Primary buttons, progress fill, headings on cream |
| `brand-deep` | `#40000F` | Body copy, secondary text |
| `brand-bright` | `#E31F26` | Active / alert accents |
| `bg-primary` | `#FFF9EF` | Default cream surface |
| `bg-light` | `#FFDEE5` | Warm accent surfaces |
| `bg-soft-blue` | `#D6E0FF` | Cool accent surfaces |
| `accent-amber` | `#F4A261` | Style accent (warm honey) |
| `accent-coral` | `#E76F51` | Style accent (burnt sienna) |
| `accent-teal` | `#2A9D8F` | Style accent (deep teal) |
| `accent-gold` | `#E9C46A` | Style accent (soft gold) |
| `accent-violet` | `#6A4C93` | Style accent (royal purple — Words of Affirmation) |

Legacy aliases (`quiz-bg`, `quiz-primary`, `quiz-text`, `style-teacher`, `style-role`, `style-coach`, `style-supporter`) map to the same hex values and are preserved so existing class names keep working.

Body copy on the primary color switches to `bg-primary` (`#FFF9EF`) to satisfy WCAG contrast.

### Typography

| Token | Family | Usage |
| --- | --- | --- |
| `font-display` / `font-heading` | **Playfair Display**, Georgia, serif | Hero titles, screen headings, result names |
| `font-body` | **DM Sans**, system-ui, sans-serif | All body copy, buttons, labels |

Both families are loaded from Google Fonts in [`index.html`](./index.html) and applied to `<body>` via [`src/index.css`](./src/index.css).

### Iframe / LMS workflow

Embed mode is shared across the system. The universal utility lives at [`src/utils/iframeBridge.js`](./src/utils/iframeBridge.js) and offers:

- `?embed=1` — strips chrome via [`LayoutWrapper`](./src/components/LayoutWrapper.jsx) so the experience renders flat inside an iframe.
- `?autostart=1` — skips the welcome screen.
- `?parentOrigin=<encoded>` — locks `postMessage` delivery to one host origin.
- A namespaced `postMessage` contract (`appreciationQuiz:*`) for `ready`, `start`, `results`, `restart`, `resize`, `wheel`.
- A bare `{ type: 'complete' }` fire on the results screen so a Rise 360 Code Block can mark the lesson complete.
- A `useIframeBridge()` React hook that wires everything in one call.

Full embed snippets, sizing guidance, and Rise 360 gotchas live in [IFRAME_EMBED.md](./IFRAME_EMBED.md).

---

## Accessibility

- WCAG-compliant contrast on every screen of the warm cream palette.
- Screen-reader announcements at every screen change (e.g. "Question 2 of 5…").
- Full keyboard navigation with visible focus indicators and Enter / Space selection.
- Touch targets meet the 44×44 px standard used across iOS and Android.
- Mobile-first layout that stays legible on small viewports without horizontal scroll.
- Continuous accessibility auditing via `@axe-core/react` during development.

---

## Tech Stack

- **React 18** on Vite
- **Tailwind CSS** locked to the SmoothieKing Learnings design tokens
- **Recharts** for the donut chart breakdown
- **html2canvas** for capturing the share image from the results screen
- **lucide-react** for icons
- **@axe-core/react** for dev-time accessibility auditing
- **Vitest + React Testing Library** for unit and component tests

Routing uses simple React state (`currentScreen`) instead of `react-router-dom`, which keeps the build compatible with GitHub Pages without 404s on refresh.

---

## Project Layout

```
src/
  App.jsx                  screen-state router (Welcome / Quiz / Results)
  components/
    WelcomeScreen.jsx
    QuizScreen.jsx
    ResultsScreen.jsx
    LayoutWrapper.jsx      mobile-first wrapper + embed-mode chrome stripping
    ProgressBar.jsx
  data/
    stylesData.js          5 appreciation styles, colors, descriptions
    questionsData.js       5 questions, styleId-tagged options
  skills/
    calculateResults.js    scoring + hybrid tie logic
    exportAndShare.js      html2canvas → Web Share / download
    a11yUtils.js           announcer, keyboard handling, axe auditor
    embed.js               legacy alias — re-exports isEmbedded() from iframeBridge
  utils/
    iframeBridge.js        universal LMS embed contract (postMessage + hook)
```

---

## Local Development

```bash
npm install
npm run dev      # vite dev server
npm run test     # vitest
npm run lint     # eslint
npm run build    # production bundle to /dist
npm run preview  # serve the built bundle
```

The Vite `base` is set to `/appreciation_style_quiz/` in [`vite.config.js`](./vite.config.js) to match the GitHub Pages path.

---

## Deployment

The site is published from this repository to GitHub Pages automatically via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). Every change merged to `main` is built and republished to the live URL above.

---

Maintained by the **SmoothieKing Learnings** team.
