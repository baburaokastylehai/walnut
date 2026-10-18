# Changelog

## 0.3.0 — public-beta candidate

- One Walnut plugin containing push and pull, with shared character, terminology and local-state contracts.
- Persistent shared change ledger, snapshot fallback and retry/partial-write recovery rules.
- Role inference from useful context, a general lens when declined, and clearer first-versus-recurring behavior.
- Fictional public demo and fixtures, product README, architecture image, setup/migration, limitations and public contribution/security guidance.
- Package and ledger validation, regression fixtures and explicit live-test boundaries.

## [pull 0.1.0] — 2026-09-27

### Added

- new `pull` plugin for team-side consumption of Walnut's shared project context;
- first-use role onboarding for design, dev/QA, technical writing, PM, and free-text roles;
- full first-pull project briefing in project language;
- per-person local checkpoints for recurring pulls;
- semantic change detection so recurring pulls show what changed rather than repeating the whole project;
- role-aware relevance: for you, needs attention, and project visibility;
- read-only Confluence consumption;
- pull-specific semantic fixtures for first use, designer onboarding, recurring dev/QA updates, and no-change runs.


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

The sanitized package baseline is retained privately or locally; this independent public repository begins with a clean snapshot.
