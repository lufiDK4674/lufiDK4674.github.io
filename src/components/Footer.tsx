
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-blue-500/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400">
              © 2024 Divyanshu Kumar. Built with passion and AI.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="mailto:work.kumardivyanshu@gmail.com"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Mail size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
