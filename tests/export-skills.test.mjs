import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {exportSkills} from '../scripts/export-skills.mjs';

function workspace(t) {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'walnut-export-'));
  t.after(() => fs.rmSync(folder, {recursive: true, force: true}));
  return folder;
}
function contents(root, base = root) {
  return fs.readdirSync(root, {withFileTypes: true}).flatMap(entry => {
    assert.equal(entry.isSymbolicLink(), false);
    const file = path.join(root, entry.name);
    return entry.isDirectory() ? contents(file, base) : [[path.relative(base, file), fs.readFileSync(file)]];
  });
}

test('each exported skill keeps all runtime references inside its own folder', t => {
  for (const root of exportSkills(workspace(t))) {
    assert.ok(fs.existsSync(path.join(root, 'SKILL.md')));
    assert.ok(fs.existsSync(path.join(root, 'LICENSE')));
    let checked = 0;
    for (const [relative, bytes] of contents(root).filter(([file]) => file.endsWith('.md'))) {
      const text = bytes.toString();
      const references = [
        ...[...text.matchAll(/\]\(([^)]+)\)/g)].map(match => match[1]),
        ...[...text.matchAll(/`((?:\.\.?\/)*(?:references|scripts)\/[^`\s]+)`/g)].map(match => match[1]),
      ];
      for (const reference of references) {
        if (/^[a-z]+:/i.test(reference)) continue;
        const target = path.resolve(root, path.dirname(relative), reference.split('#')[0]);
        assert.ok(target.startsWith(root + path.sep), `${relative} escapes: ${reference}`);
        assert.ok(fs.existsSync(target), `${relative} missing: ${reference}`);
        checked++;
      }
    }
    assert.ok(checked > 15, 'runtime references were actually inspected');
  }
});

test('portable helper works from either exported skill without source imports', async t => {
  for (const root of exportSkills(workspace(t))) {
    const helper = path.join(root, 'scripts/ledger.mjs');
    const {validateLedger} = await import(pathToFileURL(helper));
    assert.ok(validateLedger({}).length > 0);
    const fixture = fileURLToPath(new URL('../examples/product-discovery/ledger-current.json', import.meta.url));
    const standaloneInput = path.join(root, 'ledger.json');
    fs.copyFileSync(fixture, standaloneInput);
    execFileSync(process.execPath, [helper, standaloneInput], {cwd: root});
  }
});

test('exports are deterministic and refuse existing skills before any write', t => {
  const base = workspace(t);
  const first = path.join(base, 'first');
  const second = path.join(base, 'second');
  exportSkills(first);
  exportSkills(second);
  assert.deepEqual(contents(first), contents(second));
  const blocked = path.join(base, 'existing');
  fs.mkdirSync(path.join(blocked, 'pull'), {recursive: true});
  fs.writeFileSync(path.join(blocked, 'pull/SKILL.md'), 'my existing skill');
  assert.throws(() => exportSkills(blocked), /already exists/);
  assert.equal(fs.existsSync(path.join(blocked, 'push')), false);
  assert.equal(fs.readFileSync(path.join(blocked, 'pull/SKILL.md'), 'utf8'), 'my existing skill');
});

test('export CLI resolves sources from its own location, not the working directory', t => {
  const base = workspace(t);
  const cli = fileURLToPath(new URL('../scripts/export-skills.mjs', import.meta.url));
  const output = path.join(base, 'skills with spaces');
  execFileSync(process.execPath, [cli, output], {cwd: base});
  assert.ok(fs.existsSync(path.join(output, 'pull/SKILL.md')));
  assert.ok(fs.existsSync(path.join(output, 'push/references/walnut/host-capabilities.md')));
});

test('a dangling destination symlink blocks both exports before writing', t => {
  const output = workspace(t);
  const existing = path.join(output, 'pull');
  fs.symlinkSync(path.join(output, 'missing-skill'), existing, 'dir');
  assert.throws(() => exportSkills(output), /already exists/);
  assert.equal(fs.existsSync(path.join(output, 'push')), false);
  assert.equal(fs.lstatSync(existing).isSymbolicLink(), true);
});
