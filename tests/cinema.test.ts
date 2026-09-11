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

  test("cards arrive before the controls and stay screen sized across viewport heights", () => {
    expect(getCinemaFrame(2760, 900).variables["--sights-enter-x"]).toBe("420vw");
    expect(getCinemaFrame(3350, 900).sightsControlsEnter).toBe(0);
    for (const height of [640, 900, 1440]) {
      const { variables, sightsControlsEnter } = getCinemaFrame(3700, height);
      expect(variables["--sights-enter-x"]).toBe("0vw");
      expect(sightsControlsEnter).toBe(1);
      expect(Number(variables["--back-scale"]) * Number(variables["--sights-scale"])).toBeCloseTo(1);
      const projectedTop = height - (height - parseFloat(String(variables["--sights-top"]))) * Number(variables["--back-scale"]);
      expect(projectedTop).toBeCloseTo(Math.min(220, Math.max(112, height * 0.19)) - 50);
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
