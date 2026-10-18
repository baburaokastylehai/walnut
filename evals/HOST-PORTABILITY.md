# Host portability validation

Walnut is a host-neutral set of instructions. A capable host supplies source access, private persistent state and authenticated destination tools. Confluence remains the supported live destination. No Claude account is required for the core workflow.

## Portable distribution

`plugins/walnut/` remains canonical source to preserve existing installations. Its Claude manifest is optional packaging. Direct checkout execution reads the relevant skill and its references in place. `node scripts/export-skills.mjs <destination-directory>` generates independently installable `push/` and `pull/` folders, with shared references and the ledger helper copied into each. Author those resources once in canonical source; do not edit generated copies.

Automated tests establish:

- Every exported Markdown link and inline runtime reference resolves inside that individual skill folder.
- Each exported helper executes and validates a ledger from its isolated directory.
- Repeated exports are deterministic; execution does not depend on the working directory.
- Existing skills, including dangling destination symlinks, block both exports before writing either skill.

An independent reviewer also moved the skills into separate locations and checked 29 push and 21 pull runtime references, standalone helper execution and absence of private state, Git data, audit material or symlinks. The reviewer found the dangling-symlink conflict bug; it was fixed, regression-tested and confirmed resolved. These are local packaging checks, not AI semantic tests.

## Live exported pull in Codex

An independent host agent read only the exported pull entrypoint and references, then executed those instructions through the live personal Atlassian connector against the existing fictional Nightjar validation pages. Raw site identifiers, receipts and reader state remain private.

- First pull: complete QA-oriented onboarding with a tentative role lens, historical/current decision distinction and sourced implementation status. Atomic, Git-ignored project/checkpoint state saved in an isolated workspace.
- Second pull: fresh main/mirror reads; identical content and versions; retained ledger cursor, refreshed successful checkpoint and a short no-change result.
- Four destination reads; zero destination writes. Main revision 4, mirror revision 2 and ledger sequence 7 were unchanged. Service view counts may naturally increase on reads.

[Sanitized receipt](acceptance/2026-10-17/portable-live-pull.json), [first response](acceptance/2026-10-17/portable-first-pull.md), [second response](acceptance/2026-10-17/portable-second-pull.md).

This is actual manual instruction execution in Codex, not native automatic skill discovery. This trial adds no push-write or injected failure evidence. [Earlier live connector tests](LIVE-CONNECTOR-VALIDATION.md) cover push and shared ledger behavior through Codex; [controlled failure exercises](acceptance/2026-10-17/README.md) remain explicitly simulated.

## Host coverage and limits

| Path | Evidence |
|---|---|
| Intact checkout instructions in Codex | Earlier live push/pull connector trials |
| Independent exported pull instructions in Codex | Live first/no-change trial and private checkpoints above |
| Independent exported push/pull folders | Containment, relocated helper execution, deterministic/no-overwrite checks |
| Codex native `.agents/skills` discovery | Documented using [official instructions](https://learn.chatgpt.com/docs/build-skills); not exercised as automatic discovery in this run |
| Optional Claude plugin | Actual CLI 2.1.302 strict validation, loading, local marketplace installation and both discovered skills; authenticated model/Confluence invocation untested |
| Other hosts | Capability-based installation path supplied; not individually verified |

A repository clone cannot supply authentication, hidden conversation history, unavailable tools or durable storage. Command names and installation directories depend on the host. The export command requires Node.js 22+; instruction-only use does not. Existing `.claude/push-target.local.json` support is backward-compatible state migration, not a runtime dependency.

The former Claude-only authenticated release gate is superseded by the user's host-neutral product requirement. Review evidence by capability and actual execution path; do not label every host supported merely because the files are portable. Optional adapter tests stay separate from core acceptance.

Final independent documentation review found leftover Claude command labels in the generic tester steps. Those now use the host-neutral action names and distinguish optional namespacing. No privacy, unsupported universal-compatibility or active release-gate contradictions were found.
