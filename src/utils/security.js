const ALLOWED_PROTOCOLS = new Set(["https:", "http:", "mailto:"]);
const ALLOWED_HOSTS = new Set([
  "github.com",
  "www.github.com",
  "linkedin.com",
  "www.linkedin.com",
  "leetcode.com",
  "www.leetcode.com",
  "www.geeksforgeeks.org",
  "geeksforgeeks.org",
  "www.hackerrank.com",
  "hackerrank.com",
]);

export function sanitizeHref(rawHref) {
  if (typeof rawHref !== "string" || !rawHref.trim()) return null;

  try {
    const url = new URL(rawHref, rawHref.startsWith("mailto:") ? undefined : "https://placeholder.local");

    if (!ALLOWED_PROTOCOLS.has(url.protocol)) return null;

    if (url.protocol === "mailto:") {
      const email = rawHref.replace(/^mailto:/i, "").trim();
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${email}` : null;
    }

    if (!ALLOWED_HOSTS.has(url.hostname)) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function openExternalHref(rawHref) {
  const safe = sanitizeHref(rawHref);
  if (!safe) return false;

  if (safe.startsWith("mailto:")) {
    window.location.href = safe;
    return true;
  }

  window.open(safe, "_blank", "noopener,noreferrer");
  return true;
}

export function applySecurityPolicies() {
  if (typeof document === "undefined") return;

  document.querySelectorAll('a[target="_blank"]').forEach((anchor) => {
    anchor.rel = "noopener noreferrer";
  });

  document.addEventListener("securitypolicyviolation", (event) => {
    console.warn("Blocked by CSP:", event.violatedDirective);
  });
}
