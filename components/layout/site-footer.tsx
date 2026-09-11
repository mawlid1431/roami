import Link from "next/link";
import { footerNav } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="roami-footer" aria-label="Site footer">
      <div className="roami-footer-inner">
        <div className="roami-footer-brand">
          <p className="roami-footer-logo">ROAMI</p>
          <p className="roami-footer-tagline">Your world. Your journey.</p>
        </div>

        <nav aria-label="Quick links" className="roami-footer-links">
          {footerNav.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
      </div>
      <div className="roami-footer-bottom">
        <p>© {new Date().getFullYear()} ROAMI. Mostar guide, built with care.</p>
      </div>
    </footer>
  );
}
