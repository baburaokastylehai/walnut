# Changelog

All notable Walnut changes are recorded here.

Walnut follows Semantic Versioning during the pre-1.0 phase.

## [0.2.0] — 2026-09-25

### Added

- source discovery, confirmation, reconciliation, publishing, and destination-specific policy are separated into focused references;
- `SKILL.md` now acts as the workflow conductor rather than the full policy corpus;
- v0.2 preserves existing Walnut pages, D/R/Q identifiers, and recoverable child-page mappings during migration;
- recency is treated as a reconciliation signal rather than an automatic source winner;
- ingest and file mirroring are separate decisions;
- mirroring is selective and safety-aware;
- the conditional host-LLM context-file creation flow is preserved;
- checkpoint-based incremental reconciliation is defined, with full reconciliation as the recovery path;
- Confluence is isolated as the first destination adapter rather than the product ontology;
- publication uses concurrency protection and post-write verification;
- Walnut voice is separated from neutral durable-record voice;
- semantic eval fixtures cover core confirmation, reversal, context-file, and existing-project migration behavior;
- repository validation checks manifests, required references, fixtures, version metadata, and private-state protection.

### Changed

- plugin version is now `0.2.0`;
- marketplace positioning reflects Walnut's broader project-context role;
- README documents upgrade behavior for existing Walnut projects.

## [0.1.0] — 2026-09-22

Initial Walnut / `push` plugin baseline.

The exact repository state is preserved at `archive/v0.1.0` and commit `bc4546bc79d93d5c7b65ea9246d2cdd20256349c`.
