import { Link } from 'react-router-dom'
import {
  APP,
  COURSE_MONTHS,
  DAYS,
  LEARNER,
  SCHOOL_MAP,
  SUBJECTS,
  getTodayDayNumber,
} from '../data/curriculum'
import { dayCompletion, isSessionDone } from '../hooks/useProgress'

export default function Home({ progress }) {
  const todayNum = getTodayDayNumber()
  const today = DAYS.find((d) => d.day === todayNum) ?? DAYS[0]
  const completion = dayCompletion(progress, today.day)
  const name = progress.learnerName || LEARNER.name
  const first = name.split(' ')[0] || LEARNER.firstName

  return (
    <div className="page home">
      <section className="hero hero--saruchi">
        <p className="hero__eyebrow">
          {LEARNER.school} · {LEARNER.board} {LEARNER.grade} · {LEARNER.city}
        </p>
        <p className="hero__for">Course highlighted for</p>
        <h1 className="hero__brand hero__learner">{name}</h1>
        <p className="hero__subbrand">{APP.name}</p>
        <p className="hero__lead">
          Hi {first}! Soft pink BloomDay just for you — watch Maths & Science videos, then take a
          gentle 15-question exam (one question at a time, with stars at the end).
        </p>
        <div className="hero__cta">
          <Link className="btn btn--primary btn--lg" to={`/day/${today.day}`}>
            Open {first}’s Day {today.day}
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/reports">
            {first}’s report
          </Link>
        </div>
      </section>

      <section className="school-map">
        <h2>Based on public ICSE Class 3 syllabus</h2>
        <p className="muted">{SCHOOL_MAP.note}</p>
        <p className="muted small">
          For {LEARNER.firstName} at {SCHOOL_MAP.name} (ICSE-aligned Primary).
        </p>
        {SCHOOL_MAP.sources?.length ? (
          <p className="muted small school-map__sources">
            Public references:{' '}
            {SCHOOL_MAP.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 ? ' · ' : ''}
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                </a>
              </span>
            ))}
          </p>
        ) : null}
        <div className="school-map__cols">
          <div>
            <h3>Maths chapters (ICSE)</h3>
            <ul>
              {(SCHOOL_MAP.mathsChapters || SCHOOL_MAP.mathsUnits.map((name) => ({ name }))).map(
                (u) => (
                  <li key={u.id || u.name}>
                    <strong>{u.name}</strong>
                    {u.details?.length ? (
                      <span className="muted small"> — {u.details.slice(0, 3).join(', ')}…</span>
                    ) : null}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h3>Science chapters (ICSE)</h3>
            <ul>
              {(SCHOOL_MAP.scienceChapters || SCHOOL_MAP.scienceUnits.map((name) => ({ name }))).map(
                (u) => (
                  <li key={u.id || u.name}>
                    <strong>{u.name}</strong>
                    {u.details?.length ? (
                      <span className="muted small"> — {u.details.slice(0, 3).join(', ')}…</span>
                    ) : null}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="today-card">
        <div className="today-card__head">
          <h2>
            {first}’s today · Day {today.day}
            <span className="muted small"> · Month {today.month}</span>
          </h2>
          <span className="pill">{completion.done}/{completion.total} done</span>
        </div>
        <p className="today-card__title">{today.title}</p>
        <p className="icse-tags">
          <span>Maths ICSE: {today.mathsUnit}</span>
          <span>Science ICSE: {today.scienceUnit}</span>
        </p>
        <ul className="session-list">
          {APP.sessionPlan.map((s) => {
            const topic = s.subject === 'maths' ? today.maths.topic : today.science.topic
            const icse = s.subject === 'maths' ? today.maths.icse : today.science.icse
            const done = isSessionDone(progress, today.day, s.id)
            const minsLabel = s.kind === 'lesson' ? '30 min' : '15 Q'
            return (
              <li key={s.id} className={`session-list__item session-list__item--${s.subject}`}>
                <div>
                  <strong>{s.label}</strong>
                  <span>{topic}</span>
                  {icse ? <span className="icse-line">{icse}</span> : null}
                </div>
                <div className="session-list__right">
                  <span className="mins">{minsLabel}</span>
                  {done ? <span className="check">Done</span> : null}
                  <Link to={`/day/${today.day}/${s.id}`} className="btn btn--small">
                    {done ? 'Review' : 'Start'}
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="progress-bar" aria-label={`${completion.pct}% complete`}>
          <span style={{ width: `${completion.pct}%` }} />
        </div>
      </section>

      <section className="subject-links">
        <h2>Subjects</h2>
        <div className="subject-grid">
          {Object.values(SUBJECTS).map((sub) => (
            <Link key={sub.id} to={`/subjects/${sub.id}`} className={`subject-tile subject-tile--${sub.id}`}>
              <h3>{sub.name}</h3>
              <p>{sub.blurb}</p>
              <span>View all days →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="day-picker">
        <h2>
          {first}’s 6-month ICSE course · {APP.totalDays} days
        </h2>
        <p className="muted">One new Maths topic + one new Science topic every school day — Vidyashilp ICSE map.</p>
        {(COURSE_MONTHS || APP.months).map((m) => {
          const monthDays = DAYS.filter((d) => d.month === m.month)
          return (
            <div key={m.month} className="month-block">
              <h3>
                Month {m.month}: {m.name}
              </h3>
              <p className="muted small">
                Maths: {m.mathsUnit} · Science: {m.scienceUnit}
              </p>
              <div className="day-grid">
                {monthDays.map((d) => {
                  const c = dayCompletion(progress, d.day)
                  return (
                    <Link
                      key={d.day}
                      to={`/day/${d.day}`}
                      className={`day-chip ${c.done === c.total ? 'day-chip--complete' : ''}`}
                      title={d.title}
                    >
                      <span className="day-chip__num">{d.day}</span>
                      <span className="day-chip__pct">{c.pct}%</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
