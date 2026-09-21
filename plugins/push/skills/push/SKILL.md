---
name: push
description: Extract only what a human participant explicitly asserted as settled — decisions, requirements, confirmed metrics, rejected proposals — from the current conversation, and sync it into a shared Confluence page that any AI tool or teammate can rely on as ground truth. Never records assistant-originated content or unconfirmed exploration.
---

# /push — sync confirmed context to Confluence

## Purpose
A Confluence page is the durable, shared source of truth for a project. This conversation is a disposable workspace. `/push` moves confirmed substance from the workspace to the page — nothing more, nothing less. The skill has no hardcoded destination; the target page is resolved once per project and reused silently after that.

## Confirmation test
Extract an item only if it passes the check below. This is a mechanical test, applied per candidate — not a vibe. What counts as "confirmed" is different for Open Questions than for every other category — see the branch below.

For Proposals, Decisions, Requirements, Architecture & Cross-Impact, Metrics, Research & Findings — passes if:
1. A human participant asserted it, not the assistant.
2. It was stated as settled fact, an instruction to proceed, or an explicit rejection — not a hypothesis or one of several options still being weighed.
3. Nothing about its status is still visibly open in the conversation (no unresolved follow-up, no "but let's check X first").

For Open Questions — passes if:
1. A human participant genuinely raised it as a real, unresolved concern — sincerely, not rhetorically.
2. It has not been answered or withdrawn later in the conversation (if it later got resolved, it belongs in Decisions/Requirements instead, not here).

A sincerely-raised, still-unanswered question always qualifies for Open Questions — it does not need to also pass the stricter test above, because being unresolved is the point of this category, not a disqualifier.

A human assertion can take any of these forms — there is no required phrasing:
- A direct statement of fact or instruction ("we're doing X," "go with B," "yes," "ship it").
- An explicit rejection ("no, don't do X," "skip that") — record this as a decision in the negative, not as a non-event.
- A later message that treats an earlier point as settled without a discrete confirming reply (e.g. building the next question on top of it as given fact).
- Partial agreement — if the human affirms only part of a multi-part suggestion, extract only the affirmed part.

Fails if:
- It originated from the assistant and the human never took it up as their own — regardless of how reasonable it sounded.
- It's hypothetical, exploratory, or explicitly framed as one option among several still under consideration.
- The conversation moved on without the human engaging with it at all.
- It's ambiguous whether a human actually asserted it. Default to exclusion on ambiguity — a missing item is fixed on the next push; a wrongly-included one erodes trust in the whole page.

## Edge cases
- Reversal within the same conversation: if a human later contradicts something they themselves confirmed earlier, the later statement wins. Treat it as superseding the earlier one (old value → Deprecated), not as a conflict to flag.
- Relayed third-party content: a human pasting an email, spec excerpt, or quote is introducing a source, not confirming a decision. File it under Research & Findings unless the human separately asserts a conclusion drawn from it.
- Multiple human participants disagreeing: if two people in the conversation assert conflicting things and neither is resolved, this is not confirmed either way — record it as an Open Question, not a Decision.
- Sarcasm, rhetorical questions, or clearly informal asides: apply ordinary judgment about sincerity; don't extract language that wasn't meant as a real assertion.
- A confirmed decision that reverses something already on the Confluence page from a prior push: this is a normal "change" in the diff step (old → Deprecated) — it is not a special case, just note it plainly in the write-up.
- Nothing in the conversation passes the test: this is an expected, healthy outcome for early-stage or exploratory sessions — report "nothing new to push" and stop. Do not lower the bar to have something to write.

## Target resolution (ask once, then lock it in per project)
1. Look for a lock file at `.claude/push-target.local.json` in the current working directory.
2. If it exists: read `cloudId` and `pageId` and use that as the target. Do not ask again, and do not retarget based on a link merely mentioned in conversation — only on an explicit request to retarget.
3. If it does not exist:
   - Use a Confluence page URL/ID if the user supplied one as an argument to this invocation.
   - Otherwise, ask: "Which Confluence page should `/push` update for this project?" — do not guess.
   - Resolve the cloudId (a site hostname works, e.g. `arenasolutions.atlassian.net`), call `getConfluencePage` once to confirm the page exists and is writable, and show the user its title.
   - Write `.claude/push-target.local.json` with `{ "cloudId": "...", "pageId": "...", "title": "...", "lockedAt": "<ISO date>" }` so every future `/push` in this project directory reuses it silently.
4. Change an existing lock only on an explicit user request to retarget.

## Categories
Every category below is still subject to the confirmation test — nothing here loosens it.

- Proposals — an idea the user is explicitly putting forward for consideration, not yet decided. Never something the assistant suggested.
- Research & Findings — a finding, source, or piece of data the user introduced or confirmed as worth keeping. Not a passing citation made only to support a different point.
- Decisions — something confirmed as final, including explicit rejections. State plainly what was decided, self-contained enough for a reader with no conversation context to understand — define any project-specific term in the same bullet rather than assuming familiarity. Include a stated reason or rejected alternative only if the human gave it themselves.
- Requirements — a concrete, confirmed spec, not something still being explored.
- Open Questions — something a human posed as unresolved, or an unresolved disagreement between participants. Never a question the assistant invented.
- Architecture & Cross-Impact — cross-cutting impact a human explicitly confirmed or flagged, not the assistant's inference that something sounds cross-cutting.
- Metrics — a number only if a human confirmed it as a locked, trackable project metric. A number cited in passing while discussing something else does not qualify. An early-stage project with nothing built or measured yet should have an empty Metrics section — that's correct, not a gap.
- Linked Resources — a table (Type | Label | Link | Summary | First referenced), not prose bullets. Include a link only if (a) a human explicitly wants it kept as a reference, and (b) it's realistically something a future reader could open. Flag uncertain accessibility (e.g. an account-scoped claude.ai/project/... or artifact URL) plainly in the Summary column rather than presenting it as an ordinary open link. Be selective — don't capture every URL mentioned. If the link is a Jira issue or a Figma file and those tools are available in this session, do one quick lookup (e.g. getJiraIssue, Figma's metadata tools) to fill Summary with something real — a title, a status — rather than leaving a bare URL.
- Deprecated — never extracted from chat directly; only populated by the merge step when something confirmed here supersedes something already on the page. Always last.

This list is a default, not a ceiling: create a new top-level category (inserted before Deprecated) for a genuine new kind of confirmed content, and say so explicitly in the report-back. Don't create a near-duplicate of an existing category, and don't spin up a heading for a one-off aside.

## Procedure
1. Fetch the whole page first, via getConfluencePage (contentFormat: html), before reading the conversation. Every later step is relative to this, not to a blank slate.
2. Build an extraction ledger before filtering anything. Read the entire conversation from its start, not just recent messages, and list every candidate item with a short quote or paraphrase of where it came from — this includes questions raised early that were never revisited, which are the easiest thing to lose in a long conversation if only recent messages get attention. Do this listing pass in full before applying the confirmation test to any of it; don't filter and extract in the same breath.
3. Apply the confirmation test to each ledger entry individually, using the correct branch (Open Questions vs. everything else). Discard anything that fails. Keep the ones that pass, with their category.
4. Specifically re-check the ledger for unresolved questions, independent of whatever else was found: any sincerely-raised human question with no later answer or withdrawal goes to Open Questions, regardless of how early in the conversation it appeared or whether it seems to have been forgotten since.
5. Diff each surviving candidate against the live page:
   - Not present anywhere on the page → addition.
   - Contradicts or supersedes something already on the page, in any section → change (old value moves to Deprecated). For a Linked Resources row, an updated Summary/status for a URL already in the table counts as a change to that row, not a new row.
   - Narrows or adds a condition to an existing item without contradicting it → refinement, appended to the existing bullet/row in place.
   - Already present, same substance → discard, not an update.
6. Stop if nothing survived the diff. Do not call updateConfluencePage. Report "nothing new to push" and briefly say why.
7. Otherwise, merge: update in place where superseded (moving the old value to Deprecated, never deleting), append refinements to the item they clarify, append new items to the correct category, leave everything else untouched.
8. Structure the page using the categories above, plus any already present from prior pushes, plus any new category created this run, inserted before Deprecated.
9. Guard against a concurrent edit: immediately before writing, compare the version you read in step 1 against the current version. If it changed, re-fetch and redo steps 2–8 against the current content before retrying the write once.
10. Write it back via updateConfluencePage, with a version message naming what changed.
11. Report to the user: exactly what was added, changed, refined, or deprecated (or the "nothing new" outcome and why). No need to enumerate what was excluded for failing the confirmation test — just report what was actually written.

## Rules
- Never fabricate content to fill an empty category.
- Never delete historical content; move it to Deprecated instead.
- Never attribute assistant-originated content to the user, regardless of which AI tool is running this skill.
- Never narrate how a decision was reached — record the outcome, and only the reasoning the human stated themselves.
- Write every item so it stands alone for a reader with zero conversation context.
- Be selective with links: durable and realistically accessible, not exhaustive.
- Default to exclusion whenever confirmation is ambiguous.
