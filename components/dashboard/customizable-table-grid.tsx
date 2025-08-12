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
    const createCompactLayout = (maxCols: number, allowReflow = true) => {
      const sortedTables = [...tables].sort((a, b) => {
        // Sort by y position first, then x position for consistent ordering
        if (a.layout_y !== b.layout_y) return a.layout_y - b.layout_y
        return a.layout_x - b.layout_x
      })

      if (!allowReflow) {
        // For edit mode, preserve original positions but adjust for screen size
        return sortedTables.map((table) => {
          let adjustedWidth = table.table_type === "ping_pong" ? 2 : table.layout_w
          let adjustedX = table.layout_x

          if (adjustedWidth >= 3 && maxCols <= 6) {
            adjustedWidth = 2
          }

          if (adjustedX + adjustedWidth > maxCols) {
            adjustedX = Math.max(0, maxCols - adjustedWidth)
          }

          return {
            i: table.id,
            x: adjustedX,
            y: table.layout_y,
            w: adjustedWidth,
            h: table.layout_h,
          }
        })
      }

      // Compact layout algorithm - reflow tables to eliminate gaps
      const layout: Layout[] = []
      let currentRow = 0
      let currentCol = 0

      for (const table of sortedTables) {
        const width = table.table_type === "ping_pong" ? 2 : Math.min(table.layout_w, maxCols)

        // Check if current table fits in current row
        if (currentCol + width > maxCols) {
          // Move to next row
          currentRow++
          currentCol = 0
        }

        layout.push({
          i: table.id,
          x: currentCol,
          y: currentRow,
          w: width,
          h: table.layout_h,
        })

        currentCol += width
      }

      return layout
    }

    return {
      lg: createCompactLayout(14, !isEditMode),
      md: createCompactLayout(12, !isEditMode),
      sm: createCompactLayout(6, !isEditMode),
      xs: createCompactLayout(4, !isEditMode),
      xxs: createCompactLayout(2, !isEditMode),
    }
  }, [tables, isEditMode])

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
      cols={{ lg: 14, md: 12, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      isDraggable={isEditMode}
      isResizable={isEditMode}
      onLayoutChange={onLayoutChange}
      draggableHandle=".drag-handle"
      margin={[4, 4]}
      containerPadding={[8, 8]}
      compactType={isEditMode ? null : "vertical"}
    >
      {tables.map((table) => (
        <div key={table.id}>
          <TableCard table={table} />
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}
