"use client"

import { useEffect } from "react"
import { useSupabase } from "../providers/supabase-provider"
import { useTableStore } from "@/stores/table-store"
import Header from "./header"
import MobileBottomNav from "./mobile-bottom-nav"
import { useMobile } from "@/hooks/use-mobile"
import type { Table, Session } from "@/lib/types"
import StoreInitializer from "../providers/store-initializer"
import CustomizableTableGrid from "./customizable-table-grid"

type TableWithSessions = Table & { sessions: Session[] }

export default function PongTimerDashboard({ serverTables }: { serverTables: TableWithSessions[] }) {
  const { supabase } = useSupabase()
  const { updateTable, updateSession } = useTableStore()
  const isMobile = useMobile()

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
    <>
      <StoreInitializer tables={serverTables} />
      <div className="w-full h-full flex flex-col gap-8">
        <Header />
        <div className="flex-grow pb-20 md:pb-0">
          <CustomizableTableGrid />
        </div>
        {isMobile && <MobileBottomNav />}
      </div>
    </>
  )
}
