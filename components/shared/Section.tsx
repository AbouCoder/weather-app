import { ReactNode } from "react";

interface SectionProps {
  title: string;
  // h1 when the section is the page's main content, like the home page's
  // "Cities"; h2 for a section of a larger page
  headingLevel?: "h1" | "h2";
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
  headingLevel: Heading = "h2",
  action,
  divided = false,
  className,
  children,
}: SectionProps) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Heading className="text-heading">{title}</Heading>
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
