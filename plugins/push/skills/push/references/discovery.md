# Discovery

Walnut listens broadly before it filters.

## Sources to inspect on every run

1. The current conversation available to the host AI.
2. Current project-context files and other readable project documentation.
3. The current durable destination page and any Walnut-managed child pages.
4. Any additional source explicitly configured for this project.

A quiet conversation never means files can be skipped. A changed file can be the only meaningful update.

## Existing projects

If the target page already contains Walnut records or mirrored child pages, treat the run as reconciliation with existing state, not as a fresh initialization.

Recover:
- existing D/R/Q identifiers;
- existing child-page mappings;
- existing Project Files links;
- any previous Walnut state available locally.

Do not renumber or recreate records merely because the plugin version changed.

## Candidate pass

Discovery optimizes for recall.

Before applying confirmation rules, build a candidate ledger containing every plausible:
- project overview change;
- decision;
- requirement;
- open question;
- architecture/cross-impact item;
- proposal;
- research finding;
- glossary term;
- linked resource;
- source-file change.

Each candidate should record:
- substance;
- likely category;
- source type;
- source locator;
- who asserted it when known;
- asserted time when known;
- observed time;
- supporting/conflicting evidence.

Do not publish from the discovery pass directly.

## Checkpoints

If project state contains a successful prior checkpoint, use it to reduce repeated work:
- conversation content since the checkpoint;
- project files changed since the checkpoint;
- current destination state;
- any source whose fingerprint is missing or changed.

A checkpoint is an optimization, not an authority. If a contradiction, missing mapping, version migration, or unexplained destination state is detected, fall back to full reconciliation.

If no checkpoint exists, do a full reconciliation.

## Freshness

Recency is evidence, not an automatic winner.

A newer file modification may be formatting only. A newer chat message may be brainstorming rather than a decision.

Resolve freshness at the claim level by comparing substance, confirmation status, provenance, and recency together.
