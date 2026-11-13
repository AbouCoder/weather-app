"use client";

import { useTemperatureUnit } from "../context/TemperatureUnitContext";
import { formatTemperature } from "../lib/temperature";

interface TemperatureProps {
  celsius: number;
}

// Shows a Celsius value in the unit picked with the TemperatureToggle
export function Temperature({ celsius }: TemperatureProps) {
  const { unit } = useTemperatureUnit();
  return formatTemperature(celsius, unit);
}
