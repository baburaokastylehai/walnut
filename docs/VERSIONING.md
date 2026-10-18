# Releases and rollback

Walnut uses one package version for both skills. v0.3.0 is the public-beta candidate. Minor versions may change behavior during the pre-1.0 phase; patch versions fix compatible behavior or documentation.

Develop on a branch and open a PR. Validate the final commit before merging. Publish a tag/release only after review and a live disposable-page smoke test. Never use a skill upgrade to reset a shared project record.

## Baselines

The public repository has independent history beginning with a sanitized package snapshot. Historical `archive/v0.1.0` and `v0.2` baselines remain private or local. The legacy repository retains its old history and PR references privately; do not import them into this public repository.

The beta branch starts from the new root commit on `main`. A private local backup preserves the original history for recovery and must never be published. The new root commit is the public rollback reference until a reviewed release is tagged.

## Validation before merge

- Run repository validation and Node tests.
- Review semantic fixtures and response shapes.
- Export both skills into an isolated directory. Each skill must work without the checkout or its sibling skill; verify links and the helper. Keep optional host adapters separately validated.
- Execute skill instructions in at least one capable host on a disposable Confluence page: first push, no-op push, first pull, recurring pull, direct page edits and ledger round trip. Record host, loading method, tool actions and state. Verify required-read failure/checkpoint preservation with a controlled adapter, clearly labeling simulated faults. A clone or host manifest alone is not functional validation.
- Report optional native loaders separately. Claude authentication is not a core release requirement, and one verified host does not establish support for every host.
- Confirm no private state, real project examples or audit evidence are tracked.
- Confirm the README and version describe the package being shipped.

## Rollback

Before changing live shared data, retain its page revision and a private state backup. Pin this repository’s clean root commit or locally load a privately retained sanitized earlier package if the beta misbehaves. Restore shared data separately and only after reviewing subsequent edits; a code rollback does not reverse page writes.

After a reviewed release is tagged, use that immutable tag for reproducible installs. No release tag is created by this PR. Keep the rollback path until the new version is verified in ordinary use.
