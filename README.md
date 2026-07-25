# agentforge

A CLI to scaffold Claude Code subagents into any project — install pre-built agents like `code-reviewer` and `security-reviewer` with a single command, ready to use with Claude Code or the Claude VSCode extension.

## Install

**Global install:**

```bash
npm install -g agentforge
forge init
```

**Or run without installing, via npx:**

```bash
npx agentforge init
```

## What `forge init` does

Running `forge init` in your project root sets up:

These are picked up automatically by Claude Code and the Claude VSCode extension — no extra configuration needed.

### Included agents

- **`code-reviewer`** — correctness, maintainability, readability, test coverage, and project convention adherence. Reviews the whole project/file set in scope. Does not review for security issues.
- **`branch-code-reviewer`** — same quality/correctness/maintainability criteria as `code-reviewer`, but scoped strictly to the diff between the current branch and a base branch (default `main`) via `git diff <base>...HEAD`, rather than the whole project. Ask it to "review the diff against `<base>`" to target a different base branch. Use proactively before opening a PR.
- **`security-reviewer`** — injection, auth/authz flaws, secrets exposure, insecure deserialization, SSRF, path traversal, dependency CVEs, and related threat classes. Scoped strictly to security — does not comment on style or functional bugs.
- **`branch-security-reviewer`** — same vulnerability classes as `security-reviewer`, but scoped strictly to the diff between the current branch and a base branch (default `main`) via `git diff <base>...HEAD`, rather than the whole project. Ask it to "review the diff against `<base>`" to target a different base branch. Use proactively before opening a PR touching auth, input handling, file I/O, network calls, deserialization, secrets, or dependencies.

Each agent stays in its lane by design: security findings and quality findings are kept separate rather than merged, so you get focused, actionable reports from each.

### Re-running `forge init`

Safe to run again anytime — by default, existing files are **not** overwritten, so any customizations you've made are preserved:

```bash
forge init
```

To force-overwrite with the latest default templates:

```bash
forge init --force
```

## Customizing agents

Every installed file is a normal Claude Code subagent — plain markdown with YAML frontmatter. Edit `.claude/agents/*.md` directly to change tool access, scope, or instructions for your project's needs:

```markdown
---
name: security-reviewer
description: ...
tools: Read, Grep, Glob, Bash
model: sonnet
---

Your custom instructions here.
```

Since `forge init` won't overwrite existing files by default, your edits are safe across future runs (unless you explicitly pass `--force`).

## License

ISC