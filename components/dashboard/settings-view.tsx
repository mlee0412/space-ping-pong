import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function ToggleRow({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-md border p-2">
      <span>{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-9 rounded-full border bg-muted checked:bg-primary"
      />
    </div>
  )
}

export default function SettingsView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">System Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-2">
          <h4 className="font-medium">General</h4>
          <div className="flex items-center justify-between rounded-md border p-2">
            <span>Venue Name</span>
            <input
              defaultValue="Space Ping Pong"
              className="w-48 rounded-md border bg-background p-1"
            />
          </div>
          <div className="flex items-center justify-between rounded-md border p-2">
            <span>Default Session Length</span>
            <select className="w-48 rounded-md border bg-background p-1">
              <option>60 min</option>
              <option selected>90 min</option>
              <option>120 min</option>
            </select>
          </div>
        </section>

        <section className="space-y-2">
          <h4 className="font-medium">Automation</h4>
          <ToggleRow label="Auto-run workflows" defaultChecked />
          <ToggleRow label="Spotify integration" defaultChecked />
          <ToggleRow label="Supabase sync" defaultChecked />
        </section>

        <section className="space-y-2">
          <h4 className="font-medium">Notifications</h4>
          <ToggleRow label="Email notifications" />
          <ToggleRow label="SMS alerts" />
        </section>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button>Save Settings</Button>
          <Button variant="secondary">Export Config</Button>
          <Button variant="secondary">Import Config</Button>
          <Button variant="destructive">Reset to Default</Button>
        </div>
      </CardContent>
    </Card>
  )
}
