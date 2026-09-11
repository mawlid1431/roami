"use client";

import Link from "next/link";
import { Popover } from "radix-ui";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { GooeyInput } from "@/components/ui/gooey-input";
import { planCta, primaryNav } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <Link className="site-logo" href="/">ROAMI</Link>
      <nav className="site-nav" aria-label="Main menu">
        {primaryNav.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </nav>
      <div className="site-header-end">
        <GooeyInput
          containerClassName="site-header-search w-56"
          placeholder="Search Mostar..."
          aria-label="Search destinations"
        />
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="language-switcher" aria-label="Change language">
              <span>EN</span><span aria-hidden="true">⌄</span>
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="language-popover" sideOffset={14} align="end">
              <p>English ✓</p>
              <p className="mt-2 opacity-65">More languages coming soon.</p>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        <MovingBorderButton
          as={Link}
          href={planCta.href}
          borderRadius="999px"
          duration={2600}
          containerClassName="h-11"
          className="border-[#111411] bg-[#111411] text-xs font-bold uppercase tracking-wide text-[#fdf1e1]"
        >
          {planCta.label}
        </MovingBorderButton>
      </div>
    </header>
  );
}
