import { formatDayAndMonth, getCurrentTimeInTimezone } from "../lib/dateTime";
import { TitleGroup } from "./TitleGroup";

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
    <TitleGroup
      as="h2"
      size="lg"
      title={name}
      subtitle={`${formatDayAndMonth(date)} ${getCurrentTimeInTimezone(timezone)}`}
    />
  );
}
