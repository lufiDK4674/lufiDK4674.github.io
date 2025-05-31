
import { Code, Database, Brain, Cpu, Globe, Wrench } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="text-blue-400" size={32} />,
      skills: ["C", "C++", "Python"],
      color: "blue"
    },
    {
      title: "ML/Data Science",
      icon: <Brain className="text-purple-400" size={32} />,
      skills: ["Regression", "Classification", "Clustering", "Deep Learning", "NLP"],
      color: "purple"
    },
    {
      title: "Libraries & Frameworks",
      icon: <Database className="text-cyan-400" size={32} />,
      skills: ["Scikit-learn", "TensorFlow", "OpenCV", "Pandas", "NumPy", "YOLOv8"],
      color: "cyan"
    },
    {
      title: "Development Platforms",
      icon: <Cpu className="text-green-400" size={32} />,
      skills: ["Linux", "GitHub", "Kaggle", "Jupyter Notebook", "Power BI"],
      color: "green"
    },
    {
      title: "Web Technologies",
      icon: <Globe className="text-yellow-400" size={32} />,
      skills: ["Streamlit", "Flask", "HTML/CSS", "JavaScript"],
      color: "yellow"
    },
    {
      title: "Hardware & IoT",
      icon: <Wrench className="text-red-400" size={32} />,
      skills: ["NodeMCU", "IR Sensors", "Arduino", "Robotics"],
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10",
      purple: "border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10",
      cyan: "border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/10",
      green: "border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10",
      yellow: "border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/10",
      red: "border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getSkillBadgeColor = (color: string) => {
    const colors = {
      blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      green: "bg-green-500/20 text-green-300 border-green-500/30",
      yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      red: "bg-red-500/20 text-red-300 border-red-500/30"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across various domains of AI, 
            software development, and emerging technologies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className={`bg-gray-800/50 rounded-lg p-8 border ${getColorClasses(category.color)} transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center mb-6">
                {category.icon}
                <h3 className="text-xl font-bold text-white ml-3">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getSkillBadgeColor(category.color)} hover:scale-110 transition-transform duration-200`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skill Proficiency Bars */}
        <div className="bg-gray-800/50 rounded-lg p-8 border border-blue-500/20">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Proficiency Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">Python</span>
                  <span className="text-blue-400">95%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">Machine Learning</span>
                  <span className="text-purple-400">90%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">Deep Learning</span>
                  <span className="text-cyan-400">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">Data Analysis</span>
                  <span className="text-green-400">88%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: '88%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">C/C++</span>
                  <span className="text-yellow-400">80%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">Web Development</span>
                  <span className="text-red-400">75%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
