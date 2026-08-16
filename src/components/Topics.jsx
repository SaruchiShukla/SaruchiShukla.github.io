import { Link, useParams, useSearchParams } from 'react-router-dom'
import { LEARNER, SUBJECTS } from '../data/curriculum'
import {
  getChapter,
  getChapters,
  getDetailLink,
  pathForIcseTag,
  TOPIC_INDEX,
} from '../data/topicIndex'
import { dayCompletion, isSessionDone } from '../hooks/useProgress'

function LessonRows({ subjectId, lessons, progress }) {
  return (
    <ul className="topic-list">
      {lessons.map((lesson) => {
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
              {lesson.icse ? (
                <Link to={pathForIcseTag(subjectId, lesson.icse)} className="icse-line icse-line--link">
                  {lesson.icse}
                </Link>
              ) : null}
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
  )
}

function DetailChips({ chapter, activeSlug }) {
  if (!chapter.detailLinks?.length) return null
  return (
    <div className="detail-chips" aria-label={`${chapter.name} topics`}>
      {chapter.detailLinks.map((d) => (
        <Link
          key={d.slug}
          to={d.path}
          className={`detail-chip ${activeSlug === d.slug ? 'detail-chip--active' : ''}`}
        >
          {d.label}
        </Link>
      ))}
    </div>
  )
}

export default function Topics({ progress }) {
  const { subjectId, chapterId } = useParams()
  const [params] = useSearchParams()
  const focus = params.get('focus') || ''

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
            Jump by syllabus chapter and sub-topic — open the 30‑min course or 15Q exam without
            following the day schedule.
          </p>
        </header>

        <div className="topics-overview">
          {Object.entries(TOPIC_INDEX).map(([sid, chapters]) => {
            const sub = SUBJECTS[sid]
            return (
              <section key={sid} className={`topics-overview__col topics-overview__col--${sid}`}>
                <h2>
                  <Link to={`/topics/${sid}`} className={`heading-link heading-link--${sid}`}>
                    {sub.name} →
                  </Link>
                </h2>
                <ul className="chapter-link-list chapter-link-list--rich">
                  {chapters.map((ch) => (
                    <li key={ch.id}>
                      <h4 className="chapter-heading">
                        <Link
                          to={`/topics/${sid}/${ch.id}`}
                          className={`heading-link heading-link--${sid}`}
                        >
                          {ch.name} →
                        </Link>
                      </h4>
                      <DetailChips chapter={ch} />
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
      <div className={`page topics-page topics-page--${subjectId}`}>
        <nav className="crumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/topics">Topics</Link>
          <span>/</span>
          <span>{sub.name}</span>
        </nav>
        <header className="page-head">
          <h1>{sub.name} · by chapter</h1>
          <p className="muted">Pick a chapter or a highlighted sub-topic.</p>
        </header>
        <ul className="chapter-cards">
          {chapters.map((ch) => (
            <li key={ch.id}>
              <div className={`chapter-card chapter-card--${subjectId}`}>
                <Link to={`/topics/${subjectId}/${ch.id}`} className="chapter-card__main">
                  <h3 className={`heading-link heading-link--${subjectId}`}>{ch.name} →</h3>
                  <span>{ch.lessonCount} lessons</span>
                </Link>
                <DetailChips chapter={ch} />
              </div>
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

  const focused = getDetailLink(subjectId, chapterId, focus)
  const showFocused = Boolean(focused && focus)

  return (
    <div className={`page topics-page topics-page--${subjectId}`}>
      <nav className="crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/topics">Topics</Link>
        <span>/</span>
        <Link to={`/topics/${subjectId}`}>{sub.name}</Link>
        <span>/</span>
        <Link to={`/topics/${subjectId}/${chapterId}`}>{chapter.name}</Link>
        {showFocused ? (
          <>
            <span>/</span>
            <span>{focused.label}</span>
          </>
        ) : null}
      </nav>
      <header className="page-head">
        <p className="eyebrow">ICSE Class 3 · {sub.name}</p>
        <h1>
          <Link
            to={
              showFocused
                ? `/topics/${subjectId}/${chapterId}`
                : `/topics/${subjectId}/${chapterId}`
            }
            className={`heading-link heading-link--${subjectId}`}
          >
            {showFocused ? focused.label : chapter.name}
          </Link>
        </h1>
        <p className="muted">
          {showFocused
            ? `Part of ${chapter.name} · ${focused.lessonCount || chapter.lessonCount} linked lessons`
            : `Chapter topics below — tap a chip to filter.`}
        </p>
        <DetailChips chapter={chapter} activeSlug={focus} />
        {showFocused ? (
          <p className="muted small">
            <Link to={`/topics/${subjectId}/${chapterId}`}>Show whole chapter</Link>
          </p>
        ) : (
          <p className="muted small">{chapter.lessonCount} linked lessons in BloomDay</p>
        )}
      </header>

      {showFocused ? (
        <section className="topic-group">
          <h2>{focused.label}</h2>
          <LessonRows subjectId={subjectId} lessons={focused.lessons} progress={progress} />
        </section>
      ) : (
        chapter.subtopics.map((group) => (
          <section key={group.label} className="topic-group">
            <h2>
              <Link
                to={pathForIcseTag(subjectId, group.label)}
                className={`heading-link heading-link--${subjectId}`}
              >
                {group.label} →
              </Link>
            </h2>
            <LessonRows subjectId={subjectId} lessons={group.lessons} progress={progress} />
          </section>
        ))
      )}
    </div>
  )
}
