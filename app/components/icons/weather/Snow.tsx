import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Cloud, Moon, Snowflake, Sun } from "../primitives";

export function Snow({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      {isNight ? (
        <Moon x={70} y={-80} scale={0.55} />
      ) : (
        <Sun x={70} y={-80} scale={0.55} />
      )}
      <g className="animate-hover">
        <Cloud y={-40} />
        <g className="animate-fall">
          <Snowflake x={-64} />
        </g>
        <g className="animate-fall [--animation-delay:-0.5s]">
          <Snowflake y={30} />
        </g>
        <g className="animate-fall [--animation-delay:-0.25s]">
          <Snowflake x={64} />
        </g>
      </g>
    </WeatherIcon>
  );
}