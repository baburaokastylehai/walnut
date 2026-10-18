# Walnut — architecture

## Mental model

```text
messy project reality
────────────────────────────────────

AI conversation(s)
project context files
other selected project files
future external sources
existing durable destination

                ↓

             walnut

discover
understand
extract candidates
cross-check
reconcile
classify
diff

                ↓

private candidate ledger
identity + provenance + fingerprints

                ↓

publish / mirror
────────────────────────────────────

shared project brain + persistent Change Ledger
Confluence first
other destinations later

                ↓

              pull

read shared state
compare with personal checkpoint
apply role lens
brief what changed
```

Walnut's intelligence lives in the middle.

## Host boundary and distribution

Push and pull are host-executed instructions. The host supplies readable sources and references, a private persistent workspace, and authenticated destination tools. Push requires version-aware updates and read-back; pull requires complete reads. Walnut does not authenticate a host, provide its model or bridge tools between AI applications.

The source skills live at `plugins/walnut/skills/{push,pull}/SKILL.md` and can be loaded from an intact checkout. `node scripts/export-skills.mjs <destination-directory>` prepares self-contained `push/` and `pull/` folders with their own references and helper for native skill loaders. The Claude Code marketplace package is an optional adapter over the same source skills. Installation and invocation are host-specific; each intended host needs capability and behavioral validation.

## The pipeline

### 1. discover

Check every configured source class independently.

A quiet conversation never means project files can be skipped.

Discovery is intentionally broad. The goal at this stage is recall, not publication precision.

### 2. ingest

Read relevant source material and normalize enough metadata to reason about it.

Reading and mirroring are separate operations.

A source file can contribute to Walnut's understanding even if it should never be published as a mirrored document.

### 3. build the candidate ledger

Before filtering, record every plausible project-knowledge candidate with provenance.

A candidate should include enough metadata to answer:

- what is being claimed?
- what kind of knowledge could this be?
- where did it come from?
- who asserted it?
- when was it asserted or observed, when known?
- what other evidence supports or conflicts with it?

### 4. confirm and classify

Apply the confirmation policy per candidate, not per conversation.

Candidate outcomes include:

- publishable;
- unresolved question;
- excluded exploration;
- assistant-originated and unconfirmed;
- stale/superseded;
- conflicting / needs resolution.

### 5. reconcile

Compare candidates by substance.

Recency is evidence, not an automatic winner.

Walnut should distinguish:
- a file being newly modified from a project claim actually changing;
- a newer brainstorming message from a newer settled decision;
- refinement from reversal;
- disagreement from supersession.

When the evidence cannot safely resolve a conflict, preserve the uncertainty.

### 6. diff

Compare confirmed current knowledge with the durable destination.

Possible semantic actions:

- add;
- refine;
- supersede;
- resolve;
- deprecate/withdraw;
- no-op.

Equivalent wording should not produce duplicate records.

### 7. publish

Render the semantic changes using the configured destination adapter.

The core reasoning model must not depend on Confluence-specific identifiers or APIs.

### 8. mirror

Mirror eligible project-context files independently of the main synthesized record.

Mirroring is publication and therefore requires a higher bar than reading.

A mirror failure must not make Walnut forget what the local source said.

### 9. verify

After a write, read the destination state again and verify that the expected semantic change exists.

## Knowledge identity

Human-facing IDs remain useful:

- decisions: `D14`
- requirements: `R8`
- questions: `Q5`

But display IDs should not be the only identity Walnut relies on.

Long term, each item should have an internal immutable ID, for example:

```text
internal_id: wlt_01K...
display_id: D14
```

This allows relationships to survive category changes and document reorganizations.

Example:

```text
Q8
  ↓ resolved_by
D22
  ↓ supports
R19
```

Useful relationships include:

- `supersedes`
- `refines`
- `resolves`
- `supports`
- `derived_from`
- `conflicts_with`

This is a lightweight project knowledge graph, not a general memory graph.

## Lifecycle

A knowledge item may move through:

```text
candidate
  ↓
confirmed
  ↓
published
  ↓
refined ──────────┐
  ↓               │
superseded        │
withdrawn         │
                  │
      unresolved question
            ↓
         resolved
```

Old published knowledge should remain traceable when it is superseded or withdrawn.

## Provenance

Each confirmed item should be traceable to supporting evidence.

The useful minimum is:

```text
source_type
source_locator
asserted_by
observed_at
asserted_at        (when available)
source_fingerprint
```

Container modification time is only one freshness signal.

## Context-file discovery

Walnut should classify candidate files semantically, not only by extension.

Useful classes:

- project context document;
- working/scratch document;
- generated artifact;
- code/config;
- sensitive/private;
- unknown.

Reading and mirroring rules differ.

For example:

```text
architecture.md      read ✓   mirror likely
requirements.md      read ✓   mirror likely
brainstorm.md        read ✓   mirror maybe/no
scratch.md           read ✓   mirror no
.env                  read no  mirror no
```

When in doubt about publication, do not mirror automatically.

## Missing context files

If no suitable context docs exist and enough confirmed project knowledge has accumulated, Walnut can make a one-time offer to have the host AI create project documentation.

The host AI owns document creation.

Walnut should suggest a useful shape but not mandate one.

Once created, the docs become ordinary discoverable project sources.

## Internal state

Walnut needs small private project state for things such as:

- configured destination;
- internal item identities;
- display-ID allocation;
- source fingerprints/checkpoints;
- context-file offer status;
- mirror metadata;
- last successful reconciliation checkpoint.

This state is an index, not another prose source of truth.

Prefer keeping private Walnut state outside the repository long term, for example:

```text
~/.walnut/projects/<project-id>/state.json
```

If repository-local state is used during the transition, it must be ignored by Git.

## Long conversations and checkpoints

"Read the entire conversation from the beginning on every run" cannot remain the only strategy.

Walnut should support incremental reconciliation:

```text
previous checkpoint
+ conversation since checkpoint
+ files changed since checkpoint
+ current destination state
→ reconciliation
```

A full-reconciliation mode should remain available for recovery, migrations, or verification.

The checkpoint is an optimization. It must never become an excuse to miss a later contradiction or source change.

## Destination adapters

Core reasoning should use generic capabilities such as:

- read target;
- read revision/version;
- create child document;
- update document;
- link to document/section;
- verify write.

Confluence-specific behavior belongs in a Confluence adapter/reference.

Future destinations should be addable without rewriting extraction and reconciliation policy.

## Concurrency

Before publishing:

1. read the current destination revision;
2. compare it with the revision used during diffing;
3. if it changed, refetch and reconcile again;
4. retry once;
5. if concurrent changes continue, stop rather than overwrite unknown work.

## Gates

### discovery gate

Every configured source class was checked.

### extraction gate

Every candidate has provenance.

### confirmation gate

Every publishable claim has a valid confirmation path.

### reconciliation gate

Every material conflict is resolved, superseded, or surfaced.

### publication gate

Only semantic changes identified by the diff are written.

### verification gate

Expected changes are present after the write.

## Separation of concerns

Target shape:

```text
skills/push/
  SKILL.md

  references/
    discovery.md
    source-policy.md
    knowledge-model.md
    confirmation.md
    reconciliation.md
    project-files.md
    publishing.md
    voice.md

    destinations/
      confluence.md

  evals/
    ...
```

`SKILL.md` should be the conductor.

Detailed policy belongs in focused references that are loaded when relevant.


## Pull architecture

`pull` is a read-only consumer of the shared Walnut project brain.

It keeps per-person state locally rather than writing consumption metadata into the shared destination.

```text
shared project brain
        +
local pull profile
(role + last-seen fingerprints)
        ↓
semantic delta
        ↓
role lens
        ↓
project briefing
```

The shared project truth is identical for every role.

Role lenses control:
- ordering;
- explanation depth;
- highlighted implications.

They do not create separate role-specific facts.

The first pull establishes a baseline and gives full project onboarding. Later pulls are delta-oriented.

## v0.3 package and continuity

One source package at `plugins/walnut` contains both skills. Shared references contain character, project language, destination-state migration and the persistent ledger contract. They are runtime instructions, not repository-only brand documentation. Exported native skills carry copies of their dependencies; exporting does not introduce another policy implementation.

The candidate ledger is private and temporary. The shared Change Ledger is persisted with verified semantic changes, carrying an epoch, contiguous sequence, stable batch/event identity and provenance. Pull consumes events after its local cursor and also compares current records to detect direct edits. Gaps or missing ledgers fall back to semantic snapshots.

The optional Node helper validates ledger structure and cursor coverage. It does not confirm facts or decide semantic equivalence. These remain host-AI responsibilities.

The main page can update records and events together under a revision guard. Child mirrors require separate writes, with pending-event recovery on partial failure. Read-back verification precedes checkpoint advancement.

See [the ledger contract](../plugins/walnut/references/change-ledger.md), [state contract](../plugins/walnut/references/local-state.md) and [beta limits](LIMITATIONS.md).
