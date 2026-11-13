import { Suspense } from "react";
import { City, defaultCitySlugs, getCityBySlug } from "@/data/cities";
import { getWeather } from "./actions/actions";
import { CityCardPlaceholder } from "./components/CityCardPlaceholder";
import { CityWeatherCard } from "./components/CityWeatherCard";
import { UserCities } from "./components/UserCities";

const defaultCities = defaultCitySlugs
  .map(getCityBySlug)
  .filter((city): city is City => city !== undefined);

export default function Home() {
  return (
    <div className="max-w-xl mx-auto py-24 px-6">
      <UserCities>
        <Suspense fallback={<LocationListFallback />}>
          <LocationList />
        </Suspense>
      </UserCities>
    </div>
  );
}

function LocationListFallback() {
  return (
    <ul className="flex flex-col gap-4">
      {defaultCities.map((city) => (
        <li key={city.slug}>
          <CityCardPlaceholder name={city.name} message="Loading weather…" />
        </li>
      ))}
    </ul>
  );
}

async function LocationList() {
  const weatherData = await Promise.all(
    defaultCities.map(async (city) => {
      const weather = await getWeather(city.lat, city.lon);
      return { city, weather };
    }),
  );

  return (
    <ul className="flex flex-col gap-4">
      {weatherData.map(({ city, weather }) => (
        <li key={city.slug}>
          <CityWeatherCard city={city} weather={weather} />
        </li>
      ))}
    </ul>
  );
}
