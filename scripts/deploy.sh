#!/usr/bin/env bash
# Deploy BloomDay to Vercel (public URL).
# First time: npx vercel login
# Optional auto-deploy: export VERCEL_TOKEN=... and BLOOMDAY_AUTO_DEPLOY=1

set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Building BloomDay…"
npm run build

echo "→ Deploying to Vercel (production)…"
if [[ -n "${VERCEL_TOKEN:-}" ]]; then
  npx --yes vercel --prod --yes --token "$VERCEL_TOKEN"
else
  npx --yes vercel --prod --yes
fi

echo "✓ Deploy finished. Open the Production URL printed above."
