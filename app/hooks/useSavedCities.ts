"use client";

import { useEffect, useState } from "react";
import { defaultCitySlugs, getCityBySlug } from "@/data/cities";

// The only place that reads or writes the saved city list. It is an ordered
// array of city slugs, and the array order is the home page order
const STORAGE_KEY = "savedCities";

// Uses the default cities only when nothing has been saved yet or the saved
// value can't be read. A saved empty list stays empty, so removing every
// city shows the empty state after a reload too
function readSavedSlugs(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return defaultCitySlugs;

    const saved: unknown = JSON.parse(raw);
    if (!Array.isArray(saved)) return defaultCitySlugs;

    return saved.filter(
      (slug, index): slug is string =>
        typeof slug === "string" &&
        getCityBySlug(slug) !== undefined &&
        saved.indexOf(slug) === index,
    );
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

// What undo needs to put a removed city back where it was
export interface RemovedCity {
  slug: string;
  // The list as it was just before the city was removed
  before: string[];
}

// Puts a removed city back in front of the first city that followed it
// before and is still listed, so its position survives other removals,
// undone in any order
function restoreSlug(current: string[], { slug, before }: RemovedCity) {
  if (current.includes(slug)) return current;

  const following = before.slice(before.indexOf(slug) + 1);
  const nextSlug = following.find((other) => current.includes(other));
  const index = nextSlug ? current.indexOf(nextSlug) : current.length;

  return [...current.slice(0, index), slug, ...current.slice(index)];
}

function moveSlug(current: string[], slug: string, toSlug: string) {
  const from = current.indexOf(slug);
  const to = current.indexOf(toSlug);
  if (from === -1 || to === -1 || from === to) return current;

  const next = [...current];
  next.splice(from, 1);
  next.splice(to, 0, slug);
  return next;
}

export function useSavedCities() {
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

  // Every change below starts from the latest list, so quick repeated
  // changes never work from a stale copy

  function add(slug: string) {
    setSlugs((current) =>
      !current || current.includes(slug) ? current : [...current, slug],
    );
  }

  // Returns what undo needs, or null if the city isn't listed
  function remove(slug: string): RemovedCity | null {
    if (!slugs?.includes(slug)) return null;
    const removed = { slug, before: slugs };
    setSlugs((current) => current && current.filter((s) => s !== slug));
    return removed;
  }

  function restore(removed: RemovedCity) {
    setSlugs((current) => current && restoreSlug(current, removed));
  }

  // Moves a city to where another city is now
  function move(slug: string, toSlug: string) {
    setSlugs((current) => current && moveSlug(current, slug, toSlug));
  }

  return { slugs, add, remove, restore, move };
}
