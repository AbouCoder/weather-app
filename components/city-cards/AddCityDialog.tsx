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
  savedSlugs: string[];
  onAdd: (slug: string) => void;
}

export function AddCityDialog({ savedSlugs, onAdd }: AddCityDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const unsavedCities = cities.filter((city) => !savedSlugs.includes(city.slug));
  const selectedCity = cities.find((city) => city.slug === selectedSlug);
  const submitLabel = selectedCity ? `Add ${selectedCity.name}` : "Add city";

  const options = unsavedCities.map((city) => ({
    slug: city.slug,
    name: city.name,
    // Lets "sao paulo" find São Paulo
    keywords: [city.slug.replaceAll("-", " ")],
    isSelected: city.slug === selectedSlug,
  }));

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
          <Button variant="glass" size="pill" />
        }
      >
        <PlusIcon />
        Add city
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>
              Add a city
            </DialogTitle>
            <DialogDescription className="text-shadow-sm">
              Search for a city to add it to your list.
            </DialogDescription>
          </DialogHeader>

          <Command className="bg-glass-subtle ring-1 ring-white/10 glass-edge">
            <CommandInput placeholder="Search cities…" />
            <CommandList>
              <CommandEmpty className="text-muted-foreground">
                No cities found.
              </CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.slug}
                    value={option.name}
                    keywords={option.keywords}
                    data-checked={option.isSelected}
                    onSelect={() => setSelectedSlug(option.slug)}
                    className="data-selected:bg-glass"
                  >
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>

          <DialogFooter>
            <Button
              type="submit"
              variant="primary"
              size="pill"
              disabled={!selectedCity}
            >
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
