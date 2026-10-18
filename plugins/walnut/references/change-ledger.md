# Shared Change Ledger — v1

The private candidate ledger explains what might be published. This persistent ledger explains what actually changed. `/push` writes it; `/pull` reads it. Store it on the main shared page under `Change Ledger` as a JSON code block, alongside the human-readable record. Do not put reader identity or role in it.

## Envelope

```json
{
  "schemaVersion": 1,
  "epoch": "project-generated-uuid",
  "baseSequence": 0,
  "headSequence": 1,
  "entries": [{
    "sequence": 1,
    "eventId": "unique-batch-id:1",
    "batchId": "unique-batch-id",
    "recordId": "D1",
    "action": "add",
    "summary": "Bookings are limited to six per slot.",
    "before": null,
    "after": "At most six confirmed bookings per slot.",
    "source": "requirements.md: Booking capacity — human approved",
    "publishedAt": "2026-10-17T18:00:00Z"
  }]
}
```

Sequence is a strictly increasing project-wide integer, not a page revision or time. Epoch is stable for this ledger’s lifetime. Action is `add`, `refine`, `supersede`, `resolve`, `reopen`, `withdraw`, `overview`, or `mirror`. Use existing D/R/Q IDs; use `overview` or a stable child-page ID for non-record changes. Preserve affected/replacement IDs in the summary when needed. Before/after carry the minimum semantic context, not raw conversations or secrets. Source identifies supporting evidence; do not invent a timestamp or author.

## Publish and recovery

Allocate a unique batchId before writing and retain it privately until verified. Reuse it for retries. Append one event per semantic change, contiguous after headSequence, updating headSequence in the same revision-guarded main-page write as the record changes. Keep existing events immutable. No-op and formatting-only changes create no event. A wording-only mirror update is not a semantic ledger event.

Read back both records and events. A timeout may mean the server accepted the write: first search for the batch and verify, then retry only missing work after reconciliation. Never reuse a sequence from an uncertain write without rereading. Child mirrors require separate writes; use the partial-write recovery in push’s verification step.

For a legacy page, initialize an empty ledger at sequence 0 alongside the next real change; do not label all old records new. Preserve records, IDs, history and child mappings. If there is no actual change, leave the legacy page alone and let pull use snapshots.

Beta does not compact or reset the ledger automatically. If an operator archives a prefix, preserve the epoch, set baseSequence to the highest removed sequence, and keep the archive linked. Entries then cover baseSequence+1 through headSequence. Corruption or a deliberate reset requires a new epoch and a disclosed pull rebaseline, never fabricated continuity.

## Consume

Read the current page and ledger; it is an index, not a substitute for the records. For the same target and epoch, consume entries after the person’s seen sequence only when coverage is contiguous and the cursor is between baseSequence and headSequence. Coalesce multiple changes to a record into its net effect while retaining meaningful reversals and resolved questions. Still inspect current records and changed children: direct human edits may bypass push and have no ledger event.

Missing ledger, changed epoch, expired/ahead cursor, gaps, malformed entries or an old profile means use semantic snapshot comparison. Explain an approximate comparison if prior detail is insufficient; do not claim an exact delta or silently report no change. First pull establishes a baseline without calling every event new. Save the cursor only after complete reading and briefing, together with snapshots so manual edits remain detectable.

## Optional structural helper

With Node.js available, validate a local JSON ledger before publication using [scripts/ledger.mjs](../scripts/ledger.mjs): run the linked script with `node` and the ledger JSON file path. Pull can use its exported `ledgerCoverage` helper to check sequence coverage. With no Node runtime, apply the same rules directly. It validates structure, not source confirmation, permission or semantic equivalence. It never writes the shared page.

## Recover pending mirror events before no-op

After verifying a child write, retain enough private pending state to recover its event: target identity, child ID, stable batchId/eventId, proposed event payload, verified child revision and a semantic snapshot/fingerprint. Save this evidence before attempting the separate main-page append. If pending state cannot be saved and the append is uncertain, report that recovery needs source/destination reconciliation; do not claim a durable recovery record exists.

On every push, after resolving the target and reading durable state but before the no-op gate:

1. Read pending events for the same target. Keep events for other targets separate; never replay them onto the selected page.
2. Reread the main ledger. If the exact event/batch is already present, verify its payload and the affected record/child evidence, then clear the local pending event. A conflicting payload with the same identity is a recovery conflict.
3. If the event is missing, read the child and compare it with the saved verified revision and semantic snapshot. If it still represents the recorded change, append the missing event at the current head using the existing batch/event identity and the normal revision guard. Allocate its sequence from the current main page, not the failed attempt.
4. Read the main page back and verify the event before clearing pending state. A repeated timeout must reread the event before any further write.
5. If the child has materially changed or the saved evidence is insufficient, retain pending state and surface the concrete mismatch for reconciliation. Do not manufacture a successful replay or return the normal no-change success message.

The recovery append is valid publication work even if the new source diff is empty. The guard still allows only one reconciliation retry before stopping on repeated concurrent edits.
