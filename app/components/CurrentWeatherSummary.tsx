import { WeatherIcon } from "../lib/types";

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
    <section className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <span className="text-6xl font-light text-shadow-lg">
          {temperature}°
        </span>
        <p className="text-base text-muted-foreground text-shadow-sm">
          {description}
        </p>
      </div>
      <Icon isNight={isNight} className="size-28" />
    </section>
  );
}