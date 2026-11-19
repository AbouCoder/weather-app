import {
  CityCardControlsProps,
  DeleteCityButton,
  CityDragHandle,
} from "./CityCardControls";
import { CityCardShell } from "./CityCardShell";

interface CityCardPlaceholderProps extends CityCardControlsProps {
  message: string;
}

// Stands in for a city's card while its weather loads or when it fails, with
// the same grip and bin so the city can still be moved or removed
export function CityCardPlaceholder({
  name,
  message,
  dragHandle,
  onDelete,
}: CityCardPlaceholderProps) {
  return (
    <CityCardShell className="bg-white/5">
      <CityDragHandle name={name} dragHandle={dragHandle} />
      <div className="flex-1 min-w-0 py-6 px-2">
        <h3 className="text-base font-semibold text-shadow-md">{name}</h3>
        <p className="text-sm text-muted-foreground text-shadow-sm">
          {message}
        </p>
      </div>
      <DeleteCityButton name={name} onDelete={onDelete} />
    </CityCardShell>
  );
}
