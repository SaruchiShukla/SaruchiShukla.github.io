import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import DaySchedule from './components/DaySchedule'
import Session from './components/Session'
import Subjects from './components/Subjects'
import Topics from './components/Topics'
import Reports from './components/Reports'
import { loadProgress, saveProgress, sessionKey } from './hooks/useProgress'
import { LEARNER } from './data/learner'
import './App.css'

export default function App() {
  const [progress, setProgress] = useState(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  useEffect(() => {
    setProgress((p) => {
      if (p.learnerName?.trim()) return p
      return { ...p, learnerName: LEARNER.name }
    })
  }, [])

  const onName = useCallback((learnerName) => {
    setProgress((p) => ({ ...p, learnerName }))
  }, [])

  const markComplete = useCallback((day, sessionId, result = {}) => {
    setProgress((p) => {
      const entry = {
        at: Date.now(),
        ...result,
      }
      const next = {
        ...p,
        lastDay: day,
        completed: {
          ...p.completed,
          [sessionKey(day, sessionId)]: entry,
        },
        attempts: Array.isArray(p.attempts) ? [...p.attempts] : [],
      }

      // Save scored papers into history for daily/weekly/monthly trends
      if (result.score != null && result.total != null) {
        const subject = sessionId.startsWith('maths') ? 'maths' : 'science'
        next.attempts.push({
          day,
          sessionId,
          subject,
          score: result.score,
          total: result.total,
          pct: result.pct ?? Math.round((result.score / result.total) * 100),
          at: entry.at,
        })
      }

      return next
    })
  }, [])

  const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

  return (
    <BrowserRouter basename={routerBasename}>
      <div className="app-shell">
        <Header progress={progress} onName={onName} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home progress={progress} />} />
            <Route path="/reports" element={<Reports progress={progress} />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subjectId" element={<Subjects />} />
            <Route path="/topics" element={<Topics progress={progress} />} />
            <Route path="/topics/:subjectId" element={<Topics progress={progress} />} />
            <Route path="/topics/:subjectId/:chapterId" element={<Topics progress={progress} />} />
            <Route path="/day/:dayNum" element={<DaySchedule progress={progress} />} />
            <Route
              path="/day/:dayNum/:sessionId"
              element={<Session progress={progress} markComplete={markComplete} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p>BloomDay · Saruchi Shukla · Vidyashilp ICSE Class 3 · 30-min courses · 15Q exams</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}
