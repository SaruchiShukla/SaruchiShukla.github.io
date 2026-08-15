#!/usr/bin/env bash
# Cursor stop hook: after agent finishes BloomDay work, remind (or auto-deploy).
# Input: JSON on stdin (Cursor hooks protocol)
# Output: JSON on stdout

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

INPUT="$(cat || true)"

# Only act when this looks like an app-update session (src/ or public/ dirty)
CHANGED="$(git status --porcelain 2>/dev/null | grep -E '^( M|M |A |\?\?) (src/|public/|index.html|package.json|vercel.json)' || true)"

if [[ -z "$CHANGED" ]]; then
  echo '{}'
  exit 0
fi

# Auto-deploy when token is configured and BLOOMDAY_AUTO_DEPLOY=1
if [[ "${BLOOMDAY_AUTO_DEPLOY:-}" == "1" && -n "${VERCEL_TOKEN:-}" ]]; then
  if bash "$ROOT/scripts/deploy.sh" >/tmp/bloomday-deploy.log 2>&1; then
    URL="$(grep -Eo 'https://[^ ]+\.vercel\.app' /tmp/bloomday-deploy.log | tail -1 || true)"
    MSG="BloomDay auto-deployed${URL:+: $URL}"
  else
    MSG="BloomDay changes detected, but auto-deploy failed. Run: npm run deploy"
  fi
  # shellcheck disable=SC2016
  printf '{"followup_message":%s}\n' "$(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$MSG")"
  exit 0
fi

MSG="BloomDay files changed. To publish the update publicly, run: npm run deploy (after Vercel login). Or set BLOOMDAY_AUTO_DEPLOY=1 and VERCEL_TOKEN for automatic deploys."
printf '{"followup_message":%s}\n' "$(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$MSG")"
exit 0
