interface CityCardPlaceholderProps {
  name: string;
  message: string;
}

export function CityCardPlaceholder({
  name,
  message,
}: CityCardPlaceholderProps) {
  return (
    <div className="py-6 px-7 rounded-2xl bg-white/5 inset-shadow-xs inset-shadow-white/20">
      <h2 className="text-base font-semibold text-shadow-md">{name}</h2>
      <p className="text-sm text-muted-foreground text-shadow-sm">{message}</p>
    </div>
  );
}
