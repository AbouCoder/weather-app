import { PageContainer } from "./PageContainer";

// A grey stand-in for one line or shape of the page
function Block({ className }: { className: string }) {
  return <div className={`rounded-lg bg-white/10 ${className}`} />;
}

// Shown while a city's weather loads. It has the same shape as the real page
// (title, current weather, 7-day rows) on a neutral gradient, so the page
// doesn't jump around when the weather arrives
export function CityWeatherSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-700 to-slate-600">
      <PageContainer className="py-24 flex flex-col gap-16" aria-busy>
        <p className="sr-only">Loading weather…</p>

        <div className="flex flex-col gap-8" aria-hidden>
          <div className="flex flex-col gap-1">
            <Block className="h-7 w-32" />
            <Block className="h-5 w-48" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <Block className="h-15 w-28" />
              <Block className="h-5 w-24" />
            </div>
            <Block className="size-28 rounded-full" />
          </div>
        </div>

        <div aria-hidden>
          <Block className="h-6 w-36 mb-4" />
          <ul className="flex flex-col">
            {Array.from({ length: 7 }, (_, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-4 gap-4 border-t border-border"
              >
                <Block className="h-6 w-24" />
                <Block className="h-8 w-28" />
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </div>
  );
}
