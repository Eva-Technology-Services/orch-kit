*English version: [GUIDE-PO.md](GUIDE-PO.md).*

# Guide du PO : piloter un projet avec une ORCH et des sessions Claude Code

Ce guide s'adresse au PO, à l'architecte ou au tech lead qui pilote. Il décrit ce que vous faites au quotidien.
La méthode détaillée, pour Claude, est dans `skills/orchestration-multi-sessions/SKILL.md`.

## 1. Les rôles

| Qui | Fait | Ne fait pas |
|---|---|---|
| **Vous (PO)** | Décidez : périmètre, priorités, textes publics, argent, production. Gardez les secrets et les comptes. | Copier-coller mécaniquement (l'ORCH s'en charge si vous le déléguez). |
| **ORCH** (une session Claude Code à la racine du projet) | Découpe en prompts, écrit tout dans le tableau, vérifie chaque retour, fusionne, vous résume les décisions. | Implémenter les fonctionnalités, décider à votre place sur ce qui est sensible. |
| **Sessions spécialisées** (une par domaine, chacune dans son dossier git) | Implémentent leur prompt, testent, rendent un retour structuré. | Fusionner, sortir de leur périmètre. |

## 2. Mise en route (30 minutes)

1. Installez le kit (voir `README.md`), puis ouvrez Claude Code à la racine du projet.
2. Tapez `/orch-init <Nom du projet>`. L'ORCH lit le projet et vous propose :
   - les sessions (par exemple A fondations, B backend, D design, E intégration, H déploiement) ;
   - les environnements (dev, préversion, production) ;
   - la **matrice de délégation** : ce que l'ORCH fait seul, ce qu'il vous demande, ce que vous seul faites.
3. Validez ou ajustez. L'ORCH crée le tableau de suivi (une page claude.ai) et vous donne son lien.
4. Ouvrez une session Claude Code par lettre, dans le dossier que l'ORCH indique, et donnez-lui son premier prompt
   (bouton « Copier et marquer envoyé » du tableau), ou laissez l'ORCH l'envoyer directement.

## 3. Au quotidien

- **Le tableau, vue « Prompts »** : chaque carte est un travail confié à une session. Statuts : à envoyer → envoyé
  → retour reçu → traité.
- **Le tableau, vue « À exécuter »** : vos actions, numérotées (#n), dans l'ordre, avec le résultat attendu. Une
  action faite : bouton « Exécuté » et collez le résultat ; l'ORCH le lit là.
- **Les retours** : une session termine par un bloc « RETOUR SESSION X : P-xxx ». Si l'ORCH communique directement
  avec les sessions, il le reçoit lui-même ; sinon, collez-le dans la session ORCH.
- **Les décisions** : l'ORCH vous les pose une par une, avec le contexte, les options, sa recommandation et son
  coût. Répondez simplement (« OK », « option B », « non, parce que… »).
- **Le point d'état** : `/orch-status` dans la session ORCH.

## 4. Ce qui vous revient toujours

- Saisir ou créer une clé, un jeton, un mot de passe : dans une invite masquée, jamais dans le chat. Les clés vont
  dans les variables d'environnement de votre session Windows (ou de votre shell) ; les scripts les lisent sans
  les afficher.
- Créer des comptes, accepter des conditions, payer.
- Donner le GO de la production.
- Valider les textes publics (landing, pages légales, e-mails), avec un juriste quand c'est nécessaire.

## 5. Matrice de délégation type

| L'ORCH fait seul, puis rend compte | L'ORCH vous demande d'abord | Vous seul |
|---|---|---|
| Tests, contrôles, mesures | Production | Secrets |
| Déploiement d'une préversion non indexée | Dépenses | Création de comptes |
| Scripts sur l'environnement de dev | Nouveaux textes publics | Consoles inaccessibles à l'ORCH |
| Envoi des prompts et réception des retours | Suppressions irréversibles, dérogations | Actions physiques |

## 6. Zones à risque : quand une tâche dérive

Certaines zones sont risquées quelle que soit la tâche : migrations de base, authentification, en-têtes de
sécurité, paiements, déploiement, fichiers d'environnement. Elles sont listées dans le projet
(`.claude/risk-zones.json`), et chaque prompt dit lesquelles la session peut toucher.

- Si une session a besoin d'une autre zone, elle s'arrête et écrit à l'ORCH avant de modifier quoi que ce soit.
  L'ORCH accorde, refuse, ou vous demande.
- Si le garde-fou est installé, Claude Code vous demande aussi votre accord pour toute modification dans une zone
  non accordée à cette session. Si une telle demande arrive sans message de l'ORCH, refusez et interrogez l'ORCH.

## 7. Conseils tirés de la pratique

- **Une session = un domaine = un dossier git.** Les conflits viennent des fichiers partagés : l'ORCH séquence
  les sessions qui touchent les mêmes fichiers.
- **Fermez les sessions terminées.** Plusieurs sessions et leurs tests saturent la mémoire d'un poste.
- **Exigez des preuves.** Un retour sans validations ou avec un « partiel » est normal ; l'ORCH vérifie et écrit
  une suite (`P-xxx-C2`) si besoin.
- **Design** : si les écrans « font générés par IA », demandez une critique des captures et l'exploration de deux
  directions sur deux écrans pilotes avant de tout reprendre.
- **Skills tiers** : n'installez qu'après relecture de leurs fichiers (l'ORCH peut le faire pour vous) ; refusez
  ceux qui exécutent du code sans raison.
