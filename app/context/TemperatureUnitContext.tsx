"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { TemperatureUnit } from "../lib/temperature";

interface TemperatureUnitContextValue {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
}

const TemperatureUnitContext =
  createContext<TemperatureUnitContextValue | null>(null);

export function TemperatureUnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  return (
    <TemperatureUnitContext value={{ unit, setUnit }}>
      {children}
    </TemperatureUnitContext>
  );
}

export function useTemperatureUnit(): TemperatureUnitContextValue {
  const context = useContext(TemperatureUnitContext);

  if (!context) {
    throw new Error(
      "useTemperatureUnit must be used inside a TemperatureUnitProvider",
    );
  }

  return context;
}
