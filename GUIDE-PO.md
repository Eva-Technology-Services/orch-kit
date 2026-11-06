*Version française : [GUIDE-PO.fr.md](GUIDE-PO.fr.md).*

# PO guide: run a project with an ORCH and Claude Code sessions

This guide is for the PO, architect or tech lead in charge. It describes what you do day to day.
The detailed method, for Claude, is in `skills/orchestration-multi-sessions/SKILL.md`.

## 1. Roles

| Who | Does | Does not |
|---|---|---|
| **You (PO)** | Open and close the sessions. Run the backend scripts (unless you delegate the dev ones). Decide: scope, priorities, public texts, money, production. Keep the secrets and accounts. | Copy and paste mechanically (the ORCH does it if you delegate it). |
| **ORCH** (a Claude Code session at the project root) | Keeps the sessions in sync and controls the governance: splits the work into prompts, writes everything in the tracker, checks every return, merges, sums up the decisions for you. | Open or close sessions, implement features, or decide for you on anything sensitive. |
| **Specialized sessions** (one per domain, each in its own git folder) | Implement their prompt, test, hand back a structured return. | Merge, or step outside their scope. |

## 2. Getting started (30 minutes)

The exact prompts to paste (ORCH and sessions, on Claude Code or Codex) are in [START-PROMPTS.md](START-PROMPTS.md).
On Codex, `/orch-init` does not exist: paste the "ORCH on Codex" prompt instead.

1. Install the kit (see `README.md`), then open Claude Code at the project root.
2. Type `/orch-init <Project name>`. The ORCH reads the project and proposes:
   - the sessions (for example A foundations, B backend, D design, E integration, H deployment);
   - the environments (dev, preview, production);
   - the **delegation matrix**: what the ORCH does alone, what it asks you first, what only you do.
3. Approve or adjust. The ORCH creates the tracker (a claude.ai page) and gives you its link.
4. Open one Claude Code session per letter, in the folder the ORCH gives you, and give it its first prompt
   (the tracker's "Copy and mark sent" button), or let the ORCH send it directly.

## 3. Day to day

- **The tracker, "Prompts" view**: each card is a piece of work given to a session. Statuses: to send → sent
  → returned → done.
- **The tracker, "To execute" view**: your actions, numbered (#n), in order, with the expected result. When an
  action is done: click "Done" and paste the result; the ORCH reads it there.
- **Returns**: a session ends with a "RETURN SESSION X: P-xxx" block. If the ORCH talks to the sessions directly,
  it receives the block itself; otherwise, paste it into the ORCH session.
- **Decisions**: the ORCH asks them one at a time, with the context, the options, its recommendation and its
  cost. Answer simply ("OK", "option B", "no, because…").
- **The tracker, "In progress" view**: what is running (session, card, for how long), what is waiting for you
  (in order), what comes next, and a dated log. The ORCH updates it at every prompt sent, return, merge,
  deployment or decision.
- **A session is missing?** The ORCH asks you to open it (folder and branch): sessions are yours to open and close.
- **Status check**: `/orch-status` in the ORCH session.

## 4. What always stays with you

- Entering or creating a key, a token, a password: in a masked prompt, never in the chat. Keys go into the
  environment variables of your Windows session (or your shell); scripts read them without displaying them.
- Creating accounts, accepting terms, paying.
- Giving the GO for production.
- Approving public texts (landing page, legal pages, emails), with a lawyer when needed.

## 5. Typical delegation matrix

| The ORCH does it alone, then reports | The ORCH asks you first | Only you |
|---|---|---|
| Tests, checks, measurements | Production | Secrets |
| Deploying a non-indexed preview | Spending | Creating accounts |
| Scripts on the dev environment, if you delegate them | New public texts | Consoles the ORCH cannot reach |
| Sending prompts and receiving returns | Irreversible deletions, exceptions to rules | Physical actions |
| Keeping the "In progress" view current | | Opening and closing sessions; backend scripts not delegated |

## 6. Risk zones: when a task drifts

Some areas are risky whatever the task: database migrations, authentication, security headers, payments,
deployment, environment files. They are listed in the project (`.claude/risk-zones.json`), and each prompt says
which ones the session may touch.

- If a session needs another zone, it stops and messages the ORCH before editing. The ORCH grants, refuses, or
  asks you.
- If the guard hook is installed, Claude Code also asks for your approval on any edit in a zone that session was
  not cleared for. If you see such a request without a word from the ORCH, refuse it and ask the ORCH.

## 7. Tips from practice

- **One session = one domain = one git folder.** Conflicts come from shared files: the ORCH sequences the
  sessions that touch the same files.
- **Close finished sessions.** Several sessions and their tests use up a machine's memory.
- **Ask for evidence.** A return without validations, or marked "partial", is normal; the ORCH checks it and
  writes a follow-up (`P-xxx-C2`) if needed.
- **Design**: if the screens "look AI-generated", ask for a critique of the screenshots and for two directions
  explored on two pilot screens before reworking everything.
- **Third-party skills**: install them only after reading their files (the ORCH can do it for you); refuse those
  that run code for no reason.
