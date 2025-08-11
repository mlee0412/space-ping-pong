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
        "bg-black/50 backdrop-blur-xl border-2 transition-all duration-500 h-full flex flex-col p-1",
        statusStyles[cardStatus],
        isEditMode && "shadow-glow-cyan",
        "@container",
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-1 p-1 relative min-h-0">
        <CardTitle className="text-xs @[200px]:text-sm @[300px]:text-base font-bold text-glow-cyan truncate flex-1 mr-1">
          {table.name}
        </CardTitle>
        {isEditMode && (
          <GripVertical className="drag-handle absolute top-0.5 right-0.5 cursor-move text-muted-foreground h-4 w-4 @[200px]:h-5 @[200px]:w-5 transition-all hover:text-white hover:scale-125" />
        )}
        <span
          className={cn(
            "text-[10px] @[200px]:text-xs font-semibold uppercase px-1 @[200px]:px-2 py-0.5 rounded-full shrink-0",
            {
              "bg-status-inactive/20 text-status-inactive": cardStatus === "inactive",
              "bg-status-active/20 text-status-active": cardStatus === "active",
              "bg-status-warning/20 text-status-warning": cardStatus === "warning",
              "bg-status-overtime/20 text-status-overtime": cardStatus === "overtime",
            },
          )}
        >
          {cardStatus}
        </span>
      </CardHeader>

      {table.table_type === "ping_pong" ? (
        <CardContent className="flex-grow flex flex-col justify-center items-center p-1 min-h-0">
          <div className="text-lg @[150px]:text-xl @[200px]:text-2xl @[300px]:text-3xl @[400px]:text-4xl @[500px]:text-5xl font-mono font-bold text-center text-glow-magenta leading-none">
            {timeDisplay}
          </div>
          <div className="flex justify-between w-full text-muted-foreground mt-auto text-[10px] @[200px]:text-xs gap-2">
            <div className="flex items-center gap-0.5 @[200px]:gap-1 min-w-0">
              <Users className="h-2.5 w-2.5 @[200px]:h-3 @[200px]:w-3 shrink-0" />
              <span className="truncate">{activeSession?.guest_count ?? "-"}</span>
            </div>
            <div className="flex items-center gap-0.5 @[200px]:gap-1 min-w-0">
              <Server className="h-2.5 w-2.5 @[200px]:h-3 @[200px]:w-3 shrink-0" />
              <span className="truncate">{activeSession?.server_name ?? "N/A"}</span>
            </div>
          </div>
        </CardContent>
      ) : (
        /* Completely redesigned dining table layout for better small card support */
        <CardContent className="flex-grow flex flex-col justify-center items-center p-1 text-muted-foreground gap-1 @[200px]:gap-2 min-h-0">
          <div className="flex items-center gap-1 @[200px]:gap-2">
            <Users className="h-3 w-3 @[200px]:h-4 @[200px]:w-4 @[300px]:h-5 @[300px]:w-5 shrink-0" />
            <span className="font-bold text-sm @[200px]:text-lg @[300px]:text-xl text-white">
              {activeSession?.guest_count ?? "-"}
            </span>
          </div>
          <div className="flex items-center gap-1 @[200px]:gap-2 w-full justify-center">
            <Server className="h-2.5 w-2.5 @[200px]:h-3 @[200px]:w-3 @[300px]:h-4 @[300px]:w-4 shrink-0" />
            <span className="text-[10px] @[200px]:text-xs @[300px]:text-sm truncate text-center">
              {activeSession?.server_name ?? "N/A"}
            </span>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
