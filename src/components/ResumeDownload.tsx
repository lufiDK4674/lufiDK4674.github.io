import { useState, useRef, useEffect } from "react";
import { Download, ChevronDown, FileText } from "lucide-react";

const resumes = [
  {
    label: "AI Automation Engineer",
    subtitle: "LLMs · RAG · n8n · LangChain",
    file: "/resumes/Divyanshu Kumar AI_Auto.pdf",
    color: "from-blue-500 to-cyan-400",
    dot: "bg-blue-400",
  },
  {
    label: "Agentic AI Engineer",
    subtitle: "ReAct · LangGraph · CrewAI · Agents",
    file: "/resumes/Divyanshu KumAR.pdf",
    color: "from-violet-500 to-purple-400",
    dot: "bg-violet-400",
  },
  {
    label: "AI & Robotics Engineer",
    subtitle: "Edge AI · IoT · Computer Vision",
    file: "/resumes/Divyanshu Kumar AI_Robo.pdf",
    color: "from-cyan-500 to-teal-400",
    dot: "bg-cyan-400",
  },
  {
    label: "Python Backend & AI Engineer",
    subtitle: "FastAPI · Docker · REST APIs",
    file: "/resumes/Divyanshu Kumar Backend_AI.pdf",
    color: "from-green-500 to-emerald-400",
    dot: "bg-green-400",
  },
  {
    label: "Data Analyst / Data Scientist",
    subtitle: "EDA · ML Pipelines · Research",
    file: "/resumes/Divyanshu Kumar_DA_DS.pdf",
    color: "from-yellow-500 to-amber-400",
    dot: "bg-yellow-400",
  },
  {
    label: "AI & Software Engineer",
    subtitle: "SDLC · ML · CV · Agile",
    file: "/resumes/Divyanshu Kumar_SWE_AI.pdf",
    color: "from-orange-500 to-red-400",
    dot: "bg-orange-400",
  },
  {
    label: "Associate Software Engineer",
    subtitle: "C++ · DSA · Microservices",
    file: "/resumes/Divyanshu Kumar ASE.pdf",
    color: "from-pink-500 to-rose-400",
    dot: "bg-pink-400",
  },
];

interface ResumeDownloadProps {
  variant?: "hero" | "nav" | "inline";
  upward?: boolean;
}

export default function ResumeDownload({ variant = "hero", upward = false }: ResumeDownloadProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (variant === "nav") {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-blue-500/20"
        >
          <Download size={14} />
          Resume
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-72 glass rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden border border-white/10 animate-fade-in-scale">
            <div className="px-4 py-2.5 border-b border-white/10">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                Choose your track
              </p>
            </div>
            <div className="py-1.5 max-h-80 overflow-y-auto">
              {resumes.map((r) => (
                <a
                  key={r.label}
                  href={r.file}
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors duration-150 group"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${r.dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                      {r.label}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{r.subtitle}</p>
                  </div>
                  <Download
                    size={13}
                    className="text-gray-600 group-hover:text-blue-400 flex-shrink-0 transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
      >
        {/* animated gradient bg */}
        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] animate-shimmer" />
        <span className="relative flex items-center gap-2">
          <FileText size={18} />
          Download Resume
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && (
          <div className={`absolute left-0 ${upward ? "bottom-full mb-3" : "top-full mt-3"} w-80 glass rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden border border-white/10 animate-fade-in-scale`}>
          <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
            <FileText size={14} className="text-blue-400" />
            <p className="text-xs text-gray-300 font-semibold uppercase tracking-widest">
              Role-specific resumes
            </p>
          </div>
          <div className="py-2">
            {resumes.map((r, i) => (
              <a
                key={r.label}
                href={r.file}
                download
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-all duration-150 group"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200`}
                >
                  <FileText size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium group-hover:text-blue-300 transition-colors">
                    {r.label}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{r.subtitle}</p>
                </div>
                <Download
                  size={14}
                  className="text-gray-600 group-hover:text-blue-400 flex-shrink-0 transition-all duration-200 group-hover:translate-y-0.5"
                />
              </a>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-white/10 bg-white/[0.02]">
            <p className="text-xs text-gray-500 text-center">
              Each resume is tailored for a specific role
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
