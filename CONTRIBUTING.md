# Contributing

Small, well-grounded changes are welcome. Open an issue for a behavior change with a fictional example: what happened, what should have happened, and why it matters. Leave employer material, real project records, credentials and local profiles out of reports and fixtures.

Clone the repository and work on a new branch. Node.js 22+ is sufficient for the checks; there are no npm dependencies to install.

```sh
node scripts/validate-repo.mjs
node --test
```

For skill changes, add a semantic fixture that would expose the failure. Preserve confirmation boundaries, stable IDs, shared history, read-only pull and failed-read checkpoint behavior. A wording test is not a substitute for checking the decision the skill makes.

The shipped plugin is `plugins/walnut/`. Shared references must stay inside that directory because hosts cache it independently of this repository. Keep voice guidance shared between both skills.

A PR should explain the problem, resulting behavior and validation limits. Do not claim a live connector test unless you ran it. Before publishing, inspect the diff for private data and use only fictional examples. Report security concerns through [SECURITY.md](SECURITY.md).

Contributions are under the repository’s MIT license.
