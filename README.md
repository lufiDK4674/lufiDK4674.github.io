# Divyanshu Kumar — AI engineering portfolio

React 18, TypeScript, Vite, Tailwind and a small set of shadcn/Radix primitives. The deployed site uses GitHub Pages and hash routing so case-study URLs work on refresh without server rewrites.

## Local development

Use Node **24** (`.nvmrc`). Install both dependency sets:

```sh
npm ci
npm ci --prefix worker
npm run dev
```

Open the localhost URL printed by Vite. For a production build:

```sh
npm run check
npm run preview -- --host 127.0.0.1 --port 5177
```

`npm run check` validates professional content, checks app/build/worker TypeScript, lints, runs the network-stubbed worker tests, and builds `dist/`. Nothing in this command deploys or sends messages.

## Source organization

```text
src/
  components/
    layout/      Navigation, footer, metadata and skip link
    profile/     Portrait, resume, experience and capability presentation
    projects/    Project cards, workflows, architecture and diagnostic views
    ui/          Only the seven Radix/shadcn primitives used by the site
  data/          Typed professional content and verified project evidence
  hooks/         Route scroll restoration
  lib/           Date formatting and CSS-class helpers
  pages/         Route-level compositions
  styles/        Ordered theme, layout, page and responsive stylesheets
worker/          Existing contact endpoint and compatibility chat proxy
scripts/         Content validation and optional local asset generation
```

`src/styles/index.css` preserves the stylesheet cascade order. Keep responsive and overview refinements after their base sections. Route changes belong in `src/App.tsx`; scroll/focus restoration belongs in `src/hooks/use-route-scroll.ts`.

## Editing professional content

Update `src/data/professional.json`. Its exported value is checked against `ProfessionalContent` in `professional.ts` rather than forcibly cast. Run `npm run check:content` after edits. Keep dates, overlapping freelance work, project maturity, ownership and evaluation boundaries accurate.

The approved resume is `public/resumes/Divyanshu-Kumar-AI-Engineer.pdf`. Replace it only with an explicitly approved PDF; asset generation does not rewrite it. The website address and separately approved PDF may differ until a new PDF is approved.

The portrait is authentic. Project diagrams are conceptual or labelled reconstructed; they are not product screenshots. `node scripts/generate-portfolio-assets.mjs` optionally regenerates the responsive portrait assets and social preview using the existing PDF/canvas development dependency. See [DESIGN.md](DESIGN.md) for the preserved Signal Studio system.

## Contact configuration

Copy `.env.example` to ignored `.env.local` and set `VITE_CONTACT_API_URL` to the intended Worker origin. Without it, the form preserves entered text and offers direct email. It does not pretend to send successfully.

The browser receives only the endpoint URL. Provider credentials and rate limiting remain in the Worker; see [worker/README.md](worker/README.md). Do not commit `.env`, `.dev.vars`, tokens, customer documents or private project evidence. Tests stub provider requests and never deliver messages.

## Checks and deployment

Pull requests run `.github/workflows/checks.yml`. The main-branch Pages workflow performs the same checks before uploading `dist/`. It maps the existing GitHub Actions secret `CHAT_API_URL` to `VITE_CONTACT_API_URL`; the secret name is historical.

**Pushing to main publishes the frontend through GitHub Actions.** It does not deploy the Worker. Confirm the contact endpoint separately; live message delivery is not covered by the stubbed tests. Generated `dist/`, local review screenshots/rollback snapshots and design explorations are ignored, retained locally, and are not application source.

After publication, verify Home, Projects, both case studies, About, Experience, Capabilities, Contact, the primary PDF and mobile navigation. Keep the existing `#/projects/document-intelligence` URL even though the project is named Content Intelligence Engine.

For rollback, revert the relevant commit(s) and push through the same verified workflow. If reverting a merge commit, use its mainline parent (`git revert -m 1 <merge-sha>`). Reverts preserve history; do not force-push main.
