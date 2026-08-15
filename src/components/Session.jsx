import { Link, useNavigate, useParams } from 'react-router-dom'
import { APP, getDay } from '../data/curriculum'
import { isSessionDone, sessionKey } from '../hooks/useProgress'
import SessionTimer from './SessionTimer'
import Quiz from './Quiz'
import VideoResources from './VideoResources'

export default function Session({ progress, markComplete }) {
  const { dayNum, sessionId } = useParams()
  const navigate = useNavigate()
  const day = getDay(Number(dayNum))
  const plan = APP.sessionPlan.find((s) => s.id === sessionId)

  if (!plan) {
    return (
      <div className="page">
        <p>Session not found.</p>
        <Link to={`/day/${day.day}`}>Back to day</Link>
      </div>
    )
  }

  const block = plan.subject === 'maths' ? day.maths : day.science
  const done = isSessionDone(progress, day.day, plan.id)
  const order = APP.sessionPlan.map((s) => s.id)
  const idx = order.indexOf(plan.id)
  const nextId = order[idx + 1]

  const finishLesson = () => {
    markComplete(day.day, plan.id)
    if (nextId) navigate(`/day/${day.day}/${nextId}`)
    else navigate(`/day/${day.day}`)
  }

  const finishQuiz = (result) => {
    markComplete(day.day, plan.id, result)
    if (nextId) navigate(`/day/${day.day}/${nextId}`)
    else navigate(`/day/${day.day}`)
  }

  return (
    <div className={`page session-page session-page--${plan.subject}`}>
      <nav className="crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        <span>/</span>
        <span>{plan.label}</span>
      </nav>

      <header className="page-head">
        <p className="eyebrow">
          {plan.subject === 'maths' ? 'Mathematics' : 'Science'} ·{' '}
          {plan.kind === 'lesson' ? 'Course + videos' : 'In-app paper'}
        </p>
        <h1>{plan.kind === 'lesson' ? block.lesson.title : `${block.topic} — Question Paper`}</h1>
        <p className="muted">{block.topic}</p>
        {done && <span className="pill pill--ok">Completed</span>}
      </header>

      <SessionTimer minutes={plan.minutes} label={`${plan.label} timer`} />

      {plan.kind === 'lesson' ? (
        <article className="lesson">
          <VideoResources videos={block.videos} subject={plan.subject} />

          <section className="goals">
            <h2>Today’s goals</h2>
            <ul>
              {block.lesson.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>

          {block.lesson.sections.map((sec) => (
            <section key={sec.heading} className="lesson-section">
              <h2>{sec.heading}</h2>
              {sec.body.split('\n').map((line) => (
                <p key={line}>{line}</p>
              ))}
              {sec.tip && <p className="tip">{sec.tip}</p>}
            </section>
          ))}

          <section className="try-it">
            <h2>Try it</h2>
            {block.lesson.tryIt.map((t) => (
              <details key={t.prompt} className="try-card">
                <summary>{t.prompt}</summary>
                <p>
                  <strong>Answer:</strong> {t.answer}
                </p>
              </details>
            ))}
          </section>

          <div className="session-footer">
            <button type="button" className="btn btn--primary btn--lg" onClick={finishLesson}>
              Mark course done{nextId ? ' & next' : ''}
            </button>
            <Link className="btn btn--ghost" to={`/day/${day.day}`}>
              Back to schedule
            </Link>
          </div>
        </article>
      ) : (
        <>
          <section className="olympiad-note">
            <h2>In-app question paper</h2>
            <p>
              Tap one answer for each question. When you submit, you get a score right away — and it
              is saved in your progress report.
            </p>
          </section>
          <Quiz
            questions={block.quiz}
            minutes={plan.minutes}
            subject={plan.subject}
            prior={progress.completed[sessionKey(day.day, plan.id)]}
            onSubmit={finishQuiz}
          />
          <div className="session-footer">
            <Link className="btn btn--ghost" to="/reports">
              See my report
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
