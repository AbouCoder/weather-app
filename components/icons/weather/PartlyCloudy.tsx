import { WeatherIconProps } from "@/components/icons/types";
import { WeatherIconFrame } from "@/components/icons/WeatherIconFrame";
import { Cloud, Moon, Sun } from "@/components/icons/primitives";

export function PartlyCloudy({ isNight, className }: WeatherIconProps) {
  return (
    <WeatherIconFrame className={className}>
      {isNight ? <Moon x={20} y={-10} /> : <Sun x={20} y={-10} />}
      <g className="animate-hover">
        <Cloud x={-20} y={30} />
      </g>
    </WeatherIconFrame>
  );
}
