"use client";

import { FormEvent, useState } from "react";
import { PlusIcon } from "lucide-react";
import { cities } from "@/data/cities";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddCityDialogProps {
  // Cities already on the home page, which aren't offered again
  listedSlugs: string[];
  onAdd: (slug: string) => void;
}

export function AddCityDialog({ listedSlugs, onAdd }: AddCityDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const options = cities.filter((city) => !listedSlugs.includes(city.slug));
  const selectedCity = cities.find((city) => city.slug === selectedSlug);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) setSelectedSlug(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlug) return;

    onAdd(selectedSlug);
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="h-9 gap-1.5 rounded-full px-4 bg-white/10 hover:bg-white/15 text-foreground text-shadow-sm shadow-lg shadow-black/30 inset-shadow-xs inset-shadow-white/20 focus-visible:ring-white/40" />
        }
      >
        <PlusIcon />
        Add city
      </DialogTrigger>
      <DialogContent className="rounded-2xl bg-slate-900/90 supports-backdrop-filter:backdrop-blur-xl ring-white/10 shadow-lg shadow-black/30 inset-shadow-xs inset-shadow-white/20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-shadow-md">
              Add a city
            </DialogTitle>
            <DialogDescription className="text-shadow-sm">
              Search for a city to add it to your list.
            </DialogDescription>
          </DialogHeader>

          <Command className="bg-white/5 ring-1 ring-white/10 inset-shadow-xs inset-shadow-white/10">
            <CommandInput placeholder="Search cities…" />
            <CommandList>
              <CommandEmpty className="text-muted-foreground">
                No cities found.
              </CommandEmpty>
              <CommandGroup>
                {options.map((city) => (
                  <CommandItem
                    key={city.slug}
                    value={city.name}
                    // Lets "sao paulo" find São Paulo
                    keywords={[city.slug.replaceAll("-", " ")]}
                    data-checked={city.slug === selectedSlug}
                    onSelect={() => setSelectedSlug(city.slug)}
                    className="data-selected:bg-white/10"
                  >
                    {city.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>

          <DialogFooter>
            <Button
              type="submit"
              disabled={!selectedCity}
              className="h-9 rounded-full px-4 bg-linear-to-b from-white to-slate-200 text-slate-900 shadow-md shadow-black/30 hover:opacity-90"
            >
              {selectedCity ? `Add ${selectedCity.name}` : "Add city"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
