export interface HighlightFact {
  label: string;
  value: string;
}

interface HeroMedia {
  video: string;
  poster: string;
}

export interface BoomerangHeroContent extends HeroMedia {
  variant: "boomerang";
  headlineLead: string;
  /** Muted second half of the headline, split onto two lines from `sm` up. */
  headlineAccent: [string, string];
  intro: string;
  blurbLabel: string;
  blurb: string;
  storyCue: string;
  storyMeta: string;
}

export interface FadeHeroContent extends HeroMedia {
  variant: "fade";
  headline: { text: string; muted?: boolean }[];
  description: string;
}

export interface GlassHeroContent extends HeroMedia {
  variant: "glass";
  headline: string;
  emailPlaceholder: string;
  emailCta: string;
  stat: { value: string; label: string };
  testimonial: { org: string; orgInitial: string; travelerId: string; excerpt: string };
}

export interface Highlight {
  slug: string;
  name: string;
  tagline: string;
  body: string[];
  facts: HighlightFact[];
  hero: BoomerangHeroContent | FadeHeroContent | GlassHeroContent;
}

const cloudfront = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P";

export const highlights: Highlight[] = [
  {
    slug: "old-bridge",
    name: "Old Bridge",
    tagline: "Stari Most, rebuilt stone for stone.",
    hero: {
      variant: "boomerang",
      // Forward + reversed render of cloudfront hf_20260511_131941 (the arch clip).
      // Pre-rendered because capturing this 4K clip's frames into canvases at
      // runtime would hold roughly 400MB in the browser.
      video: "/videos/old-bridge-boomerang.mp4",
      poster: "/videos/old-bridge-poster.jpg",
      headlineLead: "Cross the arch",
      headlineAccent: ["linking", "two banks and one city"],
      intro: "Stari Most has carried Mostar across the Neretva since 1566. Walk it at golden hour, when the stone turns amber.",
      blurbLabel: "Stari Most",
      blurb: "ROAMI times your crossing around the light and the crowds, then threads the bazaar lanes on both banks into one unhurried route.",
      storyCue: "Read the story",
      storyMeta: "3 min",
    },
    body: [
      "Stari Most has crossed the Neretva since 1566, when Ottoman architect Mimar Hayruddin closed a single stone arch over the gorge that locals had called, doubtfully, \"the crooked bridge.\" It became the fastest route between Mostar's two banks and, over four centuries, the city's clearest landmark.",
      "The bridge was destroyed by tank fire in November 1993, during the Croat-Bosniak conflict. It stood as rubble in the Neretva for over a decade before a UNESCO-backed reconstruction, using the original quarrying techniques and stone from the same Tenelija quarry, reopened it in 2004.",
      "Local divers still jump from the parapet, a tradition older than the reconstruction itself. Arrive close to sunset, when the stone turns amber and the crowds thin toward the bazaar.",
    ],
    facts: [
      { label: "Completed", value: "1566" },
      { label: "Destroyed", value: "1993" },
      { label: "Reopened", value: "2004" },
      { label: "UNESCO listed", value: "2005" },
    ],
  },
  {
    slug: "neretva-river",
    name: "Neretva River",
    tagline: "Emerald water through the Herzegovina hills.",
    hero: {
      variant: "fade",
      video: `${cloudfront}/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4`,
      poster: "/videos/neretva-river-poster.jpg",
      headline: [
        { text: "Beyond " },
        { text: "the bridge,", muted: true },
        { text: " the river runs " },
        { text: "emerald.", muted: true },
      ],
      description: "Fed by the Dinaric Alps and filtered clear by limestone karst, the Neretva carves Mostar's gorge, cools its summers, and keeps its turquoise all the way to the Adriatic.",
    },
    body: [
      "The Neretva runs 225 kilometers from the Dinaric Alps to the Adriatic, and keeps its striking turquoise color for nearly the whole route, fed by limestone karst that filters the water clear even through winter.",
      "In Mostar the river cuts a narrow gorge directly beneath Stari Most, which is what gives the bridge its dramatic 20-meter clearance and made the crossing worth building in the first place. Riverside terraces along both banks are the old town's best seats for watching the bridge divers.",
      "Downstream, the same river carves the Kravice waterfalls, a popular half-day trip from Mostar for travelers who want the Neretva without the crowds.",
    ],
    facts: [
      { label: "Length", value: "225 km" },
      { label: "Source", value: "Dinaric Alps" },
      { label: "Mouth", value: "Adriatic Sea" },
    ],
  },
  {
    slug: "unesco-old-city",
    name: "UNESCO Old City",
    tagline: "A walkable old town shaped by three empires.",
    hero: {
      variant: "glass",
      video: `${cloudfront}/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4`,
      poster: "/videos/unesco-old-city-poster.jpg",
      headline: "Walk three empires in one unhurried afternoon",
      emailPlaceholder: "Type your email",
      emailCta: "Get the route",
      stat: { value: "2005", label: "The year UNESCO inscribed the Old Bridge Area, bazaar lanes and all." },
      testimonial: {
        org: "ROAMI Stories",
        orgInitial: "R",
        travelerId: "priya-nair",
        excerpt: "ROAMI paced our two days around the light and the crowds.",
      },
    },
    body: [
      "The Old Bridge Area, inscribed by UNESCO in 2005, covers the historic quarters on both banks of the Neretva: the bazaar street of Kujundziluk, the Ottoman-era mosques and residential houses, and the reconstructed bridge itself.",
      "It's compact enough to see on foot in a single unhurried day. Mornings belong to the copper shops setting up for the day; afternoons bring the crowds; evenings return the old town to the people who live there.",
      "UNESCO's citation calls it a symbol of reconciliation, coexistence, and reconstruction, built on the layered legacy of Ottoman, Mediterranean, and Central European architecture.",
    ],
    facts: [
      { label: "Inscribed", value: "2005" },
      { label: "Criteria", value: "vi" },
      { label: "Area", value: "Old Bridge district" },
    ],
  },
];
