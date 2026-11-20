import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TitleGroup } from "@/components/shared/TitleGroup";

interface CityCardBodyProps {
  // When given, the body is a link to the city's page
  href?: string;
  title: ReactNode;
  subtitle: ReactNode;
  // Shown on the right: the temperature and icon, or their loading shapes
  trailing?: ReactNode;
}

const BODY = "flex-1 min-w-0 flex justify-between items-center gap-4 py-6 px-2";

// The middle of a city card, between its grip and bin: the name and details
// on the left, the weather on the right. Loading, error and weather cards
// share it so their contents line up
export function CityCardBody({
  href,
  title,
  subtitle,
  trailing,
}: CityCardBodyProps) {
  const content = (
    <>
      <TitleGroup title={title} subtitle={subtitle} />
      {trailing && <div className="flex gap-6 items-center">{trailing}</div>}
    </>
  );

  return href ? (
    <Link href={href} className={cn(BODY, "rounded-xl focus-ring")}>
      {content}
    </Link>
  ) : (
    <div className={BODY}>{content}</div>
  );
}
