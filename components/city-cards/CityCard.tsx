import { City } from "@/data/cities";
import { WeatherForecast } from "@/lib/weather/types";
import { getCurrentConditions } from "@/lib/weather/currentConditions";
import { getWeatherIcon } from "@/components/icons";
import { CityCardLayout } from "./CityCardLayout";
import { CityCardControlsProps } from "./CityCardControls";

interface CityCardProps extends Omit<CityCardControlsProps, "name"> {
  city: City;
  weather: WeatherForecast;
}

// The weather card for one city on the home page
export function CityCard({
  city,
  weather,
  dragHandle,
  onDelete,
}: CityCardProps) {
  const { description, isNight, gradientClasses } = getCurrentConditions(
    weather.current,
  );

  return (
    <CityCardLayout
      slug={city.slug}
      name={city.name}
      description={description}
      temperature={weather.current.temperature}
      timezone={weather.current.timezone}
      gradientClasses={gradientClasses}
      Icon={getWeatherIcon(weather.current.weatherCode)}
      isNight={isNight}
      dragHandle={dragHandle}
      onDelete={onDelete}
    />
  );
}
