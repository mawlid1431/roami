import { sightPins } from "./scene";
import type { Sight } from "@/types/travel";

export const sights: Sight[] = [
  { slug: "stari-most", name: "Stari Most", kicker: "Old Bridge", description: "The stone arch over the Neretva and Mostar's main landmark.", pin: sightPins[0], image: "https://images.unsplash.com/photo-1689019345483-4f847b92e5e3" },
  { slug: "kujundziluk", name: "Kujundziluk", kicker: "Bazaar Street", description: "Copper shops, souvenirs, and the old bazaar lane by the bridge.", pin: sightPins[1], image: "https://images.unsplash.com/photo-1765135018177-6cecaa77d515" },
  { slug: "koski-mehmed-pasha-mosque", name: "Koski Mehmed Pasha Mosque", kicker: "Viewpoint", description: "A classic minaret view back toward Stari Most and the river.", pin: sightPins[2], image: "https://images.unsplash.com/photo-1551041777-ed277b8dd348" },
  { slug: "kajtaz-house", name: "Kajtaz House", kicker: "Ottoman House", description: "A preserved residential house showing Mostar's Ottoman layers.", pin: sightPins[0], image: "https://images.unsplash.com/photo-1567890870343-7df3f77b3d36" },
  { slug: "war-photo-exhibition", name: "War Photo Exhibition", kicker: "Museum", description: "A compact, moving stop for context on the city's recent history.", pin: sightPins[1], image: "https://images.unsplash.com/photo-1653987255814-3b4c05832660" },
];
