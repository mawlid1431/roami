/* eslint-disable @next/next/no-img-element -- Hotlinked remote photos, matching SceneImage's convention. */
import { routeJourneyAssets } from "@/data/route-journey";

// The #routes chapter: scroll drives --route-* custom properties (set by
// hooks/use-cinema-scroll.ts from lib/cinema-math.ts) through a sky-to-landing
// beat — plane descends over the sky photo, the airport fades in beneath it,
// then two door panels slide open on the arrival caption.
export function RouteJourney() {
  return (
    <section className="route-journey" aria-label="Arriving in Mostar" id="routes">
      <img className="route-sky" src={routeJourneyAssets.sky} alt="" draggable={false} />
      <img className="route-airport" src={routeJourneyAssets.airport} alt="" draggable={false} />
      <img className="route-plane" src={routeJourneyAssets.plane} alt="" draggable={false} />

      <div className="route-door" aria-hidden="true">
        <div className="route-door-panel route-door-left" style={{ backgroundImage: `url(${routeJourneyAssets.door})` }} />
        <div className="route-door-panel route-door-right" style={{ backgroundImage: `url(${routeJourneyAssets.door})` }} />
      </div>

      <div className="route-caption">
        <p className="route-caption-kicker">Touchdown</p>
        <h2>You&apos;ve arrived in Mostar.</h2>
        <p className="route-caption-body">One old town, five landmarks, no wrong turns &mdash; ROAMI has the route.</p>
      </div>
    </section>
  );
}
