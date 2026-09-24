# walnut

A Claude Code plugin marketplace containing one plugin: **`push`**.

## What `push` does

`/push` reads the current chat, extracts only finalized decisions, requirements, open questions, and metrics (skipping brainstorming/noise), diffs that against a target Confluence page, and merges in only what's actually new or changed — so the page stays a clean, current source of truth that any AI tool (Claude, ChatGPT, Rovo, etc.) can be pointed at for full project context.

See `plugins/push/skills/push/SKILL.md` for the current v0.1 behavior.

Walnut v0.2 is being designed on the `v0.2` branch. The product and architecture contract lives in `docs/PRODUCT.md` and `docs/ARCHITECTURE.md`.

## Installing it

In Claude Code, run:

    /plugin marketplace add baburaokastylehai/walnut
    /plugin install push

The first time you run `/push` in a project, it will ask which Confluence page to target and remember your answer for that project. The current local target file is ignored by Git.

## Versioning

The pre-v0.2 baseline is preserved at `archive/v0.1.0`.

See `docs/VERSIONING.md` for the release and rollback policy.

## Contributing

Use a pull request against `main`. `.github/CODEOWNERS` identifies the responsible reviewer.

Branch protection is a repository setting, not something CODEOWNERS enforces by itself. The intended protection rules are documented in `docs/REPOSITORY.md`.
