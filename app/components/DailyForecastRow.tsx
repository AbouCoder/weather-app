import { WeatherIcon } from "../lib/types";
import { ListRow } from "./ListRow";
import { Temperature } from "./Temperature";

interface DailyForecastRowProps {
  // The day as "YYYY-MM-DD"
  date: string;
  dayLabel: string;
  maxCelsius: number;
  minCelsius: number;
  Icon: WeatherIcon;
}

export function DailyForecastRow({
  date,
  dayLabel,
  maxCelsius,
  minCelsius,
  Icon,
}: DailyForecastRowProps) {
  return (
    <ListRow className="icon-motion-paused">
      <time dateTime={date} className="text-base font-medium text-shadow-sm">
        {dayLabel}
      </time>
      <Icon className="size-8 ml-auto" />
      {/* The hidden labels say which number is which; being sr-only they
          sit outside the flex layout */}
      <p className="flex gap-4 w-16 justify-end">
        <span className="sr-only">High </span>
        <Temperature celsius={maxCelsius} size="body" />
        <span className="sr-only">, low </span>
        <Temperature celsius={minCelsius} size="body" tone="muted" />
      </p>
    </ListRow>
  );
}
