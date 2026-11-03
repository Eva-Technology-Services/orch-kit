<!-- Fallback when no claude.ai artifact is available: same model as the tracker, in the repository
     (e.g. docs/pilotage/BACKLOG.md). The ORCH keeps it up to date; the PO ticks off their steps. -->

# Tracker <Project>

Sessions: A, B, D, E, H, PO. Prompt statuses: to send → sent → returned → done (or cancelled).

## Prompts

| No. | Session | Subject | Status | Go-live | Note |
| --- | ------- | ------- | ------ | ------- | ---- |
| P-001 | A | Repository foundations | done | blocking | Merge abc1234 |

### P-001 → A (full text)

```text
[ORCH P-001 → A]
…
```

## To execute by the PO

| # | Type | Env | Card | Title | Prerequisites | Expected | Status | Result |
| - | ---- | --- | ---- | ----- | ------------- | -------- | ------ | ------ |
| 1 | powershell | local | P-001 | Install the dependencies | None | "Done" | to execute | |

### #1 (code)

```powershell
cd <folder>
pnpm install
```

## Decisions

| Date | Decision | Options rejected | By |
| ---- | -------- | ---------------- | -- |
