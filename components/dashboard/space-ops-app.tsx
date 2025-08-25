"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "../providers/supabase-provider"
import { useTableStore } from "@/stores/table-store"
import CustomizableTableGrid from "./customizable-table-grid"
import StoreInitializer from "../providers/store-initializer"
import type { Table, Session } from "@/lib/types"
import AutomationsView from "./automations-view"
import InventoryView from "./inventory-view"
import TasksView from "./tasks-view"
import ScheduleView from "./schedule-view"
import SettingsView from "./settings-view"

export type TableWithSessions = Table & { sessions: Session[] }

export default function SpaceOpsApp({ serverTables }: { serverTables: TableWithSessions[] }) {
  const { supabase } = useSupabase()
  const { updateTable, updateSession } = useTableStore()
  const [route, setRoute] = useState("dashboard")

  useEffect(() => {
    const channel = supabase
      .channel("realtime-tables")
      .on("postgres_changes", { event: "*", schema: "public", table: "ping_pong_tables" }, (payload) =>
        updateTable(payload.new as Table),
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "sessions" }, (payload) =>
        updateSession(payload.new as Session),
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, updateTable, updateSession])

  return (
    <div className="flex h-screen bg-background text-foreground">
      <StoreInitializer tables={serverTables} />
      <aside className="w-60 border-r border-border p-4 flex flex-col gap-2">
        <button
          className={`text-left p-2 rounded hover:bg-accent ${route === "dashboard" ? "bg-accent" : ""}`}
          onClick={() => setRoute("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`text-left p-2 rounded hover:bg-accent ${route === "floor" ? "bg-accent" : ""}`}
          onClick={() => setRoute("floor")}
        >
          Floor
        </button>
        <button
          className={`text-left p-2 rounded hover:bg-accent ${route === "automations" ? "bg-accent" : ""}`}
          onClick={() => setRoute("automations")}
        >
          Automations
        </button>
        <button
          className={`text-left p-2 rounded hover:bg-accent ${route === "inventory" ? "bg-accent" : ""}`}
          onClick={() => setRoute("inventory")}
        >
          Inventory
        </button>
        <button
          className={`text-left p-2 rounded hover:bg-accent ${route === "tasks" ? "bg-accent" : ""}`}
          onClick={() => setRoute("tasks")}
        >
          Tasks
        </button>
        <button
          className={`text-left p-2 rounded hover:bg-accent ${route === "schedule" ? "bg-accent" : ""}`}
          onClick={() => setRoute("schedule")}
        >
          Schedule
        </button>
        <button
          className={`text-left p-2 rounded hover:bg-accent ${route === "settings" ? "bg-accent" : ""}`}
          onClick={() => setRoute("settings")}
        >
          Settings
        </button>
      </aside>
      <section className="flex-1 flex flex-col">
        <header className="p-4 border-b border-border flex items-center justify-between">
          <div className="font-semibold">Space Ops</div>
          <input
            className="max-w-sm w-full ml-4 p-2 rounded bg-background border border-border"
            placeholder="Search..."
          />
        </header>
        <div className="flex-1 overflow-auto p-4">
          {route === "dashboard" && <div className="text-muted-foreground">Dashboard coming soon</div>}
          {route === "floor" && <CustomizableTableGrid />}
          {route === "automations" && <AutomationsView />}
          {route === "inventory" && <InventoryView />}
          {route === "tasks" && <TasksView />}
          {route === "schedule" && <ScheduleView />}
          {route === "settings" && <SettingsView />}
        </div>
      </section>
    </div>
  )
}
