import { Link } from 'react-router-dom'
import { APP } from '../data/curriculum'

export default function Header({ progress, onName }) {
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
        <label className="name-field">
          <span>Learner</span>
          <input
            type="text"
            placeholder="Your name"
            value={progress.learnerName}
            onChange={(e) => onName(e.target.value)}
            maxLength={24}
          />
        </label>
      </div>
    </header>
  )
}
