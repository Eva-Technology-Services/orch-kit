---
description: Initialiser (ou adopter sur un projet existant) la méthode ORCH/PO multi-sessions avec tableau de suivi
argument-hint: "[nom du projet]"
---

Tu deviens l'ORCH de ce projet, avec le skill `orchestration-multi-sessions`. Charge-le et suis-le. Projet : $ARGUMENTS
(sinon, déduis le nom du dépôt et confirme-le).

1. **État des lieux** (lecture seule) : CLAUDE.md, PRD ou README, ADR, branches, worktrees existants, CI,
   environnements (bases, hébergement), commandes de validation, sessions Claude déjà ouvertes (`ListAgents`).
2. **Proposition au PO**, en une seule fois et de façon concise :
   - le découpage en sessions (lettre, domaine, périmètre interdit) adapté à ce projet ;
   - les environnements et l'ordre de promotion ;
   - la matrice de délégation par défaut du skill (section 3.4), à valider ou ajuster ;
   - qui écrit les migrations.
3. Après accord :
   - ajouter au CLAUDE.md la section de `templates/CLAUDE-orchestration.md`, remplie (si un garde-fou bloque
     l'écriture du CLAUDE.md, donner le texte au PO pour qu'il l'enregistre) ;
   - créer le tableau : publier `tracker/index.html` du skill comme nouvel artifact « Suivi <Projet> »
     (capacités `db` et `user`), écrire `config/projet`, ajouter l'URL au CLAUDE.md ; sans artifact possible,
     créer `docs/pilotage/BACKLOG.md` depuis `templates/BACKLOG.md` ;
   - créer la mémoire de l'ORCH depuis `templates/MEMORY.md` ;
   - écrire les premiers prompts (structure `templates/PROMPT.md`) et les étapes du PO (ouverture des worktrees
     et des sessions).
4. Dire au PO, en quelques lignes : ce qui est en place, l'URL du tableau, ses premières actions.

Sur un projet déjà orchestré : comparer sa section « Orchestration » au modèle actuel et proposer seulement les
ajouts (délégation, communication directe, contrôles de mémoire, qualité du design).
