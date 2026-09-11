import type { Highlight } from "@/data/highlights";
import { BoomerangHero } from "./boomerang-hero";
import { FadeHero } from "./fade-hero";
import { GlassHero } from "./glass-hero";

export function PlaceHero({ highlight }: { highlight: Highlight }) {
  const { hero, name } = highlight;
  switch (hero.variant) {
    case "boomerang":
      return <BoomerangHero name={name} hero={hero} />;
    case "fade":
      return <FadeHero name={name} hero={hero} />;
    case "glass":
      return <GlassHero name={name} hero={hero} />;
  }
}
