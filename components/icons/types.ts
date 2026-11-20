import { ComponentType } from "react";

export interface WeatherIconProps {
  className?: string;
  isNight?: boolean;
}

export type WeatherIcon = ComponentType<WeatherIconProps>;
