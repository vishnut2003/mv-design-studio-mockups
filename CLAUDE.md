# MV Design Studio – Page Mockups

## Objective

Build visual designs (mockups) of website pages for the client **MV Design Studio** and present them for approval.
This repository holds the **design proposals only**. It is not the production website and is not the final codebase.

The workflow is:

1. Design a page (or a variant of a page).
2. Show it to the client.
3. Collect feedback and revise.
4. Once approved, mark the page as approved. Approved designs become the reference for the real build.

## Who this is for

- **Agency:** Web Spider Solutions (info@webspidersolutions.com) builds the mockups.
- **Client:** MV Design Studio reviews and approves them.

## How to work in this repo

- Every page mockup is a **self-contained, static HTML file** that opens directly in a browser with no build step. Keep CSS and JS inline or in a shared `assets/` folder so a file can be opened or shared on its own.
- One file per page, named after the page: `home.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`, etc.
- Variants of the same page go in the same folder with a suffix: `home-v1.html`, `home-v2.html`.
- Keep an `index.html` at the root that links to every mockup so the client can browse all pages from one place.
- Mockups must look right on both desktop and phone widths. Check both before presenting.
- Use placeholder text and images only where real content is not available yet, and make it obvious that it is a placeholder.
- Do not add frameworks, package managers, or build tooling unless explicitly asked. Simplicity makes sharing with the client easy.

## Folder layout

```
/
├── CLAUDE.md          # this file
├── index.html         # gallery linking to every mockup
├── assets/            # shared images, fonts, CSS
├── pages/             # one HTML file per page mockup (and variants)
└── STATUS.md          # approval status of each page (see below)
```

Create folders as they are needed; do not create empty ones ahead of time.

## Approval tracking

Keep `STATUS.md` up to date with one row per page:

| Page | Variant | Status | Client feedback | Last updated |
|------|---------|--------|-----------------|--------------|

Status values: `draft`, `sent for review`, `changes requested`, `approved`.

Never edit an `approved` mockup. If changes are needed after approval, create a new variant and send that for review.

## Presenting to the client

- Share mockups as plain HTML files (or a hosted preview link) with a short note listing which pages are new or changed.
- Record feedback in `STATUS.md` exactly as the client gave it, then address it in a new variant.
- When all pages are approved, the set is handed over as the design reference for development.
