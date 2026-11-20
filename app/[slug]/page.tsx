import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";
import { fetchWeatherForecast } from "../actions/weather";
import { getCurrentConditions } from "../lib/currentConditions";
import { CityHeading } from "../components/CityHeading";
import { CityWeatherSkeleton } from "../components/CityWeatherSkeleton";
import { CurrentWeatherSummary } from "../components/CurrentWeatherSummary";
import { HourlyForecastChart } from "../components/HourlyForecastChart";
import { CityPageLayout } from "../components/CityPageLayout";
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
    <Suspense fallback={<CityWeatherSkeleton />}>
      <CityWeather params={params} />
    </Suspense>
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
    <CityPageLayout gradientClasses={gradientClasses}>
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
    </CityPageLayout>
  );
}
