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

export function getWeatherIcon(code: number): WeatherIcon {
  // WMO Weather interpretation codes
  if (code === 0) return ClearSky;
  if (code === 1) return MainlyClear;
  if (code === 2) return PartlyCloudy;
  if (code === 3 || code === 45 || code === 48) return Overcast;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return Rainy;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return Snow;
  if (code >= 95 && code <= 99) return Thunderstorm;

  return PartlyCloudy;
}