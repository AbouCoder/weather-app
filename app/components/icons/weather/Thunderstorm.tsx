import { WeatherIconProps } from "../../../lib/types";
import { WeatherIconFrame } from "../WeatherIconFrame";
import { Cloud, Thunderbolt } from "../primitives";

export function Thunderstorm({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIconFrame className={className}>
      <g className="animate-hover">
        <g className="animate-flash">
          <Thunderbolt />
        </g>
        <Cloud y={-40} shade={isNight ? "dark" : "medium"} />
      </g>
    </WeatherIconFrame>
  );
}