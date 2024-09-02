"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

interface props {
  options: { value: string; label: string }[];
  placeholder?: string;
  emptyMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
  onCreate?: (label: string) => void;
}

const Autocomplete = ({
  options,
  placeholder = "Select...",
  emptyMessage = "Not found",
  value: controlledValue = "",
  onChange,
  onCreate,
}: props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(controlledValue);
  const [searchValue, setSearchValue] = React.useState("");
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const commandInputRef = React.useRef<HTMLInputElement>(null);

  const buttonWidth = buttonRef.current?.offsetWidth;

  const handleCreate = (label: string) => {
    if (onCreate) {
      onCreate(label);
    }
    setSearchValue("");
    setValue(label);
    setOpen(false);
  };

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-0 text-slate-600 bg-slate-100 font-normal active:bg-slate-200"
          ref={buttonRef}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0 shadow-none")}
        style={{ width: buttonWidth }}
      >
        <Command>
          <CommandInput
            placeholder={placeholder}
            className="text-md py-6"
            ref={commandInputRef}
            value={searchValue}
            onValueChange={(value) => setSearchValue(value)}
          />
          <CommandList>
            <CommandEmpty className={cn(onCreate && "py-1 px-1")}>
              {!onCreate && emptyMessage}
              {onCreate && (
                <Button
                  variant="ghost"
                  className="p-2 w-full font-normal "
                  onClick={() => handleCreate(searchValue)}
                >
                  Create &quot;{searchValue}&quot;
                </Button>
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="py-2 px-4"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Autocomplete;
