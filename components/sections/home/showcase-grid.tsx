import { LayoutGrid, type LayoutGridCard } from "@/components/ui/layout-grid";

function Caption({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="font-heading text-xl text-[#fdf1e1] sm:text-2xl">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-[#fdf1e1]/75">{body}</p>
    </div>
  );
}

const cards: LayoutGridCard[] = [
  {
    id: 1,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1684161223491-05b8ed84b3cb",
    content: (
      <Caption
        title="A bridge worth crossing twice"
        body="Stari Most links the old town's two banks and, for four centuries, its two halves. Cross once for the view, again for the light."
      />
    ),
  },
  {
    id: 2,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1619259894990-79119c815caf",
    content: (
      <Caption
        title="Minarets over the Neretva"
        body="Koski Mehmed Pasha's courtyard is the quietest seat in the old town."
      />
    ),
  },
  {
    id: 3,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1567889929639-ddef66218960",
    content: (
      <Caption
        title="Emerald water, all year"
        body="The Neretva keeps its color even in deep winter, cutting through the Herzegovina hills."
      />
    ),
  },
  {
    id: 4,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1698784849533-2ef9673d8a20",
    content: (
      <Caption
        title="Copper shops of Kujundziluk"
        body="Same trade, same lane, since the Ottoman era. Mornings before 10am are yours alone."
      />
    ),
  },
];

export function ShowcaseGrid() {
  return (
    <section id="showcase" aria-label="Mostar in detail" className="roami-section roami-section-dark">
      <div className="roami-section-inner">
        <p className="roami-eyebrow roami-eyebrow-light">Up close</p>
        <h2 className="roami-heading roami-heading-light">Mostar, one frame at a time.</h2>
        <p className="roami-subheading roami-subheading-light">
          Select a tile to see it full frame.
        </p>
      </div>
      <div className="mt-10 flex justify-center px-4 sm:px-8">
        <LayoutGrid cards={cards} />
      </div>
    </section>
  );
}
