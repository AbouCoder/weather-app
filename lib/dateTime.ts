export function getCurrentTimeInTimezone(timezone: string): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timezone,
  });
}

// The same time as a 24-hour "HH:MM" string, for a <time> element's
// dateTime attribute
export function getCurrentTimeValueInTimezone(timezone: string): string {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  });
}

// A date-only string like "2026-11-20" parses as midnight UTC. Formatting
// it in UTC too keeps it on that day; in the machine's own timezone a
// server behind UTC would show the day before
export function formatDayAndMonth(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

export function getForecastDayLabel(
  dateString: string,
  index: number,
): string {
  if (index === 0) return "Today";
  const date = new Date(dateString);
  // In UTC for the same reason as formatDayAndMonth
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  });
}

export function isNightTime(
  timezone: string,
  sunrise: string,
  sunset: string
): boolean {
  // sunrise and sunset are the city's wall-clock times with no offset, so
  // they parse as if they were in this machine's timezone. Writing "now" out
  // in the city's timezone and parsing it back puts it on that same footing,
  // so the comparison works wherever the code runs
  const now = new Date();
  const currentTime = new Date(
    now.toLocaleString("en-US", { timeZone: timezone })
  );

  const sunriseTime = new Date(sunrise);
  const sunsetTime = new Date(sunset);

  return currentTime < sunriseTime || currentTime > sunsetTime;
}
// Reads the hour straight from a local "YYYY-MM-DDTHH:MM" string, so the
// label doesn't shift with the server's own timezone
export function formatHourLabel(dateTime: string): string {
  const hour = Number(dateTime.slice(11, 13));
  return `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;
}

// Sliced for the same reason as formatHourLabel
export function formatHourMinute(dateTime: string): string {
  const hour = Number(dateTime.slice(11, 13));
  const minute = dateTime.slice(14, 16);
  return `${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"}`;
}
