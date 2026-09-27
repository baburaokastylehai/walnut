# Walnut pull

`push` keeps the project brain current.

`pull` helps the team use it.

## The job

A PM may spend days in Claude working through a feature: exploring options, settling decisions, refining requirements, and updating Walnut's shared project context.

Engineering, QA, design, technical writing, and other PMs should not have to read that chat or reverse-engineer a Confluence page to understand what happened.

They should be able to type:

```text
/pull
```

and get the project context they need.

## First pull

The first time a person pulls a project, Walnut asks what they are working on it as.

Then it gives them:
- the problem;
- the current/proposed solution;
- where the project stands;
- the context most relevant to their role;
- important unresolved questions/dependencies.

This is onboarding from the current project truth.

## Later pulls

Later `/pull` runs answer:

> what changed since I last checked, and what does that mean for me?

Role-relevant changes come first.

Important project-wide changes still appear for visibility even when they do not directly affect that person's work.

If nothing meaningful changed, Walnut says so and stops.

## One brain, many views

The shared project context does not change by role.

A designer, developer, QA engineer, technical writer, and PM all read from the same project truth.

Walnut changes:
- emphasis;
- explanation depth;
- implications highlighted.

It does not create separate truths.

## Arena first

The first version is intentionally useful for Arena product development.

Use Arena terms when they make the project easier for Arena teams to understand.

The underlying model can become more generic later without flattening the first useful experience.
