import { WeatherIconProps } from "@/components/icons/types";
import { WeatherIconFrame } from "@/components/icons/WeatherIconFrame";
import { Cloud, Thunderbolt } from "@/components/icons/primitives";

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
