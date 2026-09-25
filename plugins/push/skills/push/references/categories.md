# Durable record categories

These rules preserve the useful detail of Walnut v0.1 while keeping the main skill small.

## Project Overview

Always lead with a concise, source-grounded explanation of:
- the problem being solved;
- the goal;
- the current phase;
- what is settled vs still being worked, when supported;
- external validation, release shape, or timeline only when confirmed.

Walnut may synthesize this from multiple confirmed facts, but may not introduce a new factual claim.

Page-maintenance notes never replace the actual project overview.

## Glossary / Key Terms

Use for recurring project-specific terminology that a cold reader needs to understand.

Track terminology drift:
- old name/meaning;
- current name/meaning;
- roughly when it changed, when known.

Other records must still remain understandable on their own. Do not force readers to chase the glossary for basic context.

## Decisions

A Decision records something settled enough to guide work, including explicit rejections.

Every Decision must:
- have a stable display ID such as D14;
- include one firmness level:
  - Decided;
  - Decided, not built;
  - Agreed in principle;
  - Working decision;
- state the decision completely enough for a cold reader;
- preserve source-provided reasoning;
- attribute/date it when the source allows;
- preserve important rejected alternatives and why they were rejected when the source provides that reasoning.

Do not turn prototype implementation trivia into product decisions. Capture the durable product principle underneath it instead.

## Requirements

A Requirement is a concrete confirmed product/project specification.

Every Requirement:
- receives a stable ID such as R8;
- states the full behavior/constraint, not merely a label;
- preserves meaningful conditions and exceptions;
- excludes incidental implementation mechanics unless they are themselves the confirmed requirement.

## Open Questions

Only genuine unresolved project/product questions belong here.

Every Open Question:
- receives a stable ID such as Q5;
- contains enough context for someone new to attempt an answer;
- states who resolves it when the source identifies a person/role/team;
- remains open only while genuinely unresolved.

Order active questions by cost of getting them wrong when that can be judged from confirmed context.

Do not put Walnut housekeeping, broken tooling, sync mechanics, or rhetorical questions here.

If the project already maintains a dedicated authoritative Open Questions document, prefer mirroring/linking that source and add only genuinely new questions not represented there.

## Architecture & Cross-Impact

Use for confirmed cross-cutting effects on:
- other product systems;
- features/modules;
- teams;
- projects;
- integrations or dependencies.

Name the affected thing and the effect specifically.

Do not infer cross-impact merely because something seems connected.

This category is about the project, not about Walnut's own maintenance.

## Proposals

Use for a human-originated idea explicitly still under consideration.

Do not place assistant-originated suggestions here unless a human has taken ownership of the proposal.

If the proposal becomes settled later, reconcile it into the appropriate durable category instead of duplicating it.

## Research & Findings

Use for meaningful evidence, research, observations, data, source material, or findings that the human introduced/confirmed or an authoritative file contains.

When the content contains discrete data points, preserve its structure with a table/list rather than flattening it into prose.

When supported by the source:
1. lead with the key takeaway;
2. preserve supporting detail;
3. include the source-supported implication for the project.

Do not invent the implication.

## Project Files

When mirrored project-context files exist, maintain an index such as:

| File | Why it matters | Link |
|---|---|---|

This is a reading guide, not a duplicate summary of each file.

Project Files are Walnut-managed mirrors of project-owned documentation.

## Linked Resources

Use a table:

| Type | Label | Link | Summary | First referenced |
|---|---|---|---|---|

Be selective.

Include a resource when:
- a human explicitly wants it retained or it is necessary to understand confirmed cross-project context; and
- the link is usable, or its inability to be checked is stated plainly.

If a tool can validate a link, validate it.

A confirmed dead link is not a healthy resource. If replacing it matters to the project, represent that as an Open Question rather than keeping a broken row.

Distinguish a living source that changes faster than Walnut's destination from an ordinary reference.

## Deprecated / historical

Historical content is populated by reconciliation, not by extracting stale chat directly.

Use it for durable records that were genuinely superseded or withdrawn.

Preserve:
- old display ID;
- old substance;
- what replaced it when applicable;
- relevant timing/reasoning when supported.

Always keep historical material after active content.

## Large categories

When a category becomes difficult to scan (roughly several dozen substantial records), it may move to a child page.

The main page should keep:
- the category heading;
- a concise pointer;
- a real link.

Moving content must not summarize away or lose detail.

## Cross-references

Use stable IDs for durable records.

When the destination supports anchors/links, link directly rather than writing vague prose such as "see the earlier decision."

## Metrics

Metrics is not a default category.

Create it only when the project genuinely has confirmed, trackable metrics worth maintaining.
