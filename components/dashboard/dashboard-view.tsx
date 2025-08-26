"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardView() {
  return (
    <div className="grid gap-4">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <span className="text-2xl">☀️</span>
            <div className="flex flex-col">
              <span className="text-xl font-bold">72°F</span>
              <CardDescription>Clear skies</CardDescription>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Tables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <CardDescription>+2 since 1 hr ago</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">01:12</div>
            <CardDescription>All activities</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,820</div>
            <CardDescription>Target $6,500</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="font-medium">Quick Actions</CardTitle>
            <div className="flex gap-2" role="tablist">
              <Button size="sm" className="rounded-full" variant="secondary">
                🏓 Ping Pong
              </Button>
              <Button size="sm" className="rounded-full" variant="ghost">
                ⛳ iGolf
              </Button>
              <Button size="sm" className="rounded-full" variant="ghost">
                🎤 Karaoke
              </Button>
              <Button size="sm" className="rounded-full" variant="ghost">
                🎱 Billiards
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Table P2 session started</span>
              <Button variant="outline" size="sm" className="px-2">
                👁️
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Spotify playlist changed</span>
              <Button variant="outline" size="sm" className="px-2">
                👁️
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>New reservation: Kim Davis</span>
              <Button variant="outline" size="sm" className="px-2">
                👁️
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Low inventory alert: Pool Cue Tips</span>
              <Button variant="outline" size="sm" className="px-2">
                👁️
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Reservations */}
      <Card>
        <CardHeader className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="font-medium">Today's Reservations</CardTitle>
          <Button variant="outline" size="sm">
            📅 Pull from Google Calendar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button size="sm" className="rounded-md" variant="secondary">
              🏓 Ping Pong
            </Button>
            <Button size="sm" className="rounded-md" variant="ghost">
              ⛳ iGolf
            </Button>
            <Button size="sm" className="rounded-md" variant="ghost">
              🎤 Karaoke
            </Button>
            <Button size="sm" className="rounded-md" variant="ghost">
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
                    <Button variant="outline" size="sm" className="px-2">
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
                    <Button variant="outline" size="sm" className="px-2">
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
                    <Button variant="outline" size="sm" className="px-2">
                      ✏️
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

