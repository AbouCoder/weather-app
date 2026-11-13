"use client";

import { ReactNode, useEffect, useState } from "react";
import { City, defaultCitySlugs, getCityBySlug } from "@/data/cities";
import { AddCityDialog } from "./AddCityDialog";
import { SavedCityCard } from "./SavedCityCard";

const STORAGE_KEY = "savedCities";

function readSavedSlugs(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved)
      ? saved.filter((slug) => typeof slug === "string")
      : [];
  } catch {
    return [];
  }
}

function writeSavedSlugs(slugs: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the city
    // still shows until the page is reloaded
  }
}

interface UserCitiesProps {
  // The server-rendered default cities
  children: ReactNode;
}

export function UserCities({ children }: UserCitiesProps) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  // localStorage only exists in the browser, so the saved list is read after
  // mount; reading it during render would mismatch the server HTML
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load from an external store on mount
    setSavedSlugs(readSavedSlugs());
  }, []);

  const savedCities = savedSlugs
    .map(getCityBySlug)
    .filter((city): city is City => city !== undefined);

  function addCity(slug: string) {
    if (savedSlugs.includes(slug) || defaultCitySlugs.includes(slug)) return;

    const next = [...savedSlugs, slug];
    setSavedSlugs(next);
    writeSavedSlugs(next);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-shadow-md">Cities</h2>
        <AddCityDialog
          listedSlugs={[...defaultCitySlugs, ...savedSlugs]}
          onAdd={addCity}
        />
      </div>
      {children}
      {savedCities.length > 0 && (
        <ul className="flex flex-col gap-4">
          {savedCities.map((city) => (
            <li key={city.slug}>
              <SavedCityCard city={city} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
