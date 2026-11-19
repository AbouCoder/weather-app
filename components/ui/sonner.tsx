"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

// The app is always dark, so the theme is fixed instead of read from
// next-themes as shadcn's version does. Toasts match the glassy cards
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="bottom-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !bg-slate-900/90 supports-backdrop-filter:!backdrop-blur-xl !border-white/10 !text-foreground !shadow-lg !shadow-black/30 inset-shadow-xs inset-shadow-white/20 !font-sans",
          actionButton:
            "!h-8 !rounded-full !px-3 !bg-linear-to-b !from-white !to-slate-200 !text-slate-900 !font-medium",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
