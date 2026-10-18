# Independent reviewer evidence

A separate reviewer agent read the shipped skills and selected operations against fictional local destination/state files. Five first-pass executions capture inputs, selected operations, responses, and before/after state in [forward-evidence.json](forward-evidence.json). Eight additional tests executed the actual ledger helper; [helper-results.json](helper-results.json) records their outcomes.

The review found a demo inconsistency and a pending mirror-event recovery gap. Both were corrected. Four follow-up recovery cases cover partial first run, recovery on an unchanged next run, an already-published event and stale child evidence. [recovery-results.json](recovery-results.json) records the resulting invariants and responses.

The [replay script](replay-pending-recovery.mjs) materializes the reviewer’s selected recovery operations and asserts state invariants with the shipped ledger validator. It does not rerun a model or test an executable Walnut transaction engine. Run from the repository root, supplying a temporary output directory:

```sh
node evals/reviews/2026-10-17/replay-pending-recovery.mjs . /tmp/walnut-recovery-replay
```

These are independent agent-driven policy simulations, not real Claude Code installation or Confluence integration tests. No live page, real project material, credentials, account data or raw tool traces from a live site are included.
