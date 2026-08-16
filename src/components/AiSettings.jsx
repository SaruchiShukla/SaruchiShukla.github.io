import { useState } from 'react'
import { hasAiApiKey, loadAiApiKey, saveAiApiKey } from '../services/aiExplain'

export default function AiSettings() {
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState(() => loadAiApiKey())
  const [saved, setSaved] = useState(false)

  const onSave = () => {
    saveAiApiKey(key)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="ai-settings">
      <button type="button" className="btn btn--ghost btn--small" onClick={() => setOpen((v) => !v)}>
        {open ? 'Close settings' : 'AI settings'}
      </button>
      {open ? (
        <div className="ai-settings__panel">
          <h3>Parent · AI tutor key</h3>
          <p className="muted small">
            AI is already built into the live app. Only use this if you want to replace the key on
            this device. Restrict keys to{' '}
            <code>https://saruchishukla.github.io/*</code> in Google AI Studio.
          </p>
          <label className="ai-settings__field">
            <span>Gemini API key</span>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Paste key here"
              autoComplete="off"
            />
          </label>
          <div className="ai-settings__actions">
            <button type="button" className="btn btn--primary btn--small" onClick={onSave}>
              Save key
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--small"
              onClick={() => {
                setKey('')
                saveAiApiKey('')
                setSaved(true)
              }}
            >
              Clear
            </button>
            {saved ? <span className="pill pill--ok">Saved</span> : null}
            {hasAiApiKey() ? <span className="pill pill--ok">AI ready</span> : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
