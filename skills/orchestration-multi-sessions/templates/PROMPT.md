<!-- Structure of a session prompt, written in full in the tracker (prompts collection). -->

[ORCH P-xxx → X]
You are session X (<domain>) of <Project>, <one sentence about the product>. I am the ORCH: I read your return and I
merge. <What changed in the source of truth since X's last prompt: merges, integration fixes made by the ORCH,
PO decisions.>

## Answers to your questions (if follow-up)
1. <answer or PO decision>

## Preparation
1. `git -C <path>\<Project>-X checkout -b feat/<topic> main`, then install the dependencies.
2. To read: <documents and exact sections>.
3. Parallel sessions and files to avoid: <who works where>.

## Scope exception (if needed)
You may modify <exact file> for <reason>, as little as possible.

## To do
1. **<Title>**: <expected result, verifiable>.
2. …

## Tests
<Expected unit and e2e tests; targeted e2e and `--workers=2` if memory is short.> A short manual walkthrough for the
PO, and what the ORCH should check read only.

## Delegation (if needed)
<Environment, exact files, order, checks, stopping point.>

## Forbidden
<Other sessions' scopes, production, secrets, deployment…>

## End
Rebase on `main`, <validations> green, do not merge. Return "RETURN SESSION X: P-xxx" in the skill's format,
with <specific items: screenshots, measurements, costs, texts to review…>.
