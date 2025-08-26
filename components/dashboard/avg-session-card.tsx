import { Card } from "@/components/ui/card"

interface AvgSessionCardProps {
  duration?: string
  context?: string
}

export default function AvgSessionCard({
  duration = "01:12",
  context = "All activities",
}: AvgSessionCardProps) {
  return (
    <Card className="glass-card p-4">
      <h3 className="mb-2 text-sm font-medium">Avg Session</h3>
      <div className="text-2xl font-bold">{duration}</div>
      <div className="text-sm text-muted-foreground">{context}</div>
    </Card>
  )
}
