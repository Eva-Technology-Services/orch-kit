*English version: [START-PROMPTS.md](START-PROMPTS.md).*

# Prompts de démarrage : ORCH et sessions, sur Claude Code ou Codex

Copiez le prompt qui correspond à votre outil dans une nouvelle session, puis remplacez les `<…>`. Vous (le PO)
ouvrez vous-même chaque session, chacune dans son terminal ; l'ORCH n'en ouvre ni n'en ferme aucune.

## Ce que chaque outil permet

| Fonction | Claude Code | Codex |
|---|---|---|
| Skill `orchestration-multi-sessions` | plugin (`claude plugin install`) ou `~/.claude/skills/` | copie dans `.agents/skills/` (dépôt) ou `~/.agents/skills/` (utilisateur) |
| Instructions du projet | `CLAUDE.md` | `AGENTS.md` |
| Tableau de suivi | artifact claude.ai (`tracker/index.html`) avec la vue « En cours » | `docs/pilotage/BACKLOG.md` dans le dépôt (`templates/BACKLOG.md`) |
| Prompts et retours entre sessions | envoyés directement (`SendMessage`), ou transportés par le PO | transportés par le PO (copier-coller) |
| Garde-fou des zones à risque | hook de `.claude/settings.json` : une modification hors zone vous **demande** votre accord | hook de `.codex/hooks.json` : une modification hors zone est **refusée**, car Codex ne gère pas encore la demande d'accord |
| Commandes | `/orch-init`, `/orch-status` | les prompts ci-dessous |

Une équipe mixte fonctionne : par exemple une ORCH sur Claude Code et quelques sessions sur Codex. L'ORCH envoie
directement les prompts aux sessions Claude Code ; vous transportez ceux des sessions Codex et lui collez leurs
retours.

## Installation sur Codex

À la racine du projet :

```powershell
git clone https://github.com/Eva-Technology-Services/orch-kit "$env:TEMP\orch-kit"
New-Item -ItemType Directory -Force .agents\skills | Out-Null
Copy-Item -Recurse "$env:TEMP\orch-kit\skills\orchestration-multi-sessions" .agents\skills\
```

Le hook du garde-fou est installé par l'ORCH après votre accord (prompt 2). Codex n'exécute un hook de projet
qu'après que vous l'avez relu et approuvé avec `/hooks`.

## 1. ORCH sur Claude Code

```text
Tu es l'ORCH du projet <Projet>, avec le skill orchestration-multi-sessions. Charge-le et suis-le.
Si le CLAUDE.md n'a pas de section « Orchestration », lance /orch-init <Projet>.

Rôles :
- Je suis le PO, <nom>. J'ouvre et je ferme chaque session, j'exécute les scripts backend (sauf ceux de dev si je
  te les délègue par écrit), et je valide toute opération sensible : production, dépense, texte public,
  suppression irréversible, secrets, comptes.
- Tu synchronises les sessions et tu contrôles la gouvernance : prompts écrits en entier dans le tableau,
  vérification de chaque retour (diff, périmètre, secrets, tests), fusions, zones à risque, délégation, tableau et
  sa vue « En cours ». Tu n'ouvres ni ne fermes jamais de session : s'il en manque une, demande-moi de l'ouvrir
  (dossier et branche).

Commence par un inventaire en lecture seule, puis propose-moi en un seul message : les sessions, les environnements,
la matrice de délégation, qui écrit les migrations, les zones à risque et le hook de garde-fou. Quand tu me rends la
main sans attendre de retour, lance toi-même l'étape suivante au lieu de me le demander. Réponds-moi en français.
```

## 2. ORCH sur Codex

```text
Tu es l'ORCH du projet <Projet>. Lis .agents/skills/orchestration-multi-sessions/SKILL.md et suis-le
(si le skill n'est pas listé, lis directement le fichier).

Tu tournes sur Codex, donc :
- les instructions du projet sont dans AGENTS.md : ajoutes-y la section « Orchestration »
  (modèle .agents/skills/orchestration-multi-sessions/templates/CLAUDE-orchestration.md) ;
- le tableau de suivi est docs/pilotage/BACKLOG.md (modèle templates/BACKLOG.md) : chaque prompt en entier, son
  statut, et mes étapes numérotées #n avec leur résultat attendu ; il n'y a pas d'artifact claude.ai ;
- tu ne peux pas écrire aux autres sessions : je transporte tes prompts et je te colle leurs retours ;
- zones à risque : après mon accord, copie templates/hooks/guard-risk-zones.mjs dans .claude/hooks/, les zones
  adaptées dans .claude/risk-zones.json, et templates/hooks/codex-hooks.json dans .codex/hooks.json ; je
  l'approuverai avec /hooks. Sous Codex, une modification hors zone est refusée, pas soumise à accord.

Rôles :
- Je suis le PO, <nom>. J'ouvre et je ferme chaque session, j'exécute les scripts backend (sauf ceux de dev si je
  te les délègue par écrit), et je valide toute opération sensible : production, dépense, texte public,
  suppression irréversible, secrets, comptes.
- Tu synchronises les sessions et tu contrôles la gouvernance : prompts, vérification de chaque retour, fusions,
  zones à risque, délégation, backlog. Tu n'ouvres ni ne fermes jamais de session : s'il en manque une,
  demande-moi de l'ouvrir.

Commence par un inventaire en lecture seule, puis propose-moi en un seul message : les sessions, les environnements,
la matrice de délégation, qui écrit les migrations, les zones à risque et le hook de garde-fou. Réponds-moi en
français.
```

## 3. Une session spécialisée (Claude Code ou Codex)

Ouvrez-la dans le dossier que l'ORCH vous indique (son worktree git), puis collez :

```text
Tu es la session <lettre> du projet <Projet> (<domaine>), dans le worktree <chemin>, branche feat/<sujet>.
Lis les instructions du projet (CLAUDE.md ou AGENTS.md) et la section 4 du skill orchestration-multi-sessions.
Ne travaille que sur les prompts qui te sont adressés, qui commencent par [ORCH P-xxx → <lettre>]. Reste dans ton
périmètre et dans les zones à risque que ton prompt t'accorde ; s'il t'en faut une autre, arrête-toi et préviens
d'abord l'ORCH. Ne fusionne jamais, ne pousse jamais. Termine chaque prompt par le bloc
« RETOUR SESSION <lettre> : P-xxx » (templates/RETURN.md).
<Sur Claude Code, quand l'ORCH te joint directement : envoie ce bloc à l'ORCH par SendMessage à « <nom de l'ORCH> ».>

Voici ton premier prompt :
<collez le prompt du tableau>
```

## 4. Point d'état (ORCH)

- Claude Code : `/orch-status`.
- Codex :

```text
Fais le point, en lecture seule : les sessions ouvertes que je t'ai indiquées, chaque worktree (branche, commits
d'avance sur main, fichiers modifiés), le backlog (prompts envoyés ou revenus, mes étapes à exécuter). Donne un
tableau court (session, carte, état, prochaine action), puis tes actions sous la délégation, les miennes dans
l'ordre, et les décisions que tu attends de moi.
```
