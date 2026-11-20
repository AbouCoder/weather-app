import { AddCityDialog } from "./AddCityDialog";
import { GlassPanel } from "./GlassPanel";
import { TitleGroup } from "./TitleGroup";

interface EmptyCitiesStateProps {
  onAdd: (slug: string) => void;
}

// Shown in place of the list once every city has been removed
export function EmptyCitiesState({ onAdd }: EmptyCitiesStateProps) {
  return (
    <GlassPanel layout="stack">
      <TitleGroup
        title="No cities yet"
        subtitle="Add a city to see its weather here."
        align="center"
      />
      {/* Nothing is saved, so the dialog offers every city */}
      <AddCityDialog savedSlugs={[]} onAdd={onAdd} />
    </GlassPanel>
  );
}
