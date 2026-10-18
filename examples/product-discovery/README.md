# Fold: from messy product exploration to shared understanding

Entirely fictional, illustrative expected outputs. These files are a walkthrough of Walnut's contracts, not evidence of actual model execution or live Confluence publication. No private project material or real customer research appears here. All scenario dates are 2026-10-18.

A PM is exploring Fold: should a small design studio need a whole client workspace, or just a clearer way to get a design approved? The AI helps explore directions across several work sessions. A designer joins midway; an engineer joins after the direction changes. Neither should have to read every chat or mistake a rejected idea for current scope.

## Before: context spread across the work

| Source | What happened |
|---|---|
| [Session 01](sources/session-01.md) | The PM explores feedback versus sign-off, chooses an initial review-link direction, defers the bigger workspace, owns a tentative comparison proposal and leaves access unresolved. |
| [Session 02](sources/session-02.md) | A scripted observation motivates explicit approval. The PM approves the [initial brief](sources/project-brief.md) and explicitly authorizes saving adopted rationale. |
| [Session 03](sources/session-03.md) | The PM changes the return path, narrows scope, settles access and defers comparison. An approved [scope update](sources/pilot-scope-update.md) states what changes and what remains open. |

The sources contain different kinds of information: adopted decisions, a human-owned hypothesis, an observation with narrow evidence, open questions, and unadopted assistant suggestions. Walnut must preserve those distinctions.

## First push: a shared project story

After session 02, run `/push` using the initial sources and a disposable target. Here `/push` and `/pull` name the actions; use your host's invocation or manual skill-loading mechanism.

For a reproducible first phase, expose only sessions 01–02 and the initial brief to the host; keep session 03 and the scope update outside its source workspace until the second push. See the [tester guide](../../docs/BETA-TESTER-GUIDE.md) for a separate live trial.

Expected reply:

> saved the initial review direction, explicit approval requirement, access question, and your tentative comparison proposal with its rationale. the scripted observation stays labeled as an exercise. [shared page]

The [initial shared brain](shared-brain-initial.md) explains what Fold is and why the pilot is small. It keeps the broader workspace alternative and the PM's reason for deferring it. It also keeps P1 tentative and F1 explicitly limited to a scripted roleplay. It does not turn those into customer findings.

The PM opted in to retaining adopted exploration rationale. That does not authorize a full conversation archive. The AI's automatic-approval suggestion was never adopted and is absent from the shared record. Walnut also leaves button wording, implementation details and unsupported market claims out.

## The PM starts another chat

“We explored a client workspace earlier. Why did we park it, and did comparison make the pilot?” → `/pull`

The new host session can read the shared record through its authenticated connection; it does not need every original chat. The [targeted PM briefing](pull-pm-new-session.md) recovers the workspace trade-off and keeps comparison tentative rather than quietly turning it into scope. Access is still unresolved at this stage.

This example uses a fresh reader workspace with no successful checkpoint, so it is a first pull tailored to the question, not a claim about what changed. Walnut does not automatically reach into old chats. The earlier `/push` made the adopted context available in the shared record; the new host still needs the page connection and private local-state capability to read it and save a baseline.

## A designer joins

“I'm the designer joining Fold. Catch me up.” → `/pull`

The [first designer briefing](pull-designer-first.md) gives the problem hypothesis, current direction, why the larger workspace was deferred, and the access question. It explains what matters for the flow without assigning design work or presenting comparison as a requirement.

After complete reading and briefing, the fictional [designer checkpoint](reader-after-first-pull.json) records the initial baseline locally. It is demonstrative fictional state, not a file to install into your real project. An engineer uses a separate reader profile.

## Work changes, without losing why

After session 03, `/push` produces the [current shared brain](shared-brain-current.md). The stable deliverable page replaces separate version links. Annotation tooling is deferred so the pilot can test explicit sign-off without expanding into a feedback editor. Email verification resolves the access question; comparison leaves active pilot consideration without being called disproved.

The earlier choice and its rationale remain historical. A new question about earlier approvals after another upload stays open instead of quietly acquiring an invented answer.

The returning designer's [recurring pull](pull-designer-recurring.md) leads with what changed and what it means for the flow. It does not repeat the whole introduction. A newly joining engineer gets [a first briefing from the current state](pull-engineer-first.md), including the unresolved version/approval edge and the limits of the technical decisions.

Once the designer has successfully read that state, another `/pull` gives [a short no-change result](pull-no-change.md). Pull makes no shared writes.

## After: one useful record, different entry points

The PM's reasoning survives the chats. The designer can distinguish current scope from deferred ideas. The engineer sees the version/approval edge before assuming a policy. Everyone reads the same project truth; their briefings change emphasis and first-versus-returning context.

The ledger supports this continuity, but it is not the product story. The [initial ledger](ledger-initial.json) ends at sequence 5; the [current ledger](ledger-current.json) retains that exact prefix and ends at sequence 11. Both are also embedded in their shared-brain pages. They record changes to adopted knowledge, not every turn of conversation. Pull also compares current records so a direct edit cannot hide behind an unchanged ledger.

From the repository root, with Node.js 22+:

```sh
node plugins/walnut/scripts/ledger.mjs examples/product-discovery/ledger-initial.json
node plugins/walnut/scripts/ledger.mjs examples/product-discovery/ledger-current.json
```

Those commands validate ledger structure. They do not prove semantic judgment, host compatibility or a live write. Use the [tester guide](../../docs/BETA-TESTER-GUIDE.md) for a separate trial with fictional inputs.
