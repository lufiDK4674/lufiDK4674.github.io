import { HashRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Skills from "@/pages/Skills";
import Projects from "@/pages/Projects";
import ProjectCaseStudy from "@/pages/ProjectCaseStudy";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import { PageMeta } from "@/components/layout/PageMeta";
import { SkipLink } from "@/components/layout/SkipLink";
import { useRouteScroll } from "@/hooks/use-route-scroll";

function AppShell() {
  useRouteScroll();

  return (
    <>
      <PageMeta />
      <SkipLink />
      <Navbar />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectCaseStudy />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppShell />
    </HashRouter>
  );
}
