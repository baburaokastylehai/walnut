# Releases and rollback

Walnut uses one package version for both skills. v0.3.0 is the public-beta candidate. Minor versions may change behavior during the pre-1.0 phase; patch versions fix compatible behavior or documentation.

Develop on a branch and open a PR. Validate the final commit before merging. Publish a tag/release only after review and a live disposable-page smoke test. Never use a plugin upgrade to reset a shared project record.

## Baselines

The public repository has independent history beginning with a sanitized package snapshot. Historical `archive/v0.1.0` and `v0.2` baselines remain private or local. The legacy repository retains its old history and PR references privately; do not import them into this public repository.

The beta branch starts from the new root commit on `main`. A private local backup preserves the original history for recovery and must never be published. The new root commit is the public rollback reference until a reviewed release is tagged.

## Validation before merge

- Run repository validation and Node tests.
- Review semantic fixtures and response shapes.
- Check installation from the actual plugin directory; no reference may depend on files outside that directory.
- Execute the installed skills through authenticated Claude Code on a disposable Confluence page: first push, no-op push, first pull, recurring pull, direct page edits, a required-read failure with checkpoint comparison, and ledger round trip. Separate host loading, policy simulation and Codex connector trials do not establish this integrated path.
- Confirm no private state, real project examples or audit evidence are tracked.
- Confirm the README and version describe the package being shipped.

## Rollback

Before changing live shared data, retain its page revision and a private state backup. Pin this repository’s clean root commit or locally load a privately retained sanitized earlier package if the beta misbehaves. Restore shared data separately and only after reviewing subsequent edits; a code rollback does not reverse page writes.

After a reviewed release is tagged, use that immutable tag for reproducible installs. No release tag is created by this PR. Keep the rollback path until the new version is verified in ordinary use.
