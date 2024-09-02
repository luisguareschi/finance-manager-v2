"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "react-iconly";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface props {
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

const Datepicker = ({
  label,
  placeholder = "Pick a date",
  value,
  onChange,
}: props) => {
  const [date, setDate] = useState<Date | undefined>(value || undefined);

  useEffect(() => {
    if (!date || !onChange) return;
    onChange(date);
  }, [date]);

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-slate-500">{label}</label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full bg-slate-100 active:bg-slate-100 text-slate-600 font-normal",
              !date && "text-slate-600",
            )}
          >
            {date ? (
              dayjs(date).format("DD/MM/YY")
            ) : (
              <span className="text-slate-400">{placeholder}</span>
            )}
            <div className="ml-auto text-slate-400">
              <CalendarIcon />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Datepicker;
