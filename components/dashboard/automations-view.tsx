interface Workflow {
  id: string;
  name: string;
  desc: string;
  status: string;
}

export default function AutomationsView() {
  const workflows: Workflow[] = [
    { id: "spotify-playlist", name: "Spotify Playlist Control", desc: "Control venue music via Spotify", status: "ready" },
    { id: "music-vibe", name: "Set Music Vibe", desc: "Spotify → Chill playlist", status: "ready" },
    { id: "table-timer", name: "Table Timer Alert", desc: "Notify when session ends", status: "ready" },
    { id: "daily-report", name: "Daily Revenue Report", desc: "Generate end-of-day summary", status: "ready" },
  ];

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Workflows (Spotify Enabled)</h3>
        <div className="row">
          <button className="btn primary">➕ New Workflow</button>
          <button className="btn">⬆️ Deploy</button>
        </div>
      </div>
      <div className="list">
        {workflows.map((w) => (
          <div key={w.id} className="item">
            <div>
              <strong>{w.name}</strong>
              <div className="muted">{w.desc}</div>
            </div>
            <div className="row">
              <span className="muted">{w.status === "ready" ? "✅ Ready" : "⛔ Needs attention"}</span>
              <button className="btn">Run</button>
              <button className="btn">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
