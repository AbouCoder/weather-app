import type { Announcements, UniqueIdentifier } from "@dnd-kit/core";
import { getCityBySlug } from "@/data/cities";

// Read out when a reorder grip gets focus
export const REORDER_INSTRUCTIONS =
  "To reorder a city, press Space or Enter on its reorder button, use the up and down arrow keys to move it, then press Space or Enter again to drop it. Press Escape to cancel.";

function cityName(id: UniqueIdentifier) {
  return getCityBySlug(String(id))?.name ?? String(id);
}

// Screen reader messages for each step of a reorder, naming the city and
// its position in the list, e.g. "Picked up London, position 1 of 3."
export function buildReorderAnnouncements(slugs: string[]): Announcements {
  const describePosition = (id: UniqueIdentifier) =>
    `position ${slugs.indexOf(String(id)) + 1} of ${slugs.length}`;

  return {
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
}
