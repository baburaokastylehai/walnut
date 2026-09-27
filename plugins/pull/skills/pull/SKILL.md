---
name: pull
description: Brief someone from Walnut's shared project context. On first use, learn who they are and give them the project story in language relevant to their role. On later uses, compare the shared project record with what this person has already seen and report only meaningful changes, while keeping project-wide visibility.
---

# /pull

get caught up without reading the whole project.

## What pull is for

`/push` keeps the shared project record current.

`/pull` helps someone consume that record.

The person using `/pull` should not need to know how Walnut stores Decisions, Requirements, Open Questions, mirrored files, or history. Read the shared context, understand who is asking, and turn it into a useful project briefing.

## Core rule

**shared truth stays shared. relevance is personal.**

The central Walnut destination is the same for everyone.

Each person has a local pull profile containing:
- who they are / role;
- which shared destination they read;
- what destination state they last saw;
- fingerprints or IDs of durable records already seen;
- child-page versions already seen;
- last successful pull time.

This state is private and must not be committed.

## Required references

Read these before the relevant phase:

1. `references/onboarding.md`
2. `references/change-detection.md`
3. `references/role-lenses.md`
4. `references/brief-format.md`
5. `references/voice.md`
6. configured destination adapter — for Confluence, `references/destinations/confluence.md`

## Step 0 — resolve shared project context

Read the destination adapter.

For Confluence:
- first look for an existing local pull profile at `.walnut/pull-state.json`;
- if a valid target is stored, reuse it;
- if this project also has a valid `.claude/push-target.local.json`, it may be offered/reused as the same shared target when appropriate;
- otherwise use an explicitly supplied page or ask which Walnut/Confluence project page to read;
- verify that the page can be read.

`/pull` is read-only with respect to the shared project destination. It must never update the central page.

## Step 1 — identify the person

Read `references/onboarding.md`.

If no pull profile exists, ask who the person is in the project.

Accept natural answers such as:
- designer / product designer / UX;
- developer / engineer;
- QA / test;
- developer + QA;
- technical writer / docs;
- PM / product manager;
- another role described in their own words.

Do not force a rigid dropdown.

Store the role locally after the person answers. Do not ask again on every pull.

If they explicitly change roles or ask to see the project through another lens, update or temporarily override the role.

## Step 2 — read the project brain

Fetch the full main Walnut project page.

Read any linked Walnut-managed child pages that are needed to understand:
- the project overview;
- current decisions;
- current requirements;
- current open questions;
- current proposals where relevant;
- architecture / cross-impact;
- mirrored project files;
- historical/superseded context when needed to understand a change.

Do not dump every source into the response.

## Step 3 — decide first pull vs recurring pull

If there is no successful prior pull checkpoint for this person, this is a **first pull**.

If a valid checkpoint exists, this is a **recurring pull**.

Use `references/change-detection.md`.

## Step 4 — first pull: build the project story

The first pull is onboarding, not a changelog.

Every role should get:

1. **what we're solving** — the problem in concrete Arena/product language;
2. **the proposed/current solution** — how the project intends to solve it;
3. **where it stands** — what is decided, what is still open, and the current phase;
4. **what matters for you** — the parts most relevant to this person's role;
5. **things to keep an eye on** — unresolved questions, dependencies, or upcoming decisions likely to affect them.

Do not start with a list of D/R/Q IDs.

Use those records to build a coherent explanation.

Arena terminology should be preserved where it makes the explanation more useful to the team. Explain unfamiliar or changed terms naturally in context.

## Step 5 — recurring pull: detect what changed

Compare the current durable project state with this person's last successful checkpoint.

A meaningful update includes:
- a new durable record;
- a refinement to an existing record;
- a superseded/reversed decision;
- a resolved or newly opened question;
- a changed project overview/status;
- a new or materially changed mirrored context document;
- a project change that alters the role-specific understanding of the work.

Do not report:
- wording-only edits;
- page formatting changes;
- reordered content with no semantic change;
- unchanged records;
- internal Walnut bookkeeping.

If nothing meaningful changed, say so briefly and stop.

## Step 6 — translate changes through the role lens

Read `references/role-lenses.md`.

For every meaningful update, decide:

- **for you** — directly relevant to this person's work;
- **project visibility** — not directly actionable for them, but useful context about where the project moved;
- **needs attention** — a confirmed dependency, unresolved question, or change that clearly requires their role's input/action.

Do not hide project-wide change just because it is outside their domain. Keep it shorter under project visibility.

Never invent an action item.

If the source confirms an owner/action, state it.

If the source does not confirm an action but the change has an obvious role implication, label it as an implication rather than a requirement, e.g.:
- "for design, this likely changes the state we need to account for..."
not:
- "design must..."

## Step 7 — write the briefing

Read `references/brief-format.md` and `references/voice.md`.

The briefing should feel like a useful teammate catching someone up, not a generated status report.

Prefer:
- plain language;
- short sections;
- context before IDs;
- Arena/product terms people already use;
- specific changes over generic summaries.

Use stable IDs only when they help the person trace something back to the shared project page.

## Step 8 — checkpoint only after a successful pull

After successfully reading and briefing the current shared state, update `.walnut/pull-state.json` with enough data to identify what this person has now seen.

Store:
- destination identity;
- role;
- destination version / observed revision;
- durable record IDs + semantic fingerprints when available;
- relevant child-page IDs + versions/fingerprints;
- lastPulledAt.

Do not advance the checkpoint if the destination read was incomplete or failed.

## Non-negotiables

- Never write to the shared project destination.
- Never ask the person's role again when a valid profile already exists.
- Never treat "relevant to my role" as "hide everything else."
- Never present a role inference as confirmed project truth.
- Never call wording-only edits a project update.
- Never make a recurring pull reread like first-time onboarding unless the person asks for a full refresh.
- Never overwhelm the person with every Decision/Requirement ID.
- Never lose Arena-specific context merely to make the explanation generic.
- Never report "up to date" unless the shared destination was actually read successfully.
