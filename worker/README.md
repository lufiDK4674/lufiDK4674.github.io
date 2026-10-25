# Portfolio API Worker

This Cloudflare Worker provides the contact form endpoint and retains an
optional chat proxy route for compatibility. The portfolio no longer renders
a chat widget. The contact form does not send anything during local tests; the
success and failure paths use a stubbed EmailJS response.

## Configure and deploy

From this directory:

```bash
npm install
npx wrangler login
npx wrangler deploy
```

The EmailJS service ID, template ID, and public key are Worker variables in
`wrangler.toml`. The OpenRouter API key is required only if another client uses
the retained `/chat` route. Set that secret only when needed:

```bash
npx wrangler secret put OPENROUTER_API_KEY
```

The contact endpoint does not require that key. The Worker URL is printed by
`wrangler deploy`.

Configure that URL in the repository's GitHub Actions secret `CHAT_API_URL`.
The secret name is historical; the Pages workflow uses its value for
`VITE_CONTACT_API_URL`. For local site development, set this in the ignored
`.env.local` file:

```text
VITE_CONTACT_API_URL=https://<worker-host>
```

## Contact endpoint

`POST /contact` accepts JSON with `name`, `email`, `message`, and an optional
`website` honeypot field. It validates shape, email syntax, and field lengths
before forwarding to EmailJS. The browser bundle contains no mail provider
credentials. The handler does not log message content, names, or email
addresses; it logs a truncated SHA-256 hash of the request IP for abuse review.

The endpoint limits an IP to three submissions per minute and silently
acknowledges a filled honeypot without forwarding it. IP limits can affect
people who share a public network. This is basic abuse friction, not a delivery
guarantee or a substitute for provider-side controls. The client keeps form
content on failures and offers direct email as a fallback.

## Chat proxy

The chat route accepts only whitelisted free models, constrains request shape,
and prepends a server-side persona guardrail. `GET /health` reports whether the
OpenRouter key is configured. The Worker applies a 15/minute per-IP limit and
a 120/minute aggregate limit per Cloudflare location. Those limits are local
to each Cloudflare location and eventually consistent; they are not a global
daily quota or accounting control.

## Checks

```bash
npm test
npx wrangler deploy --dry-run
```

The tests stub network requests. They do not deliver messages or exercise a
deployed Cloudflare account.
