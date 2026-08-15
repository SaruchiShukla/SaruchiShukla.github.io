import { Link } from 'react-router-dom'
import { APP, DAYS, SUBJECTS, getTodayDayNumber } from '../data/curriculum'
import { dayCompletion, isSessionDone } from '../hooks/useProgress'

export default function Home({ progress }) {
  const todayNum = getTodayDayNumber()
  const today = DAYS.find((d) => d.day === todayNum) ?? DAYS[0]
  const completion = dayCompletion(progress, today.day)
  const greeting = progress.learnerName ? `Hi ${progress.learnerName}!` : 'Ready to learn?'

  return (
    <div className="page home">
      <section className="hero">
        <p className="hero__eyebrow">{APP.board} · {APP.grade} · Bangalore</p>
        <h1 className="hero__brand">{APP.name}</h1>
        <p className="hero__lead">
          {greeting} Every day: <strong>30 min Maths</strong> + <strong>30 min Science</strong> with
          videos in the app, then <strong>15 min olympiad papers</strong> (15+ topic questions each).
        </p>
        <div className="hero__cta">
          <Link className="btn btn--primary btn--lg" to={`/day/${today.day}`}>
            Open today’s schedule — Day {today.day}
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/reports">
            My report
          </Link>
        </div>
      </section>

      <section className="today-card">
        <div className="today-card__head">
          <h2>Today · Day {today.day}</h2>
          <span className="pill">{completion.done}/{completion.total} done</span>
        </div>
        <p className="today-card__title">{today.title}</p>
        <ul className="session-list">
          {APP.sessionPlan.map((s) => {
            const topic =
              s.subject === 'maths' ? today.maths.topic : today.science.topic
            const done = isSessionDone(progress, today.day, s.id)
            return (
              <li key={s.id} className={`session-list__item session-list__item--${s.subject}`}>
                <div>
                  <strong>{s.label}</strong>
                  <span>{topic}</span>
                </div>
                <div className="session-list__right">
                  <span className="mins">{s.minutes} min</span>
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
        <h2>All 21 course days</h2>
        <p className="muted">Pick any day — each follows the same 80-minute schedule.</p>
        <div className="day-grid">
          {DAYS.map((d) => {
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
      </section>
    </div>
  )
}
