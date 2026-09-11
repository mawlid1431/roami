"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Plain <img> (not next/image): these are hotlinked remote photos, matching
// the same pattern SceneImage already uses for the cinematic scene assets.
/* eslint-disable @next/next/no-img-element */

export interface LayoutGridCard {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
}

export function LayoutGrid({ cards }: { cards: LayoutGridCard[] }) {
  const [selected, setSelected] = useState<LayoutGridCard | null>(null);

  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[16rem]">
      {cards.map((card) => (
        <motion.button
          type="button"
          key={card.id}
          onClick={() => setSelected(card)}
          layoutId={`layout-card-${card.id}`}
          className={cn(
            "relative h-64 w-full overflow-hidden rounded-2xl text-left md:h-full",
            card.className
          )}
        >
          <motion.div layoutId={`layout-image-${card.id}`} className="absolute inset-0 h-full w-full">
            <img src={card.thumbnail} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1110]/80 via-[#0b1110]/10 to-transparent" />
          </motion.div>
          <div className="relative z-10 flex h-full flex-col justify-end p-6">{card.content}</div>
        </motion.button>
      ))}

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-[#0b1110]/75 backdrop-blur-md"
            />
            <motion.div
              layoutId={`layout-card-${selected.id}`}
              className="relative z-10 h-[70vh] w-[min(760px,94vw)] overflow-hidden rounded-3xl"
            >
              <motion.div layoutId={`layout-image-${selected.id}`} className="absolute inset-0 h-full w-full">
                <img src={selected.thumbnail} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1110]/85 via-[#0b1110]/20 to-transparent" />
              </motion.div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#fdf1e1] text-[#111411]"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative z-10 flex h-full flex-col justify-end p-8">{selected.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
