// components/dashboard/weather-card.tsx
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { MapPin, Droplets, Wind, Eye, TrendingUp, TrendingDown, Loader2 } from "lucide-react"

interface WeatherData {
  location: {
    name: string
    country: string
  }
  current: {
    temp: number
    feels_like: number
    condition: string
    description: string
    icon: string
    humidity: number
    wind_speed: number
    visibility: number
  }
  daily: {
    temp_min: number
    temp_max: number
  }
  hourly: Array<{
    time: string
    temp: number
    icon: string
    description: string
  }>
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
          })
        })

        const { latitude, longitude } = position.coords
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

        // Fetch current weather and forecast
        const response = await fetch(
          `/api/weather?lat=${latitude}&lon=${longitude}&tz=${encodeURIComponent(tz)}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }

        const data = await response.json()
        setWeather(data)
      } catch (err) {
        console.error("Weather fetch error:", err)
        setError("Unable to load weather data")
        
        // Set default fallback data
        const now = new Date()
        const fallbackHours = Array.from({ length: 3 }, (_, i) => {
          const time = new Date(now.getTime() + (i + 1) * 60 * 60 * 1000)
          return {
            time: time.toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
              timeZone: "America/New_York",
            }),
            temp: 72 + i * 2,
            icon: "01d",
            description: "Clear",
          }
        })

        setWeather({
          location: { name: "New York", country: "US" },
          current: {
            temp: 72,
            feels_like: 70,
            condition: "Clear",
            description: "Clear sky",
            icon: "01d",
            humidity: 45,
            wind_speed: 8,
            visibility: 10,
          },
          daily: {
            temp_min: 65,
            temp_max: 78,
          },
          hourly: fallbackHours,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (iconCode: string) => {
    const baseUrl = "https://openweathermap.org/img/wn/"
    return `${baseUrl}${iconCode}@2x.png`
  }

  if (loading) {
    return (
      <Card className="glass-card col-span-full p-6 lg:col-span-1">
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Card>
    )
  }

  if (!weather) {
    return (
      <Card className="glass-card col-span-full p-6 lg:col-span-1">
        <div className="text-center text-muted-foreground">
          Weather data unavailable
        </div>
      </Card>
    )
  }

  return (
    <Card className="glass-card col-span-full overflow-hidden lg:col-span-2">
      {/* Header with location and current temperature */}
      <div className="border-b bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{weather.location.name}, {weather.location.country}</span>
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-5xl font-bold">{Math.round(weather.current.temp)}°F</span>
              <div className="flex flex-col text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-orange-500" />
                  <span>H: {Math.round(weather.daily.temp_max)}°</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-3 w-3 text-blue-500" />
                  <span>L: {Math.round(weather.daily.temp_min)}°</span>
                </div>
              </div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Feels like {Math.round(weather.current.feels_like)}°F
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={getWeatherIcon(weather.current.icon)}
              alt={weather.current.condition}
              className="h-20 w-20"
            />
            <span className="text-sm font-medium">{weather.current.description}</span>
          </div>
        </div>
      </div>

      {/* Weather details */}
      <div className="grid grid-cols-3 gap-4 border-b p-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-blue-500" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Humidity</span>
            <span className="text-sm font-medium">{weather.current.humidity}%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-gray-500" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Wind</span>
            <span className="text-sm font-medium">{weather.current.wind_speed} mph</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-purple-500" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Visibility</span>
            <span className="text-sm font-medium">{weather.current.visibility} mi</span>
          </div>
        </div>
      </div>

      {/* Hourly forecast */}
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Next 3 Hours</h4>
        <div className="grid grid-cols-3 gap-4">
          {weather.hourly.map((hour, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg bg-muted/30 p-3 transition-colors hover:bg-muted/50"
            >
              <span className="text-sm font-medium">{hour.time}</span>
              <img
                src={getWeatherIcon(hour.icon)}
                alt={hour.description}
                className="h-10 w-10"
              />
              <span className="text-lg font-semibold">{Math.round(hour.temp)}°</span>
              <span className="text-xs text-muted-foreground">{hour.description}</span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="border-t p-3 text-center text-xs text-muted-foreground">
          {error} - Showing sample data
        </div>
      )}
    </Card>
  )
}
