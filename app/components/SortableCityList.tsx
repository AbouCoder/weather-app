"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
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
import { City } from "@/data/cities";
import {
  buildReorderAnnouncements,
  REORDER_INSTRUCTIONS,
} from "../lib/reorderAnnouncements";
import { SortableCityItem } from "./SortableCityItem";

interface SortableCityListProps {
  cities: City[];
  // Moves a city to where another city is now
  onMove: (slug: string, toSlug: string) => void;
  onDelete: (city: City) => void;
}

// The city cards as a list that can be reordered by dragging each card's
// grip, with a mouse, a finger or the keyboard
export function SortableCityList({
  cities,
  onMove,
  onDelete,
}: SortableCityListProps) {
  const slugs = cities.map((city) => city.slug);

  const sensors = useSensors(
    // A small move is needed before a drag starts, so a tap on the grip
    // doesn't count as one
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    // Dropping where it started, or outside the list, changes nothing
    if (!over || active.id === over.id) return;
    onMove(String(active.id), String(over.id));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      accessibility={{
        announcements: buildReorderAnnouncements(slugs),
        screenReaderInstructions: { draggable: REORDER_INSTRUCTIONS },
      }}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={slugs} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-4">
          {cities.map((city) => (
            <SortableCityItem
              key={city.slug}
              city={city}
              onDelete={() => onDelete(city)}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
