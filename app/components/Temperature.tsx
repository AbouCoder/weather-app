import { formatTemperature } from "../lib/temperature";

interface TemperatureProps {
  celsius: number;
}

// Renders both units and lets the data-temperature-unit attribute on <html>,
// set by the TemperatureUnitProvider, decide which one shows. That way the
// saved unit is right from the first paint, before React has hydrated.
export function Temperature({ celsius }: TemperatureProps) {
  return (
    <>
      <span className="fahrenheit:hidden">
        {formatTemperature(celsius, "celsius")}
      </span>
      <span className="hidden fahrenheit:inline">
        {formatTemperature(celsius, "fahrenheit")}
      </span>
    </>
  );
}
