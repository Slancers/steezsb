import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

// Push .env.local values to Vercel via the API (works around CLI's broken
// --yes handling for preview env vars). Defaults to preview if no args.
const envs = process.argv.slice(2);
const targets = envs.length > 0 ? envs : ["preview"];

const lines = readFileSync(".env.local", "utf-8").split("\n");
const entries = lines
  .filter((l) => l && !l.startsWith("#") && l.includes("="))
  .map((l) => {
    const i = l.indexOf("=");
    return { key: l.slice(0, i).trim(), value: l.slice(i + 1).trim() };
  })
  .filter(({ value }) => value.length > 0);

for (const { key, value } of entries) {
  const masked = /TOKEN|SECRET|DSN/.test(key)
    ? `<set, ${value.length} chars>`
    : value;
  const body = JSON.stringify({
    key,
    value,
    type: key.startsWith("NEXT_PUBLIC_") ? "plain" : "encrypted",
    target: targets,
  });
  const result = spawnSync(
    "vercel",
    ["api", "/v10/projects/steezsb/env", "-X", "POST", "--input", "-"],
    { input: body, encoding: "utf-8" }
  );
  const tag = `${key} [${targets.join(",")}]`;
  if (result.status === 0 && !/error/i.test(result.stdout)) {
    console.log(`✓ ${tag}=${masked}`);
  } else {
    const err = (result.stderr || result.stdout || "").trim();
    console.log(`✗ ${tag}: ${err.split("\n").slice(0, 2).join(" | ")}`);
  }
}
