
import { Brain, BarChart3, Rocket, Code, Database, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: <Brain className="text-blue-400" size={48} />,
      title: "AI-Based Solution Development",
      description: "I build intelligent applications that solve real-world problems—from automation to prediction. Specializing in computer vision, NLP, and machine learning systems that deliver measurable business value.",
      features: [
        "Custom ML model development",
        "Computer vision systems",
        "Natural language processing",
        "Intelligent automation",
        "Predictive analytics"
      ],
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BarChart3 className="text-purple-400" size={48} />,
      title: "Data Analysis & Modeling",
      description: "From messy raw data to beautiful dashboards or predictions. I transform complex datasets into actionable insights through advanced statistical analysis and visualization.",
      features: [
        "Statistical analysis & modeling",
        "Data cleaning & preprocessing",
        "Interactive dashboard creation",
        "Business intelligence solutions",
        "Performance optimization"
      ],
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Rocket className="text-green-400" size={48} />,
      title: "End-to-End ML App Deployment",
      description: "From training to live deployment on platforms like Streamlit or Flask. I handle the complete ML pipeline including model training, optimization, and production deployment.",
      features: [
        "Model training & optimization",
        "Production deployment",
        "API development",
        "Cloud integration",
        "Performance monitoring"
      ],
      color: "green",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const additionalServices = [
    {
      icon: <Code className="text-cyan-400" size={32} />,
      title: "Custom Software Development",
      description: "Full-stack applications tailored to your specific needs",
      color: "cyan"
    },
    {
      icon: <Database className="text-yellow-400" size={32} />,
      title: "Database Design & Optimization",
      description: "Efficient data storage and retrieval solutions",
      color: "yellow"
    },
    {
      icon: <Zap className="text-red-400" size={32} />,
      title: "Process Automation",
      description: "Streamline workflows with intelligent automation",
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/5",
      purple: "border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5",
      green: "border-green-500/20 hover:border-green-500/40 hover:bg-green-500/5",
      cyan: "border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5",
      yellow: "border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5",
      red: "border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive AI and data science solutions designed to transform your business 
            through intelligent automation and data-driven insights.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-gray-800/50 rounded-lg p-8 border ${getColorClasses(service.color)} transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-center mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 flex-shrink-0`}></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div 
                key={index}
                className={`bg-gray-800/50 rounded-lg p-6 border ${getColorClasses(service.color)} transition-all duration-300 transform hover:scale-105 text-center`}
              >
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gray-800/50 rounded-lg p-8 border border-blue-500/20 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">My Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Understand</h3>
              <p className="text-gray-400 text-sm">Deep dive into your business needs and challenges</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Design</h3>
              <p className="text-gray-400 text-sm">Create tailored AI solutions with optimal architecture</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Develop</h3>
              <p className="text-gray-400 text-sm">Build and train models with rigorous testing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Deploy</h3>
              <p className="text-gray-400 text-sm">Launch solutions with ongoing support and optimization</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how AI and data science can solve your specific challenges and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
              <Link to="/contact">
                Start a Project
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-600/20 transform hover:scale-105 transition-all duration-300">
              <Link to="/projects">
                View Portfolio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
