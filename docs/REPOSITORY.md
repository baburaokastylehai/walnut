# Walnut — repository setup

This document records repository-level controls that support safe development and releases.

## Current working model

- `main` remains the stable branch.
- `archive/v0.1.0` preserves the pre-v0.2 baseline and should not move.
- `v0.2` is the active design/implementation branch.
- behavior-changing work should reach `main` through pull requests.

## Controls to enable in GitHub

When repository settings are configured, protect `main` with:

- require a pull request before merging;
- require at least one approving review;
- require review from CODEOWNERS;
- dismiss stale approvals when new commits materially change the PR;
- require status checks to pass;
- block force pushes;
- block branch deletion.

The exact required status checks should be enabled only after the corresponding CI jobs exist.

## Version preservation

The current v0.1 baseline is preserved at:

- branch: `archive/v0.1.0`
- commit: `bc4546bc79d93d5c7b65ea9246d2cdd20256349c`

A Git tag named `v0.1.0` should be created at that commit when using a GitHub surface that supports tag creation.

## Local state

Walnut project state must not be committed.

The transitional local target file is ignored through:

```text
.claude/push-target.local.json
```

Long term, Walnut state should move outside the project tree to a private per-project location such as:

```text
~/.walnut/projects/<project-id>/state.json
```

## CI target

The first useful CI should remain small:

1. validate JSON manifests;
2. verify required files exist;
3. run semantic eval fixtures;
4. fail if known private-state paths are tracked.

Do not add CI jobs merely for appearance. Every required check should protect a real failure mode.

## Contribution model

CODEOWNERS identifies responsible reviewers. It does not, by itself, enforce review.

Repository settings provide enforcement; CODEOWNERS provides routing and ownership.

## Change categories

Prefer PRs that are easy to reason about:

- `refactor:` reorganizes without intended semantic change;
- `feat:` changes behavior or adds capability;
- `fix:` corrects a defect;
- `test:` adds or changes eval coverage;
- `docs:` changes documentation;
- `repo:` changes repository configuration or tooling.

This is guidance, not ceremony. The point is to make behavior changes visible.
