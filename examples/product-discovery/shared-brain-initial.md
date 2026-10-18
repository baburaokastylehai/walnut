# Fold — initial shared project brain

Fictional expected output, not a live publication. Sources: PM-approved [initial brief](sources/project-brief.md), [discovery](sources/session-01.md) and [confirmation](sources/session-02.md).

Fold is an unbuilt product concept for small design studios to request client sign-off on a deliverable. The working problem hypothesis is that feedback and approval can be hard to distinguish. No customer validation or release date is established. The PM is narrowing a pilot before design and engineering exploration.

## Decisions

- **D1 — Decided, not built:** use a separate review link for each uploaded version. Defer a broader client workspace because its onboarding and collaboration surface would widen the pilot before the explicit-approval idea is tested. PM, 2026-10-18.

## Requirements

- **R1:** clients explicitly approve the reviewed version. Opening a design does not count as approval.

## Open Questions

- **Q1:** should client access require accounts or use another access method? PM to resolve before pilot scope is ready.

## Proposals

- **P1 — PM-owned, tentative:** side-by-side versions might make changed work easier to review. Untested hypothesis; not committed pilot scope. The PM explicitly adopted the proposal for consideration.

## Research & Findings

- **F1 — Scripted observation:** the PM's fictional roleplay used “approved” when the client had only opened the design. Evidence is an internal invented exercise, not actual customer behavior. The PM used it to motivate R1; no claim about prevalence follows.

## Change Ledger

```json
{
  "schemaVersion": 1,
  "epoch": "fold-fictional-discovery-v1",
  "baseSequence": 0,
  "headSequence": 5,
  "entries": [
    {
      "sequence": 1,
      "eventId": "fold-demo-push-1:1",
      "batchId": "fold-demo-push-1",
      "recordId": "D1",
      "action": "add",
      "summary": "Choose version-specific review links; defer a broader client workspace.",
      "before": null,
      "after": "Separate review link for each uploaded version; defer the broader workspace to limit pilot scope.",
      "source": "sources/session-01.md and sources/project-brief.md \u2014 PM decision, approved in session 02",
      "publishedAt": "2026-10-18T10:05:00Z"
    },
    {
      "sequence": 2,
      "eventId": "fold-demo-push-1:2",
      "batchId": "fold-demo-push-1",
      "recordId": "R1",
      "action": "add",
      "summary": "Require explicit approval of the reviewed version.",
      "before": null,
      "after": "Client explicitly approves the reviewed version; opening it is not approval.",
      "source": "sources/session-02.md and sources/project-brief.md \u2014 PM-confirmed requirement",
      "publishedAt": "2026-10-18T10:05:00Z"
    },
    {
      "sequence": 3,
      "eventId": "fold-demo-push-1:3",
      "batchId": "fold-demo-push-1",
      "recordId": "Q1",
      "action": "add",
      "summary": "Keep the client access method open for PM resolution.",
      "before": null,
      "after": "PM to resolve client accounts versus another access method before pilot scope is ready.",
      "source": "sources/session-01.md and sources/project-brief.md \u2014 PM-owned open question",
      "publishedAt": "2026-10-18T10:05:00Z"
    },
    {
      "sequence": 4,
      "eventId": "fold-demo-push-1:4",
      "batchId": "fold-demo-push-1",
      "recordId": "P1",
      "action": "add",
      "summary": "Retain the PM-owned comparison proposal as an untested hypothesis.",
      "before": null,
      "after": "Tentative PM proposal: side-by-side versions might make revisions easier to review; not committed pilot scope.",
      "source": "sources/session-01.md and sources/project-brief.md \u2014 PM ownership and explicit retention approval",
      "publishedAt": "2026-10-18T10:05:00Z"
    },
    {
      "sequence": 5,
      "eventId": "fold-demo-push-1:5",
      "batchId": "fold-demo-push-1",
      "recordId": "F1",
      "action": "add",
      "summary": "Scope the observation to a fictional scripted walkthrough.",
      "before": null,
      "after": "PM roleplay used approved when a design was only opened; scripted exercise, not customer evidence.",
      "source": "sources/session-02.md and sources/project-brief.md \u2014 PM-confirmed observation and evidence boundary",
      "publishedAt": "2026-10-18T10:05:00Z"
    }
  ]
}
```
