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
    <header className="sticky top-0 z-50 overflow-visible border-b-2 border-black bg-pixel-bg/95 backdrop-blur-sm pt-[env(safe-area-inset-top,0px)]">
      <div className="mx-auto max-w-5xl px-4 py-3 md:pb-10 md:pt-3">
        <div className="mb-3 flex justify-center md:mb-0 md:hidden">
          <AnimatedNavbarName />
        </div>

        <div className="flex items-start md:items-center md:justify-between">
          <div className="hidden shrink-0 md:block">
            <AnimatedNavbarName />
          </div>

          <nav
            className="scrollbar-hide -mx-4 flex flex-nowrap items-end gap-2 overflow-x-auto overflow-y-visible px-4 md:mx-0 md:flex-wrap md:justify-end md:gap-x-3 md:gap-y-6 md:overflow-visible md:px-0"
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
      </div>
    </header>
  );
}
