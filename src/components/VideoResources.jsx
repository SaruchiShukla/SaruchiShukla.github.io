export default function VideoResources({ videos = [], subject }) {
  const playable = videos.filter((v) => v.embed)

  if (!playable.length) {
    return (
      <section className={`resources resources--${subject}`}>
        <h2>Watch & learn</h2>
        <p className="muted">Today’s lesson story is ready below. Start the timer and read together.</p>
      </section>
    )
  }

  return (
    <section className={`resources resources--${subject}`}>
      <h2>Watch in the app</h2>
      <p className="muted small">Videos play here — no downloads, no extra websites.</p>

      <div className="video-grid">
        {playable.map((v) => (
          <article key={v.id} className="video-card">
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
              <strong>{v.title}</strong>
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
