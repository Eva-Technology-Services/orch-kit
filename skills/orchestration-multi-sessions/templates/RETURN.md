<!-- Return format of a specialized session. "RETOUR SESSION X : P-xxx" is accepted too. -->

## RETURN SESSION <letter>: P-xxx
Status: done / partial (why) / blocked (why)

Done:
- <what was delivered, in short sentences>

Commits (branch feat/<topic>, rebased on main <hash>):
- <hash> <type>(<scope>): <description>

Key files:
- <paths>

Verification commands run and result:
- format:check, lint, typecheck, build: ✅/❌
- tests: ✅ (n/n per package)
- e2e: ✅ (n/n) — or not run, and why
- project-specific checks (size, migrations, deployment dry run…)

To do by the PO:
- <exact commands with their folder, SQL scripts with the environment, manual actions; never a secret>

Manual walkthrough (if screens):
| # | Action | Expected |

Deviations from the prompt or the PRD:
1. <deviation and reason>

Questions for the PO / the ORCH:
1. <question, with the session's recommendation>

Risks / debts:
- <what remains, for whom>

Next steps:
1. <…>
