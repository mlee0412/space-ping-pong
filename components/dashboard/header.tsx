"use client"

import Image from "next/image"
import { Wifi, WifiOff, Sun, Moon, Settings, LogIn, LogOut, Play, Square, LayoutPanelLeft, Save } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import { useTableStore } from "@/stores/table-store"
import { useSupabase } from "../providers/supabase-provider"

const DigitalClock = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timerId)
  }, [])
  return <div className="text-lg md:text-2xl font-mono text-glow-cyan">{time.toLocaleTimeString()}</div>
}

export default function Header() {
  const { theme, setTheme } = useTheme()
  const { supabase } = useSupabase()
  const { isEditMode, toggleEditMode, tables } = useTableStore()
  const [isOnline, setIsOnline] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDayStarted, setIsDayStarted] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleSaveLayout = async () => {
    const updates = tables.map((table) => ({
      id: table.id,
      layout_x: table.layout_x,
      layout_y: table.layout_y,
      layout_w: table.layout_w,
      layout_h: table.layout_h,
    }))
    const { error } = await supabase.from("ping_pong_tables").upsert(updates)
    if (error) {
      console.error("Error saving layout:", error)
    } else {
      toggleEditMode() // Exit edit mode on successful save
    }
  }

  return (
    <header className="w-full flex items-center justify-between p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-neon-cyan/20">
      <div className="flex items-center gap-4">
        <Image src="/logo.webp" alt="Space Ping Pong Logo" width={40} height={40} className="hidden md:block" />
        <h1 className="text-xl md:text-3xl font-bold text-glow-magenta tracking-widest uppercase">Space Ping Pong</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <DigitalClock />
        <div className="hidden md:flex items-center gap-2 border-l border-neon-cyan/20 pl-4">
          <TooltipProvider>
            {isEditMode ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleSaveLayout}>
                    <Save className="h-5 w-5 text-green-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save Layout</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleEditMode}>
                    <LayoutPanelLeft className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Layout</p>
                </TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsDayStarted(!isDayStarted)}>
                  {isDayStarted ? (
                    <Square className="h-5 w-5 text-red-400" />
                  ) : (
                    <Play className="h-5 w-5 text-green-400" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isDayStarted ? "End Day" : "Start Day"}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsLoggedIn(!isLoggedIn)}>
                  {isLoggedIn ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLoggedIn ? "Log Out" : "Log In"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2 border-l border-neon-cyan/20 pl-2 md:pl-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {isOnline ? <Wifi className="h-5 w-5 text-green-400" /> : <WifiOff className="h-5 w-5 text-red-500" />}
        </div>
      </div>
    </header>
  )
}
