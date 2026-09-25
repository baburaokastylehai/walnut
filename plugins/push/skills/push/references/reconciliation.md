# Reconciliation

Reconciliation decides what the durable record should do with confirmed candidates.

## Compare by substance

For each confirmed candidate, compare against the whole live destination, not only the matching section.

Possible semantic actions:

- add — genuinely new knowledge;
- refine — adds a condition/detail without reversing the existing record;
- supersede — later confirmed truth replaces earlier truth;
- resolve — closes an existing open question;
- no-op — same substance already exists;
- surface conflict — trustworthy current evidence disagrees and cannot be safely resolved.

Equivalent wording is a no-op.

## Reversal

A later human reversal supersedes an earlier confirmed statement.

Preserve the older record historically rather than deleting it.

## Conflict

Do not choose a winner merely because one container has a later modification timestamp.

Use:
- confirmation strength;
- authority of the source;
- claim-level recency;
- whether the later source actually changed the claim;
- explicit human reversal/adoption.

If still uncertain, surface the conflict as an Open Question or Architecture & Cross-Impact item, whichever best represents the project issue.

## Existing project migration

On the first v0.2 run against an existing Walnut target:

- preserve the main page;
- preserve existing D/R/Q IDs;
- preserve existing child-page mappings when recoverable;
- adopt existing records into internal state without rewriting them merely for migration;
- continue ID sequences;
- do not duplicate unchanged content;
- do not delete old child pages merely because the new mirroring policy would not create them today.

Migration is reconciliation, not reset.

## Deprecated

Move genuinely superseded durable content to Deprecated or otherwise mark it historical while preserving traceability.

Do not use Deprecated as a dumping ground for ordinary wording changes.
