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
    const createLayoutForBreakpoint = (maxWidth: number) => {
      return tables.map((table) => {
        // Reduce width for wider tables on smaller screens
        let adjustedWidth = table.layout_w
        if (table.layout_w === 4 && maxWidth < 14) {
          // For tables that are 4 units wide, scale them down
          if (maxWidth <= 6)
            adjustedWidth = 3 // Small screens
          else if (maxWidth <= 10) adjustedWidth = 3 // iPad/tablet screens
        }

        return {
          i: table.id,
          x: table.layout_x,
          y: table.layout_y,
          w: Math.min(adjustedWidth, maxWidth), // Ensure width doesn't exceed available columns
          h: table.layout_h,
        }
      })
    }

    return {
      lg: tables.map((table) => ({
        i: table.id,
        x: table.layout_x,
        y: table.layout_y,
        w: table.layout_w,
        h: table.layout_h,
      })),
      md: createLayoutForBreakpoint(10), // iPad/tablet
      sm: createLayoutForBreakpoint(6), // Small tablet
      xs: createLayoutForBreakpoint(4), // Phone
      xxs: createLayoutForBreakpoint(2), // Very small phone
    }
  }, [tables])

  const onLayoutChange = (newLayout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    if (isEditMode) {
      updateLayout(allLayouts.lg || newLayout)
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
