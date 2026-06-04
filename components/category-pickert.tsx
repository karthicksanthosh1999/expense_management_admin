"use client";

import { categoryConfig } from "@/lib/icon-center";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  control: any;
};

export default function CategoryHorizontalPicker({ control }: Props) {

  const [open, setOpen] = useState(false);

  return (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <div className="w-full">
          {/* Horizontal Scroll */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className={'w-full'}>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full text-base justify-between capitalize font-normal"
              >
                {field.value
                  ? Object.keys(categoryConfig).find(
                      (category) => category === field.value
                    )
                  : "Select category"}
                <ChevronsUpDown className="ml-2 py-2 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full h-full">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup className="max-h-56 overflow-y-scroll">
                  {Object.entries(categoryConfig).map(([key, config]) => {
                    return (
                      <CommandItem
                        key={key}
                        value={key}
                        onSelect={() => {
                          field.onChange(key);
                          setOpen(false);
                        }}
                      >
                        <span className="capitalize flex-1">{key}</span>
                        <Check
                          className={`h-4 w-4 ${
                            field.value === key ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
}
