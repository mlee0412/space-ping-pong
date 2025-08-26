import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RecentActivityCardProps {
  activities?: string[]
}

export default function RecentActivityCard({
  activities = [
    "Table P2 session started",
    "Spotify playlist changed",
    "New reservation: Kim Davis",
    "Low inventory alert: Pool Cue Tips",
  ],
}: RecentActivityCardProps) {
  return (
    <Card className="glass-card p-4">
      <h3 className="mb-4 font-medium">Recent Activity</h3>
      <div className="grid gap-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border p-2"
          >
            <span>{activity}</span>
            <Button variant="outline" size="sm">
              👁️
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

