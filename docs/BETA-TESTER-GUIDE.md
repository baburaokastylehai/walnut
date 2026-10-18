# Try the Walnut beta

Use a disposable Confluence page and fictional content. This trial checks whether Walnut keeps a small project story straight, then catches you up without repeating it.

## Install the version you intend to test

You need a host that can read the complete skill and its references, access the conversation/project sources, use an authenticated Confluence connection, and persist private project state. Push needs version-aware updates and read-back; mirroring also needs child-page creation/update. See [setup](SETUP.md) for the capability contract and host-specific loading instructions.

Before merge, check out the candidate PR branch. Record its commit with `git rev-parse HEAD`. Keep the checkout intact and ask the host to read and execute `plugins/walnut/skills/push/SKILL.md` or `plugins/walnut/skills/pull/SKILL.md` with the required references. Alternatively, prepare native skill folders:

```sh
node scripts/export-skills.mjs /path/to/test-workspace/skills
```

Install the resulting `push/` and `pull/` folders through your host's skill mechanism; the directory must be fresh. Record whether you used direct instructions or native loading. Invocation names differ by host. `/push` and `/pull` below identify the actions, not a universal command registration.

The optional Claude plugin uses `claude --plugin-dir ./plugins/walnut` for a branch trial, or marketplace installation after merge. Neither requires every tester to use Claude. Public clones and marketplace installation default to `main`, so they do not test an unmerged PR. Authentication belongs to the host actually running the test.

Create a separate test workspace. Before saving state, add `.walnut/` and `.claude/push-target.local.json` to its Git ignore rules and confirm they are ignored. Keep test receipts and local state private. Each reader needs a separate workspace/profile.

## A product-discovery trial

Use the [fictional Fold source sessions](../examples/product-discovery/README.md) in a separate test workspace and the exact URL of a disposable page you control. Confirm its returned title before writing. Do not use a real project record.

1. **Preserve exploration without promoting it.** For the first phase, copy only `session-01.md`, `session-02.md` and `project-brief.md` from the demo's `sources/` into your test workspace. Do not expose later sessions or example expected outputs as source material. Run `/push`.

   Pass: Walnut retains the PM's direction, explicit approval requirement, unresolved access question, tentative comparison proposal and limited observation. Rationale for deferring a broader workspace survives. The hypothesis is not described as validated customer research. Unowned assistant suggestions do not become scope. Read-back verifies records and the shared ledger.

2. **Join without reading the chats.** In a separate reader workspace, say “I'm the designer joining this. What's the product, why this scope, and what is still open?” Run `/pull`.

   Pass: a coherent first briefing, with decisions separate from hypotheses and implications separate from assigned tasks. It saves a private baseline only after complete reads. A second new reader can ask through an engineering lens and receive the same project truth with a different emphasis. Neither pull writes shared data.

3. **Change the direction without losing why.** Add `session-03.md` and `pilot-scope-update.md` to the PM's source workspace, then run `/push`. Return to the designer's existing reader workspace and run `/pull`.

   Pass: the new stable-page direction supersedes separate version links while retaining the original trade-off; the requirement is refined; the access question resolves; comparison is deferred, not disproved or promised. The new old-approval question stays open. The recurring briefing leads with the change and its supplied reason, rather than starting over.

4. **Nothing changed.** Repeat each action with unchanged sources/page.

   Pass: push makes no shared write or duplicate event. Pull rereads and gives a short no-change response without repeating the overview. Its checkpoint advances only after a complete successful read.

5. **Direct page edit.** Manually add a clearly labeled, still-unresolved question about approval-request wording to the fictional shared record without adding a ledger event. Run `/pull`.

   Pass: snapshot comparison detects the new question despite no new event. It is described as open, not an adopted wording requirement. Pull makes no shared writes. A further successful pull gives the no-change result.

6. **Required read fails.** In a separate fictional trial, establish a reader baseline with a required linked child page. Make that child unreadable through a controlled test account or adapter while keeping the main page readable. Do not change permissions on real pages. Run `/pull`.

   Pass: the briefing is explicitly partial and the entire prior checkpoint remains unchanged. Restore disposable test access afterward. Record simulated failures as simulated; if the connection cannot reproduce a denial safely, record live coverage as untested.

## Record enough to review

Keep a private receipt with the candidate commit or installed version, host/version and loading method, test case, observed tool actions, page revisions before/after, reply, and local checkpoint comparison. A model saying “saved” is not evidence that a write persisted. Check the actual page and resulting ledger.

For a public [feedback issue](https://github.com/baburaokastylehai/walnut/issues/new/choose), share only fictional reproduction steps, expected versus observed behavior, and sanitized errors. Remove site/page identifiers, personal paths, private conversations, credentials and local state. Never attach raw connector logs without reviewing them.

## Current limits

Walnut runs as host-executed skills. The host performs its reads, writes and semantic judgment; the ledger helper does not enforce every publication rule. Confluence is the supported live destination. Cross-page updates are not transactional, and interrupted mirrors can require recovery. Long ledgers and connector formatting differences also need care.

Passing repository checks does not prove live behavior. Manual skill execution does not prove a host's native discovery, and optional Claude discovery does not prove authenticated invocation. See [current evidence](../evals/BETA-VALIDATION.md) and [limitations](LIMITATIONS.md) before using the beta on important work.
