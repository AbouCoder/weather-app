"use client";

import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

// The shared 40×40 ghost icon button, so the grip and bin match the dialog's
// close button
const controlClassName = cn(
  buttonVariants({ variant: "glass-ghost", size: "icon-pill" }),
  "[&_svg]:drop-shadow-md",
);

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
