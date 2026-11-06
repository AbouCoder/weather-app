import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Cloud, Moon, Sun } from "../primitives";

export function MainlyClear({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      {isNight ? <Moon x={-20} y={-20} /> : <Sun x={-20} y={-20} />}
      <g className="animate-hover">
        <Cloud x={60} y={70} scale={0.55} />
      </g>
      <g className="animate-hover [--animation-delay:-2.5s]">
        <Cloud x={-90} y={-60} scale={0.4} />
      </g>
    </WeatherIcon>
  );
}