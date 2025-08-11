"use client"

import { useState, useEffect, useMemo } from "react"
import { differenceInSeconds, parseISO, addHours } from "date-fns"
import type { Session } from "@/lib/types"

const WARNING_THRESHOLD = 15 * 60 // 15 minutes in seconds
const DEFAULT_SESSION_DURATION_HOURS = 1 // Default session is 1 hour

export function useTimer(activeSession: Session | undefined) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    if (!activeSession) return
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [activeSession])

  const { remainingSeconds, status } = useMemo(() => {
    if (!activeSession?.start_time) {
      return { remainingSeconds: 0, status: "inactive" }
    }

    const startTime = parseISO(activeSession.start_time)
    // If end_time is not set, calculate it based on a default duration
    const endTime = activeSession.end_time
      ? parseISO(activeSession.end_time)
      : addHours(startTime, DEFAULT_SESSION_DURATION_HOURS)

    const remaining = differenceInSeconds(endTime, now)

    let currentStatus: "active" | "warning" | "overtime" = "active"
    if (remaining <= 0) {
      currentStatus = "overtime"
    } else if (remaining < WARNING_THRESHOLD) {
      currentStatus = "warning"
    }

    return { remainingSeconds: remaining, status: currentStatus }
  }, [activeSession, now])

  const timeDisplay = useMemo(() => {
    if (!activeSession) return "00:00"

    const isOvertime = remainingSeconds <= 0
    const displaySeconds = Math.abs(remainingSeconds)

    const hours = Math.floor(displaySeconds / 3600)
    const minutes = Math.floor((displaySeconds % 3600) / 60)

    const formatted = [hours, minutes].map((v) => v.toString().padStart(2, "0")).join(":")

    return isOvertime ? `+${formatted}` : formatted
  }, [remainingSeconds, activeSession])

  return { timeDisplay, status }
}
