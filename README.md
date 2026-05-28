# Appreciation Style Quiz

A short, web-based assessment from the Smoothie King Learnings team that helps team members discover how they most feel valued and appreciated at work. Designed to live inside our Rise 360 lessons and to be shareable as a standalone link.

**Live experience:** https://smoothieking-learnings.github.io/appreciation_style_quiz/

---

## About the Quiz

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

## Accessibility

The experience is designed to meet WCAG color-contrast standards across the warm Smoothie King palette and to be usable by participants relying on assistive technology:

- Screen-reader announcements at every screen change (e.g., "Question 2 of 5…").
- Full keyboard navigation with visible focus indicators and Enter/Space selection.
- Touch targets meet the 44×44 px standard used across iOS and Android.
- Mobile-first layout that stays legible on small viewports without horizontal scroll.
- Continuous accessibility auditing via axe-core during development.

---

## Embedding in Rise 360

The quiz includes an embed mode that strips the outer card so it renders flat inside a Rise 360 Embed block. Appending `?embed=1` to the URL, or simply loading the quiz inside any iframe, switches it into embed mode automatically.

Recommended iframe snippets, height guidance for mobile vs. desktop, and notes on the Rise 360 constraints we've validated against are documented in [IFRAME_EMBED.md](./IFRAME_EMBED.md).

---

## Technical Foundation

A client-side React single-page application hosted on GitHub Pages.

- **React (Vite)** with state-based screen routing — no client-side router, no broken refreshes on Pages.
- **Tailwind CSS** locked to the Smoothie King warm palette (background `#FFF9EF`, primary `#930018`, text `#40000F`).
- **Recharts** for the donut chart breakdown.
- **html2canvas** for capturing the share image from the results screen.
- **lucide-react** for the icon set.
- **Vitest** and **React Testing Library** for unit and component coverage.
- **@axe-core/react** for development-time accessibility auditing.

The five styles and their descriptions live in [`src/data/stylesData.js`](./src/data/stylesData.js); each question and its style mapping lives in [`src/data/questionsData.js`](./src/data/questionsData.js).

---

## Hosting & Release

The project is published from this repository to GitHub Pages via the workflow in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). Every change merged to `main` is built and republished to the live URL above.

---

Maintained by the Smoothie King Learnings team.
