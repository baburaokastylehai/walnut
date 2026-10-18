# Evaluation

Every source and project example here is fictional. Fixtures describe semantic outcomes rather than exact assistant prose.

## Automated checks

With Node.js 22+:

```sh
node scripts/validate-repo.mjs
node --test
```

Repository validation checks packaging, runtime-reference containment, Markdown links, manifests, fixture shape, demo consistency, the architecture asset and private-identifier fingerprints. Export tests check independent skill containment, relocated helper execution, deterministic output and refusal to overwrite existing skills. The ledger tests execute the shipped ledger helper against contiguous, missing, archived, reset and invalid histories. An up-to-date ledger cursor still requires snapshot comparison for direct edits.

These checks do not run an AI or publish to Confluence. Valid JSON and passing helper tests do not establish correct semantic judgment.

## Behavioral cases

`fixtures/` covers confirmation, reversal, missing context docs and old-page migration. `pull-fixtures/` covers first onboarding, missing role, recurring updates and no change. `beta-scenarios.json` adds role inference, temporary lenses, incomplete profiles, target conflicts, manual edits, missing ledger coverage, read failures, retry recovery, partial mirror events and source instruction injection.

To evaluate a case, load the installed skill and its relevant references, provide only that case’s inputs in an isolated local workspace and use a fake/read-only destination. Capture the produced actions, response and before/after private state. Compare each expected semantic outcome and record deviations. Never let a fixture write a real project page. Use a disposable Confluence page only for the separate connector smoke test.

A reviewer should check whether the response shape fits the task, not whether it matches a preferred sentence. One no-change result should not turn into an onboarding document. A role implication should not become an assigned requirement.

## Independent review evidence

[Reviewer captures](reviews/2026-10-17/README.md) include fictional before/after state and action logs, plus a replay of selected recovery operations. Replaying those choices does not rerun an agent or establish connector behavior.

## Candidate validation record

See [the beta validation record](BETA-VALIDATION.md) for what has actually been checked and what remains. Live installation and Confluence checks must remain pending until executed in the host.
