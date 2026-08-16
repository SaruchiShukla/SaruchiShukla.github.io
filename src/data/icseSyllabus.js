/**
 * Public ICSE Class 3 Maths & Science syllabus outline (topic map).
 * Used to curate BloomDay’s original lessons/exams — we do NOT copy
 * textbooks or paid site question banks.
 *
 * Sources (public syllabus summaries):
 * - Common ICSE Class 3 Maths/Science chapter lists used by ICSE schools
 * - https://www.euroschoolindia.com/icse-syllabus/class-3/
 * - Public Class 3 Maths/Science syllabus topic lists (Numbers…Pictographs;
 *   Living things…Environment)
 *
 * Note: CISCE primary schools often choose textbooks within this framework;
 * Vidyashilp Primary is ICSE-aligned / activity-based.
 */

export const ICSE_SOURCES = [
  {
    title: 'ICSE Class 3 syllabus overview (public summary)',
    url: 'https://www.euroschoolindia.com/icse-syllabus/class-3/',
  },
  {
    title: 'ICSE Class 3 Mathematics topic list (public)',
    url: 'https://praadisedu.com/bords/ICSE/9',
  },
]

/** Detailed Maths chapters commonly listed for ICSE Class 3 */
export const ICSE_MATHS_CHAPTERS = [
  { id: 'numbers', name: 'Numbers', details: ['4-digit numbers', 'Abacus', 'Place value', 'Expanded form', 'Ordering', 'Odd & even', 'Successor & predecessor', 'Roman numerals'] },
  { id: 'addition', name: 'Addition', details: ['4-digit without/with carry', 'Three or more numbers', 'Properties of addition'] },
  { id: 'subtraction', name: 'Subtraction', details: ['Without/with borrowing', 'Properties', 'Mixed +/−'] },
  { id: 'multiplication', name: 'Multiplication', details: ['Meaning as groups', 'Tables', '× 1-digit', '× tens/hundreds', 'Distributive property', '× 2-digit intro'] },
  { id: 'division', name: 'Division', details: ['Sharing & grouping', 'Properties', '2/3-digit ÷ 1-digit', 'Remainders', 'Dividend/divisor/quotient'] },
  { id: 'fractions', name: 'Fractions', details: ['Number line', 'Compare', 'Equivalent', 'Of a collection', 'Like +/−'] },
  { id: 'money', name: 'Money', details: ['₹ and paise', 'Conversion', 'Add/subtract/multiply money', 'Making change'] },
  { id: 'measures', name: 'Metric measures', details: ['Length (cm, m)', 'Weight (g, kg)', 'Capacity (ml, l)', 'Conversions'] },
  { id: 'time', name: 'Time & calendar', details: ['Clock', 'a.m./p.m.', 'Elapsed time', 'Calendar'] },
  { id: 'geometry', name: 'Geometry', details: ['Point, line, segment', 'Plane figures', 'Solid shapes', 'Faces, edges, corners'] },
  { id: 'data', name: 'Pictographs & data', details: ['Pictographs', 'Tally', 'Simple tables/bar intro'] },
  { id: 'patterns', name: 'Patterns & estimation', details: ['Number patterns', 'Rounding', 'Estimation', 'Logical reasoning'] },
]

/** Detailed Science chapters commonly listed for ICSE Class 3 */
export const ICSE_SCIENCE_CHAPTERS = [
  { id: 'living', name: 'Living and non-living', details: ['Features of living things', 'Needs', 'Examples around us'] },
  { id: 'plants', name: 'Parts / kinds of plants', details: ['Root, stem, leaf, flower, seed', 'Herbs/shrubs/trees', 'Land & water plants'] },
  { id: 'animals', name: 'Animals & eating habits', details: ['Body organs', 'Mammals/birds/reptiles/insects/fishes', 'Herbivore/carnivore/omnivore', 'Food chain intro'] },
  { id: 'birds', name: 'Birds', details: ['Feathers, beaks, feet', 'Nesting', 'Migration'] },
  { id: 'body', name: 'Our body', details: ['Sense organs', 'Skeleton, muscles', 'Digestion, breathing, circulation (simple)'] },
  { id: 'safety', name: 'Safety and first aid', details: ['Home, school, road', 'First aid basics'] },
  { id: 'housing', name: 'Housing and clothing', details: ['A good house', 'Clothes for weather'] },
  { id: 'soil', name: 'Land, rocks and soil', details: ['Soil types', 'Importance of soil', 'Rocks'] },
  { id: 'weather', name: 'Air, water and weather', details: ['Air', 'Forms of water', 'Water cycle', 'Seasons', 'Weather'] },
  { id: 'earth', name: 'The Earth', details: ['Shape', 'Day & night', 'Earth around the Sun'] },
  { id: 'space', name: 'Sun, moon and stars', details: ['Sun', 'Moon', 'Stars', 'Solar system (kid level)'] },
  { id: 'environment', name: 'Our environment', details: ['Pollution', '3Rs', 'Care for nature'] },
  { id: 'force', name: 'Light, sound and forces', details: ['Light & shadows', 'Sound', 'Push/pull', 'Energy'] },
]

export const ICSE_NOTE =
  'BloomDay curates original lessons and exams from the public ICSE Class 3 Maths & Science topic outline (not copied textbooks). Mapped for Saruchi at Vidyashilp (ICSE-aligned Primary).'
