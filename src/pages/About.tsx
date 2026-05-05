import { GraduationCap, Target, Lightbulb, Users, Zap, MapPin, Mail, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import profileImg from "@/assets/profile.jpeg";

const strengths = [
  { icon: <Target className="text-blue-400" size={28} />, title: "Problem Solving", desc: "Systems-level thinking to architect complex AI pipelines", color: "blue" },
  { icon: <Lightbulb className="text-purple-400" size={28} />, title: "Rapid Prototyping", desc: "From idea to working prototype in hours, not weeks", color: "purple" },
  { icon: <Users className="text-cyan-400" size={28} />, title: "Collaboration", desc: "Cross-functional teamwork across hardware, AI, and backend", color: "cyan" },
  { icon: <Zap className="text-green-400" size={28} />, title: "Adaptability", desc: "Quick to learn new frameworks, domains, and constraints", color: "green" },
];

const colorMap: Record<string, string> = {
  blue:   "border-blue-500/20",
  purple: "border-purple-500/20",
  cyan:   "border-cyan-500/20",
  green:  "border-green-500/20",
};

const About = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-xs font-semibold tracking-widest text-purple-400 uppercase mb-3">Who I Am</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building intelligent systems that bridge the gap between cutting-edge AI research and real-world production.
          </p>
        </div>

        {/* Bio + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20 items-start">
          <div className="lg:col-span-3 space-y-5 reveal-left">
            <h2 className="text-3xl font-bold text-white">My Story</h2>
            <p className="text-gray-300 text-base leading-relaxed">
              I'm an AI engineer who graduated in 2025 from Dumka Engineering College with a B.Tech in CSE (CGPA 8.55). 
              Over the past year I've built production-grade systems: autonomous vulnerability remediation agents,
              edge AI robotics, RAG-powered chatbots, and data science pipelines, across 4 different companies.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              My work spans the full spectrum: <span className="text-blue-400 font-medium">agentic LLM systems</span> (LangChain, LangGraph, ReAct) 
              at one end and <span className="text-cyan-400 font-medium">embedded IoT robotics</span> (Raspberry Pi, NodeMCU, MQTT) at the other,
              with Python backend services and computer vision tying them together.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              I've won hackathons, co-authored research (PU Learning for gene classification), and delivered 
              automation that measurably cuts manual effort by 50-70%. What drives me is shipping things that
              actually run in production, not just notebooks.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="mailto:work.kumardivyanshu@gmail.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={14} className="text-blue-400" /> work.kumardivyanshu@gmail.com
              </a>
              <a href="https://github.com/lufiDK4674" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Github size={14} className="text-gray-400" /> lufiDK4674
              </a>
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={14} className="text-red-400" /> Jharkhand / Gandhinagar, India
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 reveal-right flex flex-col gap-5">
            {/* Profile card */}
            <div className="glass rounded-2xl p-1 border border-white/10 overflow-hidden">
              <div className="relative">
                <div className="w-full aspect-square bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl overflow-hidden">
                  <img
                    src={profileImg}
                    alt="Divyanshu Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="glass rounded-2xl p-5 border border-white/10 space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">Quick Facts</h3>
              {[
                ["🎓", "B.Tech CSE · CGPA 8.55 · 2025"],
                ["🏢", "4 companies · 1+ year"],
                ["🤖", "AI Agents · Robotics · Backend"],
                ["🏆", "2× Hackathon winner"],
                ["📄", "Research paper (PU Learning)"],
                ["📍", "Open to remote & relocation"],
              ].map(([icon, text], i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="text-base">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-20 reveal">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Education</h2>
          <div className="glass rounded-2xl p-8 border border-blue-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="text-white" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">B.Tech in Computer Science & Engineering</h3>
                <p className="text-blue-400 font-semibold mt-0.5">Dumka Engineering College, Jharkhand</p>
                <p className="text-gray-400 text-sm mt-1">Graduated 2025 · CGPA: 8.55 / 10</p>
                <p className="text-gray-500 text-sm mt-1">Relevant Coursework: Data Structures, Algorithms, OS, DBMS, AI, Networking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Strengths */}
        <div className="reveal">
          <h2 className="text-3xl font-bold text-center mb-10 text-purple-400">Core Strengths</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {strengths.map((s, i) => (
              <div
                key={i}
                className={`reveal-scale glow-card glass rounded-2xl p-6 border text-center ${colorMap[s.color]}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
