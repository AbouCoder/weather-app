import { HourForecast } from "../../lib/types";
import { COLUMN_WIDTH } from "../../lib/hourlyChart";
import { formatHourLabel } from "../../lib/dateTime";
import { getWeatherIcon } from "../../lib/weatherIcons";
import { Temperature } from "../Temperature";

interface HourlyConditionsRowProps {
  hourly: HourForecast[];
  isNightHour: (time: string) => boolean;
}

// The top row of the chart: each hour's label and weather icon. It also
// carries the screen reader text for the whole chart, since the line and
// bars below are hidden from assistive tech
export function HourlyConditionsRow({
  hourly,
  isNightHour,
}: HourlyConditionsRowProps) {
  return (
    <ol className="flex">
      {hourly.map((hour, index) => {
        const Icon = getWeatherIcon(hour.weatherCode);
        return (
          <li
            key={hour.time}
            className="flex flex-col items-center gap-2 shrink-0"
            style={{ width: COLUMN_WIDTH }}
          >
            <span className="text-sm text-muted-foreground text-shadow-sm">
              {index === 0 ? "Now" : formatHourLabel(hour.time)}
            </span>
            <Icon isNight={isNightHour(hour.time)} className="size-8" />
            <span className="sr-only">
              <Temperature celsius={hour.temperature} />,{" "}
              {hour.precipitationProbability}% chance of precipitation
            </span>
          </li>
        );
      })}
    </ol>
  );
}
