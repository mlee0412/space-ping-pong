"use client"

import { Home, PlusCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MobileBottomNav() {
  const handleHapticFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-neon-cyan/20 p-2 flex justify-around items-center md:hidden">
      <Button variant="ghost" className="flex flex-col h-auto" onClick={handleHapticFeedback}>
        <Home />
        <span className="text-xs">Dashboard</span>
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="flex flex-col h-auto bg-neon-cyan text-black rounded-full w-16 h-16 shadow-glow-cyan"
        onClick={handleHapticFeedback}
      >
        <PlusCircle className="h-8 w-8" />
      </Button>
      <Button variant="ghost" className="flex flex-col h-auto" onClick={handleHapticFeedback}>
        <Settings />
        <span className="text-xs">Settings</span>
      </Button>
    </div>
  )
}
