# Walnut

**Keep what matters from AI work. Share it with your team.**

Chats wander. Files change. The next person still needs to know what was decided, why, and what moved since they last checked.

Walnut keeps that story straight. `/push` carries confirmed project context into a shared project brain. `/pull` catches someone up in the context of their work.

![Walnut architecture: project sources, reconciliation, a shared project brain, and role-aware briefings.](assets/walnut-architecture.png)

## Two commands. One project story.

**Push what stuck.** Work normally with your AI. When there is context worth keeping, run `/push`. Walnut checks the conversation, current project docs, and the existing shared record. It preserves decisions, human-owned proposals, research and open questions with their status intact, keeps the history, records a change ledger, and reads the result back. An assistant suggestion does not become a decision just because it sounds useful.

**Pull what matters.** Joining a project? `/pull` explains the problem, direction, status, and what matters for your role. Coming back? It shows meaningful changes since your last successful pull. Your role changes the emphasis; important project-wide changes stay visible.

Nothing changed? Walnut says so and stops.

> **Public beta · v0.3** — two skills for an AI host with project access, private local state and connected tools. Confluence is the supported shared destination. Walnut uses the host AI and its existing connection; there is no separate Walnut service.

## Try it

You need a host that can read the skill and its references, access your conversation and selected project files, save private local state, and use an authenticated Confluence connection. Push needs version-aware updates and read-back; pull-only readers need read access. Installing Walnut does not connect Confluence for you.

Clone this repository and keep its structure intact:

```sh
git clone https://github.com/baburaokastylehai/walnut.git
```

Ask your host to use `plugins/walnut/skills/push/SKILL.md` or `plugins/walnut/skills/pull/SKILL.md` from that checkout and follow the referenced files. The files are instructions for the host, not standalone programs. Give it the local checkout path so it can read the actual files.

If your host has a native skill installer, export two self-contained skill folders with Node.js 22+:

```sh
node scripts/export-skills.mjs ./walnut-export
```

Run that command from the cloned repository. Install the exported `push` and `pull` folders using your host's own instructions. Skill invocation and installation locations depend on the host; the `/push` and `/pull` names here describe Walnut's two actions. See [setup](docs/SETUP.md) for capability checks and the first trial. Host compatibility must be verified in that environment.

**Optional: Claude Code plugin installation**

Claude Code users can use its marketplace instead:

```text
/plugin marketplace add baburaokastylehai/walnut
/plugin install walnut@walnut
```

Claude Code namespaces plugin commands, so the two actions appear as:

```text
/walnut:push
/walnut:pull
```

See the [Claude Code plugin documentation](https://code.claude.com/docs/en/plugins) for that host's installation behavior. The diagram uses Claude as an example environment; Walnut's skill contracts do not require it.

On your first push, give Walnut the exact Confluence page URL. It verifies and remembers the target locally. On pull, describe your part in the project if it is not already clear. Useful existing context is enough; no role form or fixed document template is required.

To test a branch, check out that branch before loading or exporting the skills. Claude Code can also use `claude --plugin-dir ./plugins/walnut`. Marketplace installation follows `main`.

[Setup and migration](docs/SETUP.md) · [Fictional walkthrough](examples/product-discovery/README.md)

## From a long chat to a shared direction

A product manager is working through a new product with AI. Across several sessions, they explore who it is for, compare approaches, change their mind and leave questions open. The designer joining tomorrow needs the direction and its reasoning, without reading every conversation.

The [fictional product-discovery walkthrough](examples/product-discovery/README.md) follows that work:

```text
PM: Let's explore a tool for studios collecting client feedback.
    Keep this as a hypothesis, not a validated customer problem.
/push
→ keeps the working direction, hypothesis and open questions.

PM, new chat: Why did we park the client workspace idea?
/pull
→ recovers the saved trade-off; comparison is still a tentative idea.

Designer: I'm joining this project. What are we building, and why?
/pull
→ explains the product, current scope and unresolved design questions.

PM, later: Narrow the first version to getting a clear approval.
           Defer the annotation editor; here's why.
/push
→ updates the direction and keeps the earlier reasoning traceable.

Designer, after another PM session:
/pull
→ explains what changed and what it means for the design.
```

The walkthrough shows the source sessions, shared record, retained alternatives, excluded assistant suggestions and different briefings for a designer and engineer. It is a fictional illustration of expected behavior, not a transcript of a live test.

Walnut keeps a source-grounded trail of the work worth retaining. A hypothesis stays a hypothesis; considering an idea does not make it a decision. It does not archive every chat or recover history the host cannot access.

## What stays dependable

- **Your project’s language.** Walnut learns terms and actors from confirmed context.
- **History stays traceable.** Reversals supersede earlier decisions. Existing record IDs and child pages survive upgrades.
- **A shared change ledger.** Push records semantic changes; pull checks those events alongside current records, so manual page edits are still detected.
- **A personal checkpoint.** Pull remembers what one reader has seen locally. It never writes reader profiles into Confluence.
- **A restrained voice.** A small update gets a small response. Conflicts and partial writes are stated plainly.

## Know the limits

Walnut is a set of host-executed skills, not a background sync engine. It only sees sources the host can access. It does not monitor all your chats, authenticate services, enforce access permissions, or guarantee that a model will interpret every change correctly. Review important updates.

Confluence is the only live adapter today. The Markdown walkthrough is a reproducible example, not another supported destination. Long ledgers, connector formatting differences, incomplete reads, and concurrent edits need care; [limitations and recovery](docs/LIMITATIONS.md) explain the boundaries.

Project state lives under `.walnut/` and the legacy `.claude/push-target.local.json`. Add these to your project’s ignore rules before use. **This repository’s `.gitignore` does not protect another project automatically.** Use separate local profiles or checkouts for different people.

## Build with us

[Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Architecture](docs/ARCHITECTURE.md) · [Release and rollback](docs/VERSIONING.md) · [Beta readiness](docs/BETA-READINESS.md)

Run `node scripts/validate-repo.mjs` and `node --test` with Node.js 22 or later. These check the package, shared ledger helper and fixtures; they do not prove a live Confluence run. See [evaluation](evals/README.md).

MIT licensed. Built by [Atharva Shembekar](https://github.com/baburaokastylehai).
