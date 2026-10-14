# Portfolio Chat Proxy (Cloudflare Worker)

A tiny Cloudflare Worker that proxies chat requests from the portfolio site to
OpenRouter. The **OpenRouter API key lives only here, server-side** — it never
ships in the frontend bundle — and the worker adds rate limiting, guardrails,
and structured logging on top.

## Deploy (one-time setup)

From the `worker/` directory:

```bash
cd worker
npm install                 # installs wrangler
npx wrangler login          # opens browser to auth your Cloudflare account
npx wrangler secret put OPENROUTER_API_KEY
                            # paste your OpenRouter key (sk-or-...) when prompted
npx wrangler deploy         # prints the worker URL, e.g.
                            # https://portfolio-chat-proxy.<account>.workers.dev
```

Copy that worker URL — the portfolio site needs it.

## Wire the URL into the site

The OpenRouter key is **not** a frontend env var anymore. Only the proxy URL is:

- **Local dev:** add to the repo's `.env.local`:
  ```
  VITE_CHAT_API_URL=https://portfolio-chat-proxy.<account>.workers.dev
  ```
- **Production (GitHub Pages):** repo Settings → Secrets and variables →
  Actions → New secret named `CHAT_API_URL` with the worker URL as its value.
  The Actions workflow injects it into the build as `VITE_CHAT_API_URL`.

## Local worker development

```bash
cd worker
npm run dev                 # serves the worker at http://localhost:8787
```

Point `VITE_CHAT_API_URL` at `http://localhost:8787` to test against the local
worker. The local allowlist already permits `localhost` origins.

## Rate limiting

Two Cloudflare-native rate-limit bindings (configured in `wrangler.toml`):

- **`CHAT_RATE_LIMIT_MINUTE`** — 15 requests / 60s per IP (burst cap). Stops a
  single client scripting the endpoint to burn the OpenRouter free quota.
- **`CHAT_RATE_LIMIT_DAY`** — 400 requests / 24h **global** (keyed by a fixed
  string, so it acts as an account-wide counter). Protects the OpenRouter
  free-tier daily quota from distributed abuse.

Tune the limits in `wrangler.toml` and redeploy. If a binding is absent at
runtime the code skips it gracefully (logs + allows) — so a deploy without
these still works, just unprotected. KV/D1 is **not** required: the native
bindings are accurate and don't consume your daily write quota.

The bindings use the `unsafe.bindings` wrangler field, which is the current
syntax for the Rate Limiting API. It's production-usable; the field name may
stabilize later. If your wrangler version rejects `unsafe.bindings`, fall back
to a dashboard WAF Rate Limiting Rule on the route, or a KV counter.

## Guardrails

Four layers, all server-side:

1. **Immutable guardrail system prompt** — prepended to *every* request before
   the client's messages. Locks the persona and forbids revealing
   instructions/keys or acting outside the portfolio-assistant role. A caller
   who bypasses the client JS and crafts messages directly still gets it.
2. **Input validation & sanitization** — rejects oversized bodies (200KB),
   non-JSON, wrong shapes, too many messages (30), oversized individual
   messages, and oversized user/assistant content (32KB — targets
   prompt-stuffing without choking the legit knowledge-bearing system message,
   which is ~25KB). Forces `stream: true` and clamps `max_tokens` to 1024.
3. **Model allowlist** — only the three free models are forwarded upstream, so
   the key can never be pointed at paid models regardless of what a client
   sends. Only whitelisted body fields are forwarded (no extra params).
4. **CORS** — locked to the portfolio's own domains (`divyanshukumar.online`,
   `divyanshukumar.me`, `localhost`).

**Residual risk (documented, not solved):** prompt injection from a visitor's
typed message is the classic unsolvable arms race — the guardrail + persona
defend but can't guarantee it. For a portfolio this is acceptable. The strong
guarantee the worker *does* provide: no one can strip the guardrail or unlock
paid models by calling the endpoint directly.

## Observability

- **Structured logs** — one JSON line per request via `console.log`, viewable
  live with `wrangler tail` and in the Cloudflare dashboard (Workers → Logs):
  ```json
  { "level":"info","requestId":"…","ts":"…","ipHash":"…(SHA-256, 16 hex)",
    "method":"POST","path":"/","status":200,"latencyMs":412,
    "model":"meta-llama/…","upstreamStatus":200 }
  ```
  Errors / rate-limits / validation failures are logged at `warn`/`error`
  levels with the reason in `validationError` / `error` / `rateLimited`.
  IP is **hashed**, never stored raw.
- **`X-Request-Id` response header** (CORS-exposed) — the chat UI appends
  `(ref <id>)` to its error message, so a visitor can quote a ref that maps
  1:1 to a log line in `wrangler tail`.
- **`/health` endpoint** — `GET /health` returns `{ "ok": true, "configured": true }`
  (503 if the key is missing). Point an uptime monitor (UptimeRobot, etc.)
  at `https://…workers.dev/health`.
- **Dashboard analytics** — Cloudflare already graphs invocations, errors, and
  CPU time per worker for free.

To tail live logs:

```bash
cd worker
npx wrangler tail               # streams the JSON log lines as requests happen
npx wrangler tail --format json
```

## Notes

- The worker streams the OpenRouter SSE response straight through to the
  browser, so the chat UI's token-by-token rendering still works.
- Token-usage logging isn't included (would require tapping the SSE stream
  mid-passthrough); rely on OpenRouter's dashboard for token/cost metrics.
