import { Card } from "@/components/ui/card"

interface ActiveTablesCardProps {
  count?: number
  changeText?: string
}

export default function ActiveTablesCard({
  count = 7,
  changeText = "+2 since 1 hr ago",
}: ActiveTablesCardProps) {
  return (
    <Card className="glass-card p-4">
      <h3 className="mb-2 text-sm font-medium">Active Tables</h3>
      <div className="text-2xl font-bold">{count}</div>
      <div className="text-sm text-muted-foreground">{changeText}</div>
    </Card>
  )
}
