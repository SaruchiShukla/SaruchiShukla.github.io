import { Link } from 'react-router-dom'
import { APP, LEARNER } from '../data/curriculum'
import AiSettings from './AiSettings'

export default function Header({ progress, onName }) {
  const name = progress.learnerName || LEARNER.name

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand__mark" aria-hidden="true" />
        <span className="brand__text">
          <strong>{APP.name}</strong>
          <small>{APP.tagline}</small>
        </span>
      </Link>
      <div className="header-right">
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/reports">Report</Link>
        </nav>
        <AiSettings />
        <div className="learner-chip" title={`${LEARNER.school} · ${LEARNER.board} ${LEARNER.grade}`}>
          <span className="learner-chip__label">For</span>
          <strong>{name}</strong>
        </div>
        <label className="name-field">
          <span>Learner</span>
          <input
            type="text"
            placeholder={LEARNER.name}
            value={progress.learnerName}
            onChange={(e) => onName(e.target.value)}
            maxLength={40}
          />
        </label>
      </div>
    </header>
  )
}
