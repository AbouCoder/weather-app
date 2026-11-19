import {
  CityCardControlsProps,
  DeleteButton,
  DragHandle,
} from "./CityCardControls";

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
    <div className="flex items-center gap-1 px-2 rounded-2xl bg-white/5 inset-shadow-xs inset-shadow-white/20">
      <DragHandle name={name} dragHandle={dragHandle} />
      <div className="flex-1 min-w-0 py-6 px-2">
        <h2 className="text-base font-semibold text-shadow-md">{name}</h2>
        <p className="text-sm text-muted-foreground text-shadow-sm">
          {message}
        </p>
      </div>
      <DeleteButton name={name} onDelete={onDelete} />
    </div>
  );
}
