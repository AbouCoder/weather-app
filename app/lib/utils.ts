export function getCurrentTimeInTimezone(timezone: string): string {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    });
  }
  
  export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    });
  }
  
  export function getDayName(dateString: string, index: number): string {
    if (index === 0) return "Today";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { weekday: "long" });
  }

  export function isNightTime(
    timezone: string,
    sunrise: string,
    sunset: string
  ): boolean {
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
  export function formatHour(dateTime: string): string {
    const hour = Number(dateTime.slice(11, 13));
    return `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;
  }

  export function formatClockTime(dateTime: string): string {
    const hour = Number(dateTime.slice(11, 13));
    const minute = dateTime.slice(14, 16);
    return `${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"}`;
  }
