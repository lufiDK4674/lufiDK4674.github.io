import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.ts";

const config = {
  CONTACT_RATE_LIMIT: { limit: async () => ({ success: true }) },
  EMAILJS_SERVICE_ID: "test-service",
  EMAILJS_TEMPLATE_ID: "test-template",
  EMAILJS_PUBLIC_KEY: "test-public-key",
};

function request(payload, overrides = {}) {
  return new Request("https://worker.test/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:5173",
      "CF-Connecting-IP": "203.0.113.7",
      ...overrides.headers,
    },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
}

const validPayload = {
  name: "Review Test",
  email: "review@example.com",
  message: "This is a local stubbed contact test.",
  website: "",
};

test("contact endpoint validates input before forwarding", async () => {
  let forwarded = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    forwarded = true;
    return new Response("OK", { status: 200 });
  };
  try {
    const response = await worker.fetch(request({ ...validPayload, email: "bad-address" }), config);
    assert.equal(response.status, 400);
    assert.equal(forwarded, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("contact endpoint reports success when the EmailJS call is stubbed", async () => {
  const originalFetch = globalThis.fetch;
  let forwardedRequest;
  globalThis.fetch = async (input, init) => {
    forwardedRequest = { input, init };
    return new Response("OK", { status: 200 });
  };
  try {
    const response = await worker.fetch(request(validPayload), config);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.match(String(forwardedRequest.input), /api\.emailjs\.com/);
    const body = JSON.parse(forwardedRequest.init.body);
    assert.equal(body.template_params.email, validPayload.email);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("contact endpoint preserves a generic failure when the provider rejects", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("provider details must stay private", { status: 500 });
  try {
    const response = await worker.fetch(request(validPayload), config);
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.doesNotMatch(body.message, /provider details|review@example\.com/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("contact endpoint rate-limits before forwarding", async () => {
  let forwarded = false;
  const limitedConfig = {
    ...config,
    CONTACT_RATE_LIMIT: { limit: async () => ({ success: false }) },
  };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    forwarded = true;
    return new Response("OK", { status: 200 });
  };
  try {
    const response = await worker.fetch(request(validPayload), limitedConfig);
    assert.equal(response.status, 429);
    assert.equal(response.headers.get("Retry-After"), "60");
    assert.equal(forwarded, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("contact honeypot acknowledges without forwarding", async () => {
  let forwarded = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    forwarded = true;
    return new Response("OK", { status: 200 });
  };
  try {
    const response = await worker.fetch(request({ ...validPayload, website: "bot-filled" }), config);
    assert.equal(response.status, 202);
    assert.equal(forwarded, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
