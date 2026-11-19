import { DayForecast } from "../lib/types";
import { getForecastDayLabel } from "../lib/dateTime";
import { getWeatherIcon } from "../lib/weatherIcons";
import { DailyForecastRow } from "./DailyForecastRow";

interface SevenDayForecastProps {
  days: DayForecast[];
}

// The "7-Day Forecast" section: one row per day, starting with "Today"
export function SevenDayForecast({ days }: SevenDayForecastProps) {
  return (
    <section>
      <h2 className="text-base font-semibold mb-4 text-shadow-md">
        7-Day Forecast
      </h2>
      <ul className="flex flex-col">
        {days.map((day, index) => (
          <DailyForecastRow
            key={day.date}
            dayLabel={getForecastDayLabel(day.date, index)}
            maxCelsius={day.maxCelsius}
            minCelsius={day.minCelsius}
            Icon={getWeatherIcon(day.weatherCode)}
          />
        ))}
      </ul>
    </section>
  );
}
