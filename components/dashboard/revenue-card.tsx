import { Card } from "@/components/ui/card"

interface RevenueCardProps {
  revenue?: string
  target?: string
}

export default function RevenueCard({
  revenue = "$4,820",
  target = "Target $6,500",
}: RevenueCardProps) {
  return (
    <Card className="glass-card p-4">
      <h3 className="mb-2 text-sm font-medium">Revenue Today</h3>
      <div className="text-2xl font-bold">{revenue}</div>
      <div className="text-sm text-muted-foreground">{target}</div>
    </Card>
  )
}
