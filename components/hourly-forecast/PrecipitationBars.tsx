import { HourForecast } from "@/lib/weather/types";
import { COLUMN_WIDTH, MAX_BAR_HEIGHT } from "./hourlyChart";

interface PrecipitationBarsProps {
  hourly: HourForecast[];
}

// The bottom row of the chart: a bar and percentage for each hour's chance
// of precipitation
export function PrecipitationBars({ hourly }: PrecipitationBarsProps) {
  return (
    <ol className="flex" aria-hidden>
      {hourly.map((hour) => (
        <li
          key={hour.time}
          className="flex flex-col items-center justify-end gap-1 shrink-0"
          // A fixed height, with room under the tallest bar for the
          // percentage, keeps every bar's base on the same line
          style={{ width: COLUMN_WIDTH, height: MAX_BAR_HEIGHT + 24 }}
        >
          <div
            className="w-3 rounded-t-sm bg-linear-to-b from-sky-300 to-blue-500 inset-shadow-xs inset-shadow-white/40"
            style={{
              height: (hour.precipitationProbability / 100) * MAX_BAR_HEIGHT,
            }}
          />
          <span
            className={`text-xs text-shadow-sm ${
              hour.precipitationProbability > 0
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {hour.precipitationProbability}%
          </span>
        </li>
      ))}
    </ol>
  );
}
