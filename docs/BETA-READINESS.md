# Public-beta readiness

This is the current release map, not a claim that every gate has passed. Review work through the [open PRs](https://github.com/baburaokastylehai/walnut/pulls). Nothing is approved for automatic merge or release.

| Work | Status | Evidence / next step |
|---|---|---|
| Portable push/pull, character and project language | Implemented | Direct checkout execution or self-contained exports; canonical source in `plugins/walnut/` |
| Shared ledger and reader checkpoint contracts | Implemented as instructions; structural helper tested | `references/change-ledger.md`, `scripts/ledger.mjs` inside the plugin |
| Fictional demo, README, exact architecture image and repo hygiene | Implemented; PM-driven discovery demo | README, `examples/product-discovery/`, LICENSE, setup/security/contributing docs |
| Repository checks and Node helper tests | Passing locally and in initial PR CI | Rerun after changes |
| Independent behavioral review | Completed for selected fictional cases | Five further failure exercises/68 assertions and six UX samples in [acceptance evidence](../evals/acceptance/2026-10-17/README.md); earlier five first-pass simulations, eight helper edge cases and four recovery simulations; see [evidence](../evals/reviews/2026-10-17/README.md) |
| Optional Claude loading and local marketplace install | Passed | Official CLI 2.1.302, both skills discovered, strict validation clean; [acceptance evidence](../evals/acceptance/2026-10-17/README.md) |
| Portable packaging and host execution | Passed for recorded paths | [Portable evidence](../evals/HOST-PORTABILITY.md): isolated exports/helpers and live exported pull in Codex; native discovery and other hosts separately scoped |
| Beta onboarding and feedback | Prepared | [Tester guide](BETA-TESTER-GUIDE.md), issue form and unpublished [announcement draft](LAUNCH-NOTES.md) |
| Disposable Confluence integration | Core live checks passed | [Live evidence](../evals/LIVE-CONNECTOR-VALIDATION.md): ledger round trip, no-op, direct edits, stale writes and controlled mirror recovery; real fault injection remains limited |
| Independent public repository | Verified | Fresh public history; legacy repository and historical PRs private. Anonymous checks confirm public access is removed under our control. No Support request; no server-erasure claim. |

## What the harness article changes

The [article on harness engineering](https://x.com/0xwhrrari/status/2093685107534000560) supports three focused improvements: independently exercise the behavioral contracts, retain compact private execution evidence, and move critical invariants into executable checks when integration evidence justifies it.

Today, publication guards, read-only pull and recovery are instructions executed by the host. The shipped helper validates ledger shape and cursor coverage; it cannot authorize a write or prove source truth. A future narrow execution adapter could enforce revision preconditions, retry identity and checkpoint commits. A private run receipt could record target, batch, observed/verified revisions, partial status and checkpoint outcome without collecting raw conversations. These are follow-up considerations, not capabilities claimed as shipped.

Parallel agents can review independent concerns now. Shared destination writes and final integration still need coordination: assign one writer per target, reconcile results, rerun checks and preserve the release gates above.

## Host support decision

The core is host-neutral. Capability requirements, not a Claude login, define whether a host can run it. The former Claude-only authenticated gate is superseded. Actual host/loader coverage and untested paths are recorded separately; optional adapter validation does not become a requirement for all users.
