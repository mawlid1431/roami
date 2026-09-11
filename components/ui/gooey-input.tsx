"use client";

import React, { useId, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type GooeyInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
};

export function GooeyInput({
  className,
  containerClassName,
  placeholder = "Search destinations...",
  ...props
}: GooeyInputProps) {
  const filterId = useId();
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        "relative h-11 w-56 overflow-hidden rounded-full",
        containerClassName
      )}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ filter: `url(#${filterId})` }}
      >
        <span className="absolute inset-0 rounded-full bg-[#fdf1e1]" />
        <span
          className={cn(
            "absolute -left-1 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-[#fdf1e1] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            focused ? "scale-125" : "scale-100"
          )}
        />
      </div>

      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111411]/60"
      />
      <input
        type="search"
        placeholder={placeholder}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "relative h-11 w-full rounded-full bg-transparent pl-10 pr-4 text-sm font-medium text-[#111411] placeholder:text-[#111411]/50 focus:outline-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
