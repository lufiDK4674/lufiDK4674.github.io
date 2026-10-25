import { professional } from "../data/professional";
import { formatDateRange } from "../lib/format";
export function ExperienceList({
  earlier = false,
  compact = false,
}: {
  earlier?: boolean;
  compact?: boolean;
}) {
  return (
    <ol className="experience-list">
      {(earlier ? professional.earlierExperience : professional.experience).map(
        (role) => (
          <li className="experience-item" key={role.id}>
            <div className="experience-date">
              {formatDateRange(role.start, role.end)}
            </div>
            <div>
              <h3>{role.organization}</h3>
              <p className="experience-org">
                {role.title} · {role.type}
              </p>
              <p>{compact ? role.snapshot : role.summary}</p>
            </div>
          </li>
        ),
      )}
    </ol>
  );
}
