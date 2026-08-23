import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function showBootError(error) {
  const root = document.getElementById("root");
  if (!root) return;

  const message = error instanceof Error ? error.message : String(error);
  root.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#0d0d1a;color:#e8e8ff;font-family:monospace;">
      <div style="max-width:520px;border:2px solid #2a2a4a;padding:24px;background:#16162a;">
        <h1 style="color:#ff6b2b;font-size:18px;margin:0 0 12px;">Portfolio failed to load</h1>
        <p style="margin:0 0 12px;line-height:1.5;">Could not decode portfolio data. Restart the dev server after updating <code>.env</code>.</p>
        <pre style="white-space:pre-wrap;color:#00f5ff;font-size:12px;margin:0 0 16px;">${message}</pre>
        <p style="margin:0;color:#888;font-size:13px;">Run <code>npm run data:encode</code>, then <code>npm run dev</code>.</p>
      </div>
    </div>
  `;
}

async function bootstrap() {
  try {
    await import("./data/portfolio.js");
    const { applySecurityPolicies } = await import("./utils/security.js");
    const { profile } = await import("./data/portfolio.js");
    const { default: App } = await import("./App.jsx");

    applySecurityPolicies();

    if (profile?.name) {
      document.title = `${profile.name} | Portfolio`;
    }

    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    console.error(error);
    showBootError(error);
  }
}

bootstrap();
