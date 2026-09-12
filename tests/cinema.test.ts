import { describe, expect, test } from "bun:test";
import { getCinemaFrame } from "../lib/cinema-math";

describe("cinematic scroll acceptance milestones", () => {
  test("intro starts visible and finishes its prescribed exit at 650px", () => {
    const start = getCinemaFrame(0, 900).variables;
    expect(start["--title-opacity"]).toBe(1);
    expect(start["--bridge-width"]).toBe("67.2vw");
    expect(start["--sights-visibility"]).toBe("hidden");
    const end = getCinemaFrame(650, 900).variables;
    expect(end["--title-y"]).toBe("-210px");
    expect(end["--title-scale"]).toBe(0.92);
    expect(end["--title-opacity"]).toBe(0);
    expect(end["--intro-copy-y"]).toBe("90px");
  });

  test("bridge plateau shows the river, split scene, blur and bridge facts", () => {
    const { variables, panel2Opacity, panel3Opacity } = getCinemaFrame(1080, 900);
    expect(variables["--bridge-width"]).toBe("105vw");
    expect(variables["--bridge-bottom"]).toBe("-8vh");
    expect(variables["--split-left-x"]).toBe("calc(-50% + -46vw + 0px)");
    expect(variables["--split-right-x"]).toBe("calc(-50% + 46vw + 0px)");
    expect(variables["--frame2-opacity"]).toBe(1);
    expect(variables["--blur-px"]).toBe("14px");
    expect(variables["--back-brightness"]).toBe(0.745);
    expect(panel2Opacity).toBe(1);
    expect(panel3Opacity).toBe(0);
  });

  test("bazaar plateau replaces the bridge story and restores a sharp bazaar", () => {
    const { variables, panel2Opacity, panel3Opacity } = getCinemaFrame(2320, 900);
    expect(panel2Opacity).toBe(0);
    expect(panel3Opacity).toBe(1);
    expect(variables["--frame2-opacity"]).toBe(0);
    expect(variables["--bazaar-saturation"]).toBe(1.18);
    expect(variables["--bazaar-blur-px"]).toBe("0px");
  });

  test("the plane descends before the airport resolves, and the doors stay shut until the very end", () => {
    expect(getCinemaFrame(2760, 900).variables["--route-plane-x"]).toBe("46vw");
    expect(getCinemaFrame(3350, 900).variables["--route-door-left-x"]).toBe("0%");
    expect(getCinemaFrame(3350, 900).variables["--route-airport-opacity"]).toBeGreaterThan(0);
    for (const height of [640, 900, 1440]) {
      const { variables } = getCinemaFrame(3700, height);
      expect(variables["--route-plane-x"]).toBe("0vw");
      expect(variables["--route-door-left-x"]).toBe("-100%");
      expect(variables["--route-door-right-x"]).toBe("100%");
      expect(variables["--route-caption-opacity"]).toBe(1);
      // The arrival layer is full-bleed and outside .back-stack, so it carries
      // no viewport-height geometry of its own — only the airport is left on screen.
      expect(variables["--route-airport-opacity"]).toBe(1);
      expect(variables["--route-sky-opacity"]).toBe(0);
    }
  });

  test("neutral pointer produces no parallax offset", () => {
    const frame = getCinemaFrame(1080, 900, 0, 0).variables;
    expect(frame["--mx"]).toBe("0.0000");
    expect(frame["--my"]).toBe("0.0000");
    expect(frame["--back-x"]).toBe("0px");
    expect(frame["--frame2-x"]).toBe("calc(-50% + 0px)");
  });
});
