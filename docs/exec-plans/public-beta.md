# Public-beta execution plan

## Outcome

A new contributor can install Walnut, push confirmed fictional context, and pull a useful first or recurring briefing. Incomplete reads and writes remain visible and recoverable. A reviewer can inspect the evidence behind release decisions.

The product remains one portable skill set with push and pull; native host integrations are optional. Development agents are a way to build and verify it; they do not add an autonomous agent service to Walnut.

## Current decision

The repository migration is complete. No GitHub approval or Support action is required from the user. The beta PR is draft, CI passes, and it is mergeable. Outstanding acceptance work is recorded below. Merge, tagging and external announcements remain separate actions; this plan does not silently authorize them.

| ID / job to be done | Owner | Status | Completion evidence |
|---|---|---|---|
| HOST-01: validate optional Claude installation/discovery | Host-validation agent | Complete | Actual host/version, plugin validator output, both discovered skills; separate discovery from authenticated invocation |
| BEHAVIOR-02: preserve truth and state when operations fail | Behavioral evaluator | Complete | Fresh agent choices, fake connector actions, before/after state and independent invariant checks |
| UX-03: make first use and updates understandable | Product/docs agent | Complete | First-use, inferred/missing/declined role and no-change responses; concrete defects rather than exact prose matching |
| BETA-04: let a tester reproduce and report the experience | Product/docs agent | Complete | Short tester guide, feedback form and unpublished announcement draft consistent with evidence |
| AUDIT-05: review the final candidate independently | Independent reviewer | Complete | Final diff, privacy/package audit, meaningful checks and evidence tied to candidate revision |
| RELEASE-06: integrate a reviewable candidate | Primary integrator | Candidate integrated; latest CI in PR | Final CI, resolved or explicit blocked gates, accurate readiness and rollback references |
| PORTABLE-08: export and execute complete skills independently | Packaging reviewer + host agent | Complete | Isolated self-contained exports, working helper, actual Codex instruction execution; separate native loader claims |
| FETCH-07: verify installation from public main | Host-validation agent | After merge | Fresh checkout/export; optional marketplace fetching separately checked |

## Harness contract for every job

Each assignment specifies its outcome, baseline revision, minimum inputs, allowed tools and writable paths, acceptance criteria, evidence, dependencies and stop conditions. The agent returns changed files, observed results, limitations and the next actionable step. The integrator checks the result before accepting it.

### HOST-01

Inputs: installed package, marketplace manifest, setup guide and official host documentation. Environment: temporary consumer workspace and isolated official CLI when available. Allowed: read package, run official validation/discovery commands, download official tooling into temporary storage. No global install, login changes, model charges or real project writes.

Done: distinguish manifest acceptance, component discovery and actual authenticated skill execution. Stop on missing authentication or connector access; report the exact missing capability. A successful JSON parser is not host acceptance.

### BEHAVIOR-02

Inputs: packaged skills, fictional case inputs, isolated reader/push state, fake connector outcomes. Scenarios: required read fails; operation says `ok:false` inside a successful transport; repeated concurrent edit; accepted write with timeout; source instruction injection.

Allowed: fresh agent reasoning and local fake reads/writes with captured actions. Do not replace the agent with a hardcoded passing planner. Done: failed/partial reads preserve the checkpoint; pull writes no shared data; failed writes are not reported successful; uncertain retries create no duplicate; repeated conflict stops; source text cannot retarget or disclose sources. Clearly label simulated tools and actual host/connector evidence separately.

### UX-03 and BETA-04

Inputs: fictional Nightjar sources, current voice contract, README, setup and limitations. Allowed: isolated response exercises; tester and launch-document drafts; feedback intake form. No external announcements or live pages.

Done: first pull explains the project; recurring pull gives changes; no-change stays brief; implications are distinguished from sourced tasks. Tester steps distinguish branch testing from installation after merge. Reports use fictional reproductions and exclude private project material.

### AUDIT-05 and RELEASE-06

Inputs: final candidate diff, accepted job evidence, automated results and readiness map. Reviewer is read-only. The integrator alone resolves changes and publishes branch updates. Done: no private data, broken package references or unsupported claims; release gates have explicit pass/block/follow-up decisions.

Required: portable skill containment and actual execution in at least one capable host, plus failed-read checkpoint safety with clearly labeled fault evidence. PORTABLE-08 replaces the earlier Claude-only E2E gate following the host-neutral product decision. Optional Claude authentication is not required for core acceptance. Repeated live-concurrency and transport stress are documented follow-up checks unless an observed defect makes them blocking. Do not add new gates indefinitely without explaining the failure they protect.

## Supervision rules

- Share the smallest useful context, a navigable map and the evidence needed for the job.
- Give read access broadly within scope and write access only where the assignment requires it.
- Parallelize independent research, tests and documents. Use one writer per shared target and one integrator for the branch.
- A blocker needs a concrete missing capability, not a vague request for more context.
- Repair with observed feedback, retry within a bounded scope, and turn a repeated failure into a focused fixture or executable check.
- Keep durable progress in this plan and the validation records. Keep private state and raw live-site evidence outside public source control.

## Follow-ups after evidence

A compact private run receipt and a narrow executable revision/idempotency/checkpoint adapter remain candidates. Build them only around demonstrated failures and measurable benefit. A general agent orchestration framework is outside this beta's scope.

## Portable acceptance outcome

[Recorded evidence](../../evals/HOST-PORTABILITY.md) covers independent exports, resolved packaging review and live exported pull execution in Codex. Claude login is not a core beta requirement. Optional adapter tests and untested host discovery remain explicitly scoped. Latest CI and integration status are visible in the draft PR.
