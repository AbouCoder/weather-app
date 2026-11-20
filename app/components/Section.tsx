import { ReactNode } from "react";

interface SectionProps {
  title: string;
  // Shown on the right of the heading, e.g. an "Add city" button
  action?: ReactNode;
  // Draws a thin divider between the heading and the content
  divided?: boolean;
  className?: string;
  children: ReactNode;
}

// A titled block of a page, e.g. "Cities" or "7-Day Forecast"
export function Section({
  title,
  action,
  divided = false,
  className,
  children,
}: SectionProps) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-shadow-md">{title}</h2>
        {action}
      </div>
      {divided ? (
        <div className="border-t border-border">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
