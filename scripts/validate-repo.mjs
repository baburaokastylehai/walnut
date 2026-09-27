import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}
function ok(message) { console.log(`OK: ${message}`); }
function read(rel) { return fs.readFileSync(path.join(root, rel), "utf8"); }
function exists(rel) { return fs.existsSync(path.join(root, rel)); }

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
  "plugins/pull/.claude-plugin/plugin.json",
  "plugins/pull/skills/pull/SKILL.md",
  "plugins/pull/skills/pull/references/onboarding.md",
  "plugins/pull/skills/pull/references/change-detection.md",
  "plugins/pull/skills/pull/references/role-lenses.md",
  "plugins/pull/skills/pull/references/brief-format.md",
  "plugins/pull/skills/pull/references/voice.md",
  "plugins/pull/skills/pull/references/destinations/confluence.md",
  "docs/PRODUCT.md",
  "docs/ARCHITECTURE.md",
  "docs/PULL.md",
  "docs/brand/VOICE.md",
  "docs/VERSIONING.md",
  "docs/REPOSITORY.md",
  "evals/README.md"
];

for (const rel of required) if (!exists(rel)) fail(`missing required file: ${rel}`);
if (!process.exitCode) ok("required Walnut files exist");

const jsonFiles = [
  ".claude-plugin/marketplace.json",
  "plugins/push/.claude-plugin/plugin.json",
  "plugins/pull/.claude-plugin/plugin.json"
];
for (const rel of jsonFiles) {
  try { JSON.parse(read(rel)); ok(`valid JSON: ${rel}`); }
  catch (error) { fail(`invalid JSON: ${rel} — ${error.message}`); }
}

const push = JSON.parse(read("plugins/push/.claude-plugin/plugin.json"));
if (push.version !== "0.2.0") fail(`push version is ${push.version}, expected 0.2.0`);
else ok("push version is 0.2.0");

const pull = JSON.parse(read("plugins/pull/.claude-plugin/plugin.json"));
if (pull.version !== "0.1.0") fail(`pull version is ${pull.version}, expected 0.1.0`);
else ok("pull version is 0.1.0");

for (const [skillRoot, skillFile] of [
  ["plugins/push/skills/push", "plugins/push/skills/push/SKILL.md"],
  ["plugins/pull/skills/pull", "plugins/pull/skills/pull/SKILL.md"]
]) {
  const skill = read(skillFile);
  const refs = [...new Set(skill.match(/references\/[A-Za-z0-9_./-]+\.md/g) || [])];
  for (const ref of refs) {
    const rel = path.join(skillRoot, ref);
    if (!exists(rel)) fail(`${skillFile} references missing file: ${rel}`);
  }
}
if (!process.exitCode) ok("skill reference paths resolve");

for (const fixtureDir of ["evals/fixtures", "evals/pull-fixtures"]) {
  if (!exists(fixtureDir)) continue;
  for (const name of fs.readdirSync(path.join(root, fixtureDir))) {
    const dir = path.join(root, fixtureDir, name);
    if (!fs.statSync(dir).isDirectory()) continue;
    const requiredFixture = fixtureDir.endsWith("pull-fixtures")
      ? ["current-page.md", "profile.json", "expected.json"]
      : ["conversation.md", "existing-page.md", "expected.json"];
    for (const file of requiredFixture) {
      if (!fs.existsSync(path.join(dir, file))) fail(`fixture ${fixtureDir}/${name} missing ${file}`);
    }
    try {
      JSON.parse(fs.readFileSync(path.join(dir, "expected.json"), "utf8"));
      JSON.parse(fs.readFileSync(path.join(dir, "profile.json"), "utf8"));
      ok(`fixture valid: ${fixtureDir}/${name}`);
    } catch (error) {
      fail(`fixture ${fixtureDir}/${name} has invalid JSON — ${error.message}`);
    }
  }
}

const gitignore = read(".gitignore");
for (const ignored of [".claude/push-target.local.json", ".walnut/"]) {
  if (!gitignore.includes(ignored)) fail(`.gitignore does not protect ${ignored}`);
}
if (!process.exitCode) ok("private Walnut state paths are ignored");

if (process.exitCode) process.exit(process.exitCode);
console.log("Walnut repository validation passed.");
