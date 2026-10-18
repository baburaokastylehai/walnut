# Walnut evals

Walnut's hardest failures are semantic, so examples are part of the product contract.

The eval suite should answer one question:

> given these sources and this existing durable record, what semantic actions should Walnut take?

## Fixture shape

Each scenario lives in its own directory.

```text
evals/
  fixtures/
    <scenario>/
      conversation.md
      existing-page.md
      project-files/
      expected.json
```

Not every scenario needs project files.

## Expected actions

`expected.json` records semantic outcomes rather than exact prose whenever possible.

Supported action vocabulary:

- `add`
- `refine`
- `supersede`
- `resolve`
- `exclude`
- `surface_conflict`
- `mirror`
- `do_not_mirror`
- `offer_context_files`
- `do_not_offer_context_files`
- `no_op`

Exact rendered text can be tested separately when wording itself matters.

## Why semantic expectations

Walnut should be free to improve phrasing without turning every copy edit into an eval failure.

The thing that must stay stable is judgment.

## Baseline first

Before refactoring `SKILL.md`, capture important v0.1 behaviors as fixtures.

Then, when v0.2 intentionally changes a behavior, update the relevant fixture with a clear reason.

This lets us distinguish:

- accidental regression;
- deliberate product change;
- harmless wording change.

## Initial scenario set

The first suite should cover:

- explicit human decision;
- assistant proposal ignored;
- assistant proposal accepted by the human;
- partial acceptance;
- explicit rejection;
- human reversal;
- proposal becomes decision;
- unresolved human question;
- rhetorical question;
- conflicting human participants;
- third-party pasted source;
- same substance, different wording;
- refinement without contradiction;
- old file vs newer confirmed chat;
- newer file modification with no claim change;
- no-change run;
- file exists and should be used as context;
- file exists but should not be mirrored;
- missing project context files with substantial confirmed content;
- context-file offer previously declined;
- mirror failure while source remains usable;
- concurrent destination edit;
- project overview synthesized from confirmed facts.

## Evaluation layers

### Layer 1 — deterministic repository checks

JSON validity, fixture shape, file presence, and other structural checks.

### Layer 2 — semantic fixture evaluation

Run the skill/agent against controlled inputs and compare semantic actions.

### Layer 3 — regression review

For cases where several valid phrasings are possible, retain the generated output for human review rather than forcing brittle string equality.

## Quality principle

Discovery should optimize for recall.

Publication should optimize for precision.

The eval suite needs cases for both.
