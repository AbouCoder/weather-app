import { Suspense } from "react";
import { cities } from "@/data/cities";
import { getWeather } from "./actions/actions";
import { getWeatherIcon } from "./lib/weatherIcons";
import { getWeatherDescription } from "./lib/weatherDescriptions";
import { isNightTime } from "./lib/utils";
import { LocationCard } from "./components/LocationCard";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto py-24 px-6">
      <Suspense fallback={<LocationListFallback />}>
        <LocationList />
      </Suspense>
    </div>
  );
}

function LocationListFallback() {
  return (
    <ul className="flex flex-col gap-4">
      {cities.map((city) => (
        <li
          key={city.slug}
          className="py-6 px-7 rounded-2xl bg-white/5 inset-shadow-xs inset-shadow-white/20"
        >
          <h2 className="text-base font-semibold text-shadow-md">
            {city.name}
          </h2>
          <p className="text-sm text-muted-foreground text-shadow-sm">
            Loading weather…
          </p>
        </li>
      ))}
    </ul>
  );
}

async function LocationList() {
  const weatherData = await Promise.all(
    cities.map(async (city) => {
      const weather = await getWeather(city.lat, city.lon);
      return { city, weather };
    })
  );

  return (
    <ul className="flex flex-col gap-4">
      {weatherData.map(({ city, weather }) => {
        const Icon = getWeatherIcon(weather.current.weatherCode);
        const description = getWeatherDescription(weather.current.weatherCode);
        const isNight = isNightTime(
          weather.current.timezone,
          weather.current.sunrise,
          weather.current.sunset
        );

        return (
          <li key={city.slug}>
            <LocationCard
              slug={city.slug}
              name={city.name}
              description={description}
              temperature={weather.current.temperature}
              timezone={weather.current.timezone}
              weatherCode={weather.current.weatherCode}
              Icon={Icon}
              isNight={isNight}
            />
          </li>
        );
      })}
    </ul>
  );
}