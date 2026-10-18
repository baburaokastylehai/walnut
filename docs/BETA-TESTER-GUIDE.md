# Try the Walnut beta

Use a disposable Confluence page and fictional content. This trial checks whether Walnut keeps a small project story straight, then catches you up without repeating it.

## Install the version you intend to test

You need Claude Code with plugin support, its own authenticated Confluence connection, and a local workspace for private state. The connection must support page reads, version-aware updates and read-back. Child-page mirroring also needs create/update access. A connection in another AI app does not automatically connect Claude Code.

Before merge, check out the candidate PR branch and run from the checkout:

```sh
claude --plugin-dir ./plugins/walnut
```

Record the commit with `git rev-parse HEAD`. Confirm `/walnut:push` and `/walnut:pull` are available. This local package test must pass before calling installation verified.

After the beta reaches `main`, test marketplace installation in a fresh host session:

```text
/plugin marketplace add baburaokastylehai/walnut
/plugin install walnut@walnut
```

Follow the host's activation instructions. Record the installed plugin version. Marketplace installation follows `main`; it does not test an unmerged PR. See [setup](SETUP.md) for upgrades and target recovery.

Create a separate test workspace. Before saving state, add `.walnut/` and `.claude/push-target.local.json` to its Git ignore rules and confirm they are ignored. Keep test receipts and local state private. Each reader needs a separate workspace/profile.

## A small trial

Give Walnut the exact URL of a disposable page you control. Confirm its returned title before writing. Start with an empty page; do not use a real project record.

1. **First push.** Tell the host: “Nightjar is a telescope-booking prototype for volunteers. We're preparing a small pilot. We've decided each slot has six places, and the calendar must show remaining places before booking. Should full slots offer a waiting list? That is still open.” Add an unconfirmed suggestion: “An assistant suggested automatic reminders; we have not decided to add them.” Run `/walnut:push`.

   Pass: the shared page records the limit, visibility requirement and open question, with a readable change ledger. Reminders do not become a requirement. Read-back confirms the saved content; the reply describes only what completed.

2. **First pull.** In the same workspace, say “I'm testing the booking flow. Catch me up.” Run `/walnut:pull`.

   Pass: Walnut explains the project and its current state, uses a tentative QA lens without asking for a role again, and labels testing implications as implications. It saves a local baseline after reading successfully. Pull makes no shared writes. A saved role without a successful baseline must still receive this first-use briefing.

3. **Recurring update.** Say “We've decided the pilot will use eight places per slot. There will be no waiting list in the pilot, to keep the flow small.” Run `/walnut:push`, then `/walnut:pull`.

   Pass: the six-place decision remains historical, the current limit is eight, and the waiting-list question is resolved. The pull leads with those changes rather than onboarding again. The ledger preserves earlier events and adds the new semantic changes.

4. **Nothing changed.** Run each action again without changing the sources or page.

   Pass: push does not update Confluence or add duplicate events. Pull reads successfully and gives a short no-change result. It does not repeat the overview. A successfully covered local checkpoint may advance.

5. **Direct page edit.** In Confluence, edit the fictional remaining-places requirement to say it must also show the slot's local start time. Leave the change ledger untouched. Run `/walnut:pull`.

   Pass: snapshot comparison detects the changed requirement despite no new event. The briefing explains the change without claiming a ledger event exists. Pull makes no shared writes. Run pull again after the successful baseline: it gives the short no-change result.

6. **Required read fails.** Use a separate fictional trial with a linked child page whose content is required for the briefing. Establish a successful reader baseline, then change the child and make that child unreadable to the test connection while keeping the main page readable. Use a separate account or controlled test adapter if necessary; do not change permissions on real pages. Run `/walnut:pull`.

   Pass: Walnut explains that the briefing is partial, makes no shared writes, and leaves the prior reader checkpoint unchanged. Compare the private state before and after. Restore test access afterward. If your connection cannot safely reproduce the failure, record this case as untested; a simulated denial must be labeled simulated.

## Record enough to review

Keep a private receipt with the candidate commit or installed version, Claude Code version, test case, observed tool actions, page revisions before/after, reply, and local checkpoint comparison. A model saying “saved” is not evidence that a write persisted. Check the actual page and resulting ledger.

For a public [feedback issue](https://github.com/baburaokastylehai/walnut/issues/new/choose), share only fictional reproduction steps, expected versus observed behavior, and sanitized errors. Remove site/page identifiers, personal paths, private conversations, credentials and local state. Never attach raw connector logs without reviewing them.

## Current limits

Walnut is an instruction-driven plugin. The host performs its reads, writes and semantic judgment; the ledger helper does not enforce every publication rule. Confluence is the supported live destination. Cross-page updates are not transactional, and interrupted mirrors can require recovery. Long ledgers and connector formatting differences also need care.

Passing repository checks or a Codex connector trial does not prove Claude Code package loading or invocation. See [current evidence](../evals/BETA-VALIDATION.md) and [limitations](LIMITATIONS.md) before using the beta on important work.
