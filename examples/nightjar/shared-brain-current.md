# Nightjar — fictional shared project brain

A telescope-booking prototype for volunteers. The calendar shows observing slots and remaining places. The pilot uses eight places per slot and has no waiting list.

## Decisions

- D2 — Decided, not built — Each pilot slot has eight places. Supersedes D1.
- D3 — Decided, not built — No waiting list in the pilot, to keep the booking flow small.

## Requirements

- R1 — Show available places before booking.

## Resolved Questions

- Q1 — Resolved by D3: the pilot will not offer a waiting list.

## Historical

- D1 — Superseded by D2 — Each slot has six places.

## Change Ledger

```json
{
  "schemaVersion": 1,
  "epoch": "nightjar-fictional-demo-v1",
  "baseSequence": 0,
  "headSequence": 6,
  "entries": [
    {
      "sequence": 1,
      "eventId": "demo-push-1:1",
      "batchId": "demo-push-1",
      "recordId": "D1",
      "action": "add",
      "summary": "Set the initial slot limit.",
      "before": null,
      "after": "Each slot has six places.",
      "source": "conversation.md \u2014 explicit human decision or question",
      "publishedAt": "2026-10-17T18:00:00Z"
    },
    {
      "sequence": 2,
      "eventId": "demo-push-1:2",
      "batchId": "demo-push-1",
      "recordId": "R1",
      "action": "add",
      "summary": "Make remaining capacity visible.",
      "before": null,
      "after": "Show available places before booking.",
      "source": "conversation.md \u2014 explicit human decision or question",
      "publishedAt": "2026-10-17T18:00:00Z"
    },
    {
      "sequence": 3,
      "eventId": "demo-push-1:3",
      "batchId": "demo-push-1",
      "recordId": "Q1",
      "action": "add",
      "summary": "Waiting-list policy remains open.",
      "before": null,
      "after": "Should full slots offer a waiting list?",
      "source": "conversation.md \u2014 explicit human decision or question",
      "publishedAt": "2026-10-17T18:00:00Z"
    },
    {
      "sequence": 4,
      "eventId": "demo-push-2:4",
      "batchId": "demo-push-2",
      "recordId": "D2",
      "action": "supersede",
      "summary": "D2 supersedes D1: raise the pilot slot limit to eight.",
      "before": "Six places per slot (D1).",
      "after": "Eight places per slot for the pilot (D2).",
      "source": "conversation.md \u2014 explicit human decision or question",
      "publishedAt": "2026-10-17T19:00:00Z"
    },
    {
      "sequence": 5,
      "eventId": "demo-push-2:5",
      "batchId": "demo-push-2",
      "recordId": "D3",
      "action": "add",
      "summary": "Keep the pilot booking flow small.",
      "before": null,
      "after": "No waiting list in the pilot.",
      "source": "conversation.md \u2014 explicit human decision or question",
      "publishedAt": "2026-10-17T19:00:00Z"
    },
    {
      "sequence": 6,
      "eventId": "demo-push-2:6",
      "batchId": "demo-push-2",
      "recordId": "Q1",
      "action": "resolve",
      "summary": "Close the waiting-list question with its decision link.",
      "before": "Waiting-list policy undecided.",
      "after": "Resolved by D3: no waiting list in the pilot.",
      "source": "conversation.md \u2014 explicit human decision or question",
      "publishedAt": "2026-10-17T19:00:00Z"
    }
  ]
}
```
