import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Workflow {
  id: string
  name: string
  desc: string
  status: string
}

export default function AutomationsView() {
  const workflows: Workflow[] = [
    { id: "spotify-playlist", name: "Spotify Playlist Control", desc: "Control venue music via Spotify", status: "ready" },
    { id: "music-vibe", name: "Set Music Vibe", desc: "Spotify → Chill playlist", status: "ready" },
    { id: "table-timer", name: "Table Timer Alert", desc: "Notify when session ends", status: "ready" },
    { id: "daily-report", name: "Daily Revenue Report", desc: "Generate end-of-day summary", status: "ready" },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Workflows (Spotify Enabled)</CardTitle>
        <div className="flex gap-2">
          <Button variant="secondary">+ New Workflow</Button>
          <Button>Deploy</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {workflows.map((w) => (
          <div key={w.id} className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="font-medium">{w.name}</div>
              <div className="text-sm text-muted-foreground">{w.desc}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {w.status === "ready" ? "✅ Ready" : "⛔ Needs attention"}
              </span>
              <Button size="sm">Run</Button>
              <Button size="sm" variant="outline">
                Details
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
