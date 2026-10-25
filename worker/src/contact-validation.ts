export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  website: string;
}

export type ContactValidation =
  | { ok: true; submission: ContactSubmission; spam: boolean }
  | { ok: false; status: 400; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(value: unknown): ContactValidation {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { ok: false, status: 400, message: "Submit the form as a JSON object." };
  }

  const input = value as Record<string, unknown>;
  if ([input.name, input.email, input.message].some((field) => typeof field !== "string")) {
    return { ok: false, status: 400, message: "Name, email, and message are required." };
  }

  const name = (input.name as string).trim();
  const email = (input.email as string).trim();
  const message = (input.message as string).trim();
  const website = typeof input.website === "string" ? input.website.trim() : "";

  if (name.length < 2 || name.length > 120) {
    return { ok: false, status: 400, message: "Name must be between 2 and 120 characters." };
  }
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, status: 400, message: "Enter a valid email address." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { ok: false, status: 400, message: "Message must be between 10 and 5000 characters." };
  }

  return {
    ok: true,
    submission: { name, email, message, website },
    spam: website.length > 0,
  };
}

export function escapeEmailTemplateValue(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}
