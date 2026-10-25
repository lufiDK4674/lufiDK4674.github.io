import { Link } from "react-router-dom";
import { professional } from "@/data/professional";

export default function Services() {
  return (
    <div className="page content-width narrow-page">
      <header className="page-heading">
        <h1>{professional.services.title}</h1>
        <p>{professional.services.description}</p>
      </header>
      <section className="prose-section" aria-labelledby="topics-title">
        <h2 id="topics-title">Topics reflected in my work</h2>
        <ul className="service-topic-list">
          {professional.services.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>
      <p className="section-end-link">
        <Link className="text-link" to="/projects">
          Review the project case studies
        </Link>
      </p>
    </div>
  );
}
