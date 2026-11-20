import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/PageContainer";

interface CityPageLayoutProps {
  // Tailwind gradient classes for the page background
  gradientClasses: string;
  // Marks the page as loading, for the skeleton
  busy?: boolean;
  children: ReactNode;
}

// The full-height gradient background and spaced-out column of a city page.
// The loaded page and its loading skeleton both use it, so they line up
export function CityPageLayout({
  gradientClasses,
  busy,
  children,
}: CityPageLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-linear-to-b", gradientClasses)}>
      <PageContainer
        className="py-24 flex flex-col gap-16"
        aria-busy={busy || undefined}
      >
        {children}
      </PageContainer>
    </div>
  );
}
