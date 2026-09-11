"use client";

import Link from "next/link";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { OldTownNotes } from "./old-town-notes";

const heroTags = [
  { label: "Old Bridge", slug: "old-bridge" },
  { label: "Neretva River", slug: "neretva-river" },
  { label: "UNESCO old city", slug: "unesco-old-city" },
];

export function StoryPanels() {
  return <>
    <section className="intro-copy" aria-label="Mostar overview">
      <p>A stone arch, emerald water, and a compact old city made for slow mornings, late light, and one unforgettable crossing.</p>
      <div className="hero-tags" aria-label="Mostar highlights">
        {heroTags.map((tag) => (
          <MovingBorderButton
            key={tag.slug}
            as={Link}
            href={`/places/${tag.slug}`}
            borderRadius="999px"
            duration={4200}
            containerClassName="hero-tag-pill h-[42px]"
            className="hero-tag-pill-inner border-[#fdf1e1]/60 bg-[#fdf1e1] px-6 text-[0.98rem] font-medium normal-case text-[#111411] shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          >
            {tag.label}
          </MovingBorderButton>
        ))}
      </div>
    </section>
    <section className="story-panel story-panel-bridge" id="bridge" aria-label="Old Bridge details" inert aria-hidden="true">
      <h2>The bridge is the city&apos;s compass.</h2>
      <p>Stari Most links the banks of the Neretva and anchors a historic quarter shaped by Ottoman, Mediterranean, and European layers.</p>
      <dl className="facts">
        <div><dt>1566</dt><dd>Original bridge completed</dd></div>
        <div><dt>2005</dt><dd>Old Bridge Area inscribed by UNESCO</dd></div>
      </dl>
    </section>
    <section className="story-panel story-panel-bazaar" id="bazaar" aria-label="Old town details" inert aria-hidden="true">
      <h2>The bazaar keeps Mostar close.</h2>
      <p>Stone lanes, mosque courtyards, copper stalls, and riverside coffee stay within a short walk of Stari Most.</p>
      <OldTownNotes />
    </section>
  </>;
}
