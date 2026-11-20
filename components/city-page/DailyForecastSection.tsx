import { DayForecast } from "@/lib/weather/types";
import { getForecastDayLabel } from "@/lib/dateTime";
import { getWeatherIcon } from "@/components/icons";
import { DailyForecastRow } from "./DailyForecastRow";
import { Section } from "@/components/shared/Section";

interface DailyForecastSectionProps {
  days: DayForecast[];
}

// The "7-Day Forecast" section: one row per day, starting with "Today"
export function DailyForecastSection({ days }: DailyForecastSectionProps) {
  const rows = days.map((day, index) => ({
    date: day.date,
    dayLabel: getForecastDayLabel(day.date, index),
    maxCelsius: day.maxCelsius,
    minCelsius: day.minCelsius,
    Icon: getWeatherIcon(day.weatherCode),
  }));

  return (
    <Section title="7-Day Forecast">
      <ul className="flex flex-col">
        {rows.map((row) => (
          <DailyForecastRow key={row.date} {...row} />
        ))}
      </ul>
    </Section>
  );
}
