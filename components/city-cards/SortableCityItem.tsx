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

  const style = { transform: CSS.Translate.toString(transform), transition };
  // The dragged card lifts above the others
  const className = isDragging
    ? "relative z-10 scale-[1.02] opacity-90 drop-shadow-2xl"
    : "";
  const dragHandle = { attributes, listeners, setActivatorNodeRef };

  return (
    <li ref={setNodeRef} style={style} className={className}>
      <CityCardLoader
        city={city}
        dragHandle={dragHandle}
        onDelete={onDelete}
      />
    </li>
  );
}
