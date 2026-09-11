import type { Testimonial } from "@/types/travel";

export const testimonials: (Testimonial & { role: string; avatar: string })[] = [
  {
    id: "amara-osei",
    author: "Amara Osei",
    role: "Solo traveler",
    quote: "ROAMI mapped Mostar into a single unhurried afternoon: Stari Most at golden hour, then the bazaar lane before the tour groups arrived. It felt like local advice, not a checklist.",
    destination: "Mostar, Bosnia and Herzegovina",
    avatar: "https://images.unsplash.com/photo-1548213238-0da7521bd6e0",
  },
  {
    id: "daniel-reyes",
    author: "Daniel Reyes",
    role: "Travelled with partner",
    quote: "The old town notes saved us from wandering in circles. We knew exactly which lane led to the copper shops and which courtyard had the quiet river view for coffee.",
    destination: "Mostar, Bosnia and Herzegovina",
    avatar: "https://images.unsplash.com/photo-1614436201459-156d322d38c6",
  },
  {
    id: "priya-nair",
    author: "Priya Nair",
    role: "Weekend trip",
    quote: "I've used plenty of trip planners that just list attractions. ROAMI actually explained why Stari Most matters and paced our two days around the light and the crowds.",
    destination: "Mostar, Bosnia and Herzegovina",
    avatar: "https://images.unsplash.com/photo-1690738884478-70c74ef7830c",
  },
];
