import { AddCityDialog } from "./AddCityDialog";

interface EmptyCitiesStateProps {
  onAdd: (slug: string) => void;
}

// Shown in place of the list once every city has been removed
export function EmptyCitiesState({ onAdd }: EmptyCitiesStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 px-7 rounded-2xl bg-white/5 inset-shadow-xs inset-shadow-white/20 text-center">
      <div>
        <p className="text-base font-semibold text-shadow-md">No cities yet</p>
        <p className="text-sm text-muted-foreground text-shadow-sm">
          Add a city to see its weather here.
        </p>
      </div>
      {/* Nothing is saved, so the dialog offers every city */}
      <AddCityDialog savedSlugs={[]} onAdd={onAdd} />
    </div>
  );
}
