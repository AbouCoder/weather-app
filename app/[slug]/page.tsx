import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";
import { fetchWeatherForecast } from "../actions/weather";
import { getCurrentConditions } from "../lib/currentConditions";
import { CityHeading } from "../components/CityHeading";
import { CurrentWeatherSummary } from "../components/CurrentWeatherSummary";
import { HourlyForecastChart } from "../components/HourlyForecastChart";
import { SevenDayForecast } from "../components/SevenDayForecast";
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
  const { Icon, description, isNight, gradientClasses } = getCurrentConditions(
    weather.current,
  );

  return (
    <div className={`min-h-screen bg-linear-to-b ${gradientClasses}`}>
      <div className="max-w-xl mx-auto py-24 px-6 flex flex-col gap-16">
        <header className="flex flex-col gap-8">
          <CityHeading
            name={city.name}
            date={weather.daily[0].date}
            timezone={weather.current.timezone}
          />
          <CurrentWeatherSummary
            temperature={weather.current.temperature}
            description={description}
            Icon={Icon}
            isNight={isNight}
          />
        </header>

        <SevenDayForecast days={weather.daily} />

        <HourlyForecastChart forecast={hourlyForecastPlaceholder} />
      </div>
    </div>
  );
}
