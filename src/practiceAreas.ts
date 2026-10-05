import { PRACTICE_AREAS as existingAreas } from "./data/site";
import type { PracticeArea } from "./types";

// Keep this focused service alongside the existing areas without rewriting
// the large editorial article and practice catalogue in data/index.ts.
const poshArea: PracticeArea = {
  id: "posh-employer-compliance",
  slug: "posh-compliance-internal-committee",
  icon: "🛡️",
  title: "POSH Compliance and Internal Committee Support",
  shortDesc: "Policy review, committee arrangements, external-member coordination and workplace awareness for employers.",
  fullDesc: "Support for employers reviewing workplace sexual harassment prevention, complaint-handling arrangements and related records under the Sexual Harassment of Women at Workplace Act, 2013. The appropriate next step depends on the organisation's workplaces, current committee documents and any live matter.",
  highlights: [
    "POSH policy drafting and review",
    "Internal Committee constitution and member records",
    "External-member appointment and coordination",
    "Employee awareness and committee orientation",
    "Complaint-process and confidentiality review",
    "Inquiry support on conflict-checked instructions",
    "Annual reporting and documentation review"
  ]
};

const employmentIndex = existingAreas.findIndex(area => area.slug === "labour-employment-hr-workplace-compliance");
if (employmentIndex < 0 || existingAreas.some(area => area.slug === poshArea.slug)) {
  throw new Error("POSH service requires a unique route and the existing employment service.");
}

export const PRACTICE_AREAS: PracticeArea[] = [
  ...existingAreas.slice(0, employmentIndex + 1),
  poshArea,
  ...existingAreas.slice(employmentIndex + 1)
];
