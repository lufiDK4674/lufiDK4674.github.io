import { Link, useLocation } from "react-router-dom";
import { professional } from "@/data/professional";
export function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="site-footer content-width">
      {pathname !== "/contact" && (
        <div className="footer-invitation">
          <h2>Let’s talk AI engineering.</h2>
          <div>
            <a href={`mailto:${professional.site.email}`}>
              {professional.site.email}
            </a>
            <p>{professional.site.city}</p>
            <div className="footer-social">
              <a
                href={professional.site.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
              {professional.site.linkedin && (
                <a
                  href={professional.site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <Link to="/contact">Contact form</Link>
            </div>
          </div>
        </div>
      )}
      <div className="footer-bottom">
        <Link className="footer-name" to="/">
          {professional.site.name}
        </Link>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <p>
          © {new Date().getFullYear()} · {professional.site.city}
        </p>
      </div>
    </footer>
  );
}
