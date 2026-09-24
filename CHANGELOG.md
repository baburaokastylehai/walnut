# Changelog

All notable Walnut changes are recorded here.

Walnut follows Semantic Versioning during the pre-1.0 phase.

## [Unreleased — v0.2.0]

### Planned

- separate source discovery, confirmation, reconciliation, publishing, and destination-specific policy;
- keep `SKILL.md` as the workflow conductor rather than the full policy corpus;
- add a lightweight internal ledger for identity, provenance, fingerprints, and checkpoints;
- preserve human-facing D/R/Q identifiers while introducing stable internal identity;
- make recency a reconciliation signal rather than an automatic source winner;
- separate ingest from file mirroring;
- make mirroring selective and safety-aware;
- preserve the conditional host-LLM context-file creation flow;
- introduce incremental checkpoints with full reconciliation as a recovery path;
- abstract destination behavior, with Confluence as the first adapter;
- add semantic eval fixtures and gates;
- add verification after destination writes;
- adopt Walnut's product voice for user-facing interaction while keeping durable records neutral.

## [0.1.0] — 2026-09-22

Initial Walnut / `push` plugin baseline.

The exact repository state is preserved at `archive/v0.1.0` and commit `bc4546bc79d93d5c7b65ea9246d2cdd20256349c`.
