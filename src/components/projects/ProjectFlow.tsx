type Step = { title: string; detail: string };

export function ProjectFlow({
  label,
  note,
  steps,
}: {
  label: string;
  note: string;
  steps: Step[];
}) {
  return (
    <figure className="workflow-figure">
      <figcaption>
        <strong>{label}</strong>
        <span>{note}</span>
      </figcaption>
      <ol className="workflow-list">
        {steps.map((step, index) => (
          <li className="workflow-step" key={`${step.title}-${index}`}>
            <span className="workflow-connector" aria-hidden="true" />
            <div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
