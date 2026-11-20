import { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { formatTemperature } from "@/lib/temperature";

type TemperatureSize = "hero" | "large" | "body" | "small";

interface TemperatureProps {
  celsius: number;
  // Leave out for plain text, e.g. inside screen reader sentences
  size?: TemperatureSize;
  tone?: "default" | "muted";
  className?: string;
  // For placing it absolutely, e.g. a chart label above its point
  style?: CSSProperties;
}

// Each size brings its own weight and text shadow, so temperatures look the
// same wherever they appear at that size
const SIZES: Record<TemperatureSize, string> = {
  // The city page's current temperature
  hero: "text-6xl font-light text-shadow-lg",
  // A home page card
  large: "text-4xl font-light text-shadow-md",
  // The 7-day forecast
  body: "text-base font-medium text-shadow-sm",
  // The hourly chart's labels
  small: "text-sm font-medium text-shadow-sm",
};

// Renders both units and lets the data-temperature-unit attribute on <html>,
// set by the TemperatureUnitProvider, decide which one shows. That way the
// saved unit is right from the first paint, before React has hydrated.
export function Temperature({
  celsius,
  size,
  tone = "default",
  className,
  style,
}: TemperatureProps) {
  return (
    <span
      style={style}
      className={cn(
        size && SIZES[size],
        tone === "muted" && "text-muted-foreground",
        className,
      )}
    >
      <span className="fahrenheit:hidden">
        {formatTemperature(celsius, "celsius")}
      </span>
      <span className="hidden fahrenheit:inline">
        {formatTemperature(celsius, "fahrenheit")}
      </span>
    </span>
  );
}
