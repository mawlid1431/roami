import { afterEach, describe, expect, test } from "bun:test";
import { Window } from "happy-dom";
import { createSightSlider } from "../lib/sight-slider";

let cleanup: (() => void) | undefined;

function setup(reduced = false) {
  const dom = new Window();
  Object.assign(globalThis, {
    window: dom,
    document: dom.document,
    getComputedStyle: dom.getComputedStyle.bind(dom),
    requestAnimationFrame: dom.requestAnimationFrame.bind(dom),
    cancelAnimationFrame: dom.cancelAnimationFrame.bind(dom),
  });
  dom.document.body.innerHTML = `<section><div class="sights-track" style="column-gap:16px">${Array.from({ length: 5 }, (_, index) => `<article class="sight-card" tabindex="0" role="button">Sight ${index}</article>`).join("")}</div><button class="sight-prev">Previous</button><button class="sight-next">Next</button></section>`;
  const section = dom.document.querySelector("section")!;
  const media = dom.matchMedia("(prefers-reduced-motion: reduce)");
  Object.defineProperty(media, "matches", { value: reduced });
  const slider = createSightSlider(section as unknown as HTMLElement, media as unknown as MediaQueryList);
  section.querySelectorAll(".sight-card").forEach((card) => Object.defineProperty(card, "offsetWidth", { value: 360 }));
  slider.updateSightSlider();
  cleanup = () => { slider.destroy(); dom.close(); };
  const active = () => Number(section.querySelector(".is-active")?.getAttribute("data-sight-index"));
  const next = () => section.querySelector(".sight-next")!.dispatchEvent(new dom.MouseEvent("click", { bubbles: true }));
  const prev = () => section.querySelector(".sight-prev")!.dispatchEvent(new dom.MouseEvent("click", { bubbles: true }));
  // happy-dom has no real TransitionEvent implementation (propertyName is
  // silently dropped by its constructor), so the property is assigned
  // directly onto a plain Event to satisfy the production listener's check.
  const settle = () => section.querySelector(".sights-track")!.dispatchEvent(Object.assign(new dom.Event("transitionend"), { propertyName: "transform" }));
  return { dom, section, slider, active, next, prev, settle };
}

afterEach(() => { cleanup?.(); cleanup = undefined; });

describe("three set infinite sights slider", () => {
  test("creates 15 cards in the middle set and restores originals on unmount", () => {
    const { dom, section, slider, active } = setup();
    expect(section.querySelectorAll(".sight-card").length).toBe(15);
    expect(active()).toBe(5);
    expect(dom.document.documentElement.style.getPropertyValue("--sights-shift")).toBe("-1880px");
    slider.destroy();
    expect(section.querySelectorAll(".sight-card").length).toBe(5);
  });

  test("both arrows loop repeatedly without reaching a missing card", () => {
    const { active, next, prev, settle } = setup();
    for (let index = 0; index < 30; index++) {
      next(); settle();
      expect(active()).toBe(5 + (index + 1) % 5);
    }
    for (let index = 0; index < 30; index++) {
      prev(); settle();
      expect(active()).toBe(5 + (4 - index % 5));
    }
  });

  test("keyboard selects a card and cleanup removes handlers", () => {
    const { dom, section, active, slider, next } = setup();
    const card = section.querySelector('[data-sight-index="7"]')!;
    card.dispatchEvent(new dom.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(active()).toBe(7);
    card.dispatchEvent(new dom.KeyboardEvent("keydown", { key: " ", bubbles: true }));
    expect(active()).toBe(7);
    slider.destroy();
    next();
    expect(section.querySelector(".is-active")).toBeNull();
  });

  test("reduced motion loops without receiving any transitionend", () => {
    const { active, next, prev } = setup(true);
    for (let index = 0; index < 40; index++) {
      next();
      expect(active()).toBeGreaterThanOrEqual(5);
      expect(active()).toBeLessThan(10);
    }
    for (let index = 0; index < 40; index++) {
      prev();
      expect(active()).toBeGreaterThanOrEqual(5);
      expect(active()).toBeLessThan(10);
    }
  });

  test("rapid clicks stay within the rendered sets", () => {
    const { active, next, prev } = setup();
    for (let index = 0; index < 80; index++) next();
    expect(active()).toBeGreaterThanOrEqual(0);
    expect(active()).toBeLessThan(15);
    for (let index = 0; index < 80; index++) prev();
    expect(active()).toBeGreaterThanOrEqual(0);
    expect(active()).toBeLessThan(15);
  });
});
