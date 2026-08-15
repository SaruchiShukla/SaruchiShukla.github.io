/**
 * Kid-safe in-app videos only (YouTube embeds).
 * No external download pages or search links — papers stay inside BloomDay.
 */

function video(id, title, channel, minutes = 5) {
  return {
    id,
    title,
    channel,
    minutes,
    embed: `https://www.youtube-nocookie.com/embed/${id}`,
  }
}

/** Shared verified educational embeds */
const V = {
  living1: video('BEz7RPvQCAI', 'Living Things and Nonliving Things', 'Learning Time Fun', 4),
  living2: video('sHdmmDlnPSA', 'Living and Nonliving Things for Kids', 'Tutoring Hour', 3),
  plants: video('18amLZ9vfG8', 'Plant Parts and Functions for Kids', 'Homeschool Pop', 11),
  matter: video('wclY8F-UoTE', '3 States of Matter for Kids', 'FreeSchool', 5),
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

/**
 * Only embeddable videos. Related topics reuse the closest kid-safe lesson
 * so learning stays inside the app.
 */
export const MEDIA = {
  1: { maths: [V.tables, V.mult3], science: [V.living1, V.living2] },
  2: { maths: [V.tables, V.multRap], science: [V.living1, V.living2] },
  3: { maths: [V.tables], science: [V.birds1, V.birds2] },
  4: { maths: [V.tables, V.multRap, V.mult3], science: [V.pollinate, V.living2] },
  5: { maths: [V.tables, V.mult3], science: [V.plants] },
  6: { maths: [V.fractions1, V.fractions2], science: [V.plants] },
  7: { maths: [V.fractions1, V.tables], science: [V.matter] },
  8: { maths: [V.time], science: [V.matter, V.living1] },
  9: { maths: [V.time, V.tables], science: [V.matter] },
  10: { maths: [V.tables, V.fractions1], science: [V.pollinate] },
  11: { maths: [V.fractions2, V.time], science: [V.living1, V.living2] },
  12: { maths: [V.tables, V.fractions1], science: [V.birds1, V.living2] },
  13: { maths: [V.tables, V.mult3], science: [V.matter, V.pollinate] },
  14: { maths: [V.fractions1, V.tables], science: [V.plants] },
  15: { maths: [V.tables, V.multRap], science: [V.living1, V.plants] },
  16: { maths: [V.time, V.fractions2], science: [V.matter] },
  17: { maths: [V.tables, V.fractions1], science: [V.pollinate, V.living2] },
  18: { maths: [V.tables, V.time], science: [V.pollinate, V.matter] },
  19: { maths: [V.multRap, V.fractions1], science: [V.pollinate] },
  20: { maths: [V.tables, V.mult3], science: [V.living1, V.matter] },
  21: { maths: [V.tables, V.fractions1], science: [V.plants, V.living2] },
}

export function getMedia(dayNumber) {
  const pack = MEDIA[dayNumber] ?? MEDIA[1]
  return {
    maths: { videos: pack.maths, sites: [] },
    science: { videos: pack.science, sites: [] },
  }
}
