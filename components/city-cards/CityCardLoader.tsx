"use client";

import { useEffect, useState } from "react";
import { City } from "@/data/cities";
import { WeatherForecast } from "@/lib/weather/types";
import { CityCardPlaceholder } from "./CityCardPlaceholder";
import { CityCard } from "./CityCard";
import { CityCardControlsProps } from "./CityCardControls";

interface CityCardLoaderProps extends Omit<CityCardControlsProps, "name"> {
  city: City;
}

type WeatherState = WeatherForecast | "loading" | "error";

// The home page list lives in localStorage, so each card fetches its weather
// in the browser
export function CityCardLoader({
  city,
  dragHandle,
  onDelete,
}: CityCardLoaderProps) {
  const [weather, setWeather] = useState<WeatherState>("loading");

  useEffect(() => {
    // Set when the card unmounts or switches city, so a late response from
    // the previous request can't overwrite the current one
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
      <CityCardPlaceholder name={city.name} state="loading" {...controls} />
    );
  }

  if (weather === "error") {
    return (
      <CityCardPlaceholder name={city.name} state="error" {...controls} />
    );
  }

  return <CityCard city={city} weather={weather} {...controls} />;
}
