# Signal Studio

Selected direction A, approved by Divyanshu Kumar on 25 October 2026. This describes the implemented portfolio, not the earlier editorial concept.

## Purpose and content

Make Divyanshu’s AI engineering work inspectable for recruitment. Preserve his portrait, stable AI Engineer / Applied GenAI positioning, direct contact and approved resume. Professional facts, project content, phase definitions, evidence counts and metadata live in `src/data/professional.json`, typed by `professional.ts` and checked by `npm run check:content`.

Content Intelligence Engine is Document Intelligence; AutoFix AI is Agentic AI. Sole-developer ownership is explicitly confirmed by the owner. Architecture, implementation, scoped integration verification and full platform acceptance are distinct. The original receipt fragmentation defect is diagnosed, not claimed fixed. Seven structural checks are an invoice-fixture result, not product-wide reliability. Do not equate provenance or the Shared Knowledge Pool with a delivered Knowledge Graph.

## Visual system

- Ground: graphite `#15191C`.
- Raised functional surface: `#20292E`; hover: `#28343A`.
- Text: `#F0F4F2`; secondary text: `#B4C3C7`.
- Action, selection and keyboard focus: mint `#B9F883`, with dark text `#162319` on filled actions.
- Relationship lines: `#43535B`; selected region: `#304236`.

The page remains on one restrained ground. Raised surfaces belong to controls, specimens and diagrams. Do not alternate enormous cream/navy fields or put every section in a card. Amber in the context-budget drawing indicates over-budget spans and always has a textual explanation.

Space Grotesk is the single interface and display face, served locally as WOFF2. The full TTF remains for asset regeneration and fallback; its SIL license is retained. Body text is 16–19px, display headings scale from roughly 28–78px, and major H1s remain within two visual lines at the tested widths. No dominant serif or decorative monospace.

The shared width is at most 1280px, with 5vw desktop gutters and 20px phone gutters. Major sections have more space between them than within them. Controls have practical touch targets, flat fills, a consistent small radius and visible focus.

## Composition

- Home: person-first introduction, portrait, project/resume actions and one secondary current-role line. Three equally weighted projects lead into two engineering observations and compact career snapshots. Diagnostics live only in the CIE case study.
- Featured projects: unequal, offset columns on desktop; sequential on mobile. Workflow drawings precede the specific contribution and case-study link. Earlier work is a quieter list with shadcn Tabs and search.
- Experience: chronology beside a short display heading. Earlier internships remain separately labelled; overlapping freelance work is explicit and never summed.
- Capabilities: evidence-linked groups, unboxed on home and structured rows on the dedicated route. No percentage bars.
- About: authentic portrait and professional story, with education and exact recognition below.
- Contact: direct email alongside an accessible form; Services remains a secondary footer destination.

## Interaction and accessibility

Use the existing shadcn Button, Sheet, Tabs, Accordion, Input, Textarea and Label components, themed by the shared CSS/HSL tokens. Avoid adding a dependency for an equivalent existing primitive.

The architecture has six named phase groups derived from the supplied 24-stage specification. It is two columns at 900px and below, three on larger screens. Selection highlights the region and its connecting relationships and updates inputs, outputs and verification in a live region. Native Tab/Space plus arrow/Home/End input work. All phase definitions and stage names are also available through the Accordion. No stage is marked complete merely because it exists in the design.

Diagnostic illustrations are labelled reconstructed/illustrative. They explain the receipt’s extraction-to-index fragmentation and a separate invoice fixture’s context-budget constraint. They are not application screenshots, raw customer documents or benchmarks invented for visual effect.

Keep semantic main, one H1, logical heading levels, associated form labels, the skip link, accessible names that include visible labels, and focus indicators. The mobile Sheet removes closed links from focus order, traps focus while open, handles Escape and restores focus. Navigation closes the Sheet and focuses main.

Reduced motion disables transitions and animations while preserving substantive content. Do not add scroll hijacking, particles, fake terminals, orbit decorations, vanity counters, glows or animated titles.

## Assets, routes and delivery

`Portrait` shares 160/360/720px WebP variants with explicit dimensions and responsive sizes. The original JPEG is retained unchanged. The generated PNG social preview uses the same authentic portrait and professional source data. Regenerate these assets with `node scripts/generate-portfolio-assets.mjs` from the repo root.

Retain HashRouter and existing direct URLs, including `/projects/document-intelligence` despite the new case-study title. Normal scrolling and explicit links control navigation. Reading positions are captured before route replacement and keyed by path plus history entry, preventing clamping and cross-route collisions.

The approved resume is a separately approved artifact and must not be regenerated automatically. Provider keys remain on the existing worker; the client receives only the contact endpoint. No deployment is implied by a build or a screenshot. Review `review-evidence/signal-studio/README.md` for measured results, limitations, deployment and rollback instructions.

## Portfolio breadth refinement

AutoFix AI, Smart Vision Quality Control and Content Intelligence Engine share comparable prominence. Computer vision is supported by the public Smart Vision repository and confirmed third-place recognition. Capabilities group tools with a small number of evidence links across GenAI, vision, data and connected systems. About follows the engineering trajectory, Experience describes responsibilities, and case studies own implementation detail and verification limits. Sole-developer ownership is stated once in CIE’s My role section. No new art direction or dependencies were introduced.

## Source maintenance

Layout, profile and project components live in their corresponding subdirectories; only used primitives remain in ui. Styles are split by responsibility and imported in their original cascade order through src/styles/index.css. Strict type checking and npm run check protect the verified content and existing route behavior.
