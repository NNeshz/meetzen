"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@meetzen/ui/src/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@meetzen/ui/src/components/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@meetzen/ui/src/components/command";
import { cn } from "@meetzen/ui/src/lib/utils";

const countries = [
  { label: "Argentina", value: "AR" },
  { label: "Bolivia", value: "BO" },
  { label: "Chile", value: "CL" },
  { label: "Colombia", value: "CO" },
  { label: "Costa Rica", value: "CR" },
  { label: "Cuba", value: "CU" },
  { label: "Ecuador", value: "EC" },
  { label: "El Salvador", value: "SV" },
  { label: "España", value: "ES" },
  { label: "Guatemala", value: "GT" },
  { label: "Honduras", value: "HN" },
  { label: "México", value: "MX" },
  { label: "Nicaragua", value: "NI" },
  { label: "Panamá", value: "PA" },
  { label: "Paraguay", value: "PY" },
  { label: "Perú", value: "PE" },
  { label: "Puerto Rico", value: "PR" },
  { label: "República Dominicana", value: "DO" },
  { label: "Uruguay", value: "UY" },
  { label: "Venezuela", value: "VE" },
];

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {value
            ? countries.find((country) => country.value === value)?.label
            : "Seleccione un país"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar país..." />
          <CommandList>
            <CommandEmpty>No se encontró ningún país.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto">
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.label}
                  onSelect={() => {
                    onChange(country.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      country.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
