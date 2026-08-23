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

      <div id="top" className="relative z-10 mx-auto max-w-5xl px-4 pb-4 pt-6 text-center sm:pb-6 sm:pt-8 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-center md:mb-5"
        >
          <div className="scale-[0.65] sm:scale-[0.8] md:scale-100">
            <PixelCharacter type="dev" pose="idle" scale={5} animate />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="font-pixel text-[0.65rem] leading-loose text-pixel-cyan sm:text-xs md:text-base"
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
          className="mx-auto mt-3 max-w-xl px-1 text-base text-white/50 sm:mt-4 sm:text-lg md:text-xl"
        >
          {profile.location} · {profile.graduation}
        </motion.p>
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-8 sm:pb-12">
        {navSections.map((section) => {
          const Content = sectionContent[section.id];
          return (
            <SectionBlock key={section.id} section={section}>
              <Content />
            </SectionBlock>
          );
        })}
      </main>

      <footer className="relative z-10 border-t border-pixel-border px-4 py-5 text-center text-sm text-white/40 sm:py-6 sm:text-base">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
      </footer>
    </div>
  );
}
