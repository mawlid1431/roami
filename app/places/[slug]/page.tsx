import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { PlaceHero } from "@/components/sections/places/place-hero";
import { highlights } from "@/data/highlights";

export const dynamicParams = false;

export function generateStaticParams() {
  return highlights.map((highlight) => ({ slug: highlight.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const highlight = highlights.find((item) => item.slug === slug);
  if (!highlight) return {};
  const title = `${highlight.name} | ROAMI`;
  return {
    title,
    description: highlight.tagline,
    openGraph: { title, description: highlight.tagline, type: "article" },
  };
}

export default async function HighlightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const highlight = highlights.find((item) => item.slug === slug);
  if (!highlight) notFound();

  return (
    <main className="site-shell">
      <PlaceHero highlight={highlight} />
      <section className="highlight-body" id="highlight-story" aria-label={`About ${highlight.name}`}>
        <div className="highlight-body-inner">
          {highlight.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <dl className="highlight-facts">
            {highlight.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
