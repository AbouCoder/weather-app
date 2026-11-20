import {
  CityCardControlsProps,
  DeleteCityButton,
  CityDragHandle,
} from "./CityCardControls";
import { CityCardBody } from "./CityCardBody";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { Skeleton } from "@/components/shared/Skeleton";

interface CityCardPlaceholderProps extends CityCardControlsProps {
  state: "loading" | "error";
}

// Stands in for a city's card while its weather loads or when it fails, with
// the same grip and bin so the city can still be moved or removed. While
// loading it shows grey shapes where the weather card's text, temperature
// and icon will go, like the city page's skeleton
export function CityCardPlaceholder({
  name,
  state,
  dragHandle,
  onDelete,
}: CityCardPlaceholderProps) {
  const loading = state === "loading";

  const subtitle = loading ? (
    <>
      <Skeleton className="mt-1 h-4 w-36" />
      <span className="sr-only">Loading weather…</span>
    </>
  ) : (
    "Weather unavailable"
  );

  // An error card has nothing to show where the weather would be
  const trailing = loading && (
    <>
      <Skeleton className="h-10 w-14" />
      <Skeleton shape="circle" className="size-12" />
    </>
  );

  return (
    <GlassPanel>
      <CityDragHandle name={name} dragHandle={dragHandle} />
      <CityCardBody title={name} subtitle={subtitle} trailing={trailing} />
      <DeleteCityButton name={name} onDelete={onDelete} />
    </GlassPanel>
  );
}
