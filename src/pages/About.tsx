
import { GraduationCap, Target, Users, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate about building AI-driven solutions that bridge the gap between 
            innovative technology and real-world applications.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Bio Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">My Story</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a CSE student passionate about AI-driven automation. I specialize in 
              building end-to-end ML solutions that solve real-world problems—be it smart 
              vision systems or customer churn prediction.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              With a strong grip on Python, C++, and machine learning libraries, I aim to 
              contribute to the tech I love using. My journey has been driven by curiosity 
              and the desire to create intelligent systems that make a meaningful impact.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              From winning hackathons to delivering real-world data science projects, 
              I'm constantly pushing the boundaries of what's possible with AI and automation.
            </p>
          </div>

          {/* Profile Image and Stats */}
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-4xl font-bold text-blue-400">
                    <img
                      src="https://i.postimg.cc/JnT9NyfL/Linked-In-Profile-UPSCALED.png"
                      alt="Divyanshu's Profile"
                      className="w-55 h-55 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Education</h2>
          <div className="bg-gray-800/50 rounded-lg p-8 border border-blue-500/20">
            <div className="flex items-center space-x-4">
              <GraduationCap className="text-blue-400" size={48} />
              <div>
                <h3 className="text-2xl font-bold text-white">B.Tech in Computer Science Engineering</h3>
                <p className="text-gray-400 text-lg">Final Year Student</p>
                <p className="text-gray-500">Specialization in AI/ML and Data Science</p>
              </div>
            </div>
          </div>
        </div>

        {/* Soft Skills Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Core Strengths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-blue-500/20 text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <Target className="text-blue-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">Problem Solving</h3>
              <p className="text-gray-400">Analytical thinking to break down complex challenges</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20 text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <Lightbulb className="text-purple-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">Critical Thinking</h3>
              <p className="text-gray-400">Data-driven decision making and solution optimization</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20 text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <Users className="text-cyan-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">Team Collaboration</h3>
              <p className="text-gray-400">Effective communication and cross-functional teamwork</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-green-500/20 text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-green-400 mx-auto mb-4 text-5xl">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Adaptability</h3>
              <p className="text-gray-400">Quick learning and adaptation to new technologies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
