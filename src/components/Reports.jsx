import { useMemo, useState } from 'react'
import {
  getDailyTrend,
  getMonthlyTrend,
  getTodayReport,
  getTrendDelta,
  getWeeklyTrend,
  starsFromPct,
} from '../hooks/useProgress'

function Stars({ pct }) {
  const n = starsFromPct(pct)
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`}>
      {'★'.repeat(n)}
      <span className="stars__empty">{'★'.repeat(5 - n)}</span>
    </span>
  )
}

function StatCard({ label, value, hint, tone }) {
  return (
    <div className={`stat-card stat-card--${tone || 'default'}`}>
      <span className="stat-card__label">{label}</span>
      <strong className="stat-card__value">{value ?? '—'}</strong>
      {hint && <span className="stat-card__hint">{hint}</span>}
    </div>
  )
}

function TrendChart({ points, subject = 'overall' }) {
  const max = 100
  return (
    <div className="trend-chart" role="img" aria-label="Score trend chart">
      {points.map((p) => {
        const pct = p[subject]?.avg
        const height = pct == null ? 6 : Math.max(8, (pct / max) * 100)
        return (
          <div key={p.key} className="trend-chart__col">
            <div className="trend-chart__bar-wrap">
              <div
                className={`trend-chart__bar ${pct == null ? 'trend-chart__bar--empty' : ''}`}
                style={{ height: `${height}%` }}
                title={pct == null ? 'No papers yet' : `${pct}%`}
              />
            </div>
            <span className="trend-chart__label">{p.label}</span>
            <span className="trend-chart__val">{pct == null ? '–' : `${pct}%`}</span>
          </div>
        )
      })}
    </div>
  )
}

function TrendBadge({ delta }) {
  if (delta == null) return <span className="trend-badge">Keep practising</span>
  if (delta > 0) return <span className="trend-badge trend-badge--up">↑ Up {delta} pts</span>
  if (delta < 0) return <span className="trend-badge trend-badge--down">↓ Down {Math.abs(delta)} pts</span>
  return <span className="trend-badge">→ Steady</span>
}

export default function Reports({ progress }) {
  const [range, setRange] = useState('daily')
  const [subject, setSubject] = useState('overall')
  const name = progress.learnerName || 'Your child'

  const today = useMemo(() => getTodayReport(progress), [progress])
  const daily = useMemo(() => getDailyTrend(progress, 7), [progress])
  const weekly = useMemo(() => getWeeklyTrend(progress, 6), [progress])
  const monthly = useMemo(() => getMonthlyTrend(progress, 6), [progress])

  const points = range === 'weekly' ? weekly : range === 'monthly' ? monthly : daily
  const delta = getTrendDelta(points)
  const hasAny = (progress.attempts || []).length > 0

  return (
    <div className="page reports-page">
      <header className="page-head">
        <p className="eyebrow">Parent & learner report</p>
        <h1>{name}’s progress</h1>
        <p className="muted">
          In-app papers only — multiple choice with scores. See how she is trending daily, weekly,
          and monthly.
        </p>
      </header>

      <section className="report-today">
        <div className="today-card__head">
          <h2>Today · {today.dateLabel}</h2>
          <Stars pct={today.overall.avg} />
        </div>
        <div className="stat-grid">
          <StatCard label="Papers today" value={today.quizzesDone} hint="Maths + Science" tone="maths" />
          <StatCard
            label="Today’s average"
            value={today.overall.avg != null ? `${today.overall.avg}%` : '—'}
            hint={today.overall.avg != null ? 'Across papers' : 'No paper yet today'}
            tone="accent"
          />
          <StatCard
            label="Maths avg"
            value={today.maths.avg != null ? `${today.maths.avg}%` : '—'}
            hint={`${today.maths.count} paper(s)`}
            tone="maths"
          />
          <StatCard
            label="Science avg"
            value={today.science.avg != null ? `${today.science.avg}%` : '—'}
            hint={`${today.science.count} paper(s)`}
            tone="science"
          />
        </div>

        {today.recent.length > 0 && (
          <ul className="attempt-list">
            {today.recent.map((a) => (
              <li key={`${a.at}-${a.sessionId}`}>
                <span className={`dot dot--${a.subject}`} />
                <strong>{a.subject === 'maths' ? 'Maths' : 'Science'}</strong>
                <span>Day {a.day}</span>
                <span className="attempt-score">
                  {a.score}/{a.total} · {a.pct}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="report-trends">
        <div className="today-card__head">
          <h2>How she is trending</h2>
          <TrendBadge delta={delta} />
        </div>

        <div className="segmented">
          <button type="button" className={range === 'daily' ? 'is-on' : ''} onClick={() => setRange('daily')}>
            Daily
          </button>
          <button type="button" className={range === 'weekly' ? 'is-on' : ''} onClick={() => setRange('weekly')}>
            Weekly
          </button>
          <button type="button" className={range === 'monthly' ? 'is-on' : ''} onClick={() => setRange('monthly')}>
            Monthly
          </button>
        </div>

        <div className="segmented segmented--soft">
          <button type="button" className={subject === 'overall' ? 'is-on' : ''} onClick={() => setSubject('overall')}>
            Overall
          </button>
          <button type="button" className={subject === 'maths' ? 'is-on' : ''} onClick={() => setSubject('maths')}>
            Maths
          </button>
          <button type="button" className={subject === 'science' ? 'is-on' : ''} onClick={() => setSubject('science')}>
            Science
          </button>
        </div>

        {!hasAny ? (
          <p className="empty-report">
            No scores yet. When she finishes an in-app question paper, her marks will appear here
            automatically.
          </p>
        ) : (
          <>
            <TrendChart points={points} subject={subject} />
            <p className="muted small chart-note">
              {range === 'daily' && 'Last 7 days · average % on papers'}
              {range === 'weekly' && 'Last 6 weeks · average % on papers'}
              {range === 'monthly' && 'Last 6 months · average % on papers'}
            </p>
          </>
        )}
      </section>

      <section className="report-tips">
        <h2>Quick tips for parents</h2>
        <ul>
          <li>Papers are multiple choice inside the app — no downloads needed.</li>
          <li>Aim for steady stars, not perfection every day.</li>
          <li>If a subject dips for a week, repeat that day’s course + paper together.</li>
        </ul>
      </section>
    </div>
  )
}
