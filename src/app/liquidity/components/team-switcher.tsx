"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAtom } from "jotai"
import { selectedPairAtom } from "@/atoms/selectedPairAtom"

// ... other imports ...

export default function TeamSwitcher({ className }) {
  const [open, setOpen] = React.useState(false);
  const [selectedPair, setSelectedPair] = useAtom(selectedPairAtom);

  const currencyPairs = [
    { label: "INR/SGD", value: "INR/SGD" },
    { label: "INR/THB", value: "INR/THB" },
    { label: "SGD/THB", value: "SGD/THB" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a currency pair"
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedPair}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search pairs..." />
            <CommandEmpty>No pair found.</CommandEmpty>
            {currencyPairs.map((pair) => (
              <CommandItem
                key={pair.value}
                onSelect={() => {
                  setSelectedPair(pair.value);
                  setOpen(false);
                }}
                className="text-sm"
              >
                {pair.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedPair === pair.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
