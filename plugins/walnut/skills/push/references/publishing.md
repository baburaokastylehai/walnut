# Publishing

Publishing applies semantic changes to the configured destination.

## General rules

- write only what the reconciliation diff requires;
- leave unchanged content untouched;
- preserve historical knowledge;
- use complete, self-contained records;
- keep neutral record voice;
- never fabricate content to fill a category.

## Concurrency

Immediately before writing, compare the destination revision/version with the revision used for reconciliation.

If it changed:
1. refetch;
2. reconcile again;
3. retry once.

If it changes again, stop rather than overwrite unknown work.

## Verification

After a successful write:
1. read the destination again;
2. verify that expected additions/refinements/supersessions/resolutions are present;
3. verify that unrelated content was not removed.

Do not call a run successful before this verification step.

## No-op

First recover persisted pending publication events using the shared ledger contract. An already-current child does not imply its missing ledger event was saved.

If reconciliation produces no semantic change, no eligible mirror update, and no recoverable pending publication event:
- do not write;
- report briefly that nothing new stuck.

## Reporting

Lead with what changed.

Do not enumerate every excluded candidate.

Use Walnut voice for the report; use neutral record voice inside the durable project documentation.
