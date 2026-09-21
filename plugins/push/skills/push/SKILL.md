---
name: push
description: Read the current chat as a PM would — proposals, research, decisions with rationale, open questions, and cross-cutting architecture/world/object impacts — and sync only what's genuinely new or changed into a shared Confluence page, so any AI chat tool reading that page gets full, current project context.
---

# /push — sync chat context to Confluence

## Purpose
This chat is a temporary workspace. A Confluence page is the permanent, shared source of truth for whatever project this is. This skill has no hardcoded destination — different teams/projects using it will target different pages — so the target must be resolved (and remembered) per project before anything else happens.

## Why this has to be more than "summarize the chat into some buckets"
A PM re-reading their own chat and copy-pasting a summary could produce four generic headings too. That's not the job here. The reason this needs real judgment, not keyword-sorting:

1. **Rationale gets lost if you only record outcomes.** A decision without *why* (what was considered, what was rejected, what tradeoff was made) is exactly the kind of context that currently evaporates when someone closes a chat tab. Every decision captured must carry its reasoning, not just its conclusion.
2. **Cross-cutting impact is the thing people are most likely to bury or miss under time pressure**, not the thing they're most likely to record carefully. A remark like "this'll also touch how Items resolve across Workspaces" is easy to lose inside a long paragraph about something else entirely. This skill's job is to actively go looking for that, not wait for it to be labeled "important."
3. **Contradiction-checking against the *whole* page, not just the same section.** A new architecture decision can quietly invalidate an open question sitting in a completely different part of the page. A human updating their own notes rarely re-reads the entire document before editing one part of it — this skill always does, because step 1 is fetching the whole page before writing anything.
4. **Consistency under pressure.** The busiest, messiest chats — the ones most likely to contain a real breakthrough — are also the ones a tired PM is least likely to carefully write up by hand. The value here is doing the careful reconciliation *every single time*, not just when there's slack in the day.

If a push just re-labels recent chat text into headings without doing the above, it has failed at the actual job.

## Target resolution (ask once, then lock it in per project)
1. Look for a lock file at `.claude/push-target.local.json` in the current working directory.
2. **If it exists**: read `cloudId` and `pageId` from it and use that as the target for this run. Do not ask the user again, and do not silently switch targets even if the current conversation mentions a different Confluence link — only retarget on an explicit request (e.g. the user says "push to a different page" or "retarget /push to <url>").
3. **If it does not exist**:
   - If the user supplied a Confluence page URL/ID as an argument to this `/push` invocation, use that as the candidate target.
   - Otherwise, stop and ask the user in chat: "Which Confluence page should `/push` update for this project? (paste the page URL or tiny-link)" — do not guess or fall back to any page on your own.
   - Once you have a candidate, resolve the cloudId (the site hostname works, e.g. `arenasolutions.atlassian.net`) and call `getConfluencePage` once to confirm it exists and is writable, and to show the user its title for confirmation.
   - Write `.claude/push-target.local.json` with `{ "cloudId": "...", "pageId": "...", "title": "...", "lockedAt": "<ISO date>" }` so every future `/push` in this project directory reuses it silently, with no further prompting.
4. **To change an existing lock**: only when the user explicitly asks to retarget — re-run the resolution above and overwrite the lock file with the new target, telling the user what changed.

## The categories (a starting set, not a ceiling)

Extract into these buckets by default. Something can and often should land in more than one (e.g. a decision that also has cross-object impact gets recorded in both).

- **Proposals** — ideas/approaches being pitched or explored, not yet decided. Distinct from Decisions: keep them here until the chat shows they were actually settled, don't jump the gun.
- **Research & Findings** — prototype results, spikes, data pulled, things learned that inform a decision but aren't a decision themselves.
- **Decisions** — settled/agreed. Capture: what was decided, **why** (the stated reasoning), and **what alternative was rejected and why**, whenever the chat contains that — not just the bare outcome.
- **Requirements** — concrete, finalized asks (features, constraints, specs) distinct from a Decision about approach.
- **Open Questions** — unresolved product/business questions someone still needs to answer. Includes implied uncertainty ("not sure yet," "need to check with X," hedged language) — don't wait for something to be phrased as a literal question mark.
- **Architecture & Cross-Impact** — anything touching infra, system architecture, edge cases, or effects that cross object/world/module boundaries within the product. Treat this as a distinct, high-visibility bucket precisely because it's the category most likely to be mentioned in passing and then lost — actively scan for it rather than waiting for it to be flagged as important by the person talking.
- **Metrics** — concrete figures, targets, or changing quantities.
- **Linked Resources** — a table, not prose bullets: every link that surfaces in the chat — pasted URLs, Figma file links, Jira issue links, other Confluence pages, generated Artifacts, decks/docs — with columns `Type | Label | Link | Summary | First referenced`. This is how raw source material scattered across other tools stays organized instead of buried inside chat history:
  - Scan for *any* URL/link in the conversation, whether the user pasted it or it was generated as output (an Artifact link, a created doc).
  - Classify its `Type` (Figma, Jira, Confluence, Artifact, Doc, Other) from the URL/context.
  - **If it's a Figma file or Jira issue and those tools are available in this session, do one quick lookup** (e.g. `getJiraIssue`, or Figma's metadata/context tools) to fill `Summary` with something real — an issue's title/status, a file's name — instead of leaving a bare link. This is what actually pulls fragmented source data into the central page, not just a pointer to where it still lives.
  - Dedupe by URL: if a link is already in the table, update its `Summary`/status if it changed rather than adding a duplicate row.
- **Deprecated** — not something you extract from chat; this is where superseded info from other sections gets moved during the merge (see below). Always stays last on the page.

**This list is not exhaustive, and the page's real structure is not fixed to it.** PM conversations produce kinds of content nobody enumerated in advance — risks/blockers, stakeholder or customer feedback, competitive intel, timeline/milestones, staffing notes, and things no one has thought of yet. When chat content is clearly a genuine kind of thing that doesn't belong in any category above (or any category already present on the page from a prior push):

1. **Create a new top-level category for it**, with a short, plain heading that names what it actually is.
2. **Insert it before Deprecated** (which always stays last).
3. **Say so explicitly in the report-back** — "created a new section, '[Name]', because [reason]" — so this is visible, deliberate structural evolution the user can see happening, never silent drift they'd have to notice on their own.

**Guard against fragmentation, though:** before creating a new category, check whether the content genuinely doesn't fit anywhere — including any category the page already has from a previous push (the whole-page fetch in step 1 is what makes this possible; always check what already exists before inventing something new). Don't create a near-duplicate of an existing category just because the phrasing differs, and don't spin up a new heading for a one-off aside that isn't likely to recur — that's what discarding as noise is for.

Skip pure brainstorming with no landing point, dead-end options that were explicitly abandoned with nothing salvageable, restated context, and small talk — regardless of which category (fixed or newly-created) they'd otherwise land in.

## Steps

1. **Fetch current state first, the whole page.** Using the target resolved above, call `getConfluencePage` (contentFormat: `html`) before extracting anything from the chat. Read every section, not just the one you expect to touch — contradictions can land anywhere.
2. **Extract candidates from the chat** into the categories above, going back to the last push (or the whole session if this is the first push).
3. **Diff each candidate against the live page before deciding anything is an "update"** (a candidate can be a bullet or a Linked Resources row — same logic either way):
   - Not on the page at all → a genuine **addition**.
   - On the page but the chat now contradicts or supersedes it (in *any* section, not just the matching one) → a **change** (old value moves to Deprecated, new value replaces it, and if the contradiction crosses sections — e.g. a new architecture decision invalidates an old open question — say so explicitly in the write-up). For a Linked Resources row specifically, an updated `Summary`/status for a URL already in the table counts as a change, not a new row.
   - **Narrows, clarifies, or adds a condition to an existing item without contradicting it** (e.g. the page says "we'll use REST" and the chat adds "— but only for v2, GraphQL for v1") → a **refinement**: append the clarification onto the existing bullet/row in place. Do not treat this as a new addition (it'd duplicate) or as a change requiring deprecation (nothing was actually wrong or superseded) — the original wasn't wrong, it was incomplete.
   - Already on the page, same substance, just reworded → **not an update** — discard, don't touch that bullet or row.
   - Chat only restates or re-confirms something the page already says → **not an update** — discard it.
4. **Gate on whether anything survived step 3.** If nothing qualifies as an addition, change, or refinement, stop — do not call `updateConfluencePage`. Tell the user "nothing new to push — page is already current" and briefly say why. Do not create no-op versions on the page.
5. **If something qualifies, merge it in:**
   - Update a bullet or table row in place if superseded; move the superseded version to **Deprecated** (one line: what it was, replaced by what, and the date) — never delete outright.
   - Append a refinement onto the existing bullet/row it clarifies, rather than as a separate new item.
   - Append genuinely new bullets or Linked Resources rows under the right category (or categories, if it spans more than one).
   - Leave every section, bullet, and row the chat has no bearing on completely untouched.
6. **Structure the page** using: the default categories above, plus whatever categories the page already has from prior pushes, plus any new category you're creating this run (inserted before Deprecated, which always stays last). Don't force content into a default category just because it's the closest fit if it's actually a distinct kind of thing.
7. **Before writing, re-check for a concurrent edit.** Immediately before calling `updateConfluencePage`, compare the version number you're about to write against the version you read in step 1. If the page has been edited by someone else in between (version advanced, or the write is rejected as a version conflict): re-fetch the current content, re-run steps 3–6 against *that* content (not your stale step-1 read), and retry the write once. Never blindly overwrite with a merge computed against content that's no longer current.
8. **Write it back.** Call `updateConfluencePage` with the merged HTML body, a short `versionMessage` naming exactly what changed, and increment the version.
9. **Report back to the user** in chat: a short bullet list of exactly what was added/changed/refined/deprecated (or the "nothing new" message), calling out explicitly anything cross-referenced across sections, anything flagged as cross-cutting impact, any new category created this run and why, and if a concurrent edit was detected and reconciled. Never just say "done."

## Rules
- Never fabricate content to fill a category — leave it empty if nothing qualifies.
- Never delete historical info; deprecate it instead, so the page stays an audit trail.
- Never record a decision without also capturing its stated rationale if the chat contains one — the outcome alone is not enough.
- Actively look for cross-object/cross-world/architecture impact and hedged/uncertain language; don't wait for the user to flag it as important.
- Keep bullets terse and concrete — this page is read by other AI tools and teammates cold, without this chat's context, so each line must stand on its own.
