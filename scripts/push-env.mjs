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

const targetEnvs = process.argv.slice(2);
const envs = targetEnvs.length > 0 ? targetEnvs : ["production"];

for (const { key, value } of entries) {
  const masked =
    /TOKEN|SECRET|DSN/.test(key)
      ? `<set, ${value.length} chars>`
      : value;
  for (const env of envs) {
    const result = spawnSync(
      "vercel",
      ["env", "add", key, env, "--value", value, "--yes"],
      { encoding: "utf-8" }
    );
    const tag = `${key} [${env}]`;
    if (result.status === 0) {
      console.log(`✓ ${tag}=${masked}`);
    } else {
      const err = (result.stderr || result.stdout || "").trim();
      console.log(`✗ ${tag}: ${err.split("\n").slice(0, 3).join(" | ")}`);
    }
  }
}
