import { HourlyForecast } from "../lib/types";
import { Temperature } from "./Temperature";
import { getWeatherIcon } from "../lib/weatherIcons";
import { formatHourMinute, formatHourLabel } from "../lib/dateTime";

interface HourlyForecastChartProps {
  forecast: HourlyForecast;
}

const COLUMN_WIDTH = 56;
const CHART_HEIGHT = 96;
// Room above the line for the temperature labels, and below it for the fill
const CHART_PADDING_TOP = 28;
const CHART_PADDING_BOTTOM = 12;
const MAX_BAR_HEIGHT = 32;
const HOUR_MS = 60 * 60 * 1000;

export function HourlyForecastChart({ forecast }: HourlyForecastChartProps) {
  const { hourly, sunrise, sunset } = forecast;
  const chartWidth = hourly.length * COLUMN_WIDTH;
  const firstHourMs = new Date(hourly[0].time).getTime();

  const temperatures = hourly.map((hour) => hour.temperature);
  const minCelsius = Math.min(...temperatures);
  const temperatureRange = Math.max(...temperatures) - minCelsius || 1;

  const temperaturePoints = hourly.map((hour, index) => ({
    x: (index + 0.5) * COLUMN_WIDTH,
    y:
      CHART_PADDING_TOP +
      (1 - (hour.temperature - minCelsius) / temperatureRange) *
        (CHART_HEIGHT - CHART_PADDING_TOP - CHART_PADDING_BOTTOM),
  }));
  const linePoints = temperaturePoints
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");
  const firstX = temperaturePoints[0].x;
  const lastX = temperaturePoints.at(-1)!.x;
  const areaPoints = `${firstX},${CHART_HEIGHT} ${linePoints} ${lastX},${CHART_HEIGHT}`;

  // Places a time on the same axis as the hourly points
  const getXForTime = (time: string) =>
    ((new Date(time).getTime() - firstHourMs) / HOUR_MS + 0.5) * COLUMN_WIDTH;

  const sunMarkers = [
    { label: "Sunset", time: sunset },
    { label: "Sunrise", time: sunrise },
  ].filter(({ time }) => {
    const offset = getXForTime(time);
    return offset >= 0 && offset <= chartWidth;
  });

  const isNightHour = (time: string) =>
    sunset < sunrise
      ? time >= sunset && time < sunrise
      : time < sunrise || time >= sunset;

  return (
    <section>
      <h2 className="text-base font-semibold mb-4 text-shadow-md">
        Next 24 Hours
      </h2>
      <div
        className="overflow-x-auto border-t border-border pt-4 pb-2 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent] [--animation-duration:0]"
        tabIndex={0}
        aria-label="Hourly temperature, conditions and chance of precipitation"
      >
        {/* Bottom padding leaves room for the sunrise and sunset labels */}
        <div className="relative pb-8" style={{ width: chartWidth }}>
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

          <div
            className="relative"
            style={{ height: CHART_HEIGHT }}
            aria-hidden
          >
            <svg
              width={chartWidth}
              height={CHART_HEIGHT}
              className="absolute inset-0 overflow-visible"
            >
              <polygon
                points={areaPoints}
                fill="url(#temperatureAreaGradient)"
              />
              <polyline
                points={linePoints}
                fill="none"
                stroke="white"
                strokeOpacity={0.8}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {temperaturePoints.map(({ x, y }, index) => (
                <circle
                  key={hourly[index].time}
                  cx={x}
                  cy={y}
                  r={3}
                  fill="white"
                />
              ))}
            </svg>
            {hourly.map((hour, index) => (
              <span
                key={hour.time}
                className="absolute -translate-x-1/2 text-sm font-medium text-shadow-sm"
                style={{
                  left: temperaturePoints[index].x,
                  top: temperaturePoints[index].y - 24,
                }}
              >
                <Temperature celsius={hour.temperature} />
              </span>
            ))}
          </div>

          <ol className="flex" aria-hidden>
            {hourly.map((hour) => (
              <li
                key={hour.time}
                className="flex flex-col items-center justify-end gap-1 shrink-0"
                style={{ width: COLUMN_WIDTH, height: MAX_BAR_HEIGHT + 24 }}
              >
                <div
                  className="w-3 rounded-t-sm bg-linear-to-b from-sky-300 to-blue-500 inset-shadow-xs inset-shadow-white/40"
                  style={{
                    height:
                      (hour.precipitationProbability / 100) * MAX_BAR_HEIGHT,
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

          {sunMarkers.map(({ label, time }) => (
            <div
              key={label}
              className="absolute top-0 bottom-0 flex flex-col items-start pointer-events-none"
              style={{ left: getXForTime(time) }}
            >
              <div className="flex-1 border-l border-dashed border-white/40" />
              <span className="-translate-x-1/2 mt-1 whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-xs text-shadow-sm inset-shadow-xs inset-shadow-white/20">
                {label} {formatHourMinute(time)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
