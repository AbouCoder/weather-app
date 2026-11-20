import { WeatherIcon } from "../lib/types";
import { ListRow } from "./ListRow";
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
    <ListRow className="icon-motion-paused">
      <h3 className="text-base font-medium text-shadow-sm">{dayLabel}</h3>
      <Icon className="size-8 ml-auto" />
      <div className="flex gap-4 w-16 justify-end">
        <Temperature celsius={maxCelsius} size="body" />
        <Temperature celsius={minCelsius} size="body" tone="muted" />
      </div>
    </ListRow>
  );
}
