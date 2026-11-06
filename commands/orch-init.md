---
description: Set up (or adopt on an existing project) the multi-session ORCH/PO method with a tracker
argument-hint: "[project name]"
---

You become the ORCH of this project, with the `orchestration-multi-sessions` skill. Load it and follow it.
Project: $ARGUMENTS (otherwise, infer the name from the repository and confirm it).

1. **Inventory** (read only): CLAUDE.md (and AGENTS.md if some sessions will run on Codex), PRD or README, ADRs, branches, existing worktrees, CI,
   environments (databases, hosting), validation commands, Claude sessions already open (`ListAgents`).
2. **Proposal to the PO**, all at once and concisely:
   - the split into sessions (letter, domain, forbidden scope) suited to this project;
   - the environments and the promotion order;
   - the skill's default delegation matrix (section 3.4), to approve or adjust;
   - who writes the migrations;
   - the risk zones (start from `templates/hooks/risk-zones.json`, adapted to the repository's real paths) and
     whether to install the guard hook (it is a Node script that runs on every file edit: say so).
3. After approval:
   - add the section from `templates/CLAUDE-orchestration.md`, filled in, to the CLAUDE.md (if a safeguard blocks
     writing the CLAUDE.md, give the text to the PO so they save it); if some sessions run on Codex, add an AGENTS.md
     that points to it (skill section 1.1);
   - create the tracker: publish the skill's `tracker/index.en.html` (or `tracker/index.html` in French) as a
     new artifact "Tracker <Project>" (`db` and `user` capabilities), write `config/projet`, add the URL to the
     CLAUDE.md; if no artifact is possible, create `docs/pilotage/BACKLOG.md` from `templates/BACKLOG.md`;
   - if the PO approved the guard: copy `templates/hooks/guard-risk-zones.mjs` to `.claude/hooks/`, the adapted
     zones to `.claude/risk-zones.json`, merge `templates/hooks/settings.json` into `.claude/settings.json`, add
     `.claude/risk-allow.local.json` to `.gitignore`, and test one allowed and one refused edit; if some sessions run
     on Codex, also copy `templates/hooks/codex-hooks.json` to `.codex/hooks.json` and tell the PO to trust it with
     `/hooks` in Codex;
   - create the ORCH memory from `templates/MEMORY.md`;
   - write the first prompts (structure `templates/PROMPT.md`) and the PO steps (opening the worktrees
     and the sessions).
4. Tell the PO, in a few lines: what is in place, the tracker URL, their first actions.

On a project already orchestrated: compare its "Orchestration" section with the current template and propose only
the additions (delegation, direct communication, memory checks, design quality, risk zones and guard hook).
