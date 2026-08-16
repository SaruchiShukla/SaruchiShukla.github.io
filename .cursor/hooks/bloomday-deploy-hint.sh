#!/usr/bin/env bash
# Cursor stop hook: after agent finishes BloomDay work, remind how to publish (free, no login).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

cat >/dev/null || true

CHANGED="$(git status --porcelain 2>/dev/null | grep -E '^( M|M |A |\?\?) (src/|public/|index.html|package.json|scripts/|vercel.json)' || true)"

if [[ -z "$CHANGED" ]]; then
  echo '{}'
  exit 0
fi

MSG="BloomDay files changed. Publish free (no login): npm run deploy — keep the terminal open for the trycloudflare.com link. For always-on free hosting, use a free Netlify or GitHub Pages account once."
printf '{"followup_message":%s}\n' "$(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$MSG")"
exit 0
