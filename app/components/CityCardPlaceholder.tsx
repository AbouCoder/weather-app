import {
  CityCardControlsProps,
  DeleteCityButton,
  CityDragHandle,
} from "./CityCardControls";
import { GlassPanel } from "./GlassPanel";
import { Skeleton } from "./Skeleton";
import { TitleGroup } from "./TitleGroup";

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
  return (
    <GlassPanel className="bg-white/5">
      <CityDragHandle name={name} dragHandle={dragHandle} />
      <div className="flex-1 min-w-0 flex justify-between items-center gap-4 py-6 px-2">
        <TitleGroup
          title={name}
          subtitle={
            state === "loading" ? (
              <>
                <Skeleton className="mt-1 h-4 w-36" />
                <span className="sr-only">Loading weather…</span>
              </>
            ) : (
              "Weather unavailable"
            )
          }
        />
        {state === "loading" && (
          <div className="flex gap-6 items-center">
            <Skeleton className="h-10 w-14" />
            <Skeleton shape="circle" className="size-12" />
          </div>
        )}
      </div>
      <DeleteCityButton name={name} onDelete={onDelete} />
    </GlassPanel>
  );
}
