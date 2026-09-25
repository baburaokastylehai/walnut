---
name: push
description: Keep durable project context straight across messy AI work. Inspect the current conversation, project context files, and an existing Walnut-managed destination; separate confirmed project truth from brainstorming and stale context; reconcile changes without duplicating or wiping history; and publish only what is genuinely new or changed. Confluence is the first supported destination.
---

# /push

your project gets messy. walnut keeps the part that matters.

## What Walnut owns

The host AI owns the project work: brainstorming, research, coding, writing files, and exploration.

Walnut owns what becomes durable shared project context.

Walnut must not require the project to work in a Walnut-shaped way.

## Operating principle

**listen widely. publish carefully.**

Discovery optimizes for recall. Publication optimizes for precision.

Do not publish directly from raw chat or file scanning.

## Required references

Read these before the relevant phase:

1. `references/discovery.md`
2. `references/confirmation.md`
3. `references/knowledge-model.md`
4. `references/categories.md`
5. `references/reconciliation.md`
6. `references/project-files.md`
7. `references/publishing.md`
8. `references/voice.md`
9. configured destination adapter — for Confluence, `references/destinations/confluence.md`

These references are part of the skill contract, not optional background reading.

## Run shape

### Step 0 — resolve destination and capability

Read the configured destination adapter.

For Confluence:

- reuse the existing target lock when present;
- verify the target page can be read;
- verify the environment has the capabilities required to update it;
- if there is no target, resolve it using the adapter rules;
- never retarget from a merely mentioned link.

If the destination cannot be used, stop before expensive extraction and explain the concrete blocker.

### Step 1 — read existing durable state first

Fetch the whole destination page before deciding what changed.

Also discover Walnut-managed child pages and any existing Project Files mappings that can be recovered.

If this is an existing Walnut project, preserve its current records and IDs. A plugin upgrade is never a reason to rebuild the page.

### Step 2 — discover project sources

Read `references/discovery.md` and `references/project-files.md`.

Inspect every configured source class independently:

- the current conversation available to the host AI;
- current project-context files and other relevant readable project documentation;
- the current durable destination;
- additional explicitly configured sources, when any.

If a checkpoint exists, use it to avoid unnecessary rereading, but fall back to full reconciliation whenever the state is incomplete, contradictory, migrated from an older Walnut version, or otherwise uncertain.

Do not confuse file modification time with claim freshness.

### Step 3 — build the candidate ledger

Before filtering, list every plausible project-knowledge candidate and its provenance.

Include Project Overview changes in this pass.

A candidate should carry enough information to identify:
- its substance;
- likely category;
- source;
- who asserted it when known;
- when it was asserted/observed when known;
- supporting or conflicting evidence.

Do not publish anything yet.

### Step 4 — confirm and classify

Read `references/confirmation.md`, `references/knowledge-model.md`, and `references/categories.md`.

Apply the confirmation policy to every candidate individually.

Assistant-originated ideas do not become durable project truth unless a human adopts them.

Human rejections count.

Partial acceptance only confirms the accepted portion.

Open Questions use their own unresolved-human-question rule.

When confirmation is ambiguous, exclude rather than guess.

Walnut may synthesize a Project Overview from multiple confirmed facts only when the synthesis introduces no new factual claim.

### Step 5 — reconcile with existing state

Read `references/reconciliation.md`.

Compare confirmed candidates against the whole durable record by substance.

For each candidate choose one semantic outcome:

- add;
- refine;
- supersede;
- resolve;
- no-op;
- surface conflict.

Equivalent wording is a no-op.

Recency is evidence, not an automatic winner.

For existing Walnut projects:
- keep existing D/R/Q IDs;
- continue their sequences;
- reuse recoverable child-page mappings;
- do not duplicate unchanged records;
- do not wipe or rebuild the destination merely to adopt v0.2 internal state.

### Step 6 — decide context-file behavior

Read `references/project-files.md`.

If meaningful current context files exist, use them. Do not replace them with a Walnut-owned fixed corpus.

If meaningful context files do not exist and the project now contains substantial confirmed context, make the one-time offer for the **host AI** to create project-appropriate context docs.

Never create those files without explicit approval.

If the offer was declined previously, do not ask again unless the person explicitly revisits the choice.

Reading a file and mirroring a file are separate decisions.

Mirror only eligible context documents. Existing child mirrors are grandfathered and should be reused rather than recreated.

### Step 7 — prepare the destination diff

Render only the semantic actions produced by reconciliation.

Keep the durable record self-contained and neutral.

Use the category and ID rules from `references/knowledge-model.md`.

Preserve source-provided reasoning, specificity, names, dates, affected systems, and important rejected alternatives.

Do not invent rationale.

Do not delete history because wording changed.

### Step 8 — concurrency guard and publish

Read `references/publishing.md`.

Immediately before writing, confirm the destination revision has not changed since reconciliation.

If it changed:
- refetch;
- reconcile again;
- retry once.

If it changes again, stop instead of overwriting unknown work.

If there is no semantic change and no eligible mirror update, do not write.

### Step 9 — mirror eligible files

Create or update child pages only for files that pass the mirroring policy.

A mirror failure does not invalidate the local file as a source.

Do not delete an existing child page merely because v0.2 would not choose to create that mirror from scratch today.

### Step 10 — verify

After any destination write, read the destination again.

Verify:
- expected additions/refinements/supersessions/resolutions are present;
- unchanged records remain;
- unrelated content was not removed;
- existing child-page mappings remain valid unless intentionally changed.

A write is not complete until verification passes.

### Step 11 — checkpoint

After a successful verified reconciliation, update private Walnut project state with the information needed for the next run, such as:

- destination identity/version;
- source fingerprints;
- last successful checkpoint;
- context-file offer status;
- mirror mappings;
- internal identity mappings when supported.

Keep this state private and uncommitted.

The existing `.claude/push-target.local.json` format remains supported for backward compatibility.

### Step 12 — report

Use `references/voice.md`.

Report what actually changed:
- added;
- refined;
- superseded;
- resolved;
- mirrored/re-mirrored.

Do not dump the excluded candidate ledger.

If nothing changed:

> nothing new stuck. left the page alone.

## Non-negotiables

- Never turn an unconfirmed assistant suggestion into project truth.
- Never infer a decision merely because it sounds sensible.
- Never let a quiet chat skip the project-file check.
- Never use timestamps alone to decide truth.
- Never reset an existing Walnut destination during a version migration.
- Never renumber existing human-facing IDs.
- Never mirror every readable file by default.
- Never let mirror failure prevent a valid source from informing reconciliation.
- Never fabricate content to make the destination look complete.
- Never overwrite a concurrent edit without reconciling again.
- Never report a write as successful without reading it back.
