import { ListRow } from "./ListRow";
import { PageContainer } from "./PageContainer";
import { Skeleton } from "./Skeleton";

// Shown while a city's weather loads. It has the same shape as the real page
// (title, current weather, 7-day rows) on a neutral gradient, so the page
// doesn't jump around when the weather arrives
export function CityWeatherSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-700 to-slate-600">
      <PageContainer className="py-24 flex flex-col gap-16" aria-busy>
        <p className="sr-only">Loading weather…</p>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-15 w-28" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton shape="circle" className="size-28" />
          </div>
        </div>

        <div>
          <Skeleton className="h-6 w-36 mb-4" />
          <ul className="flex flex-col" aria-hidden>
            {Array.from({ length: 7 }, (_, index) => (
              <ListRow key={index}>
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-28" />
              </ListRow>
            ))}
          </ul>
        </div>
      </PageContainer>
    </div>
  );
}
