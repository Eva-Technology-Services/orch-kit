# orch-kit: run a project with several Claude Code sessions

A method proven on a real project (a web app with a backend, AI receipt scanning, a landing page and deployment)
to have **several Claude Code sessions work in parallel**, coordinated by an **ORCH** session, while a human **PO**
keeps the decisions.

## How it works

- **ORCH**: splits the work into numbered prompts (`P-001`, follow-ups `P-001-C2`) and writes each one in full in a
  tracker. It checks every return itself (diff, secrets, merge conflicts, database migrations, live site), merges,
  and only brings decisions to the PO.
- **Specialized sessions** (A foundations, B backend, D design, E integration, H deployment…): each one works in
  its own git worktree and branch, inside its own scope. They answer in a common return format and never merge.
- **PO**: decides on production, money, public texts and anything irreversible, and keeps the secrets and accounts.
  A **delegation matrix** written in the project's CLAUDE.md defines what the ORCH may do on its own.
- **Tracker**: a claude.ai artifact with two views: "Prompts" (to send → sent → returned → done) and "To execute"
  (the PO's numbered steps, each with its expected result).
- **Direct communication**: on the same machine, the ORCH reaches the other sessions (`ListAgents`, `SendMessage`),
  sends ordinary prompts and receives returns without any copy-paste.

## The tracker

A shared claude.ai page, on desktop and mobile, light and dark. Screenshots from a fictional project
("Fieldline", a scheduling app for field technicians).

![Desktop: prompts on the left, the PO's steps on the right](docs/images/tracker-desktop.png)

| Prompts to process (dark mode) | The PO's steps on mobile |
| --- | --- |
| ![Return to process, dark mode](docs/images/tracker-desktop-dark.png) | ![To execute, mobile](docs/images/tracker-mobile-execute.png) |

Each prompt card shows its session, its go-live impact, its status and the ORCH's note after checking the return.
Each PO step shows its type (SQL, PowerShell, manual), its environment, the commands to copy, the expected result,
and the result pasted back, including failures.

## Contents

```
.claude-plugin/              plugin and marketplace manifests
skills/orchestration-multi-sessions/
  SKILL.md                   the method (roles, checks, delegation, tracker, communication, design)
  templates/                 CLAUDE-orchestration.md, PROMPT.md, RETURN.md, MEMORY.md, BACKLOG.md
  tracker/index.html         the tracker page in French, to publish as a claude.ai artifact (db and user capabilities)
  tracker/index.en.html      the same tracker in English
GUIDE-PO.md                  the PO guide (roles, getting started, daily routine, delegation, tips)
commands/
  orch-init.md               /orch-init: set up the method on a new or existing project
  orch-status.md             /orch-status: status of sessions, worktrees and tracker
```

The skill, templates and PO guide are currently written in French; Claude reads them in any language and answers
in yours.

## Installation

From GitHub:

```powershell
claude plugin marketplace add Eva-Technology-Services/orch-kit
claude plugin install orch-kit@orch-kit --scope user
```

From a local folder:

```powershell
claude plugin marketplace add C:\path\to\orch-kit
claude plugin install orch-kit@orch-kit --scope user
```

The plugin contains only text and one HTML page: no scripts, no hooks, no servers.

## Getting started

1. Open Claude Code at the root of your project and type `/orch-init <Project name>`.
2. Approve or adjust the proposed sessions and delegation matrix.
3. Open one Claude Code session per letter in its worktree and give it its prompt from the tracker, or let the ORCH
   send it directly if the delegation allows it.
4. Type `/orch-status` at any time.

## Lessons learned

- Check every return yourself; a minimal integration fix at merge time is reported, never hidden.
- Only one session writes database migrations at a time.
- Secrets live in the user's environment variables, never displayed or written down.
- On a shared machine, check free memory before heavy runs and prefer targeted end-to-end tests.
- Design quality: critique the screenshots, use vetted design skills, and explore two directions on two pilot
  screens before rolling out.
- Install a third-party skill only after reading all its files.

## Author and license

Designed by Abderrahim Akkour, Eva Technology Services. MIT license (see `LICENSE`).
