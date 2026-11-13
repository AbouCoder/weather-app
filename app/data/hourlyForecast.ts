import { HourlyForecastData } from "../lib/types";

// Hardcoded placeholder for the next 24 hours until hourly data is fetched
export const hourlyForecastPlaceholder: HourlyForecastData = {
  sunrise: "2026-11-14T06:47",
  sunset: "2026-11-13T17:04",
  hourly: [
    { time: "2026-11-13T15:00", temperature: 19, weatherCode: 1, precipitationProbability: 0 },
    { time: "2026-11-13T16:00", temperature: 18, weatherCode: 2, precipitationProbability: 5 },
    { time: "2026-11-13T17:00", temperature: 17, weatherCode: 2, precipitationProbability: 10 },
    { time: "2026-11-13T18:00", temperature: 15, weatherCode: 3, precipitationProbability: 20 },
    { time: "2026-11-13T19:00", temperature: 14, weatherCode: 3, precipitationProbability: 35 },
    { time: "2026-11-13T20:00", temperature: 14, weatherCode: 61, precipitationProbability: 60 },
    { time: "2026-11-13T21:00", temperature: 13, weatherCode: 63, precipitationProbability: 80 },
    { time: "2026-11-13T22:00", temperature: 12, weatherCode: 61, precipitationProbability: 65 },
    { time: "2026-11-13T23:00", temperature: 12, weatherCode: 3, precipitationProbability: 40 },
    { time: "2026-11-14T00:00", temperature: 11, weatherCode: 3, precipitationProbability: 25 },
    { time: "2026-11-14T01:00", temperature: 11, weatherCode: 2, precipitationProbability: 15 },
    { time: "2026-11-14T02:00", temperature: 10, weatherCode: 2, precipitationProbability: 10 },
    { time: "2026-11-14T03:00", temperature: 10, weatherCode: 1, precipitationProbability: 5 },
    { time: "2026-11-14T04:00", temperature: 9, weatherCode: 0, precipitationProbability: 0 },
    { time: "2026-11-14T05:00", temperature: 9, weatherCode: 0, precipitationProbability: 0 },
    { time: "2026-11-14T06:00", temperature: 8, weatherCode: 0, precipitationProbability: 0 },
    { time: "2026-11-14T07:00", temperature: 9, weatherCode: 1, precipitationProbability: 0 },
    { time: "2026-11-14T08:00", temperature: 11, weatherCode: 1, precipitationProbability: 0 },
    { time: "2026-11-14T09:00", temperature: 13, weatherCode: 2, precipitationProbability: 5 },
    { time: "2026-11-14T10:00", temperature: 15, weatherCode: 2, precipitationProbability: 5 },
    { time: "2026-11-14T11:00", temperature: 17, weatherCode: 1, precipitationProbability: 0 },
    { time: "2026-11-14T12:00", temperature: 18, weatherCode: 1, precipitationProbability: 0 },
    { time: "2026-11-14T13:00", temperature: 19, weatherCode: 0, precipitationProbability: 0 },
    { time: "2026-11-14T14:00", temperature: 20, weatherCode: 0, precipitationProbability: 0 },
  ],
};
