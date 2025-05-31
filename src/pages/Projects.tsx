import { useState } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      title: "Smart Vision Quality Control System",
      description: "AI-based system for freshness and logo detection with conveyor automation using computer vision and machine learning.",
      technologies: ["Python", "OpenCV", "YOLOv8", "TensorFlow", "Arduino"],
      category: "AI",
      image: "placeholder",
      github: "https://github.com/lufiDK4674/Smart-Vision_Quality-Testing-System",
      demo: "#",
      featured: true
    },
    {
      title: "Fake News Detection",
      description: "95% accurate model using TF-IDF and Passive Aggressive Classifier to identify and classify fake news articles.",
      technologies: ["Python", "NLP", "Scikit-learn", "TF-IDF", "Pandas"],
      category: "NLP",
      image: "placeholder",
      github: "https://github.com/lufiDK4674/DataScience_Techinterex/tree/main/TASK%204",
      demo: "#",
      featured: true
    },
    {
      title: "Unified Customer Insights",
      description: "Sentiment analysis and churn prediction model with 93% precision for comprehensive customer analytics.",
      technologies: ["Python", "Machine Learning", "Pandas", "Scikit-learn", "Streamlit"],
      category: "AI",
      image: "placeholder",
      github: "https://github.com/lufiDK4674/Unified_Customer_Insights#",
      demo: "#",
      featured: true
    },
    {
      title: "Retail Sales Analysis",
      description: "Comprehensive data analysis and visualization of retail sales patterns with interactive dashboards.",
      technologies: ["Python", "Pandas", "Plotly", "Power BI", "SQL"],
      category: "Data Science",
      image: "placeholder",
      github: "https://github.com/lufiDK4674/DataScience_Techinterex/tree/main/TASK%207",
      demo: "#",
      featured: false
    },
    {
      title: "Movie Recommender System",
      description: "Collaborative filtering-based recommendation system with content-based filtering for personalized movie suggestions.",
      technologies: ["Python", "Machine Learning", "Pandas", "Streamlit"],
      category: "AI",
      image: "placeholder",
      github: "https://github.com/lufiDK4674/DataScience_Techinterex/tree/main/TASK%201",
      demo: "#",
      featured: false
    },
    {
      title: "Swarm Robotics",
      description: "Multi-robot coordination system using NodeMCU and IR sensors for autonomous swarm behavior.",
      technologies: ["C++", "NodeMCU", "IR Sensors", "Arduino IDE"],
      category: "Robotics",
      image: "placeholder",
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Chatbot App using LLaMA 3.2",
      description: "Intelligent conversational AI application built with LLaMA 3.2 and modern web technologies.",
      technologies: ["Python", "LLaMA 3.2", "Streamlit", "NLP"],
      category: "NLP",
      image: "placeholder",
      github: "#",
      demo: "#",
      featured: false
    }
  ];

  const categories = ["All", "AI", "NLP", "Data Science", "Robotics"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      "AI": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "NLP": "bg-purple-500/20 text-purple-300 border-purple-500/30",
      "Data Science": "bg-green-500/20 text-green-300 border-green-500/30",
      "Robotics": "bg-red-500/20 text-red-300 border-red-500/30"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A collection of AI-powered solutions, data science projects, and innovative applications 
            that showcase my technical expertise and problem-solving abilities.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className={`transition-all duration-300 ${
                activeFilter === category 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "border-blue-500/30 text-blue-400 hover:bg-blue-600/20"
              }`}
            >
              <Filter size={16} className="mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects
              .filter(project => activeFilter === "All" || project.category === activeFilter)
              .map((project, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 transform hover:scale-105 group"
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-600 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {project.title.split(' ').map(word => word[0]).join('').slice(0, 3)}
                  </div>
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-600/20"
                      asChild
                    >
                      <a
                        href={project.github && project.github !== "#" ? project.github : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={project.github && project.github !== "#" ? 0 : -1}
                        aria-disabled={project.github === "#" ? "true" : undefined}
                        className={project.github === "#" ? "pointer-events-none opacity-50" : ""}
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <a
                        href={project.demo && project.demo !== "#" ? project.demo : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={project.demo && project.demo !== "#" ? 0 : -1}
                        aria-disabled={project.demo === "#" ? "true" : undefined}
                        className={project.demo === "#" ? "pointer-events-none opacity-50" : ""}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects
              .filter(project => activeFilter === "All" || project.category === activeFilter)
              .map((project, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-600/20"
                    asChild
                  >
                    <a
                      href={project.github && project.github !== "#" ? project.github : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={project.github && project.github !== "#" ? 0 : -1}
                      aria-disabled={project.github === "#" ? "true" : undefined}
                      className={project.github === "#" ? "pointer-events-none opacity-50" : ""}
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    asChild
                  >
                    <a
                      href={project.demo && project.demo !== "#" ? project.demo : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={project.demo && project.demo !== "#" ? 0 : -1}
                      aria-disabled={project.demo === "#" ? "true" : undefined}
                      className={project.demo === "#" ? "pointer-events-none opacity-50" : ""}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
