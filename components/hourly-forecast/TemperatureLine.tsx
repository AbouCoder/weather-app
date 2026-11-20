import { HourForecast } from "@/lib/weather/types";
import { CHART_HEIGHT, ChartPoint } from "./hourlyChart";
import { Temperature } from "@/components/temperature/Temperature";

interface TemperatureLineProps {
  hourly: HourForecast[];
  chartWidth: number;
  temperaturePoints: ChartPoint[];
  linePoints: string;
  areaPoints: string;
}

const LABEL_OFFSET = 24;

// The temperature line with its fill and dots, and each hour's temperature
// written above its dot
export function TemperatureLine({
  hourly,
  chartWidth,
  temperaturePoints,
  linePoints,
  areaPoints,
}: TemperatureLineProps) {
  // Each hour's dot, with its temperature label 24px above it; the chart's
  // top padding makes room for the label
  const points = hourly.map((hour, index) => ({
    time: hour.time,
    celsius: hour.temperature,
    ...temperaturePoints[index],
  }));

  return (
    <div className="relative" style={{ height: CHART_HEIGHT }} aria-hidden>
      <svg
        width={chartWidth}
        height={CHART_HEIGHT}
        className="absolute inset-0 overflow-visible"
      >
        <polygon points={areaPoints} fill="url(#temperatureAreaGradient)" />
        <polyline
          points={linePoints}
          fill="none"
          stroke="white"
          strokeOpacity={0.8}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map(({ time, x, y }) => (
          <circle key={time} cx={x} cy={y} r={3} fill="white" />
        ))}
      </svg>
      {points.map(({ time, celsius, x, y }) => (
        <Temperature
          key={time}
          celsius={celsius}
          size="small"
          className="absolute -translate-x-1/2"
          style={{ left: x, top: y - LABEL_OFFSET }}
        />
      ))}
    </div>
  );
}
