import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`OK: ${message}`);
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

const required = [
  ".claude-plugin/marketplace.json",
  "plugins/push/.claude-plugin/plugin.json",
  "plugins/push/skills/push/SKILL.md",
  "plugins/push/skills/push/references/discovery.md",
  "plugins/push/skills/push/references/confirmation.md",
  "plugins/push/skills/push/references/knowledge-model.md",
  "plugins/push/skills/push/references/categories.md",
  "plugins/push/skills/push/references/reconciliation.md",
  "plugins/push/skills/push/references/project-files.md",
  "plugins/push/skills/push/references/publishing.md",
  "plugins/push/skills/push/references/voice.md",
  "plugins/push/skills/push/references/destinations/confluence.md",
  "docs/PRODUCT.md",
  "docs/ARCHITECTURE.md",
  "docs/brand/VOICE.md",
  "docs/VERSIONING.md",
  "docs/REPOSITORY.md",
  "evals/README.md"
];

for (const rel of required) {
  if (!exists(rel)) fail(`missing required file: ${rel}`);
}
if (!process.exitCode) ok("required v0.2 files exist");

for (const rel of [".claude-plugin/marketplace.json", "plugins/push/.claude-plugin/plugin.json"]) {
  try {
    JSON.parse(read(rel));
    ok(`valid JSON: ${rel}`);
  } catch (error) {
    fail(`invalid JSON: ${rel} — ${error.message}`);
  }
}

const plugin = JSON.parse(read("plugins/push/.claude-plugin/plugin.json"));
if (plugin.version !== "0.2.0") fail(`plugin version is ${plugin.version}, expected 0.2.0`);
else ok("plugin version is 0.2.0");

const skill = read("plugins/push/skills/push/SKILL.md");
const refRegex = /references\/[A-Za-z0-9_./-]+\.md/g;
const refs = [...new Set(skill.match(refRegex) || [])];
for (const ref of refs) {
  const rel = path.join("plugins/push/skills/push", ref);
  if (!exists(rel)) fail(`SKILL.md references missing file: ${rel}`);
}
if (!process.exitCode) ok("SKILL.md reference paths resolve");

const fixtureRoot = path.join(root, "evals", "fixtures");
if (exists("evals/fixtures")) {
  for (const name of fs.readdirSync(fixtureRoot)) {
    const dir = path.join(fixtureRoot, name);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const requiredFixture of ["conversation.md", "existing-page.md", "expected.json"]) {
      const full = path.join(dir, requiredFixture);
      if (!fs.existsSync(full)) fail(`fixture ${name} missing ${requiredFixture}`);
    }
    try {
      JSON.parse(fs.readFileSync(path.join(dir, "expected.json"), "utf8"));
      ok(`fixture valid: ${name}`);
    } catch (error) {
      fail(`fixture ${name} has invalid expected.json — ${error.message}`);
    }
  }
}

const gitignore = read(".gitignore");
for (const ignored of [".claude/push-target.local.json", ".walnut/"]) {
  if (!gitignore.includes(ignored)) fail(`.gitignore does not protect ${ignored}`);
}
if (!process.exitCode) ok("private Walnut state paths are ignored");

if (process.exitCode) {
  process.exit(process.exitCode);
}
console.log("Walnut repository validation passed.");
