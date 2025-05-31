
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Data Science Intern",
      company: "TechInterex",
      period: "Feb 2025 – Present",
      location: "Remote",
      description: "Delivered 5+ real-world data science projects using NLP and classification models.",
      achievements: [
        "Built advanced NLP models for text classification",
        "Implemented machine learning pipelines for production deployment",
        "Collaborated with cross-functional teams on AI solutions"
      ],
      color: "blue"
    },
    {
      title: "AI Intern",
      company: "Gyantu",
      period: "Nov 2024 – Jan 2025",
      location: "Remote",
      description: "Built an AI-powered chatbot with Streamlit, boosting engagement by 40%.",
      achievements: [
        "Developed conversational AI using advanced language models",
        "Created intuitive UI/UX with Streamlit framework",
        "Achieved 40% increase in user engagement metrics"
      ],
      color: "purple"
    },
    {
      title: "App Developer Trainee",
      company: "Lawazia Tech",
      period: "Nov 2023 – Dec 2023",
      location: "Remote",
      description: "Created a blog app with dark mode and streamlined UI.",
      achievements: [
        "Designed and developed full-stack blog application",
        "Implemented modern dark mode interface",
        "Optimized user experience with responsive design"
      ],
      color: "cyan"
    }
  ];

  const hackathons = [
    {
      title: "Innovathon Winner",
      event: "BIT Sindri",
      position: "🏆 3rd Place",
      description: "Built an AI system to detect food freshness, logos, and text with automated conveyor monitoring in 24 hours hackathon.",
      color: "yellow"
    },
    {
      title: "HackFest'24 Finalist",
      event: "IIT ISM Dhanbad",
      position: "🥈 Finalist",
      description: "Developed a churn prediction model analyzing user sentiment and behavior for smarter business decisions and retention in 36-hour hackathon ",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "border-blue-500/20 hover:border-blue-500/40",
      purple: "border-purple-500/20 hover:border-purple-500/40",
      cyan: "border-cyan-500/20 hover:border-cyan-500/40",
      yellow: "border-yellow-500/20 hover:border-yellow-500/40",
      green: "border-green-500/20 hover:border-green-500/40"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Experience
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My journey through internships, projects, and achievements in the world of AI and technology.
          </p>
        </div>

        {/* Professional Experience */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`bg-gray-800/50 rounded-lg p-8 border ${getColorClasses(exp.color)} hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-xl text-blue-400 font-semibold">{exp.company}</p>
                  </div>
                  <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                    <div className="flex items-center text-gray-400 mb-1">
                      <Calendar size={16} className="mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <MapPin size={16} className="mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-lg mb-4">{exp.description}</p>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-400">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathons & Achievements */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Hackathons & Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hackathons.map((hackathon, index) => (
              <div 
                key={index}
                className={`bg-gray-800/50 rounded-lg p-8 border ${getColorClasses(hackathon.color)} hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 text-center`}
              >
                <Trophy className="text-yellow-400 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-white mb-2">{hackathon.title}</h3>
                <p className="text-lg text-blue-400 font-semibold mb-2">{hackathon.event}</p>
                <div className="text-2xl mb-4">{hackathon.position}</div>
                <p className="text-gray-400">{hackathon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
