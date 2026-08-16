import { Link, useParams } from 'react-router-dom'
import { LEARNER, SUBJECTS } from '../data/curriculum'
import { getChapter, getChapters, TOPIC_INDEX } from '../data/topicIndex'
import { dayCompletion, isSessionDone } from '../hooks/useProgress'

export default function Topics({ progress }) {
  const { subjectId, chapterId } = useParams()

  if (!subjectId) {
    return (
      <div className="page topics-page">
        <nav className="crumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Topics</span>
        </nav>
        <header className="page-head">
          <h1>{LEARNER.firstName}’s ICSE topics</h1>
          <p className="muted">
            Jump by syllabus chapter — open the 30‑min course or 15Q exam for any topic, without
            following the day schedule.
          </p>
        </header>

        <div className="topics-overview">
          {Object.entries(TOPIC_INDEX).map(([sid, chapters]) => {
            const sub = SUBJECTS[sid]
            return (
              <section key={sid} className={`topics-overview__col topics-overview__col--${sid}`}>
                <h2>
                  <Link to={`/topics/${sid}`}>{sub.name}</Link>
                </h2>
                <ul className="chapter-link-list">
                  {chapters.map((ch) => (
                    <li key={ch.id}>
                      <Link to={`/topics/${sid}/${ch.id}`}>
                        <strong>{ch.name}</strong>
                        <span className="muted small">{ch.lessonCount} lessons</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    )
  }

  const sub = SUBJECTS[subjectId]
  if (!sub) {
    return (
      <div className="page">
        <p>Unknown subject.</p>
        <Link to="/topics">Back to topics</Link>
      </div>
    )
  }

  if (!chapterId) {
    const chapters = getChapters(subjectId)
    return (
      <div className="page topics-page">
        <nav className="crumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/topics">Topics</Link>
          <span>/</span>
          <span>{sub.name}</span>
        </nav>
        <header className="page-head">
          <h1>{sub.name} · by chapter</h1>
          <p className="muted">Pick a chapter to see every linked course day.</p>
        </header>
        <ul className="chapter-cards">
          {chapters.map((ch) => (
            <li key={ch.id}>
              <Link to={`/topics/${subjectId}/${ch.id}`} className={`chapter-card chapter-card--${subjectId}`}>
                <h3>{ch.name}</h3>
                {ch.details?.length ? (
                  <p className="muted small">{ch.details.slice(0, 4).join(' · ')}</p>
                ) : null}
                <span>{ch.lessonCount} lessons →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const chapter = getChapter(subjectId, chapterId)
  if (!chapter) {
    return (
      <div className="page">
        <p>Unknown chapter.</p>
        <Link to={`/topics/${subjectId}`}>Back</Link>
      </div>
    )
  }

  return (
    <div className="page topics-page">
      <nav className="crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/topics">Topics</Link>
        <span>/</span>
        <Link to={`/topics/${subjectId}`}>{sub.name}</Link>
        <span>/</span>
        <span>{chapter.name}</span>
      </nav>
      <header className="page-head">
        <p className="eyebrow">ICSE Class 3 · {sub.name}</p>
        <h1>{chapter.name}</h1>
        {chapter.details?.length ? (
          <p className="muted">Covers: {chapter.details.join(' · ')}</p>
        ) : null}
        <p className="muted small">{chapter.lessonCount} linked lessons in BloomDay</p>
      </header>

      {chapter.subtopics.map((group) => (
        <section key={group.label} className="topic-group">
          <h2>{group.label}</h2>
          <ul className="topic-list">
            {group.lessons.map((lesson) => {
              const lessonId = `${subjectId}-lesson`
              const quizId = `${subjectId}-quiz`
              const lessonDone = isSessionDone(progress, lesson.day, lessonId)
              const quizDone = isSessionDone(progress, lesson.day, quizId)
              const c = dayCompletion(progress, lesson.day)
              return (
                <li key={`${lesson.day}-${lesson.topic}`} className={`topic-row topic-row--${subjectId}`}>
                  <div>
                    <span className="topic-day">
                      Day {lesson.day}
                      {c.done === c.total ? ' · done' : ''}
                    </span>
                    <strong>{lesson.topic}</strong>
                  </div>
                  <div className="topic-actions">
                    <Link className="btn btn--small" to={lesson.lessonPath}>
                      {lessonDone ? 'Review course' : 'Course 30m'}
                    </Link>
                    <Link className="btn btn--small btn--ghost" to={lesson.quizPath}>
                      {quizDone ? 'Review exam' : 'Exam 15Q'}
                    </Link>
                    <Link className="btn btn--small btn--ghost" to={lesson.dayPath}>
                      Full day
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
