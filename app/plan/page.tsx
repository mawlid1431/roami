import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { PlanHero } from "@/components/sections/plan/plan-hero";

export const metadata: Metadata = {
  title: "Plan your trip | ROAMI",
  description: "Describe your trip and ROAMI turns it into a route through Mostar's old town.",
};

export default function PlanPage() {
  return (
    <main className="site-shell">
      <PlanHero />
      <SiteFooter />
    </main>
  );
}
