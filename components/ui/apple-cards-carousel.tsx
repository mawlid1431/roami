"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Plain <img> (not next/image): these are hotlinked remote photos, matching
// the same pattern SceneImage already uses for the cinematic scene assets.
/* eslint-disable @next/next/no-img-element */

export interface CarouselCard {
  category: string;
  title: string;
  src: string;
  content: React.ReactNode;
}

type CarouselContextValue = { onCardClose: (index: number) => void };
const CarouselContext = createContext<CarouselContextValue>({ onCardClose: () => {} });

export function Carousel({ items }: { items: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -360 : 360, behavior: "smooth" });
  };

  const onCardClose = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const cardWidth = 340;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  return (
    <CarouselContext.Provider value={{ onCardClose }}>
      <div className="relative w-full">
        <div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] sm:px-8 md:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <motion.div
              key={"carousel-card" + index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 * index }}
              className="snap-start"
            >
              {item}
            </motion.div>
          ))}
        </div>
        <div className="mr-4 flex justify-end gap-2 pt-4 md:mr-10">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111411]/15 bg-[#fdf1e1] text-[#111411] transition disabled:opacity-30"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111411]/15 bg-[#fdf1e1] text-[#111411] transition disabled:opacity-30"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function Card({ card, index }: { card: CarouselCard; index: number }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) handleClose();
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0b1110]/70 backdrop-blur-md"
            />
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[60] mx-auto my-10 w-[min(720px,92vw)] rounded-3xl bg-[#fdf1e1] p-6 font-sans md:p-10"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={handleClose}
                className="sticky top-4 left-full flex h-8 w-8 items-center justify-center rounded-full bg-[#111411] text-[#fdf1e1]"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="text-sm font-semibold text-[#111411]/60">{card.category}</p>
              <h3 className="mt-1 font-heading text-3xl text-[#111411] md:text-4xl">{card.title}</h3>
              <div className="relative mt-6 h-56 w-full overflow-hidden rounded-2xl md:h-72">
                <img src={card.src} alt={card.title} className="h-full w-full object-cover" />
              </div>
              <div className="mt-6 text-base leading-relaxed text-[#111411]/80">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative flex h-80 w-64 flex-col justify-end overflow-hidden rounded-3xl text-left shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:h-96 sm:w-80"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1110]/85 via-[#0b1110]/10 to-transparent" />
        <img src={card.src} alt={card.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative z-10 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#fdf1e1]/80">{card.category}</p>
          <h3 className="mt-1 font-heading text-2xl text-[#fdf1e1] sm:text-3xl">{card.title}</h3>
        </div>
      </motion.button>
    </>
  );
}
