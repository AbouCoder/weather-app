"use client";

import { Switch } from "@/components/ui/switch";
import { useTemperatureUnit } from "../context/TemperatureUnitContext";

// Switches the unit every <Temperature> in the app is shown in. The thumb and
// the active label follow the <html> attribute too, so they start in the saved
// position before React hydrates.
export function TemperatureToggle() {
  const { unit, setUnit } = useTemperatureUnit();

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-shadow-sm">
      {/* The labels are click targets too; keyboard and screen reader users
          get the same control through the switch itself */}
      <span
        aria-hidden
        onClick={() => setUnit("celsius")}
        className="cursor-pointer text-foreground fahrenheit:text-muted-foreground transition-colors duration-300"
      >
        °C
      </span>
      <Switch
        checked={unit === "fahrenheit"}
        onCheckedChange={(checked) =>
          setUnit(checked ? "fahrenheit" : "celsius")
        }
        aria-label="Show temperatures in Fahrenheit"
        className="data-[size=default]:h-6 data-[size=default]:w-10 p-0.5 data-checked:bg-white/10 data-unchecked:bg-white/10 shadow-lg shadow-black/30 inset-shadow-xs inset-shadow-white/20 cursor-pointer focus-visible:border-transparent focus-visible:ring-white/40"
        // Sized so the default checked offset (thumb width - 2px) is exactly
        // the track's travel; the important flag lets the saved unit win over
        // the unchecked state the server renders
        thumbClassName="group-data-[size=default]/switch:size-4.5 bg-linear-to-b from-white to-slate-200 shadow-md shadow-black/30 duration-300 ease-out fahrenheit:translate-x-4!"
      />
      <span
        aria-hidden
        onClick={() => setUnit("fahrenheit")}
        className="cursor-pointer text-muted-foreground fahrenheit:text-foreground transition-colors duration-300"
      >
        °F
      </span>
    </div>
  );
}
