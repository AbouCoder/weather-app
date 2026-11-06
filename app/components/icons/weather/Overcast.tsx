import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Cloud } from "../primitives";

export function Overcast({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      <g className="animate-hover [--animation-delay:-2.5s]">
        <Cloud
          x={50}
          y={-50}
          scale={0.75}
          shade={isNight ? "dark" : "medium"}
        />
      </g>
      <g className="animate-hover">
        <Cloud y={20} shade={isNight ? "medium" : "light"} />
      </g>
    </WeatherIcon>
  );
}