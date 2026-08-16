/**
 * Maps public ICSE Class 3 chapters → BloomDay day lessons
 * so Saruchi can browse by topic (not only the day schedule).
 */

import { COURSE_DAYS } from './course/plan'
import { ICSE_MATHS_CHAPTERS, ICSE_SCIENCE_CHAPTERS } from './icseSyllabus'

/** Match day.icse / unit text to a syllabus chapter id */
const MATHS_RULES = [
  { id: 'numbers', test: (t) => /^numbers\b/i.test(t) },
  { id: 'addition', test: (t) => /^addition\b/i.test(t) || /^\+\/−/i.test(t) },
  { id: 'subtraction', test: (t) => /^subtraction\b/i.test(t) },
  { id: 'multiplication', test: (t) => /^multiplication\b/i.test(t) || /^×÷/i.test(t) },
  { id: 'division', test: (t) => /^division\b/i.test(t) },
  { id: 'fractions', test: (t) => /^fractions\b/i.test(t) || /^f\/m\/t/i.test(t) },
  { id: 'money', test: (t) => /^money\b/i.test(t) },
  { id: 'measures', test: (t) => /^metric\b/i.test(t) || /\bmeasures\b/i.test(t) },
  { id: 'time', test: (t) => /^time\b/i.test(t) },
  { id: 'geometry', test: (t) => /^geometry\b/i.test(t) },
  { id: 'data', test: (t) => /pictograph|^\s*data\b|geometry\/data/i.test(t) },
  {
    id: 'patterns',
    test: (t) => /pattern|estimation|olympiad|fluency|grand review|icse practice|mixed ·/i.test(t),
  },
]

const SCIENCE_RULES = [
  {
    id: 'living',
    test: (t) =>
      /living\s*(&|and)\s*non-living|living world|revision · living|grand · living/i.test(t),
  },
  { id: 'plants', test: (t) => /parts of a plant|kinds of plants|revision · plants/i.test(t) },
  {
    id: 'animals',
    test: (t) =>
      /bodies of animals|eating habits|habitats|revision · animals|grand · plants\/animals/i.test(
        t,
      ),
  },
  { id: 'birds', test: (t) => /^birds\b|revision · birds|birds & body/i.test(t) },
  { id: 'body', test: (t) => /human body|revision · body|grand · body|health/i.test(t) },
  { id: 'safety', test: (t) => /safety|first aid/i.test(t) },
  { id: 'housing', test: (t) => /\bhouses\b|clothing|materials|revision · materials/i.test(t) },
  { id: 'soil', test: (t) => /rocks\s*&?\s*soil|revision · soil/i.test(t) },
  {
    id: 'weather',
    test: (t) =>
      /^(air|water|weather)\b|air\/water|revision · (air|water|weather)|grand · water/i.test(t),
  },
  { id: 'earth', test: (t) => /the earth|revision · earth|grand · earth|grand · matter/i.test(t) },
  { id: 'space', test: (t) => /sun,\s*moon|space\/env|revision · space|grand · space/i.test(t) },
  {
    id: 'environment',
    test: (t) =>
      /environment|3rs|pollution|local (environment|science)|citizenship|seasonal|projects|integrated · check|grand review/i.test(
        t,
      ),
  },
  {
    id: 'force',
    test: (t) =>
      /light|sound|force|energy|revision · l\/s\/f|grand · forces|experiments|skills|olympiad/i.test(
        t,
      ),
  },
]

/** Extra search tokens so syllabus detail chips match lesson titles */
const DETAIL_ALIASES = {
  '4-digit numbers': ['4-digit', 'abacus', 'thousand'],
  abacus: ['abacus'],
  'place value': ['place value'],
  'expanded form': ['expanded'],
  ordering: ['ordering', 'order'],
  'odd & even': ['odd', 'even'],
  'successor & predecessor': ['successor', 'predecessor'],
  'roman numerals': ['roman'],
  '4-digit without/with carry': ['carry', 'addition'],
  'three or more numbers': ['multiple addends', 'three'],
  'properties of addition': ['properties'],
  'without/with borrowing': ['borrow'],
  properties: ['properties'],
  'mixed +/−': ['mixed', '+/−', '+/-'],
  'meaning as groups': ['meaning', 'groups'],
  tables: ['tables'],
  '× 1-digit': ['1-digit', '×'],
  '× tens/hundreds': ['tens', 'hundreds'],
  'distributive property': ['distributive'],
  '× 2-digit intro': ['2-digit'],
  'sharing & grouping': ['sharing', 'grouping'],
  '2/3-digit ÷ 1-digit': ['2-digit', '3-digit', 'division'],
  remainders: ['remainder'],
  'dividend/divisor/quotient': ['dividend', 'divisor', 'quotient', 'vocabulary'],
  'number line': ['number line'],
  compare: ['compare'],
  equivalent: ['equivalent'],
  'of a collection': ['of a set', 'collection'],
  'like +/−': ['addition', 'subtraction', 'fractions'],
  '₹ and paise': ['paise', 'money', 'rupee'],
  conversion: ['conversion'],
  'add/subtract/multiply money': ['addition', 'subtraction', 'multiplication', 'money'],
  'making change': ['change'],
  'length (cm, m)': ['length', 'cm', 'metre', 'meter'],
  'weight (g, kg)': ['weight', 'gram', 'kg'],
  'capacity (ml, l)': ['capacity', 'ml', 'litre', 'liter'],
  conversions: ['units', 'conversion'],
  clock: ['clock'],
  'a.m./p.m.': ['a.m', 'p.m', 'am', 'pm'],
  'elapsed time': ['elapsed', 'time'],
  calendar: ['calendar'],
  'point, line, segment': ['point', 'line', 'segment'],
  'plane figures': ['2d', 'plane', 'circle'],
  'solid shapes': ['3d', 'solid'],
  'faces, edges, corners': ['faces', 'edges', 'corners', '3d'],
  pictographs: ['pictograph'],
  tally: ['tally', 'data'],
  'simple tables/bar intro': ['table', 'bar', 'data'],
  'number patterns': ['pattern'],
  rounding: ['round', 'estimation'],
  estimation: ['estimation', 'estimate'],
  'logical reasoning': ['reasoning', 'olympiad'],
  'features of living things': ['living', 'move', 'grow'],
  needs: ['food', 'air', 'water', 'need'],
  'examples around us': ['living vs', 'non-living', 'around'],
  'root, stem, leaf, flower, seed': ['root', 'stem', 'leaf', 'flower', 'seed'],
  'herbs/shrubs/trees': ['herbs', 'shrubs', 'trees', 'kinds'],
  'land & water plants': ['land', 'water plants', 'kinds'],
  'body organs': ['bodies of animals', 'organs'],
  'mammals/birds/reptiles/insects/fishes': ['mammals', 'reptiles', 'insects', 'fishes', 'animals'],
  'herbivore/carnivore/omnivore': ['eating', 'herbivore', 'carnivore', 'omnivore'],
  'food chain intro': ['food chain'],
  'feathers, beaks, feet': ['feathers', 'beaks', 'feet'],
  nesting: ['nesting', 'nest'],
  migration: ['migration'],
  'sense organs': ['senses', 'sense'],
  'skeleton, muscles': ['skeleton', 'muscles'],
  'digestion, breathing, circulation (simple)': ['digestion', 'breathing', 'circulation'],
  'home, school, road': ['safety', 'home', 'school', 'road'],
  'first aid basics': ['first aid'],
  'a good house': ['houses', 'house'],
  'clothes for weather': ['clothing', 'clothes'],
  'soil types': ['soil'],
  'importance of soil': ['soil'],
  rocks: ['rocks', 'soil'],
  air: ['air'],
  'forms of water': ['water'],
  'water cycle': ['cycle'],
  seasons: ['seasons'],
  weather: ['weather'],
  shape: ['earth', 'shape'],
  'day & night': ['spin', 'day', 'night'],
  'earth around the sun': ['orbit', 'sun'],
  sun: ['sun'],
  moon: ['moon'],
  stars: ['stars'],
  'solar system (kid level)': ['solar', 'space'],
  pollution: ['pollution'],
  '3rs': ['3rs', '3r'],
  'care for nature': ['environment', 'nature', 'care'],
  'light & shadows': ['light', 'shadow'],
  sound: ['sound'],
  'push/pull': ['force', 'push', 'pull'],
  energy: ['energy'],
}

export function slugifyDetail(detail) {
  return String(detail)
    .toLowerCase()
    .replace(/₹/g, 'rs')
    .replace(/×/g, 'x')
    .replace(/÷/g, 'div')
    .replace(/[+/−+/-]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function tokensForDetail(detail) {
  const key = detail.toLowerCase().trim()
  const aliases = DETAIL_ALIASES[key] || []
  const raw = key
    .replace(/[()]/g, ' ')
    .split(/[,/&·]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
  return [...new Set([...aliases, ...raw])]
}

export function lessonMatchesDetail(lesson, detail) {
  const hay = `${lesson.icse || ''} ${lesson.topic || ''}`.toLowerCase()
  return tokensForDetail(detail).some((tok) => hay.includes(tok.toLowerCase()))
}

function matchChapterId(icseTag, rules, fallbackId) {
  const t = (icseTag || '').trim()
  for (const rule of rules) {
    if (rule.test(t)) return rule.id
  }
  return fallbackId
}

function buildSubjectIndex(subject, chapters, rules) {
  const byChapter = Object.fromEntries(
    chapters.map((c) => [
      c.id,
      {
        ...c,
        subject,
        lessons: [],
        subtopics: new Map(),
      },
    ]),
  )

  const otherId = subject === 'maths' ? 'patterns' : 'environment'

  for (const d of COURSE_DAYS) {
    const block = d[subject]
    const icse = block.icse || ''
    const chapterId = matchChapterId(icse, rules, otherId)
    const bucket = byChapter[chapterId] || byChapter[otherId]
    const lesson = {
      day: d.day,
      month: d.month,
      topic: block.topic,
      icse,
      family: block.family,
      lessonPath: `/day/${d.day}/${subject}-lesson`,
      quizPath: `/day/${d.day}/${subject}-quiz`,
      dayPath: `/day/${d.day}`,
    }
    bucket.lessons.push(lesson)
    const subKey = icse || block.topic
    if (!bucket.subtopics.has(subKey)) bucket.subtopics.set(subKey, [])
    bucket.subtopics.get(subKey).push(lesson)
  }

  return chapters.map((c) => {
    const b = byChapter[c.id]
    const detailLinks = (c.details || []).map((label) => {
      const slug = slugifyDetail(label)
      const matched = b.lessons.filter((lesson) => lessonMatchesDetail(lesson, label))
      return {
        label,
        slug,
        path: `/topics/${subject}/${c.id}?focus=${encodeURIComponent(slug)}`,
        lessonCount: matched.length,
        lessons: matched.length ? matched : b.lessons,
      }
    })

    return {
      id: c.id,
      name: c.name,
      details: c.details,
      detailLinks,
      subject,
      lessonCount: b.lessons.length,
      lessons: b.lessons,
      subtopics: [...b.subtopics.entries()].map(([label, lessons]) => ({
        label,
        lessons,
      })),
    }
  })
}

export const TOPIC_INDEX = {
  maths: buildSubjectIndex('maths', ICSE_MATHS_CHAPTERS, MATHS_RULES),
  science: buildSubjectIndex('science', ICSE_SCIENCE_CHAPTERS, SCIENCE_RULES),
}

export function getChapter(subjectId, chapterId) {
  return TOPIC_INDEX[subjectId]?.find((c) => c.id === chapterId) ?? null
}

export function getChapters(subjectId) {
  return TOPIC_INDEX[subjectId] || []
}

export function getDetailLink(subjectId, chapterId, focusSlug) {
  const chapter = getChapter(subjectId, chapterId)
  if (!chapter || !focusSlug) return null
  return chapter.detailLinks?.find((d) => d.slug === focusSlug) ?? null
}
