# Working on Walnut

Walnut is a host-neutral skill set with two actions: push and pull. Canonical runtime source is `plugins/walnut/`; Claude packaging is optional. Runtime references must stay inside that source bundle. `node scripts/export-skills.mjs <destination>` produces two self-contained native skill folders; each exported folder must contain all its own references and helper. Start with `docs/PRODUCT.md`, `docs/ARCHITECTURE.md` and the skill relevant to the task. Shared character, state and ledger contracts live in `plugins/walnut/references/`.

Use only fictional examples. Keep private local state, backups, audit evidence and credentials out of the repository. Do not restore stale history after sanitization.

Run `node scripts/validate-repo.mjs` and `node --test` with Node.js 22+. These check structure and executable helpers, not live host/connector behavior. For behavioral work, use isolated fake destinations and capture the actual proposed actions/state changes. Keep independent review distinct from a live integration test.

The active job assignments and supervision contract live in `docs/exec-plans/public-beta.md`.

Current merge gates and evidence live in `docs/BETA-READINESS.md` and `evals/BETA-VALIDATION.md`. Keep the PR draft until its required checks are complete. Do not turn a research suggestion into a new product commitment without assessing scope and evidence.
