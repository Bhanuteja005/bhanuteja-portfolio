# Bhanu Teja — Portfolio

Personal freelance portfolio for **P Bhanu Teja**, AI & Full Stack Developer
based in Hyderabad, India.

Built with Next.js 14 (App Router), React 18, Framer Motion and Tailwind CSS.

## Getting started

Requires Node 18.17 or newer.

```bash
pnpm install          # or: npx pnpm@8.15.9 install --frozen-lockfile
pnpm dev              # http://localhost:3000
```

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `pnpm dev`         | Start the development server   |
| `pnpm build`       | Production build               |
| `pnpm start`       | Serve the production build     |
| `pnpm lint`        | ESLint over the app directory  |
| `pnpm lint:styles` | Stylelint over the stylesheets |
| `pnpm format`      | Format with Prettier           |

## Pages

| Route          | Description                                   |
| -------------- | --------------------------------------------- |
| `/`            | Hero, introduction and recent work            |
| `/work`        | Full work list, with list and grid views      |
| `/work/[slug]` | Case study, generated statically per project  |
| `/about`       | Biography, services, toolkit and achievements |
| `/contact`     | Inquiry form and contact details              |

## Project structure

```
app/
├── (in-progress)/     Route group: about, contact, work, work/[slug]
├── _components/       Presentational components
├── _config/           Metadata and shared event names
├── _data/             Navigation, socials, preloader words
├── _fonts/            Neue Montreal local font
├── _hooks/            Scroll, pointer and timing hooks
├── _layout/           Page composition: header, navbar, footer, menu
├── _lib/              Tailwind plugin
├── _providers/        styled-components and Balancer providers
├── _styles/           Hand-written stylesheet layers
├── _utils/            Class-name helper
├── globals.css        Tailwind layers and base styles
├── icon.svg           Favicon
└── layout.jsx         Root layout
```

`_components` holds leaf components and never imports from `_layout`;
`_layout` composes them into pages. Each folder has an `index.js` barrel,
reachable through the aliases in `jsconfig.json` (`@/components`, `@/layout`,
`@/hooks`, and so on).

## Personalising

| What                    | Where                                            |
| ----------------------- | ------------------------------------------------ |
| Name, role, links, bio  | `portfolio.config.js`                            |
| Skills and achievements | `portfolio-content.js`                           |
| Displayed projects      | `reference-work-data.js` and `case-studies.json` |
| Portrait                | `public/images/bhanu-editorial.png`              |
| Typography and layout   | `app/_styles/`                                   |

The contact form has no backend. Submitting it opens a prepared draft in the
visitor's own email client, which they review and send themselves.

## Displayed projects

> **Important**
> The four projects currently on the site — TWICE, Future Goals, Atypikal and
> One:Nil — are **reference examples by Dennis Snellenberg**, not Bhanu's
> client work. Replace them with his own projects before publishing this as a
> freelance portfolio.

Bhanu's own project data is retained in `portfolio-content.js`, with its
artwork in `public/images/projects/`, ready to be swapped in.

`scripts/import-reference-cases.py` refreshes `case-studies.json` from the
reference project pages. It is a data-import tool, not part of the build:

```bash
python scripts/import-reference-cases.py
```

## Credits

Layout adapted from [Ali Bagheri's recreation](https://github.com/AliBagheri2079/dennis-snellenberg-portfolio)
of [Dennis Snellenberg's portfolio](https://dennissnellenberg.com/).

The upstream repository does not include a clear licence grant. Clarify reuse
rights before publishing this commercially.
