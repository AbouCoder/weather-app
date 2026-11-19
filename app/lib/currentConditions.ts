import { CurrentWeather, WeatherIcon } from "./types";
import { isNightTime } from "./dateTime";
import { getWeatherDescription } from "./weatherDescriptions";
import { getWeatherGradientClasses } from "./weatherBackgrounds";
import { getWeatherIcon } from "./weatherIcons";

export interface CurrentConditions {
  Icon: WeatherIcon;
  description: string;
  isNight: boolean;
  // Tailwind gradient classes for the card or page background
  gradientClasses: string;
}

// How the current weather looks: shared by the home page cards and the city
// page, so both show the same icon, wording and colours
export function getCurrentConditions(
  current: CurrentWeather,
): CurrentConditions {
  const isNight = isNightTime(current.timezone, current.sunrise, current.sunset);

  return {
    Icon: getWeatherIcon(current.weatherCode),
    description: getWeatherDescription(current.weatherCode),
    isNight,
    gradientClasses: getWeatherGradientClasses(current.weatherCode, isNight),
  };
}
