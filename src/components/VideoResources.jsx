export default function VideoResources({ videos = [], subject, totalMinutes }) {
  const playable = videos.filter((v) => v.embed)
  const mins = totalMinutes || playable.reduce((s, v) => s + (v.minutes || 0), 0)

  if (!playable.length) {
    return (
      <section className={`resources resources--${subject}`}>
        <h2>30-minute topic course</h2>
        <p className="muted">Read the lesson notes below, then take the topic exam.</p>
      </section>
    )
  }

  return (
    <section className={`resources resources--${subject}`}>
      <h2>Consolidated ~{mins}-minute course video</h2>
      <p className="muted small">
        Watch in order — this playlist is today’s full topic course (about 30 minutes). Videos play
        here; no downloads.
      </p>

      <div className="video-grid">
        {playable.map((v, i) => (
          <article key={`${v.id}-${i}`} className="video-card">
            <div className="video-card__frame">
              <iframe
                src={v.embed}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-card__meta">
              <strong>
                Part {i + 1}: {v.title}
              </strong>
              <span>
                {v.channel}
                {v.minutes ? ` · ~${v.minutes} min` : ''}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
