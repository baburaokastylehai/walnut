# Public-beta readiness

This is the current release map, not a claim that every gate has passed. Review work through the [open PRs](https://github.com/baburaokastylehai/walnut/pulls). Nothing is approved for automatic merge or release.

| Work | Status | Evidence / next step |
|---|---|---|
| One package, push/pull, character and project language | Implemented | `plugins/walnut/` |
| Shared ledger and reader checkpoint contracts | Implemented as instructions; structural helper tested | `references/change-ledger.md`, `scripts/ledger.mjs` inside the plugin |
| Fictional demo, README, exact architecture image and repo hygiene | Implemented | README, `examples/nightjar/`, LICENSE, setup/security/contributing docs |
| Repository checks and Node helper tests | Passing locally and in initial PR CI | Rerun after changes |
| Independent behavioral review | Completed for selected fictional cases | Five first-pass simulations, eight helper edge cases and four recovery simulations; see [evidence](../evals/reviews/2026-10-17/README.md) |
| Real host loading | Pending | Load the actual package in Claude Code and verify both skills |
| Disposable Confluence integration | Waiting for connector access to selected personal site | Preflight rejected before any page creation; then test first/no-op push, first/recurring pull, direct edits, failed reads, concurrency and ledger round trip |
| Independent public repository | Migration in progress | Publish fresh history; retain the legacy repository privately and verify public access is removed. No Support request is planned; this is access removal, not a full-erasure claim |

## What the harness article changes

The [article on harness engineering](https://x.com/0xwhrrari/status/2093685107534000560) supports three focused improvements: independently exercise the behavioral contracts, retain compact private execution evidence, and move critical invariants into executable checks when integration evidence justifies it.

Today, publication guards, read-only pull and recovery are instructions executed by the host. The shipped helper validates ledger shape and cursor coverage; it cannot authorize a write or prove source truth. A future narrow execution adapter could enforce revision preconditions, retry identity and checkpoint commits. A private run receipt could record target, batch, observed/verified revisions, partial status and checkpoint outcome without collecting raw conversations. These are follow-up considerations, not capabilities claimed as shipped.

Parallel agents can review independent concerns now. Shared destination writes and final integration still need coordination: assign one writer per target, reconcile results, rerun checks and preserve the release gates above.
