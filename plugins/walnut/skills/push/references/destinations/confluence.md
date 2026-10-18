# Confluence destination

Confluence is Walnut's first destination adapter.

## Target resolution

Follow [the shared local-state contract](../../../../references/local-state.md). Both skills reuse `.walnut/project.json`. Recover a legacy target only when there is no common target, verify it before saving, and resolve any disagreement among saved targets first. Never retarget from a merely mentioned link. Explicit retargeting starts a new destination baseline.

## Capabilities

Before doing expensive extraction on a new setup, confirm that the host environment can read and update Confluence.

If required Confluence capabilities are unavailable, stop before publication work and explain the concrete missing connection.

## Main page

Maintain the synthesized project record on the configured page.

Use the category order and identity rules from the knowledge model.

## Child pages

Use child pages for eligible project-file mirrors and for categories that become too large to remain readable on the main page.

Reuse existing child pages when their mapping is known.

Do not recreate a child page solely because the plugin version changed.

## Links

Prefer real Confluence links/anchors for cross-references when supported.

Broken external links should not be presented as healthy resources.

## Shared ledger

Read `../../../../references/change-ledger.md`. Preserve the JSON code block through storage-format conversion; do not strip it as formatting noise. If the connector cannot preserve it, stop publication and explain the limitation. Read it from the main page before reconciling or briefing.

## Operation-level results

Inspect the returned operation payload as well as the outer tool status. A call may have no transport error while returning `ok: false`, `snapshot_stale`, a denied permission or another non-persisted result. Treat it as a failed operation. For a stale write, refetch and reconcile within the single-retry concurrency policy; do not report success or advance a checkpoint. Verify the intended records, batch/event identity and resulting revision through read-back before accepting any write.
