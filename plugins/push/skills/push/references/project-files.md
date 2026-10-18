# Project files

Walnut should understand project documentation without forcing the project into a Walnut-owned file structure.

## Reading vs mirroring

Reading and mirroring are different decisions.

A file may be useful evidence even when it should not be published as a child page.

Classify files semantically when possible:
- project context document;
- working/scratch document;
- generated artifact;
- code/config;
- sensitive/private;
- unknown.

Readable project-context docs are candidates for ingestion.

Do not read obvious secrets such as .env files merely for context.

## Mirroring

Mirror selectively.

Usually mirror current, authoritative project-context documents that would be useful to someone entering the project cold.

Usually do not mirror:
- scratch notes;
- transient generated output;
- code/config files;
- secrets/private material;
- binary artifacts;
- files whose publication would create unnecessary exposure.

When uncertain about publication, do not mirror automatically.

A mirror failure must not prevent the local source from being used for reasoning.

Existing Walnut child mirrors are grandfathered. Reuse their mappings when possible; do not recreate them just because v0.2 is running.

## If meaningful context files are missing

When:
- the project has substantial confirmed knowledge;
- no useful project-context docs exist;
- Walnut has not already made the offer for this project;

ask once whether the person wants the current host AI to create project documentation from confirmed context.

Require explicit approval.

If approved:
- let the host AI choose a project-appropriate document structure;
- suggest common shapes such as glossary, decisions, requirements, architecture, or open questions only when useful;
- do not force a fixed corpus;
- create the files in a clearly named project location unless the person specifies otherwise;
- ingest them on the next source pass;
- mirror only those that qualify under the mirroring policy.

If declined:
- remember the answer;
- continue maintaining the durable destination normally;
- do not ask again unless the person explicitly revisits the choice.

The host AI owns creating rich project docs. Walnut owns understanding and preserving what becomes durable context.
