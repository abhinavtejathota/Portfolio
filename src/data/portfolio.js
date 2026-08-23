import bundle from "./portfolio.bundle.json";
import { decodePortfolio } from "./decodePortfolio.js";

let data;

try {
  data = await decodePortfolio(bundle);
} catch (error) {
  throw new Error(
    `Portfolio bundle decode failed. Re-run "npm run data:encode" and restart the dev server. (${error instanceof Error ? error.message : error})`,
  );
}

export const profile = data.profile;
export const socialLinks = data.socialLinks;
export const interests = data.interests;
export const skills = data.skills;
export const projects = data.projects;
export const experience = data.experience;
export const education = data.education;
export const certificates = data.certificates;
export const codingProfiles = data.codingProfiles;

export const navSections = [
  { id: "about", label: "About", heading: "About Me", accent: "#00f5ff", character: "dev" },
  { id: "projects", label: "Projects", heading: "Projects", accent: "#ff6b2b", character: "explorer", highlight: true },
  { id: "experience", label: "Experience", heading: "Experience", accent: "#ffe600", character: "intern" },
  { id: "skills", label: "Skills", heading: "Skills", accent: "#39ff14", character: "bot" },
  { id: "education", label: "Education", heading: "Education", accent: "#b388ff", character: "scholar" },
  { id: "contact", label: "Contact", heading: "Contact", accent: "#00f5ff", character: "contact", highlight: true },
];

export const sections = navSections;
