import Link from "next/link";
import { AmbientVideo } from "@/components/animations/ambient-video";
import { ScrollExitStage } from "@/components/animations/scroll-exit-stage";
import { SiteHeader } from "@/components/layout/site-header";
import { planCta } from "@/data/navigation";
import type { FadeHeroContent } from "@/data/highlights";

export function FadeHero({ name, hero }: { name: string; hero: FadeHeroContent }) {
  return (
    <ScrollExitStage label={name} className="bg-paper">
      <div className="exit-media absolute inset-x-0 bottom-0 top-[300px]">
        <AmbientVideo fade src={hero.video} poster={hero.poster} className="h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-paper via-transparent to-paper" />
      </div>

      <div className="exit-title relative z-10 flex flex-col items-center justify-center px-6 pb-40 pt-48 text-center sm:pt-40">
        <h1 className="fade-rise max-w-7xl text-5xl leading-[0.95] tracking-[-2.46px] text-ink sm:text-7xl md:text-8xl">
          {hero.headline.map((part) =>
            part.muted ? (
              <em key={part.text} className="text-ink/45">{part.text}</em>
            ) : (
              <span key={part.text}>{part.text}</span>
            ),
          )}
        </h1>
        <p className="fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-ink/55 sm:text-lg">{hero.description}</p>
        {/* The entrance animation holds `transform`, so hover scale lives on the inner link. */}
        <div className="fade-rise-delay-2 mt-12">
          <Link
            href={planCta.href}
            className="inline-block rounded-full bg-ink px-14 py-5 text-base text-paper transition-transform hover:scale-[1.03]"
          >
            {planCta.label}
          </Link>
        </div>
      </div>

      {/* Rendered last so it paints above the full-width hero layers and stays clickable. */}
      <SiteHeader />
    </ScrollExitStage>
  );
}
