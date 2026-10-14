import { useState } from "react";
import { MessageCircle, X, Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatMessages } from "./ChatMessages";
import { useChat } from "./useChat";

const isChatConfigured = Boolean(import.meta.env.VITE_CHAT_API_URL);

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isStreaming, error, send, stop } = useChat();

  if (!isChatConfigured) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    send(input);
    setInput("");
  };

  return (
    <>
      {open && (
        <Card className="fixed bottom-24 right-6 z-50 flex h-[560px] w-[380px] max-h-[calc(100dvh-8rem)] max-w-[calc(100vw-2rem)] flex-col overflow-hidden border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Ask about Divyanshu</p>
              <p className="text-xs text-gray-500">AI assistant · answers from his portfolio</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <ChatMessages messages={messages} error={error} onSuggestionPick={send} />

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isStreaming}
              className="h-9 border-white/10 bg-white/5 text-sm text-white placeholder:text-gray-600"
            />
            {isStreaming ? (
              <Button type="button" size="icon" variant="outline" className="h-9 w-9 flex-shrink-0" onClick={stop}>
                <Square size={14} />
              </Button>
            ) : (
              <Button type="submit" size="icon" className="h-9 w-9 flex-shrink-0 bg-blue-600 hover:bg-blue-500" disabled={!input.trim()}>
                <Send size={14} />
              </Button>
            )}
          </form>
        </Card>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
