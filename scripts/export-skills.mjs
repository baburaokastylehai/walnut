import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const repository = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(repository, 'plugins/walnut');

function files(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const name = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Unexpected source symlink: ${name}`);
    return entry.isDirectory() ? files(name) : [name];
  });
}

// Each export is independent: no shared sibling directory or source-checkout links.
export function exportSkills(destination) {
  const output = path.resolve(destination);
  const names = ['push', 'pull'];
  for (const name of names) {
    if (fs.lstatSync(path.join(output, name), {throwIfNoEntry: false})) throw new Error(`Destination already exists: ${path.join(output, name)}. Export to a fresh directory; review upgrades before replacing an installed skill.`);
  }
  const plans = names.map(name => {
    const skill = path.join(source, 'skills', name);
    const mapping = new Map([
      ...files(skill).map(file => [file, path.relative(skill, file)]),
      ...files(path.join(source, 'references')).map(file => [file, path.join('references/walnut', path.relative(path.join(source, 'references'), file))]),
      ...files(path.join(source, 'scripts')).map(file => [file, path.join('scripts', path.relative(path.join(source, 'scripts'), file))]),
      [path.join(repository, 'LICENSE'), 'LICENSE'],
    ]);
    const rendered = [];
    for (const [file, target] of mapping) {
      let bytes = fs.readFileSync(file);
      if (file.endsWith('.md')) {
        const text = bytes.toString('utf8').replace(/(?:\.\.?\/)*(?:references|scripts)\/[A-Za-z0-9_./-]+\.(?:md|mjs)/g, reference => {
          const resolved = path.resolve(path.dirname(file), reference);
          if (!mapping.has(resolved)) return reference; // e.g. a link's human-readable label
          return path.relative(path.dirname(target), mapping.get(resolved)).split(path.sep).join('/');
        });
        bytes = Buffer.from(text);
      }
      rendered.push([target, bytes]);
    }
    return {name, rendered};
  });
  // All input reads and conflict checks finish before writing either skill.
  fs.mkdirSync(output, {recursive: true});
  for (const {name, rendered} of plans) {
    fs.mkdirSync(path.join(output, name));
    for (const [target, bytes] of rendered) {
      const file = path.join(output, name, target);
      fs.mkdirSync(path.dirname(file), {recursive: true});
      fs.writeFileSync(file, bytes, {flag: 'wx'});
    }
  }
  return names.map(name => path.join(output, name));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 3) {
    console.error('Usage: node scripts/export-skills.mjs <destination-directory>');
    process.exitCode = 1;
  } else {
    try { console.log(exportSkills(process.argv[2]).join('\n')); }
    catch (error) { console.error(error.message); process.exitCode = 1; }
  }
}
