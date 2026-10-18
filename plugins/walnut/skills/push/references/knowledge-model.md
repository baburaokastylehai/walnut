# Knowledge model

Walnut maintains human-readable project records plus lightweight internal identity.

## Human-facing categories

Default order:

1. Project Overview
2. Glossary / Key Terms
3. Decisions
4. Requirements
5. Open Questions
6. Architecture & Cross-Impact
7. Proposals
8. Research & Findings
9. Project Files
10. Linked Resources
11. Deprecated

Metrics is not a default category. Create it only when confirmed project metrics genuinely exist.

## Display IDs

Use stable human-facing IDs:
- Decisions: D1, D2, ...
- Requirements: R1, R2, ...
- Open Questions: Q1, Q2, ...

Never renumber or reuse existing IDs.

When migrating an existing Walnut page, continue the existing sequence.

## Internal identity

When state storage permits, associate each durable record with an immutable internal identifier separate from its display ID.

Useful relationships include:
- supersedes;
- refines;
- resolves;
- supports;
- derived_from;
- conflicts_with.

The internal model is an index for identity and provenance, not another prose source of truth.

## Lifecycle

A record may move through:

candidate → confirmed → published → refined / superseded / withdrawn

An Open Question may move:

open → resolved

Historical records remain traceable.

## Decision firmness

Every active Decision must state one of:
- Decided;
- Decided, not built;
- Agreed in principle;
- Working decision.

Do not flatten these distinctions.

## Provenance

For each confirmed record preserve, when available:
- source type;
- source locator;
- asserted by;
- asserted at;
- observed at;
- source fingerprint.

Do not expose internal bookkeeping on the Confluence page unless it helps a human reader.
