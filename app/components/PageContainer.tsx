import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// The centred column every page and the header sit in, so their widths and
// side padding always line up
export function PageContainer({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto max-w-xl px-6", className)} {...props} />;
}
