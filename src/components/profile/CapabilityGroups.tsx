import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { professional } from "@/data/professional";

export function CapabilityGroups() {
  return (
    <div className="capability-list">
      {professional.capabilityGroups.map((group, index) => (
        <section
          className="capability-group"
          key={group.title}
          aria-labelledby={`capability-${index}`}
        >
          <div className="capability-copy">
            <h2 id={`capability-${index}`}>{group.title}</h2>
            <p>{group.description}</p>
          </div>
          <div>
            <ul className="capability-items">
              {group.tools.map((tool) => (
                <li key={tool}>
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
            <div
              className="capability-evidence"
              aria-label={`Evidence for ${group.title}`}
            >
              {group.projectIds.map((id) => {
                const project = professional.projects.find(
                  (project) => project.id === id,
                )!;
                return project.evidence.repository ? (
                  <a
                    className="text-link"
                    key={id}
                    href={project.evidence.repository}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.title}
                    <ArrowUpRight aria-hidden="true" />
                    <span className="sr-only">
                      {" "}
                      repository (opens in a new tab)
                    </span>
                  </a>
                ) : (
                  <Link
                    className="text-link"
                    key={id}
                    to={project.route ?? `/projects?project=${project.id}`}
                  >
                    {project.title}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
