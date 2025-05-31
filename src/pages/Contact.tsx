
import { useState } from "react";
import { Mail, Linkedin, Github, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        'service_9xjccm4',       // ✅ Your Service ID
        'template_cytbjeu',      // ✅ Your Template ID
        {
          name: formData.name,
          email: formData.email,
          from_message: formData.message,
        },
        'JPpzCKyX5fHr-cAYV'      // ✅ Your Public Key
      );

      console.log('Email sent:', result.text);

      toast({
        title: "Message sent successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Email sending failed:', error.text || error.message);

      toast({
        title: "Oops! Something went wrong 😢",
        description: "Please try again later or check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="text-blue-400" size={24} />,
      title: "Email",
      value: "work.kumardivyanshu@gmail.com",
      link: "mailto:work.kumardivyanshu@gmail.com"
    },
    {
      icon: <Linkedin className="text-blue-600" size={24} />,
      title: "LinkedIn",
      value: "Connect with me",
      link: "https://www.linkedin.com/in/divyanshu-kumar-d4674k"
    },
    {
      icon: <Github className="text-gray-400" size={24} />,
      title: "GitHub",
      value: "Check out my code",
      link: "https://github.com/lufiDK4674"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to discuss your next AI project or just want to chat about technology? 
            I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Whether you're looking to build an AI-powered solution, need help with data analysis, 
                or want to collaborate on an exciting project, I'm always open to new opportunities 
                and interesting conversations.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="mr-4 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{info.title}</h3>
                    <p className="text-gray-400 text-sm">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-3">Available for:</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Freelance AI/ML projects
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Full-time opportunities
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Technical consultations
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  Collaboration & partnerships
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/50 rounded-lg p-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  placeholder="Tell me about your project, ideas, or just say hello..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-center">
                I typically respond within 24 hours. Looking forward to connecting with you!
              </p>
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">24h</div>
              <div className="text-gray-400 text-sm">Response Time</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">5+</div>
              <div className="text-gray-400 text-sm">Projects Delivered</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">95%</div>
              <div className="text-gray-400 text-sm">Client Satisfaction</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/20">
              <div className="text-2xl font-bold text-cyan-400">∞</div>
              <div className="text-gray-400 text-sm">Learning Mindset</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
