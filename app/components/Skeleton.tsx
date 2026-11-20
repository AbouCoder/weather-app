import { cn } from "@/lib/utils";

interface SkeletonProps {
  // Width and height, e.g. "h-7 w-32"
  className?: string;
  shape?: "line" | "circle";
}

// A grey stand-in for text or an icon while content loads. It renders a
// <span> so it can sit inside a paragraph, and is hidden from screen readers
// (say "Loading…" separately)
export function Skeleton({ className, shape = "line" }: SkeletonProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "block bg-glass",
        shape === "circle" ? "rounded-full" : "rounded-lg",
        className,
      )}
    />
  );
}
