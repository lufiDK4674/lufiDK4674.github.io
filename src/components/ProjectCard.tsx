import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProfessionalContent } from "../data/professional";
type Project = ProfessionalContent["projects"][number];
export function ProjectCard({
  project,
}: {
  project: Project;
  compact?: boolean;
}) {
  const isDocument = project.id === "document-intelligence";
  const isVision = project.id === "smart-vision-qc";
  const labels = isDocument
    ? ["Source evidence", "Search representation", "Bounded context"]
    : ["Report", "Code context", "Patch proposal"];
  return (
    <article
      id={`project-${project.id}`}
      className={`project-card${project.featured ? " is-featured" : " archive-project"}`}
    >
      {project.featured && (
        <figure
          className="project-sketch"
          aria-label={`${project.title} conceptual workflow`}
        >
          {isVision ? (
            <svg
              className="conveyor-sketch"
              viewBox="0 0 360 126"
              role="img"
              aria-label="Conceptual conveyor monitoring with camera, freshness, logo and text tasks"
            >
              <g fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="148" y="8" width="64" height="32" rx="5" />
                <circle cx="180" cy="24" r="9" />
                <path d="M167 44 117 76M193 44 243 76M32 92H328" />
                <rect x="17" y="83" width="326" height="27" rx="13" />
                {[42, 88, 134, 180, 226, 272, 318].map((x) => (
                  <circle key={x} cx={x} cy="97" r="6" />
                ))}
                <path d="M65 83V60h36v23M162 83V60h36v23M259 83V60h36v23" />
              </g>
            </svg>
          ) : (
            <div>
              {labels.map((label, index) => (
                <span className="sketch-step" key={label}>
                  {index > 0 && <ArrowRight aria-hidden="true" />}
                  <span>{label}</span>
                </span>
              ))}
            </div>
          )}
          <figcaption>
            {isVision
              ? "Conveyor monitoring · conceptual overview"
              : isDocument
                ? "Source-to-retrieval design"
                : "Implemented agent workflow"}
          </figcaption>
        </figure>
      )}
      <div className="project-card-copy">
        <h3>{project.title}</h3>
        <p className="project-category">{project.category}</p>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label={`${project.title} technologies`}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {project.achievement && (
          <p className="project-achievement">{project.achievement}</p>
        )}
      </div>
      <div className="project-card-actions">
        {project.route ? (
          <Link className="text-link" to={project.route}>
            Read case study<span className="sr-only"> for {project.title}</span>{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : project.evidence.repository ? (
          <a
            className="text-link"
            href={project.evidence.repository}
            target="_blank"
            rel="noreferrer"
          >
            View repository <ArrowUpRight aria-hidden="true" />
            <span className="sr-only">
              {" "}
              for {project.title} (opens in a new tab)
            </span>
          </a>
        ) : (
          <span className="link-status">{project.evidence.accessNote}</span>
        )}
      </div>
    </article>
  );
}
