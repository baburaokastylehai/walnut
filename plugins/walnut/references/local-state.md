# Local project and reader state

Before saving state, confirm `.walnut/` and `.claude/push-target.local.json` are ignored in the actual user project. A plugin repository’s ignore rules do not propagate into host projects. Do not put credentials in state. Save atomically (write a temporary file and rename) after successful operations. If state cannot be saved, say the next run may need setup/reconciliation; do not claim a checkpoint persisted.

## Destination

Both skills use `.walnut/project.json`:

```json
{
  "schemaVersion": 1,
  "target": {"provider": "confluence", "cloudId": "example-site", "pageId": "123"}
}
```

Target identity includes provider, cloud/site and page. Reuse this target. Recover from legacy `.claude/push-target.local.json` (cloudId/pageId) or an existing pull-state target when no common target exists. Verify the page before saving the common target. Preserve legacy mirror mappings, context-file offer flags and checkpoint fields; do not destroy the legacy file to move two target fields.

If saved targets disagree, stop target-dependent work and ask which page to use. An explicitly requested retarget may select another page, but must start a new reader baseline and never carry old ledger cursors, mappings or IDs into the new page. A merely pasted link is not retarget authorization.

Push metadata may remain in the legacy state or `.walnut/push-state.json`. Preserve pending batch IDs/events until verified. Run pending-event recovery before the no-op gate on every push; the shared ledger contract defines the retained evidence and exactly-once replay check. Never expose raw candidate ledgers or provenance containing private source content by committing state.

## Reader

`.walnut/pull-state.json` belongs to one local reader. Include target, role, roleSource (explicit/inferred/general), role evidence, lastPulledAt, observed revision, semantic record snapshots, child versions/snapshots and `ledger: {epoch, sequence}` when available. Store only evidence needed for the lens; no account identifiers or employer inference are required.

A successful checkpoint requires lastPulledAt and a usable snapshot or ledger baseline, not just a role string. Same person and same target are required for recurring comparison. Another person uses a separate local workspace/profile. Do not claim automatic multi-account isolation.

A temporary role lens does not change the saved role or reset last-seen state. A permanent role change updates the role while preserving the checkpoint. Incomplete reads, unread changed children or partial briefings retain the previous checkpoint.
