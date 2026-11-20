"use client";

import { toast } from "sonner";
import { City, getCityBySlug } from "@/data/cities";
import { useSavedCities } from "@/hooks/useSavedCities";
import { AddCityDialog } from "./AddCityDialog";
import { EmptyCitiesState } from "./EmptyCitiesState";
import { Section } from "@/components/shared/Section";
import { SortableCityList } from "./SortableCityList";

const UNDO_DURATION_MS = 5000;

// The home page's "Cities" section: the user's saved cities, or an empty
// state once they have removed them all
export function SavedCitiesSection() {
  const { slugs, add, remove, restore, move } = useSavedCities();

  // slugs is null until the saved list has loaded
  const savedSlugs = slugs ?? [];
  const cities = savedSlugs
    .map(getCityBySlug)
    .filter((city): city is City => city !== undefined);
  // Only once the list has loaded, so the empty state doesn't flash first
  const showEmptyState = slugs !== null && cities.length === 0;

  // Removes the city straight away and offers a few seconds to undo it
  function handleDelete(city: City) {
    const removed = remove(city.slug);
    if (!removed) return;

    toast(`${city.name} removed`, {
      duration: UNDO_DURATION_MS,
      action: { label: "Undo", onClick: () => restore(removed) },
    });
  }

  return (
    <Section
      title="Cities"
      headingLevel="h1"
      action={<AddCityDialog savedSlugs={savedSlugs} onAdd={add} />}
    >
      {showEmptyState ? (
        <EmptyCitiesState onAdd={add} />
      ) : (
        <SortableCityList
          cities={cities}
          onMove={move}
          onDelete={handleDelete}
        />
      )}
    </Section>
  );
}
