import { useId, useState, type KeyboardEvent } from "react";
import {
  ShieldCheck,
  ScanText,
  Layers3,
  Workflow,
  Search,
  MessagesSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { professional } from "@/data/professional";
const icons = [
  ShieldCheck,
  ScanText,
  Layers3,
  Workflow,
  Search,
  MessagesSquare,
];
const desktopPaths = [
  "M17 25H50",
  "M50 25H83",
  "M83 25V50H17V75",
  "M17 75H50",
  "M50 75H83",
];
const mobilePaths = [
  "M25 17H75",
  "M75 17V33H25V50",
  "M25 50H75",
  "M75 50V67H25V83",
  "M25 83H75",
];
export function DocumentArchitecture() {
  const phases = professional.documentIntelligence.phases;
  const [selected, setSelected] = useState(0);
  const id = useId();
  const phase = phases[selected];
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % phases.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index - 1 + phases.length) % phases.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = phases.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setSelected(next);
      document.getElementById(`${id}-phase-${next}`)?.focus();
    }
  }
  return (
    <section className="architecture" aria-labelledby={`${id}-title`}>
      <div className="architecture-heading">
        <h2 id={`${id}-title`}>Architecture around evidence.</h2>
        <p>
          24-stage design · {professional.documentIntelligence.modules} logical
          modules
        </p>
      </div>
      <p className="architecture-intro">
        Select a phase to inspect its inputs, outputs and verification. The
        design map does not mark every stage complete.
      </p>
      <div
        className="architecture-map"
        role="group"
        aria-label="Architecture phases"
      >
        {[desktopPaths, mobilePaths].map((paths, variant) => (
          <svg
            key={variant}
            className={`architecture-links ${variant ? "links-mobile" : "links-desktop"}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {paths.map((path, index) => (
              <path
                key={path}
                d={path}
                className={
                  selected === index || selected === index + 1
                    ? "relationship-selected"
                    : ""
                }
              />
            ))}
          </svg>
        ))}
        {phases.map((item, index) => {
          const Icon = icons[index];
          return (
            <Button
              key={item.id}
              id={`${id}-phase-${index}`}
              variant="ghost"
              className="architecture-node"
              aria-pressed={selected === index}
              aria-controls={`${id}-detail`}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => navigate(event, index)}
            >
              <Icon aria-hidden="true" />
              <span>
                <strong>{item.title}</strong>
                <small>
                  {item.steps.length === 1
                    ? `Stage ${item.steps[0].number}`
                    : `Stages ${item.steps[0].number}–${item.steps[item.steps.length - 1].number}`}
                </small>
              </span>
            </Button>
          );
        })}
      </div>
      <div
        id={`${id}-detail`}
        className="architecture-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <h3>{phase.title}</h3>
        <dl>
          <div>
            <dt>Input</dt>
            <dd>{phase.input}</dd>
          </div>
          <div>
            <dt>Output</dt>
            <dd>{phase.output}</dd>
          </div>
          <div>
            <dt>Verification</dt>
            <dd>{phase.verification}</dd>
          </div>
        </dl>
      </div>
      <Accordion
        type="multiple"
        className="phase-appendix"
        aria-label="All architecture stages and verification"
      >
        {phases.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>
              {item.title}
              <span className="stage-count">
                {item.steps.length}{" "}
                {item.steps.length === 1 ? "stage" : "stages"}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Input:</strong> {item.input}
              </p>
              <p>
                <strong>Output:</strong> {item.output}
              </p>
              <p>
                <strong>Verification:</strong> {item.verification}
              </p>
              <ol start={item.steps[0].number}>
                {item.steps.map((step) => (
                  <li key={step.number} value={step.number}>
                    {step.title}
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
