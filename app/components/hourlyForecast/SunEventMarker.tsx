import { SunMarker } from "../../lib/hourlyChart";
import { formatHourMinute } from "../../lib/dateTime";

// A dashed line down the chart at sunrise or sunset, labelled with the time
export function SunEventMarker({ label, time, x }: SunMarker) {
  return (
    <div
      className="absolute top-0 bottom-0 flex flex-col items-start pointer-events-none"
      style={{ left: x }}
    >
      <div className="flex-1 border-l border-dashed border-white/40" />
      <span className="-translate-x-1/2 mt-1 whitespace-nowrap rounded-full bg-glass px-2 py-0.5 text-xs text-shadow-sm glass-edge">
        {label} {formatHourMinute(time)}
      </span>
    </div>
  );
}
