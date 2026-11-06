#!/usr/bin/env node
// PreToolUse hook for Claude Code and Codex: stops a session from editing a risk zone it was not cleared for.
//
// Risk zones are listed in .claude/risk-zones.json (committed, shared by all sessions):
//   { "zones": [ { "id": "migrations", "label": "database migrations", "paths": ["supabase/migrations/**"] } ] }
// The zones a session is cleared for, in its own worktree, are in .claude/risk-allow.local.json (not committed):
//   { "session": "B", "allow": ["migrations"] }
// The ORCH writes that file when it opens a worktree for a prompt that grants a scope exception.
//
// Outside the allowed zones, the edit is not run silently, and the session is told to report the drift to the ORCH:
// - Claude Code: the hook answers "ask", so the human must approve the edit;
// - Codex: the hook answers "deny", because Codex does not support "ask" yet (it would let the edit through).
// Editing the two config files is always guarded. Codex edits go through apply_patch: the paths are read from the
// patch text ("*** Add File:", "*** Update File:", "*** Delete File:", "*** Move to:").
// No dependency, no network: Node 18+ only.

import { readFileSync } from 'node:fs';
import { join, relative, isAbsolute } from 'node:path';

const GUARDED_TOOLS = new Set(['Edit', 'Write', 'MultiEdit', 'NotebookEdit', 'apply_patch']);
const CONFIG_FILES = ['.claude/risk-zones.json', '.claude/risk-allow.local.json'];
const PATCH_PATH = /^\*\*\* (?:Add File|Update File|Delete File|Move to): (.+?)\s*$/gm;

function readJson(path, fallback) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return fallback;
  }
}

// "dir/**", "**/auth*", "*.sql": * matches within a path segment, ** across segments.
function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  const pattern = escaped
    .replace(/\*\*\/?/g, '\u0000')
    .replace(/\*/g, '[^/]*')
    .replace(/\?/g, '[^/]')
    .replace(/\u0000/g, '(?:.*/)?.*');
  return new RegExp(`^${pattern}$`, 'i');
}

let input;
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0); // not a hook call we understand: do not block
}

if (!GUARDED_TOOLS.has(input.tool_name)) process.exit(0);

const codex = input.tool_name === 'apply_patch' || 'turn_id' in input;
const decision = codex ? 'deny' : 'ask';
const next = codex
  ? 'The edit is refused. Ask the PO to pass the ORCH a short message (file, zone, why); continue only once the ' +
    "ORCH has granted the zone in this worktree's .claude/risk-allow.local.json."
  : 'Before going on, send the ORCH a short message (SendMessage): file, zone, why it is needed. ' +
    'Continue only if the ORCH or the PO clears it.';

function answer(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: decision,
        permissionDecisionReason: reason,
      },
    }),
  );
  process.exit(0);
}

const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const toolInput = input.tool_input ?? {};
const targets =
  input.tool_name === 'apply_patch'
    ? [...String(toolInput.command ?? toolInput.patch ?? toolInput.input ?? '').matchAll(PATCH_PATH)].map((m) => m[1])
    : [toolInput.file_path || toolInput.notebook_path].filter(Boolean);
if (!targets.length) process.exit(0);

const zones = readJson(join(root, '.claude/risk-zones.json'), { zones: [] }).zones ?? [];
const local = readJson(join(root, '.claude/risk-allow.local.json'), { allow: [] });
const allowed = new Set(local.allow ?? []);

for (const target of targets) {
  const absolute = isAbsolute(target) ? target : join(root, target);
  const rel = relative(root, absolute).split('\\').join('/');
  if (rel.startsWith('..')) continue; // outside the project: not ours to judge

  if (CONFIG_FILES.includes(rel)) {
    answer(`Risk-zone configuration (${rel}). Only the ORCH or the PO changes it: tell the ORCH instead of editing it.`);
  }

  const zone = zones.find((z) => (z.paths ?? []).some((p) => globToRegExp(p).test(rel)));
  if (zone && !allowed.has(zone.id)) {
    answer(`Risk zone "${zone.label ?? zone.id}" (${rel}) is outside this session's prompt. ${next}`);
  }
}

process.exit(0);
