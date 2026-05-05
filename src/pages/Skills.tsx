import { useEffect, useRef, useState } from "react";
import { Code, Database, Brain, Cpu, Globe, Wrench, Bot, Layers } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const skillCategories = [
  {
    title: "AI & Agents",
    icon: <Bot className="text-blue-400" size={28} />,
    skills: ["LangChain", "LangGraph", "CrewAI", "RAG Pipelines", "ReAct Agents", "Prompt Engineering", "OpenAI API", "Anthropic API"],
    color: "blue",
  },
  {
    title: "Machine Learning",
    icon: <Brain className="text-purple-400" size={28} />,
    skills: ["Regression", "Classification", "Clustering", "Deep Learning", "NLP", "PU Learning", "Computer Vision", "Transformers"],
    color: "purple",
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layers className="text-cyan-400" size={28} />,
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "YOLOv8", "Pandas", "NumPy", "LLaMA"],
    color: "cyan",
  },
  {
    title: "Backend & APIs",
    icon: <Database className="text-green-400" size={28} />,
    skills: ["FastAPI", "Flask", "REST APIs", "Microservices", "Docker", "ChromaDB", "PgVector", "PostgreSQL"],
    color: "green",
  },
  {
    title: "Programming Languages",
    icon: <Code className="text-yellow-400" size={28} />,
    skills: ["Python", "C++", "C", "SQL", "JavaScript", "HTML/CSS"],
    color: "yellow",
  },
  {
    title: "Platforms & Tools",
    icon: <Globe className="text-orange-400" size={28} />,
    skills: ["Linux", "Git", "GitHub", "Docker", "Streamlit", "Power BI", "Jupyter", "n8n"],
    color: "orange",
  },
  {
    title: "Hardware & IoT",
    icon: <Wrench className="text-red-400" size={28} />,
    skills: ["NodeMCU", "Raspberry Pi", "IR Sensors", "Arduino", "MQTT", "ESP-NOW", "Robotics"],
    color: "red",
  },
  {
    title: "Dev & Engineering",
    icon: <Cpu className="text-pink-400" size={28} />,
    skills: ["SDLC", "Agile", "DSA", "OS", "DBMS", "Networking", "Testing", "CI/CD"],
    color: "pink",
  },
];

const proficiencies = [
  { name: "Python",              pct: 95, gradient: "from-blue-500 to-cyan-400" },
  { name: "Machine Learning",    pct: 90, gradient: "from-purple-500 to-pink-400" },
  { name: "LLMs & RAG",          pct: 88, gradient: "from-violet-500 to-purple-400" },
  { name: "Deep Learning",       pct: 85, gradient: "from-cyan-500 to-blue-400" },
  { name: "Data Analysis",       pct: 88, gradient: "from-green-500 to-emerald-400" },
  { name: "Backend (FastAPI)",   pct: 82, gradient: "from-green-500 to-teal-400" },
  { name: "Computer Vision",     pct: 85, gradient: "from-orange-500 to-amber-400" },
  { name: "C / C++",             pct: 80, gradient: "from-yellow-500 to-orange-400" },
];

const colorMap: Record<string, string> = {
  blue:   "border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/5",
  purple: "border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5",
  cyan:   "border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5",
  green:  "border-green-500/20 hover:border-green-500/40 hover:bg-green-500/5",
  yellow: "border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5",
  orange: "border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5",
  red:    "border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5",
  pink:   "border-pink-500/20 hover:border-pink-500/40 hover:bg-pink-500/5",
};
const badgeMap: Record<string, string> = {
  blue:   "bg-blue-500/15 text-blue-300 border-blue-500/25",
  purple: "bg-purple-500/15 text-purple-300 border-purple-500/25",
  cyan:   "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  green:  "bg-green-500/15 text-green-300 border-green-500/25",
  yellow: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
  orange: "bg-orange-500/15 text-orange-300 border-orange-500/25",
  red:    "bg-red-500/15 text-red-300 border-red-500/25",
  pink:   "bg-pink-500/15 text-pink-300 border-pink-500/25",
};

function AnimatedBar({ pct, gradient }: { pct: number; gradient: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setWidth(pct), 200);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className="w-full bg-gray-800/80 rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${gradient} relative overflow-hidden transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      >
        <div className="absolute inset-0 shimmer-bar" />
      </div>
    </div>
  );
}

const Skills = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">Tech Stack</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Skills
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Full-stack AI expertise from autonomous agents to embedded systems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className={`reveal-scale glow-card glass rounded-2xl p-6 border transition-all duration-300 ${colorMap[cat.color]}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-white/5">{cat.icon}</div>
                <h3 className="text-sm font-bold text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, j) => (
                  <span
                    key={j}
                    className={`tech-badge text-xs ${badgeMap[cat.color]}`}
                    style={{ animationDelay: `${j * 30}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency bars */}
        <div className="reveal glass rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Proficiency Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {proficiencies.map((item, i) => (
              <div key={i} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">{item.name}</span>
                  <span className={`text-sm font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.pct}%
                  </span>
                </div>
                <AnimatedBar pct={item.pct} gradient={item.gradient} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Skills;
