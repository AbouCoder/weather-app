"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { City } from "@/data/cities";
import { CityCardLoader } from "./CityCardLoader";

interface SortableCityItemProps {
  city: City;
  onDelete: () => void;
}

// One draggable row. The card inside keeps its weather while the row moves,
// because the row is keyed by slug and the card is never swapped out
export function SortableCityItem({ city, onDelete }: SortableCityItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: city.slug });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      className={
        isDragging ? "relative z-10 scale-[1.02] opacity-90 drop-shadow-2xl" : ""
      }
    >
      <CityCardLoader
        city={city}
        dragHandle={{ attributes, listeners, setActivatorNodeRef }}
        onDelete={onDelete}
      />
    </li>
  );
}
