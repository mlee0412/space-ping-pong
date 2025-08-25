"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from "lucide-react"

interface Weather {
  temperature: number
  windspeed: number
  weathercode: number
}

function getWeatherIcon(code: number) {
  if (code === 0) return Sun
  if (code === 1 || code === 2 || code === 3) return Cloud
  if ((code >= 45 && code <= 48)) return CloudFog
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return CloudRain
  if (code >= 71 && code <= 77) return CloudSnow
  if (code >= 95) return CloudLightning
  return Cloud
}

function getWeatherText(code: number) {
  if (code === 0) return "Clear"
  if (code === 1) return "Mainly Clear"
  if (code === 2) return "Partly Cloudy"
  if (code === 3) return "Overcast"
  if (code === 45 || code === 48) return "Fog"
  if (code >= 51 && code <= 57) return "Drizzle"
  if (code >= 61 && code <= 67) return "Rain"
  if (code >= 71 && code <= 77) return "Snow"
  if (code >= 80 && code <= 82) return "Showers"
  if (code >= 95) return "Thunderstorm"
  return "Unknown"
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true")
      .then(res => res.json())
      .then(data => {
        setWeather(data.current_weather)
      })
      .catch(() => {
        setWeather(null)
      })
  }, [])

  const Icon = weather ? getWeatherIcon(weather.weathercode) : null

  return (
    <Card className="w-full max-w-sm bg-black/50 backdrop-blur-xl border-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">New York City</CardTitle>
        {Icon && <Icon className="h-6 w-6 text-foreground" />}
      </CardHeader>
      <CardContent>
        {weather ? (
          <div className="flex items-baseline justify-between">
            <div className="text-4xl font-bold">{Math.round(weather.temperature)}°C</div>
            <div className="text-right text-sm text-muted-foreground">
              <div>{getWeatherText(weather.weathercode)}</div>
              <div>Wind {Math.round(weather.windspeed)} km/h</div>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground">Loading weather...</div>
        )}
      </CardContent>
    </Card>
  )
}

