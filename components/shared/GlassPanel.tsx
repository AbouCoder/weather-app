import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  // "row": a card with things side by side, as tall as a weather card.
  // "stack": a centred column, e.g. an empty state
  layout?: "row" | "stack";
  // "subtle": the faint glass fill. "none": no fill, for a panel that brings
  // its own background, like a weather card's gradient
  tone?: "subtle" | "none";
  className?: string;
  as?: "div" | "section" | "li";
  children: ReactNode;
}

const LAYOUTS = {
  // min-h-24 matches a card with weather in it, so loading and error cards
  // are the same height
  row: "flex min-h-24 items-center gap-1 px-2",
  stack: "flex flex-col items-center gap-4 px-4 py-12 text-center",
};

// A raised glass surface with the app's corner radius and shadow
export function GlassPanel({
  layout = "row",
  tone = "subtle",
  className,
  as: Element = "div",
  children,
}: GlassPanelProps) {
  return (
    <Element
      className={cn(
        "rounded-2xl glass-raised",
        LAYOUTS[layout],
        tone === "subtle" && "bg-glass-subtle",
        className,
      )}
    >
      {children}
    </Element>
  );
}
