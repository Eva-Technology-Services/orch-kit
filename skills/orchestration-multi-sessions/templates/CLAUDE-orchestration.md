<!-- Section to paste into the project's CLAUDE.md. Replace the <…>. -->

## Orchestration

This project uses the `orchestration-multi-sessions` skill.

- ORCH: coordination session (splits the work into prompts, reads the returns, merges, keeps the tracker).
  PO: <name or role>, who makes the decisions.
- Tracker: <artifact URL> ("Tracker <Project>").

| Session | Domain | Forbidden without a prompt |
| ------- | ------ | -------------------------- |
| A | Foundations: repository, tooling, CI, CLAUDE.md | migrations, screens |
| B | Backend: schema, access security, server functions, database tests, API contract | screens |
| D | Design system and screens, on mock data | backend |
| E | Authentication and wiring the screens to the backend | schema |
| H | Deployment, QA, security, ADRs | screens, schema (unless a written exception) |

| Environment | Identifier | Branch | Use |
| ----------- | ---------- | ------ | --- |
| dev | <database project ref> | `main` | tests, migrations with the PO's approval |
| preview | <preview URL> | `main` | not indexed, deployed after each merge |
| prod | <domain> | `main` | written GO from the PO required |

- Source of truth: `main`. Each session works in its worktree `<path>\<Project>-<letter>` (branch
  `feat/<topic>`) and does not merge: the ORCH merges. No push without the PO's request.
- Migrations: written by only one session at a time (<letter>).
- Validations: <format, lint, typecheck, tests, build, e2e, size check…>.
- Return format: the skill's `templates/RETURN.md` ("RETURN SESSION X: P-xxx" block).
- Delegation to the ORCH (approved by the PO on <date>):
  - the ORCH does it alone, then reports: tests and checks, deploying the non-indexed preview, scripts prepared
    by a session on the dev environment, sending ordinary prompts to the sessions and receiving their returns by
    direct message (the tracker remains the record);
  - the ORCH asks first: production, spending, new public text, irreversible deletion, exception to a rule;
  - the PO only: entering or creating secrets, creating accounts, consoles the ORCH cannot reach, physical
    actions. Secrets stay in the user's environment variables and are never displayed.
