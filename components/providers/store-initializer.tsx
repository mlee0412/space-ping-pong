"use client"

import { useRef } from "react"
import { useTableStore } from "@/stores/table-store"
import type { Table, Session } from "@/lib/types"

type TableWithSessions = Table & { sessions: Session[] }

function StoreInitializer({ tables }: { tables: TableWithSessions[] }) {
  const initialized = useRef(false)
  if (!initialized.current) {
    useTableStore.setState({ tables })
    initialized.current = true
  }
  return null
}

export default StoreInitializer
