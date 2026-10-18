# Fold — current shared project brain

Fictional expected output, not a live publication. The approved [pilot scope update](sources/pilot-scope-update.md) and [session 03](sources/session-03.md) supersede changed parts of the [initial brief](sources/project-brief.md); unchanged content remains authoritative.

Fold is an unbuilt pilot concept for small design studios to request client sign-off on a deliverable. The pilot now uses one stable review page per deliverable, showing the current version, and email verification without client accounts. The problem hypothesis remains unvalidated with customers. Precise behavior when a new version follows an earlier approval remains open.

## Decisions

- **D2 — Decided, not built; supersedes D1:** one stable review page per deliverable shows its current version. The PM changed direction after a scripted return-by-bookmark scenario was harder to explain with separate version links. This is design reasoning, not a real customer finding. The first version focuses on clear client approval; an annotation editor is deferred because detailed feedback tooling would widen the pilot before the sign-off idea is tested. The broader workspace stays deferred so the pilot does not expand into project management. PM, 2026-10-18.
- **D3 — Decided, not built:** verify client access through an email code, without client accounts in the pilot. Trade-off: accept a verification step while avoiding account setup. Code lifetime and technical implementation are unspecified. PM, 2026-10-18.

## Requirements

- **R1 — Refined:** show the current version label before explicit client confirmation and tie approval to that exact version. Opening a design is not approval. Button wording and old-approval behavior are not specified.

## Open Questions

- **Q2:** what happens to an earlier approval when a new version is uploaded? PM and engineer to discuss. No behavior has been adopted.

## Resolved Questions

- **Q1 — Resolved by D3:** email verification without client accounts is the pilot access approach.

## Research & Findings

- **F1 — Unchanged scripted observation:** the PM's fictional roleplay used “approved” for merely opening a design. It motivated R1; it is not real customer research or a prevalence claim.

## Historical decisions and deferred proposals

- **D1 — Superseded by D2:** separate review link for each uploaded version. Initially chosen to test explicit approval without building a broader workspace. Replaced to simplify the return path in the PM's scripted bookmark scenario; the reason for deferring the workspace still stands.
- **P1 — Withdrawn from active pilot consideration; deferred:** PM-owned hypothesis that side-by-side versions might make changes easier to review. Revisit after understanding the basic flow. It remains untested, not disproved; it was never committed pilot scope.

## Change Ledger

```json
{
  "schemaVersion": 1,
  "epoch": "fold-fictional-discovery-v1",
  "baseSequence": 0,
  "headSequence": 11,
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
    },
    {
      "sequence": 6,
      "eventId": "fold-demo-push-2:6",
      "batchId": "fold-demo-push-2",
      "recordId": "D2",
      "action": "supersede",
      "summary": "Replace separate links with a stable deliverable page and narrow the pilot to explicit approval.",
      "before": "Separate review link for each uploaded version (D1).",
      "after": "Stable review page per deliverable showing the current version (D2); simpler return-by-bookmark flow. Focus on explicit approval; defer the annotation editor to avoid broadening the pilot before testing sign-off, and keep the broader workspace deferred.",
      "source": "sources/session-03.md and sources/pilot-scope-update.md \u2014 explicit PM reversal",
      "publishedAt": "2026-10-18T14:05:00Z"
    },
    {
      "sequence": 7,
      "eventId": "fold-demo-push-2:7",
      "batchId": "fold-demo-push-2",
      "recordId": "R1",
      "action": "refine",
      "summary": "Make the version visible at explicit confirmation.",
      "before": "Client explicitly approves the reviewed version; opening it is not approval.",
      "after": "Show current version label before explicit confirmation and tie approval to that exact version; opening is not approval.",
      "source": "sources/session-03.md and sources/pilot-scope-update.md \u2014 PM-confirmed refinement",
      "publishedAt": "2026-10-18T14:05:00Z"
    },
    {
      "sequence": 8,
      "eventId": "fold-demo-push-2:8",
      "batchId": "fold-demo-push-2",
      "recordId": "D3",
      "action": "add",
      "summary": "Choose email verification without client accounts for the pilot.",
      "before": null,
      "after": "Verify client access through an email code without accounts; trade an extra verification step for avoiding account setup.",
      "source": "sources/session-03.md and sources/pilot-scope-update.md \u2014 explicit PM decision",
      "publishedAt": "2026-10-18T14:05:00Z"
    },
    {
      "sequence": 9,
      "eventId": "fold-demo-push-2:9",
      "batchId": "fold-demo-push-2",
      "recordId": "Q1",
      "action": "resolve",
      "summary": "Resolve Q1 with the access decision D3.",
      "before": "PM to resolve client accounts versus another access method before pilot scope is ready.",
      "after": "Resolved by D3: email verification without client accounts in the pilot.",
      "source": "sources/session-03.md and sources/pilot-scope-update.md \u2014 PM resolution",
      "publishedAt": "2026-10-18T14:05:00Z"
    },
    {
      "sequence": 10,
      "eventId": "fold-demo-push-2:10",
      "batchId": "fold-demo-push-2",
      "recordId": "P1",
      "action": "withdraw",
      "summary": "Defer comparison from active pilot consideration without calling the hypothesis disproved.",
      "before": "Tentative PM proposal: side-by-side versions might make revisions easier to review; not committed pilot scope.",
      "after": "Withdrawn from active pilot consideration; revisit after understanding the basic review flow; hypothesis remains untested.",
      "source": "sources/session-03.md and sources/pilot-scope-update.md \u2014 explicit PM deferral",
      "publishedAt": "2026-10-18T14:05:00Z"
    },
    {
      "sequence": 11,
      "eventId": "fold-demo-push-2:11",
      "batchId": "fold-demo-push-2",
      "recordId": "Q2",
      "action": "add",
      "summary": "Keep behavior after a new upload open.",
      "before": null,
      "after": "What happens to an earlier approval after a new upload? PM and engineer to discuss; no behavior adopted.",
      "source": "sources/session-03.md and sources/pilot-scope-update.md \u2014 explicit unresolved product question",
      "publishedAt": "2026-10-18T14:05:00Z"
    }
  ]
}
```
