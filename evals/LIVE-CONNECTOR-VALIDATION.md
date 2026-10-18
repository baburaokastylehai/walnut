# Live connector validation — 2026-10-17

A user-authorized personal Confluence connection was used for dedicated child pages containing only fictional Nightjar data. The parent page was read and remained at its original revision. Site identifiers, page URLs and personal state stay in private local evidence.

These were real connector calls executed by Codex while following the packaged skill contracts. They were not an installation or invocation of the Claude Code plugin.

| Case | Result | Evidence |
|---|---|---|
| initial publish and json roundtrip | Pass | Initial create/read-back preserved the full expected JSON ledger. |
| first pull | Pass | Read complete source; QA baseline at sequence 3; no destination writes. |
| no op push | Pass | Complete comparison identical; no update called; revision remained 1. |
| recurring push and pull | Pass | Verified complete ledger through sequence 6, D1 preserved historical, D2/D3 current, Q1 resolved; recurring read made no shared writes. |
| native code block preserved | Pass | HTML read contains JSON code block, Markdown read parses to exact expected envelope. |
| stale snapshot rejected | Pass | Connector returned ok:false/snapshot_stale; current revision stayed 2. Transport isError was false, so callers must inspect payload status. |
| manual edit without event | Pass | R1 changed in current snapshot while ledger head stayed 6; recurring comparison detected the local-start-time addition. No shared write performed by pull. |
| pending mirror recovery | Pass | Controlled interruption after verified child update; persisted pending evidence; reread unchanged child; appended event at head+1; verified before clearing. No transport failure was induced. |
| already published retry | Pass | Repeated recovery inspection found exact existing event and verified child; no second update called; ledger has exactly one matching event. |
| parent unchanged | Pass | Parent page remains at original version 1. |

## Important connector behavior

A stale snapshot update returned a successful tool envelope with `data.ok: false` and `reason: snapshot_stale`. The update did not persist. Callers must inspect operation-level status and expected content/revision, rather than treating a non-error transport response as a successful write. This is now explicit in both destination references.

## Remaining limits

The mirror recovery scenario deliberately paused between a verified child update and the main-ledger append. It validates recovery across real page writes, without claiming a real network timeout was induced. Failed required-child reads, repeated concurrent writers and uncertain transport failures remain covered by local reviewer simulations rather than controlled live fault injection.

Actual package loading and namespaced skill discovery in Claude Code remain pending. No automatic merge or release is authorized by this report.
