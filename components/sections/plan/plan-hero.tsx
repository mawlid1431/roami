import { AmbientVideo } from "@/components/animations/ambient-video";
import { ScrollExitStage } from "@/components/animations/scroll-exit-stage";
import { SiteHeader } from "@/components/layout/site-header";
import { PlanComposer } from "./plan-composer";

const planVideo = {
  src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_124724_bc041163-d651-425f-aea3-2acc1efc2c96.mp4",
  poster: "/videos/plan-poster.jpg",
};
const landmarks = ["Stari Most", "Kujundziluk", "Neretva"];
const MARK_DELAY_START = 1.16;
const MARK_DELAY_STEP = 0.06;

export function PlanHero() {
  return (
    <ScrollExitStage label="Plan your trip" className="plan-page bg-night">
      <div className="exit-media absolute inset-0">
        <AmbientVideo src={planVideo.src} poster={planVideo.poster} className="h-full w-full object-cover" />
      </div>

      <div className="plan-frame">
        <div className="plan-hero exit-title">
          <h1 className="plan-heading">Describe a trip. We&apos;ll plan it.</h1>
          <PlanComposer />
        </div>

        <div className="plan-proof exit-copy">
          <p className="plan-proof-caption">Routes built around Mostar&apos;s landmarks</p>
          <ul className="plan-proof-marks">
            {landmarks.map((mark, index) => (
              <li key={mark} style={{ animationDelay: `${MARK_DELAY_START + index * MARK_DELAY_STEP}s` }}>{mark}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rendered last so it paints above the composition and stays clickable. */}
      <SiteHeader />
    </ScrollExitStage>
  );
}
