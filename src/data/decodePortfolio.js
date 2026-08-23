const DEFAULT_KEY = typeof __PORTFOLIO_KEY__ !== "undefined" ? __PORTFOLIO_KEY__ : "portfolio-v1-local-dev-key";

async function sha256Bytes(input) {
  const encoded = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return new Uint8Array(digest);
}

function xorBuffer(input, key) {
  const out = new Uint8Array(input.length);
  for (let i = 0; i < input.length; i += 1) {
    out[i] = input[i] ^ key[i % key.length];
  }
  return out;
}

function base64UrlToBytes(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bytesToBase64Url(bytes) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < view.length; i += 1) {
    binary += String.fromCharCode(view[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function decodePortfolio(bundle, secret = DEFAULT_KEY) {
  if (!bundle || bundle.v !== 1 || !Array.isArray(bundle.s) || !Array.isArray(bundle.o)) {
    throw new Error("Invalid portfolio bundle format.");
  }

  const restored = Array(bundle.o.length);
  bundle.o.forEach((sourceIndex, targetIndex) => {
    restored[sourceIndex] = bundle.s[targetIndex];
  });

  const payload = restored.join("");
  const masked = base64UrlToBytes(payload);
  const key = await sha256Bytes(secret);
  const plain = xorBuffer(masked, key);
  const json = new TextDecoder().decode(plain);
  const data = JSON.parse(json);

  if (bundle.h) {
    const digest = bytesToBase64Url(await crypto.subtle.digest("SHA-256", plain)).slice(0, 16);
    if (bundle.h !== digest) {
      throw new Error("Portfolio bundle integrity check failed.");
    }
  }

  return data;
}

export function getPortfolioDecodeKey() {
  return DEFAULT_KEY;
}
