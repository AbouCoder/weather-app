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
