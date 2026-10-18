# walnut

your project gets messy. walnut keeps the part that matters.

Walnut is a Claude Code plugin marketplace with two complementary plugins: **`push`** and **`pull`**.

## `push` — keep the project brain current

`/push` listens across the current AI conversation, project-context files, and an existing shared destination. It separates confirmed project truth from brainstorming, assistant suggestions, stale context, and duplicates; reconciles what changed; and publishes only the durable updates that actually belong in the project record.

Confluence is the first supported destination.

## `pull` — get caught up

`/pull` reads that same shared project context for the people working on the project.

On first use, it asks what role you are playing — design, dev/QA, technical writing, PM, or something else — then explains the problem, current solution, project status, and the parts that matter most to you.

On later uses, it compares the current project brain with what you last saw and reports only meaningful updates. Role-relevant changes come first; important project-wide changes still appear for visibility.

`/pull` is read-only against the shared project brain. It keeps only a local per-person checkpoint so each teammate can ask, "what changed since I last checked?"

Walnut is designed to preserve existing project history. Upgrading the plugin does not reset an existing Walnut page, renumber its D/R/Q records, or recreate child pages just because the version changed.

## How it thinks

Walnut follows a few rules:

- listen widely. publish carefully.
- assistant suggestions are not project truth until a human adopts them.
- recency is evidence, not an automatic winner.
- reading a project file and mirroring it are separate decisions.
- when useful context files do not exist, Walnut may ask once whether the host AI should create project-appropriate docs.
- migration is reconciliation, not reset.
- after a write, Walnut reads the destination back and verifies it.

The v0.2 product and architecture contracts live in `docs/PRODUCT.md` and `docs/ARCHITECTURE.md`.

## Installing it

In Claude Code:

    /plugin marketplace add baburaokastylehai/walnut
    /plugin install push
    /plugin install pull

If you already have the plugin installed, update the marketplace/plugin in Claude Code before running `/push` so it loads the latest version from `main`.

The first time `/push` is used in a project, Walnut asks which Confluence page it should maintain and remembers that target locally. That state is ignored by Git.

## Existing Walnut projects

If you've already used `/push`:

- keep using the same project;
- keep the same target Confluence page;
- update the plugin;
- run `/push` again.

Walnut reconciles against what is already there. It should preserve existing IDs, history, and recoverable child-page mappings, then add/refine only what actually changed.

## Versioning

The pre-v0.2 baseline is preserved at `archive/v0.1.0`.

See `docs/VERSIONING.md` for the release and rollback policy.

## Contributing

Use a pull request against `main`.

`.github/CODEOWNERS` identifies the responsible reviewer. Repository enforcement is configured separately in GitHub; the intended protection rules are documented in `docs/REPOSITORY.md`.

Repository validation runs through `.github/workflows/validate.yml`.
