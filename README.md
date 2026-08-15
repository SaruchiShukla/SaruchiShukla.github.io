# BloomDay — Class 3 ICSE Study

Everyday Maths & Science path for **ICSE Class 3 (Bangalore)** — built for kids to use **inside the app**.

## Kid-friendly design

- **Videos play in the app** (no download buttons / no PDF websites)
- **Question papers are in-app** multiple choice with instant scoring + stars
- **Report page** shows **daily · weekly · monthly** score trends (Maths, Science, Overall)

## Daily schedule (90 minutes)

1. **Maths course** — 30 minutes (lesson + in-app video)  
2. **Science course** — 30 minutes (lesson + in-app video)  
3. **Maths paper** — 15 minutes · **15 olympiad MCQs** mapped to the day’s topic  
4. **Science paper** — 15 minutes · **15 olympiad MCQs** mapped to the day’s topic  

Each paper: Logical · Concept · Achievers. Scores feed the daily / weekly / monthly report.

## Run locally

```bash
cd ~/Projects/class3-icse-study
npm install
npm run dev -- --host 127.0.0.1 --port 5180
```

Open: **http://127.0.0.1:5180/**

## Host publicly (Vercel)

```bash
# one-time login
npx vercel login

# publish
npm run deploy
```

That prints a **Production URL** you can open on phone/tablet.

### Keep updating automatically

1. **Cursor hook** (already in `.cursor/hooks.json`) — after the agent finishes editing BloomDay, it reminds you to deploy.  
   For fully automatic deploys, set in your shell profile:

   ```bash
   export VERCEL_TOKEN="your_token_from_vercel_settings"
   export BLOOMDAY_AUTO_DEPLOY=1
   ```

2. **GitHub Pages CI** — push to `main` and enable Pages → Source: GitHub Actions (workflow in `.github/workflows/deploy-pages.yml`).

Progress and the learner’s name stay in the browser (local storage) on each device.