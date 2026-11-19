import { City } from "@/data/cities";
import { WeatherForecast } from "../lib/types";
import { getCurrentConditions } from "../lib/currentConditions";
import { CityCardLayout } from "./CityCardLayout";
import { CityCardControlsProps } from "./CityCardControls";

interface CityWeatherCardProps extends Omit<CityCardControlsProps, "name"> {
  city: City;
  weather: WeatherForecast;
}

// The weather card for one city on the home page
export function CityWeatherCard({
  city,
  weather,
  dragHandle,
  onDelete,
}: CityWeatherCardProps) {
  const { Icon, description, isNight, gradientClasses } = getCurrentConditions(
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
      Icon={Icon}
      isNight={isNight}
      dragHandle={dragHandle}
      onDelete={onDelete}
    />
  );
}
