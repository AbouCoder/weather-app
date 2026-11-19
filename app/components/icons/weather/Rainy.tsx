import { WeatherIconProps } from "../../../lib/types";
import { WeatherIconFrame } from "../WeatherIconFrame";
import { Cloud, Moon, Rain, Sun } from "../primitives";

export function Rainy({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIconFrame className={className}>
      {isNight ? (
        <Moon x={70} y={-80} scale={0.55} />
      ) : (
        <Sun x={70} y={-80} scale={0.55} />
      )}
      <g className="animate-hover">
        <Cloud y={-40} />
        <Rain />
      </g>
    </WeatherIconFrame>
  );
}