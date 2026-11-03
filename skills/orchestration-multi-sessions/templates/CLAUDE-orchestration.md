<!-- Section à coller dans le CLAUDE.md du projet. Remplacer les <…>. -->

## Orchestration

Ce projet utilise le skill `orchestration-multi-sessions`.

- ORCH : session de coordination (découpe en prompts, relit les retours, fusionne, tient le tableau).
  PO : <nom ou rôle>, qui tranche les décisions.
- Tableau de suivi : <URL de l'artifact> (« Suivi <Projet> »).

| Session | Domaine | Interdit sans prompt |
| ------- | ------- | -------------------- |
| A | Fondations : dépôt, outillage, CI, CLAUDE.md | migrations, écrans |
| B | Backend : schéma, sécurité d'accès, fonctions serveur, tests de base, contrat d'API | écrans |
| D | Design system et écrans, sur données simulées | backend |
| E | Authentification et branchement des écrans au backend | schéma |
| H | Déploiement, QA, sécurité, ADR | écrans, schéma (sauf exception écrite) |

| Environnement | Identifiant | Branche | Usage |
| ------------- | ----------- | ------- | ----- |
| dev | <ref du projet de base> | `main` | tests, migrations avec accord du PO |
| preview | <URL de préversion> | `main` | non indexée, déployée après chaque fusion |
| prod | <domaine> | `main` | GO écrit du PO obligatoire |

- Source de vérité : `main`. Chaque session travaille dans son worktree `<chemin>\<Projet>-<lettre>` (branche
  `feat/<sujet>`) et ne fusionne pas : l'ORCH fusionne. Pas de push sans demande du PO.
- Migrations : écrites par une seule session à la fois (<lettre>).
- Validations : <format, lint, typecheck, tests, build, e2e, contrôle de taille…>.
- Format de retour : `templates/RETURN.md` du skill (bloc « RETOUR SESSION X : P-xxx »).
- Délégation à l'ORCH (validée par le PO le <date>) :
  - l'ORCH fait seul, puis rend compte : tests et contrôles, déploiement de la préversion non indexée, scripts
    préparés par une session sur l'environnement de dev, envoi des prompts ordinaires aux sessions et réception de
    leurs retours par message direct (le tableau reste la trace) ;
  - l'ORCH demande d'abord : production, dépense, nouveau texte public, suppression irréversible, dérogation ;
  - le PO seul : saisie ou création de secrets, création de comptes, consoles inaccessibles à l'ORCH, actions
    physiques. Les secrets restent dans les variables d'environnement de l'utilisateur et ne sont jamais affichés.
