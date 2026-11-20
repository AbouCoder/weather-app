import { cn } from "@/lib/utils";
import { Temperature } from "./Temperature";
import { getCurrentTimeInTimezone } from "../lib/dateTime";
import { WeatherIcon } from "../lib/types";
import {
  CityCardControlsProps,
  DeleteCityButton,
  CityDragHandle,
} from "./CityCardControls";
import { CityCardBody } from "./CityCardBody";
import { GlassPanel } from "./GlassPanel";

interface CityCardLayoutProps extends CityCardControlsProps {
  slug: string;
  description: string;
  temperature: number;
  timezone: string;
  // Tailwind gradient classes for the card background
  gradientClasses: string;
  Icon: WeatherIcon;
  isNight?: boolean;
}

export function CityCardLayout({
  slug,
  name,
  description,
  temperature,
  timezone,
  gradientClasses,
  Icon,
  isNight,
  dragHandle,
  onDelete,
}: CityCardLayoutProps) {
  // The grip and bin sit beside the link, not inside it, so they never
  // open the detail page
  return (
    <GlassPanel
      tone="none"
      className={cn(
        "group bg-linear-to-b transition-opacity duration-150",
        gradientClasses,
      )}
    >
      <CityDragHandle name={name} dragHandle={dragHandle} />
      <CityCardBody
        href={`/${slug}`}
        title={name}
        subtitle={`${getCurrentTimeInTimezone(timezone)} · ${description}`}
        trailing={
          <>
            <Temperature celsius={temperature} size="large" />
            <Icon
              className="size-12 icon-motion-paused group-hover:icon-motion-running"
              isNight={isNight}
            />
          </>
        }
      />
      <DeleteCityButton name={name} onDelete={onDelete} />
    </GlassPanel>
  );
}
