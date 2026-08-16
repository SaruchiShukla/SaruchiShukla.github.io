import { Link, useParams } from 'react-router-dom'
import { APP, LEARNER, getDay } from '../data/curriculum'
import { dayCompletion, isSessionDone } from '../hooks/useProgress'

export default function DaySchedule({ progress }) {
  const { dayNum } = useParams()
  const day = getDay(Number(dayNum))
  const completion = dayCompletion(progress, day.day)
  const last = APP.totalDays

  return (
    <div className="page day-page">
      <nav className="crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Day {day.day}</span>
      </nav>

      <header className="page-head">
        <p className="eyebrow">
          {LEARNER.firstName} · Month {day.month} · {day.monthName} · no timers
        </p>
        <h1>
          Day {day.day}: {day.title}
        </h1>
        <p className="muted">
          Maths 30-min video course → Science 30-min video course → Maths 15Q exam → Science 15Q exam
        </p>
        <p className="icse-tags">
          <span>Maths ICSE: {day.mathsUnit}</span>
          <span>Science ICSE: {day.scienceUnit}</span>
        </p>
        <div className="progress-bar">
          <span style={{ width: `${completion.pct}%` }} />
        </div>
        <p className="muted small">
          {completion.done} of {completion.total} sessions complete
        </p>
      </header>

      <ol className="schedule-steps">
        {APP.sessionPlan.map((s, i) => {
          const block = s.subject === 'maths' ? day.maths : day.science
          const done = isSessionDone(progress, day.day, s.id)
          const minsLabel =
            s.kind === 'lesson'
              ? `${s.minutes} minutes · topic video course`
              : '15 questions · same topic · no timer'
          return (
            <li key={s.id} className={`schedule-step schedule-step--${s.subject}`}>
              <span className="schedule-step__index">{i + 1}</span>
              <div className="schedule-step__body">
                <h2>{s.label}</h2>
                <p>{block.topic}</p>
                <p className="mins-line">{minsLabel}</p>
                {block.icse ? <p className="icse-line">{block.icse}</p> : null}
              </div>
              <Link
                className={`btn ${done ? 'btn--ghost' : 'btn--primary'}`}
                to={`/day/${day.day}/${s.id}`}
              >
                {done ? 'Review' : 'Open'}
              </Link>
            </li>
          )
        })}
      </ol>

      <div className="day-nav">
        {day.day > 1 && (
          <Link className="btn btn--ghost" to={`/day/${day.day - 1}`}>
            ← Day {day.day - 1}
          </Link>
        )}
        {day.day < last && (
          <Link className="btn btn--ghost" to={`/day/${day.day + 1}`}>
            Day {day.day + 1} →
          </Link>
        )}
      </div>
    </div>
  )
}
