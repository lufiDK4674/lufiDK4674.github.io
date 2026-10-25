import { professional } from "@/data/professional";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { className?: string; compact?: boolean };

export function ResumeDownload({ className = "", compact = false }: Props) {
  const resume = professional.resume;

  if (resume.approved && resume.publicPath) {
    return (
      <Button
        asChild
        variant="secondary"
        className={`button button-secondary ${className}`}
      >
        <a href={resume.publicPath} download>
          <span>
            {compact ? "Download resume" : "AI Engineer resume"}
            {compact && <span className="sr-only"> (AI Engineer PDF)</span>}
            {!compact && (
              <small className="button-note">PDF · {resume.lastUpdated}</small>
            )}
          </span>
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
    );
  }

  return (
    <div className={`resume-pending ${className}`}>
      <span className="resume-pending-title">
        AI Engineer resume PDF pending
      </span>
      {!compact && (
        <span className="resume-pending-note">
          The latest approved file has not been provided for this update.
        </span>
      )}
    </div>
  );
}
