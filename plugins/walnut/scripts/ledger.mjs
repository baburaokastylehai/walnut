import fs from 'node:fs';
import {pathToFileURL} from 'node:url';

const actions = new Set(['add', 'refine', 'supersede', 'resolve', 'reopen', 'withdraw', 'overview', 'mirror']);
const nonempty = x => typeof x === 'string' && x.trim().length > 0;

// Structural checks only. Truth, permission and semantic changes require source review.
export function validateLedger(ledger) {
  const errors = [];
  if (!ledger || typeof ledger !== 'object') return ['ledger must be an object'];
  if (ledger.schemaVersion !== 1) errors.push('unsupported schemaVersion');
  if (!nonempty(ledger.epoch)) errors.push('epoch is required');
  for (const key of ['baseSequence', 'headSequence']) {
    if (!Number.isSafeInteger(ledger[key]) || ledger[key] < 0) errors.push(`${key} must be a nonnegative safe integer`);
  }
  if (ledger.headSequence < ledger.baseSequence) errors.push('head precedes base');
  if (!Array.isArray(ledger.entries)) return [...errors, 'entries must be an array'];
  if (ledger.entries.length !== ledger.headSequence - ledger.baseSequence) errors.push('entries do not cover base through head');
  const ids = new Set();
  ledger.entries.forEach((entry, index) => {
    const at = `entry ${index + 1}`;
    if (!entry || typeof entry !== 'object') { errors.push(`${at} must be an object`); return; }
    if (entry.sequence !== ledger.baseSequence + index + 1) errors.push(`${at} breaks sequence continuity`);
    for (const key of ['eventId', 'batchId', 'recordId', 'summary', 'source', 'publishedAt']) {
      if (!nonempty(entry[key])) errors.push(`${at} needs ${key}`);
    }
    if (ids.has(entry.eventId)) errors.push(`${at} repeats an eventId`);
    ids.add(entry.eventId);
    if (!actions.has(entry.action)) errors.push(`${at} has an unsupported action`);
    for (const key of ['before', 'after']) {
      if (entry[key] !== null && !nonempty(entry[key])) errors.push(`${at} needs a text or null ${key}`);
    }
    if (entry.before === null && entry.after === null) errors.push(`${at} has no semantic content`);
    if (!Number.isFinite(Date.parse(entry.publishedAt))) errors.push(`${at} has an invalid publishedAt`);
  });
  return errors;
}

// The caller must establish same reader and same destination before using a cursor.
// Events never replace snapshot comparison: manual edits can bypass the ledger.
export function ledgerCoverage(ledger, cursor) {
  if (!ledger) return {mode: 'snapshot', reason: 'missing_ledger'};
  const errors = validateLedger(ledger);
  if (errors.length) return {mode: 'snapshot', reason: 'invalid_ledger', errors};
  if (!cursor) return {mode: 'snapshot', reason: 'missing_cursor'};
  if (cursor.epoch !== ledger.epoch) return {mode: 'snapshot', reason: 'changed_epoch'};
  if (!Number.isSafeInteger(cursor.sequence) || cursor.sequence < ledger.baseSequence || cursor.sequence > ledger.headSequence) {
    return {mode: 'snapshot', reason: 'uncovered_cursor'};
  }
  return {mode: 'ledger_and_snapshot', entries: ledger.entries.filter(e => e.sequence > cursor.sequence), headSequence: ledger.headSequence};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 3) throw new Error('usage: node ledger.mjs <ledger.json>');
    const errors = validateLedger(JSON.parse(fs.readFileSync(process.argv[2], 'utf8')));
    if (errors.length) throw new Error(errors.join('\n'));
    console.log('Ledger structure is valid. Source review is still required.');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
