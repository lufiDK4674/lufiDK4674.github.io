import { useState } from "react";
import { ExternalLink, Github, ArrowUpRight, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github: string;
  demo: string;
  featured: boolean;
  gradient: string;
  initials: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "AutoFix AI: AI DevOps Automation Agent",
    description: "Autonomous agent that detects code issues from logs/GitHub events and automatically generates fixes using LLM + RAG pipelines. Integrated semantic search and codebase retrieval for context-aware patch generation.",
    technologies: ["Python", "LangChain", "LangGraph", "OpenAI", "RAG", "Docker", "FastAPI"],
    category: "Agentic AI",
    github: "#",
    demo: "#",
    featured: true,
    gradient: "from-blue-600 to-cyan-500",
    initials: "AFA",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&h=220&q=80",
  },
  {
    title: "Smart Vision Quality Control System",
    description: "AI-based conveyor automation system for freshness detection, logo recognition, and text OCR. Integrated YOLOv8 with NodeMCU IR sensors for real-time system control. Won 3rd Place at BIT Sindri Innovathon.",
    technologies: ["Python", "OpenCV", "YOLOv8", "TensorFlow", "Arduino", "NodeMCU"],
    category: "Computer Vision",
    github: "https://github.com/lufiDK4674/Smart-Vision_Quality-Testing-System",
    demo: "#",
    featured: true,
    gradient: "from-purple-600 to-pink-500",
    initials: "SV",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=220&q=80",
  },
  {
    title: "AI-Powered Driver Monitoring System",
    description: "Real-time edge AI system for drowsiness detection, emotion recognition, and driver behavior analysis. CNN and 3D-CNN inference via Flask backend with IoT hardware feedback using MQTT.",
    technologies: ["Python", "CNN", "3D-CNN", "Flask", "NodeMCU", "MQTT", "OpenCV"],
    category: "Computer Vision",
    github: "#",
    demo: "#",
    featured: true,
    gradient: "from-cyan-600 to-teal-500",
    initials: "DMS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=220&q=80",
  },
  {
    title: "Interactive Talking Robot (Raspberry Pi 5)",
    description: "Voice-interactive robotic assistant on Raspberry Pi 5 with Linux OS, integrating LLM reasoning and ElevenLabs speech synthesis for natural human-robot interaction.",
    technologies: ["Python", "LLaMA", "ElevenLabs", "Raspberry Pi", "Linux", "LangChain"],
    category: "Robotics",
    github: "#",
    demo: "#",
    featured: true,
    gradient: "from-green-600 to-emerald-500",
    initials: "ITR",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&h=220&q=80",
  },
  {
    title: "Unified Customer Insights",
    description: "Sentiment analysis + churn prediction model with 93% precision. HackFest'24 Finalist at IIT ISM. ETL pipeline and interactive dashboards for comprehensive customer analytics.",
    technologies: ["Python", "Scikit-learn", "NLP", "Pandas", "Streamlit", "Plotly"],
    category: "Data Science",
    github: "https://github.com/lufiDK4674/Unified_Customer_Insights",
    demo: "#",
    featured: true,
    gradient: "from-yellow-600 to-orange-500",
    initials: "UCI",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=220&q=80",
  },
  {
    title: "Gene Ontology Classification (Research)",
    description: "PU learning framework for gene function classification on 8,000+ feature biological data. Implemented nnPU/uPU loss functions and transformer-based tabular models (TabTransformer). Research paper under verification.",
    technologies: ["Python", "PyTorch", "TabTransformer", "PU Learning", "NumPy", "Scikit-learn"],
    category: "Research",
    github: "#",
    demo: "#",
    featured: false,
    gradient: "from-rose-600 to-pink-500",
    initials: "GOC",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&h=220&q=80",
  },
  {
    title: "Fake News Detection",
    description: "95% accurate NLP model using TF-IDF and Passive Aggressive Classifier to identify and classify fake news articles across multiple domains.",
    technologies: ["Python", "NLP", "Scikit-learn", "TF-IDF", "Pandas"],
    category: "NLP",
    github: "https://github.com/lufiDK4674/DataScience_Techinterex/tree/main/TASK%204",
    demo: "#",
    featured: false,
    gradient: "from-indigo-600 to-blue-500",
    initials: "FND",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&h=220&q=80",
  },
  {
    title: "Conversational AI Chatbot (RAG)",
    description: "Modular Python backend enabling document-aware Q&A using LangChain, ChromaDB, and LLaMA 3.2. Automated ingestion pipeline with semantic retrieval and agent-style chains.",
    technologies: ["Python", "LangChain", "LLaMA 3.2", "ChromaDB", "Streamlit", "RAG"],
    category: "Agentic AI",
    github: "#",
    demo: "#",
    featured: false,
    gradient: "from-violet-600 to-purple-500",
    initials: "CAC",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&h=220&q=80",
  },
  {
    title: "Retail Sales Analysis",
    description: "Comprehensive data analysis and visualization of retail sales patterns with interactive dashboards and business intelligence solutions.",
    technologies: ["Python", "Pandas", "Plotly", "Power BI", "SQL"],
    category: "Data Science",
    github: "https://github.com/lufiDK4674/DataScience_Techinterex/tree/main/TASK%207",
    demo: "#",
    featured: false,
    gradient: "from-amber-600 to-yellow-500",
    initials: "RSA",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=220&q=80",
  },
  {
    title: "Swarm Robotics",
    description: "Multi-robot coordination system using NodeMCU and IR sensors for autonomous swarm behaviour with ESP-NOW wireless communication.",
    technologies: ["C++", "NodeMCU", "IR Sensors", "ESP-NOW", "Arduino IDE"],
    category: "Robotics",
    github: "#",
    demo: "#",
    featured: false,
    gradient: "from-red-600 to-orange-500",
    initials: "SR",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&h=220&q=80",
  },
];

const categories = ["All", "Agentic AI", "Computer Vision", "Robotics", "Data Science", "NLP", "Research"];

const categoryColors: Record<string, string> = {
  "Agentic AI":     "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Computer Vision":"bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Robotics":       "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Data Science":   "bg-green-500/20 text-green-300 border-green-500/30",
  "NLP":            "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Research":       "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  useScrollReveal();

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const featured = filtered.filter((p) => p.featured);
  const others   = filtered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block text-xs font-semibold tracking-widest text-purple-400 uppercase mb-3">Portfolio</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Production-grade AI systems, research, and full-stack applications.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === cat
                  ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                  : "border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured grid */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 reveal flex items-center gap-2">
              <Star size={20} className="text-yellow-400" />
              <span className="text-white">Featured</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featured.map((project, i) => (
                <div
                  key={i}
                  className="reveal-scale tilt-card group relative glass rounded-2xl border border-white/10 overflow-hidden"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Card top banner with image */}
                  <div className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-5 text-3xl font-black text-white/30 select-none">
                      {project.initials}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColors[project.category] ?? "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-300 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.slice(0, 4).map((t, j) => (
                        <span key={j} className="tech-badge">{t}</span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="tech-badge text-gray-500">+{project.technologies.length - 4}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={project.github !== "#" ? project.github : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                          project.github !== "#"
                            ? "border-white/15 text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/30"
                            : "border-white/5 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        <Github size={13} /> Code
                      </a>
                      <a
                        href={project.demo !== "#" ? project.demo : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                          project.demo !== "#"
                            ? `bg-gradient-to-r ${project.gradient} text-white hover:opacity-90`
                            : "bg-white/5 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        <ExternalLink size={13} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other projects */}
        {others.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 reveal text-white">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {others.map((project, i) => (
                <div
                  key={i}
                  className="reveal glow-card glass rounded-2xl p-5 border border-white/10 group"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                        {project.initials.slice(0,2)}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${categoryColors[project.category] ?? "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}>
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 5).map((t, j) => (
                      <span key={j} className="tech-badge">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {project.github !== "#" && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                        <Github size={13} /> View Code
                      </a>
                    )}
                    {project.demo !== "#" && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors ml-auto">
                        Live Demo <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Projects;
