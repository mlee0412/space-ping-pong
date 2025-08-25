"use client"

import { useState, useEffect } from "react"
import "@/styles/space-ops.css"
import { useSupabase } from "../providers/supabase-provider"
import { useTableStore } from "@/stores/table-store"
import CustomizableTableGrid from "./customizable-table-grid"
import StoreInitializer from "../providers/store-initializer"
import type { Table, Session } from "@/lib/types"
import DashboardView from "./dashboard-view"
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
  const [collapsed, setCollapsed] = useState(false)
  const [dayStarted, setDayStarted] = useState(false)

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
    <div className="app">
      <StoreInitializer tables={serverTables} />
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button className="toggle-sidebar" onClick={() => setCollapsed(!collapsed)}>☰</button>
        <div className="brand">
          <div className="logo" onClick={() => setRoute("dashboard")}></div>
          <h1>SPACE OPS</h1>
        </div>
        <div className="nav">
          <button className={route === "dashboard" ? "active" : ""} onClick={() => setRoute("dashboard")}>🏠 <span className="label">Dashboard</span></button>
          <button className={route === "floor" ? "active" : ""} onClick={() => setRoute("floor")}>🎯 <span className="label">Floor</span></button>
          <button className={route === "automations" ? "active" : ""} onClick={() => setRoute("automations")}>⚙️ <span className="label">Automations</span></button>
          <button className={route === "inventory" ? "active" : ""} onClick={() => setRoute("inventory")}>📦 <span className="label">Inventory</span></button>
          <button className={route === "tasks" ? "active" : ""} onClick={() => setRoute("tasks")}>🗂️ <span className="label">Tasks</span></button>
          <button className={route === "schedule" ? "active" : ""} onClick={() => setRoute("schedule")}>📅 <span className="label">Schedule</span></button>
          <button className={route === "settings" ? "active" : ""} onClick={() => setRoute("settings")}>🛠️ <span className="label">Settings</span></button>
        </div>
      </aside>
      <section className="main">
        <div className="topbar">
          <div className="search" role="search">
            🔎 <input placeholder="Search..." aria-label="Search" />
            <div className="search-buttons">
              <button className="search-btn" title="Voice Search">🎤</button>
              <button className="search-btn" title="Upload Image">📷</button>
              <button className="search-btn" title="AI Mode">🤖</button>
            </div>
          </div>
          <button className="btn ghost" onClick={() => document.body.classList.toggle("light")}>🌗 Theme</button>
          <button className="btn">🔄 Sync</button>
          <button className="btn primary" onClick={() => setDayStarted(!dayStarted)}>
            {dayStarted ? "🌙 End Day" : "🌅 Start Day"}
          </button>
          <div className="avatar" onClick={() => setRoute("dashboard")}>S</div>
        </div>
        <div className="views">
          <div className={`view ${route === "dashboard" ? "active" : ""}`} id="view-dashboard">
            <DashboardView />
          </div>
          <div className={`view ${route === "floor" ? "active" : ""}`} id="view-floor">
            <CustomizableTableGrid />
          </div>
          <div className={`view ${route === "automations" ? "active" : ""}`} id="view-automations">
            <AutomationsView />
          </div>
          <div className={`view ${route === "inventory" ? "active" : ""}`} id="view-inventory">
            <InventoryView />
          </div>
          <div className={`view ${route === "tasks" ? "active" : ""}`} id="view-tasks">
            <TasksView />
          </div>
          <div className={`view ${route === "schedule" ? "active" : ""}`} id="view-schedule">
            <ScheduleView />
          </div>
          <div className={`view ${route === "settings" ? "active" : ""}`} id="view-settings">
            <SettingsView />
          </div>
        </div>
      </section>
    </div>
  )
}
