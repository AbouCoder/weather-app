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
  return (
    <Section title="7-Day Forecast">
      <ul className="flex flex-col">
        {days.map((day, index) => (
          <DailyForecastRow
            key={day.date}
            date={day.date}
            dayLabel={getForecastDayLabel(day.date, index)}
            maxCelsius={day.maxCelsius}
            minCelsius={day.minCelsius}
            Icon={getWeatherIcon(day.weatherCode)}
          />
        ))}
      </ul>
    </Section>
  );
}
