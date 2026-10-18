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

## A small trial

Give Walnut the exact URL of a disposable page you control. Confirm its returned title before writing. Start with an empty page; do not use a real project record.

1. **First push.** Tell the host: “Nightjar is a telescope-booking prototype for volunteers. We're preparing a small pilot. We've decided each slot has six places, and the calendar must show remaining places before booking. Should full slots offer a waiting list? That is still open.” Add an unconfirmed suggestion: “An assistant suggested automatic reminders; we have not decided to add them.” Run `/push`.

   Pass: the shared page records the limit, visibility requirement and open question, with a readable change ledger. Reminders do not become a requirement. Read-back confirms the saved content; the reply describes only what completed.

2. **First pull.** In the same workspace, say “I'm testing the booking flow. Catch me up.” Run `/pull`.

   Pass: Walnut explains the project and its current state, uses a tentative QA lens without asking for a role again, and labels testing implications as implications. It saves a local baseline after reading successfully. Pull makes no shared writes. A saved role without a successful baseline must still receive this first-use briefing.

3. **Recurring update.** Say “We've decided the pilot will use eight places per slot. There will be no waiting list in the pilot, to keep the flow small.” Run `/push`, then `/pull`.

   Pass: the six-place decision remains historical, the current limit is eight, and the waiting-list question is resolved. The pull leads with those changes rather than onboarding again. The ledger preserves earlier events and adds the new semantic changes.

4. **Nothing changed.** Run each action again without changing the sources or page.

   Pass: push does not update Confluence or add duplicate events. Pull reads successfully and gives a short no-change result. It does not repeat the overview. A successfully covered local checkpoint may advance.

5. **Direct page edit.** In Confluence, edit the fictional remaining-places requirement to say it must also show the slot's local start time. Leave the change ledger untouched. Run `/pull`.

   Pass: snapshot comparison detects the changed requirement despite no new event. The briefing explains the change without claiming a ledger event exists. Pull makes no shared writes. Run pull again after the successful baseline: it gives the short no-change result.

6. **Required read fails.** Use a separate fictional trial with a linked child page whose content is required for the briefing. Establish a successful reader baseline, then change the child and make that child unreadable to the test connection while keeping the main page readable. Use a separate account or controlled test adapter if necessary; do not change permissions on real pages. Run `/pull`.

   Pass: Walnut explains that the briefing is partial, makes no shared writes, and leaves the prior reader checkpoint unchanged. Compare the private state before and after. Restore test access afterward. If your connection cannot safely reproduce the failure, record this case as untested; a simulated denial must be labeled simulated.

## Record enough to review

Keep a private receipt with the candidate commit or installed version, host/version and loading method, test case, observed tool actions, page revisions before/after, reply, and local checkpoint comparison. A model saying “saved” is not evidence that a write persisted. Check the actual page and resulting ledger.

For a public [feedback issue](https://github.com/baburaokastylehai/walnut/issues/new/choose), share only fictional reproduction steps, expected versus observed behavior, and sanitized errors. Remove site/page identifiers, personal paths, private conversations, credentials and local state. Never attach raw connector logs without reviewing them.

## Current limits

Walnut runs as host-executed skills. The host performs its reads, writes and semantic judgment; the ledger helper does not enforce every publication rule. Confluence is the supported live destination. Cross-page updates are not transactional, and interrupted mirrors can require recovery. Long ledgers and connector formatting differences also need care.

Passing repository checks does not prove live behavior. Manual skill execution does not prove a host's native discovery, and optional Claude discovery does not prove authenticated invocation. See [current evidence](../evals/BETA-VALIDATION.md) and [limitations](LIMITATIONS.md) before using the beta on important work.
