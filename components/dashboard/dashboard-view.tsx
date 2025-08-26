"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardView() {
  return (
    <div className="grid gap-4">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card p-4">
          <h3 className="mb-2 text-sm font-medium">Weather</h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl">☀️</span>
            <div className="flex flex-col">
              <span className="text-xl font-bold">72°F</span>
              <span className="text-sm text-muted-foreground">Clear skies</span>
            </div>
          </div>
        </Card>
        <Card className="glass-card p-4">
          <h3 className="mb-2 text-sm font-medium">Active Tables</h3>
          <div className="text-2xl font-bold">7</div>
          <div className="text-sm text-muted-foreground">+2 since 1 hr ago</div>
        </Card>
        <Card className="glass-card p-4">
          <h3 className="mb-2 text-sm font-medium">Avg Session</h3>
          <div className="text-2xl font-bold">01:12</div>
          <div className="text-sm text-muted-foreground">All activities</div>
        </Card>
        <Card className="glass-card p-4">
          <h3 className="mb-2 text-sm font-medium">Revenue Today</h3>
          <div className="text-2xl font-bold">$4,820</div>
          <div className="text-sm text-muted-foreground">Target $6,500</div>
        </Card>
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass-card p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-medium">Quick Actions</h3>
            <div className="flex gap-2" role="tablist">
              <Button size="sm" className="rounded-full bg-accent px-3 py-1 text-sm hover:bg-accent">
                🏓 Ping Pong
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-sm hover:bg-accent">
                ⛳ iGolf
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-sm hover:bg-accent">
                🎤 Karaoke
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-sm hover:bg-accent">
                🎱 Billiards
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              ➕ Start Session
            </Button>
            <Button variant="outline" size="sm">
              📅 Schedule
            </Button>
            <Button variant="outline" size="sm">
              📝 Order Form
            </Button>
            <Button variant="outline" size="sm">
              🎵 Play Vibe
            </Button>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <h3 className="mb-4 font-medium">Recent Activity</h3>
          <div className="grid gap-2">
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Table P2 session started</span>
              <Button variant="outline" size="sm">
                👁️
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Spotify playlist changed</span>
              <Button variant="outline" size="sm">
                👁️
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>New reservation: Kim Davis</span>
              <Button variant="outline" size="sm">
                👁️
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Low inventory alert: Pool Cue Tips</span>
              <Button variant="outline" size="sm">
                👁️
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Reservations */}
      <Card className="glass-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-medium">Today's Reservations</h3>
          <Button variant="outline" size="sm" className="px-3 py-1">
            📅 Pull from Google Calendar
          </Button>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button size="sm" className="rounded-md bg-accent px-3 py-1 text-sm">
            🏓 Ping Pong
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-md px-3 py-1 text-sm hover:bg-accent"
          >
            ⛳ iGolf
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-md px-3 py-1 text-sm hover:bg-accent"
          >
            🎤 Karaoke
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-md px-3 py-1 text-sm hover:bg-accent"
          >
            🎱 Billiards
          </Button>
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
                  <Button variant="outline" size="sm">
                    ✏️
                  </Button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2">6:30 PM (60 min)</td>
                <td className="p-2">Chen Wu</td>
                <td className="p-2">3</td>
                <td className="p-2">Online</td>
                <td className="p-2">Birthday party</td>
                <td className="p-2">
                  <Button variant="outline" size="sm">
                    ✏️
                  </Button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2">7:00 PM (120 min)</td>
                <td className="p-2">Kim Davis</td>
                <td className="p-2">5</td>
                <td className="p-2">Member</td>
                <td className="p-2">VIP member</td>
                <td className="p-2">
                  <Button variant="outline" size="sm">
                    ✏️
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
