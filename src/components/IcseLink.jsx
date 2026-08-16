import { Link } from 'react-router-dom'
import { pathForIcseTag, pathForUnitLabel } from '../data/topicIndex'

/** Clickable ICSE unit / tag heading */
export function IcseLink({ subject, icse, unit, children, className = '' }) {
  const to = icse ? pathForIcseTag(subject, icse) : pathForUnitLabel(subject, unit || children)
  return (
    <Link to={to} className={`icse-nav-link ${className}`.trim()}>
      {children}
    </Link>
  )
}
