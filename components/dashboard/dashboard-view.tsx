"use client"

import WeatherCard from "./weather-card"
import ActiveTablesCard from "./active-tables-card"
import AvgSessionCard from "./avg-session-card"
import RevenueCard from "./revenue-card"
import QuickActionsCard from "./quick-actions-card"
import RecentActivityCard from "./recent-activity-card"
import TodaysReservationsCard from "./todays-reservations-card"

export default function DashboardView() {
  return (
    <div className="grid gap-4">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <WeatherCard />
        <ActiveTablesCard />
        <AvgSessionCard />
        <RevenueCard />
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <QuickActionsCard />
        <RecentActivityCard />
      </div>

      {/* Today's Reservations */}
      <TodaysReservationsCard />
    </div>
  )
}

