export function getWeatherBackground(code: number, isNight: boolean): string {
  // WMO Weather interpretation codes
  if (code >= 0 && code <= 2) {
    return isNight
      ? "from-blue-950 to-blue-800"
      : "from-sky-600 to-blue-400";
  }
  if (code >= 95 && code <= 99) {
    return "from-slate-800 to-slate-950";
  }

  return isNight
    ? "from-slate-700 to-slate-600"
    : "from-slate-500 to-slate-400";
}