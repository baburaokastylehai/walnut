# Beta limits and recovery

Walnut is a set of host-executed skills and shared policy references. The model interprets evidence and drives connected tools. There is no hosted service, background watcher, automatic chat archive, bundled Confluence authentication or standalone semantic engine.

Only the current readable conversation, selected project docs, configured sources and destination can inform a run. Truncated conversation history can hide an earlier confirmation or reversal. If the missing evidence affects a claim, exclude it or ask for the relevant source.

Confluence is the live adapter. Connector capabilities and storage-format conversion vary. The JSON ledger must survive a round trip. Push checks the destination revision and retries reconciliation once; it cannot make a main-page write and a child-page write transactional. Partial writes need explicit reporting and pending-event recovery.

The shared ledger is append-only in this beta, without automatic compaction. It can grow large. An operator may archive a prefix according to the ledger contract; old reader cursors then fall back to snapshot comparison. A ledger is a change index, not proof that every manual edit was recorded.

Snapshots and fingerprints help compare records but do not prove semantic equivalence. Text changes can be harmless, while a one-word reversal can matter. Important interpretations need review. A missing or corrupt checkpoint may require a broader briefing; exact past awareness cannot be reconstructed from nothing.

Private state is local to one reader/workspace. It is not encrypted by Walnut, shared across machines, or protected by its role lens. Confluence and host permissions determine access. Add ignore rules in each consuming project and use separate profiles/checkouts for different people.

Rollback restores code independently from shared data. Older plugin versions do not understand every v0.3 ledger field. Preserve page revisions and private state backups; do not overwrite newer shared records just because a plugin was rolled back.

Repository checks and helper tests run without a model or Confluence. Behavioral fixture review is separate from live connector validation. A public-beta PR is not evidence of a successful live round trip.
