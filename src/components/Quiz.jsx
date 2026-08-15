import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { starsFromPct } from '../hooks/useProgress'

const LEVEL_LABEL = {
  logical: 'Logical',
  concept: 'Concept',
  achievers: 'Achievers',
}

export default function Quiz({ questions, subject, prior, onSubmit }) {
  const [answers, setAnswers] = useState(() => questions.map(() => null))
  const [submitted, setSubmitted] = useState(Boolean(prior?.score != null))
  const [score, setScore] = useState(prior?.score ?? null)

  const allAnswered = useMemo(() => answers.every((a) => a !== null), [answers])
  const hasLevels = questions.some((q) => q.level)
  const pct = score != null ? Math.round((score / questions.length) * 100) : null
  const stars = starsFromPct(pct)

  const choose = (qi, oi) => {
    if (submitted) return
    setAnswers((prev) => {
      const next = [...prev]
      next[qi] = oi
      return next
    })
  }

  const submit = () => {
    let s = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) s += 1
    })
    setScore(s)
    setSubmitted(true)
    onSubmit({
      score: s,
      total: questions.length,
      pct: Math.round((s / questions.length) * 100),
      at: Date.now(),
    })
  }

  const retry = () => {
    setAnswers(questions.map(() => null))
    setSubmitted(false)
    setScore(null)
  }

  return (
    <div className={`quiz quiz--${subject}`}>
      <div className="quiz__intro">
        <h2>Question paper</h2>
        <p>
          {questions.length} topic questions · tap one answer each · olympiad level
          {hasLevels ? ' · Logical · Concept · Achievers' : ''}
        </p>
        {submitted && score != null && (
          <div className="quiz__score-card">
            <p className="quiz__score">
              Score: <strong>{score}/{questions.length}</strong>
              <span className="quiz__pct">({pct}%)</span>
            </p>
            <p className="quiz__stars" aria-label={`${stars} stars`}>
              {'★'.repeat(stars)}
              <span className="stars__empty">{'★'.repeat(5 - stars)}</span>
            </p>
            <p className="muted small">
              {pct === 100
                ? 'Perfect paper!'
                : pct >= 75
                  ? 'Great work — stars for you!'
                  : 'Nice try — check the green answers and try again.'}
            </p>
            <Link className="btn btn--small" to="/reports">
              View report
            </Link>
          </div>
        )}
      </div>

      <ol className="quiz__list">
        {questions.map((q, qi) => {
          const chosen = answers[qi]
          const show = submitted
          return (
            <li key={`${qi}-${q.q}`} className="quiz__item">
              <p className="quiz__q">
                <span>{qi + 1}.</span> {q.q}
                {q.level && (
                  <em className={`level-tag level-tag--${q.level}`}>{LEVEL_LABEL[q.level] || q.level}</em>
                )}
              </p>
              <div className="quiz__options">
                {q.options.map((opt, oi) => {
                  let cls = 'opt'
                  if (show) {
                    if (oi === q.answer) cls += ' opt--correct'
                    else if (chosen === oi) cls += ' opt--wrong'
                  } else if (chosen === oi) {
                    cls += ' opt--picked'
                  }
                  return (
                    <button
                      key={`${opt}-${oi}`}
                      type="button"
                      className={cls}
                      onClick={() => choose(qi, oi)}
                      disabled={submitted}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {show && q.explain && (
                <p className="quiz__explain">
                  <strong>Why:</strong> {q.explain}
                </p>
              )}
            </li>
          )
        })}
      </ol>

      <div className="session-footer">
        {!submitted ? (
          <button
            type="button"
            className="btn btn--primary btn--lg"
            disabled={!allAnswered}
            onClick={submit}
          >
            Submit & see score
          </button>
        ) : (
          <button type="button" className="btn btn--ghost btn--lg" onClick={retry}>
            Try paper again
          </button>
        )}
      </div>
    </div>
  )
}
