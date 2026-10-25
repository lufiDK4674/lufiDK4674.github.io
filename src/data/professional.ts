import professionalData from "./professional.json";

export interface ProfessionalContent {
  about: { introduction: string; paragraphs: string[] };
  engineeringApproach: Array<{
    title: string;
    description: string;
    projectId: string;
  }>;
  documentIntelligence: {
    proposition: string;
    sourceNote: string;
    modules: number;
    fragmentation: {
      rectangles: number;
      singleCharacter: number;
      canonicalElements: number;
      canonicalParagraphs: number;
      legacyChunks: number;
      finding: string;
      outcome: string;
    };
    contextBudget: {
      tableMembers: number;
      sourceSpans: number;
      readerBudget: number;
      associationSpans: number;
      finding: string;
    };
    verification: {
      passed: number;
      total: number;
      scope: string;
      result: string;
      providerResult: string;
    };
    phases: Array<{
      id: string;
      title: string;
      input: string;
      output: string;
      verification: string;
      steps: Array<{ number: number; title: string }>;
    }>;
  };
  site: {
    name: string;
    headline: string;
    heroSummary: string;
    description: string;
    url: string;
    email: string;
    city: string;
    github: string;
    linkedin: string | null;
    socialImage: string;
  };
  resume: {
    label: string;
    publicPath: string | null;
    approved: boolean;
    lastUpdated: string | null;
  };
  education: {
    degree: string;
    institution: string;
    startYear: number;
    endYear: number;
    cgpa: string;
  };
  experience: Array<{
    id: string;
    organization: string;
    title: string;
    type: string;
    start: string;
    end: string | null;
    summary: string;
    snapshot?: string;
  }>;
  earlierExperience: ProfessionalContent["experience"];
  overlapNote: string;
  capabilityGroups: Array<{
    title: string;
    description: string;
    tools: string[];
    projectIds: string[];
  }>;
  projects: Array<{
    id: string;
    route: string | null;
    title: string;
    category: string;
    featured: boolean;
    summary: string;
    problem?: string;
    contribution?: string;
    stack: string[];
    status: string;
    flowLabel?: string;
    flowNote?: string;
    flow?: Array<{ title: string; detail: string }>;
    engineeringNotes?: Array<{ title: string; detail: string }>;
    validation?: string;
    constraints?: string[];
    achievement?: string;
    evidence: {
      repository: string | null;
      demo: string | null;
      accessNote: string;
    };
  }>;
  achievements: Array<{ title: string; event: string; detail: string }>;
  researchProject: {
    title: string;
    publicationStatus: string | null;
    visible: boolean;
  };
  services: { title: string; description: string; topics: string[] };
  seo: Record<string, { title: string; description: string }>;
  seoNotFound: { title: string; description: string };
}

export const professional = professionalData as ProfessionalContent;
