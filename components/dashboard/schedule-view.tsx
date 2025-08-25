import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ScheduleView() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const events: Record<string, string[]> = {
    Wed: ["6PM - Lee Park"],
    Fri: ["7PM - Team Event"],
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Schedule Management</CardTitle>
        <Button>+ New Booking</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d) => (
            <div key={d} className="rounded-md border p-2 min-h-[100px]">
              <div className="mb-2 font-medium">{d}</div>
              {events[d]?.map((ev) => (
                <div key={ev} className="mb-1 rounded bg-primary/15 px-2 py-1 text-xs">
                  {ev}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
