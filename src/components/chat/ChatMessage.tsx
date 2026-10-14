import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import type { DisplayMessage } from "./useChat";

export function ChatMessage({ message }: { message: DisplayMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-blue-600" : "bg-gradient-to-br from-blue-500 to-purple-600"
        }`}
      >
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          isUser ? "bg-blue-600 text-white" : "bg-white/5 text-gray-200 border border-white/10"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : message.content ? (
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <span className="inline-flex gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400 [animation-delay:0.15s]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400 [animation-delay:0.3s]" />
          </span>
        )}
      </div>
    </div>
  );
}
