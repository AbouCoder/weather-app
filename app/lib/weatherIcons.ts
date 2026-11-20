import { WeatherIcon } from "./types";
import {
  ClearSky,
  MainlyClear,
  Overcast,
  PartlyCloudy,
  Rainy,
  Snow,
  Thunderstorm,
} from "../components/icons";

export function getWeatherIcon(weatherCode: number): WeatherIcon {
  // WMO Weather interpretation codes
  if (weatherCode === 0) return ClearSky;
  if (weatherCode === 1) return MainlyClear;
  if (weatherCode === 2) return PartlyCloudy;
  // There's no fog icon; fog (45, 48) reads closest to overcast
  if (weatherCode === 3 || weatherCode === 45 || weatherCode === 48) {
    return Overcast;
  }
  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return Rainy;
  }
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return Snow;
  }
  if (weatherCode >= 95 && weatherCode <= 99) return Thunderstorm;

  // A code Open-Meteo adds later gets a neutral icon rather than none
  return PartlyCloudy;
}