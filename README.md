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

- **`code-reviewer`** — correctness, maintainability, readability, test coverage, and project convention adherence. Does not review for security issues.
- **`security-reviewer`** — injection, auth/authz flaws, secrets exposure, insecure deserialization, SSRF, path traversal, dependency CVEs, and related threat classes. Scoped strictly to security — does not comment on style or functional bugs.

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