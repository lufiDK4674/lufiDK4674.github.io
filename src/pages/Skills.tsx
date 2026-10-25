import { CapabilityGroups } from "@/components/profile/CapabilityGroups";
export default function Skills() {
  return (
    <div className="page content-width">
      <header className="page-heading">
        <h1>Engineering capabilities.</h1>
        <p>
          Applied GenAI is my primary focus, supported by work in APIs, computer
          vision, data analysis and connected systems. Explore the evidence
          behind each ability.
        </p>
      </header>
      <CapabilityGroups />
    </div>
  );
}
