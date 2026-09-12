export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const smoothstep = (e0: number, e1: number, v: number) => {
  const x = clamp((v - e0) / (e1 - e0));
  return x * x * (3 - 2 * x);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const segmentInOut = (s: number, a: number, b: number, c: number, d: number) => {
  const enter = smoothstep(a, b, s), exit = smoothstep(c, d, s);
  return { enter, exit, active: enter * (1 - exit) };
};

export function getCinemaFrame(smoothScroll: number, viewportHeight: number, mouseX = 0, mouseY = 0) {
  const frame2 = segmentInOut(smoothScroll, 560, 900, 1300, 1620);
  const frame3 = segmentInOut(smoothScroll, 1760, 2140, 2540, 2700);
  const progress = clamp(smoothScroll / 2700);
  const introExit = smoothstep(90, 650, smoothScroll);
  // The #routes chapter (2760 → 3700): a plane flies in and descends, the
  // airport resolves beneath it as it "lands", then the arrival doors slide
  // open on the caption. Each beat overlaps the next so the motion reads as
  // one continuous approach rather than three discrete cuts.
  const routeVisible = smoothstep(2760, 2960, smoothScroll);
  const routePlane = smoothstep(2760, 3320, smoothScroll);
  const routeAirport = smoothstep(3120, 3500, smoothScroll);
  const routeDoor = smoothstep(3460, 3700, smoothScroll);
  const blurActive = clamp(frame2.active + frame3.active);
  const frame2Opacity = frame2.active * (1 - frame3.enter);
  const splitDrift = Math.pow(frame2.enter, 1.5);
  const panel2Opacity = frame2.active * (1 - frame2.exit);
  const panel3Opacity = frame3.active * (1 - frame3.exit);
  const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
  const sharedHeroY = progress * -74;
  const sharedHeroScale = progress * 0.23;
  const routeScreenTop = Math.min(220, Math.max(112, viewportHeight * 0.19)) - 50;
  const routeParentTop = viewportHeight - (viewportHeight - routeScreenTop) / backScale;

  const variables: Record<string, string | number> = {
    "--mx": mouseX.toFixed(4), "--my": mouseY.toFixed(4),
    "--back-opacity": 1 - frame2.active * 0.06,
    "--back-x": `${mouseX * -12}px`, "--back-y": `${mouseY * -4}px`, "--back-scale": backScale,
    "--four-y": `${10 + progress * 10}vh`, "--four-scale": 0.78 + progress * 0.16,
    "--bazaar-y": `${20 - progress * 8}vh`, "--blur-px": `${blurActive * 14}px`,
    "--back-brightness": 1 - blurActive * 0.255,
    "--bazaar-blur-px": `${frame2.active * 14}px`,
    "--bazaar-brightness": 1 - frame2.active * 0.255 - frame3.active * 0.06,
    "--bazaar-saturation": 1 + frame3.active * 0.18,
    "--shade-opacity": "1", "--shade-z": frame2.active > 0.02 ? "2" : "0",
    "--shade-top-alpha": blurActive * 0.465, "--shade-mid-alpha": blurActive * 0.42, "--shade-bottom-alpha": blurActive * 0.51,
    "--title-y": `${introExit * -210}px`, "--title-scale": 1 - introExit * 0.08, "--title-opacity": 1 - introExit,
    "--bridge-x": `calc(-50% + ${mouseX * 18}px)`,
    "--bridge-y": `${mouseY * 8 + sharedHeroY - frame2.exit * 760}px`,
    "--bridge-bottom": `${5 - frame2.enter * 13}vh`, "--bridge-width": `${67.2 + frame2.enter * 37.8}vw`,
    "--bridge-scale": 1.02 + sharedHeroScale + frame2.exit * 0.46,
    "--split-left-x": `calc(-50% + ${-splitDrift * 46}vw + ${mouseX * 22}px)`,
    "--split-left-y": `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`,
    "--split-left-scale": 1 + sharedHeroScale + frame2.enter * 0.74,
    "--split-right-x": `calc(-50% + ${splitDrift * 46}vw + ${mouseX * 22}px)`,
    "--split-right-y": `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`,
    "--split-right-scale": 1 + sharedHeroScale + frame2.enter * 0.74,
    "--frame2-opacity": frame2Opacity, "--frame2-x": `calc(-50% + ${mouseX * 10}px)`,
    "--frame2-y": `calc(-50% + ${mouseY * 8 - frame2.exit * 150}px)`,
    "--frame2-scale": 1.06 + frame2.enter * 0.08 + frame2.exit * 0.08,
    "--intro-copy-y": `${introExit * 90}px`, "--intro-copy-opacity": 1 - introExit,
    "--panel2-opacity": panel2Opacity, "--panel2-y": `calc(-50% + ${-frame2.exit * 86 + (1 - frame2.enter) * 58}px)`,
    "--panel3-opacity": panel3Opacity, "--panel3-y": `calc(-50% + ${-frame3.exit * 86 + (1 - frame3.enter) * 58}px)`,
    "--route-visibility": routeVisible > 0.01 ? "visible" : "hidden",
    "--route-top": `${routeParentTop}px`, "--route-screen-top": `${routeScreenTop}px`,
    "--route-sky-opacity": 1 - routeAirport, "--route-sky-scale": 1 + routePlane * 0.06,
    "--route-airport-opacity": routeAirport, "--route-airport-scale": 1.06 - routeAirport * 0.06,
    "--route-plane-opacity": clamp(routePlane * 1.4) * (1 - routeDoor),
    "--route-plane-x": `${(1 - routePlane) * 46}vw`, "--route-plane-y": `${-22 + routePlane * 30 + routeAirport * 8}vh`,
    "--route-plane-scale": 0.4 + routePlane * 0.55 + routeAirport * 0.35,
    "--route-plane-rotate": `${(1 - routePlane) * -10}deg`,
    "--route-door-opacity": smoothstep(3380, 3460, smoothScroll) * (1 - Math.pow(routeDoor, 3)),
    "--route-door-left-x": `${-routeDoor * 100}%`, "--route-door-right-x": `${routeDoor * 100}%`,
    "--route-caption-opacity": routeDoor, "--route-caption-y": `${(1 - routeDoor) * 26}px`,
  };
  return { variables, introExit, panel2Opacity, panel3Opacity };
}
