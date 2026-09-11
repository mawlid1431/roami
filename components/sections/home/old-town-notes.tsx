"use client";

import { Dialog } from "radix-ui";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function OldTownNotes() {
  const reducedMotion = useReducedMotion();
  return <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="note-button"><span aria-hidden="true">↗</span><span>Open old town notes</span></button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="notes-overlay" />
      <Dialog.Content className="notes-content">
        <motion.div initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>
          <Dialog.Title className="notes-title">The old town, at your pace.</Dialog.Title>
          <Dialog.Description className="notes-description">
            Start at Stari Most, follow the old bazaar lane through Kujundziluk, then pause by the Neretva.
            Copper shops, mosque courtyards, and riverside coffee are all part of the journey.
          </Dialog.Description>
          <Dialog.Close asChild><Button className="notes-close">Back to exploring</Button></Dialog.Close>
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
