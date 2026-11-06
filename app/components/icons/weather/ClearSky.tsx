import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Moon, Sun } from "../primitives";

export function ClearSky({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      {isNight ? <Moon /> : <Sun />}
    </WeatherIcon>
  );
}