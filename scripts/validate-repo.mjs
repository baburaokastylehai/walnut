import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {validateLedger} from '../plugins/walnut/scripts/ledger.mjs';
const root = process.cwd();
const pluginRoot = 'plugins/walnut';
let failures = 0;
const fail = message => { console.error(`FAIL: ${message}`); failures++; };
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = rel => fs.existsSync(path.join(root, rel));
function walk(rel = '') {
  return fs.readdirSync(path.join(root, rel), {withFileTypes: true}).flatMap(entry => {
    if (['.git', '.walnut', 'node_modules'].includes(entry.name)) return [];
    const name = path.join(rel, entry.name);
    return entry.isDirectory() ? walk(name) : [name];
  });
}
const required = ['README.md', 'LICENSE', 'CONTRIBUTING.md', 'SECURITY.md', '.claude-plugin/marketplace.json', `${pluginRoot}/.claude-plugin/plugin.json`,
  'docs/SETUP.md', 'docs/LIMITATIONS.md', 'docs/VERSIONING.md', 'docs/ARCHITECTURE.md', 'assets/walnut-architecture.png',
  ...['character', 'project-language', 'change-ledger', 'local-state'].map(x => `${pluginRoot}/references/${x}.md`),
  ...['push', 'pull'].map(x => `${pluginRoot}/skills/${x}/SKILL.md`)];
for (const name of required) if (!exists(name)) fail(`missing ${name}`);
if (failures) process.exit(1);
const files = walk();
const data = new Map();
for (const name of files.filter(x => x.endsWith('.json'))) {
  try { data.set(name, JSON.parse(read(name))); }
  catch { fail(`invalid JSON: ${name}`); }
}
const marketplace = data.get('.claude-plugin/marketplace.json');
const manifest = data.get(`${pluginRoot}/.claude-plugin/plugin.json`);
if (marketplace?.plugins?.length !== 1 || marketplace.plugins[0].name !== 'walnut' || marketplace.plugins[0].source !== './plugins/walnut') fail('marketplace must ship one Walnut package');
if (manifest?.name !== 'walnut' || manifest.version !== '0.3.0' || manifest.license !== 'MIT') fail('incorrect Walnut package metadata');
for (const skill of ['push', 'pull']) {
  const rel = `${pluginRoot}/skills/${skill}/SKILL.md`;
  const content = read(rel);
  if (!content.startsWith(`---\nname: ${skill}\ndescription: `) || !content.slice(4).includes('\n---\n')) fail(`invalid skill frontmatter: ${rel}`);
  for (const ref of new Set(content.match(/(?:\.\.\/)*references\/[A-Za-z0-9_./-]+\.md/g) || [])) {
    const target = path.resolve(root, path.dirname(rel), ref);
    if (!target.startsWith(path.resolve(root, pluginRoot) + path.sep) || !fs.existsSync(target)) fail(`unpackaged runtime reference: ${rel} -> ${ref}`);
  }
}
// Check local Markdown links, including nested references, in a package that is cached alone.
for (const rel of files.filter(x => x.endsWith('.md'))) {
  const content = read(rel);
  for (const match of content.matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    const resolved = path.resolve(root, path.dirname(rel), decodeURIComponent(target));
    if (!fs.existsSync(resolved)) fail(`broken link: ${rel} -> ${target}`);
    if (rel.startsWith(pluginRoot + '/') && !resolved.startsWith(path.resolve(root, pluginRoot) + path.sep)) fail(`runtime link escapes package: ${rel} -> ${target}`);
  }
}
for (const base of ['evals/fixtures', 'evals/pull-fixtures']) {
  for (const dir of fs.readdirSync(path.join(root, base))) {
    const folder = path.join(base, dir);
    if (!fs.statSync(path.join(root, folder)).isDirectory()) continue;
    const required = base.endsWith('pull-fixtures') ? ['current-page.md', 'profile.json', 'expected.json'] : ['conversation.md', 'existing-page.md', 'expected.json'];
    for (const file of required) if (!exists(path.join(folder, file))) fail(`incomplete fixture: ${folder}/${file}`);
    const expected = data.get(path.join(folder, 'expected.json'));
    if (!expected || typeof expected !== 'object' || !Object.keys(expected).length) fail(`empty fixture expectations: ${folder}`);
  }
}
for (const name of ['examples/nightjar/ledger-initial.json', 'examples/nightjar/ledger-current.json']) {
  const errors = validateLedger(data.get(name));
  for (const error of errors) fail(`${name}: ${error}`);
}
const scenarios = data.get('evals/beta-scenarios.json');
if (!Array.isArray(scenarios) || scenarios.length < 1) fail('beta scenarios missing');
else {
  const ids = new Set();
  for (const scenario of scenarios) {
    if (!scenario.id || ids.has(scenario.id) || !['push', 'pull'].includes(scenario.skill) || !scenario.input || !Array.isArray(scenario.expected) || !scenario.expected.length) fail('invalid or duplicate beta scenario');
    ids.add(scenario.id);
  }
}
for (const phase of ['initial', 'current']) {
  const page = read(`examples/nightjar/shared-brain-${phase}.md`);
  const embedded = page.match(/```json\n([\s\S]*?)\n```/);
  try {
    if (!embedded || JSON.stringify(JSON.parse(embedded[1])) !== JSON.stringify(data.get(`examples/nightjar/ledger-${phase}.json`))) fail(`demo page/ledger mismatch: ${phase}`);
  } catch { fail(`invalid embedded ledger: ${phase}`); }
}
const png = fs.readFileSync(path.join(root, 'assets/walnut-architecture.png'));
if (!png.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) fail('architecture asset is not PNG');
// Fingerprints avoid reproducing known private identifiers in prevention rules.
const fingerprints = new Set(data.get('scripts/private-identifiers.json')?.fingerprints || []);
if (!fingerprints.size) fail('private identifier fingerprints missing');
for (const name of files) {
  const bytes = fs.readFileSync(path.join(root, name));
  const content = name + (bytes.includes(0) ? '' : '\n' + bytes.toString('utf8'));
  for (const token of new Set(content.toLowerCase().match(/[a-z0-9]+/g) || [])) {
    if (fingerprints.has(crypto.createHash('sha256').update(token).digest('hex'))) { fail(`private identifier in ${name}`); break; }
  }
}
for (const ignored of ['.walnut/', '.claude/push-target.local.json']) if (!read('.gitignore').split('\n').includes(ignored)) fail(`unprotected local state: ${ignored}`);
try {
  const tracked = execFileSync('git', ['ls-files', '-z'], {cwd: root, encoding: 'utf8'}).split('\0');
  for (const name of tracked) if (/^(?:\.walnut\/|\.claude\/push-target\.local\.json$)|(?:^|\/)walnut-private-audit\/|\.bundle$/.test(name)) fail(`private state or backup tracked: ${name}`);
} catch { fail('cannot inspect tracked files for private state'); }
if (failures) process.exit(1);
console.log(`Walnut package, links, ${data.size} JSON files, demo ledgers, asset and privacy checks passed.`);
console.log('Semantic skill review and live connector checks are separate.');
