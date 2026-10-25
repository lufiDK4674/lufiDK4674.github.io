import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { professional } from "@/data/professional";
export default function Projects() {
  const [params] = useSearchParams();
  const requestedProject = professional.projects.find(
    (project) => project.id === params.get("project") && !project.featured,
  );
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState(requestedProject?.title ?? "");
  useEffect(() => {
    setCategory("All");
    setQuery(requestedProject?.title ?? "");
    if (requestedProject)
      document
        .getElementById("more-projects-title")
        ?.scrollIntoView({ block: "start" });
  }, [requestedProject]);
  const featured = professional.projects.filter((project) => project.featured);
  const earlier = professional.projects.filter((project) => !project.featured);
  const categories = [
    "All",
    ...new Set(earlier.map((project) => project.category)),
    "Research",
  ];
  const filtered = useMemo(
    () =>
      earlier.filter(
        (project) =>
          (category === "All" || project.category === category) &&
          (!query.trim() ||
            `${project.title} ${project.summary} ${project.stack.join(" ")}`
              .toLowerCase()
              .includes(query.trim().toLowerCase())),
      ),
    [category, query, earlier],
  );
  return (
    <div className="page content-width">
      <header className="page-heading">
        <h1>Work, from the inside.</h1>
        <p>
          Different problems, different systems: vulnerability remediation,
          conveyor monitoring and document intelligence. Explore the work and
          the decisions behind it.
        </p>
      </header>
      <section aria-labelledby="featured-title">
        <h2 id="featured-title" className="sr-only">
          Featured projects
        </h2>
        <div className="featured-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <section
        className="project-section"
        aria-labelledby="more-projects-title"
      >
        <div className="section-heading-row">
          <div>
            <h2 id="more-projects-title">More projects.</h2>
            <p>Computer vision, robotics and data-science projects.</p>
          </div>
        </div>
        <Tabs
          value={category}
          onValueChange={setCategory}
          className="project-filters"
        >
          <div className="project-tools">
            <TabsList
              className="filter-group"
              aria-label="Filter more projects"
            >
              {categories.map((item) => (
                <TabsTrigger key={item} value={item}>
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="project-search-label">
              <Label htmlFor="project-search">Search more projects</Label>
              <Input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, tool, or topic"
              />
            </div>
          </div>
          <p className="results-count" aria-live="polite" aria-atomic="true">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}{" "}
            shown
          </p>
          {categories.map((item) => (
            <TabsContent key={item} value={item}>
              {item === category &&
                (filtered.length ? (
                  <div className="project-grid">
                    {filtered.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state" role="status">
                    <h3>No project matches this filter.</h3>
                    <p>
                      {category === "Research"
                        ? "No public research artifact is currently listed."
                        : "Try another category or clear the search text."}
                    </p>
                    <Button
                      variant="link"
                      className="text-button"
                      onClick={() => {
                        setCategory("All");
                        setQuery("");
                      }}
                    >
                      Show all projects
                    </Button>
                  </div>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>
      <p className="section-end-link">
        <Link className="text-link" to="/contact">
          Ask about project details
        </Link>
      </p>
    </div>
  );
}
