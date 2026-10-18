# Confluence destination for pull

Confluence is the first shared-context source for `/pull`.

## Read-only contract

`/pull` reads the Walnut-maintained project page and relevant child pages.

It never updates:
- the main Confluence page;
- child pages;
- Decisions/Requirements/Open Questions;
- Project Files;
- Linked Resources.

Only local pull state may change.

## Target resolution

Follow [the shared local-state contract](../../../../references/local-state.md). Both skills reuse `.walnut/project.json`. Recover a legacy target only when there is no common target, verify it before saving, and resolve any disagreement among saved targets first. Never retarget from a merely mentioned link. Explicit retargeting starts a new destination baseline.

## What to read

Always read the main page.

Read child pages selectively when:
- the main page points to them for a large category;
- Project Files says a mirrored document contains context relevant to the person's role;
- a changed child-page version may contain new project information;
- the main page references a child page needed to understand a decision/change.

Do not recursively crawl unrelated Confluence spaces.

## Revision tracking

Record the observed main-page version and relevant child-page versions/fingerprints in local pull state.

Page version alone is not semantic change; use it as a signal to inspect content.

## Shared ledger

Read `../../../../references/change-ledger.md`. Read the JSON code block from the main page and apply the ledger contract. If the connector cannot expose it intact, use semantic snapshot comparison and disclose incomplete continuity when relevant. Pull does not publish or repair ledger data.

## Operation-level results

Inspect the returned operation payload as well as the outer tool status. A call may have no transport error while returning `ok: false`, `snapshot_stale`, a denied permission or another non-persisted result. Treat it as a failed operation. For a stale write, refetch and reconcile within the single-retry concurrency policy; do not report success or advance a checkpoint. Verify the intended records, batch/event identity and resulting revision through read-back before accepting any write.
