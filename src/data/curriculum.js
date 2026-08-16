/**
 * BloomDay — Saruchi Shukla · Vidyashilp ICSE Class 3
 * 6-month topic course mapped to ICSE Maths & Science units.
 */

import { COURSE_DAYS, COURSE_MONTHS, TOTAL_DAYS } from './course/plan'
import { getVideoPack } from './course/videos'
import { generateQuiz } from './course/generateQuiz'
import { LEARNER, SCHOOL_MAP } from './learner'

export { COURSE_MONTHS, TOTAL_DAYS, LEARNER, SCHOOL_MAP }

export const APP = {
  name: 'BloomDay',
  tagline: `${LEARNER.firstName} · ${SCHOOL_MAP.name} · ICSE Class 3`,
  board: 'ICSE',
  grade: 'Class 3',
  focus: 'Vidyashilp ICSE-aligned topic courses + 15Q exams',
  learner: LEARNER,
  school: SCHOOL_MAP,
  totalDays: TOTAL_DAYS,
  months: COURSE_MONTHS,
  sessionPlan: [
    { id: 'maths-lesson', subject: 'maths', kind: 'lesson', label: 'Maths Course', minutes: 30 },
    { id: 'science-lesson', subject: 'science', kind: 'lesson', label: 'Science Course', minutes: 30 },
    { id: 'maths-quiz', subject: 'maths', kind: 'quiz', label: 'Maths Exam', minutes: null },
    { id: 'science-quiz', subject: 'science', kind: 'quiz', label: 'Science Exam', minutes: null },
  ],
}

export const SUBJECTS = {
  maths: {
    id: 'maths',
    name: 'Mathematics',
    short: 'Maths',
    color: 'maths',
    blurb: `Saruchi’s ICSE Maths path — ${SCHOOL_MAP.mathsUnits.length} units mapped for Vidyashilp Primary`,
  },
  science: {
    id: 'science',
    name: 'Science',
    short: 'Science',
    color: 'science',
    blurb: `Saruchi’s ICSE Science path — ${SCHOOL_MAP.scienceUnits.length} units mapped for Vidyashilp Primary`,
  },
}

function buildLesson(topic, subject, totalMinutes, icse) {
  const isMaths = subject === 'maths'
  const name = LEARNER.firstName
  return {
    title: topic,
    minutes: 30,
    icse,
    goals: [
      `${name} learns today’s ICSE topic: ${topic}`,
      `Watch the consolidated ~${totalMinutes || 30}-minute course videos`,
      isMaths
        ? 'Say one example aloud, then take the 15-question exam'
        : 'Find one real-life example, then take the 15-question exam',
    ],
    sections: [
      {
        heading: 'Vidyashilp · ICSE map',
        body: icse
          ? `This lesson maps to: ${icse}. It follows the ICSE Class 3 unit sequence used in Vidyashilp’s Primary (activity-based, ICSE-aligned) programme.`
          : SCHOOL_MAP.note,
        tip: `${name} can learn calmly — no timer. Finish the videos, then try the checks.`,
      },
      {
        heading: '30-minute topic course',
        body: `Watch the videos below in order — about 30 minutes on “${topic}”. Pause anytime to talk about what you noticed.`,
      },
      {
        heading: `How ${name} studies today`,
        body: isMaths
          ? '1) Watch\n2) Say one example in your own words\n3) Do the Try-it prompts\n4) Take the 15-question exam on the same topic'
          : '1) Watch\n2) Find one real-life example at home or outside\n3) Do the Try-it prompts\n4) Take the 15-question exam on the same topic',
      },
    ],
    tryIt: isMaths
      ? [
          { prompt: `${name}, tell one fact about “${topic}”.`, answer: 'Any correct example from the video is great.' },
          { prompt: 'Invent one practice sum on today’s topic.', answer: 'Parent can check with the video ideas.' },
        ]
      : [
          { prompt: `${name}, name one example linked to “${topic}”.`, answer: 'Any correct real-world example works.' },
          { prompt: 'What question do you still have?', answer: 'Write it down — look for it next time you watch.' },
        ],
  }
}

function buildBlock(dayMeta, subject) {
  const raw = dayMeta[subject]
  const { videos, totalMinutes } = getVideoPack(raw.pack)
  return {
    topic: raw.topic,
    family: raw.family,
    icse: raw.icse,
    lesson: buildLesson(raw.topic, subject, totalMinutes, raw.icse),
    quiz: generateQuiz(dayMeta.day, subject, raw.family, raw.topic),
    videos,
    videoMinutes: totalMinutes,
    sites: [],
  }
}

export const DAYS = COURSE_DAYS.map((d) => ({
  day: d.day,
  month: d.month,
  monthName: d.monthName,
  mathsUnit: d.mathsUnit,
  scienceUnit: d.scienceUnit,
  title: `${d.maths.topic} · ${d.science.topic}`,
  maths: {
    topic: d.maths.topic,
    family: d.maths.family,
    pack: d.maths.pack,
    icse: d.maths.icse,
    lesson: null,
    quiz: null,
  },
  science: {
    topic: d.science.topic,
    family: d.science.family,
    pack: d.science.pack,
    icse: d.science.icse,
    lesson: null,
    quiz: null,
  },
}))

DAYS.forEach((d, i) => {
  const meta = COURSE_DAYS[i]
  const mPack = getVideoPack(meta.maths.pack)
  const sPack = getVideoPack(meta.science.pack)
  d.maths.lesson = buildLesson(meta.maths.topic, 'maths', mPack.totalMinutes, meta.maths.icse)
  d.science.lesson = buildLesson(meta.science.topic, 'science', sPack.totalMinutes, meta.science.icse)
})

export function getDay(dayNumber) {
  const meta = COURSE_DAYS.find((d) => d.day === dayNumber) ?? COURSE_DAYS[0]
  return {
    day: meta.day,
    month: meta.month,
    monthName: meta.monthName,
    mathsUnit: meta.mathsUnit,
    scienceUnit: meta.scienceUnit,
    title: `${meta.maths.topic} · ${meta.science.topic}`,
    maths: buildBlock(meta, 'maths'),
    science: buildBlock(meta, 'science'),
  }
}

export const COURSE_START = new Date(2026, 7, 17) // 17 Aug 2026 (Mon)

export function getTodayDayNumber() {
  const start = new Date(COURSE_START)
  start.setHours(0, 0, 0, 0)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  if (now < start) return 1

  let schoolDays = 0
  const cursor = new Date(start)
  while (cursor <= now) {
    const dow = cursor.getDay()
    if (dow !== 0 && dow !== 6) schoolDays += 1
    cursor.setDate(cursor.getDate() + 1)
  }
  return ((schoolDays - 1) % TOTAL_DAYS) + 1
}

export function daysByMonth(month) {
  return DAYS.filter((d) => d.month === month)
}
