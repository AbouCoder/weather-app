import { HourlyForecast } from "@/lib/weather/types";

// Sizes shared by every layer of the hourly forecast chart
export const COLUMN_WIDTH = 56;
export const CHART_HEIGHT = 96;
// Room above the line for the temperature labels, and below it for the fill
const CHART_PADDING_TOP = 28;
const CHART_PADDING_BOTTOM = 12;
export const MAX_BAR_HEIGHT = 32;
const HOUR_MS = 60 * 60 * 1000;

export interface ChartPoint {
  x: number;
  y: number;
}

export interface SunMarker {
  label: "Sunrise" | "Sunset";
  time: string;
  x: number;
}

export interface HourlyChart {
  chartWidth: number;
  // One point per hour, in the same order as forecast.hourly
  temperaturePoints: ChartPoint[];
  // SVG "points" strings for the temperature line and the fill beneath it
  linePoints: string;
  areaPoints: string;
  // Only the sunrise and sunset that fall inside the chart
  sunMarkers: SunMarker[];
  isNightHour: (time: string) => boolean;
}

// Works out where everything in the hourly chart goes, with no rendering,
// so the layout maths sits in one place
export function buildHourlyChart({
  hourly,
  sunrise,
  sunset,
}: HourlyForecast): HourlyChart {
  const chartWidth = hourly.length * COLUMN_WIDTH;
  // The times have no offset, so they parse in this machine's timezone. That
  // shifts every time equally, so the gaps between them are still right
  const firstHourMs = new Date(hourly[0].time).getTime();

  const temperatures = hourly.map((hour) => hour.temperature);
  const minCelsius = Math.min(...temperatures);
  // A flat day would make the range 0; using 1 puts the line at the bottom
  // instead of dividing by zero
  const temperatureRange = Math.max(...temperatures) - minCelsius || 1;

  // Each point sits in the middle of its hour's column, under the hour label
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

  const sunMarkers = (
    [
      { label: "Sunset", time: sunset },
      { label: "Sunrise", time: sunrise },
    ] as const
  )
    .map((marker) => ({ ...marker, x: getXForTime(marker.time) }))
    .filter(({ x }) => x >= 0 && x <= chartWidth);

  // The times share one "YYYY-MM-DDTHH:MM" format, so comparing them as
  // strings compares them in time order. The chart spans 24 hours, so it
  // holds either a sunset then the next sunrise (night is between them) or a
  // sunrise then a sunset (night is outside them)
  const isNightHour = (time: string) =>
    sunset < sunrise
      ? time >= sunset && time < sunrise
      : time < sunrise || time >= sunset;

  return {
    chartWidth,
    temperaturePoints,
    linePoints,
    areaPoints,
    sunMarkers,
    isNightHour,
  };
}
