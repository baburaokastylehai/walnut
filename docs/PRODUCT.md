# Walnut — product

## One line

your project gets messy. walnut keeps the part that matters.

## The problem

AI-assisted work does not stay tidy.

Chats wander. Ideas get proposed and abandoned. Decisions change. Files appear halfway through a project. The same topic may exist in a conversation, a Markdown file, a ticket, and a wiki page with different levels of freshness.

The working AI should be allowed to work naturally. Walnut's job is not to make the project behave like Walnut.

Walnut sits above that mess and keeps a durable project record straight.

## What Walnut does

Walnut:

1. listens across the project sources it can access;
2. discovers candidate project knowledge broadly;
3. separates confirmed project truth from brainstorming, assistant suggestions, noise, and stale context;
4. reconciles refinements, reversals, contradictions, and unresolved questions;
5. compares that knowledge with the current durable record;
6. publishes only what is genuinely new or changed;
7. preserves provenance so important context can be traced back to where it came from.

Confluence is the first destination, not the product boundary.

## Core product principles

### listen widely. publish carefully.

Discovery should be broad. Publication should be strict.

Walnut should try hard not to miss relevant context while scanning, then apply a much higher bar before anything becomes durable project truth.

### walnut understands project docs. it does not own them.

If useful project-context files already exist, Walnut uses them as they are.

If a project has enough settled context but no useful project-context files, Walnut may ask once whether the current host AI should create them. If the person agrees, the host AI creates documentation appropriate to that project. Walnut then discovers and uses those files like any other project source.

Walnut should not force a fixed file corpus when the project needs something different.

### compose. do not invent.

Walnut may synthesize wording from multiple confirmed facts when the synthesis introduces no new factual claim.

A useful project record cannot be limited to copying sentences verbatim. It still must remain source-grounded.

### durable truth does not decay.

Old does not mean irrelevant.

A six-month-old decision can remain authoritative until it is explicitly refined, superseded, withdrawn, or contradicted by stronger current evidence.

### uncertainty is a result.

When trustworthy sources genuinely disagree and Walnut cannot resolve the conflict, it should surface that conflict rather than choose one.

### the host AI owns the work. walnut owns what becomes durable context.

The working AI can brainstorm, create documents, edit code, run research, or change the shape of the project.

Walnut decides what from that activity belongs in the durable shared record.

## What Walnut is not

Walnut is not:

- a general-purpose note-taking system;
- a replacement for project files;
- an append-only chat summarizer;
- a memory system that stores every fact it encounters;
- a Confluence-only product;
- a requirement that all AI work follow one rigid documentation format.

## Context files

Context-file behavior is conditional.

If meaningful current context files exist:
- use them;
- determine which are authoritative;
- track changes to them;
- mirror eligible files when appropriate.

If they do not exist:
- continue working normally while project context is still thin;
- once enough confirmed context exists to justify durable project docs, ask once whether the host AI should create them;
- require an explicit yes;
- remember the answer for the project;
- if accepted, let the host AI create the most useful project-specific documentation;
- ingest the resulting files on the next source pass.

Declining this offer must not block Walnut. Walnut continues maintaining the configured durable destination.

## Source and destination independence

Walnut reasons in terms of sources and destinations.

Sources may eventually include:
- current AI conversation;
- project Markdown/text documentation;
- selected project files;
- other configured work systems.

Destinations may eventually include:
- Confluence;
- Notion;
- another wiki/document system;
- local Markdown.

A source may be useful for understanding without being mirrored.

A destination is where durable context is published; it is not automatically the authority for every project claim.

## Success

Walnut succeeds when someone or another AI can enter a project cold, read the durable context, and understand:

- what the project is;
- what is decided;
- what is required;
- what is still open;
- what changed;
- why important choices were made;
- which source material matters;
- where uncertainty still exists.

And when there is nothing new, Walnut should be comfortable doing nothing.
