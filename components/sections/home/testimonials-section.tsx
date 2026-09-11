import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const items = testimonials.map((testimonial) => ({
    quote: testimonial.quote,
    name: testimonial.author,
    designation: `${testimonial.role} · ${testimonial.destination}`,
    src: testimonial.avatar,
  }));

  return (
    <section id="testimonials" aria-label="Traveler stories" className="roami-section roami-section-dark">
      <div className="roami-section-inner">
        <p className="roami-eyebrow roami-eyebrow-light">Traveler stories</p>
        <h2 className="roami-heading roami-heading-light">Planned with ROAMI, walked at their own pace.</h2>
      </div>
      <div className="mt-10 px-4 sm:px-8">
        <AnimatedTestimonials testimonials={items} />
      </div>
    </section>
  );
}
