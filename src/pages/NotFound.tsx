import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page content-width narrow-page not-found">
      <h1>Page not found</h1>
      <p>
        The link may have changed. The project index and main sections are
        available here.
      </p>
      <Link className="button button-primary" to="/projects">
        Browse projects
      </Link>
    </div>
  );
}
