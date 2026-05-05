
import { useState } from "react";
import { Mail, Linkedin, Github, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import ResumeDownload from "@/components/ResumeDownload";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  useScrollReveal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await emailjs.send(
        'service_9xjccm4',
        'template_cytbjeu',
        { name: formData.name, email: formData.email, from_message: formData.message },
        'JPpzCKyX5fHr-cAYV'
      );
      console.log('Email sent:', result.text);
      toast({ title: "Message sent! 🎉", description: "I'll get back to you within 24 hours." });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Email sending failed:', error.text || error.message);
      toast({ title: "Oops! Something went wrong.", description: "Please try again or email me directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { icon: <Mail size={18} className="text-blue-400" />, label: "Email", value: "work.kumardivyanshu@gmail.com", href: "mailto:work.kumardivyanshu@gmail.com" },
    { icon: <Linkedin size={18} className="text-blue-500" />, label: "LinkedIn", value: "divyanshu-kumar-d4674k", href: "https://www.linkedin.com/in/divyanshu-kumar-d4674k" },
    { icon: <Github size={18} className="text-gray-300" />, label: "GitHub", value: "lufiDK4674", href: "https://github.com/lufiDK4674" },
    { icon: <MapPin size={18} className="text-red-400" />, label: "Location", value: "Jharkhand / Gandhinagar, India", href: null },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-xs font-semibold tracking-widest text-green-400 uppercase mb-3">Let's Talk</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Contact
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Open to full-time roles, freelance projects, and interesting collaborations. Let's build something great.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-6 reveal-left">
            {/* Contact links */}
            <div className="glass rounded-2xl p-6 border border-white/10 space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">Reach me at</h3>
              {contactLinks.map((c, i) =>
                c.href ? (
                  <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{c.label}</p>
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{c.value}</p>
                    </div>
                  </a>
                ) : (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{c.label}</p>
                      <p className="text-sm text-gray-300">{c.value}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Availability */}
            <div className="glass rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-2 mb-4">
                <span className="status-dot" />
                <h3 className="text-sm font-semibold text-white">Currently Available</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Full-time AI/ML roles", "Freelance automation projects", "Technical consulting", "Research collaborations"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
                <Clock size={12} />
                Typically responds within 24 hours
              </div>
            </div>

            {/* Resume download */}
            <div className="glass rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-sm font-semibold text-white mb-2">Want a tailored resume?</h3>
              <p className="text-xs text-gray-400 mb-4">Pick the version that matches your role.</p>
              <ResumeDownload variant="hero" upward={true} />
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 reveal-right">
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Name *</label>
                  <Input
                    id="name" name="name" type="text" required
                    value={formData.name} onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl h-11"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email *</label>
                  <Input
                    id="email" name="email" type="email" required
                    value={formData.email} onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl h-11"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Message *</label>
                  <Textarea
                    id="message" name="message" required
                    value={formData.message} onChange={handleChange}
                    rows={6}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none rounded-xl"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 rounded-xl font-semibold"
                >
                  {isSubmitting ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2" />Sending...</>
                  ) : (
                    <><Send size={16} className="mr-2" />Send Message</>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


export default Contact;
