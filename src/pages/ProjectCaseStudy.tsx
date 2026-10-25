import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProjectFlow } from "../components/ProjectFlow";
import { EvidencePreview } from "../components/EvidencePreview";
import { DocumentArchitecture } from "../components/DocumentArchitecture";
import { Button } from "../components/ui/button";
import { professional } from "../data/professional";
import NotFound from "./NotFound";
export default function ProjectCaseStudy() {
  const { projectId } = useParams();
  const project = professional.projects.find(
    (item) => item.id === projectId && item.route,
  );
  if (!project) return <NotFound />;
  const isDocument = project.id === "document-intelligence";
  const {
    fragmentation: f,
    contextBudget: b,
    verification: v,
  } = professional.documentIntelligence;
  return (
    <article
      className={`page content-width case-study${isDocument ? " case-document" : ""}`}
    >
      <p className="case-back">
        <Link className="text-link" to="/projects">
          <ArrowLeft aria-hidden="true" />
          Selected projects
        </Link>
      </p>
      <header className="case-heading">
        <div>
          <h1>{project.title}</h1>
          <p className="case-proposition">
            {isDocument
              ? professional.documentIntelligence.proposition
              : project.summary}
          </p>
          {!isDocument && (
            <ul className="tag-list" aria-label="Project technologies">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="case-opening">
          <h2>The problem.</h2>
          <p>{project.problem}</p>
          <h2>My role.</h2>
          <p>{project.contribution}</p>
        </div>
      </header>
      {isDocument ? (
        <>
          <div className="case-preview">
            <EvidencePreview />
          </div>
          <ul className="tag-list" aria-label="Project technologies">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <DocumentArchitecture />
          <section
            className="case-section"
            aria-labelledby="fragmentation-title"
          >
            <h2 id="fragmentation-title">Fragmented evidence.</h2>
            <div className="case-two-column">
              <p>
                I diagnosed a retrieval-quality defect by tracing a receipt
                across {f.rectangles} PDFium text rectangles, canonical content
                and {f.legacyChunks} legacy search chunks. {f.singleCharacter}{" "}
                observations were single characters; the legacy canonical
                revision also contained {f.singleCharacter} single-character
                paragraphs, within {f.canonicalElements} elements.
              </p>
              <p>
                Those same fragments became {f.singleCharacter} vector-linked
                search chunks. PDFium geometry can be valid while its treatment
                as independent searchable prose is not useful. I isolated
                extraction granularity and legacy per-unit indexing as separate
                correctness boundaries.
              </p>
            </div>
          </section>
          <section className="case-section" aria-labelledby="budget-title">
            <h2 id="budget-title">Context that fits.</h2>
            <div className="case-two-column">
              <p>{b.finding}</p>
              <p>
                The original table remained intact. Where valid, ordinary chunks
                stayed within the reader limit; {b.associationSpans}-span
                label/value association views offered a bounded retrieval
                alternative. Source references preserved the path back to the
                original evidence.
              </p>
            </div>
          </section>
          <section
            className="case-section"
            aria-labelledby="verification-title"
          >
            <h2 id="verification-title">Verification and result.</h2>
            <div className="case-result">
              <div>
                <strong>
                  {v.passed}/{v.total} structural checks passed
                </strong>
                <p>{v.scope}</p>
              </div>
              <div>
                <p>{v.result}</p>
                <p>{v.providerResult}</p>
                <p className="privacy-note">
                  {professional.documentIntelligence.sourceNote}
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="case-section" aria-labelledby="workflow-title">
            <h2 id="workflow-title">Report to proposed patch.</h2>
            {project.flow && project.flowLabel && project.flowNote && (
              <ProjectFlow
                label={project.flowLabel}
                note={project.flowNote}
                steps={project.flow}
              />
            )}
          </section>
          <section className="case-section" aria-labelledby="validation-title">
            <h2 id="validation-title">Validation and evaluation.</h2>
            <p>{project.validation}</p>
          </section>
        </>
      )}
      <section className="case-section" aria-labelledby="tradeoffs-title">
        <h2 id="tradeoffs-title">
          {isDocument
            ? "Engineering trade-offs."
            : "Contracts, tools and recovery."}
        </h2>
        <div className="engineering-note-list">
          {project.engineeringNotes?.map((note) => (
            <div className="engineering-note" key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.detail}</p>
            </div>
          ))}
        </div>
      </section>
      {!isDocument && project.constraints && (
        <section className="case-section" aria-labelledby="constraints-title">
          <h2 id="constraints-title">Correctness boundaries.</h2>
          <ul className="constraint-list">
            {project.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
      <p className="status-note">{project.status}</p>
      <section className="case-evidence" aria-labelledby="evidence-title">
        <div>
          <h2 id="evidence-title">Project evidence.</h2>
          <p>{project.evidence.accessNote}</p>
        </div>
        <div className="evidence-actions">
          {project.evidence.repository && (
            <Button
              asChild
              variant="secondary"
              className="button button-secondary"
            >
              <a
                href={project.evidence.repository}
                target="_blank"
                rel="noreferrer"
              >
                Open repository
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          )}
          {project.evidence.demo && (
            <Button
              asChild
              variant="secondary"
              className="button button-secondary"
            >
              <a href={project.evidence.demo} target="_blank" rel="noreferrer">
                Open demo<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          )}
          <Button
            asChild
            variant="secondary"
            className="button button-secondary"
          >
            <Link to="/contact">Discuss the engineering</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
