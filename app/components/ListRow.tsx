import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ListRowProps {
  className?: string;
  children: ReactNode;
}

// One row of a divided list, like a day in the 7-day forecast. Each row draws
// the line above it, so the first row's line sits under the section heading
export function ListRow({ className, children }: ListRowProps) {
  return (
    <li
      className={cn(
        "flex items-center justify-between gap-4 border-t border-border py-4",
        className,
      )}
    >
      {children}
    </li>
  );
}
