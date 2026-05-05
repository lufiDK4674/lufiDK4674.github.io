
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { name: "About", path: "/about" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  const socials = [
    { icon: <Mail size={14} />, href: "mailto:work.kumardivyanshu@gmail.com", label: "Email" },
    { icon: <Linkedin size={14} />, href: "https://www.linkedin.com/in/divyanshu-kumar-d4674k", label: "LinkedIn" },
    { icon: <Github size={14} />, href: "https://github.com/lufiDK4674", label: "GitHub" },
  ];

  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-6">
        {/* Brand + nav */}
        <div className="flex items-center gap-5 min-w-0">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold" style={{ fontSize: 9 }}>D</span>
            </div>
            <span className="text-xs font-semibold text-gray-400">Divyanshu Kumar</span>
          </div>
          <nav className="hidden sm:flex items-center gap-4">
            {links.map((l) => (
              <Link key={l.name} to={l.path} className="text-xs text-gray-600 hover:text-gray-300 transition-colors duration-200">
                {l.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: socials + copyright */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-gray-600 hover:text-gray-300 transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
          <span className="text-xs text-gray-700 pl-2 border-l border-white/10">
            &copy; {new Date().getFullYear()} DK
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

