import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Item {
  name: string
  on: number
  par: number
  vendor: string
  status: "OK" | "Low" | "Critical"
}

export default function InventoryView() {
  const items: Item[] = [
    { name: "Ping Pong Balls (24ct)", on: 18, par: 36, vendor: "SportsPro", status: "Low" },
    { name: "San Pellegrino 500ml", on: 42, par: 60, vendor: "BeverageHub", status: "OK" },
    { name: "Lime Juice (1L)", on: 3, par: 12, vendor: "BarMart", status: "Critical" },
    { name: "Pool Cue Tips", on: 8, par: 20, vendor: "BilliardSupply", status: "Low" },
  ]

  const statusClasses: Record<Item["status"], string> = {
    OK: "bg-green-500/15 text-green-300",
    Low: "bg-amber-500/15 text-amber-300",
    Critical: "bg-red-500/15 text-red-300",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Inventory</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline">Recalc PAR</Button>
          <Button>Create PO</Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="p-2">Item</th>
              <th className="p-2">On Hand</th>
              <th className="p-2">PAR</th>
              <th className="p-2">Vendor</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.name} className="border-b last:border-none">
                <td className="p-2 font-medium">{it.name}</td>
                <td className="p-2">{it.on}</td>
                <td className="p-2">{it.par}</td>
                <td className="p-2">{it.vendor}</td>
                <td className="p-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${statusClasses[it.status]}`}>
                    {it.status}
                  </span>
                </td>
                <td className="p-2">
                  <Button size="sm" variant="secondary">
                    Reorder
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
