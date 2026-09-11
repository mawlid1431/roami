"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Plain <img> (not next/image): these are hotlinked remote photos, matching
// the same pattern SceneImage already uses for the cinematic scene assets.
/* eslint-disable @next/next/no-img-element */

export interface AnimatedTestimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export function AnimatedTestimonials({
  testimonials,
  autoplay = true,
}: {
  testimonials: AnimatedTestimonial[];
  autoplay?: boolean;
}) {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((current) => (current - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2">
      <div className="relative h-72 w-full sm:h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[active].src}
            initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.94, rotate: 3 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden rounded-3xl"
          >
            <img
              src={testimonials[active].src}
              alt={testimonials[active].name}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-heading text-2xl leading-snug text-[#fdf1e1] sm:text-3xl">
              &ldquo;{testimonials[active].quote}&rdquo;
            </p>
            <p className="mt-6 text-lg font-semibold text-[#fdf1e1]">{testimonials[active].name}</p>
            <p className="text-sm text-[#fdf1e1]/70">{testimonials[active].designation}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdf1e1]/10 text-[#fdf1e1] transition hover:bg-[#fdf1e1]/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdf1e1]/10 text-[#fdf1e1] transition hover:bg-[#fdf1e1]/20"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
