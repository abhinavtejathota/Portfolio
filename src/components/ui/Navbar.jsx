import { useEffect, useState } from "react";
import { navSections } from "../../data/portfolio";
import AnimatedNavbarName from "./AnimatedNavbarName";
import SectionButton from "./SectionButton";

export default function Navbar() {
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const ids = navSections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-pixel-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 pb-10 pt-3">
        <AnimatedNavbarName />

        <nav
          className="flex flex-wrap items-end justify-end gap-x-2 gap-y-6 md:gap-x-3"
          aria-label="Main navigation"
        >
          {navSections.map((section) => (
            <SectionButton
              key={section.id}
              label={section.label}
              accent={section.accent}
              character={section.character}
              highlight={section.highlight}
              isActive={activeId === section.id}
              onClick={() => scrollTo(section.id)}
              compact
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
