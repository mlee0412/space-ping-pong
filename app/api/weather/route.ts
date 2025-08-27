import { NextRequest, NextResponse } from "next/server"

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || "7c539a89952ba608bbdf5e1bf7fb015f"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")
    const tz = searchParams.get("tz") || "America/New_York"

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

    // Reverse geocode for more precise location name
    let locationName = currentWeather.name
    let countryCode = currentWeather.sys.country
    try {
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: {
            "User-Agent": "space-ping-pong/1.0",
          },
        }
      )
      if (geoResponse.ok) {
        const geoData = await geoResponse.json()
        locationName =
          geoData.address?.neighbourhood ||
          geoData.address?.suburb ||
          geoData.address?.city ||
          locationName
        countryCode = geoData.address?.country_code
          ? geoData.address.country_code.toUpperCase()
          : countryCode
      }
    } catch (e) {
      // ignore geocode errors
    }

    // Select next three future forecasts
    const nextThree = forecast.list
      .filter((item: any) => item.dt > currentWeather.dt)
      .slice(0, 3)
      .map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
          timeZone: tz,
        }),
        temp: item.main.temp,
        icon: item.weather[0].icon,
        description: item.weather[0].main,
      }))

    // Process the data
    const weatherData = {
      location: {
        name: locationName,
        country: countryCode,
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
      hourly: nextThree,
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

