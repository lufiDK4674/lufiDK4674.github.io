import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Portrait } from "../components/Portrait";
import { ProjectCard } from "../components/ProjectCard";
import { ResumeDownload } from "../components/ResumeDownload";
import { ExperienceList } from "../components/ExperienceList";
import { Button } from "../components/ui/button";
import { professional } from "../data/professional";
export default function Index() {
  const featured = professional.projects.filter((project) => project.featured);
  const current = professional.experience.find((role) => role.end === null);
  return (
    <div className="page-home content-width">
      <section className="signal-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <h1 id="home-title">{professional.site.name}.</h1>
          <p className="hero-specialization">{professional.site.headline}</p>
          <p className="hero-summary">{professional.site.heroSummary}</p>
          <div className="hero-actions">
            <Button asChild className="button button-primary">
              <Link to="/projects">
                Explore projects <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <ResumeDownload compact />
          </div>
          <p className="hero-current-role">
            Currently {current?.title} at {current?.organization}.
          </p>
        </div>
        <figure className="hero-portrait-composition">
          <Portrait className="hero-portrait" hero />
          <figcaption>
            <span>{professional.site.city}</span>
          </figcaption>
        </figure>
      </section>
      <section
        className="section-block home-featured"
        aria-labelledby="featured-title"
      >
        <div className="section-heading-row">
          <h2 id="featured-title">Selected work.</h2>
          <Link className="text-link" to="/projects">
            All projects <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <section
        className="section-block engineering-approach"
        aria-labelledby="approach-title"
      >
        <h2 id="approach-title">How I approach the work.</h2>
        <div className="approach-observations">
          {professional.engineeringApproach.map((item) => {
            const project = professional.projects.find(
              (project) => project.id === item.projectId,
            )!;
            return (
              <div className="approach-observation" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link className="text-link" to={project.route!}>
                  Explore {project.title}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      <section
        className="section-block home-experience"
        aria-labelledby="experience-title"
      >
        <div>
          <h2 id="experience-title">Career snapshot.</h2>
          <Link className="text-link" to="/experience">
            Full experience <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div>
          <ExperienceList compact />
          <p className="overlap-note">{professional.overlapNote}</p>
        </div>
      </section>
      <p className="section-end-link capability-summary">
        Explore the tools and evidence behind the work.{" "}
        <Link className="text-link" to="/skills">
          Engineering capabilities <ArrowRight aria-hidden="true" />
        </Link>
      </p>
    </div>
  );
}
