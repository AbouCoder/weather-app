import { WeatherIconProps } from "@/components/icons/types";
import { WeatherIconFrame } from "@/components/icons/WeatherIconFrame";
import { Cloud, Moon, Sun } from "@/components/icons/primitives";

export function MainlyClear({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIconFrame className={className}>
      {isNight ? <Moon x={-20} y={-20} /> : <Sun x={-20} y={-20} />}
      <g className="animate-hover">
        <Cloud x={60} y={70} scale={0.55} />
      </g>
      <g className="animate-hover [--animation-delay:-2.5s]">
        <Cloud x={-90} y={-60} scale={0.4} />
      </g>
    </WeatherIconFrame>
  );
}