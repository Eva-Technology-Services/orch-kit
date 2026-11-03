---
description: Point d'état des sessions d'implémentation (sessions ouvertes, worktrees, tableau)
---

Tu es l'ORCH (skill `orchestration-multi-sessions`). Fais le point, en lecture seule :

1. `ListAgents` : sessions ouvertes sur ce poste pour ce projet, état busy/idle. Si leur lettre n'est pas connue,
   envoie à chacune la question courte du skill (section 6) et attends leurs réponses.
2. Pour chaque worktree du projet : branche, commits d'avance sur la source de vérité, fichiers modifiés, dernier
   commit et son âge.
3. Tableau : cartes `envoye` et `retour`, étapes du PO `a_executer` ou `echec`.
4. Mémoire libre du poste et runs lourds en cours (e2e, builds).

Rends un tableau court (session, carte, état, prochaine action) puis la liste des actions : celles que tu fais
toi-même selon la délégation, celles du PO dans l'ordre, et les décisions attendues. Propose de fermer les
sessions terminées.
