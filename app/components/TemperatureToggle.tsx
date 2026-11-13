"use client";

import { useTemperatureUnit } from "../context/TemperatureUnitContext";

// Switches the unit every <Temperature> in the app is shown in. The knob
// follows the <html> attribute too, so it starts in the saved position.
export function TemperatureToggle() {
  const { unit, setUnit } = useTemperatureUnit();
  const isFahrenheit = unit === "fahrenheit";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isFahrenheit}
      aria-label="Show temperatures in Fahrenheit"
      onClick={() => setUnit(isFahrenheit ? "celsius" : "fahrenheit")}
      className="relative flex w-18 h-9 p-1 rounded-full bg-white/10 shadow-lg shadow-black/30 inset-shadow-xs inset-shadow-white/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
    >
      <span
        aria-hidden
        className="flex flex-1 items-center justify-center text-sm font-medium text-muted-foreground text-shadow-sm"
      >
        °C
      </span>
      <span
        aria-hidden
        className="flex flex-1 items-center justify-center text-sm font-medium text-muted-foreground text-shadow-sm"
      >
        °F
      </span>
      <span
        aria-hidden
        className="absolute top-1 left-1 flex items-center justify-center w-8 h-7 rounded-full bg-linear-to-b from-white to-slate-200 shadow-md shadow-black/30 text-sm font-semibold text-slate-900 transition-transform duration-300 ease-out translate-x-0 fahrenheit:translate-x-8"
      >
        <span className="fahrenheit:hidden">°C</span>
        <span className="hidden fahrenheit:inline">°F</span>
      </span>
    </button>
  );
}
