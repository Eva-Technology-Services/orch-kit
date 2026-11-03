<!-- Structure d'un prompt de session, écrit en entier dans le tableau (collection prompts). -->

[ORCH P-xxx → X]
Tu es la session X (<domaine>) de <Projet>, <une phrase sur le produit>. Je suis l'ORCH : je relis ton retour et je
fusionne. <Ce qui a changé dans la source de vérité depuis le dernier prompt de X : fusions, correctifs
d'intégration faits par l'ORCH, décisions du PO.>

## Réponses à tes questions (si suite)
1. <réponse ou décision du PO>

## Préparation
1. `git -C <chemin>\<Projet>-X checkout -b feat/<sujet> main`, puis l'installation des dépendances.
2. À lire : <documents et sections précises>.
3. Sessions en parallèle et fichiers à éviter : <qui travaille où>.

## Exception de périmètre (si besoin)
Tu peux modifier <fichier précis> pour <raison>, au plus petit.

## À faire
1. **<Titre>** : <résultat attendu, vérifiable>.
2. …

## Tests
<Tests unitaires et e2e attendus ; e2e ciblés et `--workers=2` si la mémoire manque.> Parcours manuel court pour le
PO, et ce que l'ORCH doit vérifier en lecture seule.

## Délégation (si besoin)
<Environnement, fichiers exacts, ordre, contrôles, point d'arrêt.>

## Interdits
<Périmètres des autres sessions, production, secrets, déploiement…>

## Fin
Rebase sur `main`, <validations> au vert, ne fusionne pas. Retour « RETOUR SESSION X : P-xxx » au format du skill,
avec <éléments spécifiques : captures, mesures, coûts, textes à relire…>.
