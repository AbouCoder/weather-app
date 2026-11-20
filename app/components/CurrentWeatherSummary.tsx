import { WeatherIcon } from "../lib/types";
import { Temperature } from "./Temperature";

interface CurrentWeatherSummaryProps {
  temperature: number;
  description: string;
  Icon: WeatherIcon;
  isNight?: boolean;
}

export function CurrentWeatherSummary({
  temperature,
  description,
  Icon,
  isNight,
}: CurrentWeatherSummaryProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <Temperature celsius={temperature} size="hero" />
        <p className="text-base text-muted-foreground text-shadow-sm">
          {description}
        </p>
      </div>
      <Icon isNight={isNight} className="size-28" />
    </div>
  );
}
