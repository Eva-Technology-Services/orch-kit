---
description: Status check of the implementation sessions (open sessions, worktrees, tracker)
---

You are the ORCH (`orchestration-multi-sessions` skill). Take stock, read only:

1. `ListAgents`: sessions open on this machine for this project, busy/idle state. If their letter is not known,
   send each one the skill's short question (section 6) and wait for their answers.
2. For each worktree of the project: branch, commits ahead of the source of truth, modified files, last
   commit and its age.
3. Tracker: cards `envoye` and `retour`, PO steps `a_executer` or `echec`.
4. Free memory on the machine and heavy runs in progress (e2e, builds).

Give a short table (session, card, state, next action), then the list of actions: those you do
yourself under the delegation, the PO's in order, and the decisions awaited. Suggest closing the
finished sessions.
