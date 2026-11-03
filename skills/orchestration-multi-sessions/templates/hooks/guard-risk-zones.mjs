#!/usr/bin/env node
// Claude Code PreToolUse hook: stops a session from editing a risk zone it was not cleared for.
//
// Risk zones are listed in .claude/risk-zones.json (committed, shared by all sessions):
//   { "zones": [ { "id": "migrations", "label": "database migrations", "paths": ["supabase/migrations/**"] } ] }
// The zones a session is cleared for, in its own worktree, are in .claude/risk-allow.local.json (not committed):
//   { "session": "B", "allow": ["migrations"] }
// The ORCH writes that file when it opens a worktree for a prompt that grants a scope exception.
//
// Outside the allowed zones, the edit is not run silently: the hook answers "ask", so the human must approve it,
// and tells the session to report the drift to the ORCH first. Editing the two config files is always guarded.
// No dependency, no network: Node 18+ only.

import { readFileSync } from 'node:fs';
import { join, relative, isAbsolute } from 'node:path';

const GUARDED_TOOLS = new Set(['Edit', 'Write', 'MultiEdit', 'NotebookEdit']);
const CONFIG_FILES = ['.claude/risk-zones.json', '.claude/risk-allow.local.json'];

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

function answer(decision, reason) {
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

let input;
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0); // not a hook call we understand: do not block
}

if (!GUARDED_TOOLS.has(input.tool_name)) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const target = input.tool_input?.file_path || input.tool_input?.notebook_path;
if (!target) process.exit(0);

const absolute = isAbsolute(target) ? target : join(root, target);
const rel = relative(root, absolute).split('\\').join('/');
if (rel.startsWith('..')) process.exit(0); // outside the project: not ours to judge

if (CONFIG_FILES.includes(rel)) {
  answer(
    'ask',
    `Risk-zone configuration (${rel}). Only the ORCH or the PO changes it: send the ORCH a message instead of editing it.`,
  );
}

const zones = readJson(join(root, '.claude/risk-zones.json'), { zones: [] }).zones ?? [];
const local = readJson(join(root, '.claude/risk-allow.local.json'), { allow: [] });
const allowed = new Set(local.allow ?? []);

const zone = zones.find((z) => (z.paths ?? []).some((p) => globToRegExp(p).test(rel)));
if (!zone || allowed.has(zone.id)) process.exit(0);

answer(
  'ask',
  `Risk zone "${zone.label ?? zone.id}" (${rel}) is outside this session's prompt. ` +
    `Before going on, send the ORCH a short message (SendMessage): file, zone, why it is needed. ` +
    `Continue only if the ORCH or the PO clears it.`,
);
