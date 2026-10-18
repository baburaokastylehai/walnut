# Repository controls

`main` receives reviewed changes through PRs. This independent repository starts with a sanitized package snapshot as its root commit. New beta work uses `feat/public-beta-v0.3`. Historical `archive/v0.1.0` and `v0.2` baselines remain private or local; they are not branches in this public repository.

CODEOWNERS identifies the maintainer; it does not enforce review. Configure branch protection separately to require PRs, passing `repository` checks and appropriate review, and to prevent deletion and ordinary force pushes. This document does not claim those settings are enabled.

The validation workflow checks package metadata, runtime links, fixture structure, demo ledgers, known private identifiers and Node helper tests. Semantic fixture review and a real connector smoke test are separate release requirements.

Private `.walnut/` state and `.claude/push-target.local.json` must never be tracked. Backups and audit evidence stay outside the public repository. The legacy repository and its retained PR references remain private after migration. No Support request is planned. This removes public access under the maintainer’s control; it does not claim deletion of backups or external copies. Never import the legacy Git history into this repository.

Use this repository’s clean root commit for a pre-beta code rollback, and a release tag once a reviewed release exists. A code rollback never silently rolls back shared project data.
