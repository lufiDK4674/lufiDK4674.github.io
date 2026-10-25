import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentPath = path.join(root, "src", "data", "professional.json");
const content = JSON.parse(await readFile(contentPath, "utf8"));
const errors = [];
const warnings = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function validMonth(value) {
  if (typeof value !== "string" || !/^\d{4}-(0[1-9]|1[0-2])$/.test(value))
    return false;
  const [year, month] = value.split("-").map(Number);
  return year >= 1900 && month >= 1 && month <= 12;
}

function monthValue(value) {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + month;
}

function validateRoles(records, label) {
  const ids = new Set();
  for (const record of records) {
    assert(!ids.has(record.id), `${label}: duplicate id ${record.id}`);
    ids.add(record.id);
    assert(
      validMonth(record.start),
      `${label} ${record.id}: invalid start month`,
    );
    if (record.end !== null) {
      assert(
        validMonth(record.end),
        `${label} ${record.id}: invalid end month`,
      );
      if (validMonth(record.start) && validMonth(record.end)) {
        assert(
          monthValue(record.start) <= monthValue(record.end),
          `${label} ${record.id}: end precedes start`,
        );
      }
    }
    assert(
      Boolean(record.organization && record.title && record.type),
      `${label} ${record.id}: missing role details`,
    );
  }
}

function validateUrl(value, label) {
  try {
    const url = new URL(value);
    assert(url.protocol === "https:", `${label}: URL must use HTTPS`);
  } catch {
    errors.push(`${label}: invalid URL`);
  }
}

validateUrl(content.site.url, "site.url");
validateUrl(content.site.github, "site.github");
assert(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.site.email),
  "site.email: invalid email address",
);
if (content.site.linkedin) validateUrl(content.site.linkedin, "site.linkedin");

validateRoles(content.experience, "experience");
validateRoles(content.earlierExperience, "earlierExperience");

const currentRoles = content.experience.filter((record) => record.end === null);
assert(
  currentRoles.length === 1,
  `expected exactly one current role, found ${currentRoles.length}`,
);
assert(
  currentRoles[0]?.id === "gennx",
  "GenNx Tech Solutions must be the only current role",
);
assert(
  /overlap/i.test(content.overlapNote) &&
    /counted once/i.test(content.overlapNote),
  "overlap note must explain concurrent work is counted once",
);

const sec4sys = content.experience.find((record) => record.id === "sec4sys");
const techgenius = content.experience.find(
  (record) => record.id === "techgenius",
);
if (
  sec4sys &&
  techgenius &&
  validMonth(sec4sys.start) &&
  validMonth(techgenius.start)
) {
  const secEnd = monthValue(sec4sys.end ?? "9999-12");
  const techEnd = monthValue(techgenius.end ?? "9999-12");
  assert(
    monthValue(sec4sys.start) <= techEnd &&
      monthValue(techgenius.start) <= secEnd,
    "Sec4Sys and Techgenius must retain their documented overlap",
  );
}

const featured = content.projects.filter((project) => project.featured);
const engine = content.projects.find(
  (project) => project.id === "document-intelligence",
);
assert(
  engine?.title === "Content Intelligence Engine",
  "the stable document-intelligence route must retain the approved project name",
);
assert(
  /sole developer/i.test(engine?.contribution ?? ""),
  "Content Intelligence Engine must preserve confirmed sole-developer ownership",
);
const documentWork = content.documentIntelligence;
assert(
  documentWork?.modules === 12,
  "the documented design has 12 logical modules, not 12 deployed services",
);
const stageNumbers =
  documentWork?.phases?.flatMap((phase) =>
    phase.steps.map((step) => step.number),
  ) ?? [];
assert(
  stageNumbers.length === 24 &&
    stageNumbers.every((number, index) => number === index + 1),
  "architecture must preserve all 24 specified stages exactly once and in design order",
);
assert(
  documentWork?.fragmentation?.rectangles === 486 &&
    documentWork?.fragmentation?.singleCharacter === 434 &&
    documentWork?.fragmentation?.legacyChunks === 496,
  "fragmentation diagnostic counts must match the achievement records",
);
assert(
  documentWork?.contextBudget?.tableMembers === 37 &&
    documentWork?.contextBudget?.sourceSpans === 22 &&
    documentWork?.contextBudget?.readerBudget === 16 &&
    documentWork?.contextBudget?.associationSpans === 2,
  "context-budget finding must retain its documented scope",
);
assert(
  documentWork?.verification?.passed === 7 &&
    documentWork?.verification?.total === 7 &&
    /PostgreSQL.*MinIO/.test(documentWork?.verification?.scope ?? ""),
  "the seven passing checks must remain a scoped PostgreSQL–MinIO result",
);
assert(
  /failed/i.test(documentWork?.verification?.providerResult ?? ""),
  "the failed full provider gate must not be hidden or presented as accepted",
);
assert(
  featured.length === 3,
  `expected exactly three featured projects, found ${featured.length}`,
);
assert(
  featured.some((project) => project.id === "autofix-ai"),
  "AutoFix AI must be featured",
);
assert(
  featured.some((project) => project.id === "document-intelligence"),
  "Document Intelligence must be featured",
);
assert(
  featured.some(
    (project) =>
      project.id === "smart-vision-qc" && project.evidence.repository,
  ),
  "Smart Vision must be featured with public evidence",
);
assert(
  !/GenNx|Content Intelligence Engine|sole developer/i.test(
    content.site.heroSummary,
  ),
  "the hero must introduce broader work",
);
assert(
  !/sole developer/i.test(
    JSON.stringify([
      content.about,
      content.experience,
      content.projects.map((project) => project.summary),
    ]),
  ),
  "ownership belongs in case-study depth, not overview copy",
);
assert(
  new Set(content.capabilityGroups.flatMap((group) => group.projectIds)).size >=
    5,
  "capabilities must include broader project evidence",
);
if (/reject/i.test(content.researchProject?.publicationStatus ?? "")) {
  assert(
    content.researchProject.visible === false,
    "a rejected research manuscript must not be presented as a publication",
  );
}

const projectIds = new Set();
for (const project of content.projects) {
  assert(!projectIds.has(project.id), `duplicate project id ${project.id}`);
  projectIds.add(project.id);
  assert(
    Boolean(
      project.title && project.category && project.summary && project.status,
    ),
    `${project.id}: missing project content`,
  );
  if (project.evidence.repository)
    validateUrl(project.evidence.repository, `${project.id}.repository`);
  if (project.evidence.demo)
    validateUrl(project.evidence.demo, `${project.id}.demo`);
  if (!project.evidence.repository && !project.evidence.demo) {
    assert(
      Boolean(project.evidence.accessNote),
      `${project.id}: unavailable evidence needs an explanation`,
    );
  }
}

for (const group of content.capabilityGroups) {
  assert(
    group.tools.length > 0 && group.projectIds.length > 0,
    `${group.title}: missing tools or evidence`,
  );
  for (const id of group.projectIds)
    assert(
      projectIds.has(id),
      `${group.title}: missing evidence project ${id}`,
    );
}

for (const observation of content.engineeringApproach)
  assert(
    content.projects.some(
      (project) => project.id === observation.projectId && project.route,
    ),
    `${observation.title}: missing case-study evidence`,
  );

for (const [route, metadata] of Object.entries(content.seo)) {
  assert(route.startsWith("/"), `SEO route must be root-relative: ${route}`);
  assert(
    Boolean(metadata.title && metadata.description),
    `SEO metadata is incomplete for ${route}`,
  );
}
assert(
  Boolean(content.seoNotFound?.title && content.seoNotFound?.description),
  "SEO fallback metadata is incomplete",
);

const allPublicCopy = JSON.stringify({
  site: content.site,
  about: content.about,
  engineeringApproach: content.engineeringApproach,
  experience: content.experience,
  earlierExperience: content.earlierExperience,
  capabilityGroups: content.capabilityGroups,
  projects: content.projects,
  achievements: content.achievements,
  services: content.services,
  seo: content.seo,
});
assert(
  !/\b\d+(?:\.\d+)?\s*%/.test(allPublicCopy),
  "public copy contains an unsupported percentage claim",
);
assert(
  !/production[- ](?:ready|grade)|final[- ]year student|2x hackathon winner|2\s*×\s*hackathon winner/i.test(
    allPublicCopy,
  ),
  "public copy contains a stale or unsupported claim",
);
assert(
  !/\b(?:TODO|TBD|XX%)\b/i.test(allPublicCopy),
  "public copy contains an unresolved placeholder",
);

if (content.resume.publicPath === null || content.resume.approved !== true) {
  warnings.push(
    "No approved primary resume PDF is configured; do not publish a stale variant.",
  );
  const publishedResumePdfs = (
    await readdir(path.join(root, "public", "resumes"))
  ).filter((name) => name.toLowerCase().endsWith(".pdf"));
  assert(
    publishedResumePdfs.length === 0,
    "public/resumes contains PDF files that are not an approved resume",
  );
} else {
  const relative = content.resume.publicPath.replace(/^\//, "");
  const resumePath = path.resolve(root, "public", relative);
  assert(
    resumePath.startsWith(path.join(root, "public") + path.sep),
    "resume path must remain under public/",
  );
  try {
    const file = await readFile(resumePath);
    assert(
      file.subarray(0, 5).toString("ascii") === "%PDF-",
      "primary resume is not a PDF",
    );
  } catch {
    errors.push(`primary resume file is missing: ${content.resume.publicPath}`);
  }
  const publishedResumePdfs = (
    await readdir(path.join(root, "public", "resumes"))
  ).filter((name) => name.toLowerCase().endsWith(".pdf"));
  assert(
    publishedResumePdfs.length === 1 &&
      publishedResumePdfs[0] === path.basename(resumePath),
    "public/resumes may contain only the approved primary PDF",
  );
}

for (const warning of warnings) console.warn(`WARN ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Content checks passed: ${content.experience.length} current/overlapping roles, ${featured.length} featured projects, ${content.projects.length - featured.length} more projects.`,
  );
}
