import PongTimerDashboard from "@/components/dashboard/pong-timer-dashboard"
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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12 bg-black bg-grid-white/[0.05] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <PongTimerDashboard serverTables={tables ?? []} />
    </main>
  )
}
