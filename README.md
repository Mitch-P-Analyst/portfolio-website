# Mitchell Palmer — Portfolio Site

A self-hosted rebuild of [mitchelljrpalmer.com](https://www.mitchelljrpalmer.com/), built with
[Next.js](https://nextjs.org) instead of Webflow. No monthly platform fee — content lives in this
repo as plain TypeScript/JSON files, and hosting is free on Vercel's hobby tier.

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Pages hot-reload as you edit files.

To produce a production build (the same thing Vercel runs on deploy):

```bash
npm run build
npm start
```

## Project structure — where to edit things

Everything a "CMS" would normally hold is just data files under `src/content/`. Edit these, save,
and the site updates — no admin panel needed.

| What you want to change | File |
|---|---|
| Name, tagline, nav links, social links | `src/content/site.ts` |
| Bio, mission statement, status | `src/content/about.ts` |
| Projects (add/edit/remove) | one `.mdx` file per project in `src/content/projects/` |
| Work history, education, skills, services | `src/content/experience.ts` |
| Photography gallery | `src/content/photography.json` |

Pages themselves live in `src/app/`, following Next.js's folder-based routing:

```
src/app/
  page.tsx            → /              (home)
  about/page.tsx       → /about
  projects/page.tsx    → /projects
  projects/[slug]/page.tsx → /projects/<slug>  (auto-generated per project)
  experience/page.tsx  → /experience
  photography/page.tsx → /photography
```

Shared UI (header, footer, project cards, the photo filter gallery) lives in `src/components/`.
Images live in `public/images/`, organized by section.

### Adding a new project

Each project is one file: `src/content/projects/<slug>.mdx`. The filename *is* the URL slug
(`solar-farm-asset-performance-anomaly-detection.mdx` → `/projects/solar-farm-asset-performance-anomaly-detection`)
— adding a file is all it takes to create a new page, no routing code to touch.

1. Drop a card thumbnail in `public/images/projects/` (and optionally a larger banner in
   `public/images/projects/hero/`).
2. Create `src/content/projects/your-slug.mdx` with frontmatter plus the write-up as regular
   Markdown/MDX below it:

   ```mdx
   ---
   title: "Your Project Title"
   description: "One or two sentences — shown on the card and at the top of the detail page."
   image: "/images/projects/your-thumbnail.jpg"
   heroImage: "/images/projects/hero/your-banner.jpg"   # optional, falls back to `image`
   featured: true                                        # shows it on the homepage
   link: { label: "GitHub Repository", href: "https://github.com/you/your-repo" }
   skills: ["Skill One", "Skill Two"]
   tools: ["Python", "PostgreSQL"]
   ---

   ## Project Overview

   Write the rest of the case study here using normal Markdown — headings, **bold**, lists,
   and tables all work. You can also drop in two custom components anywhere in the body:

   <DashboardEmbed src="https://your-app.onrender.com/" title="My Dashboard" />
   <PdfEmbed src="/path/to/an-executive-summary.pdf" />
   ```

3. Delete the file to remove the project — the page and its listing-page card disappear together.

`techGroups` is an optional alternative to `skills`/`tools` for projects with a lot of
technologies, letting you group tags under your own labels (see the solar farm project's
frontmatter for an example: `Languages & Libraries`, `Statistical Methods`, etc.).

### Adding photos

1. Drop image files in `public/images/photography/`.
2. Add an entry to `src/content/photography.json` for each one:
   ```json
   { "src": "/images/photography/your-file.jpg", "season": "Summer", "location": "Canada", "type": "Digital" }
   ```
   The filter buttons on `/photography` are generated automatically from whatever `season`,
   `location`, and `type` values appear in this file — add a new location and a new filter button
   just appears.

## Design

Colors, fonts, and spacing are defined once in `src/app/globals.css` (the `@theme` block) and
`src/app/layout.tsx` (fonts: Merriweather for headings, Inter Tight for body text), matching the
original Webflow site's sage-green palette.

## Deploying for free

**Vercel** (recommended — built by the makers of Next.js, zero config):

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, click Deploy.
3. Every future `git push` auto-deploys. Free tier covers a personal portfolio comfortably.
4. Add your custom domain (`mitchelljrpalmer.com`) under Project Settings → Domains, then update
   your domain registrar's DNS as instructed.

**Netlify** is a comparable free alternative if you'd rather avoid Vercel specifically — the
`npm run build` output works there too with minimal config.

## What changed vs. the Webflow site

This is a faithful rebuild of the layout, copy, and images from the live site, re-implemented as
code. A few things to know:

- The photography gallery's filter buttons (Type/Location/Season) are fully functional, driven by
  `photography.json` — same behavior as the Webflow CMS filter, but data lives in your repo.
- Images are served through Next.js's built-in image optimizer (`next/image`), so they're resized
  and lazy-loaded automatically without a paid image CDN.
