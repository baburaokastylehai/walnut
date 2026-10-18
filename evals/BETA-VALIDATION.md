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
- Complete any remaining live failure-injection cases; normal publish/read/no-op/manual-edit cases have now run through the real connector.
- Complete controlled live failed-required-read and repeated-concurrent-writer fault cases if required for release; current evidence distinguishes these simulations from actual stale-write rejection and mirror recovery.
- Keep the verified independent/public versus legacy/private separation intact. No claim is made about deletion of retained backups or external copies.

The PR stays draft while the remaining merge gates are open. The only live test pages contain fictional content.

## Initial live test preflight

The first access attempt was denied before page creation. After the personal connection was authorized, a dedicated child test page was created and the checks below were completed. Another site was never used as a fallback. Site identifiers and raw responses stay outside the public repository.

## Connector retest completed

The user-selected personal connection is now authorized. [Live connector evidence](LIVE-CONNECTOR-VALIDATION.md) records publish/read-back, no-op, first/recurring reader behavior, native JSON code-block preservation, direct edits without events, stale-snapshot rejection and controlled cross-page recovery. The parent page was unchanged. The remaining limitations are explicit in that report.
