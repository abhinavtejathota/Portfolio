import { createHash, randomBytes } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_KEY = "portfolio-v1-local-dev-key";

function loadDotEnvKey() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
  const envPath = join(root, ".env");
  if (!existsSync(envPath)) return null;

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^PORTFOLIO_ENCODE_KEY\s*=\s*(.*)$/);
    if (match) {
      return match[1].trim().replace(/^["']|["']$/g, "");
    }
  }
  return null;
}

export function resolveEncodeKey() {
  return process.env.PORTFOLIO_ENCODE_KEY?.trim() || loadDotEnvKey() || DEFAULT_KEY;
}

function keyBytes(secret) {
  return createHash("sha256").update(secret).digest();
}

function xorBuffer(input, key) {
  const out = Buffer.alloc(input.length);
  for (let i = 0; i < input.length; i += 1) {
    out[i] = input[i] ^ key[i % key.length];
  }
  return out;
}

export function encodePortfolio(data, secret = resolveEncodeKey()) {
  const plain = Buffer.from(JSON.stringify(data), "utf8");
  const masked = xorBuffer(plain, keyBytes(secret));
  const payload = masked.toString("base64url");

  const chunkCount = 4 + (payload.length % 3);
  const chunkSize = Math.ceil(payload.length / chunkCount);
  const chunks = [];

  for (let i = 0; i < payload.length; i += chunkSize) {
    chunks.push(payload.slice(i, i + chunkSize));
  }

  const order = chunks.map((_, index) => index);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = randomBytes(1)[0] % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }

  const shuffled = order.map((index) => chunks[index]);
  const digest = createHash("sha256").update(plain).digest("base64url").slice(0, 16);

  return {
    v: 1,
    s: shuffled,
    o: order,
    h: digest,
  };
}

export function decodePortfolio(bundle, secret = DEFAULT_KEY) {
  if (!bundle || bundle.v !== 1 || !Array.isArray(bundle.s) || !Array.isArray(bundle.o)) {
    throw new Error("Invalid portfolio bundle format.");
  }

  const restored = Array(bundle.o.length);
  bundle.o.forEach((sourceIndex, targetIndex) => {
    restored[sourceIndex] = bundle.s[targetIndex];
  });

  const payload = restored.join("");
  const masked = Buffer.from(payload, "base64url");
  const plain = xorBuffer(masked, keyBytes(secret));
  const data = JSON.parse(plain.toString("utf8"));

  const digest = createHash("sha256").update(plain).digest("base64url").slice(0, 16);
  if (bundle.h && bundle.h !== digest) {
    throw new Error("Portfolio bundle integrity check failed.");
  }

  return data;
}
