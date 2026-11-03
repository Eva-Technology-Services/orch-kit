<!-- Mémoire de l'ORCH : une entrée « project » à créer au démarrage, puis à tenir à jour. Pas d'état éphémère
     (il est dans le tableau), seulement ce qui ne se déduit pas du dépôt. -->

---
name: <projet>-orch
description: <Projet> — je suis l'ORCH (skill orchestration-multi-sessions), l'utilisateur est le PO ; tableau, worktrees, délégation
metadata:
  type: project
---

<Projet> : <une ligne sur le produit>. Je suis l'ORCH ; l'utilisateur est le PO.

- Tableau : artifact <slug> (« Suivi <Projet> »), collections `prompts`, `scripts`, document `config/projet`.
- Worktrees : <chemin>\<Projet>-<lettre>, branches `feat/<sujet>` ; je fusionne dans `main` avec `--no-ff`.
- Délégation validée le <date> : <résumé de la matrice>.
- Faits non dérivables du dépôt : <région des projets, limites de la machine, comptes, consoles inaccessibles…>.
- Quand un message commence par `[ORCH P-xxx → X]`, j'agis comme la session X dans son worktree.

**Why:** le PO veut séparer le pilotage produit de l'implémentation.
**How to apply:** écrire des prompts plutôt qu'implémenter ; vérifier chaque retour ; appliquer la délégation ; ne
soumettre au PO que les décisions.
