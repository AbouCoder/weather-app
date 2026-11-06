import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Cloud, Thunderbolt } from "../primitives";

export function Thunderstorm({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      <g className="animate-hover">
        <g className="animate-flash">
          <Thunderbolt />
        </g>
        <Cloud y={-40} shade={isNight ? "dark" : "medium"} />
      </g>
    </WeatherIcon>
  );
}