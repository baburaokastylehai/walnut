# v0.3 candidate validation

## Completed locally

- Repository validator: manifests, packaged references, local Markdown links, fixture shape, demo ledger/page consistency, PNG asset and private-identifier checks.
- Node helper tests: contiguous consumption, current cursors with snapshot comparison, missing/reset/out-of-range cursors, archived prefixes, gaps, duplicate event IDs, malformed payloads and nonmutation.
- Author policy dry-run against the beta scenarios: traced required decisions through the installed skill references. This is policy review, not an independent agent execution or a live connector test.

Local reference checks and policy review exposed issues that were corrected: nested destination references needed another parent-directory level, and no-change pull needed to complete its successful checkpoint rather than stopping before that step. Saved-target resolution was also consolidated so old profile hints cannot silently override the shared target.

The expected behaviors remain encoded in `beta-scenarios.json`. A separate reviewer agent subsequently exercised five cases against local fake destinations, executed eight extra ledger-helper edge cases, and performed four follow-up pending-recovery simulations. [Captured evidence and method](reviews/2026-10-17/README.md) keep these results reviewable. They are independent policy simulations, not actual host/connector execution.

That review found and corrected a missing recovery step: pending mirror events must be examined before the next push’s no-op exit. The unchanged-next-run case now preserves stable event identity, allocates from the current head, reads back and clears pending state only after verification. Already-published and stale-child cases are covered separately. The demo was also corrected so an intended unadopted assistant suggestion is not confused with a confirmed human scope deferral.

## Still required before merge/release

- Load the actual package in Claude Code and verify both namespaced skills appear.
- On a disposable Confluence page, exercise first push, no-op push, first pull, recurring pull and a manual edit without a ledger event.
- Verify ledger code-block preservation through the connected tool’s actual storage format.
- Exercise failed reads, concurrent edits and partial mirror-event recovery without losing history or advancing an incomplete reader checkpoint.
- Verify the legacy repository is private and the replacement public repository contains only independent clean history before declaring public access removed. This does not claim deletion of retained backups or external copies; no Support request is planned.

The PR stays draft until these checks are completed. No live project page was used for this validation.

## Live test preflight

A user-selected personal test destination was supplied. The current Atlassian connection rejected access to that site before reading content. No test page was created or changed. The live test remains pending until that site is authorized in the connector; access to another site is never a fallback. Site identifiers and raw access responses stay outside the public repository.
