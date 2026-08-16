import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { starsFromPct } from '../hooks/useProgress'
import AiExplainPanel from './AiExplainPanel'

const LEVEL_LABEL = {
  logical: 'Warm-up',
  concept: 'Practice',
  achievers: 'Challenge',
}

function emptyAnswers(n) {
  return Array.from({ length: n }, () => null)
}

export default function Quiz({ questions, subject, prior, onSubmit, nextLabel, onContinue }) {
  const savedAnswers = Array.isArray(prior?.answers) ? prior.answers : null
  const [answers, setAnswers] = useState(() =>
    savedAnswers?.length === questions.length ? savedAnswers : emptyAnswers(questions.length),
  )
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(Boolean(prior?.score != null))
  const [score, setScore] = useState(prior?.score ?? null)
  const [showReview, setShowReview] = useState(Boolean(prior?.score != null && prior?.score < prior?.total))

  const answeredCount = useMemo(() => answers.filter((a) => a !== null).length, [answers])
  const wrongItems = useMemo(() => {
    if (!submitted) return []
    return questions
      .map((q, qi) => ({
        qi,
        q,
        picked: answers[qi],
      }))
      .filter((row) => row.picked !== row.q.answer)
  }, [submitted, questions, answers])

  const current = questions[step]
  const chosen = answers[step]
  const pct = score != null ? Math.round((score / questions.length) * 100) : null
  const stars = starsFromPct(pct)
  const isLast = step >= questions.length - 1
  const wrongCount = wrongItems.length

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
    const wrong = questions.length - s
    setScore(s)
    setSubmitted(true)
    setShowReview(wrong > 0)
    onSubmit({
      score: s,
      total: questions.length,
      pct: Math.round((s / questions.length) * 100),
      answers: [...answers],
      at: Date.now(),
    })
  }

  const retry = () => {
    setAnswers(emptyAnswers(questions.length))
    setStep(0)
    setSubmitted(false)
    setScore(null)
    setShowReview(false)
  }

  if (submitted && score != null) {
    const cheer =
      pct === 100
        ? 'Perfect, Saruchi! All stars for you!'
        : pct >= 75
          ? 'Wonderful! Review any pink “Wrong” ones below.'
          : pct >= 50
            ? 'Good try! Open Review to see which ones were wrong.'
            : 'It’s okay — open Review, learn the green answers, then try again.'

    return (
      <div className={`quiz quiz--${subject} quiz--done`}>
        <div className="quiz__celebrate">
          <p className="quiz__celebrate-eyebrow">Exam finished</p>
          <h2>
            You got {score} out of {questions.length}
          </h2>
          <p className="quiz__stars" aria-label={`${stars} stars`}>
            {'★'.repeat(stars)}
            <span className="stars__empty">{'★'.repeat(5 - stars)}</span>
          </p>
          <p className="quiz__cheer">{cheer}</p>
          {wrongCount > 0 ? (
            <p className="quiz__wrong-summary">
              <strong>{wrongCount}</strong> question{wrongCount === 1 ? '' : 's'} wrong — tap Review
              to see them.
            </p>
          ) : (
            <p className="quiz__wrong-summary quiz__wrong-summary--ok">Every answer was correct!</p>
          )}
          <div className="quiz__done-actions">
            {wrongCount > 0 ? (
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={() => setShowReview(true)}
              >
                Review wrong answers
              </button>
            ) : null}
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

        {showReview ? (
          <section className="quiz__review quiz__review--open" id="exam-review">
            <div className="quiz__review-head">
              <h3>Review — wrong answers</h3>
              <button type="button" className="btn btn--ghost btn--small" onClick={() => setShowReview(false)}>
                Hide
              </button>
            </div>

            {wrongCount > 0 ? (
              <div className="quiz__wrong-jumps">
                <p className="muted small">Jump to a wrong question:</p>
                <div className="quiz__wrong-chips">
                  {wrongItems.map(({ qi }) => (
                    <a key={qi} className="quiz__wrong-chip" href={`#review-q-${qi + 1}`}>
                      Q{qi + 1}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <ol className="quiz__list">
              {questions.map((q, qi) => {
                const picked = answers[qi]
                const isCorrect = picked === q.answer
                const yourText = picked != null ? q.options[picked] : 'No answer'
                const rightText = q.options[q.answer]
                return (
                  <li
                    key={`${qi}-${q.q}`}
                    id={`review-q-${qi + 1}`}
                    className={`quiz__item quiz__item--review ${isCorrect ? 'quiz__item--ok' : 'quiz__item--bad'}`}
                  >
                    <div className="quiz__review-badge-row">
                      <span className={`quiz__badge ${isCorrect ? 'quiz__badge--ok' : 'quiz__badge--bad'}`}>
                        {isCorrect ? 'Correct' : 'Wrong'}
                      </span>
                      <span className="muted small">Question {qi + 1}</span>
                    </div>
                    <p className="quiz__q">
                      <span>{qi + 1}.</span> {q.q}
                    </p>
                    {!isCorrect ? (
                      <div className="quiz__answer-lines">
                        <p className="quiz__yours">
                          <strong>Your answer:</strong> {yourText}
                        </p>
                        <p className="quiz__right">
                          <strong>Right answer:</strong> {rightText}
                        </p>
                      </div>
                    ) : (
                      <p className="quiz__right">
                        <strong>Right answer:</strong> {rightText}
                      </p>
                    )}
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
                    <AiExplainPanel
                      subject={subject}
                      question={q.q}
                      options={q.options}
                      correctIndex={q.answer}
                      chosenIndex={picked}
                      shortExplain={q.explain}
                    />
                  </li>
                )
              })}
            </ol>
          </section>
        ) : wrongCount > 0 ? (
          <p className="muted small quiz__hint">
            Tip: tap <strong>Review wrong answers</strong> to see what to fix.
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className={`quiz quiz--${subject}`}>
      <div className="quiz__intro">
        <h2>Let’s do the exam!</h2>
        <p>One question at a time · tap your answer · no hurry</p>
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
