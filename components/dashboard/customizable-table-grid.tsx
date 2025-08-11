"use client"

import { useMemo } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import TableCard from "./table-card"
import { useTableStore } from "@/stores/table-store"
import type { Table, Session } from "@/lib/types"
import type { Layout } from "react-grid-layout"

const ResponsiveGridLayout = WidthProvider(Responsive)

type TableWithSessions = Table & { sessions: Session[] }

export default function CustomizableTableGrid() {
  const { tables, isEditMode, updateLayout } = useTableStore()

  const layouts = useMemo(() => {
    return {
      lg: tables.map((table) => ({
        i: table.id,
        x: table.layout_x,
        y: table.layout_y,
        w: table.layout_w,
        h: table.layout_h,
      })),
    }
  }, [tables])

  const onLayoutChange = (newLayout: Layout[]) => {
    if (isEditMode) {
      updateLayout(newLayout)
    }
  }

  if (!tables || tables.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-2xl text-glow-magenta p-8 text-center">
        Loading Table Layout...
      </div>
    )
  }

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 14, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      isDraggable={isEditMode}
      isResizable={isEditMode}
      onLayoutChange={onLayoutChange}
      draggableHandle=".drag-handle"
    >
      {tables.map((table) => (
        <div key={table.id}>
          <TableCard table={table} />
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}
