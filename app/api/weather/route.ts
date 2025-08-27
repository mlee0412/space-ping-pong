import { NextRequest, NextResponse } from "next/server"

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || "7c539a89952ba608bbdf5e1bf7fb015f"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      )
    }

    // Fetch current weather
    const currentWeatherResponse = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    )

    if (!currentWeatherResponse.ok) {
      throw new Error("Failed to fetch current weather")
    }

    const currentWeather = await currentWeatherResponse.json()

    // Fetch forecast (includes hourly data)
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial&cnt=8`
    )

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast")
    }

    const forecast = await forecastResponse.json()

    // Process the data
    const weatherData = {
      location: {
        name: currentWeather.name,
        country: currentWeather.sys.country,
      },
      current: {
        temp: currentWeather.main.temp,
        feels_like: currentWeather.main.feels_like,
        condition: currentWeather.weather[0].main,
        description: currentWeather.weather[0].description
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        icon: currentWeather.weather[0].icon,
        humidity: currentWeather.main.humidity,
        wind_speed: Math.round(currentWeather.wind.speed),
        visibility: Math.round(currentWeather.visibility / 1609), // Convert meters to miles
      },
      daily: {
        temp_min: currentWeather.main.temp_min,
        temp_max: currentWeather.main.temp_max,
      },
      hourly: forecast.list.slice(0, 3).map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        }),
        temp: item.main.temp,
        icon: item.weather[0].icon,
        description: item.weather[0].main,
      })),
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    )
  }
}

