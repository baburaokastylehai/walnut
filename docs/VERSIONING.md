# Walnut — versioning and releases

Walnut uses Semantic Versioning.

```text
MAJOR.MINOR.PATCH
```

For the current pre-1.0 phase:

- PATCH — fixes or documentation changes that do not intentionally change Walnut's semantic behavior;
- MINOR — intentional behavior, architecture, or capability changes;
- MAJOR — reserved for a future stable contract where compatibility guarantees are meaningful.

## Baseline

The repository state before the v0.2 work began is preserved at:

```text
archive/v0.1.0
```

It points to commit:

```text
bc4546bc79d93d5c7b65ea9246d2cdd20256349c
```

This branch should not receive new commits.

A Git tag/release named `v0.1.0` should point to the same commit when repository settings are configured through a Git client or GitHub interface that supports tag creation.

## Development flow

```text
main
  ↑
pull request
  ↑
version branch / feature branch
```

The v0.2 design and implementation lives on:

```text
v0.2
```

Do not develop v0.2 directly on `main`.

## Change discipline

Separate these change types whenever practical:

1. refactor — reorganizes policy without intentionally changing behavior;
2. behavior — intentionally changes Walnut semantics;
3. eval — adds or updates expected behavior cases;
4. docs/brand — changes explanation or voice;
5. repo — CI, ownership, release, or repository configuration.

This makes regressions easier to diagnose.

## Release checklist

Before a release:

1. relevant eval fixtures pass;
2. manifests validate;
3. README describes actual behavior;
4. changelog is updated;
5. version metadata is updated;
6. no private local state is tracked;
7. destination prerequisites are documented;
8. the release commit is tagged;
9. the release is created from the tag.

## Main protection target

When branch protection is enabled, `main` should require:

- changes through pull requests;
- CODEOWNER review where appropriate;
- required CI/eval checks;
- branch up to date before merge when practical;
- no force pushes;
- no branch deletion.

CODEOWNERS alone does not enforce review.

## Rollback

A release must always be reproducible from its tag.

Do not rely on a mutable branch name as the only historical reference.

For v0.1.0, `archive/v0.1.0` is the immediate safety copy until the corresponding Git tag is created.
