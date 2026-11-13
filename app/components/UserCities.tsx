"use client";

import { useEffect, useState } from "react";
import { City, defaultCitySlugs, getCityBySlug } from "@/data/cities";
import { AddCityDialog } from "./AddCityDialog";
import { SavedCityCard } from "./SavedCityCard";

const STORAGE_KEY = "savedCities";

// Falls back to the default cities when nothing usable is saved
function readSavedSlugs(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    const slugs = Array.isArray(saved)
      ? saved.filter((slug) => typeof slug === "string" && getCityBySlug(slug))
      : [];
    return slugs.length > 0 ? slugs : defaultCitySlugs;
  } catch {
    return defaultCitySlugs;
  }
}

function writeSavedSlugs(slugs: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the list
    // still works until the page is reloaded
  }
}

export function UserCities() {
  // null until the saved list has been read in the browser
  const [slugs, setSlugs] = useState<string[] | null>(null);

  // localStorage only exists in the browser, so the list is read after mount;
  // reading it during render would mismatch the server HTML
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load from an external store on mount
    setSlugs(readSavedSlugs());
  }, []);

  // Keeps localStorage in step with every change to the list. Skipped until
  // the load above has run, so it never overwrites the saved list
  useEffect(() => {
    if (slugs) writeSavedSlugs(slugs);
  }, [slugs]);

  const cities = (slugs ?? [])
    .map(getCityBySlug)
    .filter((city): city is City => city !== undefined);

  function addCity(slug: string) {
    setSlugs((current) =>
      !current || current.includes(slug) ? current : [...current, slug],
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-shadow-md">Cities</h2>
        <AddCityDialog listedSlugs={slugs ?? []} onAdd={addCity} />
      </div>
      <ul className="flex flex-col gap-4">
        {cities.map((city) => (
          <li key={city.slug}>
            <SavedCityCard city={city} />
          </li>
        ))}
      </ul>
    </div>
  );
}
