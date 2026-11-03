<!-- Repli quand aucun artifact claude.ai n'est disponible : même modèle que le tableau, dans le dépôt
     (par ex. docs/pilotage/BACKLOG.md). L'ORCH le tient à jour ; le PO coche ses étapes. -->

# Suivi <Projet>

Sessions : A, B, D, E, H, PO. Statuts des prompts : à envoyer → envoyé → retour → traité (ou annulé).

## Prompts

| N° | Session | Objet | Statut | Go-live | Note |
| -- | ------- | ----- | ------ | ------- | ---- |
| P-001 | A | Fondations du dépôt | traité | bloquant | Fusion abc1234 |

### P-001 → A (texte complet)

```text
[ORCH P-001 → A]
…
```

## À exécuter par le PO

| # | Type | Env | Carte | Titre | Prérequis | Attendu | Statut | Résultat |
| - | ---- | --- | ----- | ----- | --------- | ------- | ------ | -------- |
| 1 | powershell | local | P-001 | Installer les dépendances | Aucun | « Done » | à exécuter | |

### #1 (code)

```powershell
cd <dossier>
pnpm install
```

## Décisions

| Date | Décision | Options écartées | Par |
| ---- | -------- | ---------------- | --- |
