# v0.3 candidate validation

## Completed locally

- Repository validator: manifests, packaged references, local Markdown links, fixture shape, demo ledger/page consistency, PNG asset and private-identifier checks.
- Node helper tests: contiguous consumption, current cursors with snapshot comparison, missing/reset/out-of-range cursors, archived prefixes, gaps, duplicate event IDs, malformed payloads and nonmutation.
- Author policy dry-run against the beta scenarios: traced required decisions through the installed skill references. This is policy review, not an independent agent execution or a live connector test.

Local reference checks and policy review exposed issues that were corrected: nested destination references needed another parent-directory level, and no-change pull needed to complete its successful checkpoint rather than stopping before that step. Saved-target resolution was also consolidated so old profile hints cannot silently override the shared target.

The expected behaviors remain encoded in `beta-scenarios.json`. A separate reviewer agent subsequently exercised five cases against local fake destinations, executed eight extra ledger-helper edge cases, and performed four follow-up pending-recovery simulations. [Captured evidence and method](reviews/2026-10-17/README.md) keep these results reviewable. They are independent policy simulations, not actual host/connector execution.

That review found and corrected a missing recovery step: pending mirror events must be examined before the next push’s no-op exit. The unchanged-next-run case now preserves stable event identity, allocates from the current head, reads back and clears pending state only after verification. Already-published and stale-child cases are covered separately. The demo was also corrected so an intended unadopted assistant suggestion is not confused with a confirmed human scope deferral.

## Acceptance update

[Candidate acceptance evidence](acceptance/2026-10-17/README.md) now records actual Claude Code package loading, isolated local marketplace installation and both discovered skills, five additional reviewer-driven failure exercises with 68 invariant checks, and six UX samples. Both strict host validators pass without warnings.

## Host-neutral acceptance update

Walnut's core target is any capable host that can read the complete skills, access sources and authenticated destination tools, and persist private state. The earlier Claude-only authenticated gate is superseded by this product decision. Claude remains an optional adapter; its untested authenticated invocation must not be reported as passed.

Independent exported-skill containment, helper execution, determinism and no-overwrite tests pass. [Portable host evidence](HOST-PORTABILITY.md) records a live exported pull trial in Codex, first/no-change responses and actual private checkpoint persistence. Earlier live Codex push/pull checks remain evidence for their actual scope. Neither proves every host's native discovery or universal compatibility.

## Still required before merge/release

- Keep the [portable acceptance evidence](HOST-PORTABILITY.md) attached to the candidate; it separates live behavior, simulated faults and native loading.
- Confirm final CI and independent review. Keep the independent/public versus legacy/private separation intact.
- After merge, verify fetching the public candidate from main; optional marketplace fetching is a separate adapter check.

Keep draft during final integration. Repeated live concurrency/transport stress and optional Claude authenticated execution remain follow-ups with their coverage limits explicit. No user Claude login is required for core beta validation. No claim is made about deletion of retained backups or external copies.

## Initial live test preflight

The first access attempt was denied before page creation. After the personal connection was authorized, a dedicated child test page was created and the checks below were completed. Another site was never used as a fallback. Site identifiers and raw responses stay outside the public repository.

## Connector retest completed

The user-selected personal connection is now authorized. [Live connector evidence](LIVE-CONNECTOR-VALIDATION.md) records publish/read-back, no-op, first/recurring reader behavior, native JSON code-block preservation, direct edits without events, stale-snapshot rejection and controlled cross-page recovery. The parent page was unchanged. The remaining limitations are explicit in that report.

## PM-driven discovery walkthrough

The public demo now follows a PM exploring a product across AI sessions, returning to saved rationale and bringing teammates into an evolving direction. Confirmation wording explicitly preserves human-owned proposals/hypotheses with their tentative status. [Independent reviewer proposals and response](reviews/2026-10-18/README.md) are separate from illustrative demo outputs and historical live evidence. The prior small dataset remains regression data, not the product story.
