import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";
import { fetchWeatherForecast } from "../actions/weather";
import { getWeatherIcon } from "../lib/weatherIcons";
import { getWeatherDescription } from "../lib/weatherDescriptions";
import { getWeatherGradientClasses } from "../lib/weatherBackgrounds";
import {
  getCurrentTimeInTimezone,
  formatDayAndMonth,
  getForecastDayLabel,
  isNightTime,
} from "../lib/dateTime";
import { DailyForecastRow } from "../components/DailyForecastRow";
import { CurrentWeatherSummary } from "../components/CurrentWeatherSummary";
import { HourlyForecastChart } from "../components/HourlyForecastChart";
import { hourlyForecastPlaceholder } from "../data/hourlyForecast";

export function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CityPage({ params }: PageProps) {
  return (
    <Suspense fallback={<CityWeatherFallback />}>
      <CityWeather params={params} />
    </Suspense>
  );
}

function CityWeatherFallback() {
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

async function CityWeather({ params }: PageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const weather = await fetchWeatherForecast(city.lat, city.lon);
  const todayForecast = weather.daily[0];
  const Icon = getWeatherIcon(weather.current.weatherCode);
  const description = getWeatherDescription(weather.current.weatherCode);
  const isNight = isNightTime(
    weather.current.timezone,
    weather.current.sunrise,
    weather.current.sunset
  );
  const background = getWeatherGradientClasses(
    weather.current.weatherCode,
    isNight,
  );

  return (
    <div className={`min-h-screen bg-linear-to-b ${background}`}>
      <div className="max-w-xl mx-auto py-24 px-6 flex flex-col gap-16">
        <header className="flex flex-col gap-8">
          <section className="flex flex-col">
            <h2 className="text-xl font-semibold text-shadow-md">
              {city.name}
            </h2>
            <p className="text-base text-muted-foreground text-shadow-sm">
              {formatDayAndMonth(todayForecast.date)}{" "}
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
                <DailyForecastRow
                  key={day.date}
                  dayLabel={getForecastDayLabel(day.date, index)}
                  maxCelsius={day.maxCelsius}
                  minCelsius={day.minCelsius}
                  Icon={DayIcon}
                />
              );
            })}
          </ul>
        </section>

        <HourlyForecastChart forecast={hourlyForecastPlaceholder} />
      </div>
    </div>
  );
}