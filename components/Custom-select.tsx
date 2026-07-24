"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  name: string;
  image: string;
};

type CustomSelectProps = {
  value?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
};

export default function CustomSelect({
  value,
  options,
  placeholder = "Select an option",
  disabled,
  error,
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.name === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border bg-gray-900 my-2  px-3 text-sm",
          error && "border-red-500",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {selected ? (
          <div className="flex items-center justify-between w-full px-4 gap-2">
              <span>{selected.name}</span>
              <div className="w-14 h-7">
            <Image
              src={selected.image}
              alt={selected.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              />
              </div>
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}

        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-md border bg-gray-900 shadow-lg">
          {options.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => {
                onChange(option.name);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-gray-950"
            >
              <div className="flex items-center justify-between w-full px-4 gap-2">
                  <span>{option.name}</span>
              <div className="w-14 h-14">
            <Image
              src={option.image}
              alt={option.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              />
              </div>
              </div>

              {value === option.name && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}