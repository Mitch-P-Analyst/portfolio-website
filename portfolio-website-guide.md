# portfolio-website — Maintenance Guide

A reference for navigating and maintaining this repo, whether you're editing directly
or directing Claude Code to make changes.

---

## 1. Tech stack, in plain terms

| Piece | What it is | Why it's here |
|---|---|---|
| **Next.js 16** (App Router) | React framework that handles routing, page rendering, and build tooling | Replaces Webflow's page builder — file paths *are* your routes |
| **TypeScript** | JavaScript with type-checking | Catches mistakes (wrong prop name, missing field) before they become runtime bugs |
| **Tailwind CSS v4** | Utility-class styling (`className="text-lg font-bold"` instead of a separate CSS file) | Fast styling without writing custom CSS per component |
| **MDX** (`next-mdx-remote`) | Markdown that can also embed React components | Your project write-ups — normal Markdown, plus custom `<DashboardEmbed>` / `<PdfEmbed>` tags when needed |
| **gray-matter** | Parses the `---` frontmatter block at the top of each `.mdx` file | Turns `title:`, `skills:`, etc. into structured data your pages can read |

You don't need to *write* Tailwind or MDX from scratch to maintain this — you mostly edit
existing patterns. Claude Code is well-suited to generating new Tailwind/MDX correctly;
your job is knowing **where** things live and **what good output looks like**.

---

## 2. The core mental model

```
src/content/   →  DATA (what to say)
src/app/       →  PAGES (routes — one folder = one URL)
src/components/ → UI PIECES (reusable building blocks pages assemble)
```

Almost every content change you'll ever make happens in `src/content/`. You should rarely
need to touch `src/app/` or `src/components/` unless you're changing *how* something looks
or *adding a new page/feature* — that's where Claude Code earns its keep.

---

## 3. Folder-by-folder map

### `src/content/` — all your editable content
| File | Controls |
|---|---|
| `site.ts` | Name, tagline, email, nav links, social links |
| `about.ts` | Bio paragraphs, "journey" story, mission statement, status |
| `experience.ts` | Work history, education, skills list, "services" cards |
| `photography.json` | One entry per photo: `src`, `season`, `location`, `type` |
| `projects.ts` | **Logic**, not content — reads all `.mdx` files from the folder below. Rarely needs editing. |
| `projects/*.mdx` | One file per project. Frontmatter (`---` block) = metadata; everything below = the write-up body |

### `src/app/` — pages (Next.js file-based routing)
| Path | URL | Notes |
|---|---|---|
| `page.tsx` | `/` | Homepage: hero, about teaser, featured projects |
| `about/page.tsx` | `/about` | Full bio, education, toolkit, services |
| `projects/page.tsx` | `/projects` | Grid of all projects |
| `projects/[slug]/page.tsx` | `/projects/<slug>` | Auto-generated per `.mdx` file — `[slug]` means "dynamic, filled from the filename" |
| `experience/page.tsx` | `/experience` | Timeline view of `experience.ts` |
| `photography/page.tsx` | `/photography` | Renders `<PhotoGallery>` with data from `photography.json` |
| `layout.tsx` | wraps every page | Fonts, `<Header>`/`<Footer>`, global `<html>`/`<body>` |
| `globals.css` | — | Color variables (`--color-brand`, etc.) and the two custom fonts |

### `src/components/` — reusable UI
| Component | Used for |
|---|---|
| `Header.tsx` / `Footer.tsx` | Site chrome — nav pulls from `site.ts` automatically |
| `ProjectCard.tsx` | The card shown in project grids (home + `/projects`) |
| `PhotoGallery.tsx` | The filterable photo grid — client-side, `"use client"` at top means it runs in the browser (needed because it has interactive buttons) |
| `ProjectEmbeds.tsx` | `<DashboardEmbed>` and `<PdfEmbed>` — the two custom tags you can drop into any `.mdx` project body |

### `public/images/` — all static images
Subfolders: `site/` (portrait photos), `projects/` (card thumbnails), `projects/hero/`
(banner images on detail pages), `photography/`, `icons/` (the small service icons on
`/about`).

---

## 4. Common maintenance tasks — step by step

**Add a new project**
1. Drop a thumbnail in `public/images/projects/`, optional banner in `public/images/projects/hero/`.
2. Create `src/content/projects/your-slug.mdx` — copy an existing one (e.g. `euro-snowpack.mdx`)
   as a template for the frontmatter shape.
3. Set `featured: true` if it should show on the homepage.
4. Save. No routing code to touch — the page appears automatically at `/projects/your-slug`.

**Edit your bio / mission statement**
→ `src/content/about.ts`. Just edit the strings.

**Add a job to your experience timeline**
→ `src/content/experience.ts`, add an object to the `experience` array (newest first — the
page renders them in array order).

**Add a photo**
→ Drop the file in `public/images/photography/`, add one JSON object to `photography.json`
with matching `src`. New `season`/`location`/`type` values automatically become new filter buttons.

**Change the color scheme**
→ `src/app/globals.css`, the `:root` block. `--color-brand` is your primary accent (currently
a muted teal `#486161`) — used for links, buttons, tags.

**Change nav links or social links**
→ `src/content/site.ts`.

---

## 5. Running it locally

```bash
npm install        # first time only, or after pulling changes that touch package.json
npm run dev         # starts local server at localhost:3000, hot-reloads on save
npm run build        # production build — same as what Vercel runs on deploy
npm run lint         # checks for code-quality issues
```

---

## 6. Things worth knowing (quirks & gotchas)

- **`node_modules` was being committed to git** — fixed as of this session (see the
  `.gitignore` you just added). Don't re-add it; it's meant to be regenerated locally via
  `npm install`, not tracked in version control.
- **Fonts require internet at build time.** `layout.tsx` pulls Merriweather and Inter Tight
  live from Google Fonts via `next/font/google`. This is normal for Vercel deploys (Vercel has
  internet access) but will fail in any sandboxed/offline build environment.
- **`AGENTS.md` / `CLAUDE.md`** at the repo root are auto-generated by Next.js's dev server to
  brief AI coding agents on this specific Next.js version's conventions. They get regenerated
  automatically — leave them alone, don't hand-edit.
- **`ProjectCard.tsx` prefers `tools` over `skills`** for its tag display (`project.tools ?? project.skills`) — if a project's card shows the wrong tags, check which field is populated in that project's frontmatter.
- **The mobile nav menu** (`Header.tsx`) uses a native `<details>/<summary>` element instead of
  JavaScript state — a nice lightweight trick, but if you ever want a slide-in animation or
  overlay backdrop, that's the point where you'd need to swap it for a `useState`-driven menu.

---

## 7. Working with Claude Code on this repo

Good habits for directing it effectively:
- Point it at the specific file (`src/content/projects/*.mdx` for content, `src/components/*`
  for UI behavior) rather than "the website" broadly — it'll move faster and touch less.
- After any structural change, run `npm run build` locally before pushing — Turbopack catches
  a lot at build time that dev mode won't.
- For content-only changes (new project, new photo, bio edit), you don't need Claude Code at
  all — those are plain data-file edits, good practice for building your own intuition for the
  codebase.
- Reserve Claude Code for: new page types, new interactive components, styling system changes,
  or anything touching `src/app/` routing structure.
