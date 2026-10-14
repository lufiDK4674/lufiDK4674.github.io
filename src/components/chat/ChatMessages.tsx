import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { SuggestedQuestions } from "./SuggestedQuestions";
import type { DisplayMessage } from "./useChat";

interface ChatMessagesProps {
  messages: DisplayMessage[];
  error: string | null;
  onSuggestionPick: (question: string) => void;
}

export function ChatMessages({ messages, error, onSuggestionPick }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 px-4">
      <div className="flex flex-col gap-4 py-4">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400">
              Hi! I'm here to answer questions about Divyanshu — his projects, experience, and skills. What would you like to know?
            </p>
            <SuggestedQuestions onPick={onSuggestionPick} />
          </div>
        )}
        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
        {error && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-300">{error}</p>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
