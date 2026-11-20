import {
  formatDayAndMonth,
  getCurrentTimeInTimezone,
  getCurrentTimeValueInTimezone,
} from "@/lib/dateTime";
import { TitleGroup } from "@/components/shared/TitleGroup";

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
      as="h1"
      size="lg"
      title={name}
      subtitle={
        <time dateTime={`${date}T${getCurrentTimeValueInTimezone(timezone)}`}>
          {formatDayAndMonth(date)} {getCurrentTimeInTimezone(timezone)}
        </time>
      }
    />
  );
}
