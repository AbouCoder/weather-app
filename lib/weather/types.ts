export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  timezone: string;
  sunrise: string;
  sunset: string;
}

export interface DayForecast {
  date: string;
  maxCelsius: number;
  minCelsius: number;
  weatherCode: number;
}

export interface WeatherForecast {
  current: CurrentWeather;
  daily: DayForecast[];
}
export interface HourForecast {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
}

export interface HourlyForecast {
  sunrise: string;
  sunset: string;
  hourly: HourForecast[];
}
