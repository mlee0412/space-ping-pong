"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Users, Server, GripVertical } from "lucide-react"
import { useTimer } from "@/hooks/use-timer"
import type { Table, Session } from "@/lib/types"
import { useMemo, useRef } from "react"
import { useTableStore } from "@/stores/table-store"

type TableWithSessions = Table & { sessions: Session[] }

const statusStyles = {
  inactive: "border-status-inactive [--glow-color:hsl(var(--status-inactive))]",
  active: "border-status-active [--glow-color:hsl(var(--status-active))] animate-pulse-glow",
  warning: "border-status-warning [--glow-color:hsl(var(--status-warning))] animate-pulse-glow",
  overtime: "border-status-overtime [--glow-color:hsl(var(--status-overtime))] animate-pulse-glow",
}

export default function TableCard({ table }: { table: TableWithSessions }) {
  const { isEditMode, toggleEditMode } = useTableStore()
  const activeSession = useMemo(() => table.sessions?.find((s) => s.end_time === null), [table.sessions])
  const { timeDisplay, status } = useTimer(activeSession)
  const cardStatus = activeSession ? status : "inactive"
  const pressTimer = useRef<NodeJS.Timeout>()

  const displayName = useMemo(() => {
    if (table.table_type === "ping_pong") {
      return `Ping Pong Table ${table.name.replace("P", "")}`
    }
    if (table.table_type === "dining") {
      return `Dining Table ${table.name.replace("D", "")}`
    }
    return table.name
  }, [table.name, table.table_type])

  const handlePointerDown = () => {
    pressTimer.current = setTimeout(() => {
      if (!isEditMode) toggleEditMode()
    }, 1000) // 1 second long press
  }

  const handlePointerUp = () => {
    clearTimeout(pressTimer.current)
  }

  return (
    <Card
      className={cn(
        "bg-black/50 backdrop-blur-xl border-2 transition-all duration-500 h-full flex flex-col",
        statusStyles[cardStatus],
        isEditMode && "shadow-glow-cyan",
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-sm sm:text-base md:text-xl font-bold text-glow-cyan">{displayName}</CardTitle>
        {isEditMode && (
          <GripVertical className="drag-handle absolute top-2 right-2 cursor-move text-muted-foreground h-6 w-6 transition-all hover:text-white hover:scale-125" />
        )}
        <span
          className={cn("text-sm font-semibold uppercase px-2 py-1 rounded-full", {
            "bg-status-inactive/20 text-status-inactive": cardStatus === "inactive",
            "bg-status-active/20 text-status-active": cardStatus === "active",
            "bg-status-warning/20 text-status-warning": cardStatus === "warning",
            "bg-status-overtime/20 text-status-overtime": cardStatus === "overtime",
          })}
        >
          {cardStatus}
        </span>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-center my-2 md:my-4 text-glow-magenta">
          {timeDisplay}
        </div>
        <div className="flex justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{activeSession?.guest_count ?? "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>{activeSession?.server_name ?? "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
