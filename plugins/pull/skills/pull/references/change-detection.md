# Pull change detection

Recurring pull is semantic delta detection.

## Checkpoint model

The local pull state should retain enough information from the last successful pull to distinguish semantic change from page churn.

Prefer:
- destination revision/version;
- durable record stable ID;
- semantic fingerprint of each active durable record;
- status/lifecycle fingerprint;
- child-page ID + version/fingerprint;
- prior project-overview fingerprint.

Do not rely only on destination page version. A page version can change because of formatting or unrelated edits.

## Compare

For each durable record:

### New
ID or semantic record did not exist in the person's prior checkpoint.

### Refined
Same underlying item, meaningfully more specific or newly constrained.

### Superseded/reversed
Previously current truth is now historical or replaced.

### Resolved
An Open Question is now answered/closed.

### Reopened/newly open
A new unresolved project question exists or a previously settled area has been reopened.

### No-op
Same substance, even if wording or placement changed.

## Project-wide changes

Also detect:
- Project Overview/phase change;
- major proposal-state change;
- architecture/cross-impact change;
- new/changed project context document that materially changes understanding.

## First pull

When no prior checkpoint exists, do not pretend everything is "new."

Treat the current state as baseline and give onboarding.

## Missing prior detail

If an old checkpoint is incomplete, prefer a fuller reconciliation rather than falsely declaring a precise delta.

Say when the delta is approximate if needed.
