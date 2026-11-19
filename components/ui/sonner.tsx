"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sonner's own styling is turned off so toasts are built from the app's
// shared looks: the same frosted overlay as the dialog, and the same primary
// pill button. The app is always dark, so the theme is fixed instead of read
// from next-themes as shadcn's version does
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="bottom-center"
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-full items-center gap-3 rounded-2xl bg-surface-overlay py-3 pl-5 pr-3 font-sans text-sm text-foreground ring-1 ring-white/10 glass-raised supports-backdrop-filter:backdrop-blur-xl",
          // The text grows so the Undo button sits at the right edge
          content: "flex-1",
          title: "text-shadow-sm",
          actionButton: cn(buttonVariants({ variant: "primary", size: "pill" })),
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
