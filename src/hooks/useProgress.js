const STORAGE_KEY = 'bloomday-progress-v2'
const LEGACY_KEY = 'bloomday-progress-v1'

function emptyProgress() {
  return {
    learnerName: '',
    completed: {}, // `${day}-${sessionId}`: { score?, total?, at }
    attempts: [], // quiz history for reports: { day, sessionId, subject, score, total, pct, at }
    lastDay: 1,
  }
}

function migrate(raw) {
  const base = { ...emptyProgress(), ...raw }
  if (!Array.isArray(base.attempts)) base.attempts = []

  // Backfill attempts from completed quiz entries if history empty
  if (base.attempts.length === 0 && base.completed) {
    for (const [key, val] of Object.entries(base.completed)) {
      if (val?.score == null || val?.total == null) continue
      const [dayStr, ...rest] = key.split('-')
      const sessionId = rest.join('-')
      const subject = sessionId.startsWith('maths') ? 'maths' : 'science'
      base.attempts.push({
        day: Number(dayStr),
        sessionId,
        subject,
        score: val.score,
        total: val.total,
        pct: Math.round((val.score / val.total) * 100),
        at: val.at || Date.now(),
      })
    }
    base.attempts.sort((a, b) => a.at - b.at)
  }
  return base
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY)
    if (!raw) return emptyProgress()
    return migrate(JSON.parse(raw))
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function sessionKey(day, sessionId) {
  return `${day}-${sessionId}`
}

export function isSessionDone(progress, day, sessionId) {
  return Boolean(progress.completed[sessionKey(day, sessionId)])
}

export function dayCompletion(progress, day) {
  const ids = ['maths-lesson', 'science-lesson', 'maths-quiz', 'science-quiz']
  const done = ids.filter((id) => isSessionDone(progress, day, id)).length
  return { done, total: ids.length, pct: Math.round((done / ids.length) * 100) }
}

function startOfDay(ts) {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function avg(nums) {
  if (!nums.length) return null
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length)
}

function filterAttempts(attempts, fromTs, toTs = Date.now()) {
  return attempts.filter((a) => a.at >= fromTs && a.at <= toTs && a.total > 0)
}

function subjectSplit(list) {
  const maths = list.filter((a) => a.subject === 'maths')
  const science = list.filter((a) => a.subject === 'science')
  return {
    maths: { count: maths.length, avg: avg(maths.map((a) => a.pct)), best: maths.length ? Math.max(...maths.map((a) => a.pct)) : null },
    science: { count: science.length, avg: avg(science.map((a) => a.pct)), best: science.length ? Math.max(...science.map((a) => a.pct)) : null },
    overall: { count: list.length, avg: avg(list.map((a) => a.pct)), best: list.length ? Math.max(...list.map((a) => a.pct)) : null },
  }
}

/** Daily buckets for last N days (including today) */
export function getDailyTrend(progress, days = 7) {
  const now = Date.now()
  const today = startOfDay(now)
  const points = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const dayStart = today - i * 86400000
    const dayEnd = dayStart + 86400000 - 1
    const list = filterAttempts(progress.attempts || [], dayStart, dayEnd)
    const label = new Date(dayStart).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })
    points.push({
      key: String(dayStart),
      label,
      ...subjectSplit(list),
    })
  }
  return points
}

/** Weekly buckets for last N weeks */
export function getWeeklyTrend(progress, weeks = 6) {
  const now = Date.now()
  const today = startOfDay(now)
  const dow = new Date(today).getDay() // 0 Sun
  const weekStart = today - dow * 86400000
  const points = []
  for (let i = weeks - 1; i >= 0; i -= 1) {
    const start = weekStart - i * 7 * 86400000
    const end = start + 7 * 86400000 - 1
    const list = filterAttempts(progress.attempts || [], start, end)
    const label = `W ${new Date(start).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
    points.push({
      key: String(start),
      label,
      ...subjectSplit(list),
    })
  }
  return points
}

/** Monthly buckets for last N months */
export function getMonthlyTrend(progress, months = 6) {
  const now = new Date()
  const points = []
  for (let i = months - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const start = d.getTime()
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999).getTime()
    const list = filterAttempts(progress.attempts || [], start, end)
    const label = d.toLocaleDateString(undefined, { month: 'short', year: '2-digit' })
    points.push({
      key: String(start),
      label,
      ...subjectSplit(list),
    })
  }
  return points
}

export function getTodayReport(progress) {
  const start = startOfDay(Date.now())
  const list = filterAttempts(progress.attempts || [], start)
  const lessonsDone = Object.values(progress.completed || {}).filter((v) => {
    return v?.at >= start && v.score == null
  }).length
  const quizzesDone = list.length
  return {
    dateLabel: new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }),
    lessonsDone,
    quizzesDone,
    ...subjectSplit(list),
    recent: [...list].sort((a, b) => b.at - a.at).slice(0, 6),
  }
}

export function getTrendDelta(points) {
  const withData = points.filter((p) => p.overall.count > 0)
  if (withData.length < 2) return null
  const prev = withData[withData.length - 2].overall.avg
  const curr = withData[withData.length - 1].overall.avg
  if (prev == null || curr == null) return null
  return curr - prev
}

export function starsFromPct(pct) {
  if (pct == null) return 0
  if (pct >= 90) return 5
  if (pct >= 75) return 4
  if (pct >= 60) return 3
  if (pct >= 40) return 2
  if (pct > 0) return 1
  return 0
}
