import { motion } from "framer-motion";
import PixelCharacter from "./components/pixels/PixelCharacter";
import AnimatedTagline from "./components/ui/AnimatedTagline";
import Navbar from "./components/ui/Navbar";
import SectionBlock from "./components/ui/SectionBlock";
import {
  AboutContent,
  ContactContent,
  EducationContent,
  ExperienceContent,
  ProjectsContent,
  SkillsContent,
} from "./components/sections/SectionContents";
import { navSections, profile } from "./data/portfolio";

function Starfield() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 7) % 100}%`,
    top: `${(i * 23 + 11) % 100}%`,
    delay: `${(i % 5) * 0.4}s`,
    size: i % 3 === 0 ? 3 : 2,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-sm bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animation: `twinkle 2.5s ${star.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

const sectionContent = {
  about: AboutContent,
  projects: ProjectsContent,
  experience: ExperienceContent,
  skills: SkillsContent,
  education: EducationContent,
  contact: ContactContent,
};

export default function App() {
  return (
    <div className="scanlines pixel-grid-bg relative min-h-screen">
      <Starfield />

      <div id="top" className="relative z-10 mx-auto max-w-5xl px-4 pb-6 pt-10 text-center md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex justify-center"
        >
          <PixelCharacter type="dev" pose="idle" scale={5} animate />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="font-pixel text-sm leading-loose text-pixel-cyan md:text-base"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatedTagline tagline={profile.tagline} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mx-auto mt-4 max-w-xl text-lg text-white/50 md:text-xl"
        >
          {profile.location} · {profile.graduation}
        </motion.p>
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-12">
        {navSections.map((section) => {
          const Content = sectionContent[section.id];
          return (
            <SectionBlock key={section.id} section={section}>
              <Content />
            </SectionBlock>
          );
        })}
      </main>

      <footer className="relative z-10 border-t border-pixel-border py-6 text-center text-base text-white/40">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
      </footer>
    </div>
  );
}
