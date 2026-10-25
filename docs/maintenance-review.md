# Maintenance review — 2026-10-26

The cleanup preserves the approved portfolio content and appearance. A checkpoint precedes it in Git history. Local before/after browser evidence remains in the ignored `review-evidence/cleanup/` directory.

## Scope

- Removed 46 TypeScript files unreachable from the `src/main.tsx` import graph, including dormant scroll hijacking and unused starter UI/hooks.
- Grouped ten retained components under layout/profile/projects and extracted metadata, skip-link and scroll-restoration responsibilities from App.
- Split CSS into ordered sections without changing declarations or cascade order. Pruned 37 unused runtime dependencies and four unused build/deployment helpers; retained the existing stack.
- Enabled strict and unused-code TypeScript checks, replaced the professional-content type assertion with checked assignment, and resolved all lint warnings.
- Added a complete `npm run check`, reproducible Node 24 CI checks, source documentation and ignores for credentials/generated/local-review files. GitHub Pages continues to build `dist/`; generated output is no longer versioned.
- Reviewed the existing contact implementation, its rate-limit/configuration failure paths and provider-value escaping. Retained the compatibility chat proxy and Worker deployment identity. No Worker deployment was performed.

## Evidence

- Clean installs succeeded for both root and worker lockfiles on Node 24.11.1.
- `npm run check`: content validation, app/build/worker types, lint, five stubbed worker tests and production build passed. Lint: zero errors and warnings.
- Chrome DevTools: all nine content routes had identical main text, titles and link destinations before/after cleanup.
- Sixty actual route/viewport combinations (including the unknown-route fallback; 320/360/390/768/1024/1440px): no overflow, missing landmarks/labels, portrait-heading overlap or H1 over two lines.
- Keyboard menu open/close, closed-menu tab order, visible focus, Escape return, explicit route navigation, history forward/back and 1400px scroll restoration passed. Architecture keyboard selection and reduced-motion behavior passed.
- The primary PDF returned 200/application/pdf, 94,739 bytes, with unchanged SHA-256 `2282c8f25996d7f00585dd567e9f7768cd3280732c40daface0262fad4d2343e`.
- Contact required-field validation/direct email fallback checked; no real message sent.
- Production output: CSS 58.70kB (11.72kB gzip), JS 306.67kB (100.07kB gzip). These are build sizes, not runtime performance measurements.

## Remaining boundaries

Actual 200% browser zoom, physical devices and real email delivery remain manual/authorized-test checks. The frontend build must receive the intended Worker URL through the existing `CHAT_API_URL` Actions secret. The Pages workflow does not deploy that Worker. The approved PDF remains unchanged, including its separately approved wording/location.

Dependencies were pruned without a broad framework upgrade. The existing old caniuse-lite warning remains. No new Lighthouse or field performance score is claimed for this maintenance change.

To roll back a merged release, revert its merge commit with the mainline parent and let the same verified Pages workflow publish the revert; do not rewrite main history.
