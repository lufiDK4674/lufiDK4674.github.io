export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Free-tier model IDs rot fast — re-check https://openrouter.ai/models?max_price=0
// if the primary model starts returning 400/404.
export const OPENROUTER_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "deepseek/deepseek-chat-v3-0324:free",
  "google/gemini-2.0-flash-exp:free",
];

// Errors carry the worker's X-Request-Id (when available) so a visitor can
// quote a ref that maps to a structured log line in `wrangler tail`.
export class RateLimitError extends Error {
  requestId?: string;
}
export class AuthError extends Error {
  requestId?: string;
}

interface StreamChatOptions {
  messages: ChatMessage[];
  signal?: AbortSignal;
  onToken: (token: string) => void;
}

// Calls the Cloudflare Worker proxy (VITE_CHAT_API_URL), which holds the
// OpenRouter key server-side and forwards the request. The browser never
// sees the API key.
export async function streamChat({ messages, signal, onToken }: StreamChatOptions): Promise<void> {
  const endpoint = import.meta.env.VITE_CHAT_API_URL as string | undefined;
  if (!endpoint) {
    throw new Error("Chat is not configured.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODELS[0],
      models: OPENROUTER_MODELS,
      messages,
      stream: true,
      max_tokens: 1024,
    }),
    signal,
  });

  if (!response.ok) {
    const requestId = response.headers.get("X-Request-Id") ?? undefined;
    if (response.status === 429) {
      const err = new RateLimitError("Rate limited");
      err.requestId = requestId;
      throw err;
    }
    if (response.status === 401 || response.status === 403) {
      const err = new AuthError("Unauthorized");
      err.requestId = requestId;
      throw err;
    }
    throw new Error(`Chat request failed: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data:")) continue;

      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return;

      try {
        const parsed = JSON.parse(data);
        const token = parsed.choices?.[0]?.delta?.content;
        if (token) onToken(token);
      } catch {
        // ignore malformed/comment lines (e.g. OpenRouter keep-alive comments)
      }
    }
  }
}
