import { useEffect, useState } from 'react'
import { explainAnswer } from '../services/aiExplain'

export default function AiExplainPanel({ subject, question, options, correctIndex, chosenIndex, shortExplain }) {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [source, setSource] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setText('')
    setSource('')
    setError('')
  }, [question, chosenIndex, correctIndex])

  const run = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await explainAnswer({
        subject,
        question,
        options,
        correctIndex,
        chosenIndex,
        shortExplain,
      })
      setText(result.text)
      setSource(result.source)
    } catch {
      setError('Could not explain right now. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-explain">
      <button type="button" className="btn btn--small btn--ai" onClick={run} disabled={loading}>
        {loading ? 'Thinking…' : 'Explain step by step'}
      </button>
      {!text && !loading ? (
        <p className="muted small ai-explain__hint">
          AI tutor is built into BloomDay — tap for clear right/wrong steps.
        </p>
      ) : null}
      {error ? <p className="ai-explain__error">{error}</p> : null}
      {text ? (
        <div className="ai-explain__box">
          <p className="ai-explain__label">
            Step-by-step {source === 'gemini' ? '(AI tutor)' : '(clear steps)'}
          </p>
          {text.split(/\n+/).map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
    </div>
  )
}
