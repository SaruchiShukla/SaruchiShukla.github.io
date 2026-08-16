import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { starsFromPct } from '../hooks/useProgress'

const LEVEL_LABEL = {
  logical: 'Warm-up',
  concept: 'Practice',
  achievers: 'Challenge',
}

export default function Quiz({ questions, subject, prior, onSubmit, nextLabel, onContinue }) {
  const [answers, setAnswers] = useState(() => questions.map(() => null))
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(Boolean(prior?.score != null))
  const [score, setScore] = useState(prior?.score ?? null)

  const answeredCount = useMemo(() => answers.filter((a) => a !== null).length, [answers])
  const current = questions[step]
  const chosen = answers[step]
  const pct = score != null ? Math.round((score / questions.length) * 100) : null
  const stars = starsFromPct(pct)
  const isLast = step >= questions.length - 1

  const choose = (oi) => {
    if (submitted) return
    setAnswers((prev) => {
      const next = [...prev]
      next[step] = oi
      return next
    })
  }

  const goNext = () => {
    if (chosen === null) return
    if (!isLast) setStep((s) => s + 1)
  }

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const submit = () => {
    if (answers.some((a) => a === null)) return
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
    setStep(0)
    setSubmitted(false)
    setScore(null)
  }

  if (submitted && score != null) {
    const cheer =
      pct === 100
        ? 'Perfect, Saruchi! All stars for you!'
        : pct >= 75
          ? 'Wonderful! You did so well!'
          : pct >= 50
            ? 'Good try! Look at the green answers, then try again.'
            : 'It’s okay — learning takes practice. Try once more!'

    return (
      <div className={`quiz quiz--${subject} quiz--done`}>
        <div className="quiz__celebrate">
          <p className="quiz__celebrate-eyebrow">Exam finished</p>
          <h2>You got {score} out of {questions.length}</h2>
          <p className="quiz__stars" aria-label={`${stars} stars`}>
            {'★'.repeat(stars)}
            <span className="stars__empty">{'★'.repeat(5 - stars)}</span>
          </p>
          <p className="quiz__cheer">{cheer}</p>
          <div className="quiz__done-actions">
            {onContinue ? (
              <button type="button" className="btn btn--primary btn--lg" onClick={onContinue}>
                {nextLabel || 'Continue'}
              </button>
            ) : null}
            <button type="button" className="btn btn--ghost btn--lg" onClick={retry}>
              Try exam again
            </button>
            <Link className="btn btn--ghost" to="/reports">
              See my report
            </Link>
          </div>
        </div>

        <details className="quiz__review">
          <summary>See answers ({questions.length} questions)</summary>
          <ol className="quiz__list">
            {questions.map((q, qi) => {
              const picked = answers[qi]
              return (
                <li key={`${qi}-${q.q}`} className="quiz__item">
                  <p className="quiz__q">
                    <span>{qi + 1}.</span> {q.q}
                  </p>
                  <div className="quiz__options">
                    {q.options.map((opt, oi) => {
                      let cls = 'opt'
                      if (oi === q.answer) cls += ' opt--correct'
                      else if (picked === oi) cls += ' opt--wrong'
                      return (
                        <button key={`${opt}-${oi}`} type="button" className={cls} disabled>
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                  {q.explain ? (
                    <p className="quiz__explain">
                      <strong>Why:</strong> {q.explain}
                    </p>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </details>
      </div>
    )
  }

  return (
    <div className={`quiz quiz--${subject}`}>
      <div className="quiz__intro">
        <h2>Let’s do the exam!</h2>
        <p>
          One question at a time · tap your answer · no hurry
        </p>
        <div className="quiz__progress" aria-label={`Question ${step + 1} of ${questions.length}`}>
          <div className="quiz__progress-bar">
            <span style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
          </div>
          <p className="muted small">
            Question <strong>{step + 1}</strong> of {questions.length}
            {answeredCount > 0 ? ` · ${answeredCount} answered` : ''}
          </p>
        </div>
      </div>

      <div className="quiz__step">
        <p className="quiz__q">
          <span>{step + 1}.</span> {current.q}
          {current.level && (
            <em className={`level-tag level-tag--${current.level}`}>
              {LEVEL_LABEL[current.level] || current.level}
            </em>
          )}
        </p>
        <div className="quiz__options">
          {current.options.map((opt, oi) => (
            <button
              key={`${opt}-${oi}`}
              type="button"
              className={`opt ${chosen === oi ? 'opt--picked' : ''}`}
              onClick={() => choose(oi)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="session-footer quiz__nav">
        <button type="button" className="btn btn--ghost" onClick={goBack} disabled={step === 0}>
          Back
        </button>
        {!isLast ? (
          <button
            type="button"
            className="btn btn--primary btn--lg"
            disabled={chosen === null}
            onClick={goNext}
          >
            Next question
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary btn--lg"
            disabled={answers.some((a) => a === null)}
            onClick={submit}
          >
            Finish & see stars
          </button>
        )}
      </div>
      {isLast && answers.some((a) => a === null) ? (
        <p className="muted small quiz__hint">
          Answer every question first (use Back to fill any you skipped).
        </p>
      ) : null}
    </div>
  )
}
