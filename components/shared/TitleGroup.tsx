import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TitleGroupProps {
  title: ReactNode;
  // The muted line under the title
  subtitle?: ReactNode;
  // h1 for a page title, h2 for cards and panels under it
  as?: "h1" | "h2";
  size?: "md" | "lg";
  align?: "start" | "center";
  className?: string;
}

const SIZES = {
  md: { title: "text-heading", subtitle: "text-caption" },
  lg: {
    title: "text-xl font-semibold text-shadow-md",
    subtitle: "text-base text-muted-foreground text-shadow-sm",
  },
};

// A bold title with a smaller, muted line under it, e.g. a city's name over
// its local time and conditions. <hgroup> ties the subtitle to its heading
export function TitleGroup({
  title,
  subtitle,
  as: Heading = "h2",
  size = "md",
  align = "start",
  className,
}: TitleGroupProps) {
  return (
    <hgroup
      className={cn("min-w-0", align === "center" && "text-center", className)}
    >
      <Heading className={SIZES[size].title}>
        {title}
      </Heading>
      {subtitle && (
        <p className={SIZES[size].subtitle}>{subtitle}</p>
      )}
    </hgroup>
  );
}
