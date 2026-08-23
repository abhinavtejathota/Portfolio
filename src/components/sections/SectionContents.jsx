import {
  certificates,
  codingProfiles,
  education,
  experience,
  interests,
  profile,
  projects,
  skills,
} from "../../data/portfolio";
import SocialLinks from "../ui/SocialLinks";
import CodingProfileIcon from "../ui/CodingProfileIcon";
import { sanitizeHref } from "../../utils/security";

export function AboutContent() {
  return (
    <div className="space-y-5">
      <p className="text-base leading-relaxed sm:text-lg md:text-2xl">{profile.bio}</p>
      <p className="text-sm leading-relaxed text-white/70 sm:text-base md:text-xl">{profile.bioExtra}</p>

      <div className="flex flex-wrap gap-3">
        <InfoChip label="Location" value={profile.location} />
        <InfoChip label="Graduation" value={profile.graduation} />
      </div>

      <div>
        <h3 className="mb-3 font-pixel text-[0.5rem] text-pixel-yellow">Interests</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {interests.map((item) => (
            <div key={item.label} className="pixel-border bg-black/25 p-3">
              <p className="text-base text-white sm:text-lg">{item.label}</p>
              <p className="text-sm text-white/60 sm:text-base">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsContent() {
  const groups = [
    { title: "Languages", items: skills.languages },
    { title: "Frontend", items: skills.frontend },
    { title: "Backend", items: skills.backend },
    { title: "Data", items: skills.data },
    { title: "Tools", items: skills.tools },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title} className="pixel-border bg-black/30 p-4">
          <h3 className="mb-3 font-pixel text-[0.55rem] text-pixel-green">{group.title}</h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded border border-pixel-border bg-pixel-bg px-2 py-1 text-sm sm:text-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectsContent() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      {others.length > 0 && (
        <>
          <h3 className="font-pixel text-[0.55rem] text-pixel-yellow">More on GitHub</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {others.map((project) => (
              <ProjectCard key={project.title} project={project} compact />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, compact = false }) {
  return (
    <article className={`pixel-border bg-black/25 p-3 sm:p-4 ${compact ? "" : "md:p-5"}`}>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h3
          className={`font-pixel ${compact ? "text-[0.5rem]" : "text-[0.55rem]"} text-pixel-orange`}
        >
          {project.title}
        </h3>
        <span className="text-sm text-white/50 sm:text-base">{project.period}</span>
      </div>
      <p className={`${compact ? "text-base sm:text-lg" : "text-base sm:text-lg md:text-xl"} mb-3 text-white/85`}>
        {project.description}
      </p>
      <div className="mb-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="border border-pixel-orange/40 px-2 py-0.5 text-sm text-pixel-orange/90 sm:text-base"
          >
            {tech}
          </span>
        ))}
      </div>
      {!compact && project.highlights && (
        <ul className="mb-3 list-inside list-disc space-y-1 text-sm text-white/70 sm:text-lg">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {project.link && sanitizeHref(project.link) && (
        <a
          href={sanitizeHref(project.link)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-pixel text-[0.45rem] text-pixel-cyan underline-offset-4 hover:underline"
        >
          View on GitHub →
        </a>
      )}
    </article>
  );
}

export function ExperienceContent() {
  return (
    <div className="space-y-5">
      {experience.map((job) => (
        <article key={job.company} className="pixel-border bg-black/25 p-4">
          <div className="mb-2 flex flex-wrap justify-between gap-2">
            <h3 className="font-pixel text-[0.55rem] text-pixel-yellow">{job.role}</h3>
            <span className="text-sm text-white/50 sm:text-base">{job.period}</span>
          </div>
          <p className="mb-3 text-base text-pixel-yellow/80 sm:text-lg md:text-xl">{job.company}</p>
          <ul className="list-inside list-disc space-y-1 text-sm text-white/80 sm:text-lg">
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function EducationContent() {
  return (
    <div className="space-y-4">
      {education.map((item) => (
        <article key={`${item.school}-${item.degree}`} className="pixel-border bg-black/25 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-pixel text-[0.55rem] text-purple-300">{item.degree}</h3>
            <span className="text-sm text-white/50 sm:text-base">{item.period}</span>
          </div>
          <p className="mt-2 text-base text-white sm:text-lg md:text-xl">{item.school}</p>
          <p className="text-sm text-white/65 sm:text-lg">
            {item.location} · {item.detail}
          </p>
        </article>
      ))}

      <div className="pixel-border bg-black/25 p-4">
        <h3 className="mb-3 font-pixel text-[0.55rem] text-pixel-magenta">Certificates</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {certificates.map((cert) => (
            <div key={cert.name} className="border border-pixel-border bg-black/20 p-3">
              <p className="text-base text-white sm:text-lg">{cert.name}</p>
              <p className="text-sm text-white/60 sm:text-base">
                {cert.issuer} · {cert.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pixel-border bg-black/25 p-4">
        <h3 className="mb-3 font-pixel text-[0.55rem] text-pixel-green">Coding Profiles</h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {codingProfiles.map((cp) => {
            const safeUrl = sanitizeHref(cp.url);
            if (!safeUrl) return null;

            return (
              <a
                key={cp.platform}
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={cp.platform}
                className="pixel-btn group flex flex-col items-center justify-center gap-2 border border-pixel-border bg-black/20 p-3 transition hover:border-pixel-green hover:bg-black/40 sm:p-4"
              >
                <CodingProfileIcon platform={cp.platform} />
                <span className="text-base text-white group-hover:text-pixel-green sm:text-lg">{cp.platform}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ContactContent() {
  return (
    <div className="space-y-4">
      <p className="text-base leading-relaxed text-white/85 sm:text-lg">
        For internships, project collabs, or just a hello — reach out anytime.
      </p>
      <p className="text-sm text-white/45 sm:text-base">{profile.location}</p>
      <SocialLinks />
    </div>
  );
}

function InfoChip({ label, value }) {
  return (
    <div className="pixel-border bg-black/30 px-3 py-2">
      <p className="font-pixel text-[0.45rem] text-pixel-cyan">{label}</p>
      <p className="text-base sm:text-lg">{value}</p>
    </div>
  );
}
