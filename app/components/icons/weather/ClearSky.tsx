import { WeatherIconProps } from "../../../lib/types";
import { WeatherIconFrame } from "../WeatherIconFrame";
import { Moon, Sun } from "../primitives";

export function ClearSky({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIconFrame className={className}>
      {isNight ? <Moon /> : <Sun />}
    </WeatherIconFrame>
  );
}