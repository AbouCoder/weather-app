import Link from "next/link";
import { Temperature } from "./Temperature";
import { getCurrentTimeInTimezone } from "../lib/dateTime";
import { WeatherIcon } from "../lib/types";
import { getWeatherGradientClasses } from "../lib/weatherBackgrounds";
import {
  CityCardControlsProps,
  DeleteCityButton,
  CityDragHandle,
} from "./CityCardControls";

interface CityCardLayoutProps extends CityCardControlsProps {
  slug: string;
  description: string;
  temperature: number;
  timezone: string;
  weatherCode: number;
  Icon: WeatherIcon;
  isNight?: boolean;
}

export function CityCardLayout({
  slug,
  name,
  description,
  temperature,
  timezone,
  weatherCode,
  Icon,
  isNight,
  dragHandle,
  onDelete,
}: CityCardLayoutProps) {
  const background = getWeatherGradientClasses(weatherCode, isNight ?? false);

  // The grip and bin sit beside the link, not inside it, so they never
  // open the detail page
  return (
    <div
      className={`group flex items-center gap-1 px-2 rounded-2xl shadow-lg shadow-black/30 inset-shadow-xs inset-shadow-white/20 bg-linear-to-b transition-opacity duration-150 ${background}`}
    >
      <CityDragHandle name={name} dragHandle={dragHandle} />
      <Link
        href={`/${slug}`}
        className="flex-1 min-w-0 flex justify-between items-center gap-4 py-6 px-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-shadow-md">{name}</h2>
          <p className="text-sm text-muted-foreground text-shadow-sm">
            {getCurrentTimeInTimezone(timezone)} · {description}
          </p>
        </div>
        <div className="flex gap-6 items-center">
          <span className="text-4xl font-light text-shadow-md">
            <Temperature celsius={temperature} />
          </span>
          <Icon
            className="size-12 [--animation-duration:0] group-hover:[--animation-duration:4s]"
            isNight={isNight}
          />
        </div>
      </Link>
      <DeleteCityButton name={name} onDelete={onDelete} />
    </div>
  );
}
