import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import professional from "./src/data/professional.json";

const escapeAttribute = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function portfolioMetadata() {
  return {
    name: "portfolio-metadata",
    transformIndexHtml(html: string) {
      const home = professional.seo["/"];
      const image = new URL(
        professional.site.socialImage,
        professional.site.url,
      ).toString();
      const replacements: Array<[string, string]> = [
        [
          "<title>Portfolio</title>",
          `<title>${escapeAttribute(home.title)}</title>`,
        ],
        [
          '<meta name="description" content="" />',
          `<meta name="description" content="${escapeAttribute(home.description)}" />`,
        ],
        [
          '<link rel="canonical" href="" />',
          `<link rel="canonical" href="${escapeAttribute(professional.site.url)}" />`,
        ],
        [
          '<meta property="og:title" content="" />',
          `<meta property="og:title" content="${escapeAttribute(home.title)}" />`,
        ],
        [
          '<meta property="og:description" content="" />',
          `<meta property="og:description" content="${escapeAttribute(home.description)}" />`,
        ],
        [
          '<meta property="og:url" content="" />',
          `<meta property="og:url" content="${escapeAttribute(professional.site.url)}" />`,
        ],
        [
          '<meta property="og:image" content="" />',
          `<meta property="og:image" content="${escapeAttribute(image)}" />`,
        ],
        [
          '<meta name="twitter:title" content="" />',
          `<meta name="twitter:title" content="${escapeAttribute(home.title)}" />`,
        ],
        [
          '<meta name="twitter:description" content="" />',
          `<meta name="twitter:description" content="${escapeAttribute(home.description)}" />`,
        ],
        [
          '<meta name="twitter:image" content="" />',
          `<meta name="twitter:image" content="${escapeAttribute(image)}" />`,
        ],
      ];
      for (const [from, to] of replacements) html = html.replace(from, to);

      const currentRole = professional.experience.find(
        (role) => role.end === null,
      );
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: professional.site.name,
        jobTitle: currentRole?.title,
        worksFor: currentRole
          ? { "@type": "Organization", name: currentRole.organization }
          : undefined,
        url: professional.site.url,
        image,
        email: `mailto:${professional.site.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: professional.site.city.replace(/, India$/, ""),
          addressCountry: "IN",
        },
        sameAs: [professional.site.github],
        knowsAbout: professional.capabilityGroups.flatMap(
          (group) => group.tools,
        ),
      };
      const json = JSON.stringify(structuredData).replace(/</g, "\\u003c");
      return html.replace(
        "</head>",
        `  <script type="application/ld+json">${json}</script>\n  </head>`,
      );
    },
  };
}

export default defineConfig(({ mode }) => ({
  // base: "/lufiDK4674.github.io/", // Correct for user/organization GitHub Pages site
  plugins: [
    react(),
    portfolioMetadata(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    minify: "esbuild",
    sourcemap: false,
  },
}));
