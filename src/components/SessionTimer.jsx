import { useCountdown } from '../hooks/useCountdown'

export default function SessionTimer({ minutes, label }) {
  const timer = useCountdown(minutes, { autoStart: false })

  return (
    <div className={`timer ${timer.finished ? 'timer--done' : ''}`}>
      <div className="timer__meta">
        <span className="timer__label">{label}</span>
        <span className="timer__target">{minutes} min</span>
      </div>
      <div className="timer__display" aria-live="polite">
        {timer.display}
      </div>
      <div className="timer__bar" aria-hidden="true">
        <span style={{ width: `${timer.pct}%` }} />
      </div>
      <div className="timer__actions">
        {!timer.running && !timer.finished && (
          <button type="button" className="btn btn--primary" onClick={timer.start}>
            Start timer
          </button>
        )}
        {timer.running && (
          <button type="button" className="btn btn--ghost" onClick={timer.pause}>
            Pause
          </button>
        )}
        {(timer.finished || timer.remaining < minutes * 60) && (
          <button type="button" className="btn btn--ghost" onClick={timer.reset}>
            Reset
          </button>
        )}
        {timer.finished && <span className="timer__done-msg">Time’s up — finish calmly!</span>}
      </div>
    </div>
  )
}
