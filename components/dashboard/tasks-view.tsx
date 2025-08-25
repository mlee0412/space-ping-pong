import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TasksView() {
  const tasks = {
    backlog: ["Add billiards pricing", "Update karaoke song list"],
    doing: ["Configure floor plan editor", "Integrate Spotify API"],
    done: ["Install security cameras", "Set up POS system"],
  }

  const Column = ({ title, items }: { title: string; items: string[] }) => (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((t) => (
          <div key={t} className="rounded-md border p-2 text-sm">
            {t}
          </div>
        ))}
      </CardContent>
    </Card>
  )

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Column title="Backlog" items={tasks.backlog} />
      <Column title="Doing" items={tasks.doing} />
      <Column title="Done" items={tasks.done} />
    </div>
  )
}
