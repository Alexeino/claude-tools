# Project Instructions for Claude

This project uses Claude Code with the following subagents configured under `.claude/agents/`:

- **code-reviewer** — reviews code changes for quality, maintainability, and correctness.
- **security-reviewer** — reviews code changes for security vulnerabilities and threat exposure only. Not a substitute for the code-reviewer.

## Working conventions

- Prefer running `code-reviewer` on any non-trivial diff before it's considered done.
- Always run `security-reviewer` on changes touching: authentication, authorization, input parsing, file I/O, network calls, deserialization, environment/secrets handling, or dependency changes.
- Do not merge findings from `security-reviewer` into general code review comments — keep security findings scoped and separately actionable.
