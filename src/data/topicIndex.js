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
    return {
      id: c.id,
      name: c.name,
      details: c.details,
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
