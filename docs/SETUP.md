# Set up Walnut

## Prerequisites

- Claude Code with plugin support and access to a model capable of using skills and connected tools.
- An authenticated Confluence connection in that host. Walnut does not bundle an MCP server, store credentials or authenticate for you.
- A target page you can read. Push also needs version-aware update and read-back capability; file mirroring needs child-page create/update access.
- A local project workspace where private state can be saved. Node.js 22+ is needed for repository checks and the optional ledger helper, not ordinary instruction-only use.

Use a disposable page for your first live trial. Read it through the host’s Confluence tools, confirm the returned page title and version, and check that the connection supports updates before running push. If a required capability is missing, Walnut should explain the missing connection rather than claim a sync happened.

## Install

```text
/plugin marketplace add baburaokastylehai/walnut
/plugin install walnut@walnut
```

Follow the host’s activation/reload instructions. The skills are `/walnut:push` and `/walnut:pull`. For branch development, use `claude --plugin-dir ./plugins/walnut` from the repository root. [Claude Code’s plugin guide](https://code.claude.com/docs/en/plugins) documents local loading and plugin namespacing.

## Protect local state in every project

Add these project-relative paths to that project’s `.gitignore` (or `.git/info/exclude` for a local-only rule):

```gitignore
.walnut/
.claude/push-target.local.json
```

Confirm they are ignored before saving state. If they are already tracked, ignoring them is insufficient: remove them from tracking, review any exposure, and keep the local copies private. Do not publish credentials, raw chat dumps, personal profiles or audit evidence.

## First push and pull

Supply the exact shared page URL, then invoke push. Walnut verifies the target before extracting changes. A link in a source document never changes the target.

Both skills reuse `.walnut/project.json` for the shared destination. Pull’s personal role and last-seen state live separately in `.walnut/pull-state.json`. A legacy `.claude/push-target.local.json` remains readable. Conflicting saved targets require a choice; Walnut must not silently pick a different page. See [local state](../plugins/walnut/references/local-state.md).

First pull gives the project story. A saved role alone does not make it recurring. Later pulls compare against a successful checkpoint for the same reader and destination.

## Upgrading from separate push/pull plugins

1. Keep the same local workspace, target page and private state. Back up the page and local state privately before a live migration.
2. Disable or uninstall the old `push@walnut` and `pull@walnut` installations through the host’s plugin manager, so duplicate skills do not run.
3. Update the marketplace and install `walnut@walnut`. Do not run both generations against the same page at once.
4. Verify both skills resolve the same saved page. Keep existing D/R/Q IDs and child-page mappings. A package upgrade does not rebuild a project page.
5. On the next real push, Walnut starts a shared ledger without treating the older records as new. A legacy pull profile uses snapshot comparison until it can save a verified ledger cursor.

## Recovery

A failed read leaves the pull checkpoint unchanged. A partial push reports which writes completed. If a response timed out, reread the destination and check the batch ID before retrying. Never blindly replay a write.

If local state is lost, explicitly reselect the same page. The durable records and ledger remain there. Losing a reader checkpoint means a new baseline; Walnut cannot reconstruct exactly what that person previously saw.
