import { AddCityDialog } from "./AddCityDialog";

interface EmptyCitiesStateProps {
  onAdd: (slug: string) => void;
}

// Shown in place of the list once every city has been removed
export function EmptyCitiesState({ onAdd }: EmptyCitiesStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 px-4 rounded-2xl bg-white/5 glass-raised text-center">
      <div>
        <h3 className="text-base font-semibold text-shadow-md">No cities yet</h3>
        <p className="text-sm text-muted-foreground text-shadow-sm">
          Add a city to see its weather here.
        </p>
      </div>
      {/* Nothing is saved, so the dialog offers every city */}
      <AddCityDialog savedSlugs={[]} onAdd={onAdd} />
    </div>
  );
}
