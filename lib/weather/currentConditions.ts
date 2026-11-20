import { CurrentWeather } from "./types";
import { isNightTime } from "@/lib/dateTime";
import {
  getWeatherDescription,
  getWeatherGradientClasses,
} from "./weatherCodes";

export interface CurrentConditions {
  description: string;
  isNight: boolean;
  // Tailwind gradient classes for the card or page background
  gradientClasses: string;
}

// How the current weather looks: shared by the home page cards and the city
// page, so both show the same wording and colours. The icon comes from
// getWeatherIcon, which the components call, so lib never imports them
export function getCurrentConditions(
  current: CurrentWeather,
): CurrentConditions {
  const isNight = isNightTime(current.timezone, current.sunrise, current.sunset);

  return {
    description: getWeatherDescription(current.weatherCode),
    isNight,
    gradientClasses: getWeatherGradientClasses(current.weatherCode, isNight),
  };
}
