import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const lines = readFileSync(".env.local", "utf-8").split("\n");
const entries = lines
  .filter((l) => l && !l.startsWith("#") && l.includes("="))
  .map((l) => {
    const i = l.indexOf("=");
    return { key: l.slice(0, i).trim(), value: l.slice(i + 1).trim() };
  })
  .filter(({ value }) => value.length > 0);

for (const { key, value } of entries) {
  const result = spawnSync(
    "vercel",
    ["env", "add", key, "production"],
    { input: value + "\n", encoding: "utf-8" }
  );
  const masked =
    /TOKEN|SECRET|DSN/.test(key)
      ? `<set, ${value.length} chars>`
      : value;
  if (result.status === 0) {
    console.log(`✓ ${key}=${masked}`);
  } else {
    console.log(`✗ ${key}: ${result.stderr || result.stdout}`);
  }
}
