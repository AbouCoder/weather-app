export type TemperatureUnit = "celsius" | "fahrenheit";

export function convertTemperature(
  celsius: number,
  unit: TemperatureUnit,
): number {
  return unit === "fahrenheit" ? (celsius * 9) / 5 + 32 : celsius;
}

// Rounds after converting, so Fahrenheit values don't inherit Celsius rounding
export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit,
): string {
  return `${Math.round(convertTemperature(celsius, unit))}°`;
}

export const TEMPERATURE_UNIT_STORAGE_KEY = "temperatureUnit";
export const TEMPERATURE_UNIT_ATTRIBUTE = "data-temperature-unit";

// Runs in <head> before the first paint, so pages open in the saved unit
// without flashing Celsius first
export const applySavedTemperatureUnitScript = `(function(){try{var u=localStorage.getItem("${TEMPERATURE_UNIT_STORAGE_KEY}");if(u==="celsius"||u==="fahrenheit")document.documentElement.setAttribute("${TEMPERATURE_UNIT_ATTRIBUTE}",u)}catch(e){}})()`;
