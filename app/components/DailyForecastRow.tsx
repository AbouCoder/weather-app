import { WeatherIcon } from "../lib/types";
import { Temperature } from "./Temperature";

interface DailyForecastRowProps {
  dayLabel: string;
  maxCelsius: number;
  minCelsius: number;
  Icon: WeatherIcon;
}

export function DailyForecastRow({
  dayLabel,
  maxCelsius,
  minCelsius,
  Icon,
}: DailyForecastRowProps) {
  return (
    <li className="flex justify-between items-center py-4 gap-4 border-t border-border [--animation-duration:0]">
      <h3 className="text-base font-medium text-shadow-sm">{dayLabel}</h3>
      <Icon className="size-8 ml-auto" />
      <div className="flex gap-4 w-16 justify-end text-base font-normal">
        <span>
          <Temperature celsius={maxCelsius} />
        </span>
        <span className="text-muted-foreground text-shadow-sm">
          <Temperature celsius={minCelsius} />
        </span>
      </div>
    </li>
  );
}
