import { socialLinks } from "../../data/portfolio";
import { sanitizeHref } from "../../utils/security";
import BrandIcon from "./BrandIcon";

export default function SocialLinks({ className = "" }) {
  const links = socialLinks
    .map((link) => ({ ...link, safeHref: sanitizeHref(link.href) }))
    .filter((link) => link.safeHref);

  return (
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-3 ${className}`}>
      {links.map((link) => (
        <a
          key={link.id}
          href={link.safeHref}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          title={link.display}
          aria-label={`${link.label} — ${link.display}`}
          className="pixel-border pixel-btn group flex items-center justify-center gap-2.5 bg-pixel-panel px-3 py-2.5 transition hover:bg-black/50"
        >
          <BrandIcon brand={link.id} size="sm" />
          <span className="text-base text-white/90 group-hover:text-pixel-cyan">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
