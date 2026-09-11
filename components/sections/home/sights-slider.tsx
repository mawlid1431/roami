/* eslint-disable @next/next/no-img-element -- The reference requires direct remote transparent pin assets. */
"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { motion, useReducedMotion } from "framer-motion";
import { sights } from "@/data/sights";

export function SightsSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openSight = sights.find((sight) => sight.slug === openSlug) ?? null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    // lib/sight-slider.ts clones these cards for its three-set loop, which
    // drops React's event bindings, so card selection reaches us as a
    // native DOM event bubbling up from the clone instead of a prop.
    function onSightOpen(event: Event) {
      setOpenSlug((event as CustomEvent<string>).detail);
    }
    section.addEventListener("sight-open", onSightOpen);
    return () => section.removeEventListener("sight-open", onSightOpen);
  }, []);

  return (
    <section className="sights-slider" aria-label="Mostar sights slider" id="routes" ref={sectionRef}>
      <div className="sights-track">
        {sights.map((sight) => (
          <article
            className="sight-card"
            tabIndex={0}
            role="button"
            aria-label={`Open ${sight.name} card`}
            data-sight-slug={sight.slug}
            key={sight.slug}
          >
            <img className="sight-bg" src={sight.image} alt="" draggable={false} />
            <span className="sight-card-shade" aria-hidden="true" />
            <img className="sight-pin" src={sight.pin} alt="" width={68} height={68} draggable={false} />
            <span className="sight-kicker">{sight.kicker}</span>
            <h3>{sight.name}</h3>
            <p>{sight.description}</p>
          </article>
        ))}
      </div>

      <Dialog.Root open={openSight !== null} onOpenChange={(next) => !next && setOpenSlug(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="sight-dialog-overlay" />
          <Dialog.Content className="sight-dialog-content">
            {openSight && (
              <motion.div
                initial={{ opacity: reducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.22 }}
              >
                <div className="sight-dialog-image">
                  <img src={openSight.image} alt={openSight.name} />
                </div>
                <div className="sight-dialog-body">
                  <p className="sight-dialog-kicker">{openSight.kicker}</p>
                  <Dialog.Title className="sight-dialog-title">{openSight.name}</Dialog.Title>
                  <Dialog.Description className="sight-dialog-description">
                    {openSight.description}
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <button className="sight-dialog-close">Back to the slider</button>
                  </Dialog.Close>
                </div>
              </motion.div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

export function SightsControls() {
  return (
    <div className="sights-controls" aria-label="Slider controls" inert aria-hidden="true">
      <button className="sight-nav sight-prev" aria-label="Previous sight">←</button>
      <button className="sight-nav sight-next" aria-label="Next sight">→</button>
    </div>
  );
}
