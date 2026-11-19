"use client";

import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";

// What the sortable list hands each card so its grip starts the drag
export interface DragHandleProps {
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
}

// What every card needs to show its grip and bin
export interface CityCardControlsProps {
  name: string;
  dragHandle?: DragHandleProps;
  onDelete?: () => void;
}

// 40×40 tap targets, styled like the app's other glassy controls
const controlClassName =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors [&_svg]:size-5 [&_svg]:drop-shadow-md";

export function CityDragHandle({
  name,
  dragHandle,
}: Pick<CityCardControlsProps, "name" | "dragHandle">) {
  return (
    <button
      type="button"
      ref={dragHandle?.setActivatorNodeRef}
      {...dragHandle?.attributes}
      {...dragHandle?.listeners}
      // dnd-kit describes the button as "sortable"; the label names the city
      aria-label={`Reorder ${name}`}
      // Only the grip blocks touch scrolling, so the rest of the card scrolls
      className={`${controlClassName} touch-none cursor-grab active:cursor-grabbing`}
    >
      <GripVerticalIcon />
    </button>
  );
}

export function DeleteCityButton({
  name,
  onDelete,
}: Pick<CityCardControlsProps, "name" | "onDelete">) {
  return (
    <button
      type="button"
      onClick={onDelete}
      aria-label={`Delete ${name}`}
      className={controlClassName}
    >
      <Trash2Icon />
    </button>
  );
}
