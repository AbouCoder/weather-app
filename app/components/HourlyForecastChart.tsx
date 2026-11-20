import { HourlyForecast } from "../lib/types";
import { buildHourlyChart } from "../lib/hourlyChart";
import { Section } from "./Section";
import { HourlyConditionsRow } from "./hourlyForecast/HourlyConditionsRow";
import { PrecipitationBars } from "./hourlyForecast/PrecipitationBars";
import { SunEventMarker } from "./hourlyForecast/SunEventMarker";
import { TemperatureLine } from "./hourlyForecast/TemperatureLine";

interface HourlyForecastChartProps {
  forecast: HourlyForecast;
}

// The "Next 24 Hours" section: a sideways-scrolling chart with each hour's
// conditions on top, the temperature line in the middle and the chance of
// precipitation below, with sunrise and sunset marked across all three
export function HourlyForecastChart({ forecast }: HourlyForecastChartProps) {
  const { hourly } = forecast;
  const chart = buildHourlyChart(forecast);

  return (
    <Section title="Next 24 Hours" divided>
      <div
        className="overflow-x-auto pt-4 pb-2 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent] [--animation-duration:0]"
        tabIndex={0}
        aria-label="Hourly temperature, conditions and chance of precipitation"
      >
        {/* Bottom padding leaves room for the sunrise and sunset labels */}
        <div className="relative pb-8" style={{ width: chart.chartWidth }}>
          <HourlyConditionsRow
            hourly={hourly}
            isNightHour={chart.isNightHour}
          />
          <TemperatureLine
            hourly={hourly}
            chartWidth={chart.chartWidth}
            temperaturePoints={chart.temperaturePoints}
            linePoints={chart.linePoints}
            areaPoints={chart.areaPoints}
          />
          <PrecipitationBars hourly={hourly} />
          {chart.sunMarkers.map((marker) => (
            <SunEventMarker key={marker.label} {...marker} />
          ))}
        </div>
      </div>
    </Section>
  );
}
