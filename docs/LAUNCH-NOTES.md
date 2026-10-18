# Public-beta announcement draft

Draft for review. Publish only after the release gates in [beta readiness](BETA-READINESS.md) pass and the beta is available from `main`.

---

I've been building Walnut to keep the useful part of AI work from getting lost between conversations.

`/push` carries confirmed decisions, requirements and open questions into a shared Confluence project record. `/pull` gives someone the project story on their first visit, then meaningful changes since their last check, explained for their work.

The idea is simple: work naturally with your AI, keep what actually stuck, and give the next person enough context to understand it. An assistant suggestion should not quietly become a team decision.

Walnut is two skills for your AI host: push and pull. You can load them from the repository or export them for a native skill installer. A Claude Code plugin is also available. The host needs project access, private local state and a working Confluence connection. There is no separate Walnut service.

This is an early beta. Important updates need review. The host still interprets the sources and carries out the writes; interrupted updates and conflicting edits need care. The repository includes a fictional walkthrough, setup instructions and the validation evidence so you can see what has been checked.

If you try it, start with a disposable page. I'd like to know where it missed a decision, repeated something you already knew, or gave you the wrong level of detail.

[Repository](https://github.com/baburaokastylehai/walnut) · [Tester guide](BETA-TESTER-GUIDE.md) · [Fictional walkthrough](../examples/product-discovery/README.md)
