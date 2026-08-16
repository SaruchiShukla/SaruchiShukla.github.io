import {
  ICSE_MATHS_CHAPTERS,
  ICSE_NOTE,
  ICSE_SCIENCE_CHAPTERS,
  ICSE_SOURCES,
} from './icseSyllabus'

/** Dedicated learner profile for this BloomDay course */
export const LEARNER = {
  name: 'Saruchi Shukla',
  firstName: 'Saruchi',
  school: 'Vidyashilp School',
  schoolShort: 'Vidyashilp',
  board: 'ICSE',
  grade: 'Class 3',
  city: 'Bangalore',
  programme: 'Primary · ICSE-aligned',
  highlight: 'Saruchi’s Vidyashilp ICSE course',
}

/**
 * Curated from public ICSE Class 3 Maths & Science topic outlines.
 * Lessons/exams are original BloomDay content mapped to those chapters.
 */
export const SCHOOL_MAP = {
  name: 'Vidyashilp School',
  board: 'ICSE',
  note: ICSE_NOTE,
  sources: ICSE_SOURCES,
  mathsUnits: ICSE_MATHS_CHAPTERS.map((c) => c.name),
  scienceUnits: ICSE_SCIENCE_CHAPTERS.map((c) => c.name),
  mathsChapters: ICSE_MATHS_CHAPTERS,
  scienceChapters: ICSE_SCIENCE_CHAPTERS,
}
