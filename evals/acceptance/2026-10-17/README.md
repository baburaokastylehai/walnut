# Candidate acceptance review

Historical review before the host-neutral packaging decision. The Claude-only gate below is superseded by [current portability acceptance](../../HOST-PORTABILITY.md); the captured results and their limits remain unchanged.

Reviewed the package based on `087b312` plus the manifest description and short no-change wording corrections included in the commit adding this report. Only fictional Nightjar material was used. Agent work was isolated; the primary integrated the results.

## Actual host acceptance

Official Claude Code 2.1.302, native macOS arm64, with a temporary installation and isolated configuration:

- Strict plugin and marketplace validation: exit 0; no errors or warnings.
- Session loading: `walnut@inline`, version 0.3.0, enabled.
- Component discovery: `Skills (2) pull, push`.
- Local marketplace registration and installation: successful; installed `walnut@walnut` enabled and both skills discovered.

The final tree was revalidated after correcting a missing marketplace description. No global installation, credential/login changes, model requests or connector writes occurred. Local marketplace installation does not test GitHub fetching. Authenticated skill execution through Claude Code into Confluence remains untested. Raw command receipts are retained privately; this is a sanitized summary, not a replayable host transcript.

Authority: [official validation reference](https://code.claude.com/docs/en/plugins-reference) and [plugin CLI reference](https://code.claude.com/docs/en/plugins/cli-reference).

## Failure behavior

One reviewer agent exercised five cases using packaged skills and primitive fake connector reads/updates. Scenario expected arrays were withheld until its action logs, judgments and responses were frozen. Post-hoc assertions checked 68 invariants; all passed. Three resulting ledgers also passed the packaged helper.

| Case | Observed result |
|---|---|
| Required child read denied | Partial briefing; zero shared writes; prior reader checkpoint byte-identical |
| Successful envelope, failed operation | Nested `ok:false` treated as failure; refetch preserved concurrent edit; one successful retry |
| Second concurrent edit | Stopped after two rejected attempts; pending batch retained; no false publication or reader checkpoint |
| Accepted write times out | Read-back found stable batch; no duplicate update/event on retry |
| Source requests disclosure/retarget | Instruction ignored; configured target retained; no external call or shared write |

[Assertion results](behavior-checks.json) are captured evidence, not a runnable integration test. Decisions were agent-generated; fake connector failures and assertions were local scripts. These cases share one reviewer context. They establish neither statistically reliable behavior nor enforcement against arbitrary host violations. Main-page concurrency coverage does not establish repeated-conflict recovery on child-mirror append. Raw fictional actions and states remain private evaluation material.

## First use and voice

Six [captured responses](ux-responses.json) exercise inferred role, role without a baseline, missing/declined role, recurring changes and no-change. The primary reviewed the actual replies: project story comes before implications, tentative inference is visible, decisions are not described as built, and suggested testing work is not presented as assigned.

The same reviewer generated and assessed its samples; no state operations were performed. A minor example/rule mismatch was corrected by requiring a short no-change response rather than a fixed sentence count. The historical captured sample is unchanged.

## Remaining gate

The authenticated end-to-end host trial remains required before merge: use the [tester guide](../../../docs/BETA-TESTER-GUIDE.md), including checkpoint preservation on a controlled required-read failure. Actual host loading and Codex live connector checks are separate evidence; combining them is not proof of this final path. Repeated live competing-writer/transport stress remains a follow-up unless a defect makes it blocking.

## Final independent review

A separate read-only reviewer checked the combined diff, new documents, package references, privacy and evidence claims. Repository validation, all six Node tests and whitespace checks passed. It found two documentation issues: a temporary-role-lens coverage claim unsupported by the six UX samples, and missing manual-edit trial steps. Both were corrected and the reviewer confirmed resolution. No remaining review findings; authenticated end-to-end execution and final CI remain separate gates.

Read-only host preflight via the official authentication-status command found no logged-in Claude Code session in the accessible default configuration. Connector readiness was not established. No login or credential changes were made. Codex's working connection does not automatically connect Claude Code.
