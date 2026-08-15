import { useEffect, useRef, useState } from 'react'

/** Countdown timer. durationSec from minutes. Calls onComplete once when it hits 0. */
export function useCountdown(minutes, { autoStart = false, onComplete } = {}) {
  const total = Math.max(1, Math.round(minutes * 60))
  const [remaining, setRemaining] = useState(total)
  const [running, setRunning] = useState(autoStart)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    setRemaining(total)
    setRunning(autoStart)
    doneRef.current = false
  }, [total, autoStart])

  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id)
          setRunning(false)
          if (!doneRef.current) {
            doneRef.current = true
            onCompleteRef.current?.()
          }
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  const pct = Math.round(((total - remaining) / total) * 100)

  return {
    remaining,
    display: `${mm}:${ss}`,
    pct,
    running,
    finished: remaining === 0,
    start: () => setRunning(true),
    pause: () => setRunning(false),
    reset: () => {
      doneRef.current = false
      setRemaining(total)
      setRunning(false)
    },
  }
}
