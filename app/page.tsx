import SpaceOpsApp from "@/components/dashboard/space-ops-app"
import { createServer } from "@/lib/supabase/server"

export const revalidate = 0

export default async function HomePage() {
  const supabase = createServer()
  const { data: tables, error } = await supabase
    .from("ping_pong_tables")
    .select("*, sessions(*)")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching tables:", error)
  }

  return (
    <main className="min-h-screen">
      <SpaceOpsApp serverTables={tables ?? []} />
    </main>
  )
}
