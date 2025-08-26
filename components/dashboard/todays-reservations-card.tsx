import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Reservation {
  time: string
  name: string
  guests: number
  salesType: string
  details: string
}

interface TodaysReservationsCardProps {
  reservations?: Reservation[]
}

export default function TodaysReservationsCard({
  reservations = [
    {
      time: "6:00 PM (90 min)",
      name: "Lee Park",
      guests: 2,
      salesType: "Walk-in",
      details: "Table 4 requested",
    },
    {
      time: "6:30 PM (60 min)",
      name: "Chen Wu",
      guests: 3,
      salesType: "Online",
      details: "Birthday party",
    },
    {
      time: "7:00 PM (120 min)",
      name: "Kim Davis",
      guests: 5,
      salesType: "Member",
      details: "VIP member",
    },
  ],
}: TodaysReservationsCardProps) {
  return (
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
            {reservations.map((reservation, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{reservation.time}</td>
                <td className="p-2">{reservation.name}</td>
                <td className="p-2">{reservation.guests}</td>
                <td className="p-2">{reservation.salesType}</td>
                <td className="p-2">{reservation.details}</td>
                <td className="p-2">
                  <Button variant="outline" size="sm">
                    ✏️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

