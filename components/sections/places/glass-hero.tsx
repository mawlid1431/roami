/* eslint-disable @next/next/no-img-element -- Hotlinked remote avatar, matching SceneImage's convention. */
import { AmbientVideo } from "@/components/animations/ambient-video";
import { ScrollExitStage } from "@/components/animations/scroll-exit-stage";
import { SiteHeader } from "@/components/layout/site-header";
import type { GlassHeroContent } from "@/data/highlights";
import { testimonials } from "@/data/testimonials";
import { EmailRouteForm } from "./email-route-form";

export function GlassHero({ name, hero }: { name: string; hero: GlassHeroContent }) {
  const traveler = testimonials.find((item) => item.id === hero.testimonial.travelerId);
  if (!traveler) throw new Error(`Unknown traveler "${hero.testimonial.travelerId}" in ${name} hero`);

  return (
    <ScrollExitStage label={name} className="bg-night">
      <div className="exit-media absolute inset-0">
        <AmbientVideo src={hero.video} poster={hero.poster} className="h-full w-full object-cover" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mt-auto flex flex-col gap-6 px-5 pb-8 sm:gap-8 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-16">
          <div className="exit-title max-w-xl">
            <h1 className="text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[3.5rem] lg:text-paper">
              {hero.headline}
            </h1>
            <EmailRouteForm placeholder={hero.emailPlaceholder} cta={hero.emailCta} />
          </div>

          <div className="exit-copy flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5">
            <div className="flex flex-col justify-between rounded-2xl bg-paper/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">
              <p className="text-3xl tracking-tight text-ink sm:text-4xl lg:text-paper">{hero.stat.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:mt-4 lg:text-paper/70">{hero.stat.label}</p>
            </div>

            <figure className="rounded-2xl bg-paper/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-xs text-paper">
                  {hero.testimonial.orgInitial}
                </span>
                <span className="text-sm text-ink lg:text-paper">{hero.testimonial.org}</span>
              </div>
              <blockquote className="text-sm leading-relaxed text-ink/80 lg:text-paper/80">&ldquo;{hero.testimonial.excerpt}&rdquo;</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 sm:mt-5">
                <img
                  src={`${traveler.avatar}?w=72&h=72&fit=crop`}
                  alt={traveler.author}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full bg-paper/20 object-cover"
                />
                <div>
                  <p className="text-sm text-ink lg:text-paper">{traveler.author}</p>
                  <p className="text-xs text-ink/60 lg:text-paper/60">{traveler.role}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Rendered last so it paints above the full-height content layer and stays clickable. */}
      <SiteHeader />
    </ScrollExitStage>
  );
}
