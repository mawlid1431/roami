"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input, Textarea } from "@/components/ui/input";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

export function GetInTouch() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 700);
  }

  return (
    <section id="get-in-touch" aria-label="Get in touch" className="roami-section roami-section-dark">
      <div className="roami-section-inner">
        <p className="roami-eyebrow roami-eyebrow-light">Get in touch</p>
        <h2 className="roami-heading roami-heading-light">Planning a trip to Mostar?</h2>
        <p className="roami-subheading roami-subheading-light">
          Tell us your dates and what you&apos;re after &mdash; we&apos;ll follow up with a route.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-10 w-full max-w-xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Jordan Blake" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="jordan@example.com" required />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <Label htmlFor="message">What are you planning?</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Three days in Mostar this October, mostly on foot, interested in the old town and a day trip to Kravice falls."
            required
          />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <MovingBorderButton
            as="button"
            type="submit"
            borderRadius="999px"
            duration={2600}
            containerClassName="h-11"
            className="border-[#fdf1e1] bg-[#fdf1e1] text-xs font-bold uppercase tracking-wide text-[#111411]"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </MovingBorderButton>
          {status === "sent" && (
            <p role="status" className="text-sm text-[#fdf1e1]/80">
              Thanks &mdash; we&apos;ll reply within a day.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
