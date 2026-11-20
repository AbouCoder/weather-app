import { cn } from "@/lib/utils";
import { HourForecast } from "@/lib/weather/types";
import { COLUMN_WIDTH, MAX_BAR_HEIGHT } from "./hourlyChart";

interface PrecipitationBarsProps {
  hourly: HourForecast[];
}

// The bottom row of the chart: a bar and percentage for each hour's chance
// of precipitation
// A fixed height, with room under the tallest bar for the percentage, keeps
// every bar's base on the same line
const COLUMN_HEIGHT = MAX_BAR_HEIGHT + 24;

export function PrecipitationBars({ hourly }: PrecipitationBarsProps) {
  const bars = hourly.map((hour) => ({
    time: hour.time,
    probability: hour.precipitationProbability,
    height: (hour.precipitationProbability / 100) * MAX_BAR_HEIGHT,
    // A 0% hour is greyed out so the wet hours stand out
    isDry: hour.precipitationProbability === 0,
  }));

  return (
    <ol className="flex" aria-hidden>
      {bars.map((bar) => (
        <li
          key={bar.time}
          className="flex flex-col items-center justify-end gap-1 shrink-0"
          style={{ width: COLUMN_WIDTH, height: COLUMN_HEIGHT }}
        >
          <div
            className="w-3 rounded-t-sm bg-linear-to-b from-sky-300 to-blue-500 inset-shadow-xs inset-shadow-white/40"
            style={{ height: bar.height }}
          />
          <span
            className={cn(
              "text-xs text-shadow-sm",
              bar.isDry ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {bar.probability}%
          </span>
        </li>
      ))}
    </ol>
  );
}
