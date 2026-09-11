import { Carousel, Card, type CarouselCard } from "@/components/ui/apple-cards-carousel";
import { sights } from "@/data/sights";

const cardContent: Record<string, string> = {
  "stari-most": "Rebuilt stone-for-stone after the 1993 destruction and reopened in 2004, Stari Most remains the reason most travelers first hear of Mostar. Arrive near sunset, when the stone glows amber and local divers gather on the parapet.",
  "kujundziluk": "The cobbled bazaar lane runs straight from the bridge's east bank, lined with copper workshops that have traded here since the Ottoman era. Mornings are quietest, before the tour buses arrive from Dubrovnik and Split.",
  "koski-mehmed-pasha-mosque": "Climb the minaret for the single best framed view of Stari Most and the Neretva gorge. The mosque's courtyard, shaded by plane trees, is a good place to sit once the crowds below thin out.",
  "kajtaz-house": "A single-family Ottoman house preserved almost exactly as it was lived in, with separate men's and women's quarters and a walled garden. It gives the old town's architecture a human scale the bazaar doesn't.",
  "war-photo-exhibition": "A compact but unflinching photographic record of the 1992-95 siege, housed just off the bridge. Twenty minutes here changes how the rest of the old town reads for the remainder of your visit.",
};

export function PlacesCarousel() {
  const items: CarouselCard[] = sights.map((sight) => ({
    category: sight.kicker,
    title: sight.name,
    src: sight.image,
    content: cardContent[sight.slug] ?? sight.description,
  }));

  return (
    <section id="places" aria-label="Places to see in Mostar" className="roami-section roami-section-light">
      <div className="roami-section-inner">
        <p className="roami-eyebrow">Places</p>
        <h2 className="roami-heading">Five stops that make sense of Mostar.</h2>
        <p className="roami-subheading">
          Curated by ROAMI from the old town&apos;s bridge, bazaar, and quieter corners &mdash; tap a card for the full story.
        </p>
      </div>
      <div className="mt-10">
        <Carousel items={items.map((item, index) => <Card key={item.title} card={item} index={index} />)} />
      </div>
    </section>
  );
}
