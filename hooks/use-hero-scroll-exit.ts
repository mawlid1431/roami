"use client";

import { useEffect, type RefObject } from "react";
import { lerp, smoothstep } from "@/lib/cinema-math";

// Same easing window as the homepage intro (introExit in lib/cinema-math) and
// the same lerp(0.14) smoothing as use-cinema-scroll, so every place hero
// leaves the screen with the feel of the ROAMI wordmark.
export const HERO_EXIT_START = 90;
export const HERO_EXIT_END = 650;

export function useHeroScrollExit(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const element: HTMLElement = node;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const abort = new AbortController();
    let current = 0;
    let initialized = false;
    let pending = false;
    let frame = 0;

    function update() {
      pending = false;
      const target = Math.max(0, -element.getBoundingClientRect().top);
      if (!initialized || reduceMotion.matches) {
        current = target;
        initialized = true;
      } else {
        current = lerp(current, target, 0.14);
      }
      if (Math.abs(current - target) < 0.08) current = target;
      element.style.setProperty("--hero-exit", smoothstep(HERO_EXIT_START, HERO_EXIT_END, current).toFixed(4));
      if (current !== target) requestTick();
    }

    function requestTick() {
      if (pending) return;
      pending = true;
      frame = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", requestTick, { passive: true, signal: abort.signal });
    window.addEventListener("resize", requestTick, { passive: true, signal: abort.signal });
    reduceMotion.addEventListener("change", requestTick, { signal: abort.signal });
    requestTick();

    return () => {
      abort.abort();
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}
