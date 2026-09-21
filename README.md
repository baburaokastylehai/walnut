# walnut

A Claude Code plugin marketplace containing one plugin: **`push`**.

## What `push` does

`/push` reads the current chat, extracts only finalized decisions, requirements, open questions, and metrics (skipping brainstorming/noise), diffs that against a target Confluence page, and merges in only what's actually new or changed — so the page stays a clean, current source of truth that any AI tool (Claude, ChatGPT, Rovo, etc.) can be pointed at for full project context.

See plugins/push/skills/push/SKILL.md for the full logic.

## Installing it

In Claude Code, run:

    /plugin marketplace add baburaokastylehai/walnut
    /plugin install push

The first time you run `/push` in a project, it will ask which Confluence page to target and remember your answer for that project (stored locally, never committed).

## Contributing

Open a pull request against `main` — direct pushes to `main` are blocked. See `.github/CODEOWNERS` for required reviewers.
