import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TitleGroupProps {
  title: ReactNode;
  // The muted line under the title
  subtitle?: ReactNode;
  // h3 for cards and panels, h2 for a page title
  as?: "h2" | "h3";
  size?: "md" | "lg";
  align?: "start" | "center";
  className?: string;
}

const SIZES = {
  md: { title: "text-base", subtitle: "text-sm" },
  lg: { title: "text-xl", subtitle: "text-base" },
};

// A bold title with a smaller, muted line under it, e.g. a city's name over
// its local time and conditions
export function TitleGroup({
  title,
  subtitle,
  as: Heading = "h3",
  size = "md",
  align = "start",
  className,
}: TitleGroupProps) {
  return (
    <div className={cn("min-w-0", align === "center" && "text-center", className)}>
      <Heading className={cn(SIZES[size].title, "font-semibold text-shadow-md")}>
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            SIZES[size].subtitle,
            "text-muted-foreground text-shadow-sm",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
