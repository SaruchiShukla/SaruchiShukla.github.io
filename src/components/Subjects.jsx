import { Link, useParams } from 'react-router-dom'
import { APP, COURSE_MONTHS, DAYS, LEARNER, SCHOOL_MAP, SUBJECTS } from '../data/curriculum'
import { IcseLink } from './IcseLink'

export default function Subjects() {
  const { subjectId } = useParams()

  if (!subjectId) {
    return (
      <div className="page">
        <nav className="crumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Subjects</span>
        </nav>
        <header className="page-head">
          <h1>{LEARNER.firstName}’s subjects</h1>
          <p className="muted">
            {SCHOOL_MAP.name} · ICSE Class 3 Maths and Science — mapped unit by unit.
          </p>
        </header>
        <div className="subject-grid">
          {Object.values(SUBJECTS).map((sub) => (
            <Link key={sub.id} to={`/subjects/${sub.id}`} className={`subject-tile subject-tile--${sub.id}`}>
              <h3>{sub.name}</h3>
              <p>{sub.blurb}</p>
              <span>Open syllabus path →</span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const sub = SUBJECTS[subjectId]
  if (!sub) {
    return (
      <div className="page">
        <p>Unknown subject.</p>
        <Link to="/subjects">Back</Link>
      </div>
    )
  }

  return (
    <div className="page">
      <nav className="crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/subjects">Subjects</Link>
        <span>/</span>
        <span>{sub.name}</span>
      </nav>
      <header className="page-head">
        <p className="eyebrow">
          {LEARNER.name} · {SCHOOL_MAP.name} · ICSE · {APP.totalDays} days
        </p>
        <h1>
          <Link to={`/topics/${subjectId}`} className={`heading-link heading-link--${subjectId}`}>
            {sub.name} →
          </Link>
        </h1>
        <p className="muted">{sub.blurb}</p>
      </header>
      {COURSE_MONTHS.map((m) => {
        const unit = subjectId === 'maths' ? m.mathsUnit : m.scienceUnit
        return (
          <section key={m.month} className="month-block">
            <h2>
              Month {m.month}: {m.name}
            </h2>
            <p className="muted small">
              ICSE focus —{' '}
              <IcseLink subject={subjectId} unit={unit}>
                {unit}
              </IcseLink>
            </p>
            <ul className="topic-list">
              {DAYS.filter((d) => d.month === m.month).map((d) => {
                const block = subjectId === 'maths' ? d.maths : d.science
                const lessonId = `${subjectId}-lesson`
                const quizId = `${subjectId}-quiz`
                return (
                  <li key={d.day} className={`topic-row topic-row--${subjectId}`}>
                    <div>
                      <span className="topic-day">Day {d.day}</span>
                      <IcseLink subject={subjectId} icse={block.icse} className="session-topic-link">
                        <strong>{block.topic}</strong>
                      </IcseLink>
                      {block.icse ? (
                        <IcseLink
                          subject={subjectId}
                          icse={block.icse}
                          className="icse-line icse-line--link"
                        >
                          {block.icse}
                        </IcseLink>
                      ) : null}
                    </div>
                    <div className="topic-actions">
                      <Link className="btn btn--small" to={`/day/${d.day}/${lessonId}`}>
                        Course 30m
                      </Link>
                      <Link className="btn btn--small btn--ghost" to={`/day/${d.day}/${quizId}`}>
                        Exam 15Q
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
