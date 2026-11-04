<!-- Section to paste into the project's CLAUDE.md. Replace the <…>. -->

## Orchestration

This project uses the `orchestration-multi-sessions` skill.

- ORCH: coordination session; keeps the sessions in sync and controls the governance (prompts, checks of the
  returns, merges, risk zones, tracker and its "In progress" view). It never opens or closes a session.
  PO: <name or role>, who opens and closes the sessions, runs the backend scripts that are not delegated and
  approves every sensitive operation.
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
- Risk zones: `.claude/risk-zones.json` (migrations, auth, security, payments, deploy, env files), enforced by the
  `guard-risk-zones` PreToolUse hook. Each prompt grants its zones; the ORCH writes them in the worktree's
  `.claude/risk-allow.local.json`. A session that drifts into another zone messages the ORCH before editing.
- Validations: <format, lint, typecheck, tests, build, e2e, size check…>.
- Return format: the skill's `templates/RETURN.md` ("RETURN SESSION X: P-xxx" block).
- Delegation to the ORCH (approved by the PO on <date>):
  - the ORCH does it alone, then reports: tests and checks, deploying the non-indexed preview, sending ordinary
    prompts to the sessions and receiving their returns by direct message (the tracker remains the record),
    keeping the tracker's "In progress" view current; <add "scripts prepared by a session on the dev environment"
    only if the PO delegates them; otherwise the PO runs every backend script>;
  - the ORCH asks first: production, spending, new public text, irreversible deletion, exception to a rule;
  - the PO only: opening and closing the sessions, entering or creating secrets, creating accounts, consoles the
    ORCH cannot reach, physical actions. Secrets stay in the user's environment variables and are never displayed.
