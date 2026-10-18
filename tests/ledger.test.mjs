import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateLedger, ledgerCoverage} from '../plugins/walnut/scripts/ledger.mjs';
const sample = JSON.parse(fs.readFileSync(new URL('../evals/regression-data/nightjar/ledger-current.json', import.meta.url)));
const copy = () => structuredClone(sample);

test('historical regression ledger has complete contiguous event history', () => {
  assert.deepEqual(validateLedger(sample), []);
  const result = ledgerCoverage(sample, {epoch: sample.epoch, sequence: 3});
  assert.equal(result.mode, 'ledger_and_snapshot');
  assert.deepEqual(result.entries.map(x => [x.recordId, x.action]), [['D2', 'supersede'], ['D3', 'add'], ['Q1', 'resolve']]);
  assert.equal(result.headSequence, 6);
});
test('an up-to-date cursor still requests snapshot comparison for manual edits', () => {
  const result = ledgerCoverage(sample, {epoch: sample.epoch, sequence: 6});
  assert.equal(result.mode, 'ledger_and_snapshot');
  assert.deepEqual(result.entries, []);
});
test('missing, reset and uncovered history never produces a false no-change result', () => {
  for (const [ledger, cursor, reason] of [
    [null, null, 'missing_ledger'], [sample, null, 'missing_cursor'],
    [sample, {epoch: 'reset', sequence: 3}, 'changed_epoch'],
    [sample, {epoch: sample.epoch, sequence: 7}, 'uncovered_cursor'],
    [sample, {epoch: sample.epoch, sequence: -1}, 'uncovered_cursor'],
    [sample, {epoch: sample.epoch, sequence: 1.5}, 'uncovered_cursor']
  ]) assert.deepEqual(ledgerCoverage(ledger, cursor), {mode: 'snapshot', reason});
});
test('an archived prefix retains continuity for covered readers only', () => {
  const ledger = copy(); ledger.entries = ledger.entries.slice(3); ledger.baseSequence = 3;
  assert.deepEqual(validateLedger(ledger), []);
  assert.equal(ledgerCoverage(ledger, {epoch: ledger.epoch, sequence: 2}).reason, 'uncovered_cursor');
  assert.equal(ledgerCoverage(ledger, {epoch: ledger.epoch, sequence: 3}).entries.length, 3);
});
test('gaps, duplicates and incomplete payloads are rejected', () => {
  const mutations = [
    l => l.entries.splice(2, 1),
    l => l.entries[2].sequence++,
    l => l.entries[2].eventId = l.entries[1].eventId,
    l => l.entries[0].source = '',
    l => delete l.entries[0].after,
    l => l.entries[0].publishedAt = 'not a date',
    l => l.entries[0].action = 'format',
    l => l.schemaVersion = 2,
    l => l.headSequence = Number.MAX_SAFE_INTEGER + 1,
    l => l.entries[0] = null
  ];
  for (const mutate of mutations) {
    const ledger = copy(); mutate(ledger);
    assert.ok(validateLedger(ledger).length > 0);
    assert.equal(ledgerCoverage(ledger, {epoch: ledger.epoch, sequence: 3}).reason, 'invalid_ledger');
  }
});
test('input ledger and cursor remain unchanged', () => {
  const ledger = copy(); const cursor = {epoch: ledger.epoch, sequence: 3};
  ledgerCoverage(ledger, cursor);
  assert.deepEqual(ledger, sample);
  assert.deepEqual(cursor, {epoch: sample.epoch, sequence: 3});
});
