"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Loader2, AlertCircle, Users, Clock, DollarSign } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Reservation {
  time: string
  name: string
  guests: number
  salesType: string
  details: string
  duration?: string
  hasDeposit?: boolean
  hasCatering?: boolean
  tableCount?: string | number
  agent?: string
}

interface TodaysReservationsCardProps {
  n8nWebhookUrl?: string
  calendarId?: string
}

export default function TodaysReservationsCard({
  n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "/api/webhook/ping-pong-report",
  calendarId = "",
}: TodaysReservationsCardProps) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedVenue, setSelectedVenue] = useState("pingpong")
  const [lastFetched, setLastFetched] = useState<Date | null>(null)

  const fetchTodayReservations = async () => {
    setLoading(true)
    setError(null)

    const today = new Date()
    const startDate = today.toISOString().split("T")[0]
    const endDate = startDate

    try {
      const formData = new FormData()
      formData.append("Start Date", startDate)
      formData.append("End Date", endDate)
      formData.append("Calendar ID (leave blank for primary)", calendarId)
      formData.append("Check Gmail for Updates", "false")

      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch reservations: ${response.statusText}`)
      }

      const htmlContent = await response.text()
      const events = parseEventsFromHTML(htmlContent, selectedVenue)
      setReservations(events)
      setLastFetched(new Date())
      
      if (events.length === 0) {
        setError("No reservations found for today")
      }
    } catch (err) {
      console.error("Error fetching reservations:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch reservations")
    } finally {
      setLoading(false)
    }
  }

  const parseEventsFromHTML = (html: string, venue: string): Reservation[] => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")
    const eventElements = doc.querySelectorAll(".event")
    
    const events: Reservation[] = []
    
    eventElements.forEach((element) => {
      const isPingPong = element.getAttribute("data-pingpong") === "true"
      const venueMatch = 
        (venue === "pingpong" && isPingPong) ||
        (venue === "all") ||
        (!isPingPong && venue !== "pingpong")

      if (!venueMatch) return

      const hostName = element.getAttribute("data-host") || ""
      const guestCount = parseInt(element.getAttribute("data-guests") || "0")
      const salesType = element.getAttribute("data-sales") || "Not specified"
      const hasDeposit = element.getAttribute("data-confirmed") === "true"
      const hasCatering = element.getAttribute("data-catering") === "true"
      const tableCount = element.getAttribute("data-tables") || "TBD"
      
      const details: string[] = []
      const detailElements = element.querySelectorAll(".event-detail")
      let timeStr = ""
      let duration = ""
      let agent = ""
      let memo = ""
      
      detailElements.forEach((detail) => {
        const text = detail.textContent || ""
        if (text.includes("Time:")) {
          timeStr = text.replace("🕐 Time:", "").trim()
        }
        if (text.includes("(") && text.includes("hours")) {
          const match = text.match(/\(([\d.]+ hours)\)/)
          if (match) duration = match[1]
        }
        if (text.includes("Agent:")) {
          agent = text.replace("👤 Agent:", "").trim()
        }
        if (text.includes("Notes:")) {
          memo = text.replace("📝 Notes:", "").trim()
        }
      })

      if (hasDeposit) details.push("Confirmed")
      if (hasCatering) details.push("Catering")
      if (memo && memo !== "None") details.push(memo)

      events.push({
        time: timeStr,
        name: hostName.charAt(0).toUpperCase() + hostName.slice(1),
        guests: guestCount,
        salesType: formatSalesType(salesType),
        details: details.join(" • ") || "-",
        duration,
        hasDeposit,
        hasCatering,
        tableCount,
        agent,
      })
    })

    return events
  }

  const formatSalesType = (salesType: string): string => {
    if (salesType.includes("open bar")) return "Open Bar"
    if (salesType.includes("à la carte")) return "À la Carte"
    if (salesType.includes("beer")) return "Beer/Wine"
    if (salesType.includes("cash")) return "Cash Bar"
    return salesType.charAt(0).toUpperCase() + salesType.slice(1)
  }

  const getTotalGuests = () => reservations.reduce((sum, r) => sum + (r.guests || 0), 0)
  const getConfirmedCount = () => reservations.filter(r => r.hasDeposit).length

  const venueButtons = [
    { id: "pingpong", label: "Ping Pong", icon: "🏓" },
    { id: "igolf", label: "iGolf", icon: "⛳" },
    { id: "karaoke", label: "Karaoke", icon: "🎤" },
    { id: "billiards", label: "Billiards", icon: "🎱" },
  ]

  return (
    <Card className="glass-card overflow-hidden">
      {/* Header */}
      <div className="border-b bg-muted/30 px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Today's Reservations</h3>
            {lastFetched && (
              <p className="mt-1 text-sm text-muted-foreground">
                Last updated: {lastFetched.toLocaleTimeString()}
              </p>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchTodayReservations}
            disabled={loading}
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4" />
                Pull from Calendar
              </>
            )}
          </Button>
        </div>

        {/* Venue Filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          {venueButtons.map((venue) => (
            <button
              key={venue.id}
              onClick={() => setSelectedVenue(venue.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors
                ${selectedVenue === venue.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
            >
              <span>{venue.icon}</span>
              <span>{venue.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      {reservations.length > 0 && (
        <div className="grid grid-cols-3 divide-x bg-muted/20 px-6 py-3">
          <div className="flex items-center gap-2 px-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-2xl font-semibold">{reservations.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-2xl font-semibold">{getTotalGuests()}</p>
              <p className="text-xs text-muted-foreground">Guests</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-2xl font-semibold">{getConfirmedCount()}</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="px-6 py-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Table Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : reservations.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center text-center">
            <Calendar className="mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No reservations loaded yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Click "Pull from Calendar" to fetch today's schedule
            </p>
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">Host</th>
                  <th className="pb-3 font-medium">Guests</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Details</th>
                  <th className="pb-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {reservations.map((reservation, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{reservation.time}</p>
                        {reservation.duration && (
                          <p className="text-xs text-muted-foreground">{reservation.duration}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 font-medium">{reservation.name}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        {reservation.guests || "-"}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                        ${reservation.salesType.includes("Open Bar") 
                          ? "bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                          : reservation.salesType.includes("À la Carte")
                          ? "bg-purple-500/10 text-purple-700 dark:text-purple-400"
                          : "bg-gray-500/10 text-gray-700 dark:text-gray-400"
                        }`}>
                        {reservation.salesType}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-xs text-muted-foreground">
                        {reservation.details}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <span className="sr-only">Edit</span>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  )
}
