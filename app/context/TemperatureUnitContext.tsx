"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";
import {
  TEMPERATURE_UNIT_ATTRIBUTE,
  TEMPERATURE_UNIT_STORAGE_KEY,
  TemperatureUnit,
} from "../lib/temperature";

interface TemperatureUnitContextValue {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
}

const TemperatureUnitContext =
  createContext<TemperatureUnitContextValue | null>(null);

const CHANGE_EVENT = "temperatureunitchange";

function isTemperatureUnit(value: unknown): value is TemperatureUnit {
  return value === "celsius" || value === "fahrenheit";
}

function readSavedUnit(): TemperatureUnit | null {
  try {
    const saved = localStorage.getItem(TEMPERATURE_UNIT_STORAGE_KEY);
    return isTemperatureUnit(saved) ? saved : null;
  } catch {
    return null;
  }
}

// The unit lives on <html> so CSS can show it before React hydrates
function applyUnit(unit: TemperatureUnit) {
  document.documentElement.setAttribute(TEMPERATURE_UNIT_ATTRIBUTE, unit);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function setUnit(unit: TemperatureUnit) {
  try {
    localStorage.setItem(TEMPERATURE_UNIT_STORAGE_KEY, unit);
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the
    // choice still applies until the page is reloaded
  }
  applyUnit(unit);
}

function subscribe(onChange: () => void) {
  // Keeps other open tabs in step with the saved choice
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === TEMPERATURE_UNIT_STORAGE_KEY &&
      isTemperatureUnit(event.newValue)
    ) {
      applyUnit(event.newValue);
    }
  };

  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): TemperatureUnit {
  const unit = document.documentElement.getAttribute(
    TEMPERATURE_UNIT_ATTRIBUTE,
  );
  return isTemperatureUnit(unit) ? unit : "celsius";
}

function getServerSnapshot(): TemperatureUnit {
  return "celsius";
}

export function TemperatureUnitProvider({ children }: { children: ReactNode }) {
  const unit = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // In development, Strict Mode's remount resets <html> to its JSX attributes,
  // clearing the one the inline script set. A no-op in production.
  useLayoutEffect(() => {
    const saved = readSavedUnit();
    if (saved && saved !== getSnapshot()) applyUnit(saved);
  }, []);

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
