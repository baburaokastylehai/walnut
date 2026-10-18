import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateLedger, ledgerCoverage} from '../plugins/walnut/scripts/ledger.mjs';

const root = new URL('../examples/product-discovery/', import.meta.url);
const read = name => JSON.parse(fs.readFileSync(new URL(name, root)));
const initial = read('ledger-initial.json');
const current = read('ledger-current.json');
const reader = read('reader-after-first-pull.json');

test('the discovery reversal retains the original ledger and reader baseline', () => {
  assert.deepEqual(validateLedger(initial), []);
  assert.deepEqual(validateLedger(current), []);
  assert.equal(current.epoch, initial.epoch);
  assert.deepEqual(current.entries.slice(0, initial.entries.length), initial.entries);
  assert.deepEqual(reader.ledger, {epoch: initial.epoch, sequence: initial.headSequence});
  assert.deepEqual(Object.keys(reader.seen).sort(), initial.entries.map(entry => entry.recordId).sort());
  const delta = ledgerCoverage(current, reader.ledger);
  assert.equal(delta.mode, 'ledger_and_snapshot');
  assert.deepEqual(delta.entries.map(entry => [entry.recordId, entry.action]), [
    ['D2', 'supersede'], ['R1', 'refine'], ['D3', 'add'],
    ['Q1', 'resolve'], ['P1', 'withdraw'], ['Q2', 'add'],
  ]);
  assert.equal(delta.headSequence, current.headSequence);
  assert.deepEqual(ledgerCoverage(current, {epoch: current.epoch, sequence: current.headSequence}).entries, []);
});

test('refinement, question resolution and proposal deferral preserve prior substance', () => {
  for (const record of ['R1', 'Q1', 'P1']) {
    const before = initial.entries.find(entry => entry.recordId === record);
    const change = current.entries.slice(initial.entries.length).find(entry => entry.recordId === record);
    assert.equal(change.before, before.after, `${record} must not lose its earlier substance`);
    assert.notEqual(change.after, change.before);
  }
});

test('every discovery event cites accessible fictional source files', () => {
  for (const event of current.entries) {
    const sources = [...event.source.matchAll(/sources\/[a-z0-9-]+\.md/g)];
    assert.ok(sources.length, `${event.eventId} needs a source locator`);
    for (const [source] of sources) assert.ok(fs.existsSync(new URL(source, root)), `${event.eventId}: ${source}`);
  }
});
