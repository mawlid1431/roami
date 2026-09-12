"use client";

import { useEffect } from "react";
import { clamp, getCinemaFrame, lerp } from "@/lib/cinema-math";

export function useCinemaScroll() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".cinema-scroll");
    if (!section) return;
    const root = document.documentElement;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const intro = section.querySelector<HTMLElement>(".intro-copy")!;
    const bridge = section.querySelector<HTMLElement>(".story-panel-bridge")!;
    const bazaar = section.querySelector<HTMLElement>(".story-panel-bazaar")!;
    const belowFoldSections = ["places", "get-in-touch"]
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((entry): entry is { id: string; el: HTMLElement } => entry.el !== null);
    const chapterWaypoints: [string, number][] = [["cinema", 0], ["bridge", 1080], ["bazaar", 2320], ["routes", 3700]];
    const abort = new AbortController();
    const options = { passive: true, signal: abort.signal };
    let targetMouseX = 0, targetMouseY = 0, mouseX = 0, mouseY = 0;
    let targetScroll = 0, smoothScroll = 0;
    let initialized = false, rafPending = false, frameId = 0;
    const priorStyles = new Map<string, string>();
    const getScrollDistance = () => clamp(-section.getBoundingClientRect().top, 0, section.offsetHeight - window.innerHeight);

    function setExposure(element: HTMLElement, visible: boolean) {
      element.inert = !visible;
      element.setAttribute("aria-hidden", String(!visible));
    }

    // Drives the nav's active-link highlight: below-fold sections win once
    // actually in view, otherwise the nearest in-pin chapter waypoint we've
    // scrolled past does. Read via [data-active-section] in cinema.css.
    function updateActiveSection() {
      const headerClearance = 140;
      for (const { id, el } of belowFoldSections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerClearance && rect.bottom > headerClearance) {
          root.dataset.activeSection = id;
          return;
        }
      }
      let active = chapterWaypoints[0][0];
      for (const [id, distance] of chapterWaypoints) if (targetScroll >= distance - 1) active = id;
      root.dataset.activeSection = active;
    }

    function update() {
      rafPending = false;
      targetScroll = getScrollDistance();
      if (!initialized || reduceMotion.matches) { smoothScroll = targetScroll; initialized = true; }
      else smoothScroll = lerp(smoothScroll, targetScroll, 0.14);
      if (Math.abs(smoothScroll - targetScroll) < 0.08) smoothScroll = targetScroll;

      if (reduceMotion.matches) {
        mouseX = 0; mouseY = 0; targetMouseX = 0; targetMouseY = 0;
      } else {
        mouseX = lerp(mouseX, targetMouseX, 0.12);
        mouseY = lerp(mouseY, targetMouseY, 0.12);
      }
      const frame = getCinemaFrame(smoothScroll, window.innerHeight, mouseX, mouseY);
      for (const key of Object.keys(frame.variables)) {
        if (!priorStyles.has(key)) priorStyles.set(key, root.style.getPropertyValue(key));
      }
      // Custom properties are set directly: GSAP's unit inference mishandles
      // property names ending in "-x"/"-y" (e.g. --split-left-x), appending a
      // stray "%" that corrupts the calc() transform values.
      for (const [key, value] of Object.entries(frame.variables)) {
        root.style.setProperty(key, String(value));
      }
      setExposure(intro, frame.introExit < 0.99);
      setExposure(bridge, frame.panel2Opacity > 0.01);
      setExposure(bazaar, frame.panel3Opacity > 0.01);
      updateActiveSection();

      if (Math.abs(smoothScroll - targetScroll) > 0.08 || Math.abs(mouseX - targetMouseX) > 0.001 || Math.abs(mouseY - targetMouseY) > 0.001) requestTick();
    }

    function requestTick() {
      if (rafPending) return;
      rafPending = true;
      frameId = requestAnimationFrame(update);
    }

    const chapterDistances: Record<string, number> = { "#cinema": 0, "#bridge": 1080, "#bazaar": 2320, "#routes": 3700 };

    function scrollToChapter() {
      const distance = chapterDistances[window.location.hash];
      if (distance === undefined) return;
      window.scrollTo({ top: window.scrollY + section!.getBoundingClientRect().top + distance, behavior: reduceMotion.matches ? "instant" : "smooth" });
    }

    window.addEventListener("scroll", requestTick, options);
    window.addEventListener("resize", requestTick, options);
    window.addEventListener("pointermove", (event) => {
      if (!reduceMotion.matches) {
        targetMouseX = event.clientX / window.innerWidth - 0.5;
        targetMouseY = event.clientY / window.innerHeight - 0.5;
      }
      requestTick();
    }, options);
    window.addEventListener("hashchange", scrollToChapter, options);
    section.querySelectorAll<HTMLAnchorElement>(".site-header a").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!(link.hash in chapterDistances)) return; // let the browser handle plain anchor sections below the fold
        event.preventDefault();
        history.pushState(null, "", link.hash);
        scrollToChapter();
      }, { signal: abort.signal });
    });
    reduceMotion.addEventListener("change", requestTick, options);
    scrollToChapter();
    requestTick();

    return () => {
      abort.abort();
      cancelAnimationFrame(frameId);
      delete root.dataset.activeSection;
      priorStyles.forEach((value, key) => value ? root.style.setProperty(key, value) : root.style.removeProperty(key));
    };
  }, []);
}
