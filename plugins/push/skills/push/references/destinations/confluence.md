# Confluence destination

Confluence is Walnut's first destination adapter.

## Target resolution

For backward compatibility, first look for:

`.claude/push-target.local.json`

If it contains a valid `cloudId` and `pageId`, reuse that target silently.

If no target exists:
- use an explicitly supplied Confluence page URL/ID when provided;
- otherwise ask which page Walnut should maintain;
- resolve and verify the page;
- store the target locally for future runs.

Never retarget from a link merely mentioned in conversation. Retarget only on explicit instruction.

The local state file may also store:
- context-file offer status;
- source fingerprints/checkpoint metadata;
- mirror mappings;
- internal identity mappings.

It is private state and must not be committed.

## Capabilities

Before doing expensive extraction on a new setup, confirm that the host environment can read and update Confluence.

If required Confluence capabilities are unavailable, stop before publication work and explain the concrete missing connection.

## Main page

Maintain the synthesized project record on the configured page.

Use the category order and identity rules from the knowledge model.

## Child pages

Use child pages for eligible project-file mirrors and for categories that become too large to remain readable on the main page.

Reuse existing child pages when their mapping is known.

Do not recreate a child page solely because the plugin version changed.

## Links

Prefer real Confluence links/anchors for cross-references when supported.

Broken external links should not be presented as healthy resources.
