import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { professional } from "@/data/professional";
export function EvidencePreview({ compact = false }: { compact?: boolean }) {
  const { fragmentation: f, contextBudget: b } =
    professional.documentIntelligence;
  return (
    <section
      className={`evidence-preview${compact ? " evidence-preview-compact" : ""}`}
      aria-label="Content Intelligence Engine engineering preview"
    >
      <div className="preview-heading">
        <h2>
          {compact ? (
            <Link to="/projects/document-intelligence">
              Inside Content Intelligence Engine{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            "Source to retrieval, under investigation."
          )}
        </h2>
        <p>Reconstructed diagnostic · illustrative source</p>
      </div>
      <Tabs defaultValue="fragmentation" className="preview-tabs">
        <TabsList
          aria-label="Engineering investigation"
          className="preview-tab-list"
        >
          <TabsTrigger value="fragmentation">Fragmented evidence</TabsTrigger>
          <TabsTrigger value="budget">Context budget</TabsTrigger>
        </TabsList>
        <TabsContent value="fragmentation" className="preview-panel">
          <div className="fragment-trace">
            <div className="source-sheet" aria-hidden="true">
              <div className="sheet-title">Illustrative receipt</div>
              <div className="glyph-observations">
                {"SOURCE EVIDENCE"
                  .split("")
                  .filter((x) => x !== " ")
                  .map((letter, i) => (
                    <span key={i}>{letter}</span>
                  ))}
              </div>
              <div className="sheet-row">Line item / quantity</div>
              <div className="sheet-row">Amount / total</div>
              <span className="sheet-caption">Geometry ≠ prose</span>
            </div>
            <div className="trace-stations">
              <div>
                <strong>{f.rectangles} PDFium rectangles</strong>
                <p>{f.singleCharacter} were single-character observations.</p>
              </div>
              <ArrowRight aria-hidden="true" />
              <div>
                <strong>Canonical content</strong>
                <p>
                  {f.singleCharacter} single-character paragraphs in the legacy
                  revision.
                </p>
              </div>
              <ArrowRight aria-hidden="true" />
              <div>
                <strong>{f.legacyChunks} legacy search chunks</strong>
                <p>
                  {f.singleCharacter} were single-character chunks, with vector
                  links.
                </p>
              </div>
            </div>
          </div>
          <p className="diagnostic-conclusion">
            {compact
              ? "I traced fragmentation across extraction, canonical content and the legacy index. The diagnosis does not establish a fix on the original receipt."
              : f.outcome}
          </p>
        </TabsContent>
        <TabsContent value="budget" className="preview-panel">
          <div className="budget-layout">
            <div className="span-budget">
              <div className="budget-label">
                <strong>{b.sourceSpans} source spans</strong>
                <span>{b.readerBudget}-span reader budget</span>
              </div>
              <div className="span-blocks" aria-hidden="true">
                {Array.from({ length: b.sourceSpans }, (_, i) => (
                  <span
                    key={i}
                    className={i >= b.readerBudget ? "beyond-budget" : ""}
                  />
                ))}
              </div>
              <p>
                A separate invoice fixture’s {b.tableMembers}-member table was
                relevant, but its complete context exceeded the reader contract.
              </p>
            </div>
            <div className="bounded-view">
              <strong>Keep the original table.</strong>
              <p>
                Offer source-backed label/value views bounded to{" "}
                {b.associationSpans} spans, retaining the original evidence.
              </p>
              <span className="view-relationship">
                Original evidence <ArrowRight aria-hidden="true" /> Bounded view
              </span>
            </div>
          </div>
          <p className="diagnostic-conclusion">
            Search relevance, source expandability and downstream grounded use
            are separate verification boundaries.
          </p>
        </TabsContent>
      </Tabs>
    </section>
  );
}
