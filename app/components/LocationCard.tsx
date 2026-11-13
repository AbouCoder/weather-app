import Link from "next/link";
import { Temperature } from "./Temperature";
import { getCurrentTimeInTimezone } from "../lib/utils";
import { WeatherIcon } from "../lib/types";
import { getWeatherBackground } from "../lib/weatherBackgrounds";

interface LocationCardProps {
  slug: string;
  name: string;
  description: string;
  temperature: number;
  timezone: string;
  weatherCode: number;
  Icon: WeatherIcon;
  isNight?: boolean;
}

export function LocationCard({
  slug,
  name,
  description,
  temperature,
  timezone,
  weatherCode,
  Icon,
  isNight,
}: LocationCardProps) {
  const background = getWeatherBackground(weatherCode, isNight ?? false);

  return (
    <Link
      href={`/${slug}`}
      className={`group block py-6 px-7 rounded-2xl shadow-lg shadow-black/30 inset-shadow-xs inset-shadow-white/20 bg-linear-to-b transition-opacity duration-150 ${background}`}
    >
      <div className="flex justify-between items-center">
        <div>
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
      </div>
    </Link>
  );
}
