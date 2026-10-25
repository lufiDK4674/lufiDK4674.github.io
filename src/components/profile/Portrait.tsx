import small from "@/assets/profile-160.webp";
import medium from "@/assets/profile-360.webp";
import large from "@/assets/profile-720.webp";
import { professional } from "@/data/professional";

export function Portrait({
  className,
  hero = false,
}: {
  className: string;
  hero?: boolean;
}) {
  return (
    <img
      className={className}
      src={medium}
      srcSet={`${small} 160w, ${medium} 360w, ${large} 720w`}
      sizes={
        hero
          ? "(max-width: 360px) 85px, (max-width: 600px) 104px, (max-width: 900px) 285px, 330px"
          : "(max-width: 600px) 225px, 330px"
      }
      alt={`Portrait of ${professional.site.name}`}
      width="720"
      height="720"
      loading={hero ? "eager" : "lazy"}
      fetchPriority={hero ? "high" : "auto"}
      decoding="async"
    />
  );
}
