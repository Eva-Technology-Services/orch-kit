<!-- ORCH memory: a "project" entry to create at startup, then keep up to date. No ephemeral state
     (it is in the tracker), only what cannot be derived from the repository. -->

---
name: <project>-orch
description: <Project> — I am the ORCH (orchestration-multi-sessions skill), the user is the PO; tracker, worktrees, delegation
metadata:
  type: project
---

<Project>: <one line about the product>. I am the ORCH; the user is the PO.

- Tracker: artifact <slug> ("Tracker <Project>"), collections `prompts`, `scripts`, document `config/projet`.
- Worktrees: <path>\<Project>-<letter>, branches `feat/<topic>`; I merge into `main` with `--no-ff`.
- Delegation approved on <date>: <summary of the matrix>.
- Facts that cannot be derived from the repository: <project regions, machine limits, accounts, unreachable consoles…>.
- When a message starts with `[ORCH P-xxx → X]`, I act as session X in its worktree.

**Why:** the PO wants to separate product steering from implementation.
**How to apply:** write prompts rather than implement; check every return; apply the delegation; bring only
decisions to the PO.
