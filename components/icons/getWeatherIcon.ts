import {
  getWeatherCondition,
  WeatherCondition,
} from "@/lib/weather/weatherCodes";
import { WeatherIcon } from "./types";
import {
  ClearSky,
  MainlyClear,
  Overcast,
  PartlyCloudy,
  Rainy,
  Snow,
  Thunderstorm,
} from "./weather";

const ICONS: Record<WeatherCondition, WeatherIcon> = {
  clear: ClearSky,
  "mainly-clear": MainlyClear,
  "partly-cloudy": PartlyCloudy,
  overcast: Overcast,
  rain: Rainy,
  snow: Snow,
  thunderstorm: Thunderstorm,
  // A neutral icon rather than none
  unknown: PartlyCloudy,
};

export function getWeatherIcon(weatherCode: number): WeatherIcon {
  return ICONS[getWeatherCondition(weatherCode)];
}
