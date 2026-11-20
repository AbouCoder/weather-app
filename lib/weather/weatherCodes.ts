// Everything the app reads from a WMO weather code, the number Open-Meteo
// uses for the conditions. The ranges live here once, so a city's icon,
// wording and background colours always agree

// The kinds of weather the app draws differently. "unknown" is a code
// Open-Meteo might add later
export type WeatherCondition =
  | "clear"
  | "mainly-clear"
  | "partly-cloudy"
  | "overcast"
  | "rain"
  | "snow"
  | "thunderstorm"
  | "unknown";

export function getWeatherCondition(weatherCode: number): WeatherCondition {
  if (weatherCode === 0) return "clear";
  if (weatherCode === 1) return "mainly-clear";
  if (weatherCode === 2) return "partly-cloudy";
  // There's no fog look of its own; fog (45, 48) reads closest to overcast
  if (weatherCode === 3 || weatherCode === 45 || weatherCode === 48) {
    return "overcast";
  }
  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return "rain";
  }
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return "snow";
  }
  if (weatherCode >= 95 && weatherCode <= 99) return "thunderstorm";

  return "unknown";
}

// The wording is finer-grained than the conditions, e.g. light and heavy
// rain share one icon, so it keeps its own list of codes
const DESCRIPTIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export function getWeatherDescription(weatherCode: number): string {
  return DESCRIPTIONS[weatherCode] ?? "Unknown";
}

// Tailwind gradient classes for a card or page background
export function getWeatherGradientClasses(
  weatherCode: number,
  isNight: boolean,
): string {
  const condition = getWeatherCondition(weatherCode);

  if (
    condition === "clear" ||
    condition === "mainly-clear" ||
    condition === "partly-cloudy"
  ) {
    return isNight ? "from-blue-950 to-blue-800" : "from-sky-600 to-blue-400";
  }
  // Storms are dark by day too, so they have no separate night colours
  if (condition === "thunderstorm") {
    return "from-slate-800 to-slate-950";
  }

  return isNight
    ? "from-slate-700 to-slate-600"
    : "from-slate-500 to-slate-400";
}
