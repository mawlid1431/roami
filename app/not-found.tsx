import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <main className="site-shell">
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-night px-6 text-center text-paper">
        <SiteHeader />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-paper/55">404</p>
        <h1 className="mt-4 font-heading text-5xl leading-[0.95] sm:text-6xl">
          This route hasn&apos;t been mapped.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-paper/70">
          The page you&apos;re looking for doesn&apos;t exist &mdash; it may have moved, or the link was mistyped.
        </p>
        <Link
          href="/"
          className="mt-9 inline-block rounded-full bg-paper px-8 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-opacity hover:opacity-90"
        >
          Back to ROAMI
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}
