/**
 * Kid-safe YouTube embeds only (verified educational IDs).
 * Each pack totals ~28–35 minutes for a consolidated 30-min topic course.
 */

export function video(id, title, channel, minutes = 5) {
  return {
    id,
    title,
    channel,
    minutes,
    embed: `https://www.youtube-nocookie.com/embed/${id}`,
  }
}

const V = {
  living1: video('BEz7RPvQCAI', 'Living Things and Nonliving Things', 'Learning Time Fun', 4),
  living2: video('sHdmmDlnPSA', 'Living and Nonliving Things for Kids', 'Tutoring Hour', 3),
  plants: video('18amLZ9vfG8', 'Plant Parts and Functions for Kids', 'Homeschool Pop', 11),
  matter: video('wclY8F-UoTE', '3 States of Matter for Kids', 'FreeSchool', 5),
  solids: video('qYzjg5nRMOg', 'Solids and Liquids for Kids', 'Homeschool Pop', 6),
  changes: video('BOr76Zx48QM', 'Physical and Chemical Changes for Kids', 'Homeschool Pop', 9),
  matterHappy: video('vNvElea-124', 'States of Matter and Changes of State', 'Happy Learning', 8),
  fractions1: video('jgWqSjgMAtw', 'Fraction Basics | Grade 3', 'Khan Academy', 5),
  fractions2: video('PmmEHbwOBAE', 'Half, Quarter, Three Quarters', 'Khan Academy', 5),
  time: video('Ll3QzXftlS0', 'Telling Time to the Nearest Minute', 'Khan Academy', 5),
  tables: video('h-CC6jDDahQ', 'Multiplication Tables 1 to 10', 'Periwinkle', 10),
  multRap: video('_UVcNBjoxs4', 'Multiplication Rap 0–12', "Rock 'N Learn", 12),
  mult3: video('t03yW7Oxsoc', 'Multiply by 3 Song', 'Jack Hartmann', 3),
  birds1: video('i1BCehbUsTQ', 'Bird Beaks & Feeding', 'Nature Education', 5),
  birds2: video('Qs2gbYzeYoo', 'Bird Beak Challenge', 'Kids Science', 6),
  pollinate: video('pnBoM4idf1k', 'Flowers and Pollinators', 'SciShow Kids', 5),
}

/** Build a ~30-minute playlist from segment videos (no duplicates in one pack). */
function pack(...items) {
  const seen = new Set()
  const out = []
  for (const v of items) {
    if (!v || seen.has(v.id)) continue
    seen.add(v.id)
    out.push(v)
  }
  return out
}

/**
 * Topic-family → consolidated ~30-min course playlist
 * (watch in order; total near 30 minutes)
 */
export const PACKS = {
  'maths-place': pack(V.tables, V.multRap, V.mult3, V.fractions1),
  'maths-compare': pack(V.tables, V.fractions1, V.fractions2, V.time, V.mult3),
  'maths-odd-even': pack(V.multRap, V.tables, V.mult3, V.fractions1),
  'maths-round': pack(V.tables, V.time, V.fractions1, V.fractions2, V.mult3),
  'maths-roman': pack(V.tables, V.multRap, V.fractions1, V.mult3),
  'maths-add': pack(V.tables, V.multRap, V.fractions1, V.time),
  'maths-sub': pack(V.multRap, V.tables, V.fractions2, V.time),
  'maths-pattern': pack(V.tables, V.mult3, V.multRap, V.fractions1),
  'maths-tables': pack(V.tables, V.multRap, V.mult3, V.fractions1),
  'maths-mult': pack(V.multRap, V.tables, V.mult3, V.fractions2),
  'maths-div': pack(V.tables, V.multRap, V.fractions1, V.time),
  'maths-frac': pack(V.fractions1, V.fractions2, V.tables, V.multRap),
  'maths-time': pack(V.time, V.fractions1, V.fractions2, V.tables, V.mult3),
  'maths-money': pack(V.tables, V.multRap, V.time, V.fractions1),
  'maths-measure': pack(V.fractions1, V.fractions2, V.time, V.tables, V.mult3),
  'maths-geo': pack(V.fractions2, V.tables, V.multRap, V.time),
  'maths-area': pack(V.fractions1, V.tables, V.multRap, V.mult3),
  'maths-data': pack(V.tables, V.time, V.fractions1, V.fractions2, V.mult3),
  'maths-word': pack(V.multRap, V.tables, V.fractions1, V.time),
  'maths-mixed': pack(V.tables, V.multRap, V.fractions1, V.fractions2, V.time),

  'sci-living': pack(V.living1, V.living2, V.plants, V.birds1, V.pollinate),
  'sci-plants': pack(V.plants, V.pollinate, V.living1, V.living2, V.birds2),
  'sci-animals': pack(V.birds1, V.birds2, V.plants, V.living1, V.pollinate),
  'sci-habitat': pack(V.plants, V.birds1, V.birds2, V.living2, V.pollinate),
  'sci-body': pack(V.living1, V.living2, V.plants, V.matter, V.solids),
  'sci-health': pack(V.living1, V.living2, V.plants, V.matterHappy, V.solids),
  'sci-matter': pack(V.matter, V.solids, V.changes, V.matterHappy, V.living1),
  'sci-water': pack(V.matter, V.matterHappy, V.solids, V.changes, V.plants),
  'sci-earth': pack(V.matterHappy, V.matter, V.changes, V.plants, V.solids),
  'sci-space': pack(V.matter, V.changes, V.matterHappy, V.living1, V.solids),
  'sci-env': pack(V.plants, V.pollinate, V.living1, V.living2, V.birds1),
  'sci-force': pack(V.changes, V.matter, V.solids, V.matterHappy, V.living2),
  'sci-mixed': pack(V.living1, V.plants, V.matter, V.solids, V.changes, V.pollinate),
}

export function getVideoPack(packKey) {
  const videos = PACKS[packKey] ?? PACKS['maths-mixed']
  const totalMinutes = videos.reduce((s, v) => s + (v.minutes || 0), 0)
  return { videos, totalMinutes }
}
