# orch-kit : piloter un projet avec plusieurs sessions Claude Code

Une méthode éprouvée sur un projet réel (une app web avec backend, OCR par IA, landing et déploiement) pour faire
travailler **plusieurs sessions Claude Code en parallèle** sous la coordination d'une session **ORCH**, avec un
**PO** humain qui garde les décisions.

## Le principe

- **ORCH** : découpe le travail en prompts numérotés (`P-001`, suites `P-001-C2`), les écrit en entier dans un
  tableau de suivi, vérifie chaque retour lui-même (diff, secrets, conflits, migrations, site en ligne), fusionne,
  et ne remonte au PO que les décisions.
- **Sessions spécialisées** (A fondations, B backend, D design, E intégration, H déploiement…) : chacune dans son
  worktree git et sa branche, dans son périmètre ; elles rendent un retour au format commun et ne fusionnent pas.
- **PO** : tranche (production, argent, textes publics, irréversible) et garde les secrets et les comptes. Une
  **matrice de délégation** écrite dans le CLAUDE.md fixe ce que l'ORCH fait seul.
- **Tableau de suivi** : un artifact claude.ai avec deux vues, « Prompts » (à envoyer → envoyé → retour → traité)
  et « À exécuter » (étapes numérotées du PO, avec le résultat attendu).
- **Communication directe** : sur un même poste, l'ORCH joint les autres sessions (`ListAgents`, `SendMessage`),
  envoie les prompts ordinaires et reçoit les retours sans copier-coller.

## Contenu

```
.claude-plugin/              manifestes du plugin et de la marketplace
skills/orchestration-multi-sessions/
  SKILL.md                   la méthode (rôles, vérifications, délégation, tableau, communication, design)
  templates/                 CLAUDE-orchestration.md, PROMPT.md, RETURN.md, MEMORY.md, BACKLOG.md
  tracker/index.html         le tableau de suivi, à publier comme artifact claude.ai (capacités db et user)
GUIDE-PO.md                  le guide du PO (rôles, mise en route, quotidien, délégation, conseils)
commands/
  orch-init.md               /orch-init : initialiser ou adopter la méthode sur un projet
  orch-status.md             /orch-status : point d'état des sessions, worktrees et tableau
```

## Installation

Depuis un dossier local :

```powershell
claude plugin marketplace add C:\chemin\vers\orch-kit
claude plugin install orch-kit@orch-kit --scope user
```

Depuis GitHub :

```powershell
claude plugin marketplace add Eva-Technology-Services/orch-kit
claude plugin install orch-kit@orch-kit --scope user
```

Le plugin ne contient que du texte et une page HTML : aucun script, aucun hook, aucun serveur.

## Démarrer

1. Ouvrir Claude Code à la racine du projet et taper `/orch-init <Nom du projet>`.
2. Valider le découpage en sessions et la matrice de délégation proposés.
3. Ouvrir une session par lettre dans son worktree et lui envoyer son prompt depuis le tableau (ou laisser l'ORCH
   l'envoyer, si la délégation le permet).
4. `/orch-status` à tout moment.

## Bonnes pratiques retenues

- Vérifier chaque retour soi-même ; un correctif d'intégration minimal à la fusion est signalé, pas caché.
- Une seule session écrit les migrations à la fois.
- Secrets dans les variables d'environnement de l'utilisateur, jamais affichés ni écrits.
- Machine partagée : vérifier la mémoire avant un run lourd, préférer des e2e ciblés.
- Qualité du design : critique des captures, skills de design vérifiés, deux directions sur écrans pilotes avant
  de généraliser.
- Un skill tiers s'installe seulement après lecture de tous ses fichiers.

## Auteur et licence

Conçu par Abderrahim Akkour, Eva Technology Services. Licence MIT (voir `LICENSE`).
