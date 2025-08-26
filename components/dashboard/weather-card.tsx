import { Card } from "@/components/ui/card"

interface WeatherCardProps {
  temperature?: string
  condition?: string
  icon?: string
}

export default function WeatherCard({
  temperature = "72°F",
  condition = "Clear skies",
  icon = "☀️",
}: WeatherCardProps) {
  return (
    <Card className="glass-card p-4">
      <h3 className="mb-2 text-sm font-medium">Weather</h3>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex flex-col">
          <span className="text-xl font-bold">{temperature}</span>
          <span className="text-sm text-muted-foreground">{condition}</span>
        </div>
      </div>
    </Card>
  )
}
