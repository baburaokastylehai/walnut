---
name: push
description: Sync only what the user has explicitly confirmed as final in the current chat — decisions, requirements, locked metrics — into a shared Confluence page. Never records exploration, AI-suggested content, or inferred conclusions; the confirmed outcome only, never the journey to it.
---

# /push — sync confirmed context to Confluence

## Purpose
This chat is a temporary workspace. A Confluence page is the permanent, shared source of truth for whatever project this is. This skill has no hardcoded destination — different teams/projects using it will target different pages — so the target must be resolved (and remembered) per project before anything else happens.

## The confirmation gate — read this before anything else
This is the single most important rule. Everything else in this file is subordinate to it.

**Only extract something if the human user explicitly confirmed it as final, in their own words, in this conversation.** Not inferred. Not assumed. Not reconstructed from the shape of the conversation. A real signal looks like the user actually saying something equivalent to "yes, that's final," "let's go with that," "lock it in," "confirmed" — or plainly stating something as settled fact going forward. It does not mean: the conversation moved on to a new topic, the user didn't object to something Claude said, or Claude's own reasoning concluded something made sense.

Concretely:
- Never record anything Claude itself proposed, suggested, or raised as if it came from the user or the project. If Claude suggested "we should reconcile X with Y" mid-conversation and the user didn't explicitly adopt that as a real, confirmed item, it does not go on the page — not in Proposals, not in Open Questions, nowhere. An AI's own suggestion is not project content until a human confirms it as one.
- Don't narrate the exploration. How the user got to a decision — what they considered first, what they were leaning toward, the back-and-forth of "is it A or B" — is the user's private working process with the chat, not project brain content. Record the confirmed outcome, not the journey. Only include a stated reason or rejected alternative if the user explicitly said it themselves as part of confirming the decision — never Claude's own narrative reconstruction of how the conversation arrived there.
- When genuinely unsure whether something was confirmed or just explored, leave it out. Under-capturing is the safe failure here. A page that's missing something can be fixed next push; a page full of things that were never actually decided destroys the one property that makes it worth having — that it can be trusted without re-checking.

## Why this still has to be more than keyword-sorting, even under a strict gate
Being conservative about what qualifies doesn't mean being lazy about how it's recorded:

1. When the user does confirm something with real specifics (systems affected, numbers, names), don't flatten it into something vague. The specificity is exactly what's easy to lose in a casual summary — keep it, as long as it was actually said.
2. Contradiction-checking against the whole page, not just the matching section. A newly-confirmed decision can invalidate something recorded elsewhere on the page days ago. Step 1 is always fetching the whole page first, so this check is possible.
3. Consistency under pressure. The messiest, busiest conversations are also the ones most likely to contain something genuinely decided in passing. The job is to catch that reliably, every time — while still applying the same strict confirmation bar, not a looser one, just because the conversation was hard to follow.
4. Trustworthiness beats completeness. A sparse but fully-accurate page is more valuable than a rich one where a third of it was never actually confirmed by anyone.

## Target resolution (ask once, then lock it in per project)
1. Look for a lock file at `.claude/push-target.local.json` in the current working directory.
2. If it exists: read `cloudId` and `pageId` from it and use that as the target for this run. Do not ask the user again, and do not silently switch targets even if the current conversation mentions a different Confluence link — only retarget on an explicit request (e.g. the user says "push to a different page" or "retarget /push to <url>").
3. If it does not exist:
   - If the user supplied a Confluence page URL/ID as an argument to this `/push` invocation, use that as the candidate target.
   - Otherwise, stop and ask the user in chat: "Which Confluence page should `/push` update for this project? (paste the page URL or tiny-link)" — do not guess or fall back to any page on your own.
   - Once you have a candidate, resolve the cloudId (the site hostname works, e.g. `arenasolutions.atlassian.net`) and call `getConfluencePage` once to confirm it exists and is writable, and to show the user its title for confirmation.
   - Write `.claude/push-target.local.json` with `{ "cloudId": "...", "pageId": "...", "title": "...", "lockedAt": "<ISO date>" }` so every future `/push` in this project directory reuses it silently, with no further prompting.
4. To change an existing lock: only when the user explicitly asks to retarget — re-run the resolution above and overwrite the lock file with the new target, telling the user what changed.

## The categories (a starting set, not a ceiling — every one still subject to the confirmation gate)

- Proposals — an idea or approach the user is explicitly putting forward for consideration, stated as such by the user. Never something Claude suggested.
- Research & Findings — a factual finding the user explicitly confirmed is worth keeping (e.g. "yes, record that we found X") — not a passing reference to a source or an old file mentioned for context.
- Decisions — something the user explicitly confirmed as final. State what was decided, plainly, in a way a first-time reader understands without the source conversation — define any project-specific term inline rather than assuming familiarity (e.g. don't write "X is not a Y module" without first saying, in the same bullet, what X and Y are). Include a reason or rejected alternative only if the user stated it themselves as part of confirming — never Claude's reconstruction of how the conversation got there.
- Requirements — a concrete, finalized spec the user explicitly confirmed, not something still being explored.
- Open Questions — something the user posed as unresolved or explicitly flagged as needing an answer. Not a question Claude invented because it seemed like a loose end.
- Architecture & Cross-Impact — cross-cutting impact the user explicitly confirmed or flagged as real. Not Claude's own inference that something sounds cross-cutting.
- Metrics — a number only if the user explicitly confirmed it as a locked, trackable project metric. A number cited in passing (e.g. referencing an old analysis file for context while discussing something else) does not qualify. Early-stage projects (concept/planning, nothing built or measured yet) will legitimately have an empty Metrics section — that is correct, not a gap to fill.
- Linked Resources — a link only if (a) the user explicitly wants it kept as a reference, and (b) it's realistically something a future reader could open. A private `claude.ai/project/...` or artifact link may not be reachable by someone without the same account — if included anyway because there's no better option, say so plainly in the Summary rather than presenting it as an ordinary open link. Do not capture every URL that appears in conversation; be selective.
- Deprecated — not extracted from chat; this is where superseded, previously-confirmed info gets moved during a merge. Always stays last on the page.

This list is not exhaustive. If genuinely new kinds of confirmed content emerge, create a new top-level category (inserted before Deprecated), and say so explicitly in the report-back. But the confirmation gate applies identically to any new category — it doesn't loosen just because the category is new. Don't create a near-duplicate of an existing category, and don't spin up a heading for a one-off aside.

## Steps

1. Fetch current state first, the whole page. Using the target resolved above, call `getConfluencePage` (contentFormat: `html`) before extracting anything from the chat.
2. Extract candidates from the chat — but only things the user themselves explicitly confirmed as final. Re-read the confirmation gate before this step every time. Discard anything that was only explored, only suggested by Claude, or only inferred from context.
3. Diff each surviving candidate against the live page:
   - Not on the page at all → an addition.
   - Contradicts or supersedes something already on the page (in any section) → a change (old value moves to Deprecated).
   - Narrows/clarifies an existing item without contradicting it → a refinement, appended onto the existing bullet/row.
   - Already on the page, same substance → not an update, discard.
4. Gate on whether anything survived. If nothing qualifies as an addition, change, or refinement, stop — do not call `updateConfluencePage`. Tell the user "nothing new to push" and briefly say why.
5. If something qualifies, merge it in: update in place if superseded (moving the old version to Deprecated, never deleting), append refinements onto the item they clarify, append genuinely new items, leave everything else untouched.
6. Structure the page using the default categories, plus any already on the page from prior pushes, plus any new category created this run (inserted before Deprecated).
7. Before writing, re-check for a concurrent edit. Compare the version you're about to write against the version read in step 1; if it changed, re-fetch and re-run steps 2–6 against the current content before retrying the write.
8. Write it back. Call `updateConfluencePage` with the merged body, a version message naming what changed, and increment the version.
9. Report back to the user: a short bullet list of exactly what was added/changed/refined/deprecated (or "nothing new" and why). If something discussed looked significant but wasn't explicitly confirmed, do not push it and do not need to enumerate everything that was excluded — just report what was actually pushed.

## Rules
- Never fabricate content to fill a category — leave it empty if nothing qualifies.
- Never delete historical info; deprecate it instead.
- Never record anything as a Decision, Proposal, Requirement, or Open Question unless the human user explicitly confirmed or raised it themselves. Never Claude's own suggestions, questions, or inferences, no matter how reasonable they seemed in the moment.
- Never narrate the exploration or reasoning process that led to a decision. Record the confirmed outcome only; include stated rationale only if the user gave it themselves.
- Write every bullet so a first-time reader with zero conversation context understands it — define project-specific terms inline.
- Be selective about links: only durable, realistically-accessible, explicitly-wanted references — not every URL that appeared.
- When genuinely unsure whether something was confirmed, leave it out.
