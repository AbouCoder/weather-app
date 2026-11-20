import { HourForecast } from "@/lib/weather/types";
import { COLUMN_WIDTH } from "./hourlyChart";
import { formatHourLabel } from "@/lib/dateTime";
import { getWeatherIcon } from "@/components/icons";
import { Temperature } from "@/components/temperature/Temperature";

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
  const columns = hourly.map((hour, index) => ({
    time: hour.time,
    label: index === 0 ? "Now" : formatHourLabel(hour.time),
    Icon: getWeatherIcon(hour.weatherCode),
    isNight: isNightHour(hour.time),
    temperature: hour.temperature,
    precipitationProbability: hour.precipitationProbability,
  }));

  return (
    <ol className="flex">
      {columns.map(({ time, label, Icon, isNight, ...column }) => (
        <li
          key={time}
          className="flex flex-col items-center gap-2 shrink-0"
          style={{ width: COLUMN_WIDTH }}
        >
          <time dateTime={time} className="text-caption">
            {label}
          </time>
          <Icon isNight={isNight} className="size-8" />
          <span className="sr-only">
            <Temperature celsius={column.temperature} />,{" "}
            {column.precipitationProbability}% chance of precipitation
          </span>
        </li>
      ))}
    </ol>
  );
}
