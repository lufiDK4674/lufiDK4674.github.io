import { useCallback, useEffect, useRef, useState } from "react";
import { streamChat, RateLimitError, AuthError, type ChatMessage } from "@/lib/openrouter";
import { systemPrompt } from "./systemPrompt";

export interface DisplayMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "portfolio-chat-history";
const MAX_STORED_MESSAGES = 30;
const MAX_HISTORY_SENT = 10;

function loadHistory(): DisplayMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DisplayMessage[]) : [];
  } catch {
    return [];
  }
}

export function useChat() {
  const [messages, setMessages] = useState<DisplayMessage[]>(loadHistory);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
    } catch {
      // sessionStorage unavailable (private mode etc.) — ignore
    }
  }, [messages]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      setError(null);
      const userMessage: DisplayMessage = { role: "user", content: trimmed };
      const history = [...messages, userMessage];
      setMessages([...history, { role: "assistant", content: "" }]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const apiMessages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        ...history.slice(-MAX_HISTORY_SENT).map((m) => ({ role: m.role, content: m.content }) as ChatMessage),
      ];

      try {
        await streamChat({
          messages: apiMessages,
          signal: controller.signal,
          onToken: (token) => {
            setMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              next[next.length - 1] = { ...last, content: last.content + token };
              return next;
            });
          },
        });
      } catch (err) {
        const ref = (err as { requestId?: string })?.requestId;
        const suffix = ref ? ` (ref ${ref})` : "";
        if (err instanceof DOMException && err.name === "AbortError") {
          // user-initiated stop, not an error
        } else if (err instanceof RateLimitError) {
          setError(`I'm getting a lot of traffic right now (free-tier rate limit). Please try again in a minute.${suffix}`);
        } else if (err instanceof AuthError) {
          setError(`Chat is temporarily unavailable.${suffix}`);
        } else {
          setError(`Something went wrong. Please try again.${suffix}`);
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming],
  );

  return { messages, isStreaming, error, send, stop };
}
