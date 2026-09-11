export interface Sight {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  pin: string;
  image: string;
}

// Frontend contracts for the later Phase 1 travel discovery slices.
export interface Category { slug: string; name: string }
export interface Review { id: string; author: string; rating: number; text: string }
export interface Destination {
  slug: string;
  name: string;
  country: string;
  description: string;
  images: string[];
  highlights: string[];
  categories: Category[];
  reviews: Review[];
}
export interface Tour {
  slug: string;
  name: string;
  destinationSlug: string;
  description: string;
  duration: string;
  price: number;
  currency: string;
  available: boolean;
  itinerary: { title: string; description: string }[];
}
export interface Hotel { slug: string; name: string; destinationSlug: string; description: string }
export interface TravelPackage { slug: string; name: string; tourSlugs: string[]; price: number; currency: string }
export interface Testimonial { id: string; author: string; quote: string; destination: string }
export interface BlogPost { slug: string; title: string; excerpt: string; content: string; category: Category }
export interface SearchFilters { query: string; country?: string; category?: string; maxPrice?: number }
