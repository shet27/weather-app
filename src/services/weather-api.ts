// src/services/weather-api.ts

const API_KEY = "ad03eca71689ff9a46c1f051c7f8bb6d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchCityWeather = async (cityName: string) => {
  try {
    const res = await fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    return {
      name: data.name,
      temperature: data.main.temp,
      weather: data.weather[0].main,
      AQI: "N/A", // AQI needs separate endpoint
      wind: data.wind.speed + " m/s",
      highest: data.main.temp_max,
      lowest: data.main.temp_min,
      time: new Date().toLocaleTimeString(),
    };
  } catch (err) {
    console.error("Weather API error:", err);
    return null;
  }
};
