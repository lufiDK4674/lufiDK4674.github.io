import { useEffect } from "react";
import { Calendar, MapPin, Trophy, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const experiences = [
  {
    title: "AI Automation Engineer",
    company: "Sec4Sys Technologies Pvt Ltd",
    period: "Nov 2025 – Present",
    location: "Freelance · Remote",
    description: "Building end-to-end AI automation systems for vulnerability remediation, reducing manual analysis effort by 50–70%.",
    achievements: [
      "Architected a ReAct-style autonomous remediation agent (report parsing → retrieval → fix generation → PR creation)",
      "Built RAG-based remediation engine over CVE/CWE datasets using ChromaDB, reducing debugging time from hours to minutes",
      "Automated full workflow from ingestion to PR creation, achieving near hands-free remediation for recurring vulnerabilities",
      "Deployed modular microservices using Docker, reducing deployment/setup time by 40%",
    ],
    color: "blue",
    tag: "Current",
  },
  {
    title: "AI & Robotics Engineer / Mentor",
    company: "Tech Genius Institute",
    period: "Aug 2025 – Present",
    location: "Gandhinagar, India",
    description: "Delivering STEM, AI, ML and Robotics education while building production AI systems for the institute.",
    achievements: [
      "Replaced manual employee tracking with an automated workflow system, reducing manual data entry by 60%",
      "Built AI-driven notification engine generating personalized email and WhatsApp alerts",
      "Developed backend systems integrating IoT devices (NodeMCU + sensors) with AI pipelines for real-time monitoring",
      "Delivered 15+ deployable prototypes as part of student mentorship",
    ],
    color: "purple",
    tag: "Current",
  },
  {
    title: "Data Science Intern",
    company: "TechInterex",
    period: "Feb 2025 – Apr 2025",
    location: "Remote",
    description: "Delivered 5+ real-world data science projects using NLP, classification models, and ML pipelines.",
    achievements: [
      "Built fake news detection model with 95% accuracy using TF-IDF and Passive Aggressive Classifier",
      "Implemented churn prediction pipeline achieving 94% precision with ETL and dashboard visualizations",
      "Automated model evaluation and result tracking using F1-score and ROC-AUC reporting",
    ],
    color: "cyan",
    tag: null,
  },
  {
    title: "AI Intern",
    company: "Gyantu",
    period: "Nov 2024 – Jan 2025",
    location: "Remote",
    description: "Built a RAG-powered AI chatbot using LLaMA 3.2, LangChain, and ChromaDB with a Streamlit interface.",
    achievements: [
      "Developed modular AI backend for conversational systems with service-oriented architecture",
      "Implemented Retrieval-Augmented Generation pipelines including document ingestion and semantic search",
      "Built Streamlit interface with clear backend–frontend separation, improving engagement by 40%",
    ],
    color: "green",
    tag: null,
  },
  {
    title: "App Developer Trainee",
    company: "Lawazia Tech",
    period: "Nov 2023 – Dec 2023",
    location: "Remote",
    description: "Developed a full-stack blog application with authentication, dark/light mode, and responsive design.",
    achievements: [
      "Designed and developed full-stack blog application with modern UI",
      "Optimized code structure and navigation, improving performance by 30%",
    ],
    color: "yellow",
    tag: null,
  },
];

const hackathons = [
  {
    title: "Innovathon Winner",
    event: "BIT Sindri",
    position: "3rd Place 🏆",
    description: "Built an AI system to detect food freshness, logos, and text with automated conveyor monitoring, in a 24-hour hackathon.",
    color: "yellow",
  },
  {
    title: "HackFest'24 Finalist",
    event: "IIT ISM Dhanbad",
    position: "Finalist 🥈",
    description: "Developed a churn prediction model analyzing user sentiment and behavior for smarter retention decisions, in a 36-hour hackathon.",
    color: "green",
  },
];

const achievements = [
  "Ranked Top 3 in C/C++ programming on institutional leaderboard",
  "Research paper on Gene Ontology Classification (PU Learning) currently under verification",
  "CGPA: 8.55/10 · B.Tech CSE, Dumka Engineering College (Graduated 2025)",
];

const colorMap: Record<string, string> = {
  blue:   "border-blue-500/30 hover:border-blue-500/60",
  purple: "border-purple-500/30 hover:border-purple-500/60",
  cyan:   "border-cyan-500/30 hover:border-cyan-500/60",
  green:  "border-green-500/30 hover:border-green-500/60",
  yellow: "border-yellow-500/30 hover:border-yellow-500/60",
};
const dotMap: Record<string, string> = {
  blue:   "bg-blue-500 shadow-blue-500/50",
  purple: "bg-purple-500 shadow-purple-500/50",
  cyan:   "bg-cyan-500 shadow-cyan-500/50",
  green:  "bg-green-500 shadow-green-500/50",
  yellow: "bg-yellow-500 shadow-yellow-500/50",
};
const tagMap: Record<string, string> = {
  blue:   "bg-blue-500/20 text-blue-300 border-blue-500/30",
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

const Experience = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20 reveal">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">Career</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From building autonomous AI agents to mentoring the next generation of engineers.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-24">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } ${isLeft ? "reveal-left" : "reveal-right"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-6 z-10">
                    <div className={`w-3 h-3 rounded-full ${dotMap[exp.color]} shadow-lg ring-2 ring-gray-900`} />
                  </div>

                  {/* Card */}
                  <div className={`ml-16 md:ml-0 w-full md:w-[46%] ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                    <div className={`glass-blue glow-card rounded-2xl p-6 border ${colorMap[exp.color]} transition-all duration-300`}>
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white leading-tight">{exp.title}</h3>
                          <p className="text-blue-400 font-semibold mt-0.5">{exp.company}</p>
                        </div>
                        {exp.tag && (
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tagMap[exp.color]}`}>
                            {exp.tag}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} /> {exp.location}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{exp.description}</p>

                      <ul className="space-y-2">
                        {exp.achievements.map((a, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotMap[exp.color].split(" ")[0]}`} />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hackathons */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 reveal">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Hackathons & Competitions
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hackathons.map((h, i) => (
              <div
                key={i}
                className={`reveal-scale glass-blue glow-card rounded-2xl p-8 border ${colorMap[h.color]} text-center`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Trophy className="text-yellow-400 mx-auto mb-4 animate-float" size={48} />
                <div className="text-2xl font-bold text-white mb-1">{h.title}</div>
                <div className="text-blue-400 font-semibold mb-2">{h.event}</div>
                <div className="text-2xl mb-4">{h.position}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other achievements */}
        <div className="reveal">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ExternalLink size={20} className="text-blue-400" />
              Other Achievements
            </h2>
            <ul className="space-y-3">
              {achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Experience;
