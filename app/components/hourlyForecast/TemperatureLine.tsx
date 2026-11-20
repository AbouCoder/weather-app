import { HourForecast } from "../../lib/types";
import { CHART_HEIGHT, ChartPoint } from "../../lib/hourlyChart";
import { Temperature } from "../Temperature";

interface TemperatureLineProps {
  hourly: HourForecast[];
  chartWidth: number;
  temperaturePoints: ChartPoint[];
  linePoints: string;
  areaPoints: string;
}

// The temperature line with its fill and dots, and each hour's temperature
// written above its dot
export function TemperatureLine({
  hourly,
  chartWidth,
  temperaturePoints,
  linePoints,
  areaPoints,
}: TemperatureLineProps) {
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
        {temperaturePoints.map(({ x, y }, index) => (
          <circle key={hourly[index].time} cx={x} cy={y} r={3} fill="white" />
        ))}
      </svg>
      {hourly.map((hour, index) => (
        <Temperature
          key={hour.time}
          celsius={hour.temperature}
          size="small"
          className="absolute -translate-x-1/2"
          // 24px up clears the dot; the chart's top padding makes room for it
          style={{
            left: temperaturePoints[index].x,
            top: temperaturePoints[index].y - 24,
          }}
        />
      ))}
    </div>
  );
}
