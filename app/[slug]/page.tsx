import { Suspense } from "react";
import { notFound } from "next/navigation";
import { locations, getLocationBySlug } from "../data/locations";
import { getWeather } from "../actions/actions";
import { getWeatherIcon } from "../lib/weatherIcons";
import { getWeatherDescription } from "../lib/weatherDescriptions";
import { getWeatherBackground } from "../lib/weatherBackgrounds";
import {
  getCurrentTimeInTimezone,
  formatDate,
  getDayName,
  isNightTime,
} from "../lib/utils";
import { DaysListItem } from "../components/DaysListItem";
import { CurrentWeatherSummary } from "../components/CurrentWeatherSummary";

export function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LocationPage({ params }: PageProps) {
  return (
    <Suspense fallback={<LocationWeatherFallback />}>
      <LocationWeather params={params} />
    </Suspense>
  );
}

function LocationWeatherFallback() {
  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto py-24 px-6">
        <p className="text-base text-muted-foreground text-shadow-sm">
          Loading weather…
        </p>
      </div>
    </div>
  );
}

async function LocationWeather({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const weather = await getWeather(location.lat, location.lon);
  const todayForecast = weather.daily[0];
  const Icon = getWeatherIcon(weather.current.weatherCode);
  const description = getWeatherDescription(weather.current.weatherCode);
  const isNight = isNightTime(
    weather.current.timezone,
    weather.current.sunrise,
    weather.current.sunset
  );
  const background = getWeatherBackground(weather.current.weatherCode, isNight);

  return (
    <div className={`min-h-screen bg-linear-to-b ${background}`}>
      <div className="max-w-xl mx-auto py-24 px-6 flex flex-col gap-16">
        <header className="flex flex-col gap-8">
          <section className="flex flex-col">
            <h2 className="text-xl font-semibold text-shadow-md">
              {location.name}
            </h2>
            <p className="text-base text-muted-foreground text-shadow-sm">
              {formatDate(todayForecast.date)}{" "}
              {getCurrentTimeInTimezone(weather.current.timezone)}
            </p>
          </section>

          <CurrentWeatherSummary
            temperature={weather.current.temperature}
            description={description}
            Icon={Icon}
            isNight={isNight}
          />
        </header>

        <section>
          <h2 className="text-base font-semibold mb-4 text-shadow-md">
            7-Day Forecast
          </h2>
          <ul className="flex flex-col">
            {weather.daily.map((day, index) => {
              const DayIcon = getWeatherIcon(day.weatherCode);
              return (
                <DaysListItem
                  key={day.date}
                  day={getDayName(day.date, index)}
                  maxTemp={day.maxTemp}
                  minTemp={day.minTemp}
                  Icon={DayIcon}
                />
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}