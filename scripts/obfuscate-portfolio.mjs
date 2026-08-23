import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { encodePortfolio, resolveEncodeKey } from "./lib/portfolio-crypto.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const privatePath = join(root, "data", "portfolio.private.json");
const outputPath = join(root, "src", "data", "portfolio.bundle.json");

if (!existsSync(privatePath)) {
  if (existsSync(outputPath)) {
    console.log("Skipping encode: using committed src/data/portfolio.bundle.json");
    process.exit(0);
  }

  console.error("\nMissing data/portfolio.private.json and no portfolio.bundle.json");
  console.error("Create portfolio.private.json locally, run npm run data:encode, then commit the bundle.\n");
  process.exit(1);
}

const source = readFileSync(privatePath, "utf8");
let parsed;

try {
  parsed = JSON.parse(source);
} catch {
  console.error("data/portfolio.private.json is not valid JSON.");
  process.exit(1);
}

const bundle = encodePortfolio(parsed, resolveEncodeKey());
writeFileSync(outputPath, `${JSON.stringify(bundle, null, 2)}\n`, "utf8");

console.log("Wrote obfuscated bundle -> src/data/portfolio.bundle.json");
