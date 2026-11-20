export function getWeatherGradientClasses(
  weatherCode: number,
  isNight: boolean,
): string {
  // WMO Weather interpretation codes
  if (weatherCode >= 0 && weatherCode <= 2) {
    return isNight
      ? "from-blue-950 to-blue-800"
      : "from-sky-600 to-blue-400";
  }
  // Storms are dark by day too, so they have no separate night colours
  if (weatherCode >= 95 && weatherCode <= 99) {
    return "from-slate-800 to-slate-950";
  }

  return isNight
    ? "from-slate-700 to-slate-600"
    : "from-slate-500 to-slate-400";
}