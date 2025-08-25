export default function DashboardView() {
  const schedule = [
    { time: "6:00 PM", duration: "90 min", name: "Lee Park", guests: 2, salesType: "Walk-in", details: "Table 4 requested" },
    { time: "6:30 PM", duration: "60 min", name: "Chen Wu", guests: 3, salesType: "Online", details: "Birthday party" },
    { time: "7:00 PM", duration: "120 min", name: "Kim Davis", guests: 5, salesType: "Member", details: "VIP member" },
  ];
  const activity = [
    "Table P2 session started",
    "Spotify playlist changed to \"Evening Vibes\"",
    "New reservation: Kim Davis @ 7PM",
    "Low inventory alert: Pool Cue Tips",
  ];
  return (
    <>
      <div className="grid kpis">
        <div className="card">
          <div className="weather-widget">
            <h3>Weather</h3>
            <div className="weather-main">
              <span className="weather-icon">☀️</span>
              <div className="weather-info">
                <span className="weather-temp">72°F</span>
                <span className="weather-desc">Clear skies</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h3>Active Tables</h3>
          <div className="big">7</div>
          <div className="muted">+2 since 1 hr ago</div>
        </div>
        <div className="card">
          <h3>Avg Session</h3>
          <div className="big">01:12</div>
          <div className="muted">All activities</div>
        </div>
        <div className="card">
          <h3>Revenue Today</h3>
          <div className="big">$4,820</div>
          <div className="muted">Target $6,500</div>
        </div>
      </div>
      <div className="split">
        <div className="card">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="row"><h3 style={{ margin: 0 }}>Quick Actions</h3></div>
            <div className="tabs" role="tablist">
              <button className="tab active">🏓 Ping Pong</button>
              <button className="tab">⛳ iGolf</button>
              <button className="tab">🎤 Karaoke</button>
              <button className="tab">🎱 Billiards</button>
            </div>
          </div>
          <div className="row" style={{ marginTop: 10 }}>
            <button className="btn primary">➕ Start Session</button>
            <button className="btn">📅 Schedule</button>
            <button className="btn">📝 Order Form</button>
            <button className="btn">🎵 Play Vibe</button>
          </div>
        </div>
        <div className="card">
          <h3>Recent Activity</h3>
          <div className="list">
            {activity.map((e) => (
              <div key={e} className="item">
                <div>{e}</div>
                <button className="btn">👁️</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Today's Reservations</h3>
          <button className="btn">📅 Pull from Google Calendar</button>
        </div>
        <div className="location-buttons">
          <button className="location-btn active">🏓 Ping Pong</button>
          <button className="location-btn">⛳ iGolf</button>
          <button className="location-btn">🎤 Karaoke</button>
          <button className="location-btn">🎱 Billiards</button>
        </div>
        <table className="table" aria-label="Reservations">
          <thead>
            <tr>
              <th>Time (Duration)</th>
              <th>Name (Host)</th>
              <th>Guests</th>
              <th>Sales Type</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((r) => (
              <tr key={r.time}>
                <td>{r.time} ({r.duration})</td>
                <td>{r.name}</td>
                <td>{r.guests}</td>
                <td>{r.salesType}</td>
                <td>{r.details}</td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn" title="Edit">✏️</button>
                    <button className="icon-btn" title="SMS">📱</button>
                    <button className="icon-btn" title="Email">📧</button>
                    <button className="icon-btn" title="Memo">📝</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
