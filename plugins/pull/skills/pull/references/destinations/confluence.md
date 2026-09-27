# Confluence destination for pull

Confluence is the first shared-context source for `/pull`.

## Read-only contract

`/pull` reads the Walnut-maintained project page and relevant child pages.

It never updates:
- the main Confluence page;
- child pages;
- Decisions/Requirements/Open Questions;
- Project Files;
- Linked Resources.

Only local pull state may change.

## Target resolution

First look for `.walnut/pull-state.json`.

If it contains a valid Confluence target, reuse it.

If there is no pull target but the same local project has `.claude/push-target.local.json`, that target can be reused because push and pull may point at the same central brain.

Otherwise:
- use an explicitly supplied Confluence page URL/ID; or
- ask which Walnut project page to read.

Confirm the page exists and can be read before briefing.

## What to read

Always read the main page.

Read child pages selectively when:
- the main page points to them for a large category;
- Project Files says a mirrored document contains context relevant to the person's role;
- a changed child-page version may contain new project information;
- the main page references a child page needed to understand a decision/change.

Do not recursively crawl unrelated Confluence spaces.

## Revision tracking

Record the observed main-page version and relevant child-page versions/fingerprints in local pull state.

Page version alone is not semantic change; use it as a signal to inspect content.
