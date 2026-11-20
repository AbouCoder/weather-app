import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";
import { fetchWeatherForecast } from "@/lib/weather/forecast";
import { getCurrentConditions } from "@/lib/weather/currentConditions";
import { getWeatherIcon } from "@/components/icons";
import { CityHeading } from "@/components/city-page/CityHeading";
import { CityPageSkeleton } from "@/components/city-page/CityPageSkeleton";
import { CurrentWeatherSummary } from "@/components/city-page/CurrentWeatherSummary";
import { HourlyForecastSection } from "@/components/hourly-forecast/HourlyForecastSection";
import { CityPageLayout } from "@/components/city-page/CityPageLayout";
import { DailyForecastSection } from "@/components/city-page/DailyForecastSection";
import { hourlyForecastPlaceholder } from "@/data/hourlyForecast";

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
    <Suspense fallback={<CityPageSkeleton />}>
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
  const { current, daily } = weather;
  const { description, isNight, gradientClasses } =
    getCurrentConditions(current);
  const Icon = getWeatherIcon(current.weatherCode);
  const today = daily[0].date;

  return (
    <CityPageLayout gradientClasses={gradientClasses}>
      <header className="flex flex-col gap-8">
        <CityHeading
          name={city.name}
          date={today}
          timezone={current.timezone}
        />
        <CurrentWeatherSummary
          temperature={current.temperature}
          description={description}
          Icon={Icon}
          isNight={isNight}
        />
      </header>

      <DailyForecastSection days={daily} />

      <HourlyForecastSection forecast={hourlyForecastPlaceholder} />
    </CityPageLayout>
  );
}
