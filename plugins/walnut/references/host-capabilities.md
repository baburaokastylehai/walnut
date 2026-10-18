# Running Walnut in a host

Walnut's push and pull are portable instructions. Use the current host's skill loader or read the requested `SKILL.md` and its references directly. Resolve instruction references relative to the file containing them, not the user's working directory. Command spelling and tool names belong to the host; no particular model, app, plugin manager or MCP server is required.

Before acting, establish which capabilities this run actually has:

- Read the skill and its referenced files. A partial pasted entrypoint without its references is not the complete skill.
- Read the current conversation or explicitly supplied source material and relevant project files. Do not assume access to other chats or unseen history.
- Read the exact selected shared destination using an authenticated connection available in this host. Confluence is the supported adapter today.
- For push, update with a revision/version precondition and read back the result. Mirroring also needs child-page creation/update. Map these requirements to the available tools; do not invent an unsupported tool name or silently drop a revision guard.
- Persist private `.walnut/` state in the user's project workspace, separately from the installed skills. Apply the local-state contract before saving. A remote host can use a persistent private workspace with equivalent isolation; a transient chat without durable private state cannot provide recurring checkpoints.

If a capability is absent, explain what it prevents. Do not claim publication, a complete briefing or a saved checkpoint that did not happen. A host with read-only access may pull; it cannot push. Installation does not transfer authentication from another app. Node.js is optional for normal instruction execution and needed only for the exporter, repository checks or ledger helper.

Shared page truth and ledger semantics travel between hosts. Personal checkpoints do not travel automatically. Explicitly transferring a private reader workspace may preserve continuity; verify the same reader and target before reusing it. Otherwise establish a first-use baseline.
