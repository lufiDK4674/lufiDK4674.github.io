import { Link } from "react-router-dom";
import { Portrait } from "../components/Portrait";
import { professional } from "../data/professional";
import { ResumeDownload } from "../components/ResumeDownload";
export default function About() {
  return (
    <div className="page content-width">
      <header className="page-heading">
        <h1>About {professional.site.name.split(" ")[0]}.</h1>
        <p>{professional.about.introduction}</p>
      </header>
      <section className="about-opening" aria-labelledby="focus-title">
        <Portrait className="about-portrait" />
        <div className="prose-section">
          <h2 id="focus-title">From hardware to AI workflows.</h2>
          {professional.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>I’m based in {professional.site.city}.</p>
          <div className="hero-actions">
            <ResumeDownload />
            <Link className="text-link" to="/experience">
              Explore my experience
            </Link>
          </div>
        </div>
      </section>
      <section className="education-panel" aria-labelledby="education-title">
        <h2 id="education-title">Education.</h2>
        <div>
          <p className="education-degree">{professional.education.degree}</p>
          <p>
            {professional.education.institution} ·{" "}
            {professional.education.startYear}–{professional.education.endYear}
          </p>
          <p>CGPA {professional.education.cgpa}</p>
        </div>
      </section>
      <section className="prose-section" aria-labelledby="recognition-title">
        <h2 id="recognition-title">Selected recognition.</h2>
        <ul className="recognition-list">
          {professional.achievements.map((item) => (
            <li key={item.event}>
              <strong>{item.title}</strong> · {item.event}
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>
      {professional.researchProject.visible &&
        professional.researchProject.publicationStatus && (
          <section
            className="prose-section section-block"
            aria-labelledby="research-title"
          >
            <h2 id="research-title">Research.</h2>
            <p>
              {professional.researchProject.title} —{" "}
              {professional.researchProject.publicationStatus}
            </p>
          </section>
        )}
    </div>
  );
}
