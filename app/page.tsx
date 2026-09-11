import { SiteFooter } from "@/components/layout/site-footer";
import { CinematicHome } from "@/components/sections/home/cinematic-home";
import { GetInTouch } from "@/components/sections/home/get-in-touch";
import { PlacesCarousel } from "@/components/sections/home/places-carousel";
import { ShowcaseGrid } from "@/components/sections/home/showcase-grid";
import { TestimonialsSection } from "@/components/sections/home/testimonials-section";

export default function Home() {
  return (
    <main className="site-shell">
      <CinematicHome />
      <PlacesCarousel />
      <ShowcaseGrid />
      <TestimonialsSection />
      <GetInTouch />
      <SiteFooter />
    </main>
  );
}
