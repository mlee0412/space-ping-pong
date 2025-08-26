"use client"

export default function DashboardView() {
  return (
    <div className="grid gap-4">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 text-sm font-medium">Weather</h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl">☀️</span>
            <div className="flex flex-col">
              <span className="text-xl font-bold">72°F</span>
              <span className="text-sm text-muted-foreground">Clear skies</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 text-sm font-medium">Active Tables</h3>
          <div className="text-2xl font-bold">7</div>
          <div className="text-sm text-muted-foreground">+2 since 1 hr ago</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 text-sm font-medium">Avg Session</h3>
          <div className="text-2xl font-bold">01:12</div>
          <div className="text-sm text-muted-foreground">All activities</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 text-sm font-medium">Revenue Today</h3>
          <div className="text-2xl font-bold">$4,820</div>
          <div className="text-sm text-muted-foreground">Target $6,500</div>
        </div>
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-medium">Quick Actions</h3>
            <div className="flex gap-2" role="tablist">
              <button className="rounded-full bg-accent px-3 py-1 text-sm">🏓 Ping Pong</button>
              <button className="rounded-full px-3 py-1 text-sm hover:bg-accent">⛳ iGolf</button>
              <button className="rounded-full px-3 py-1 text-sm hover:bg-accent">🎤 Karaoke</button>
              <button className="rounded-full px-3 py-1 text-sm hover:bg-accent">🎱 Billiards</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-md border px-4 py-2 text-sm">➕ Start Session</button>
            <button className="rounded-md border px-4 py-2 text-sm">📅 Schedule</button>
            <button className="rounded-md border px-4 py-2 text-sm">📝 Order Form</button>
            <button className="rounded-md border px-4 py-2 text-sm">🎵 Play Vibe</button>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-4 font-medium">Recent Activity</h3>
          <div className="grid gap-2">
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Table P2 session started</span>
              <button className="rounded-md border px-2 py-1 text-sm">👁️</button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Spotify playlist changed</span>
              <button className="rounded-md border px-2 py-1 text-sm">👁️</button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>New reservation: Kim Davis</span>
              <button className="rounded-md border px-2 py-1 text-sm">👁️</button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Low inventory alert: Pool Cue Tips</span>
              <button className="rounded-md border px-2 py-1 text-sm">👁️</button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Reservations */}
      <div className="rounded-lg border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-medium">Today's Reservations</h3>
          <button className="rounded-md border px-3 py-1 text-sm">📅 Pull from Google Calendar</button>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          <button className="rounded-md bg-accent px-3 py-1 text-sm">🏓 Ping Pong</button>
          <button className="rounded-md px-3 py-1 text-sm hover:bg-accent">⛳ iGolf</button>
          <button className="rounded-md px-3 py-1 text-sm hover:bg-accent">🎤 Karaoke</button>
          <button className="rounded-md px-3 py-1 text-sm hover:bg-accent">🎱 Billiards</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr>
                <th className="p-2">Time (Duration)</th>
                <th className="p-2">Name (Host)</th>
                <th className="p-2">Guests</th>
                <th className="p-2">Sales Type</th>
                <th className="p-2">Details</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">6:00 PM (90 min)</td>
                <td className="p-2">Lee Park</td>
                <td className="p-2">2</td>
                <td className="p-2">Walk-in</td>
                <td className="p-2">Table 4 requested</td>
                <td className="p-2">
                  <button className="rounded-md border px-2 py-1 text-sm">✏️</button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2">6:30 PM (60 min)</td>
                <td className="p-2">Chen Wu</td>
                <td className="p-2">3</td>
                <td className="p-2">Online</td>
                <td className="p-2">Birthday party</td>
                <td className="p-2">
                  <button className="rounded-md border px-2 py-1 text-sm">✏️</button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2">7:00 PM (120 min)</td>
                <td className="p-2">Kim Davis</td>
                <td className="p-2">5</td>
                <td className="p-2">Member</td>
                <td className="p-2">VIP member</td>
                <td className="p-2">
                  <button className="rounded-md border px-2 py-1 text-sm">✏️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

