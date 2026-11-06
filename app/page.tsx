import { Suspense } from "react";
import { locations } from "./data/locations";
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
      {locations.map((location) => (
        <li
          key={location.slug}
          className="py-6 px-7 rounded-2xl bg-white/5 inset-shadow-xs inset-shadow-white/20"
        >
          <h2 className="text-base font-semibold text-shadow-md">
            {location.name}
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
    locations.map(async (location) => {
      const weather = await getWeather(location.lat, location.lon);
      return { location, weather };
    })
  );

  return (
    <ul className="flex flex-col gap-4">
      {weatherData.map(({ location, weather }) => {
        const Icon = getWeatherIcon(weather.current.weatherCode);
        const description = getWeatherDescription(weather.current.weatherCode);
        const isNight = isNightTime(
          weather.current.timezone,
          weather.current.sunrise,
          weather.current.sunset
        );

        return (
          <li key={location.slug}>
            <LocationCard
              slug={location.slug}
              name={location.name}
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