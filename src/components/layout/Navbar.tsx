import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { professional } from "@/data/professional";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  ["Projects", "/projects"],
  ["Experience", "/experience"],
  ["Capabilities", "/skills"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navigationClose = useRef(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const query = matchMedia("(min-width: 901px)");
    const close = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" to="/">
          {professional.site.name}
          <span className="sr-only">, home</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {professional.resume.approved && professional.resume.publicPath && (
            <Button asChild className="button button-primary header-resume">
              <a
                href={professional.resume.publicPath}
                download
                aria-label="Download AI Engineer resume PDF"
              >
                Resume <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          )}
          <Sheet
            open={menuOpen}
            onOpenChange={(open) => {
              if (open) navigationClose.current = false;
              setMenuOpen(open);
            }}
          >
            <SheetTrigger asChild>
              <Button
                ref={toggleRef}
                variant="secondary"
                className="mobile-menu-trigger"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent
              className="mobile-sheet"
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                if (navigationClose.current)
                  document
                    .getElementById("main-content")
                    ?.focus({ preventScroll: true });
                else toggleRef.current?.focus();
              }}
            >
              <SheetTitle>Explore the portfolio</SheetTitle>
              <SheetDescription>
                Projects, engineering experience and direct contact.
              </SheetDescription>
              <nav aria-label="Mobile navigation">
                {navItems.map(([label, to]) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => {
                      navigationClose.current = true;
                      setMenuOpen(false);
                    }}
                  >
                    {label}
                    <ArrowRight aria-hidden="true" />
                  </NavLink>
                ))}
                {professional.resume.publicPath && (
                  <a
                    href={professional.resume.publicPath}
                    download
                    onClick={() => setMenuOpen(false)}
                  >
                    AI Engineer resume
                    <ArrowRight aria-hidden="true" />
                  </a>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
