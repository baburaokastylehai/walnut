---
name: push
description: Build a detailed, complete record of everything confirmed as settled in this conversation and in the project's current files — decisions with their full stated reasoning, requirements, rejected proposals, open questions — and sync it into a shared Confluence page detailed enough for someone with zero context (a designer, a docs writer) to act on directly. Never records assistant-originated content or unconfirmed exploration.
---

# /push — sync confirmed context to Confluence

## Purpose
A Confluence page is the durable, shared source of truth for a project. This conversation — and the project's own working files — are where that truth actually gets produced; /push moves it onto the page. The skill has no hardcoded destination; the target page is resolved once per project and reused silently after that.

Every entry on the page is a complete, self-contained record. Someone with zero access to this conversation or these files must be able to pick up the page and act on it directly: a designer needs enough detail to structure their own work around what's been decided and proposed; a documentation team needs enough detail to know exactly which help articles, messaging, or docs require updating. When choosing between a shorter entry and a more complete one, write the complete one — detail is a requirement here, not something to trim for brevity.

## Sources and freshness
Both of these must be checked every run:
- This conversation.
- The project's own files (e.g. .md documents in the project folder) that are current and authoritative.

Neither source is automatically "more current" than the other — check timestamps. If a project file has been modified more recently than the conversation last touched that topic, the file is the fresher source for it: read it for what changed. If the conversation is more recent than a given file, the conversation wins for that topic. When file and conversation genuinely conflict on the same point and it's unclear which is current, don't silently pick one — surface the conflict (Architecture & Cross-Impact or Open Questions, whichever fits).

A project file only counts as a source when it's current and authoritative — a human wrote it, referenced it as the live spec, or it was freshly re-read this session and shows no sign of being superseded by something fresher. A stale or superseded draft is not a source to extract from directly; its staleness itself is worth recording (see Architecture & Cross-Impact) so nobody else mistakes it for current.

## Confirmation test
Extract an item only if it passes the check below, applied individually to each candidate. What counts as "confirmed" differs for Open Questions versus every other category — see the branch below.

For Proposals, Decisions, Requirements, Architecture & Cross-Impact, Research & Findings, Glossary / Key Terms — passes if either:
- A human participant asserted it in conversation, not the assistant — stated as settled fact, an instruction to proceed, or an explicit rejection, not a hypothesis or one of several options still being weighed, with nothing about its status still visibly open (no unresolved follow-up, no "but let's check X first"); or
- It is stated in a current, authoritative project file (per Sources and freshness above) — cite the exact file. Prefer the freshest source when a file and the conversation, or two files, conflict; carry over any caveat the source itself states (e.g. "unverified," "not yet re-confirmed") rather than dropping it.

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
1. Look for a lock file at .claude/push-target.local.json in the current working directory.
2. If it exists: read cloudId and pageId and use that as the target. Do not ask again, and do not retarget based on a link merely mentioned in conversation — only on an explicit request to retarget.
3. If it does not exist:
   - Use a Confluence page URL/ID if the user supplied one as an argument to this invocation.
   - Otherwise, ask: "Which Confluence page should /push update for this project?" — do not guess.
   - Resolve the cloudId (a site hostname works, e.g. arenasolutions.atlassian.net), call getConfluencePage once to confirm the page exists and is writable, and show the user its title.
   - Write .claude/push-target.local.json with { "cloudId": "...", "pageId": "...", "title": "...", "lockedAt": "<ISO date>" } so every future /push in this project directory reuses it silently.
4. Change an existing lock only on an explicit user request to retarget.

## Categories
Every category is subject to the confirmation test above, and every entry is written in full detail per Purpose — a complete, self-contained account of that item, not a headline pointing back at a conversation the reader doesn't have.

- Glossary / Key Terms — a one-time definition of a recurring project-specific term, name, or artifact (e.g. a named screen, system, or concept that gets referenced more than once). Other entries can then use the term directly instead of re-explaining it inline every time — this is the reliable fix for a term reading as unclear to a first-time reader, rather than hoping every bullet remembers to define it. Add a term here the first time it's confirmed and used in a way that needs explaining; update it here if its meaning changes, rather than repeating the definition elsewhere.
- Proposals — an idea the user is explicitly putting forward for consideration, not yet decided. Never something the assistant suggested. Include the actual substance of the proposal, not just its existence.
- Research & Findings — a finding, source, or piece of data the user introduced or confirmed as worth keeping, or one documented in a current authoritative project file. Not a passing citation made only to support a different point. Describe what was found and how, in enough detail that someone acting on it doesn't need to go find the original investigation.
- Decisions — something confirmed as final, including explicit rejections. State plainly and completely what was decided, self-contained enough for a reader with no conversation or file context to understand — define any project-specific term in the same bullet rather than assuming familiarity. Include the stated reason and rejected alternative whenever the source gives them (a human's own words, or an authoritative file) — this is exactly the kind of detail a designer or docs writer picking this up cold needs, and it is required, not something to leave out.
- Requirements — a concrete, confirmed spec, sourced from conversation or a current authoritative project file, not something still being explored. Write the full spec, not a one-line label for it.
- Open Questions — something a human posed as unresolved, or an unresolved disagreement between participants. Never a question the assistant invented. Include enough of the actual question and its context that someone unfamiliar with the conversation could attempt to answer it.
- Architecture & Cross-Impact — cross-cutting impact a human explicitly confirmed or flagged, or documented in a current authoritative file, not the assistant's inference that something sounds cross-cutting. Name the specific systems/documents/teams affected, not a vague "this touches other things."
- Linked Resources — a table (Type | Label | Link | Summary | First referenced), not prose bullets. Include a link only if (a) a human explicitly wants it kept as a reference, and (b) it's realistically something a future reader could open. Flag uncertain accessibility (e.g. an account-scoped claude.ai/project/... or artifact URL) plainly in the Summary column rather than presenting it as an ordinary open link. Be selective — don't capture every URL mentioned. If the link is a Jira issue or a Figma file and those tools are available in this session, do one quick lookup (e.g. getJiraIssue, Figma's metadata tools) to fill Summary with something real — a title, a status — rather than leaving a bare URL.
- Deprecated — never extracted from chat directly; only populated by the merge step when something confirmed here supersedes something already on the page. Always last.

This list is a default, not a ceiling: create a new top-level category (inserted before Deprecated) for a genuine new kind of confirmed content, and say so explicitly in the report-back. Don't create a near-duplicate of an existing category, and don't spin up a heading for a one-off aside.

Metrics is deliberately not a default category. This file covers a project from conception through build, before release — product metrics (usage, adoption, performance) don't genuinely exist yet at that stage, and a default category invites filling it with unrelated numbers just because they were mentioned (this happened once already). If the project reaches a phase where a human confirms a real, trackable metric worth recording, create Metrics then, as a new category, under the same rule as any other.

## Procedure
1. Fetch the whole page first, via getConfluencePage (contentFormat: html), before reading the conversation. Every later step is relative to this, not to a blank slate.
2. Build an extraction ledger before filtering anything, covering both sources. Read the entire conversation from its start, not just recent messages — this includes questions raised early that were never revisited, the easiest thing to lose if only recent messages get attention. Also check the project's own files: identify which are current/authoritative and check their modification timestamps against the conversation to see which is fresher on each topic (see Sources and freshness). List every candidate item from both sources, each with a short quote/paraphrase and its source (a specific message, or a specific file). Do this listing pass in full before applying the confirmation test to any of it — keep listing and filtering as two separate steps, not one.
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
- Write every entry as a complete, self-contained record — someone with no access to this conversation or these project files must be able to act on the page alone.
- Never fabricate content to fill an empty category.
- Never delete historical content; move it to Deprecated instead.
- Never attribute assistant-originated content to the user, regardless of which AI tool is running this skill.
- Never invent or reconstruct how a decision was reached — but when the source (a human's own words, or an authoritative file) states its reasoning, include that reasoning in full.
- Cover both sources every run: the conversation in full from its start, and any current, authoritative project files, using recency to resolve conflicts between them.
- Be selective with links specifically: durable and realistically accessible, not exhaustive.
- Default to exclusion whenever confirmation is ambiguous.
