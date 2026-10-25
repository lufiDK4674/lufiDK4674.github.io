import { FormEvent, useState } from "react";
import { professional } from "@/data/professional";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type SubmissionState = "idle" | "loading" | "success" | "error";
const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL?.replace(/\/$/, "");

export default function Contact() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMessage("Sending your message…");

    if (!contactApiUrl) {
      setState("error");
      setMessage(
        "The contact form is not connected right now. Please email me directly. Your message is still here.",
      );
      return;
    }

    try {
      const response = await fetch(`${contactApiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      let body: { ok?: boolean; message?: string } = {};
      try {
        body = await response.json();
      } catch {
        /* use the recovery message below */
      }
      if (!response.ok || !body.ok) {
        setState("error");
        setMessage(
          body.message ||
            "The message could not be sent. Please email me directly. Your message is still here.",
        );
        return;
      }
      setForm({ name: "", email: "", message: "", website: "" });
      setState("success");
      setMessage("Message sent. Thank you for getting in touch.");
    } catch {
      setState("error");
      setMessage(
        "The message could not be sent. Please check your connection or email me directly. Your message is still here.",
      );
    }
  }

  return (
    <div className="page content-width">
      <header className="page-heading">
        <h1>Contact</h1>
        <p>
          For AI Engineer and Applied GenAI Engineer opportunities, direct email
          is the most reliable way to reach me.
        </p>
      </header>

      <div className="contact-layout">
        <section
          className="contact-direct"
          aria-labelledby="direct-email-title"
        >
          <h2 id="direct-email-title">Direct email</h2>
          <a
            className="email-address"
            href={`mailto:${professional.site.email}`}
          >
            {professional.site.email}
          </a>
          <p>{professional.site.city}</p>
          <a
            className="text-link"
            href={professional.site.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {professional.site.linkedin && (
            <a
              className="text-link"
              href={professional.site.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </section>

        <section
          className="contact-form-panel"
          aria-labelledby="contact-form-title"
        >
          <h2 id="contact-form-title">Send a message</h2>
          <p>
            Fields marked required must be completed. If sending fails, your
            message stays in the form.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <Label htmlFor="contact-name">
                Name <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={120}
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
            </div>
            <div className="form-field">
              <Label htmlFor="contact-email">
                Email <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />
            </div>
            <div className="form-field">
              <Label htmlFor="contact-message">
                Message <span aria-hidden="true">*</span>
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                minLength={10}
                maxLength={5000}
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
              />
            </div>
            <div className="form-honeypot" aria-hidden="true">
              <Label htmlFor="contact-website">Leave this field empty</Label>
              <Input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(event) =>
                  setForm({ ...form, website: event.target.value })
                }
              />
            </div>
            <Button
              className="button button-primary form-submit"
              type="submit"
              disabled={state === "loading"}
            >
              {state === "loading" ? "Sending…" : "Send message"}
            </Button>
            <p
              className={`form-feedback ${state === "error" ? "feedback-error" : state === "success" ? "feedback-success" : ""}`}
              aria-live={state === "error" ? "assertive" : "polite"}
              aria-atomic="true"
              role={state === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
