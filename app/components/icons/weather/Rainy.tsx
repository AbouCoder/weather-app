import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Cloud, Moon, Rain, Sun } from "../primitives";

export function Rainy({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      {isNight ? (
        <Moon x={70} y={-80} scale={0.55} />
      ) : (
        <Sun x={70} y={-80} scale={0.55} />
      )}
      <g className="animate-hover">
        <Cloud y={-40} />
        <Rain />
      </g>
    </WeatherIcon>
  );
}