#!/usr/bin/env bash
# Free public URL with NO account / NO login (Cloudflare Quick Tunnel).
# Works while this Mac is on and this script is running.
# For always-on hosting you still need a free account later (Netlify/GitHub Pages).

set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-5190}"

echo "→ Building BloomDay…"
npm run build

# Stop previous serve on this port if any
if lsof -tiTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  kill "$(lsof -tiTCP:"$PORT" -sTCP:LISTEN)" 2>/dev/null || true
  sleep 1
fi

echo "→ Serving on http://127.0.0.1:$PORT …"
npx --yes serve dist -l "$PORT" >/tmp/bloomday-serve.log 2>&1 &
SERVE_PID=$!
sleep 2

cleanup() {
  kill "$SERVE_PID" 2>/dev/null || true
}
trap cleanup EXIT

echo "→ Creating free public Cloudflare URL (no login)…"
echo "   Keep this terminal open while family uses the site."
echo ""
npx --yes cloudflared tunnel --url "http://127.0.0.1:$PORT"
