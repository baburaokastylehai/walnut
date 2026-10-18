# Nightjar: a fictional project, end to end

Nightjar is invented for this walkthrough. These files contain no real project content. They show expected skill behavior; they do not perform a Confluence write.

## 1. Start with ordinary work

Read [the conversation](conversation.md). A person settles a slot limit and an availability requirement, leaves a real question open, and moves to another topic without adopting or explicitly rejecting the assistant’s reminder idea.

## 2. Push what stuck

Run `/walnut:push` with a disposable target page and those sources in a live host, or inspect the example output here:

> saved the slot limit, available-places requirement, and waiting-list question. [shared page]

The [first shared record](shared-brain-initial.md) contains D1, R1 and Q1, plus [three ledger events](ledger-initial.json). Automatic reminders are absent. The page’s overview gives enough context to read it without the chat.

## 3. First pull: join the project

A teammate says, “I’m testing this,” then runs `/walnut:pull`.

> Nightjar helps volunteers book places at a shared telescope. The prototype uses a calendar with six places per observing slot and shows what’s available before booking.
>
> For QA, the useful boundary is the last available place and a request beyond the slot’s limit. That’s a testing implication of the confirmed limit, not an assigned task. Full-slot waiting lists are still undecided.

This is onboarding, not “three new records.” After a complete read and briefing, Walnut saves a [local checkpoint](reader-after-first-pull.json) at sequence 3. A role inferred from the person’s work is marked tentative; this example checkpoint uses an explicit QA role.

## 4. Push a change, then pull again

The second part of the conversation changes capacity to eight and declines a waiting list for the pilot. Push produces the [current shared record](shared-brain-current.md) and [ledger through sequence 6](ledger-current.json). D1 remains historical; D2 replaces it and D3 resolves Q1.

> the pilot slot limit is now eight, up from six. for QA, that moves the capacity boundary. the waiting-list question is also settled: no waiting list in the pilot.

Pull coalesces the new decision and question-resolution events into one useful explanation. It still checks the current records so a manual page edit cannot disappear behind a tidy ledger.

## 5. Nothing else changed

A further pull with the updated checkpoint says:

> you’re caught up. nothing meaningful changed since your last pull.

No repeated overview and no new shared-page write.

## Check the sample ledger

From the repository root, with Node.js 22+:

```sh
node plugins/walnut/scripts/ledger.mjs examples/nightjar/ledger-current.json
node scripts/validate-repo.mjs
node --test
```

These are local structural checks. A real connector test must separately verify version checks, ledger round trips, partial-write recovery and read-only pull.
