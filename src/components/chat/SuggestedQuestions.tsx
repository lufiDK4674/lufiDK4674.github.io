const SUGGESTIONS = [
  "What projects has Divyanshu worked on?",
  "What was the hardest technical challenge he's faced?",
  "What's his experience with AI/ML?",
  "Is he available for freelance work?",
];

export function SuggestedQuestions({ onPick }: { onPick: (question: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5 px-1">
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onPick(q)}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
