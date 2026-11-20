import { WeatherIconProps } from "@/components/icons/types";
import { WeatherIconFrame } from "@/components/icons/WeatherIconFrame";
import { Moon, Sun } from "@/components/icons/primitives";

export function ClearSky({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIconFrame className={className}>
      {isNight ? <Moon /> : <Sun />}
    </WeatherIconFrame>
  );
}