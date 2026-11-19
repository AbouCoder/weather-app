import { formatDayAndMonth, getCurrentTimeInTimezone } from "../lib/dateTime";

interface CityHeadingProps {
  name: string;
  // Today's date as "YYYY-MM-DD", from the forecast
  date: string;
  timezone: string;
}

// The city page title with today's date and the city's local time,
// e.g. "London" over "19 November 11:21 AM"
export function CityHeading({ name, date, timezone }: CityHeadingProps) {
  return (
    <section className="flex flex-col">
      <h2 className="text-xl font-semibold text-shadow-md">{name}</h2>
      <p className="text-base text-muted-foreground text-shadow-sm">
        {formatDayAndMonth(date)} {getCurrentTimeInTimezone(timezone)}
      </p>
    </section>
  );
}
