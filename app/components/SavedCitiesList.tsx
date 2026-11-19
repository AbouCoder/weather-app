"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type Announcements,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import { City, getCityBySlug } from "@/data/cities";
import { useSavedCities } from "../hooks/useSavedCities";
import { AddCityDialog } from "./AddCityDialog";
import { SortableCityItem } from "./SortableCityItem";

const UNDO_DURATION_MS = 5000;

function cityName(id: UniqueIdentifier) {
  return getCityBySlug(String(id))?.name ?? String(id);
}

export function SavedCitiesList() {
  const { slugs, add, remove, restore, move } = useSavedCities();

  const sensors = useSensors(
    // A small move is needed before a drag starts, so a tap on the grip
    // doesn't count as one
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const cities = (slugs ?? [])
    .map(getCityBySlug)
    .filter((city): city is City => city !== undefined);

  // Screen reader messages that name the city and its position
  const describePosition = (id: UniqueIdentifier) =>
    `position ${(slugs ?? []).indexOf(String(id)) + 1} of ${cities.length}`;
  const announcements: Announcements = {
    onDragStart: ({ active }) =>
      `Picked up ${cityName(active.id)}, ${describePosition(active.id)}.`,
    onDragOver: ({ active, over }) =>
      over
        ? `${cityName(active.id)} is over ${describePosition(over.id)}.`
        : `${cityName(active.id)} is no longer over a position.`,
    onDragEnd: ({ active, over }) =>
      over
        ? `${cityName(active.id)} dropped at ${describePosition(over.id)}.`
        : `${cityName(active.id)} dropped.`,
    onDragCancel: ({ active }) =>
      `Reordering cancelled. ${cityName(active.id)} is back at ` +
      `${describePosition(active.id)}.`,
  };

  function handleDragEnd({ active, over }: DragEndEvent) {
    // Dropping where it started, or outside the list, changes nothing
    if (!over || active.id === over.id) return;
    move(String(active.id), String(over.id));
  }

  function handleDelete(city: City) {
    const removed = remove(city.slug);
    if (!removed) return;

    toast(`${city.name} removed`, {
      duration: UNDO_DURATION_MS,
      action: { label: "Undo", onClick: () => restore(removed) },
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-shadow-md">Cities</h2>
        <AddCityDialog savedSlugs={slugs ?? []} onAdd={add} />
      </div>

      {slugs && cities.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-12 px-7 rounded-2xl bg-white/5 inset-shadow-xs inset-shadow-white/20 text-center">
          <div>
            <p className="text-base font-semibold text-shadow-md">
              No cities yet
            </p>
            <p className="text-sm text-muted-foreground text-shadow-sm">
              Add a city to see its weather here.
            </p>
          </div>
          <AddCityDialog savedSlugs={slugs} onAdd={add} />
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          accessibility={{
            announcements,
            screenReaderInstructions: {
              draggable:
                "To reorder a city, press Space or Enter on its reorder button, use the up and down arrow keys to move it, then press Space or Enter again to drop it. Press Escape to cancel.",
            },
          }}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={slugs ?? []}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col gap-4">
              {cities.map((city) => (
                <SortableCityItem
                  key={city.slug}
                  city={city}
                  onDelete={() => handleDelete(city)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
