
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Code2, Brain, Bot, Database, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import ResumeDownload from "@/components/ResumeDownload";
import profileImg from "@/assets/profile.jpeg";

const roles = [
  "AI Automation Engineer",
  "Agentic AI Engineer",
  "AI & Robotics Engineer",
  "Python Backend Engineer",
  "Data Scientist",
  "ML Engineer",
];

const stats = [
  { value: 10, suffix: "+", label: "AI Projects", color: "text-blue-400", bg: "from-blue-500/20 to-blue-600/5", border: "border-blue-500/20" },
  { value: 4, suffix: "", label: "Companies Worked", color: "text-purple-400", bg: "from-purple-500/20 to-purple-600/5", border: "border-purple-500/20" },
  { value: 95, suffix: "%", label: "Model Accuracy", color: "text-cyan-400", bg: "from-cyan-500/20 to-cyan-600/5", border: "border-cyan-500/20" },
  { value: 2, suffix: "", label: "Hackathon Wins", color: "text-green-400", bg: "from-green-500/20 to-green-600/5", border: "border-green-500/20" },
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat.value, 1400, visible);

  return (
    <div
      ref={ref}
      className={`reveal tilt-card rounded-2xl p-6 border bg-gradient-to-br ${stat.bg} ${stat.border} text-center group cursor-default`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`text-4xl md:text-5xl font-extrabold mb-2 ${stat.color} transition-all duration-300`}>
        {count}{stat.suffix}
      </div>
      <div className="text-gray-400 text-sm font-medium tracking-wide">{stat.label}</div>
    </div>
  );
}

/* Floating orbit icons */
const orbitIcons = [
  { Icon: Brain, angle: 0, color: "text-blue-400" },
  { Icon: Bot, angle: 60, color: "text-purple-400" },
  { Icon: Code2, angle: 120, color: "text-cyan-400" },
  { Icon: Database, angle: 180, color: "text-green-400" },
  { Icon: Cpu, angle: 240, color: "text-yellow-400" },
  { Icon: Sparkles, angle: 300, color: "text-pink-400" },
];

const Index = () => {
  const typed = useTypewriter(roles);
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(function tick() {
      setOrbitAngle((a) => (a + 0.15) % 360);
      requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Profile image with orbit ── */}
            <div className="order-2 lg:order-1 flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative w-80 h-80">
                {/* Orbit ring */}
                <div className="absolute inset-[-40px] rounded-full border border-blue-500/15" />
                <div className="absolute inset-[-80px] rounded-full border border-purple-500/10" />

                {/* Orbiting icons */}
                {orbitIcons.map(({ Icon, angle, color }, i) => {
                  const rad = ((angle + orbitAngle) * Math.PI) / 180;
                  const r = 180;
                  const x = Math.cos(rad) * r;
                  const y = Math.sin(rad) * r;
                  return (
                    <div
                      key={i}
                      className={`absolute w-9 h-9 rounded-xl glass flex items-center justify-center ${color} shadow-lg`}
                      style={{
                        left: `calc(50% + ${x}px - 18px)`,
                        top: `calc(50% + ${y}px - 18px)`,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                  );
                })}

                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-[3px] animate-glow-pulse shadow-2xl shadow-blue-500/30">
                  <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
                    <img
                      src={profileImg}
                      alt="Divyanshu Kumar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Status badge */}
                <div className="absolute bottom-2 right-2 flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                  <span className="status-dot" />
                  Open to work
                </div>
              </div>
            </div>

            {/* ── Text content ── */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 animate-fade-in">
                <Sparkles size={14} className="text-yellow-400" />
                <span className="text-sm text-gray-300 font-medium">B.Tech CSE · CGPA 8.55 · Graduated 2025</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 animate-fade-in leading-tight" style={{ animationDelay: "0.1s" }}>
                Hi, I'm{" "}
                <span className="gradient-text-animated">Divyanshu</span>
              </h1>

              {/* Typewriter */}
              <div className="h-10 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <p className="text-xl md:text-2xl text-gray-300 font-medium">
                  {typed}
                  <span className="inline-block w-0.5 h-6 bg-blue-400 ml-0.5 animate-blink" />
                </p>
              </div>

              <p className="text-base md:text-lg text-gray-400 mb-8 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
                I build production-ready AI systems: autonomous agents, RAG pipelines,
                edge robotics, and backend services. Turning complex problems into elegant, measurable solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button
                  asChild
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                >
                  <Link to="/projects">
                    View My Work
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
                <ResumeDownload variant="hero" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-9 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-2.5 bg-blue-400 rounded-full mt-1.5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
