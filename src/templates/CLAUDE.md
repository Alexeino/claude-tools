# Project Instructions for Claude

This project uses Claude Code with the following subagents configured under `.claude/agents/`:

- **code-reviewer** — reviews code changes for quality, maintainability, and correctness across the whole project/file set in scope.
- **branch-code-reviewer** — same review criteria as code-reviewer, but scoped to the diff between the current branch and a base branch (default `main`) instead of the whole project. Use before opening a PR.
- **security-reviewer** — reviews code changes for security vulnerabilities and threat exposure only. Not a substitute for the code-reviewer.
- **branch-security-reviewer** — same vulnerability classes as security-reviewer, but scoped to the diff between the current branch and a base branch (default `main`) instead of the whole project. Use before opening a PR.

## Working conventions

- Prefer running `code-reviewer` (or `branch-code-reviewer` when reviewing a PR-sized branch diff) on any non-trivial diff before it's considered done.
- Always run `security-reviewer` (or `branch-security-reviewer` for a branch diff) on changes touching: authentication, authorization, input parsing, file I/O, network calls, deserialization, environment/secrets handling, or dependency changes.
- Do not merge findings from security-reviewer agents into general code review comments — keep security findings scoped and separately actionable.
