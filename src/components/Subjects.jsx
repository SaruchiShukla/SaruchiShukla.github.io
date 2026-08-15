import { Link, useParams } from 'react-router-dom'
import { DAYS, SUBJECTS } from '../data/curriculum'

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
          <h1>Subjects</h1>
          <p className="muted">ICSE Class 3 Maths and Science — linked by everyday schedule.</p>
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
        <p className="eyebrow">ICSE Class 3 · Bangalore</p>
        <h1>{sub.name}</h1>
        <p className="muted">{sub.blurb}. Each day has a 30-minute course and a 15-question olympiad paper.</p>
      </header>
      <ul className="topic-list">
        {DAYS.map((d) => {
          const block = subjectId === 'maths' ? d.maths : d.science
          const lessonId = `${subjectId}-lesson`
          const quizId = `${subjectId}-quiz`
          return (
            <li key={d.day} className={`topic-row topic-row--${subjectId}`}>
              <div>
                <span className="topic-day">Day {d.day}</span>
                <strong>{block.topic}</strong>
                <span className="muted">{d.title}</span>
              </div>
              <div className="topic-actions">
                <Link className="btn btn--small" to={`/day/${d.day}/${lessonId}`}>
                  Course 30m
                </Link>
                <Link className="btn btn--small btn--ghost" to={`/day/${d.day}/${quizId}`}>
                  Paper 15Q
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
