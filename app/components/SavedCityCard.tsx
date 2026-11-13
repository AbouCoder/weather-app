"use client";

import { useEffect, useState } from "react";
import { City } from "@/data/cities";
import { WeatherData } from "../lib/types";
import { CityCardPlaceholder } from "./CityCardPlaceholder";
import { CityWeatherCard } from "./CityWeatherCard";

interface SavedCityCardProps {
  city: City;
}

type WeatherState = WeatherData | "loading" | "error";

// The home page list lives in localStorage, so each card fetches its weather
// in the browser
export function SavedCityCard({ city }: SavedCityCardProps) {
  const [weather, setWeather] = useState<WeatherState>("loading");

  useEffect(() => {
    let ignore = false;

    fetch(`/api/weather?slug=${encodeURIComponent(city.slug)}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Weather error: ${response.status}`);
        return response.json() as Promise<WeatherData>;
      })
      .then((data) => {
        if (!ignore) setWeather(data);
      })
      .catch(() => {
        if (!ignore) setWeather("error");
      });

    return () => {
      ignore = true;
    };
  }, [city.slug]);

  if (weather === "loading") {
    return <CityCardPlaceholder name={city.name} message="Loading weather…" />;
  }

  if (weather === "error") {
    return (
      <CityCardPlaceholder name={city.name} message="Weather unavailable" />
    );
  }

  return <CityWeatherCard city={city} weather={weather} />;
}
