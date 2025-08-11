import { create } from "zustand"
import { produce } from "immer"
import type { Table, Session } from "@/lib/types"
import type { Layout } from "react-grid-layout"

type TableWithSessions = Table & { sessions: Session[] }

type TableState = {
  tables: TableWithSessions[]
  isEditMode: boolean
  setTables: (tables: TableWithSessions[]) => void
  updateTable: (table: Table) => void
  updateSession: (session: Session) => void
  toggleEditMode: () => void
  updateLayout: (layouts: Layout[]) => void
}

export const useTableStore = create<TableState>((set) => ({
  tables: [],
  isEditMode: false,
  setTables: (tables) => set({ tables }),
  updateTable: (table) =>
    set(
      produce((state: TableState) => {
        const tableIndex = state.tables.findIndex((t) => t.id === table.id)
        if (tableIndex !== -1) {
          state.tables[tableIndex] = { ...state.tables[tableIndex], ...table }
        }
      }),
    ),
  updateSession: (session) =>
    set(
      produce((state: TableState) => {
        const tableIndex = state.tables.findIndex((t) => t.id === session.table_id)
        if (tableIndex !== -1) {
          const sessionIndex = state.tables[tableIndex].sessions.findIndex((s) => s.id === session.id)
          if (sessionIndex !== -1) {
            state.tables[tableIndex].sessions[sessionIndex] = session
          } else {
            state.tables[tableIndex].sessions.push(session)
          }
        }
      }),
    ),
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  updateLayout: (layouts) =>
    set(
      produce((state: TableState) => {
        layouts.forEach((layoutItem) => {
          const tableIndex = state.tables.findIndex((t) => t.id === layoutItem.i)
          if (tableIndex !== -1) {
            state.tables[tableIndex].layout_x = layoutItem.x
            state.tables[tableIndex].layout_y = layoutItem.y
            state.tables[tableIndex].layout_w = layoutItem.w
            state.tables[tableIndex].layout_h = layoutItem.h
          }
        })
      }),
    ),
}))
