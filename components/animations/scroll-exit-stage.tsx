"use client";

import { useRef, type ReactNode } from "react";
import { useHeroScrollExit } from "@/hooks/use-hero-scroll-exit";
import { cn } from "@/lib/utils";

// Pins a hero while --hero-exit runs 0 → 1; descendants react to it through
// the .exit-media / .exit-title / .exit-copy classes in app/styles/scroll-exit.css.
export function ScrollExitStage({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHeroScrollExit(scrollRef);

  return (
    <div ref={scrollRef} className={cn("exit-scroll", className)}>
      <section aria-label={label} className="exit-stage">
        {children}
      </section>
    </div>
  );
}
