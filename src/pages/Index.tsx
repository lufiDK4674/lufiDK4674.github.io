
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="w-72 h-72 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-6xl font-bold text-blue-400">
                      <img
                        src="https://i.postimg.cc/JnT9NyfL/Linked-In-Profile-UPSCALED.png"
                        alt="Divyanshu's Profile"
                        className="w-64 h-64 rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 animate-ping"></div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Divyanshu
                </span>{" "}
                👋
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in delay-300">
                I build real-world AI solutions that make a difference
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl animate-fade-in delay-500">
                Final-year CSE student passionate about Data Science, Machine Learning, 
                and creating intelligent automation that solves complex problems.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-700">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                  <Link to="/projects">
                    View My Work <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-600/20 transform hover:scale-105 transition-all duration-300">
                  <Link to="/contact">
                    Let's Connect <Download className="ml-2" size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-blue-400 mb-2">5+</div>
              <div className="text-gray-300">AI Projects</div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-purple-400 mb-2">3</div>
              <div className="text-gray-300">Internships</div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-cyan-400 mb-2">95%</div>
              <div className="text-gray-300">Model Accuracy</div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-green-400 mb-2">2</div>
              <div className="text-gray-300">Hackathon Wins</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
