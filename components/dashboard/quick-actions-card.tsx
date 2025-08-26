import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function QuickActionsCard() {
  return (
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
  )
}

