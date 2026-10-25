import { ExperienceList } from "@/components/profile/ExperienceList";
import { professional } from "@/data/professional";
export default function Experience() {
  return (
    <div className="page content-width page-experience">
      <header className="page-heading">
        <h1>Engineering in practice.</h1>
        <p>AI engineering, automation and the work behind the systems.</p>
      </header>
      <section className="career-layout" aria-labelledby="professional-title">
        <h2 id="professional-title">Professional roles</h2>
        <div>
          <ExperienceList />
          <p className="overlap-note">{professional.overlapNote}</p>
        </div>
      </section>
      <section
        className="career-layout earlier-roles"
        aria-labelledby="earlier-title"
      >
        <h2 id="earlier-title">Earlier experience</h2>
        <ExperienceList earlier />
      </section>
    </div>
  );
}
