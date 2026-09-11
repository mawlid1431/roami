import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";
import { AmbientVideo } from "@/components/animations/ambient-video";
import { ScrollExitStage } from "@/components/animations/scroll-exit-stage";
import { SiteHeader } from "@/components/layout/site-header";
import { planCta } from "@/data/navigation";
import type { BoomerangHeroContent } from "@/data/highlights";

export function BoomerangHero({ name, hero }: { name: string; hero: BoomerangHeroContent }) {
  return (
    <ScrollExitStage label={name} className="bg-paper">
      <div className="exit-media absolute inset-0">
        <AmbientVideo src={hero.video} poster={hero.poster} className="h-full w-full object-cover" />
      </div>

      <div className="exit-title relative z-10 flex flex-col items-center px-4 pt-40 text-center sm:px-6 sm:pt-32 md:pt-36">
        <h1 className="max-w-5xl text-[2rem] leading-[0.95] tracking-[-0.035em] text-ink sm:text-4xl md:text-5xl lg:text-[4.75rem] xl:text-[5.25rem]">
          {hero.headlineLead}{" "}
          <span className="text-ink/45">
            {hero.headlineAccent[0]}
            <br className="hidden sm:block" /> {hero.headlineAccent[1]}
          </span>
        </h1>
        <p className="mt-6 max-w-md px-2 text-sm leading-relaxed text-ink/70 sm:mt-8 sm:text-base md:text-lg">{hero.intro}</p>
      </div>

      <div className="exit-copy absolute bottom-6 left-4 right-4 z-10 max-w-sm sm:bottom-8 sm:left-6 sm:right-auto md:bottom-10 md:left-10">
        <div className="mb-3 flex items-center gap-2 text-ink sm:text-paper/95">
          <Sparkles aria-hidden="true" className="h-4 w-4" />
          <span className="text-sm">{hero.blurbLabel}</span>
        </div>
        <p className="mb-6 max-w-xs text-xs leading-relaxed text-ink/90 sm:text-paper/85">{hero.blurb}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={planCta.href}
            className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper shadow-sm transition-colors hover:bg-[#2a2d2a] sm:bg-paper sm:px-6 sm:py-3 sm:text-ink sm:hover:bg-paper/90"
          >
            {planCta.label}
          </Link>
          <a href="#highlight-story" className="text-sm text-ink transition-opacity hover:opacity-80 sm:text-paper">
            Know more.
          </a>
        </div>
      </div>

      <a
        href="#highlight-story"
        className="exit-copy absolute bottom-8 right-6 z-10 hidden items-center gap-2 text-sm text-paper/90 sm:flex md:bottom-10 md:right-10"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-paper/20 backdrop-blur-sm transition-colors hover:bg-paper/30">
          <ArrowDown aria-hidden="true" className="h-3 w-3" />
        </span>
        <span>{hero.storyCue}</span>
        <span className="text-paper/60">{hero.storyMeta}</span>
      </a>

      {/* Rendered last so it paints above the full-width hero layers and stays clickable. */}
      <SiteHeader />
    </ScrollExitStage>
  );
}
