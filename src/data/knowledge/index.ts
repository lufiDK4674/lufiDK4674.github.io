const modules = import.meta.glob("./**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const knowledgeBase: string = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, content]) => `<!-- source: ${path} -->\n${content.trim()}`)
  .join("\n\n---\n\n");
