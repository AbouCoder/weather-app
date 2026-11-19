import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CityCardShellProps {
  // Background classes, e.g. the weather gradient or a plain glass fill
  className?: string;
  children: ReactNode;
}

// The outside of every city card: shape, shadow, padding and height. Loading,
// error and weather cards all use it, so a card doesn't change size or look
// when its weather arrives. min-h-24 matches a card with weather in it
export function CityCardShell({ className, children }: CityCardShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-24 items-center gap-1 rounded-2xl px-2 glass-raised",
        className,
      )}
    >
      {children}
    </div>
  );
}
