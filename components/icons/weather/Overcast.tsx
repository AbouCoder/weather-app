import { WeatherIconProps } from "@/components/icons/types";
import { WeatherIconFrame } from "@/components/icons/WeatherIconFrame";
import { Cloud } from "@/components/icons/primitives";

export function Overcast({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIconFrame className={className}>
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
    </WeatherIconFrame>
  );
}