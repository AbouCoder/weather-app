"use client";

import { useEffect, useState } from "react";
import { City } from "@/data/cities";
import { WeatherForecast } from "../lib/types";
import { CityCardPlaceholder } from "./CityCardPlaceholder";
import { CityWeatherCard } from "./CityWeatherCard";
import { CityCardControlsProps } from "./CityCardControls";

interface CityWeatherLoaderProps extends Omit<CityCardControlsProps, "name"> {
  city: City;
}

type WeatherState = WeatherForecast | "loading" | "error";

// The home page list lives in localStorage, so each card fetches its weather
// in the browser
export function CityWeatherLoader({
  city,
  dragHandle,
  onDelete,
}: CityWeatherLoaderProps) {
  const [weather, setWeather] = useState<WeatherState>("loading");

  useEffect(() => {
    let ignore = false;

    fetch(`/api/weather?slug=${encodeURIComponent(city.slug)}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Weather error: ${response.status}`);
        return response.json() as Promise<WeatherForecast>;
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

  const controls = { dragHandle, onDelete };

  if (weather === "loading") {
    return (
      <CityCardPlaceholder
        name={city.name}
        message="Loading weather…"
        {...controls}
      />
    );
  }

  if (weather === "error") {
    return (
      <CityCardPlaceholder
        name={city.name}
        message="Weather unavailable"
        {...controls}
      />
    );
  }

  return <CityWeatherCard city={city} weather={weather} {...controls} />;
}
